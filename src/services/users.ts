import apiClient from "./api"
import type { User, ApiResponse } from "@/types"

export const userService = {
  getAll: () => apiClient.get<ApiResponse<User[]>>("/users"),

  create: (data: Omit<User, "id" | "created_at" | "updated_at">) => apiClient.post<ApiResponse<User>>("/users", data),

  update: (id: string, data: Partial<User>) => apiClient.put<ApiResponse<void>>(`/users/${id}`, data),

  delete: (id: string) => apiClient.delete<ApiResponse<void>>(`/users/${id}`),
}
