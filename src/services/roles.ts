import apiClient from "./api"
import type { Role, ApiResponse } from "@/types"

export const roleService = {
  getAll: () => apiClient.get<ApiResponse<Role[]>>("/roles"),

  create: (data: Omit<Role, "id" | "created_at" | "updated_at">) => apiClient.post<ApiResponse<Role>>("/roles", data),

  update: (id: string, data: Partial<Role>) => apiClient.put<ApiResponse<void>>(`/roles/${id}`, data),

  delete: (id: string) => apiClient.delete<ApiResponse<void>>(`/roles/${id}`),
}
