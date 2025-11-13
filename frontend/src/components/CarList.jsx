import React, { useState, useEffect } from "react";
import CarCard from "./CarCard";
import Filters from "./Filters";
import { getCars } from "../utils/api";
import { FaSync } from "react-icons/fa";

const CarList = ({ searchTerm }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCars = async () => {
    try {
      const response = await getCars();
      setCars(response.data.cars);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCars();

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchCars, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchCars();
  };
  const [filters, setFilters] = useState({
    priceMin: "",
    priceMax: "",
    year: "",
    fuelType: "",
  });
  const [sortBy, setSortBy] = useState("price");

  const handleFilter = () => {
    // Simple filtering logic
    let filteredCars = cars.filter((car) => {
      // Apply search term filter
      if (
        searchTerm &&
        !car.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      if (filters.priceMin && car.price < parseInt(filters.priceMin))
        return false;
      if (filters.priceMax && car.price > parseInt(filters.priceMax))
        return false;
      if (filters.year && car.year !== parseInt(filters.year)) return false;
      if (filters.fuelType && car.engineType !== filters.fuelType) return false;
      return true;
    });

    // Simple sorting
    filteredCars.sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "year") return b.year - a.year;
      if (sortBy === "mileage") return a.mileage - b.mileage;
      return 0;
    });

    setCars(filteredCars);
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-white p-8 min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading cars...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-white p-8 min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white p-4 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-4 md:mb-6 lg:mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 text-center">
            Available Cars
          </h2>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="ml-4 p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white disabled:bg-blue-300 transition-colors"
            title="Refresh cars list"
          >
            <FaSync className={`text-sm ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
        <Filters
          filters={filters}
          setFilters={setFilters}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onFilter={handleFilter}
          totalCars={cars.length}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarList;
