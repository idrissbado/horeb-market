"use client"

import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingBag, Package, CreditCard, Heart, TrendingUp, Users, DollarSign, ShoppingCart } from "lucide-react"
import Link from "next/link"

export function DashboardOverview() {
  const { user } = useAuth()

  // Mock data for demonstration
  const recentOrders = [
    { id: "ORD-001", date: "2023-05-15", status: "delivered", total: 129.99 },
    { id: "ORD-002", date: "2023-05-10", status: "processing", total: 79.5 },
    { id: "ORD-003", date: "2023-05-05", status: "shipped", total: 249.99 },
  ]

  const wishlistItems = [
    {
      id: "PROD-001",
      name: "Wireless Headphones",
      price: 129.99,
      image: "/placeholder.svg?height=80&width=80&text=Headphones",
    },
    { id: "PROD-002", name: "Smart Watch", price: 199.99, image: "/placeholder.svg?height=80&width=80&text=Watch" },
  ]

  // Seller stats (only shown if user is a seller)
  const sellerStats = {
    totalSales: 12580.75,
    totalOrders: 156,
    totalProducts: 45,
    totalCustomers: 120,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.firstName}! Here's what's happening with your account.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/profile">
            <Button variant="outline">View Profile</Button>
          </Link>
          {user?.isSeller ? (
            <Link href="/dashboard/store">
              <Button>Manage Store</Button>
            </Link>
          ) : (
            <Link href="/dashboard/become-seller">
              <Button>Become a Seller</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentOrders.length}</div>
            <p className="text-xs text-muted-foreground">+2 orders this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${recentOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">+$129.99 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wishlist Items</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wishlistItems.length}</div>
            <p className="text-xs text-muted-foreground">+1 item this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Status</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user?.isSeller ? "Seller" : "Customer"}</div>
            <p className="text-xs text-muted-foreground">
              Member since {new Date(user?.createdAt || "").toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Seller Stats (only shown if user is a seller) */}
      {user?.isSeller && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Seller Dashboard</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${sellerStats.totalSales.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">+$1,245.80 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Orders Received</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sellerStats.totalOrders}</div>
                <p className="text-xs text-muted-foreground">+24 orders this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Products</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sellerStats.totalProducts}</div>
                <p className="text-xs text-muted-foreground">+5 products this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sellerStats.totalCustomers}</div>
                <p className="text-xs text-muted-foreground">+12 customers this month</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Tabs for Recent Orders and Wishlist */}
      <Tabs defaultValue="recent-orders" className="mt-6">
        <TabsList>
          <TabsTrigger value="recent-orders">Recent Orders</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
        </TabsList>
        <TabsContent value="recent-orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your recent purchases and their status.</CardDescription>
            </CardHeader>
            <CardContent>
              {recentOrders.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">You haven't placed any orders yet.</p>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="font-medium">{order.id}</div>
                        <div className="text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString()}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div
                          className={`text-sm px-2 py-1 rounded-full ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "processing"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </div>
                        <div className="font-medium">${order.total.toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 text-center">
                <Link href="/dashboard/orders">
                  <Button variant="outline">View All Orders</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="wishlist" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Wishlist</CardTitle>
              <CardDescription>Items you've saved for later.</CardDescription>
            </CardHeader>
            <CardContent>
              {wishlistItems.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">Your wishlist is empty.</p>
              ) : (
                <div className="space-y-4">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">${item.price.toFixed(2)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm">Add to Cart</Button>
                        <Button variant="outline" size="icon">
                          <Heart className="h-4 w-4 fill-current" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 text-center">
                <Link href="/dashboard/wishlist">
                  <Button variant="outline">View Wishlist</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

