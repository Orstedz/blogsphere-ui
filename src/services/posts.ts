import apiClient from "./api"
import type { Post, ApiResponse } from "@/types"

export const postService = {
  getAll: () => apiClient.get<ApiResponse<Post[]>>("/posts"),

  create: (data: Omit<Post, "_id" | "createdAt" | "updatedAt">) => apiClient.post<ApiResponse<Post>>("/posts", data),

  update: (id: number, data: Partial<Post>) => apiClient.put<ApiResponse<void>>(`/posts/${id}`, data),

  delete: (id: number) => apiClient.delete<ApiResponse<void>>(`/posts/${id}`),
}
