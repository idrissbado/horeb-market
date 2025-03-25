import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function CategoriesPage() {
  const categories = [
    {
      id: "electronics",
      name: "Electronics",
      description: "Gadgets, devices, and tech accessories for modern living",
      image: "/placeholder.svg?height=600&width=800&text=Electronics",
      itemCount: 120,
      featured: true,
      subcategories: ["Smartphones", "Laptops", "Audio", "Cameras", "Accessories"],
    },
    {
      id: "clothing",
      name: "Clothing",
      description: "Stylish apparel for men, women, and children",
      image: "/placeholder.svg?height=600&width=800&text=Clothing",
      itemCount: 350,
      featured: true,
      subcategories: ["Men's", "Women's", "Kids", "Activewear", "Accessories"],
    },
    {
      id: "home",
      name: "Home & Kitchen",
      description: "Everything you need to make your house a home",
      image: "/placeholder.svg?height=600&width=800&text=Home",
      itemCount: 210,
      featured: true,
      subcategories: ["Furniture", "Kitchenware", "Bedding", "Decor", "Appliances"],
    },
    {
      id: "beauty",
      name: "Beauty & Personal Care",
      description: "Skincare, makeup, and personal care products",
      image: "/placeholder.svg?height=600&width=800&text=Beauty",
      itemCount: 180,
      featured: true,
      subcategories: ["Skincare", "Makeup", "Haircare", "Fragrance", "Bath & Body"],
    },
    {
      id: "sports",
      name: "Sports & Outdoors",
      description: "Equipment and gear for all your favorite activities",
      image: "/placeholder.svg?height=600&width=800&text=Sports",
      itemCount: 150,
      featured: false,
      subcategories: ["Fitness", "Camping", "Team Sports", "Water Sports", "Cycling"],
    },
    {
      id: "books",
      name: "Books & Media",
      description: "Books, movies, music, and more for entertainment and education",
      image: "/placeholder.svg?height=600&width=800&text=Books",
      itemCount: 280,
      featured: false,
      subcategories: ["Fiction", "Non-Fiction", "Children's", "Textbooks", "Movies"],
    },
    {
      id: "toys",
      name: "Toys & Games",
      description: "Fun and educational toys for all ages",
      image: "/placeholder.svg?height=600&width=800&text=Toys",
      itemCount: 190,
      featured: false,
      subcategories: ["Action Figures", "Board Games", "Educational", "Outdoor Toys", "Puzzles"],
    },
    {
      id: "jewelry",
      name: "Jewelry & Watches",
      description: "Elegant jewelry and watches for every occasion",
      image: "/placeholder.svg?height=600&width=800&text=Jewelry",
      itemCount: 120,
      featured: false,
      subcategories: ["Necklaces", "Rings", "Earrings", "Watches", "Bracelets"],
    },
  ]

  // Featured categories at the top
  const featuredCategories = categories.filter((category) => category.featured)
  // Other categories below
  const otherCategories = categories.filter((category) => !category.featured)

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-3 border-b">
        <div className="container">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-foreground font-medium">Categories</span>
          </div>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h1>
          <p className="text-muted-foreground text-lg">
            Browse our wide selection of products across different categories to find exactly what you're looking for.
          </p>
        </div>

        {/* Featured Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredCategories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="group relative overflow-hidden rounded-xl bg-muted/50 h-80 block"
              >
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-white/80 mb-4 max-w-md">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{category.itemCount} Products</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full border-white text-white hover:bg-white hover:text-black"
                    >
                      Explore Category
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All Categories */}
        <div>
          <h2 className="text-2xl font-bold mb-8">All Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherCategories.map((category) => (
              <div
                key={category.id}
                className="border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{category.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.subcategories.slice(0, 3).map((subcategory, index) => (
                      <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full">
                        {subcategory}
                      </span>
                    ))}
                    {category.subcategories.length > 3 && (
                      <span className="text-xs bg-muted px-2 py-1 rounded-full">
                        +{category.subcategories.length - 3} more
                      </span>
                    )}
                  </div>
                  <Link href={`/categories/${category.id}`}>
                    <Button variant="outline" className="w-full rounded-full">
                      View Products ({category.itemCount})
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

