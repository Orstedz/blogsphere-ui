import axios from "axios"

const baseURL = (import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:3001/api"

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
  },
})

// // Error handling
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Handle unauthorized
//       console.error("Unauthorized access")
//     }
//     return Promise.reject(error)
//   },
// )

export default apiClient
