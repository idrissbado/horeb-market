"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Filter, Search, ChevronRight, ChevronLeft, ShoppingCart, Heart, Star, X } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  discount?: number
  rating: number
  reviewCount: number
  tags: string[]
  isNew?: boolean
  inStock: boolean
}

interface FilterState {
  categories: string[]
  priceRange: [number, number]
  ratings: number[]
  onSale: boolean
  inStock: boolean
}

export default function ProductsPage() {
  // This would normally be fetched from an API
  const allProducts: Product[] = Array.from({ length: 24 }).map((_, i) => ({
    id: `product-${i + 1}`,
    name: `Product ${i + 1}`,
    price: 29.99 + i * 10,
    image: `/placeholder.svg?height=400&width=400&text=Product+${i + 1}`,
    category:
      i % 4 === 0
        ? "Electronics"
        : i % 4 === 1
          ? "Clothing"
          : i % 4 === 2
            ? "Home & Kitchen"
            : "Beauty & Personal Care",
    discount: i % 3 === 0 ? 10 + (i % 3) * 5 : undefined,
    rating: 3 + (i % 5) * 0.5,
    reviewCount: 10 + i * 5,
    tags: ["popular", i % 2 === 0 ? "trending" : "featured"],
    isNew: i % 7 === 0,
    inStock: i % 8 !== 0,
  }))

  const categories = ["Electronics", "Clothing", "Home & Kitchen", "Beauty & Personal Care"]
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOption, setSortOption] = useState("featured")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const productsPerPage = 12

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 500],
    ratings: [],
    onSale: false,
    inStock: false,
  })

  // Apply filters and search
  const filteredProducts = allProducts.filter((product) => {
    // Search filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false
    }

    // Price range filter
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false
    }

    // Rating filter
    if (filters.ratings.length > 0 && !filters.ratings.includes(Math.floor(product.rating))) {
      return false
    }

    // On sale filter
    if (filters.onSale && !product.discount) {
      return false
    }

    // In stock filter
    if (filters.inStock && !product.inStock) {
      return false
    }

    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "newest":
        return a.isNew ? -1 : b.isNew ? 1 : 0
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)

  // Handle filter changes
  const handleCategoryChange = (category: string) => {
    setFilters((prev) => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category]

      return { ...prev, categories: newCategories }
    })
    setCurrentPage(1)
  }

  const handlePriceChange = (value: number[]) => {
    setFilters((prev) => ({ ...prev, priceRange: [value[0], value[1]] }))
    setCurrentPage(1)
  }

  const handleRatingChange = (rating: number) => {
    setFilters((prev) => {
      const newRatings = prev.ratings.includes(rating)
        ? prev.ratings.filter((r) => r !== rating)
        : [...prev.ratings, rating]

      return { ...prev, ratings: newRatings }
    })
    setCurrentPage(1)
  }

  const handleOnSaleChange = (checked: boolean) => {
    setFilters((prev) => ({ ...prev, onSale: checked }))
    setCurrentPage(1)
  }

  const handleInStockChange = (checked: boolean) => {
    setFilters((prev) => ({ ...prev, inStock: checked }))
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 500],
      ratings: [],
      onSale: false,
      inStock: false,
    })
    setSearchQuery("")
    setCurrentPage(1)
  }

  // Check if any filters are active
  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.ratings.length > 0 ||
    filters.onSale ||
    filters.inStock ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 500 ||
    searchQuery !== ""

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
  }

  // Handle pagination
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  // Render filters
  const FiltersContent = () => (
    <div className="space-y-6">
      {hasActiveFilters && (
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm text-muted-foreground">Active Filters</h3>
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-xs">
            Clear All
            <X className="ml-1 h-3 w-3" />
          </Button>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg">Categories</h3>
          {filters.categories.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilters((prev) => ({ ...prev, categories: [] }))}
              className="h-6 text-xs"
            >
              Clear
            </Button>
          )}
        </div>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={filters.categories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <label
                htmlFor={`category-${category}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg">Price Range</h3>
          {(filters.priceRange[0] > 0 || filters.priceRange[1] < 500) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilters((prev) => ({ ...prev, priceRange: [0, 500] }))}
              className="h-6 text-xs"
            >
              Clear
            </Button>
          )}
        </div>
        <div className="pt-4 px-2">
          <Slider
            defaultValue={[0, 500]}
            value={filters.priceRange}
            max={500}
            step={10}
            onValueChange={handlePriceChange}
            className="mb-6"
          />
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">${filters.priceRange[0]}</span>
            <span className="text-sm font-medium">${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg">Ratings</h3>
          {filters.ratings.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilters((prev) => ({ ...prev, ratings: [] }))}
              className="h-6 text-xs"
            >
              Clear
            </Button>
          )}
        </div>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.ratings.includes(rating)}
                onCheckedChange={() => handleRatingChange(rating)}
              />
              <label
                htmlFor={`rating-${rating}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
              >
                <div className="flex mr-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${i < rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                {rating} Stars & Up
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-lg">Other Filters</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="on-sale"
              checked={filters.onSale}
              onCheckedChange={(checked) => handleOnSaleChange(checked as boolean)}
            />
            <label
              htmlFor="on-sale"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              On Sale
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={filters.inStock}
              onCheckedChange={(checked) => handleInStockChange(checked as boolean)}
            />
            <label
              htmlFor="in-stock"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              In Stock Only
            </label>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium">All Products</span>
      </div>

      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar - Desktop */}
        <div className="w-full md:w-64 space-y-6 hidden md:block">
          <FiltersContent />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <form onSubmit={handleSearch} className="relative w-full sm:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-8 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select defaultValue={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-full sm:w-[180px] rounded-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest Arrivals</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filters */}
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full md:hidden">
                    <Filter className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <h2 className="text-xl font-bold mb-6">Filters</h2>
                  <FiltersContent />
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-6">
              {filters.categories.map((category) => (
                <Badge key={category} variant="secondary" className="rounded-full px-3 py-1">
                  {category}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCategoryChange(category)}
                    className="h-4 w-4 p-0 ml-1"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}

              {filters.ratings.length > 0 && (
                <Badge variant="secondary" className="rounded-full px-3 py-1">
                  {filters.ratings.length === 1
                    ? `${filters.ratings[0]}+ Stars`
                    : `${Math.min(...filters.ratings)}+ Stars`}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFilters((prev) => ({ ...prev, ratings: [] }))}
                    className="h-4 w-4 p-0 ml-1"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {(filters.priceRange[0] > 0 || filters.priceRange[1] < 500) && (
                <Badge variant="secondary" className="rounded-full px-3 py-1">
                  ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFilters((prev) => ({ ...prev, priceRange: [0, 500] }))}
                    className="h-4 w-4 p-0 ml-1"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {filters.onSale && (
                <Badge variant="secondary" className="rounded-full px-3 py-1">
                  On Sale
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFilters((prev) => ({ ...prev, onSale: false }))}
                    className="h-4 w-4 p-0 ml-1"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {filters.inStock && (
                <Badge variant="secondary" className="rounded-full px-3 py-1">
                  In Stock
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFilters((prev) => ({ ...prev, inStock: false }))}
                    className="h-4 w-4 p-0 ml-1"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {searchQuery && (
                <Badge variant="secondary" className="rounded-full px-3 py-1">
                  Search: {searchQuery}
                  <Button variant="ghost" size="sm" onClick={() => setSearchQuery("")} className="h-4 w-4 p-0 ml-1">
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              <Button variant="outline" size="sm" onClick={clearFilters} className="rounded-full text-xs h-7">
                Clear All
              </Button>
            </div>
          )}

          {/* Results Count */}
          <div className="text-sm text-muted-foreground mb-6">
            Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, sortedProducts.length)} of{" "}
            {sortedProducts.length} products
          </div>

          {sortedProducts.length === 0 ? (
            <div className="text-center py-12 border rounded-lg bg-muted/20">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="aspect-square overflow-hidden rounded-lg bg-muted/50 border">
                    <Link href={`/products/${product.id}`}>
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      />
                    </Link>
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                    {product.discount && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-red-500 text-white">-{product.discount}%</Badge>
                      </div>
                    )}
                    {product.isNew && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-green-500 text-white">New</Badge>
                      </div>
                    )}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <Badge className="bg-black text-white text-lg py-1 px-3">Out of Stock</Badge>
                      </div>
                    )}
                  </div>
                  <div className="mt-3">
                    <div className="text-sm text-muted-foreground">{product.category}</div>
                    <Link href={`/products/${product.id}`} className="hover:underline">
                      <h3 className="font-medium text-lg mt-1 line-clamp-1">{product.name}</h3>
                    </Link>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      {product.discount ? (
                        <div className="flex items-center gap-2">
                          <span className="font-bold">
                            ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="font-bold">${product.price.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNumber = index + 1
                  // Show first page, last page, current page, and pages around current page
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <Button
                        key={pageNumber}
                        variant={currentPage === pageNumber ? "default" : "outline"}
                        size="icon"
                        onClick={() => paginate(pageNumber)}
                        className="rounded-full w-8 h-8"
                      >
                        {pageNumber}
                      </Button>
                    )
                  } else if (
                    (pageNumber === 2 && currentPage > 3) ||
                    (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                  ) {
                    return <span key={pageNumber}>...</span>
                  }
                  return null
                })}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

