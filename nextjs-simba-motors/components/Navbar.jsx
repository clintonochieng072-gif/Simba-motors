import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 w-full shadow-2xl backdrop-blur-sm bg-opacity-95 relative">
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-5 flex justify-between items-center">
        <div className="text-white font-bold text-xl md:text-2xl tracking-wide drop-shadow-lg">
          Simba Motors
        </div>
        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-white text-base">
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
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2 hover:bg-blue-800 rounded-lg transition-colors"
          title={menuOpen ? "Close Menu" : "Open Menu"}
        >
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setMenuOpen(false)}
          ></div>
          <nav className="md:hidden absolute top-full left-0 right-0 bg-blue-900 shadow-lg z-50">
            <div className="flex flex-col space-y-2 p-4">
              <Link
                to="/"
                className="text-white hover:text-blue-200 transition-colors py-2 px-4 rounded-lg hover:bg-blue-800"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/services"
                className="text-white hover:text-blue-200 transition-colors py-2 px-4 rounded-lg hover:bg-blue-800"
                onClick={() => setMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-blue-200 transition-colors py-2 px-4 rounded-lg hover:bg-blue-800"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-white hover:text-blue-200 transition-colors py-2 px-4 rounded-lg hover:bg-blue-800"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </nav>
        </>
      )}
    </header>
  );
};

export default Navbar;
