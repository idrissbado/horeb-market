"use client"

import type React from "react"

// Inspired by react-hot-toast library
import { useState, useCallback } from "react"

export type ToastProps = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive" | "success"
}

export type ToastActionElement = React.ReactElement<{
  altText: string
  onClick: () => void
}>

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = useCallback(({ title, description, action, variant = "default" }: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { id, title, description, action, variant }

    setToasts((prevToasts) => [...prevToasts, newToast])

    // Auto-dismiss this toast after 5 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    }, 5000)

    return id
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  const dismissAll = useCallback(() => {
    setToasts([])
  }, [])

  return {
    toast,
    dismiss,
    dismissAll,
    toasts,
  }
}

