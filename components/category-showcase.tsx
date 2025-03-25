import Link from "next/link"
import { PlaceholderImage } from "./placeholder-image"

export function CategoryShowcase() {
  const categories = [
    {
      id: "electronics",
      name: "Electronics",
      description: "Latest gadgets and tech",
      itemCount: 120,
    },
    {
      id: "clothing",
      name: "Clothing",
      description: "Fashion for everyone",
      itemCount: 350,
    },
    {
      id: "home",
      name: "Home & Kitchen",
      description: "Everything for your home",
      itemCount: 210,
    },
    {
      id: "beauty",
      name: "Beauty",
      description: "Skincare and makeup",
      itemCount: 180,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category, index) => (
        <Link
          key={category.id}
          href={`/categories/${category.id}`}
          className="group relative overflow-hidden rounded-xl bg-muted/50 aspect-[3/4] block"
        >
          <PlaceholderImage
            width={400}
            height={600}
            text={category.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-xl font-bold mb-1">{category.name}</h3>
            <p className="text-white/80 text-sm mb-2">{category.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{category.itemCount} Products</span>
              <span className="text-primary bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium group-hover:bg-primary group-hover:text-white transition-colors">
                Explore
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

