import type { CSSProperties } from "react"

interface PlaceholderImageProps {
  width: number
  height: number
  text?: string
  className?: string
  style?: CSSProperties
}

export function PlaceholderImage({ width, height, text = "", className = "", style = {} }: PlaceholderImageProps) {
  // Generate a random pastel color
  const getRandomPastelColor = () => {
    const hue = Math.floor(Math.random() * 360)
    return `hsl(${hue}, 70%, 80%)`
  }

  const bgColor = getRandomPastelColor()
  const fontSize = Math.max(12, Math.min(width, height) / 10)

  return (
    <div
      className={className}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: bgColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#000",
        fontSize: `${fontSize}px`,
        fontFamily: "system-ui, sans-serif",
        overflow: "hidden",
        ...style,
      }}
    >
      {text}
    </div>
  )
}

