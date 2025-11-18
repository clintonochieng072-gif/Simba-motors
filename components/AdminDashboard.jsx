import React, { useState, useEffect } from "react";

import {
  FaBars,
  FaTimes,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCar,
  FaCalendarAlt,
  FaGasPump,
  FaCogs,
  FaMapMarkerAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import {
  getCars,
  addCar,
  updateCar,
  deleteCar,
  getAllCars,
} from "../utils/api";

const AdminDashboard = () => {
  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    year: "",
    mileage: "",
    fuelType: "",
    transmission: "",
    bodyType: "",
    engine: "",
    color: "",
    ownershipHistory: "",
    verifiedSeller: false,
    status: "Published",
    price: "",
    location: "",
  });
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

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
    Object.keys(formData).forEach((key) => carData.append(key, formData[key]));
    images.forEach((image) => carData.append("images", image));

    try {
      if (editingCar) {
        await updateCar(editingCar._id, carData, token);
      } else {
        await addCar(carData, token);
      }
      fetchCars();
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving car:", error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("adminToken");
    try {
      await deleteCar(id, token);
      fetchCars();
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      model: "",
      year: "",
      mileage: "",
      fuelType: "",
      transmission: "",
      bodyType: "",
      engine: "",
      color: "",
      ownershipHistory: "",
      verifiedSeller: false,
      status: "Published",
      price: "",
      location: "",
    });
    setImages([]);
    setEditingCar(null);
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div
          className={`bg-white shadow-lg ${
            sidebarOpen ? "w-64" : "w-16"
          } transition-all duration-300`}
        >
          <div className="p-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 hover:text-gray-800 p-2 rounded hover:bg-gray-100 transition-colors"
              title={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
            >
              {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
            {sidebarOpen && (
              <div className="mt-4">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FaCar className="text-blue-600" />
                  Admin Dashboard
                </h2>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
                >
                  <FaPlus size={16} />
                  Add Car
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div
            key={car._id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            {/* ... card content ... */}
          </div>
          <div
            key={car._id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            {/* ... card content ... */}
          </div>
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-800">
                Dashboard Overview
              </h1>
              <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-blue-600">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
                <div className="relative">
                  <button className="flex items-center space-x-2">
                    <img
                      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' fill='%23ffffff'%3E%3Ccircle cx='20' cy='20' r='18' fill='%23374151'/%3E%3Ctext x='20' y='25' text-anchor='middle' fill='%23ffffff' font-family='Arial' font-size='18'%3EA%3C/text%3E%3C/svg%3E"
                      alt="Admin"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>Admin</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-500">Total Cars</h3>
                  <span className="text-blue-500 bg-blue-100 p-2 rounded">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                      />
                    </svg>
                  </span>
                </div>
                <p className="text-2xl font-bold mt-4">{cars?.length || 0}</p>
                <p className="text-gray-600 text-sm mt-2">
                  +12% from last month
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-500">Pending Orders</h3>
                  <span className="text-orange-500 bg-orange-100 p-2 rounded">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                </div>
                <p className="text-2xl font-bold mt-4">5</p>
                <p className="text-gray-600 text-sm mt-2">
                  Awaiting processing
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-500">Total Revenue</h3>
                  <span className="text-green-500 bg-green-100 p-2 rounded">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                </div>
                <p className="text-2xl font-bold mt-4">KSh 2.5M</p>
                <p className="text-gray-600 text-sm mt-2">
                  +8% from last month
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-500">Active Users</h3>
                  <span className="text-purple-500 bg-purple-100 p-2 rounded">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </span>
                </div>
                <p className="text-2xl font-bold mt-4">125</p>
                <p className="text-gray-600 text-sm mt-2">
                  +15% from last week
                </p>
              </div>
            </div>
            {/* Car List */}
            <div className="bg-white rounded-lg shadow-lg">
              <div className="p-6 flex justify-between items-center border-b border-gray-200">
                <h2 className="text-xl font-semibold">Car Inventory</h2>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
                >
                  <FaPlus size={16} />
                  Add Car
                </button>
              </div>
              <div className="p-6 bg-gray-50 rounded-b-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(cars || []).map((car) => (
                    <div
                      key={car._id}
                      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <FaCar className="text-blue-600" />
                        <h3 className="text-lg font-semibold">{car.name}</h3>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600 mb-3">
                        <p className="flex items-center gap-2">
                          <FaCogs size={14} />
                          {car.name} {car.model} - {car.year}
                        </p>
                        <p className="flex items-center gap-2">
                          <FaTachometerAlt size={14} />
                          {car.mileage?.toLocaleString()} km
                        </p>
                        <p className="flex items-center gap-2">
                          <FaGasPump size={14} />
                          {car.fuelType} · {car.transmission}
                        </p>
                        <p className="flex items-center gap-2">
                          <FaMapMarkerAlt size={14} />
                          {car.location}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              car.status === "Published"
                                ? "bg-green-100 text-green-800"
                                : car.status === "Draft"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {car.status}
                          </span>
                          {car.verifiedSeller && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                              Verified
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-blue-700">
                          KSh {car.price?.toLocaleString() || "N/A"}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingCar(car);
                              setFormData(car);
                              setIsModalOpen(true);
                            }}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded flex items-center gap-1 transition-colors"
                            title="Edit Car"
                          >
                            <FaEdit size={14} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(car._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1 transition-colors"
                            title="Delete Car"
                          >
                            <FaTrash size={14} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Add/Edit */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                {editingCar ? (
                  <>
                    <FaEdit className="text-yellow-600" />
                    Edit Car
                  </>
                ) : (
                  <>
                    <FaPlus className="text-blue-600" />
                    Add Car
                  </>
                )}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Make (e.g., Toyota)"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Model (e.g., Corolla)"
                    value={formData.model}
                    onChange={(e) =>
                      setFormData({ ...formData, model: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Year"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Mileage (km)"
                    value={formData.mileage}
                    onChange={(e) =>
                      setFormData({ ...formData, mileage: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                  <select
                    value={formData.fuelType}
                    onChange={(e) =>
                      setFormData({ ...formData, fuelType: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Fuel Type</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                  <select
                    value={formData.transmission}
                    onChange={(e) =>
                      setFormData({ ...formData, transmission: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Transmission</option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                    <option value="CVT">CVT</option>
                  </select>
                  <select
                    value={formData.bodyType}
                    onChange={(e) =>
                      setFormData({ ...formData, bodyType: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Body Type</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Coupe">Coupe</option>
                    <option value="Convertible">Convertible</option>
                    <option value="Wagon">Wagon</option>
                    <option value="Pickup">Pickup</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Engine (e.g., 1.6L 4-Cylinder)"
                    value={formData.engine}
                    onChange={(e) =>
                      setFormData({ ...formData, engine: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Color"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Price (KSh)"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <textarea
                  placeholder="Ownership History"
                  value={formData.ownershipHistory}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ownershipHistory: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded mt-4"
                  rows="3"
                  required
                />
                <div className="flex items-center gap-4 mt-4">
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
                      className="mr-2"
                    />
                    Verified Seller
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="p-2 border rounded"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Images (Max 10)
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setImages([...e.target.files])}
                    className="w-full p-2 border rounded"
                  />
                  {images.length > 0 && (
                    <p className="text-sm text-gray-600 mt-1">
                      {images.length} image(s) selected
                    </p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
                  >
                    {editingCar ? (
                      <>
                        <FaEdit size={16} />
                        Update
                      </>
                    ) : (
                      <>
                        <FaPlus size={16} />
                        Add
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      resetForm();
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
                  >
                    <FaTimes size={16} />
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
