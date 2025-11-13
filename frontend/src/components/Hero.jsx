import React from "react";
import SearchBar from "./SearchBar";

const Hero = ({ onSearch }) => {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16 md:py-20 px-4 md:px-6 text-center overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>

      <div className="container mx-auto relative z-10">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold mb-4 md:mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent drop-shadow-2xl">
          Find Your Dream Car at Simba Motors
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-blue-100 font-light tracking-wide">
          Located on Eldoret Kisumu Road · Quality Vehicles at Unbeatable Prices
        </p>
        <div className="transform hover:scale-105 transition-all duration-500">
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
