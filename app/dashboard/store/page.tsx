"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingBag, Package, DollarSign, Users, Plus, Settings, BarChart } from "lucide-react"
import Link from "next/link"

export default function StoreDashboardPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect to become-seller if user is not a seller
    if (user && !user.isSeller) {
      router.push("/dashboard/become-seller")
    }
  }, [user, router])

  if (!user?.isSeller) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="text-muted-foreground">Checking seller status...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  // Mock data for demonstration
  const storeStats = {
    totalSales: 12580.75,
    totalOrders: 156,
    totalProducts: 45,
    totalCustomers: 120,
  }

  const recentOrders = [
    { id: "ORD-001", date: "2023-05-15", status: "delivered", total: 129.99, customer: "John Doe" },
    { id: "ORD-002", date: "2023-05-10", status: "processing", total: 79.5, customer: "Jane Smith" },
    { id: "ORD-003", date: "2023-05-05", status: "shipped", total: 249.99, customer: "Robert Johnson" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Seller Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome to your store dashboard. Manage your products, orders, and sales.
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard/products/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </Link>
            <Link href="/dashboard/store/settings">
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Store Settings
              </Button>
            </Link>
          </div>
        </div>

        {/* Store Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${storeStats.totalSales.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">+$1,245.80 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{storeStats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">+24 orders this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{storeStats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">+5 products this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{storeStats.totalCustomers}</div>
              <p className="text-xs text-muted-foreground">+12 customers this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Store Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Your store's performance this month</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center bg-muted/20">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BarChart className="h-5 w-5" />
                  <span>Sales chart will be displayed here</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your store's latest orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="font-medium">{order.id}</div>
                        <div className="text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString()}</div>
                      </div>
                      <div className="text-sm">{order.customer}</div>
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
                <div className="mt-4 text-center">
                  <Link href="/dashboard/orders">
                    <Button variant="outline">View All Orders</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Orders</CardTitle>
                <CardDescription>Manage your store's orders</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Order management interface will be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Products</CardTitle>
                <CardDescription>Manage your store's products</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Product management interface will be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>View your store's performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">Analytics dashboard will be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

