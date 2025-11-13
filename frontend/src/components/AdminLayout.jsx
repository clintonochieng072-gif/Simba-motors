import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaCar,
  FaCog,
  FaSignOutAlt,
  FaSearch,
  FaPlus,
  FaUser,
} from "react-icons/fa";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const decodeToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin");
    } else {
      const decoded = decodeToken(token);
      if (decoded && decoded.exp * 1000 < Date.now()) {
        handleLogout();
      }
    }
  }, [navigate]);

  const navigation = [
    {
      name: "Add Car",
      href: "/admin/dashboard/add-car",
      icon: FaPlus,
    },
    {
      name: "Overview",
      href: "/admin/dashboard/overview",
      icon: FaTachometerAlt,
    },
    { name: "Cars", href: "/admin/dashboard/cars", icon: FaCar },
    { name: "Users", href: "/admin/dashboard/users", icon: FaUser },
    { name: "Settings", href: "/admin/dashboard/settings", icon: FaCog },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  return (
    <>
      <div className="flex h-screen bg-neutral-50">
        {/* Sidebar */}
        <div
          className={`bg-neutral-900 shadow-xl border-r border-neutral-700 w-full md:w-64 transition-transform duration-300 md:relative md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 left-0 z-50 md:flex-shrink-0`}
        >
          <div className="p-4">
            <div className="mt-6">
              <h2 className="text-xl font-heading font-bold mb-6 flex items-center gap-2 text-blue-400">
                <FaCar />
                Admin Dashboard
              </h2>
              <nav className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-blue-900 text-blue-300 border-r-2 border-blue-400"
                          : "text-neutral-400 hover:bg-neutral-800 hover:text-blue-400"
                      }`}
                      onClick={() => setSidebarOpen(false)} // Close on mobile after click
                    >
                      <Icon size={18} />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-8 pt-4 border-t border-neutral-700">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-400 hover:bg-red-900 hover:text-red-400 transition-colors w-full"
                >
                  <FaSignOutAlt size={18} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col md:ml-0">
          {/* Top Navigation Bar */}
          <header className="bg-neutral-900 border-b border-neutral-700 px-4 md:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              {/* Hamburger Menu for Mobile */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-neutral-400 hover:text-blue-400 p-2 rounded-lg hover:bg-neutral-800 transition-colors md:hidden"
                title={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
              >
                {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
              {/* Search Bar */}
              <div className="relative max-w-xs md:max-w-md flex-1">
                <FaSearch
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-200 placeholder-neutral-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              {/* Quick Add Listing Button */}
              <button
                onClick={() => navigate("/admin/dashboard/cars")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm md:text-base"
              >
                <FaPlus size={14} />
                <span className="hidden sm:inline">Quick Add</span>
              </button>
              {/* User Profile */}
              <div className="flex items-center gap-2 md:gap-3">
                <img
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' fill='%23ffffff'%3E%3Ccircle cx='16' cy='16' r='15' fill='%23374151'/%3E%3Ctext x='16' y='20' text-anchor='middle' fill='%23ffffff' font-family='Arial' font-size='16'%3EA%3C/text%3E%3C/svg%3E"
                  alt="Admin"
                  className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-neutral-700"
                />
                <span className="text-neutral-200 font-medium text-sm md:text-base hidden sm:inline">Admin</span>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 overflow-auto bg-white">
            <div className="p-4 md:p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
