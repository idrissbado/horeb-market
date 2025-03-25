import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, RotateCcw, ChevronRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

export default function ProductPage({ params }: { params: { id: string } }) {
  // This would normally be fetched from an API based on the ID
  const product = {
    id: params.id,
    name: "Premium Wireless Bluetooth Headphones",
    price: 129.99,
    discount: 15,
    rating: 4.8,
    reviewCount: 127,
    description:
      "Experience premium sound quality with these wireless Bluetooth headphones. Featuring active noise cancellation, long battery life, and comfortable ear cushions for extended listening sessions.",
    features: [
      "Active Noise Cancellation",
      "40-hour Battery Life",
      "Bluetooth 5.0 Connectivity",
      "Built-in Microphone",
      "Foldable Design",
      "Premium Sound Quality",
    ],
    specifications: {
      Brand: "AudioTech",
      Model: "AT-500",
      Color: "Black",
      Connectivity: "Bluetooth 5.0",
      "Battery Life": "Up to 40 hours",
      Weight: "250g",
      Warranty: "1 Year",
    },
    images: [
      "/placeholder.svg?height=600&width=600&text=Main",
      "/placeholder.svg?height=600&width=600&text=Side",
      "/placeholder.svg?height=600&width=600&text=Back",
      "/placeholder.svg?height=600&width=600&text=Detail",
    ],
    colors: ["Black", "White", "Blue"],
    inStock: true,
    stockCount: 15,
    sku: "AT500-BLK",
    categories: ["Electronics", "Audio", "Headphones"],
    tags: ["wireless", "bluetooth", "noise-cancellation", "premium"],
  }

  const discountedPrice = product.discount
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : product.price.toFixed(2)

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
            <Link href="/products" className="hover:text-primary transition-colors">
              Products
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/categories/electronics" className="hover:text-primary transition-colors">
              Electronics
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-foreground font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Images */}
          <div className="w-full lg:w-3/5 space-y-4">
            <div className="aspect-square overflow-hidden rounded-xl border bg-muted/10">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`aspect-square overflow-hidden rounded-lg border ${index === 0 ? "ring-2 ring-primary" : ""}`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Image ${index + 1}`}
                    width={150}
                    height={150}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full lg:w-2/5 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.categories.map((category, index) => (
                  <Link key={index} href={`/categories/${category.toLowerCase()}`}>
                    <Badge variant="outline" className="hover:bg-muted transition-colors">
                      {category}
                    </Badge>
                  </Link>
                ))}
              </div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-muted stroke-muted-foreground"}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
                <Link href="#reviews" className="text-sm text-primary hover:underline">
                  Read all reviews
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {product.discount ? (
                <>
                  <span className="text-3xl font-bold">${discountedPrice}</span>
                  <span className="text-xl text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                  <Badge className="bg-red-500 text-white ml-2">{product.discount}% OFF</Badge>
                </>
              ) : (
                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              )}
            </div>

            <Separator />

            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Color</h3>
                <RadioGroup defaultValue={product.colors[0]} className="flex gap-3">
                  {product.colors.map((color) => (
                    <div key={color} className="flex items-center">
                      <RadioGroupItem value={color} id={`color-${color}`} className="peer sr-only" />
                      <Label
                        htmlFor={`color-${color}`}
                        className="flex items-center justify-center rounded-full w-10 h-10 border-2 text-center peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 cursor-pointer"
                      >
                        <span className="sr-only">{color}</span>
                        <span
                          className="block w-6 h-6 rounded-full"
                          style={{
                            backgroundColor:
                              color.toLowerCase() === "black"
                                ? "black"
                                : color.toLowerCase() === "white"
                                  ? "white"
                                  : color.toLowerCase() === "blue"
                                    ? "blue"
                                    : "gray",
                          }}
                        />
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <h3 className="font-medium">Quantity</h3>
                  <span
                    className={`text-sm ${product.stockCount < 10 ? "text-amber-600" : "text-green-600"} flex items-center`}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    {product.stockCount < 10 ? `Only ${product.stockCount} left` : "In Stock"}
                  </span>
                </div>
                <Select defaultValue="1">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Qty" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: Math.min(10, product.stockCount) }).map((_, i) => (
                      <SelectItem key={i} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex-1" size="lg" disabled={!product.inStock}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                <Heart className="mr-2 h-5 w-5" />
                Add to Wishlist
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <span className="text-sm font-medium block">Free Shipping</span>
                  <span className="text-xs text-muted-foreground">On orders over $50</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <span className="text-sm font-medium block">Secure Payment</span>
                  <span className="text-xs text-muted-foreground">Encrypted transactions</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <RotateCcw className="h-5 w-5 text-primary" />
                <div>
                  <span className="text-sm font-medium block">30-Day Returns</span>
                  <span className="text-xs text-muted-foreground">Hassle-free returns</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">SKU:</span>
                <span>{product.sku}</span>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
        {/* Product Information Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 mb-6">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-base py-3 px-4"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="features"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-base py-3 px-4"
              >
                Features
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-base py-3 px-4"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-base py-3 px-4"
              >
                Reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-2">
              <div className="prose max-w-none">
                <p className="text-lg leading-relaxed text-muted-foreground">{product.description}</p>
                <p className="text-lg leading-relaxed text-muted-foreground mt-4">
                  The sleek and ergonomic design ensures a comfortable fit for extended listening sessions, while the
                  premium materials provide durability and a luxurious feel. The intuitive touch controls allow you to
                  easily manage your music, calls, and voice assistant without reaching for your device.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground mt-4">
                  Whether you're commuting, working out, or just relaxing at home, these headphones deliver an immersive
                  audio experience that brings your music to life. The advanced noise cancellation technology blocks out
                  ambient noise, allowing you to focus on what matters most.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="features" className="pt-2"></TabsContent>
            <TabsContent value="specifications" className="pt-2">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
                  <div className="space-y-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 gap-4 py-2 border-b">
                        <span className="font-medium">{key}</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-muted/30 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">What's in the Box</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary" />
                      <span>Premium Wireless Headphones</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary" />
                      <span>USB-C Charging Cable</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary" />
                      <span>3.5mm Audio Cable</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary" />
                      <span>Carrying Case</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary" />
                      <span>User Manual</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary" />
                      <span>Warranty Card</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" id="reviews" className="pt-2">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="bg-muted/30 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="text-4xl font-bold">{product.rating}</div>
                      <div className="flex flex-col">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-muted stroke-muted-foreground"}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">Based on {product.reviewCount} reviews</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center gap-2">
                          <span className="text-sm w-2">{star}</span>
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-amber-400 h-2 rounded-full"
                              style={{
                                width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 2 : 1}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm text-muted-foreground w-8">
                            {star === 5 ? "70%" : star === 4 ? "20%" : star === 3 ? "7%" : star === 2 ? "2%" : "1%"}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-6">Write a Review</Button>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-xl font-semibold mb-4">Recent Reviews</h3>
                  <div className="space-y-6">
                    {[
                      {
                        name: "Alex Johnson",
                        date: "2 weeks ago",
                        rating: 5,
                        comment:
                          "These headphones are amazing! The sound quality is exceptional, and the noise cancellation works perfectly. Battery life is impressive too - I've been using them for a week without needing to recharge.",
                      },
                      {
                        name: "Sarah Miller",
                        date: "1 month ago",
                        rating: 4,
                        comment:
                          "Great headphones overall. The sound is clear and balanced, and they're very comfortable to wear for long periods. The only downside is that the touch controls can be a bit sensitive sometimes.",
                      },
                      {
                        name: "Michael Chen",
                        date: "2 months ago",
                        rating: 5,
                        comment:
                          "Absolutely worth every penny! The build quality is excellent, and they look very premium. The sound is incredible - you can hear details in your music that you never noticed before.",
                      },
                    ].map((review, index) => (
                      <Card key={index} className="border-0 shadow-sm">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-semibold">{review.name}</h4>
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "fill-muted stroke-muted-foreground"}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-center">
                    <Button variant="outline">Load More Reviews</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        ;
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Link key={i} href={`/products/related-${i + 1}`} className="group">
                <div className="relative overflow-hidden rounded-xl bg-muted/50 aspect-square">
                  <Image
                    src="/placeholder.svg?height=400&width=400&text=Related"
                    alt={`Related Product ${i + 1}`}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <Button className="w-full rounded-full" size="sm">
                      Quick View
                    </Button>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <h3 className="font-medium group-hover:text-primary transition-colors">Related Product {i + 1}</h3>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`w-3 h-3 ${j < 4 ? "fill-amber-400 text-amber-400" : "fill-muted stroke-muted-foreground"}`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground">(24)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">${(79.99 + i * 10).toFixed(2)}</span>
                    {i % 2 === 0 && <Badge className="bg-red-500 text-white">Sale</Badge>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

