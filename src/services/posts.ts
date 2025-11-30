import apiClient from "./api"
import type { Post, ApiResponse } from "@/types"

export const postService = {
  getAll: () => apiClient.get<ApiResponse<Post[]>>("/posts"),

  create: (data: Omit<Post, "id" | "created_at" | "updated_at">) => apiClient.post<ApiResponse<Post>>("/posts", data),

  update: (id: string, data: Partial<Post>) => apiClient.put<ApiResponse<void>>(`/posts/${id}`, data),

  delete: (id: string) => apiClient.delete<ApiResponse<void>>(`/posts/${id}`),
}
