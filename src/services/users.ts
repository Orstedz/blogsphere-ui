import apiClient from "./api"
import type { User, ApiResponse } from "@/types"

export const userService = {
  getAll: () => apiClient.get<ApiResponse<User[]>>("/users"),

  create: (data: Omit<User, "id" | "created_at" | "updated_at">) => apiClient.post<ApiResponse<User>>("/users", data),

  update: (id: number, data: Partial<User>) => apiClient.put<ApiResponse<void>>(`/users/${id}`, data),

  delete: (id: number) => apiClient.delete<ApiResponse<void>>(`/users/${id}`),
}
