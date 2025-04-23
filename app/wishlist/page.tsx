"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, ShoppingCart, Heart, Star, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/hooks/use-cart"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  type: string;
  endsIn?: string;
  featured: boolean;
  description: string;
  stock: number;
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const { addItem } = useCart()

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        // In a real app, you would fetch the user's wishlist from the database
        // For now, we'll use localStorage to simulate a wishlist
        const savedWishlist = localStorage.getItem('wishlist')
        if (savedWishlist) {
          const productIds = JSON.parse(savedWishlist)
          const response = await fetch('/api/products')
          const allProducts = await response.json()
          const wishlistProducts = allProducts.filter((product: Product) => 
            productIds.includes(product._id)
          )
          setWishlist(wishlistProducts)
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error)
        toast({
          title: "Error",
          description: "Failed to load wishlist",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchWishlist()
  }, [toast])

  const handleAddToCart = (product: Product) => {
    addItem(
      {
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      1,
    )
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    })
  }

  const handleRemoveFromWishlist = (productId: string) => {
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      const productIds = JSON.parse(savedWishlist)
      const updatedWishlist = productIds.filter((id: string) => id !== productId)
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
      setWishlist(wishlist.filter(product => product._id !== productId))
      toast({
        title: "Removed from wishlist",
        description: "The item has been removed from your wishlist",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <Heart className="h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-6">
            Add items to your wishlist to keep track of products you love
          </p>
          <Link href="/deals">
            <Button>
              Browse Deals
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary flex items-center">
            Back to Home <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <Card key={product._id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-square">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
                <div className="absolute top-3 right-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-white/80 hover:bg-white"
                    onClick={() => handleRemoveFromWishlist(product._id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold">${product.price}</span>
                  <span className="text-muted-foreground line-through">${product.originalPrice}</span>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

