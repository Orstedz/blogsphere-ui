export interface Category {
  id: number
  name: string
  description?: string
  created_at: string
  updated_at: string
}

export interface Post {
  id: number
  title: string
  content: string
  category_id?: number
  category_name?: string
  series_id?: number
  series_name?: string
  author_id: number
  author_name?: string
  status: "Draft" | "Published" | "Archived"
  created_at: string
  updated_at: string
}

export interface Series {
  id: number
  name: string
  description?: string
  created_at: string
  updated_at: string
}

export interface User {
  id: number
  username: string
  email: string
  role_id?: number
  role_name?: string
  created_at: string
  updated_at: string
}

export interface Role {
  id: number
  name: string
  description?: string
  created_at: string
  updated_at: string
}

export interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
  error?: string
}