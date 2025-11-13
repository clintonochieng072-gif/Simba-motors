import React, { useState } from "react";
import { Button } from "./ui/Button";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative max-w-full md:max-w-xl mx-auto backdrop-blur-md bg-white/10 rounded-2xl p-1 shadow-2xl border border-white/20">
      <input
        type="text"
        placeholder="Search by make, model or location"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        className="w-full px-4 md:px-6 py-3 md:py-4 rounded-xl bg-white/5 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 backdrop-blur-sm text-sm md:text-base"
      />
      <Button
        onClick={handleSearch}
        className="absolute right-1 top-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 md:px-8 py-2 md:py-3 rounded-xl shadow-lg font-semibold text-sm md:text-base"
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
