"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Package,
  Search,
  ChevronDown,
  ChevronUp,
  Calendar,
  Clock,
  Truck,
  CheckCircle,
  AlertCircle,
  XCircle,
  FileText,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock order data
const orders = [
  {
    id: "ORD-001",
    date: "2023-05-15",
    status: "delivered",
    total: 129.99,
    items: [
      {
        id: "PROD-001",
        name: "Wireless Headphones",
        price: 129.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80&text=Headphones",
      },
    ],
    paymentMethod: "Credit Card",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "Abidjan",
      state: "Lagunes",
      country: "Ivory Coast",
      zipCode: "00225",
    },
    trackingNumber: "TRK123456789",
    estimatedDelivery: "2023-05-18",
    deliveredDate: "2023-05-15",
  },
  {
    id: "ORD-002",
    date: "2023-05-10",
    status: "processing",
    total: 159.98,
    items: [
      {
        id: "PROD-002",
        name: "Smart Watch",
        price: 79.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80&text=Watch",
      },
      {
        id: "PROD-003",
        name: "Bluetooth Speaker",
        price: 79.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80&text=Speaker",
      },
    ],
    paymentMethod: "PayPal",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "Abidjan",
      state: "Lagunes",
      country: "Ivory Coast",
      zipCode: "00225",
    },
    trackingNumber: "TRK987654321",
    estimatedDelivery: "2023-05-20",
  },
  {
    id: "ORD-003",
    date: "2023-05-05",
    status: "shipped",
    total: 249.99,
    items: [
      {
        id: "PROD-004",
        name: "Smartphone",
        price: 249.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80&text=Phone",
      },
    ],
    paymentMethod: "Credit Card",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "Abidjan",
      state: "Lagunes",
      country: "Ivory Coast",
      zipCode: "00225",
    },
    trackingNumber: "TRK456789123",
    estimatedDelivery: "2023-05-12",
  },
  {
    id: "ORD-004",
    date: "2023-04-28",
    status: "cancelled",
    total: 59.99,
    items: [
      {
        id: "PROD-005",
        name: "Fitness Tracker",
        price: 59.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80&text=Tracker",
      },
    ],
    paymentMethod: "Credit Card",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "Abidjan",
      state: "Lagunes",
      country: "Ivory Coast",
      zipCode: "00225",
    },
    cancelReason: "Item out of stock",
  },
  {
    id: "ORD-005",
    date: "2023-04-20",
    status: "delivered",
    total: 89.99,
    items: [
      {
        id: "PROD-006",
        name: "Wireless Earbuds",
        price: 89.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80&text=Earbuds",
      },
    ],
    paymentMethod: "PayPal",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "Abidjan",
      state: "Lagunes",
      country: "Ivory Coast",
      zipCode: "00225",
    },
    trackingNumber: "TRK789123456",
    estimatedDelivery: "2023-04-25",
    deliveredDate: "2023-04-23",
  },
]

