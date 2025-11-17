import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaHeart, FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Simba Motors
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link to="/cars" className="text-gray-700 hover:text-blue-600">
            Cars
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600">
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search cars..."
              className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-400" />
          </div>
          <Link to="/wishlist" className="text-gray-700 hover:text-red-500">
            <FaHeart size={20} />
          </Link>
          <Link to="/admin" className="text-gray-700 hover:text-blue-600">
            <FaUser size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
