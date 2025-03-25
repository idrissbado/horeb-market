"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "@/types/user"
import { loginUser, registerUser } from "@/lib/auth"
import { loginWithGoogle, loginWithFacebook } from "@/lib/social-auth"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: Omit<User, "id" | "createdAt" | "role">) => Promise<boolean>
  loginWithGoogle: () => Promise<boolean>
  loginWithFacebook: () => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (err) {
        console.error("Failed to parse stored user:", err)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    setError(null)
    try {
      const loggedInUser = await loginUser(email, password)
      if (loggedInUser) {
        setUser(loggedInUser)
        localStorage.setItem("user", JSON.stringify(loggedInUser))
        return true
      } else {
        setError("Invalid email or password")
        return false
      }
    } catch (err) {
      setError("An error occurred during login")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: Omit<User, "id" | "createdAt" | "role">): Promise<boolean> => {
    setIsLoading(true)
    setError(null)
    try {
      const newUser = await registerUser(userData)
      if (newUser) {
        setUser(newUser)
        localStorage.setItem("user", JSON.stringify(newUser))
        return true
      } else {
        setError("Email already in use")
        return false
      }
    } catch (err) {
      setError("An error occurred during registration")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async (): Promise<boolean> => {
    setIsLoading(true)
    setError(null)
    try {
      const googleUser = await loginWithGoogle()
      if (googleUser) {
        setUser(googleUser)
        localStorage.setItem("user", JSON.stringify(googleUser))
        return true
      } else {
        setError("Failed to login with Google")
        return false
      }
    } catch (err) {
      setError("An error occurred during Google login")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const handleFacebookLogin = async (): Promise<boolean> => {
    setIsLoading(true)
    setError(null)
    try {
      const facebookUser = await loginWithFacebook()
      if (facebookUser) {
        setUser(facebookUser)
        localStorage.setItem("user", JSON.stringify(facebookUser))
        return true
      } else {
        setError("Failed to login with Facebook")
        return false
      }
    } catch (err) {
      setError("An error occurred during Facebook login")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        register,
        loginWithGoogle: handleGoogleLogin,
        loginWithFacebook: handleFacebookLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

