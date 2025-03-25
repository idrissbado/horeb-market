"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Heart, ShoppingCart, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useWishlist } from "@/hooks/use-wishlist"

export default function WishlistPage() {
  const { wishlist, removeItem } = useWishlist()
  const [isRemoving, setIsRemoving] = useState<string | null>(null)

  const handleRemove = (id: string) => {
    setIsRemoving(id)
    // Simulate a small delay to show the removing state
    setTimeout(() => {
      removeItem(id)
      setIsRemoving(null)
    }, 300)
  }

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
            <span className="text-foreground font-medium">Wishlist</span>
          </div>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-16 max-w-md mx-auto">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8">
              Items added to your wishlist will be saved here for you to revisit later.
            </p>
            <Link href="/products">
              <Button size="lg" className="rounded-full px-8">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <Card key={item.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                <div className="relative aspect-square">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity"
                    onClick={() => handleRemove(item.id)}
                    disabled={isRemoving === item.id}
                  >
                    {isRemoving === item.id ? <span className="animate-spin">⟳</span> : <Trash2 className="h-4 w-4" />}
                  </Button>
                </div>
                <CardContent className="p-4">
                  <Link href={`/products/${item.id}`} className="hover:text-primary transition-colors">
                    <h3 className="font-medium text-lg mb-2 line-clamp-1">{item.name}</h3>
                  </Link>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">${item.price.toFixed(2)}</span>
                    <Button size="sm" className="rounded-full">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

