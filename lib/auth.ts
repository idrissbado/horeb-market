// This is a simplified auth service for demonstration
// In a real application, you would use a proper authentication system like NextAuth.js or Auth.js

import type { User } from "@/types/user"

// Mock database of users
const users: User[] = [
  {
    id: "1",
    firstName: "Admin",
    lastName: "User",
    email: "admin@horebmarket.com",
    password: "password123", // In a real app, this would be hashed
    role: "admin",
    createdAt: new Date().toISOString(),
    avatar: "/placeholder.svg?height=200&width=200&text=Admin",
    phone: "+225 0758409136",
    address: {
      street: "123 Market Street",
      city: "Abidjan",
      state: "Lagunes",
      country: "Ivory Coast",
      zipCode: "00225",
    },
    isSeller: true,
    storeInfo: {
      name: "Horeb Official Store",
      description: "Official store of Horeb Market",
      logo: "/placeholder.svg?height=200&width=200&text=Horeb",
      coverImage: "/placeholder.svg?height=600&width=1200&text=Horeb+Store",
      rating: 4.9,
      followers: 1250,
      productsCount: 45,
      joinedDate: new Date().toISOString(),
    },
  },
]

// Register a new user
export const registerUser = async (userData: Omit<User, "id" | "createdAt" | "role">): Promise<User | null> => {
  // Check if user already exists
  const existingUser = users.find((user) => user.email === userData.email)
  if (existingUser) {
    return null
  }

  // Create new user
  const newUser: User = {
    id: (users.length + 1).toString(),
    ...userData,
    role: "user",
    createdAt: new Date().toISOString(),
    isSeller: false,
  }

  users.push(newUser)
  return newUser
}

// Login user
export const loginUser = async (email: string, password: string): Promise<User | null> => {
  const user = users.find((user) => user.email === email && user.password === password)
  if (!user) {
    return null
  }

  // Don't return the password in a real app
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword as User
}

// Get user by ID
export const getUserById = async (id: string): Promise<User | null> => {
  const user = users.find((user) => user.id === id)
  if (!user) {
    return null
  }

  // Don't return the password in a real app
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword as User
}

// Update user
export const updateUser = async (id: string, userData: Partial<User>): Promise<User | null> => {
  const userIndex = users.findIndex((user) => user.id === id)
  if (userIndex === -1) {
    return null
  }

  // Update user data
  users[userIndex] = { ...users[userIndex], ...userData }

  // Don't return the password in a real app
  const { password: _, ...userWithoutPassword } = users[userIndex]
  return userWithoutPassword as User
}

// Become a seller
export const becomeSeller = async (id: string, storeInfo: User["storeInfo"]): Promise<User | null> => {
  console.log("becomeSeller called with id:", id, "and storeInfo:", storeInfo)

  // Check if user exists
  const userIndex = users.findIndex((user) => user.id === id)
  if (userIndex === -1) {
    console.error("User not found with id:", id)
    return null
  }

  try {
    // Update user to be a seller
    users[userIndex] = {
      ...users[userIndex],
      isSeller: true,
      storeInfo,
    }

    console.log("User updated successfully:", users[userIndex])

    // Don't return the password in a real app
    const { password: _, ...userWithoutPassword } = users[userIndex]
    return userWithoutPassword as User
  } catch (error) {
    console.error("Error updating user to seller:", error)
    return null
  }
}

