import Image from "next/image"

interface ProductImageProps {
  productId: string
  name: string
  variant?: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
}

export function ProductImage({
  productId,
  name,
  variant = "default",
  width = 500,
  height = 500,
  priority = false,
  className = "",
}: ProductImageProps) {
  // In a real application, you would have a more sophisticated way to determine the image path
  // This is a simplified example

  // Check if we have a custom image for this product
  const imagePath = `/images/products/${productId}${variant !== "default" ? `-${variant}` : ""}.jpg`

  // Fallback to placeholder if the image doesn't exist
  const fallbackImage = `/placeholder.svg?height=${height}&width=${width}&text=${encodeURIComponent(name)}`

  return (
    <div className={`relative aspect-square overflow-hidden rounded-lg ${className}`}>
      <Image
        src={imagePath || "/placeholder.svg"}
        alt={name}
        width={width}
        height={height}
        priority={priority}
        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        onError={(e) => {
          // If the image fails to load, use the fallback
          e.currentTarget.src = fallbackImage
        }}
      />
    </div>
  )
}

