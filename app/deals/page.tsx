"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Clock, ShoppingCart, Heart, Star, Filter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/hooks/use-cart"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DealsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("featured")
  const { toast } = useToast()
  const { addItem } = useCart()

  const deals = [
    {
      id: "deal-1",
      name: "Premium Wireless Headphones",
      price: 129.99,
      originalPrice: 199.99,
      discount: 35,
      image: "/placeholder.svg?height=400&width=400&text=Headphones",
      category: "Electronics",
      rating: 4.8,
      reviewCount: 120,
      type: "flash",
      endsIn: "2d 5h 30m",
      featured: true,
    },
    {
      id: "deal-2",
      name: "Smart Watch with Heart Rate Monitor",
      price: 149.99,
      originalPrice: 249.99,
      discount: 40,
      image: "/placeholder.svg?height=400&width=400&text=Watch",
      category: "Electronics",
      rating: 4.6,
      reviewCount: 85,
      type: "flash",
      endsIn: "1d 12h 45m",
      featured: true,
    },
    {
      id: "deal-3",
      name: "Premium Cotton T-Shirt",
      price: 24.99,
      originalPrice: 39.99,
      discount: 38,
      image: "/placeholder.svg?height=400&width=400&text=T-Shirt",
      category: "Clothing",
      rating: 4.5,
      reviewCount: 65,
      type: "clearance",
      featured: false,
    },
    {
      id: "deal-4",
      name: "Non-Stick Cooking Set",
      price: 79.99,
      originalPrice: 129.99,
      discount: 38,
      image: "/placeholder.svg?height=400&width=400&text=Cookware",
      category: "Home & Kitchen",
      rating: 4.7,
      reviewCount: 92,
      type: "clearance",
      featured: false,
    },
    {
      id: "deal-5",
      name: "Bluetooth Portable Speaker",
      price: 59.99,
      originalPrice: 99.99,
      discount: 40,
      image: "/placeholder.svg?height=400&width=400&text=Speaker",
      category: "Electronics",
      rating: 4.4,
      reviewCount: 78,
      type: "weekly",
      featured: false,
    },
    {
      id: "deal-6",
      name: "Organic Skincare Set",
      price: 49.99,
      originalPrice: 89.99,
      discount: 44,
      image: "/placeholder.svg?height=400&width=400&text=Skincare",
      category: "Beauty",
      rating: 4.9,
      reviewCount: 56,
      type: "weekly",
      featured: false,
    },
    {
      id: "deal-7",
      name: "Fitness Tracker Band",
      price: 69.99,
      originalPrice: 119.99,
      discount: 42,
      image: "/placeholder.svg?height=400&width=400&text=Fitness",
      category: "Sports",
      rating: 4.3,
      reviewCount: 104,
      type: "flash",
      endsIn: "5h 15m",
      featured: false,
    },
    {
      id: "deal-8",
      name: "Stainless Steel Water Bottle",
      price: 19.99,
      originalPrice: 34.99,
      discount: 43,
      image: "/placeholder.svg?height=400&width=400&text=Bottle",
      category: "Sports",
      rating: 4.7,
      reviewCount: 89,
      type: "clearance",
      featured: false,
    },
  ]

  // Filter deals based on active tab
  const filteredDeals = deals
    .filter((deal) => {
      if (activeTab === "all") return true
      return deal.type === activeTab
    })
    .filter((deal) => {
      if (!searchQuery) return true
      return (
        deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })

  // Sort deals based on selected option
  const sortedDeals = [...filteredDeals].sort((a, b) => {
    switch (sortOption) {
      case "discount-high":
        return b.discount - a.discount
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "featured":
      default:
        return b.featured ? 1 : -1
    }
  })

  // Featured deals
  const featuredDeals = deals.filter((deal) => deal.featured)

  // Handle add to cart
  const handleAddToCart = (deal) => {
    addItem(
      {
        id: deal.id,
        name: deal.name,
        price: deal.price,
        image: deal.image,
      },
      1,
    )
  }

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  // Handle sort change
  const handleSortChange = (value) => {
    setSortOption(value)
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
            <span className="text-foreground font-medium">Deals & Offers</span>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-primary to-primary-foreground text-white">
        <div className="container py-12 md:py-16">
          <div className="max-w-3xl">
            <Badge className="bg-white text-primary mb-4">Limited Time</Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Exclusive Deals & Offers</h1>
            <p className="text-lg md:text-xl text-white/80 mb-6">
              Discover incredible savings on your favorite products. Don't miss out on these limited-time offers!
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="secondary" className="rounded-full">
                Shop All Deals
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white text-white hover:bg-white hover:text-primary"
              >
                Flash Sales
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        {/* Featured Deals */}
        {featuredDeals.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Featured Deals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredDeals.map((deal) => (
                <Card key={deal.id} className="overflow-hidden border-0 shadow-lg">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="relative w-full md:w-2/5 aspect-square md:aspect-auto">
                      <Image src={deal.image || "/placeholder.svg"} alt={deal.name} fill className="object-cover" />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-red-500 text-white">-{deal.discount}%</Badge>
                      </div>
                      {deal.type === "flash" && (
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="bg-black/70 text-white px-3 py-2 rounded-lg flex items-center justify-center">
                            <Clock className="h-4 w-4 mr-2" />
                            <span className="text-sm font-medium">Ends in: {deal.endsIn}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <CardContent className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">{deal.category}</div>
                        <Link href={`/products/${deal.id}`} className="hover:text-primary transition-colors">
                          <h3 className="text-xl font-bold mb-2">{deal.name}</h3>
                        </Link>
                        <div className="flex items-center gap-1 mb-3">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(deal.rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                            />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">({deal.reviewCount})</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-2xl font-bold">${deal.price.toFixed(2)}</span>
                          <span className="text-lg text-muted-foreground line-through">
                            ${deal.originalPrice.toFixed(2)}
                          </span>
                          <span className="text-red-500 font-medium">
                            Save ${(deal.originalPrice - deal.price).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button className="flex-1 rounded-full" onClick={() => handleAddToCart(deal)}>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Deal Categories */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold">All Deals</h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full sm:w-auto">
                <Input
                  placeholder="Search deals..."
                  className="rounded-full pl-10 pr-4"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <Select value={sortOption} onValueChange={handleSortChange}>
                <SelectTrigger className="w-full sm:w-[180px] rounded-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="discount-high">Discount: High to Low</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="rounded-full md:hidden">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 mb-8 overflow-x-auto flex-nowrap">
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
                Flash Sales
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
                {sortedDeals.map((deal) => (
                  <Card key={deal.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative aspect-square">
                      <Image src={deal.image || "/placeholder.svg"} alt={deal.name} fill className="object-cover" />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-red-500 text-white">-{deal.discount}%</Badge>
                      </div>
                      {deal.type === "flash" && (
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="bg-black/70 text-white px-3 py-1 rounded-lg flex items-center justify-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span className="text-xs font-medium">Ends in: {deal.endsIn}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground mb-1">{deal.category}</div>
                      <Link href={`/products/${deal.id}`} className="hover:text-primary transition-colors">
                        <h3 className="font-medium text-lg mb-2 line-clamp-1">{deal.name}</h3>
                      </Link>
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < Math.floor(deal.rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">({deal.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-bold text-lg">${deal.price.toFixed(2)}</span>
                        <span className="text-sm text-muted-foreground line-through">
                          ${deal.originalPrice.toFixed(2)}
                        </span>
                      </div>
                      <Button className="w-full rounded-full" size="sm" onClick={() => handleAddToCart(deal)}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="flash" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {sortedDeals.map((deal) => (
                  <Card key={deal.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative aspect-square">
                      <Image src={deal.image || "/placeholder.svg"} alt={deal.name} fill className="object-cover" />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-red-500 text-white">-{deal.discount}%</Badge>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-black/70 text-white px-3 py-1 rounded-lg flex items-center justify-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span className="text-xs font-medium">Ends in: {deal.endsIn || "Limited time"}</span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground mb-1">{deal.category}</div>
                      <Link href={`/products/${deal.id}`} className="hover:text-primary transition-colors">
                        <h3 className="font-medium text-lg mb-2 line-clamp-1">{deal.name}</h3>
                      </Link>
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < Math.floor(deal.rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">({deal.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-bold text-lg">${deal.price.toFixed(2)}</span>
                        <span className="text-sm text-muted-foreground line-through">
                          ${deal.originalPrice.toFixed(2)}
                        </span>
                      </div>
                      <Button className="w-full rounded-full" size="sm" onClick={() => handleAddToCart(deal)}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="clearance" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {sortedDeals.map((deal) => (
                  <Card key={deal.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative aspect-square">
                      <Image src={deal.image || "/placeholder.svg"} alt={deal.name} fill className="object-cover" />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-red-500 text-white">-{deal.discount}%</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground mb-1">{deal.category}</div>
                      <Link href={`/products/${deal.id}`} className="hover:text-primary transition-colors">
                        <h3 className="font-medium text-lg mb-2 line-clamp-1">{deal.name}</h3>
                      </Link>
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < Math.floor(deal.rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">({deal.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-bold text-lg">${deal.price.toFixed(2)}</span>
                        <span className="text-sm text-muted-foreground line-through">
                          ${deal.originalPrice.toFixed(2)}
                        </span>
                      </div>
                      <Button className="w-full rounded-full" size="sm" onClick={() => handleAddToCart(deal)}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="weekly" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {sortedDeals.map((deal) => (
                  <Card key={deal.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative aspect-square">
                      <Image src={deal.image || "/placeholder.svg"} alt={deal.name} fill className="object-cover" />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-red-500 text-white">-{deal.discount}%</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground mb-1">{deal.category}</div>
                      <Link href={`/products/${deal.id}`} className="hover:text-primary transition-colors">
                        <h3 className="font-medium text-lg mb-2 line-clamp-1">{deal.name}</h3>
                      </Link>
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < Math.floor(deal.rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">({deal.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-bold text-lg">${deal.price.toFixed(2)}</span>
                        <span className="text-sm text-muted-foreground line-through">
                          ${deal.originalPrice.toFixed(2)}
                        </span>
                      </div>
                      <Button className="w-full rounded-full" size="sm" onClick={() => handleAddToCart(deal)}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Newsletter */}
        <div className="mt-16 bg-muted/30 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Get Notified About Exclusive Deals</h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter and be the first to know about new deals, flash sales, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input placeholder="Enter your email" className="rounded-full" />
              <Button className="rounded-full px-8">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

