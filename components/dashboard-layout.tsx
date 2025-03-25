"use client"

import { type ReactNode, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ShoppingBag,
  User,
  Package,
  Heart,
  Settings,
  LogOut,
  Menu,
  Home,
  ShoppingCart,
  Store,
  Bell,
  MessageSquare,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/contexts/auth-context"
import { Badge } from "@/components/ui/badge"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Orders", href: "/dashboard/orders", icon: Package },
    { name: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  const sellerNavigation = [
    { name: "My Store", href: "/dashboard/store", icon: Store },
    { name: "Products", href: "/dashboard/products", icon: ShoppingBag },
    { name: "Sales", href: "/dashboard/sales", icon: ShoppingCart },
  ]

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed top-4 left-4 z-40 md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl">Horeb Market</span>
              </div>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <div className="px-3 py-4">
                <div className="flex items-center gap-3 mb-6 px-3">
                  <Avatar>
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>
                      {user?.firstName?.[0]}
                      {user?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {user?.firstName} {user?.lastName}
                    </div>
                    <div className="text-sm text-muted-foreground">{user?.email}</div>
                  </div>
                </div>
                <div className="space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                        pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  ))}
                </div>

                {user?.isSeller && (
                  <>
                    <div className="mt-6 mb-2 px-3">
                      <h3 className="text-sm font-medium text-muted-foreground">Seller Dashboard</h3>
                    </div>
                    <div className="space-y-1">
                      {sellerNavigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                            pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </>
                )}

                {!user?.isSeller && (
                  <div className="mt-6 px-3">
                    <Link
                      href="/dashboard/become-seller"
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm bg-muted hover:bg-muted/80"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Store className="h-4 w-4" />
                      Become a Seller
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 border-t">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r bg-white">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex items-center gap-3 px-4 mb-6">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Horeb Market</span>
            </div>
            <div className="mt-5 flex flex-1 flex-col">
              <div className="px-3 py-4">
                <div className="flex items-center gap-3 mb-6 px-3">
                  <Avatar>
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>
                      {user?.firstName?.[0]}
                      {user?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {user?.firstName} {user?.lastName}
                    </div>
                    <div className="text-sm text-muted-foreground">{user?.email}</div>
                  </div>
                </div>
                <div className="space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                        pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  ))}
                </div>

                {user?.isSeller && (
                  <>
                    <div className="mt-6 mb-2 px-3">
                      <h3 className="text-sm font-medium text-muted-foreground">Seller Dashboard</h3>
                    </div>
                    <div className="space-y-1">
                      {sellerNavigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                            pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </>
                )}

                {!user?.isSeller && (
                  <div className="mt-6 px-3">
                    <Link
                      href="/dashboard/become-seller"
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm bg-muted hover:bg-muted/80"
                    >
                      <Store className="h-4 w-4" />
                      Become a Seller
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-shrink-0 border-t p-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
          <div className="flex flex-1 justify-between px-4 md:px-6">
            <div className="flex flex-1 items-center">
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
            </div>
            <div className="ml-4 flex items-center md:ml-6 gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Store
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                  3
                </Badge>
              </Button>
              <Button variant="ghost" size="icon">
                <MessageSquare className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <main className="py-6 px-4 sm:px-6 md:px-8">{children}</main>
      </div>
    </div>
  )
}

