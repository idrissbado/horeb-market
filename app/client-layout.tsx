'use client'

import { AuthProvider } from "@/contexts/auth-context"
import { Chatbot } from "@/components/chatbot"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from '@/providers/cart-provider'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
        <Chatbot />
        <Toaster />
      </CartProvider>
    </AuthProvider>
  )
} 