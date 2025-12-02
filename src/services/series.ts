import apiClient from "./api"
import type { Series, ApiResponse } from "@/types"

export const seriesService = {
  getAll: () => apiClient.get<ApiResponse<Series[]>>("/series"),

  create: (data: Omit<Series, "_id" | "createdAt" | "updatedAt">) =>
    apiClient.post<ApiResponse<Series>>("/series", data),

  update: (id: number, data: Partial<Series>) => apiClient.put<ApiResponse<void>>(`/series/${id}`, data),

  delete: (id: number) => apiClient.delete<ApiResponse<void>>(`/series/${id}`),
}
