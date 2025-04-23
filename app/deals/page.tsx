"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Clock, ShoppingCart, Heart, Star, Filter, Loader2, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/providers/cart-provider"
import { toast } from 'sonner'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
  endsIn: string;
  featured: boolean;
  description: string;
  stock: number;
  createdAt: string;
}

type SortOption = "featured" | "discount-high" | "price-low" | "price-high" | "discount" | "rating" | "newest";

export default function DealsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState<SortOption>("newest")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast: useToastToast } = useToast()
  const { addItem } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('/api/products')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received')
        }
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
        setError('Failed to load products. Please try again later.')
        useToastToast({
          title: "Error",
          description: "Failed to load products",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [useToastToast])

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    })
    toast.success('Added to cart')
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const filteredProducts = Array.isArray(products) ? products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || product.type === activeTab
    return matchesSearch && matchesTab
  }) : []

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "discount-high":
        return b.discount - a.discount
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "discount":
        return b.discount - a.discount
      case "rating":
        return b.rating - a.rating
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Products</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Deals & Discounts</h1>
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary flex items-center">
            Back to Home <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
        </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search deals..."
                  className="rounded-full pl-10 pr-4"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
          </div>
          <Select 
            value={sortOption} 
            onValueChange={(value: SortOption) => {
              if (value !== sortOption) {
                setSortOption(value);
              }
            }}
          >
                <SelectTrigger className="w-full sm:w-[180px] rounded-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="discount-high">Discount: High to Low</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="discount">Discount</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="rounded-full md:hidden">
                <Filter className="h-4 w-4" />
              </Button>
          </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger
                value="all"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-base py-3 px-4"
              >
                All Deals
              </TabsTrigger>
              <TabsTrigger
                value="flash"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-base py-3 px-4"
              >
              Flash Deals
              </TabsTrigger>
              <TabsTrigger
                value="clearance"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-base py-3 px-4"
              >
                Clearance
              </TabsTrigger>
              <TabsTrigger
                value="weekly"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-base py-3 px-4"
              >
                Weekly Deals
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sortedProducts.length > 0 ? (
                sortedProducts.map((product) => (
                  <Card key={product._id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative aspect-square">
                      <Image src={product.image} alt={product.name} fill className="object-cover" />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-red-500 text-white">-{product.discount}%</Badge>
                      </div>
                      {product.type === "flash" && (
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="bg-black/70 text-white px-3 py-1 rounded-lg flex items-center justify-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span className="text-xs font-medium">Ends in: {product.endsIn}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <Heart className="h-5 w-5" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl font-bold">${product.price}</span>
                        <span className="text-muted-foreground line-through">${product.originalPrice}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
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
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No products found matching your criteria.</p>
              </div>
              )}
              </div>
            </TabsContent>
          </Tabs>
      </div>
    </div>
  )
}

