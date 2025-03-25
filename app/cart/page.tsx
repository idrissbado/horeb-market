"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Plus, Minus, ShoppingBag, ChevronLeft, CreditCard, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  color: string
  size?: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "product-1",
      name: "Premium Wireless Bluetooth Headphones",
      price: 129.99,
      image: "/placeholder.svg?height=100&width=100&text=Headphones",
      quantity: 1,
      color: "Black",
    },
    {
      id: "product-2",
      name: "Smart Watch with Heart Rate Monitor",
      price: 199.99,
      image: "/placeholder.svg?height=100&width=100&text=Watch",
      quantity: 2,
      color: "Silver",
    },
    {
      id: "product-3",
      name: "Premium Cotton T-Shirt",
      price: 39.99,
      image: "/placeholder.svg?height=100&width=100&text=Shirt",
      quantity: 1,
      color: "Blue",
      size: "Medium",
    },
  ])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 10.0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-3 border-b">
        <div className="container">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">Shopping Cart</span>
          </div>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 max-w-md mx-auto">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link href="/products">
              <Button size="lg" className="rounded-full px-8">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-0 shadow-sm overflow-hidden">
                <div className="bg-muted/50 px-6 py-4 border-b">
                  <div className="hidden md:grid grid-cols-12 gap-4 font-medium">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Total</div>
                  </div>
                </div>

                <CardContent className="p-0">
                  {cartItems.map((item) => (
                    <div key={item.id} className="grid md:grid-cols-12 gap-4 p-6 border-b items-center">
                      <div className="md:col-span-6 flex gap-4">
                        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-muted/50">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/products/${item.id}`}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {item.name}
                          </Link>
                          <div className="text-sm text-muted-foreground mt-1 space-y-1">
                            <div>Color: {item.color}</div>
                            {item.size && <div>Size: {item.size}</div>}
                          </div>
                          <div className="md:hidden text-sm font-medium mt-2">${item.price.toFixed(2)}</div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 p-0 h-auto mt-2 md:hidden"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>

                      <div className="hidden md:flex md:col-span-2 items-center justify-center">
                        ${item.price.toFixed(2)}
                      </div>

                      <div className="md:col-span-2 flex items-center md:justify-center">
                        <div className="flex items-center border rounded-full">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="md:col-span-2 flex items-center justify-between md:justify-end">
                        <span className="md:hidden">Total:</span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hidden md:flex hover:text-red-500"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <Link href="/products">
                  <Button variant="outline" className="rounded-full">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Continue Shopping
                  </Button>
                </Link>
                <Button variant="outline" className="rounded-full" onClick={() => setCartItems([])}>
                  Clear Cart
                </Button>
              </div>
            </div>

            <div>
              <div className="sticky top-24">
                <Card className="border-0 shadow-sm overflow-hidden">
                  <div className="bg-muted/50 px-6 py-4 border-b">
                    <h2 className="text-xl font-semibold">Order Summary</h2>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
                        </span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg">
                        <Truck className="h-5 w-5 flex-shrink-0" />
                        <span className="text-sm">Free shipping on orders over $50</span>
                      </div>

                      <div className="relative">
                        <Input placeholder="Discount code" className="pr-20" />
                        <Button className="absolute right-0 top-0 rounded-l-none h-full">Apply</Button>
                      </div>

                      <Tabs defaultValue="card" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="card">Credit Card</TabsTrigger>
                          <TabsTrigger value="paypal">PayPal</TabsTrigger>
                        </TabsList>
                        <TabsContent value="card" className="space-y-4 pt-4">
                          <Button className="w-full" size="lg">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Proceed to Checkout
                          </Button>
                        </TabsContent>
                        <TabsContent value="paypal" className="pt-4">
                          <Button className="w-full bg-[#0070ba] hover:bg-[#005ea6]" size="lg">
                            <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" fill="currentColor">
                              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 4.643-5.813 4.643h-2.189c-.988 0-1.829.722-1.968 1.698l-1.12 7.106c-.022.132-.004.267.05.385a.644.644 0 0 0 .582.372h4.616c.485 0 .898-.353.972-.834l.4-2.537.011-.072c.074-.48.487-.833.972-.833h.614c3.98 0 7.07-1.635 7.982-6.363.41-2.137.193-3.927-1.235-5.173-.223-.2-.47-.37-.736-.516z" />
                            </svg>
                            Checkout with PayPal
                          </Button>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-6">
                  <h3 className="font-medium mb-3">We Accept</h3>
                  <div className="flex gap-2">
                    <div className="bg-muted/50 rounded p-2">
                      <svg viewBox="0 0 38 24" width="38" height="24" role="img" aria-labelledby="pi-visa">
                        <title id="pi-visa">Visa</title>
                        <path
                          opacity=".07"
                          d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                        ></path>
                        <path
                          fill="#fff"
                          d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                        ></path>
                        <path
                          d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z"
                          fill="#142688"
                        ></path>
                      </svg>
                    </div>
                    <div className="bg-muted/50 rounded p-2">
                      <svg viewBox="0 0 38 24" width="38" height="24" role="img" aria-labelledby="pi-master">
                        <title id="pi-master">Mastercard</title>
                        <path
                          opacity=".07"
                          d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                        ></path>
                        <path
                          fill="#fff"
                          d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                        ></path>
                        <circle fill="#EB001B" cx="15" cy="12" r="7"></circle>
                        <circle fill="#F79E1B" cx="23" cx="15" cy="12" r="7"></circle>
                        <circle fill="#F79E1B" cx="23" cy="12" r="7"></circle>
                        <path
                          fill="#FF5F00"
                          d="M23 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.3 3-3.4 3-5.7z"
                        ></path>
                      </svg>
                    </div>
                    <div className="bg-muted/50 rounded p-2">
                      <svg viewBox="0 0 38 24" width="38" height="24" role="img" aria-labelledby="pi-amex">
                        <title id="pi-amex">American Express</title>
                        <path
                          opacity=".07"
                          d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                        ></path>
                        <path
                          fill="#fff"
                          d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                        ></path>
                        <path
                          d="M25.4 13.75c0-.8-.6-1.3-1.4-1.3h-1.9v2.6h1.9c.8 0 1.4-.5 1.4-1.3zm-1.4-3.8h-1.9v2.4h1.9c.8 0 1.2-.4 1.2-1.2 0-.7-.4-1.2-1.2-1.2zm3.2 3.8c0 1.6-1.2 2.5-3 2.5h-4v-8.9h4c1.5 0 2.7.7 2.7 2.2 0 .9-.4 1.5-1.1 1.9.9.3 1.4 1.1 1.4 2.3zM17.4 10.2v1.5h3.2v1.8h-3.2v1.5h3.6v1.8h-5.5v-8.9h5.5v2.3h-3.6zm-7.2 7.6h-5L9.3 9h2.8l-4.1 8.8zM7.7 9l-4 8.8H1L5 9h2.7z"
                          fill="#006FCF"
                        ></path>
                      </svg>
                    </div>
                    <div className="bg-muted/50 rounded p-2">
                      <svg viewBox="0 0 38 24" width="38" height="24" role="img" aria-labelledby="pi-paypal">
                        <title id="pi-paypal">PayPal</title>
                        <path
                          opacity=".07"
                          d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                        ></path>
                        <path
                          fill="#fff"
                          d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                        ></path>
                        <path
                          fill="#003087"
                          d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z"
                        ></path>
                        <path
                          fill="#3086C8"
                          d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z"
                        ></path>
                        <path
                          fill="#012169"
                          d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

