import apiClient from "./api"
import type { Category, ApiResponse } from "@/types"

export const categoryService = {
  getAll: () => apiClient.get<ApiResponse<Category[]>>("/categories"),

  create: (data: Omit<Category, "id" | "created_at" | "updated_at">) =>
    apiClient.post<ApiResponse<Category>>("/categories", data),

  update: (id: string, data: Partial<Category>) => apiClient.put<ApiResponse<void>>(`/categories/${id}`, data),

  delete: (id: string) => apiClient.delete<ApiResponse<void>>(`/categories/${id}`),
}
