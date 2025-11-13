import React from "react";

const Filters = ({
  filters,
  setFilters,
  sortBy,
  setSortBy,
  onFilter,
  totalCars,
}) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-white/20 mb-6 hover:shadow-3xl transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <select
          name="priceMin"
          value={filters.priceMin}
          onChange={handleFilterChange}
          className="p-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/70"
        >
          <option value="">Min Price</option>
          <option value="500000">500K</option>
          <option value="1000000">1M</option>
          <option value="2000000">2M</option>
        </select>
        <select
          name="priceMax"
          value={filters.priceMax}
          onChange={handleFilterChange}
          className="p-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/70"
        >
          <option value="">Max Price</option>
          <option value="1000000">1M</option>
          <option value="2000000">2M</option>
          <option value="5000000">5M</option>
        </select>
        <select
          name="year"
          value={filters.year}
          onChange={handleFilterChange}
          className="p-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/70"
        >
          <option value="">All Years</option>
          {Array.from(
            { length: 20 },
            (_, i) => new Date().getFullYear() - i
          ).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          name="fuelType"
          value={filters.fuelType}
          onChange={handleFilterChange}
          className="p-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/70"
        >
          <option value="">Fuel Types</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <button
          onClick={onFilter}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
        >
          Filter
        </button>
      </div>
      <div className="flex justify-between items-center">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:bg-white/70"
        >
          <option value="price">Sort by Price</option>
          <option value="year">Sort by Year</option>
          <option value="mileage">Sort by Mileage</option>
        </select>
        <span className="text-gray-700 font-semibold bg-blue-50 px-4 py-2 rounded-lg">
          {totalCars} cars found
        </span>
      </div>
    </div>
  );
};

export default Filters;
