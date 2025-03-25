import Link from "next/link"
import Image from "next/image"

export function CategoryList() {
  const categories = [
    { id: "electronics", name: "Electronics", image: "/placeholder.svg?height=200&width=200" },
    { id: "clothing", name: "Clothing", image: "/placeholder.svg?height=200&width=200" },
    { id: "home", name: "Home & Kitchen", image: "/placeholder.svg?height=200&width=200" },
    { id: "beauty", name: "Beauty & Personal Care", image: "/placeholder.svg?height=200&width=200" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.id}`}
          className="group relative overflow-hidden rounded-lg"
        >
          <div className="aspect-square overflow-hidden rounded-lg">
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              width={200}
              height={200}
              className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-300"
            />
          </div>
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h3 className="text-white text-xl font-bold">{category.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}

