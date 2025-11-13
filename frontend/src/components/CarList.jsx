import React, { useState, useEffect } from "react";
import CarCard from "./CarCard";
import Filters from "./Filters";
import { getCars } from "../utils/api";

const CarList = ({ searchTerm }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await getCars();
        setCars(response.data.cars);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);
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
    <div className="bg-gradient-to-br from-gray-50 to-white p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-gray-800 text-center">
          Available Cars
        </h2>
        <Filters
          filters={filters}
          setFilters={setFilters}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onFilter={handleFilter}
          totalCars={cars.length}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarList;
