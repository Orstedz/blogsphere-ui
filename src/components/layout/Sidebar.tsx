import React from "react";
import {
  BarChart3,
  FileText,
  Layers,
  Users,
  Settings,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useAppStore } from "@/store/appStore";
import { Link, useLocation } from "react-router-dom";

interface SidebarItem {
  name: string;
  icon: React.ReactNode;
  href?: string;
  subItems?: SidebarItem[];
}

const menuItems: SidebarItem[] = [
  { name: "Dashboard", icon: <BarChart3 size={20} />, href: "/" },
  {
    name: "Content",
    icon: <FileText size={20} />,
    subItems: [
      { name: "Posts", icon: <FileText size={16} />, href: "/posts" },
      { name: "Categories", icon: <Layers size={16} />, href: "/categories" },
      { name: "Series", icon: <Layers size={16} />, href: "/series" },
    ],
  },
  {
    name: "System",
    icon: <Users size={20} />,
    subItems: [
      { name: "Users", icon: <Users size={16} />, href: "/users" },
      { name: "Roles", icon: <Settings size={16} />, href: "/roles" },
    ],
  },
];

export const Sidebar: React.FC = () => {
  const { sidebarOpen, toggleSidebar, expandedMenuItems, toggleMenuExpanded } =
    useAppStore();
  const location = useLocation();

  const renderMenuItem = (item: SidebarItem, index: number) => {
    const isExpanded = expandedMenuItems.includes(item.name);
    const isActive = location.pathname === item.href;

    return (
      <div key={index}>
        {item.subItems ? (
          <>
            <button
              onClick={() => toggleMenuExpanded(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isExpanded
                  ? "bg-bg-tertiary text-accent"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {item.icon}
              <span className="flex-1 text-left">{item.name}</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
            {isExpanded && (
              <div className="ml-4 mt-1 space-y-1">
                {item.subItems.map((subItem, idx) => {
                  const isSubItemActive = location.pathname === subItem.href;
                  return (
                    <Link
                      key={idx}
                      to={subItem.href || "#"}
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                        isSubItemActive
                          ? "bg-accent text-white"
                          : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {subItem.icon}
                      <span>{subItem.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <Link
            to={item.href || "#"}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              isActive
                ? "bg-accent text-white"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        )}
      </div>
    );
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-40 lg:hidden bg-bg-tertiary text-text-primary p-2 rounded-lg"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`fixed left-0 top-0 h-screen bg-bg-primary border-r border-bg-tertiary transition-all duration-300 z-30 ${
          sidebarOpen ? "w-64" : "w-0 lg:w-64"
        } overflow-hidden`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-accent">BlogSphere</h1>
          <p className="text-sm text-text-secondary mt-1">Blog Management</p>
        </div>

        <nav className="space-y-1 px-2">
          {menuItems.map((item, idx) => renderMenuItem(item, idx))}
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};
