import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  // Get parameters from the URL
  const width = Number.parseInt(searchParams.get("width") || "300", 10)
  const height = Number.parseInt(searchParams.get("height") || "300", 10)
  const text = searchParams.get("text") || ""

  // Generate a random background color if not specified
  const bgColor = searchParams.get("bgColor") || getRandomPastelColor()
  const textColor = searchParams.get("textColor") || "#000000"

  // Create the SVG
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${bgColor}" />
      <text 
        x="50%" 
        y="50%" 
        font-family="system-ui, sans-serif" 
        font-size="${Math.max(12, Math.min(width, height) / 10)}px" 
        fill="${textColor}" 
        text-anchor="middle" 
        dominant-baseline="middle"
      >
        ${escapeHtml(text)}
      </text>
    </svg>
  `

  // Return the SVG with appropriate headers
  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}

// Helper function to generate a random pastel color
function getRandomPastelColor() {
  const hue = Math.floor(Math.random() * 360)
  return `hsl(${hue}, 70%, 80%)`
}

// Helper function to escape HTML special characters
function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

