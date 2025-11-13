import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 w-full shadow-2xl backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        <div className="text-white font-bold text-2xl tracking-wide drop-shadow-lg">
          Simba Motors
        </div>
        <nav className="hidden md:flex space-x-8 text-white">
          <Link
            to="/"
            className="hover:text-blue-200 transition-all duration-300 transform hover:scale-105 font-medium"
          >
            Home
          </Link>
          <Link
            to="/services"
            className="hover:text-blue-200 transition-all duration-300 transform hover:scale-105 font-medium"
          >
            Services
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-200 transition-all duration-300 transform hover:scale-105 font-medium"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-blue-200 transition-all duration-300 transform hover:scale-105 font-medium"
          >
            Contact
          </Link>
        </nav>
        <button
          className="md:hidden text-white hover:text-blue-200 transition-colors duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white px-6 py-4 shadow-lg">
          <Link
            to="/"
            className="block py-3 hover:text-blue-200 transition-all duration-300 font-medium"
          >
            Home
          </Link>
          <Link
            to="/services"
            className="block py-3 hover:text-blue-200 transition-all duration-300 font-medium"
          >
            Services
          </Link>
          <Link
            to="/about"
            className="block py-3 hover:text-blue-200 transition-all duration-300 font-medium"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block py-3 hover:text-blue-200 transition-all duration-300 font-medium"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
