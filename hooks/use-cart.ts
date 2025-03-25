"use client"

import { useState, useEffect } from "react"
import { useLocalStorage } from "./use-local-storage"
import { useToast } from "./use-toast"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export function useCart() {
  const [cart, setCart] = useLocalStorage<CartItem[]>("cart", [])
  const [totalItems, setTotalItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const { toast } = useToast()

  // Update totals when cart changes
  useEffect(() => {
    setTotalItems(cart.reduce((total, item) => total + item.quantity, 0))
    setTotalPrice(cart.reduce((total, item) => total + item.price * item.quantity, 0))
  }, [cart])

  // Add item to cart
  const addItem = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id)

      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += quantity

        // Show notification
        toast({
          title: "Cart updated",
          description: `${item.name} quantity increased to ${updatedCart[existingItemIndex].quantity}`,
          variant: "success",
        })

        return updatedCart
      } else {
        // Item doesn't exist, add new item

        // Show notification
        toast({
          title: "Added to cart",
          description: `${item.name} has been added to your cart`,
          variant: "success",
        })

        return [...prevCart, { ...item, quantity }]
      }
    })
  }

  // Update item quantity
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return

    setCart((prevCart) => {
      const item = prevCart.find((item) => item.id === id)
      const updatedCart = prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))

      if (item) {
        toast({
          title: "Cart updated",
          description: `${item.name} quantity updated to ${quantity}`,
          variant: "default",
        })
      }

      return updatedCart
    })
  }

  // Remove item from cart
  const removeItem = (id: string) => {
    setCart((prevCart) => {
      const item = prevCart.find((item) => item.id === id)
      const filteredCart = prevCart.filter((item) => item.id !== id)

      if (item) {
        toast({
          title: "Item removed",
          description: `${item.name} has been removed from your cart`,
          variant: "default",
        })
      }

      return filteredCart
    })
  }

  // Clear cart
  const clearCart = () => {
    setCart([])
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
      variant: "default",
    })
  }

  return {
    cart,
    totalItems,
    totalPrice,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  }
}

