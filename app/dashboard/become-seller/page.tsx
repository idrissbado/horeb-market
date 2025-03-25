"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { becomeSeller } from "@/lib/auth"
import { AlertCircle, CheckCircle2, Store } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function BecomeSellerPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    storeName: "",
    storeDescription: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      if (!user?.id) {
        throw new Error("You must be logged in to become a seller")
      }

      if (!formData.storeName || !formData.storeDescription) {
        throw new Error("Please fill in all required fields")
      }

      console.log("Submitting seller application:", {
        userId: user.id,
        storeInfo: {
          name: formData.storeName,
          description: formData.storeDescription,
          logo: "/placeholder.svg?height=200&width=200&text=" + formData.storeName.charAt(0),
          coverImage: "/placeholder.svg?height=600&width=1200&text=" + formData.storeName,
          joinedDate: new Date().toISOString(),
        },
      })

      const result = await becomeSeller(user.id, {
        name: formData.storeName,
        description: formData.storeDescription,
        logo: "/placeholder.svg?height=200&width=200&text=" + formData.storeName.charAt(0),
        coverImage: "/placeholder.svg?height=600&width=1200&text=" + formData.storeName,
        joinedDate: new Date().toISOString(),
      })

      if (!result) {
        throw new Error("Failed to create seller account. Please try again.")
      }

      setSuccess(true)
      console.log("Seller account created successfully:", result)

      // Redirect after a delay
      setTimeout(() => {
        router.push("/dashboard/store")
      }, 2000)
    } catch (err: any) {
      console.error("Error creating seller account:", err)
      setError(err.message || "An error occurred while creating your seller account. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (user?.isSeller) {
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto">
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">You're already a seller!</AlertTitle>
            <AlertDescription className="text-green-700">
              You already have a seller account. Go to your store dashboard to manage your products and orders.
            </AlertDescription>
          </Alert>
          <div className="mt-6 text-center">
            <Button onClick={() => router.push("/dashboard/store")}>Go to Store Dashboard</Button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Become a Seller</h1>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success ? (
          <Alert className="bg-green-50 border-green-200 mb-6">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Success!</AlertTitle>
            <AlertDescription className="text-green-700">
              Your seller account has been created. You will be redirected to your store dashboard shortly.
            </AlertDescription>
          </Alert>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Create Your Store</CardTitle>
              <CardDescription>
                Fill in the details below to set up your seller account and start selling on Horeb Market.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name *</Label>
                  <Input
                    id="storeName"
                    name="storeName"
                    placeholder="Enter your store name"
                    value={formData.storeName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storeDescription">Store Description *</Label>
                  <Textarea
                    id="storeDescription"
                    name="storeDescription"
                    placeholder="Describe your store and what you sell"
                    rows={4}
                    value={formData.storeDescription}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium flex items-center gap-2 mb-2">
                    <Store className="h-4 w-4" />
                    Benefits of becoming a seller
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Access to thousands of customers across Ivory Coast</li>
                    <li>• Easy-to-use dashboard to manage your products and orders</li>
                    <li>• Secure payment processing and order fulfillment</li>
                    <li>• Marketing tools to promote your products</li>
                    <li>• 24/7 seller support</li>
                  </ul>
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Creating Store..." : "Create Seller Account"}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-start border-t px-6 py-4">
              <p className="text-sm text-muted-foreground">
                By creating a seller account, you agree to our{" "}
                <a href="/terms" className="text-primary hover:underline">
                  Seller Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </CardFooter>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

