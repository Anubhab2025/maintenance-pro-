import React from "react";
import { Bell, Search, User } from "lucide-react";
import useAuthStore from "../store/authStore";

interface HeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const { user } = useAuthStore();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex justify-between items-center px-4 py-3 sm:px-6">
        <div className="flex items-center">
          {children}
          <h1 className="ml-20 text-lg font-bold text-gray-800 md:hidden">
            MaintenancePro
          </h1>
          <div className="hidden ml-4 max-w-md sm:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="py-2 pr-4 pl-10 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Search
                size={20}
                className="absolute left-3 top-1/2 text-gray-400 transform -translate-y-1/2"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell
              size={20}
              className="text-gray-500 cursor-pointer hover:text-indigo-600"
            />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="flex justify-center items-center w-9 h-9 bg-indigo-100 rounded-full">
              <User size={20} className="text-indigo-600" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">{user?.id || "Guest"}</p>
              <p className="text-xs text-gray-500">
                {user?.role === "admin" ? "Administrator" : "Maintenance Team"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-2 sm:hidden">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="py-2 pr-4 pl-10 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <Search
            size={20}
            className="absolute left-3 top-1/2 text-gray-400 transform -translate-y-1/2"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
