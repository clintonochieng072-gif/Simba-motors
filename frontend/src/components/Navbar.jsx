import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 w-full shadow-2xl backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        <div className="text-white font-bold text-2xl tracking-wide drop-shadow-lg">
          Simba Motors
        </div>
        <nav className="flex space-x-3 md:space-x-8 text-white text-sm md:text-base">
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
      </div>
    </header>
  );
};

export default Navbar;
