"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, CheckCircle2, User, Mail, Phone, MapPin, Lock, Camera } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { updateUser } from "@/lib/auth"

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: {
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      country: user?.address?.country || "",
      zipCode: user?.address?.zipCode || "",
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      if (!user?.id) {
        throw new Error("User ID not found")
      }

      const result = await updateUser(user.id, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        address: formData.address,
      })

      if (!result) {
        throw new Error("Failed to update profile")
      }

      setSuccess(true)
      setIsEditing(false)
    } catch (err: any) {
      setError(err.message || "An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
            <p className="text-muted-foreground">Manage your account settings and profile information</p>
          </div>
          {!isEditing && <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>}
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">Your profile has been updated successfully.</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="profile" className="w-full">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information and contact details</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3 flex flex-col items-center">
                      <div className="relative">
                        <Avatar className="h-32 w-32">
                          <AvatarImage src={user?.avatar} />
                          <AvatarFallback className="text-2xl">
                            {user?.firstName?.[0]}
                            {user?.lastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        {isEditing && (
                          <Button
                            variant="secondary"
                            size="icon"
                            className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                          >
                            <Camera className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="mt-4 text-center">
                        <h3 className="font-medium text-lg">
                          {user?.firstName} {user?.lastName}
                        </h3>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Member since {new Date(user?.createdAt || "").toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="md:w-2/3 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="firstName"
                              name="firstName"
                              placeholder="First Name"
                              className="pl-10"
                              value={formData.firstName}
                              onChange={handleChange}
                              disabled={!isEditing}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            disabled={!isEditing}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="pl-10"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={true} // Email cannot be changed
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            name="phone"
                            placeholder="Phone Number"
                            className="pl-10"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium mb-4 flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Address Information
                        </h3>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="address.street">Street Address</Label>
                            <Input
                              id="address.street"
                              name="address.street"
                              placeholder="Street Address"
                              value={formData.address.street}
                              onChange={handleChange}
                              disabled={!isEditing}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="address.city">City</Label>
                              <Input
                                id="address.city"
                                name="address.city"
                                placeholder="City"
                                value={formData.address.city}
                                onChange={handleChange}
                                disabled={!isEditing}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="address.state">State/Province</Label>
                              <Input
                                id="address.state"
                                name="address.state"
                                placeholder="State/Province"
                                value={formData.address.state}
                                onChange={handleChange}
                                disabled={!isEditing}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="address.country">Country</Label>
                              <Input
                                id="address.country"
                                name="address.country"
                                placeholder="Country"
                                value={formData.address.country}
                                onChange={handleChange}
                                disabled={!isEditing}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="address.zipCode">Postal/Zip Code</Label>
                              <Input
                                id="address.zipCode"
                                name="address.zipCode"
                                placeholder="Postal/Zip Code"
                                value={formData.address.zipCode}
                                onChange={handleChange}
                                disabled={!isEditing}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end gap-2 mt-6">
                      <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your password and account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4 flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Password
                  </h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" placeholder="••••••••" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" placeholder="••••••••" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" placeholder="••••••••" />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button>Update Password</Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-4">Connected Accounts</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#4285F4] rounded-full flex items-center justify-center">
                          <svg className="h-5 w-5 text-white" viewBox="0 0 24 24">
                            <path
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              fill="#4285F4"
                            />
                            <path
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              fill="#34A853"
                            />
                            <path
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              fill="#FBBC05"
                            />
                            <path
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              fill="#EA4335"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">Google</h4>
                          <p className="text-sm text-muted-foreground">{user?.email ? "Connected" : "Not connected"}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        {user?.email ? "Disconnect" : "Connect"}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center">
                          <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">Facebook</h4>
                          <p className="text-sm text-muted-foreground">Not connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Manage your notification and communication preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Order Updates</h4>
                          <p className="text-sm text-muted-foreground">Receive emails about your order status</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="order-updates" className="sr-only">
                            Order Updates
                          </Label>
                          <input
                            type="checkbox"
                            id="order-updates"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            defaultChecked
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Promotions and Deals</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive emails about promotions, deals, and new products
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="promotions" className="sr-only">
                            Promotions and Deals
                          </Label>
                          <input
                            type="checkbox"
                            id="promotions"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            defaultChecked
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Account Updates</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive emails about your account activity and security
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="account-updates" className="sr-only">
                            Account Updates
                          </Label>
                          <input
                            type="checkbox"
                            id="account-updates"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            defaultChecked
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-4">Language and Region</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <select
                          id="language"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          defaultValue="en"
                        >
                          <option value="en">English</option>
                          <option value="fr">Français</option>
                          <option value="es">Español</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currency">Currency</Label>
                        <select
                          id="currency"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          defaultValue="usd"
                        >
                          <option value="usd">USD ($)</option>
                          <option value="eur">EUR (€)</option>
                          <option value="xof">XOF (CFA)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

