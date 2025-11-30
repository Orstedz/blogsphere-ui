export interface Category {
  id: string
  name: string
  description?: string
  is_deleted: boolean
  created_by: string
  created_at: string
  updated_at: string
}

export interface Post {
  id: string
  title: string
  content: string
  category_id?: string
  category_name?: string
  series_id?: string
  series_name?: string
  author_id: string
  author_name?: string
  status: "Draft" | "Published" | "Archived"
  created_at: string
  updated_at: string
  deleted_at?: string
}

export interface Series {
  id: string
  name: string
  description?: string
  status: "Active" | "Inactive"
  created_by: string
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  username: string
  email: string
  role_id?: string
  role_name?: string
  created_at: string
  updated_at: string
  deleted_at?: string
}

export interface Role {
  id: string
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