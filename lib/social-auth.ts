// This is a simplified social auth service for demonstration
// In a real application, you would use a proper authentication system like NextAuth.js or Auth.js

import type { User } from "@/types/user"
import { getUserById, registerUser } from "./auth"

// Mock Google OAuth login
export const loginWithGoogle = async (): Promise<User | null> => {
  // In a real implementation, this would redirect to Google OAuth
  // and handle the callback with the user information

  // For demo purposes, we'll create a mock Google user
  const mockGoogleUser = {
    id: "google-123456",
    firstName: "Google",
    lastName: "User",
    email: "google.user@example.com",
    role: "user" as const,
    createdAt: new Date().toISOString(),
    avatar: "/placeholder.svg?height=200&width=200&text=GU",
    isSeller: false,
  }

  // Check if user already exists
  const existingUser = await getUserById(mockGoogleUser.id)
  if (existingUser) {
    return existingUser
  }

  // Register new user
  const newUser = await registerUser({
    firstName: mockGoogleUser.firstName,
    lastName: mockGoogleUser.lastName,
    email: mockGoogleUser.email,
    password: "google-oauth-no-password", // In a real app, you wouldn't set a password for OAuth users
    isSeller: false,
    avatar: mockGoogleUser.avatar,
  })

  return newUser
}

// Mock Facebook OAuth login
export const loginWithFacebook = async (): Promise<User | null> => {
  // In a real implementation, this would redirect to Facebook OAuth
  // and handle the callback with the user information

  // For demo purposes, we'll create a mock Facebook user
  const mockFacebookUser = {
    id: "facebook-123456",
    firstName: "Facebook",
    lastName: "User",
    email: "facebook.user@example.com",
    role: "user" as const,
    createdAt: new Date().toISOString(),
    avatar: "/placeholder.svg?height=200&width=200&text=FB",
    isSeller: false,
  }

  // Check if user already exists
  const existingUser = await getUserById(mockFacebookUser.id)
  if (existingUser) {
    return existingUser
  }

  // Register new user
  const newUser = await registerUser({
    firstName: mockFacebookUser.firstName,
    lastName: mockFacebookUser.lastName,
    email: mockFacebookUser.email,
    password: "facebook-oauth-no-password", // In a real app, you wouldn't set a password for OAuth users
    isSeller: false,
    avatar: mockFacebookUser.avatar,
  })

  return newUser
}

