"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart, Eye, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  isNew?: boolean
  isFeatured?: boolean
  discount?: number
}

export function FeaturedProducts() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  const featuredProducts: Product[] = [
    {
      id: "featured-1",
      name: "Premium Wireless Headphones",
      price: 129.99,
      originalPrice: 159.99,
      image: "/placeholder.svg?height=400&width=400&text=Headphones",
      category: "Electronics",
      rating: 4.8,
      isFeatured: true,
      discount: 20,
    },
    {
      id: "featured-2",
      name: "Smart Watch with Heart Rate Monitor",
      price: 199.99,
      originalPrice: 249.99,
      image: "/placeholder.svg?height=400&width=400&text=Watch",
      category: "Electronics",
      rating: 4.6,
      isFeatured: true,
      discount: 15,
    },
    {
      id: "featured-3",
      name: "Premium Cotton T-Shirt",
      price: 39.99,
      image: "/placeholder.svg?height=400&width=400&text=T-Shirt",
      category: "Clothing",
      rating: 4.5,
      isFeatured: true,
      isNew: true,
    },
    {
      id: "featured-4",
      name: "Non-Stick Cooking Set",
      price: 89.99,
      originalPrice: 119.99,
      image: "/placeholder.svg?height=400&width=400&text=Cookware",
      category: "Home & Kitchen",
      rating: 4.7,
      isFeatured: true,
      discount: 25,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredProducts.map((product) => (
        <Card
          key={product.id}
          className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow duration-300"
          onMouseEnter={() => setHoveredProduct(product.id)}
          onMouseLeave={() => setHoveredProduct(null)}
        >
          <div className="relative overflow-hidden aspect-square">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={400}
              height={400}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
            {product.discount && (
              <Badge className="absolute top-3 left-3 bg-red-500 text-white">{product.discount}% OFF</Badge>
            )}
            {product.isNew && <Badge className="absolute top-3 left-3 bg-green-500 text-white">NEW</Badge>}
            <div
              className={`absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${hoveredProduct === product.id ? "opacity-100" : ""}`}
            >
              <div className="flex gap-2">
                <Button size="icon" variant="secondary" className="rounded-full">
                  <ShoppingCart className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" className="rounded-full">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" className="rounded-full">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
            <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">
              <h3 className="font-medium text-lg mb-2 line-clamp-1">{product.name}</h3>
            </Link>
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
            </div>
            <div className="flex items-center justify-between">
              {product.originalPrice ? (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

