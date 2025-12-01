import { create } from "zustand"

interface AppState {
  sidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  currentUser: string | null
  setCurrentUser: (user: string | null) => void
  expandedMenuItems: string[]
  toggleMenuExpanded: (name: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
  currentUser: "Admin",
  setCurrentUser: (user) => set({ currentUser: user }),
  expandedMenuItems: [],
  toggleMenuExpanded: (name: string) =>
    set((state) => ({
      expandedMenuItems: state.expandedMenuItems.includes(name)
        ? state.expandedMenuItems.filter((item) => item !== name)
        : [...state.expandedMenuItems, name],
    })),
}))
