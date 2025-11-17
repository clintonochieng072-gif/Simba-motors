import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaCar,
  FaCogs,
  FaGasPump,
  FaMapMarkerAlt,
  FaTachometerAlt,
  FaTimes,
  FaEye,
  FaToggleOn,
  FaToggleOff,
  FaFilter,
  FaTag,
} from "react-icons/fa";
import {
  getCars,
  addCar,
  updateCar,
  deleteCar,
  getAllCars,
} from "../utils/api";
import { Button } from "../components/ui/Button";

const AdminCars = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cars, setCars] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    model: "",
    year: "",
    condition: "",
    price: "",
    location: "",
    engineType: "",
    transmission: "",
    mileage: "",
    bodyType: "",
    color: "",
    features: [],
    status: "Published",
  });
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    make: "",
    model: "",
    yearMin: "",
    yearMax: "",
    priceMin: "",
    priceMax: "",
    sellerType: "",
  });
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const handleFeatureAdd = (feature) => {
    if (feature.trim() && !formData.features.includes(feature.trim())) {
      setFormData({
        ...formData,
        features: [...formData.features, feature.trim()],
      });
    }
  };

  const handleFeatureRemove = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const handleFeatureKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const feature = e.target.value.trim();
      if (feature) {
        handleFeatureAdd(feature);
        e.target.value = "";
      }
    }
  };

  // Handle back button navigation
  useEffect(() => {
    const handlePopState = () => {
      // If user presses back on edit page, navigate back to cars list
      if (
        location.pathname.includes("/cars/") &&
        location.pathname !== "/admin/dashboard/cars"
      ) {
        navigate("/admin/dashboard/cars", { replace: true });
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location, navigate]);

  const fetchCars = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await getAllCars(token);
      setCars(response?.cars || (Array.isArray(response) ? response : []));
    } catch (error) {
      console.error("Error fetching cars:", error);
      setCars([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    const carData = new FormData();

    // Only append non-empty fields
    Object.keys(formData).forEach((key) => {
      if (
        formData[key] !== "" &&
        formData[key] !== null &&
        formData[key] !== undefined &&
        (!Array.isArray(formData[key]) || formData[key].length > 0)
      ) {
        if (Array.isArray(formData[key])) {
          // For arrays like features, append as JSON string
          carData.append(key, JSON.stringify(formData[key]));
        } else {
          carData.append(key, formData[key]);
        }
      }
    });

    images.forEach((image) => carData.append("images", image));

    try {
      await addCar(carData, token);
      fetchCars();
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving car:", error);
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      const token = localStorage.getItem("adminToken");
      try {
        await deleteCar(id, token);
        fetchCars();
      } catch (error) {
        console.error("Error deleting car:", error);
      }
    }
  };

  const handleStatusToggle = async (car) => {
    const token = localStorage.getItem("adminToken");
    const newStatus = car.status === "Published" ? "Draft" : "Published";
    try {
      await updateCar(car._id, { ...car, status: newStatus }, token);
      fetchCars();
    } catch (error) {
      console.error("Error updating car status:", error);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedCars = (cars || [])
    .filter((car) => {
      return (
        (!filters.status || car.status === filters.status) &&
        (!filters.make ||
          car.name.toLowerCase().includes(filters.make.toLowerCase())) &&
        (!filters.model ||
          car.model.toLowerCase().includes(filters.model.toLowerCase())) &&
        (!filters.yearMin || car.year >= parseInt(filters.yearMin)) &&
        (!filters.yearMax || car.year <= parseInt(filters.yearMax)) &&
        (!filters.priceMin || car.price >= parseInt(filters.priceMin)) &&
        (!filters.priceMax || car.price <= parseInt(filters.priceMax)) &&
        (!filters.sellerType ||
          (filters.sellerType === "verified"
            ? car.verifiedSeller
            : !car.verifiedSeller))
      );
    })
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

  const resetForm = () => {
    setFormData({
      name: "",
      model: "",
      year: "",
      condition: "",
      price: "",
      location: "",
      engineType: "",
      transmission: "",
      mileage: "",
      bodyType: "",
      color: "",
      features: [],
      status: "Published",
    });
    setImages([]);
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-neutral-800">
            Inventory Management
          </h1>
          <p className="text-neutral-600 mt-1 text-sm sm:text-base">
            Manage your car listings and inventory.
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="flex items-center gap-2 text-sm"
          >
            <FaFilter size={14} />
            Filters
          </Button>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 text-sm"
          >
            <FaPlus size={14} />
            Add New Listing
          </Button>
        </div>
      </div>

      {/* Filters Sidebar */}
      {showFilters && (
        <div className="bg-white rounded-xl shadow-soft border border-neutral-200 p-4 sm:p-6 mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-neutral-800 mb-4">
            Advanced Filters
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Status</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Sold">Sold</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Make
              </label>
              <input
                type="text"
                placeholder="e.g., Toyota"
                value={filters.make}
                onChange={(e) =>
                  setFilters({ ...filters, make: e.target.value })
                }
                className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Model
              </label>
              <input
                type="text"
                placeholder="e.g., Corolla"
                value={filters.model}
                onChange={(e) =>
                  setFilters({ ...filters, model: e.target.value })
                }
                className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Year Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.yearMin}
                  onChange={(e) =>
                    setFilters({ ...filters, yearMin: e.target.value })
                  }
                  className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.yearMax}
                  onChange={(e) =>
                    setFilters({ ...filters, yearMax: e.target.value })
                  }
                  className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Price Range (KSh)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceMin}
                  onChange={(e) =>
                    setFilters({ ...filters, priceMin: e.target.value })
                  }
                  className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceMax}
                  onChange={(e) =>
                    setFilters({ ...filters, priceMax: e.target.value })
                  }
                  className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Seller Type
              </label>
              <select
                value={filters.sellerType}
                onChange={(e) =>
                  setFilters({ ...filters, sellerType: e.target.value })
                }
                className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Sellers</option>
                <option value="verified">Verified Dealers</option>
                <option value="individual">Individual Sellers</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              onClick={() =>
                setFilters({
                  status: "",
                  make: "",
                  model: "",
                  yearMin: "",
                  yearMax: "",
                  priceMin: "",
                  priceMax: "",
                  sellerType: "",
                })
              }
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      )}

      {/* Listings Table */}
      <div className="bg-white rounded-xl shadow-soft border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] sm:min-w-[800px]">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Image
                </th>
                <th
                  className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:bg-neutral-100"
                  onClick={() => handleSort("name")}
                >
                  Car Details
                </th>
                <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider hidden sm:table-cell">
                  Seller
                </th>
                <th
                  className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:bg-neutral-100 hidden sm:table-cell"
                  onClick={() => handleSort("price")}
                >
                  Price
                </th>
                <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th
                  className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:bg-neutral-100 hidden md:table-cell"
                  onClick={() => handleSort("createdAt")}
                >
                  Date Added
                </th>
                <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider hidden lg:table-cell">
                  Views/Inquiries
                </th>
                <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {filteredAndSortedCars.map((car) => (
                <tr key={car._id} className="hover:bg-neutral-50">
                  <td className="px-2 sm:px-3 py-2 sm:py-3 whitespace-nowrap">
                    <img
                      src={car.images?.[0] || "/placeholder-car.jpg"}
                      alt="Car"
                      className="w-12 h-9 sm:w-16 sm:h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-2 sm:px-3 py-2 sm:py-3 whitespace-nowrap">
                    <div>
                      <div className="text-xs sm:text-sm font-medium text-neutral-900">
                        {car.year} {car.name} {car.model}
                      </div>
                      <div className="text-xs sm:text-sm text-neutral-500">
                        {car.mileage?.toLocaleString()} km · {car.engineType} ·{" "}
                        {car.transmission}
                      </div>
                      {car.features && car.features.length > 0 && (
                        <div
                          className="text-xs sm:text-sm text-neutral-500"
                          style={{
                            whiteSpace: "normal",
                            overflow: "visible",
                            textOverflow: "unset",
                          }}
                        >
                          Features: {car.features.join(", ")}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-2 sm:px-3 py-2 sm:py-3 whitespace-nowrap hidden sm:table-cell">
                    <div className="text-xs sm:text-sm text-neutral-900">
                      {car.verifiedSeller
                        ? "Verified Dealer"
                        : "Individual Seller"}
                    </div>
                  </td>
                  <td className="px-2 sm:px-3 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm font-medium text-neutral-900 hidden sm:table-cell">
                    KSh {car.price?.toLocaleString()}
                  </td>
                  <td className="px-2 sm:px-3 py-2 sm:py-3 whitespace-nowrap">
                    <span
                      className={`inline-flex px-1 sm:px-2 py-1 text-xs font-semibold rounded-full ${
                        car.status === "Published"
                          ? "bg-green-100 text-green-800"
                          : car.status === "Draft"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {car.status}
                    </span>
                  </td>
                  <td className="px-2 sm:px-3 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-neutral-500 hidden md:table-cell">
                    {new Date(car.createdAt || Date.now()).toLocaleDateString()}
                  </td>
                  <td className="px-2 sm:px-3 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-neutral-500 hidden lg:table-cell">
                    <div className="flex items-center gap-1">
                      <FaEye size={12} />
                      {Math.floor(Math.random() * 100) + 10} {/* Placeholder */}
                    </div>
                  </td>
                  <td className="px-2 sm:px-3 py-2 sm:py-3 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <button
                        onClick={() =>
                          navigate(`/admin/dashboard/cars/${car._id}`)
                        }
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        onClick={() => handleStatusToggle(car)}
                        className={`${
                          car.status === "Published"
                            ? "text-green-600 hover:text-green-900"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                        title={
                          car.status === "Published" ? "Unpublish" : "Publish"
                        }
                      >
                        {car.status === "Published" ? (
                          <FaToggleOn size={14} />
                        ) : (
                          <FaToggleOff size={14} />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(car._id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredAndSortedCars.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <FaCar className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-neutral-400" />
            <h3 className="mt-2 text-sm sm:text-base font-medium text-neutral-900">
              No listings found
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-neutral-500">
              Try adjusting your filters or add a new listing.
            </p>
          </div>
        )}
      </div>

      {/* Modal for Add */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg sm:max-w-2xl max-h-[95vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-heading font-bold text-neutral-800 flex items-center gap-2">
                  <FaPlus className="text-primary-600" />
                  Add New Car
                </h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="text-neutral-400 hover:text-neutral-600 p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                >
                  <FaTimes size={18} />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Make *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Toyota"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full p-2 sm:p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Model *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Corolla"
                    value={formData.model}
                    onChange={(e) =>
                      setFormData({ ...formData, model: e.target.value })
                    }
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Year *
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 2020"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Condition *
                  </label>
                  <select
                    value={formData.condition}
                    onChange={(e) =>
                      setFormData({ ...formData, condition: e.target.value })
                    }
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  >
                    <option value="">Select Condition</option>
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Mileage (km) *
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 50000"
                    value={formData.mileage}
                    onChange={(e) =>
                      setFormData({ ...formData, mileage: e.target.value })
                    }
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Fuel Type *
                  </label>
                  <select
                    value={formData.engineType}
                    onChange={(e) =>
                      setFormData({ ...formData, engineType: e.target.value })
                    }
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  >
                    <option value="">Select Fuel Type</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Transmission *
                  </label>
                  <select
                    value={formData.transmission}
                    onChange={(e) =>
                      setFormData({ ...formData, transmission: e.target.value })
                    }
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  >
                    <option value="">Select Transmission</option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                    <option value="CVT">CVT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Body Type *
                  </label>
                  <select
                    value={formData.bodyType}
                    onChange={(e) =>
                      setFormData({ ...formData, bodyType: e.target.value })
                    }
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  >
                    <option value="">Select Body Type</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Coupe">Coupe</option>
                    <option value="Convertible">Convertible</option>
                    <option value="Wagon">Wagon</option>
                    <option value="Pickup">Pickup</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Engine *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 1.6L 4-Cylinder"
                    value={formData.engine}
                    onChange={(e) =>
                      setFormData({ ...formData, engine: e.target.value })
                    }
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Color *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., White"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Price (KSh) *
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 2500000"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Nairobi"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Ownership History *
                </label>
                <textarea
                  placeholder="Describe the ownership history..."
                  value={formData.ownershipHistory}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ownershipHistory: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  rows="3"
                />
              </div>

              <div className="flex items-center gap-6 mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.verifiedSeller}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        verifiedSeller: e.target.checked,
                      })
                    }
                    className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                  <span className="text-sm text-neutral-700">
                    Verified Seller
                  </span>
                </label>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2 flex items-center gap-2">
                  <FaTag className="text-primary-600" />
                  Features
                </label>
                <div className="mb-3">
                  <input
                    type="text"
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="Type a feature and press Enter (e.g., Air Conditioning)"
                    onKeyPress={handleFeatureKeyPress}
                  />
                </div>
                {formData.features && formData.features.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
                      >
                        {feature}
                        <button
                          type="button"
                          onClick={() => handleFeatureRemove(index)}
                          className="text-primary-600 hover:text-primary-800"
                        >
                          <FaTimes size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Upload Images (Max 10)
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setImages([...e.target.files])}
                  className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                />
                {images.length > 0 && (
                  <p className="text-sm text-neutral-600 mt-2">
                    {images.length} image(s) selected
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:space-x-3">
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 text-sm"
                >
                  <FaPlus size={14} />
                  Add Car
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white flex items-center justify-center gap-2 text-sm"
                >
                  <FaTimes size={14} />
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminCars;
