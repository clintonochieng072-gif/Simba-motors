"use client";

import React from "react";
import Link from "next/link";
import { FaSearch, FaHeart, FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl md:text-2xl font-bold text-blue-600">
          Simba Motors
        </Link>
        <nav className="flex space-x-4 md:space-x-6">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 text-sm md:text-base"
          >
            Home
          </Link>
          <Link
            href="/cars"
            className="text-gray-700 hover:text-blue-600 text-sm md:text-base"
          >
            Cars
          </Link>
          <Link
            href="/about"
            className="text-gray-700 hover:text-blue-600 text-sm md:text-base"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-gray-700 hover:text-blue-600 text-sm md:text-base"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search cars..."
              className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-400" />
          </div>
          <Link href="/wishlist" className="text-gray-700 hover:text-red-500">
            <FaHeart size={20} />
          </Link>
          <Link href="/admin" className="text-gray-700 hover:text-blue-600">
            <FaUser size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