export default function OrdersPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  // Filter orders based on active tab
  const filteredOrders = orders
    .filter((order) => {
      if (activeTab === "all") return true
      return order.status === activeTab
    })
    .filter((order) => {
      if (!searchQuery) return true
      return (
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    })

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  const openOrderDetails = (orderId: string) => {
    setSelectedOrder(orderId)
  }

  const closeOrderDetails = () => {
    setSelectedOrder(null)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
      case "shipped":
        return <Badge className="bg-amber-100 text-amber-800">Shipped</Badge>
      case "delivered":
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "shipped":
        return <Truck className="h-5 w-5 text-amber-500" />
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const selectedOrderData = selectedOrder ? orders.find((order) => order.id === selectedOrder) : null

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Orders</h1>
            <p className="text-muted-foreground">View and manage your order history</p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredOrders.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Package className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No orders found</h3>
                  <p className="text-muted-foreground text-center mb-6">
                    {searchQuery
                      ? "No orders match your search criteria. Try a different search term."
                      : activeTab === "all"
                        ? "You haven't placed any orders yet."
                        : `You don't have any ${activeTab} orders.`}
                  </p>
                  <Link href="/products">
                    <Button>Browse Products</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <Card key={order.id} className="overflow-hidden">
                    <CardHeader className="p-4 bg-muted/30">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Order:</span>
                            <span className="font-bold">{order.id}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{new Date(order.date).toLocaleDateString()}</span>
                          </div>
                          <div>{getStatusBadge(order.status)}</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="font-medium">${order.total.toFixed(2)}</div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-0 h-8 w-8"
                            onClick={() => toggleOrderExpand(order.id)}
                          >
                            {expandedOrder === order.id ? (
                              <ChevronUp className="h-5 w-5" />
                            ) : (
                              <ChevronDown className="h-5 w-5" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    {expandedOrder === order.id && (
                      <CardContent className="p-4 border-t">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Items</h4>
                            <div className="space-y-3">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex items-center gap-3">
                                  <div className="h-16 w-16 rounded-md overflow-hidden bg-muted/50">
                                    <Image
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.name}
                                      width={64}
                                      height={64}
                                      className="object-cover w-full h-full"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-medium">{item.name}</div>
                                    <div className="text-sm text-muted-foreground">
                                      Qty: {item.quantity} × ${item.price.toFixed(2)}
                                    </div>
                                  </div>
                                  <div className="font-medium">${(item.quantity * item.price).toFixed(2)}</div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col md:flex-row gap-6 pt-4 border-t">
                            <div className="flex-1">
                              <h4 className="font-medium mb-2">Shipping Address</h4>
                              <div className="text-sm text-muted-foreground">
                                <p>{order.shippingAddress.name}</p>
                                <p>{order.shippingAddress.street}</p>
                                <p>
                                  {order.shippingAddress.city}, {order.shippingAddress.state}
                                </p>
                                <p>
                                  {order.shippingAddress.country}, {order.shippingAddress.zipCode}
                                </p>
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium mb-2">Order Information</h4>
                              <div className="text-sm space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Payment Method:</span>
                                  <span>{order.paymentMethod}</span>
                                </div>
                                {order.trackingNumber && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Tracking Number:</span>
                                    <span>{order.trackingNumber}</span>
                                  </div>
                                )}
                                {order.estimatedDelivery && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Estimated Delivery:</span>
                                    <span>{new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                                  </div>
                                )}
                                {order.deliveredDate && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Delivered On:</span>
                                    <span>{new Date(order.deliveredDate).toLocaleDateString()}</span>
                                  </div>
                                )}
                                {order.cancelReason && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Cancel Reason:</span>
                                    <span>{order.cancelReason}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-4 border-t">
                            <Button variant="outline" size="sm" onClick={() => openOrderDetails(order.id)}>
                              View Details
                            </Button>
                            <div className="space-x-2">
                              {order.status === "delivered" && (
                                <Button size="sm" variant="outline">
                                  Write Review
                                </Button>
                              )}
                              {(order.status === "processing" || order.status === "shipped") && (
                                <Button size="sm" variant="outline">
                                  Track Order
                                </Button>
                              )}
                              {order.status === "processing" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                >
                                  Cancel Order
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Order Details Modal */}
      {selectedOrderData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getStatusIcon(selectedOrderData.status)}
                <div>
                  <h2 className="text-xl font-bold">Order {selectedOrderData.id}</h2>
                  <p className="text-sm text-muted-foreground">
                    Placed on {new Date(selectedOrderData.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={closeOrderDetails}>
                <XCircle className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Status */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="font-medium mb-4">Order Status</h3>
                <div className="relative">
                  <div className="absolute left-2.5 top-0 bottom-0 w-0.5 bg-muted-foreground/30"></div>
                  <div className="space-y-6">
                    <div className="relative pl-8">
                      <div
                        className={`absolute left-0 w-5 h-5 rounded-full ${selectedOrderData.status !== "cancelled" ? "bg-green-500" : "bg-muted-foreground/30"} flex items-center justify-center`}
                      >
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">Order Placed</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(selectedOrderData.date).toLocaleDateString()} at{" "}
                          {new Date(selectedOrderData.date).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>

                    <div className="relative pl-8">
                      <div
                        className={`absolute left-0 w-5 h-5 rounded-full ${selectedOrderData.status === "processing" || selectedOrderData.status === "shipped" || selectedOrderData.status === "delivered" ? "bg-green-500" : "bg-muted-foreground/30"} flex items-center justify-center`}
                      >
                        {selectedOrderData.status === "processing" ||
                        selectedOrderData.status === "shipped" ||
                        selectedOrderData.status === "delivered" ? (
                          <CheckCircle className="h-3 w-3 text-white" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/50"></div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">Processing</h4>
                        <p className="text-sm text-muted-foreground">
                          {selectedOrderData.status === "processing" ||
                          selectedOrderData.status === "shipped" ||
                          selectedOrderData.status === "delivered"
                            ? "Your order is being processed"
                            : selectedOrderData.status === "cancelled"
                              ? "Order was cancelled"
                              : "Pending"}
                        </p>
                      </div>
                    </div>

                    <div className="relative pl-8">
                      <div
                        className={`absolute left-0 w-5 h-5 rounded-full ${selectedOrderData.status === "shipped" || selectedOrderData.status === "delivered" ? "bg-green-500" : "bg-muted-foreground/30"} flex items-center justify-center`}
                      >
                        {selectedOrderData.status === "shipped" || selectedOrderData.status === "delivered" ? (
                          <CheckCircle className="h-3 w-3 text-white" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/50"></div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">Shipped</h4>
                        <p className="text-sm text-muted-foreground">
                          {selectedOrderData.status === "shipped"
                            ? `Your order has been shipped. Tracking: ${selectedOrderData.trackingNumber}`
                            : selectedOrderData.status === "delivered"
                              ? `Your order was shipped. Tracking: ${selectedOrderData.trackingNumber}`
                              : "Pending"}
                        </p>
                      </div>
                    </div>

                    <div className="relative pl-8">
                      <div
                        className={`absolute left-0 w-5 h-5 rounded-full ${selectedOrderData.status === "delivered" ? "bg-green-500" : "bg-muted-foreground/30"} flex items-center justify-center`}
                      >
                        {selectedOrderData.status === "delivered" ? (
                          <CheckCircle className="h-3 w-3 text-white" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/50"></div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">Delivered</h4>
                        <p className="text-sm text-muted-foreground">
                          {selectedOrderData.status === "delivered"
                            ? `Delivered on ${new Date(selectedOrderData.deliveredDate!).toLocaleDateString()}`
                            : "Pending"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-medium mb-4">Order Items</h3>
                <div className="space-y-4 border rounded-lg divide-y">
                  {selectedOrderData.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4">
                      <div className="h-20 w-20 rounded-md overflow-hidden bg-muted/50">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground mt-1">Qty: {item.quantity}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${(item.quantity * item.price).toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground mt-1">${item.price.toFixed(2)} each</div>
                      </div>
                    </div>
                  ))}

                  <div className="p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${selectedOrderData.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>Included</span>
                    </div>
                    <div className="flex justify-between font-medium pt-2 border-t">
                      <span>Total</span>
                      <span>${selectedOrderData.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping and Billing */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-4">Shipping Information</h3>
                  <div className="border rounded-lg p-4">
                    <div className="space-y-1">
                      <p className="font-medium">{selectedOrderData.shippingAddress.name}</p>
                      <p>{selectedOrderData.shippingAddress.street}</p>
                      <p>
                        {selectedOrderData.shippingAddress.city}, {selectedOrderData.shippingAddress.state}
                      </p>
                      <p>
                        {selectedOrderData.shippingAddress.country}, {selectedOrderData.shippingAddress.zipCode}
                      </p>
                    </div>

                    {selectedOrderData.trackingNumber && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Tracking Number</p>
                            <p className="text-sm text-muted-foreground">{selectedOrderData.trackingNumber}</p>
                          </div>
                          <Button size="sm" variant="outline">
                            Track
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Payment Information</h3>
                  <div className="border rounded-lg p-4">
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium">Payment Method</p>
                        <p className="text-sm text-muted-foreground">{selectedOrderData.paymentMethod}</p>
                      </div>

                      <div>
                        <p className="font-medium">Billing Address</p>
                        <p className="text-sm text-muted-foreground">{selectedOrderData.shippingAddress.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedOrderData.shippingAddress.street}</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedOrderData.shippingAddress.city}, {selectedOrderData.shippingAddress.state}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {selectedOrderData.shippingAddress.country}, {selectedOrderData.shippingAddress.zipCode}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white p-4 border-t flex justify-between">
              <Button variant="outline" size="sm" className="gap-1">
                <FileText className="h-4 w-4" />
                Invoice
              </Button>
              <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={closeOrderDetails}>
                  Close
                </Button>
                {selectedOrderData.status === "delivered" && <Button size="sm">Buy Again</Button>}
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

