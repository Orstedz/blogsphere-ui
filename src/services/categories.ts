import apiClient from "./api"
import type { Category, ApiResponse } from "@/types"

export const categoryService = {
  getAll: () => apiClient.get<ApiResponse<Category[]>>("/categories"),

  create: (data: Omit<Category, "_id" | "createdAt" | "updatedAt">) =>
    apiClient.post<ApiResponse<Category>>("/categories", data),

  update: (id: number, data: Partial<Category>) => apiClient.put<ApiResponse<void>>(`/categories/${id}`, data),

  delete: (id: number) => apiClient.delete<ApiResponse<void>>(`/categories/${id}`),
}
