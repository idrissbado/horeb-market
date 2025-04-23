"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Product } from "@/types/product"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/providers/cart-provider"
import { toast } from "sonner"
import { Loader2, Heart } from "lucide-react"

export default function WishlistPage() {
  const { user } = useAuth()
  const { addItem } = useCart()
  const [wishlist, setWishlist] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) {
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch("/api/wishlist")
        if (!response.ok) {
          throw new Error("Failed to fetch wishlist")
        }
        const data = await response.json()
        setWishlist(data)
      } catch (err) {
        setError("Failed to load wishlist")
        console.error("Error fetching wishlist:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWishlist()
  }, [user])

  const handleAddToCart = (product: Product) => {
    addItem(product)
    toast.success("Added to cart")
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-lg text-gray-500">Please log in to view your wishlist</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    )
  }

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Heart className="w-12 h-12 text-gray-400" />
        <p className="text-lg text-gray-500">Your wishlist is empty</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">${product.price}</p>
                  {product.originalPrice && (
                    <p className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </p>
                  )}
                </div>
                <Button onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 