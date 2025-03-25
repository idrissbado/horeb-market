import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, Search, User, Heart, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FeaturedProducts } from "@/components/featured-products"
import { CategoryShowcase } from "@/components/category-showcase"
import { TestimonialSlider } from "@/components/testimonial-slider"
import { BrandSlider } from "@/components/brand-slider"
import { NewsletterSection } from "@/components/newsletter-section"
import { PlaceholderImage } from "@/components/placeholder-image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Announcement Bar */}
      <div className="bg-primary py-2 text-primary-foreground">
        <div className="container text-center text-sm font-medium">
          Free shipping on all orders over $50 • Limited time offer
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl tracking-tight">Horeb Market</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/products" className="text-sm font-medium transition-colors hover:text-primary">
                All Products
              </Link>
              <Link href="/categories" className="text-sm font-medium transition-colors hover:text-primary">
                Categories
              </Link>
              <Link href="/deals" className="text-sm font-medium transition-colors hover:text-primary">
                Deals
              </Link>
              <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
                About
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <form className="hidden md:flex relative w-full max-w-sm items-center">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full rounded-full bg-muted pl-8 pr-4 focus-visible:ring-primary"
              />
            </form>
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative rounded-full">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative rounded-full">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                  3
                </span>
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
          <div className="container relative grid grid-cols-1 lg:grid-cols-2 gap-12 py-24 items-center">
            <div className="space-y-6">
              <Badge className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-full">
                New Collection
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
                Discover Your Perfect Style
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-md">
                Explore our curated collection of premium products designed for modern living.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button size="lg" className="rounded-full px-8">
                    Shop Now
                  </Button>
                </Link>
                <Link href="/collections/new">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full px-8 border-white text-white hover:bg-white hover:text-slate-900"
                  >
                    New Arrivals
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-4 shadow-2xl">
                <PlaceholderImage
                  width={600}
                  height={600}
                  text="Featured Product"
                  className="rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 bg-muted/50">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center gap-4 p-6 bg-background rounded-xl shadow-sm">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Free Shipping</h3>
                  <p className="text-muted-foreground text-sm">On all orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-background rounded-xl shadow-sm">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Secure Payment</h3>
                  <p className="text-muted-foreground text-sm">100% secure transactions</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-background rounded-xl shadow-sm">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">24/7 Support</h3>
                  <p className="text-muted-foreground text-sm">Dedicated customer service</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Shop by Category</h2>
              <p className="text-muted-foreground max-w-2xl">
                Explore our wide range of products across different categories
              </p>
            </div>
            <Link href="/categories" className="group inline-flex items-center text-primary mt-4 md:mt-0">
              View All Categories
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <CategoryShowcase />
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Products</h2>
                <p className="text-muted-foreground max-w-2xl">Discover our handpicked selection of premium products</p>
              </div>
              <Link href="/products" className="group inline-flex items-center text-primary mt-4 md:mt-0">
                View All Products
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <FeaturedProducts />
          </div>
        </section>

        {/* Promotion Banner */}
        <section className="py-16 container">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary-foreground text-white">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12 lg:p-16 items-center">
              <div className="space-y-6">
                <Badge className="px-3 py-1 text-sm bg-white text-primary rounded-full">Limited Offer</Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Summer Sale
                  <br />
                  Up to 50% Off
                </h2>
                <p className="text-lg text-white/80 max-w-md">
                  Don't miss out on our biggest sale of the season. Limited time only.
                </p>
                <Link href="/sale">
                  <Button size="lg" variant="secondary" className="rounded-full px-8">
                    Shop the Sale
                  </Button>
                </Link>
              </div>
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="Sale Product"
                    width={400}
                    height={400}
                    className="rounded-xl mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-16 container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">New Arrivals</h2>
              <p className="text-muted-foreground max-w-2xl">The latest additions to our collection</p>
            </div>
            <Link href="/products/new" className="group inline-flex items-center text-primary mt-4 md:mt-0">
              View All New Arrivals
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Link key={i} href={`/products/new-${i + 1}`} className="group">
                <div className="relative overflow-hidden rounded-xl bg-muted/50 aspect-[4/5]">
                  <Image
                    src={`/placeholder.svg?height=500&width=400&text=New+${i + 1}`}
                    alt={`New Product ${i + 1}`}
                    width={400}
                    height={500}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  {i % 2 === 0 && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-primary text-primary-foreground">New</Badge>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <Button className="w-full rounded-full" size="sm">
                      Quick View
                    </Button>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <h3 className="font-medium group-hover:text-primary transition-colors">New Product {i + 1}</h3>
                  <p className="text-muted-foreground text-sm">Category Name</p>
                  <p className="font-semibold">${(49.99 + i * 10).toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">What Our Customers Say</h2>
              <p className="text-muted-foreground">
                Don't just take our word for it. Here's what our customers have to say about their shopping experience.
              </p>
            </div>
            <TestimonialSlider />
          </div>
        </section>

        {/* Brands */}
        <section className="py-16 container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Brands We Carry</h2>
            <p className="text-muted-foreground">We partner with the best brands to bring you quality products</p>
          </div>
          <BrandSlider />
        </section>

        {/* Newsletter */}
        <NewsletterSection />
      </main>

      <footer className="bg-slate-900 text-slate-200">
        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl text-white tracking-tight">Horeb Market</span>
              </div>
              <p className="text-slate-400">
                Your one-stop shop for all your shopping needs. Quality products, competitive prices, and fast delivery.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white mb-4">Shop</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/products" className="text-slate-400 hover:text-primary transition-colors">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="text-slate-400 hover:text-primary transition-colors">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/deals" className="text-slate-400 hover:text-primary transition-colors">
                    Deals & Offers
                  </Link>
                </li>
                <li>
                  <Link href="/new-arrivals" className="text-slate-400 hover:text-primary transition-colors">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="/best-sellers" className="text-slate-400 hover:text-primary transition-colors">
                    Best Sellers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white mb-4">Account</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/login" className="text-slate-400 hover:text-primary transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-slate-400 hover:text-primary transition-colors">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/orders" className="text-slate-400 hover:text-primary transition-colors">
                    Order History
                  </Link>
                </li>
                <li>
                  <Link href="/wishlist" className="text-slate-400 hover:text-primary transition-colors">
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link href="/account" className="text-slate-400 hover:text-primary transition-colors">
                    My Account
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span className="text-slate-400">+225 0758409136</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span className="text-slate-400">support@horebmarket.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span className="text-slate-400">Abidjan, Ivory Coast</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800">
          <div className="container py-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">© {new Date().getFullYear()} Horeb Market. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Link href="/privacy" className="text-slate-400 hover:text-primary text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-primary text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-slate-400 hover:text-primary text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

