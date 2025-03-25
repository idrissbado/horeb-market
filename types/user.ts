export interface User {
    id: string
    firstName: string
    lastName: string
    email: string
    password?: string
    role: "user" | "admin" | "seller"
    createdAt: string
    avatar?: string
    phone?: string
    address?: {
      street: string
      city: string
      state: string
      country: string
      zipCode: string
    }
    isSeller: boolean
    storeInfo?: {
      name: string
      description: string
      logo?: string
      coverImage?: string
      rating?: number
      followers?: number
      productsCount?: number
      joinedDate: string
    }
  }
  
  export interface Order {
    id: string
    userId: string
    products: {
      id: string
      name: string
      price: number
      quantity: number
      image: string
    }[]
    totalAmount: number
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
    paymentMethod: string
    shippingAddress: {
      street: string
      city: string
      state: string
      country: string
      zipCode: string
    }
    createdAt: string
    updatedAt: string
  }
  
  export interface Product {
    id: string
    name: string
    description: string
    price: number
    originalPrice?: number
    discount?: number
    images: string[]
    category: string
    subcategory?: string
    sellerId: string
    sellerName: string
    rating: number
    reviewCount: number
    stock: number
    tags: string[]
    isNew?: boolean
    isFeatured?: boolean
    createdAt: string
    updatedAt: string
  }
  
  