export interface Category {
  _id: number
  name: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface Series {
  _id: number
  name: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface Role {
  _id: number
  name: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface User {
  _id: number
  username: string
  email: string
  password?: string
  role?: Role | number // Can be populated object or just ID
  createdAt: string
  updatedAt: string
}

export interface Post {
  _id: number
  title: string
  content: string
  category?: Category | number // Can be populated object or just ID
  series?: Series | number // Can be populated object or just ID
  author: User | number // Can be populated object or just ID
  status: "Draft" | "Published" | "Archived"
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
  error?: string
}