"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // This would normally connect to your newsletter service
      setSubmitted(true)
      setEmail("")
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Stay updated with our latest products, exclusive offers, and promotions. Subscribe to our newsletter and
            never miss out!
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="rounded-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="rounded-full px-8">
              {submitted ? (
                "Subscribed!"
              ) : (
                <>
                  Subscribe
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  )
}

