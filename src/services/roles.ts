import apiClient from "./api"
import type { Role, ApiResponse } from "@/types"

export const roleService = {
  getAll: () => apiClient.get<ApiResponse<Role[]>>("/roles"),

  create: (data: Omit<Role, "_id" | "createdAt" | "updatedAt">) => apiClient.post<ApiResponse<Role>>("/roles", data),

  update: (id: number, data: Partial<Role>) => apiClient.put<ApiResponse<void>>(`/roles/${id}`, data),

  delete: (id: number) => apiClient.delete<ApiResponse<void>>(`/roles/${id}`),
}
