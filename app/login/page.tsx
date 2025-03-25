"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ShoppingBag, Eye, EyeOff, Mail, Lock, User, ArrowRight, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"

export default function AuthPage() {
  const router = useRouter()
  const { login, register, loginWithGoogle, loginWithFacebook, error, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  // Login form state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // Register form state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    if (!loginEmail || !loginPassword) {
      setFormError("Please fill in all fields")
      return
    }

    const success = await login(loginEmail, loginPassword)
    if (success) {
      router.push("/dashboard")
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    if (!firstName || !lastName || !registerEmail || !registerPassword) {
      setFormError("Please fill in all fields")
      return
    }

    if (!agreeTerms) {
      setFormError("You must agree to the Terms of Service and Privacy Policy")
      return
    }

    if (registerPassword.length < 8) {
      setFormError("Password must be at least 8 characters long")
      return
    }

    const success = await register({
      firstName,
      lastName,
      email: registerEmail,
      password: registerPassword,
      isSeller: false,
    })

    if (success) {
      router.push("/dashboard")
    }
  }

  const handleGoogleLogin = async () => {
    const success = await loginWithGoogle()
    if (success) {
      router.push("/dashboard")
    }
  }

  const handleFacebookLogin = async () => {
    const success = await loginWithFacebook()
    if (success) {
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center py-12">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          <div className="space-y-6 hidden md:block">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight">Welcome to Horeb Market</h1>
              <p className="text-muted-foreground">Your premier digital marketplace in Ivory Coast</p>
            </div>
            <div className="relative h-[500px] w-full overflow-hidden rounded-xl">
              <Image
                src="/placeholder.svg?height=800&width=600&text=Shopping+Experience"
                alt="Shopping Experience"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Exclusive Offers</h2>
                <p className="mb-4">Sign up today and get 15% off your first purchase</p>
                <div className="flex gap-2">
                  <Badge className="bg-white text-primary">New Arrivals</Badge>
                  <Badge className="bg-white text-primary">Free Shipping</Badge>
                  <Badge className="bg-white text-primary">24/7 Support</Badge>
                </div>
              </div>
            </div>
          </div>

          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="md:hidden text-center pt-6 px-6">
              <ShoppingBag className="h-12 w-12 mx-auto text-primary" />
              <h1 className="text-2xl font-bold mt-2">Horeb Market</h1>
              <p className="text-sm text-muted-foreground">Sign in to your account or create a new one</p>
            </div>

            <CardContent className="p-6 md:p-8">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>

                {(error || formError) && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error || formError}</AlertDescription>
                  </Alert>
                )}

                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleLogin}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            className="pl-10"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                            Forgot password?
                          </Link>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            type="button"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember" className="text-sm font-normal">
                          Remember me for 30 days
                        </Label>
                      </div>
                      <Button className="w-full" size="lg" type="submit" disabled={isLoading}>
                        {isLoading ? "Signing in..." : "Sign In"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </form>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-background px-2 text-xs text-muted-foreground">OR CONTINUE WITH</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={isLoading}>
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
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
                      Google
                    </Button>
                    <Button variant="outline" className="w-full" onClick={handleFacebookLogin} disabled={isLoading}>
                      <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                      Facebook
                    </Button>
                  </div>

                  <div className="text-center text-sm text-muted-foreground mt-6">
                    Don&apos;t have an account?{" "}
                    <button
                      className="text-primary font-medium hover:underline"
                      onClick={() => document.querySelector('[data-value="register"]')?.click()}
                      type="button"
                    >
                      Sign up
                    </button>
                  </div>
                </TabsContent>

                <TabsContent value="register" className="space-y-4">
                  <form onSubmit={handleRegister}>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="first-name"
                              placeholder="John"
                              className="pl-10"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last name</Label>
                          <Input
                            id="last-name"
                            placeholder="Doe"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email-register">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email-register"
                            type="email"
                            placeholder="name@example.com"
                            className="pl-10"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password-register">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password-register"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            required
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            type="button"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Password must be at least 8 characters long and include a number and a special character.
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          checked={agreeTerms}
                          onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                        />
                        <Label htmlFor="terms" className="text-sm font-normal">
                          I agree to the{" "}
                          <Link href="/terms" className="text-primary hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>
                      <Button className="w-full" size="lg" type="submit" disabled={isLoading}>
                        {isLoading ? "Creating Account..." : "Create Account"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </form>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-background px-2 text-xs text-muted-foreground">OR CONTINUE WITH</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={isLoading}>
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
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
                      Google
                    </Button>
                    <Button variant="outline" className="w-full" onClick={handleFacebookLogin} disabled={isLoading}>
                      <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                      Facebook
                    </Button>
                  </div>

                  <div className="text-center text-sm text-muted-foreground mt-6">
                    Already have an account?{" "}
                    <button
                      className="text-primary font-medium hover:underline"
                      onClick={() => document.querySelector('[data-value="login"]')?.click()}
                      type="button"
                    >
                      Sign in
                    </button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

