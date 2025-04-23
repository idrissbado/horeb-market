export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating?: number
  reviewCount?: number
  type?: string
  stock?: number
  description?: string
  sellerId?: string
  createdAt?: Date
  updatedAt?: Date
} 