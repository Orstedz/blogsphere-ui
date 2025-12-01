import React from "react";
import { User, Settings, LogOut } from "lucide-react";
import { useAppStore } from "@/store/appStore";

export const Header: React.FC = () => {
  const { currentUser } = useAppStore();
  const [showDropdown, setShowDropdown] = React.useState(false);

  return (
    <header className="bg-bg-secondary border-b border-bg-tertiary sticky top-0 z-10">
      <div className="h-16 px-6 flex items-center justify-between">
        <div className="text-text-primary font-semibold"></div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-bg-tertiary transition-colors"
            >
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {currentUser?.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-text-primary text-sm">{currentUser}</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-bg-secondary border border-bg-tertiary rounded-lg shadow-lg">
                <button className="w-full flex items-center gap-2 px-4 py-2 text-text-primary hover:bg-bg-tertiary transition-colors">
                  <User size={16} />
                  <span>Profile</span>
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-text-primary hover:bg-bg-tertiary transition-colors">
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-danger hover:bg-bg-tertiary transition-colors border-t border-bg-tertiary">
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
