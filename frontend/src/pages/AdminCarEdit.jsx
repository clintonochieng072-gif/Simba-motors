import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
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
  FaArrowLeft,
  FaTag,
} from "react-icons/fa";
import { getCar, updateCar, deleteCar } from "../utils/api";
import { Button } from "../components/ui/Button";

const AdminCarEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { showSuccess, showError } = useToast();
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
    features: [],
    verifiedSeller: false,
    status: "Published",
    price: "",
    location: "",
  });
  const [originalData, setOriginalData] = useState({});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    fetchCar();
  }, [id]);

  // Handle back button navigation
  useEffect(() => {
    const handlePopState = () => {
      // When back button is pressed on edit page, navigate to cars list
      // This prevents cycling between pages and ensures proper back navigation
      navigate("/admin/dashboard/cars", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  const fetchCar = async () => {
    try {
      const response = await getCar(id);
      const carData = {
        ...response.data,
        features: response.data.features || [],
      };
      setFormData(carData);
      setOriginalData(carData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching car:", error);
      setError("Failed to load car details");
      setLoading(false);
    }
  };

  const handleFeatureAdd = (feature) => {
    if (feature.trim() && !formData.features.includes(feature.trim())) {
      setFormData({
        ...formData,
        features: [...formData.features, feature.trim()],
      });
    }
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

  const handleFeatureRemove = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    const token = localStorage.getItem("adminToken");
    const carData = new FormData();

    // Only append changed fields
    Object.keys(formData).forEach((key) => {
      let hasChanged = false;
      if (key === "features") {
        // For arrays like features, compare JSON strings
        hasChanged = JSON.stringify(formData[key]) !== JSON.stringify(originalData[key]);
      } else {
        hasChanged = formData[key] !== originalData[key];
      }

      if (hasChanged) {
        if (key === "features") {
          // Features is sent as array JSON string
          carData.append(key, JSON.stringify(formData[key]));
        } else {
          carData.append(key, formData[key]);
        }
      }
    });

    // Always append images if any are selected
    images.forEach((image) => carData.append("images", image));

    try {
      await updateCar(id, carData, token);
      showSuccess("Car updated successfully!");
      setTimeout(() => navigate("/admin/dashboard/cars"), 1000);
    } catch (error) {
      console.error("Error updating car:", error);
      showError("Failed to update car");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      setIsDeleting(true);
      const token = localStorage.getItem("adminToken");
      try {
        await deleteCar(id, token);
        showSuccess("Car deleted successfully!");
        setTimeout(() => navigate("/admin/dashboard/cars"), 1000);
      } catch (error) {
        console.error("Error deleting car:", error);
        showError("Failed to delete car");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleStatusToggle = async () => {
    setIsToggling(true);
    const token = localStorage.getItem("adminToken");
    const newStatus = formData.status === "Published" ? "Draft" : "Published";
    try {
      await updateCar(id, { ...formData, status: newStatus }, token);
      setFormData({ ...formData, status: newStatus });
      showSuccess(`Car ${newStatus.toLowerCase()} successfully!`);
    } catch (error) {
      console.error("Error updating car status:", error);
      showError("Failed to update status");
    } finally {
      setIsToggling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-neutral-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate("/admin/dashboard/cars")}
            variant="outline"
            className="flex items-center gap-2"
          >
            <FaArrowLeft size={16} />
            Back to Cars
          </Button>
          <div>
            <h1 className="text-3xl font-heading font-bold text-neutral-800">
              Edit Car
            </h1>
            <p className="text-neutral-600 mt-1">
              Update car details and manage listing.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={handleStatusToggle}
            loading={isToggling}
            className={`flex items-center gap-2 ${
              formData.status === "Published"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-yellow-600 hover:bg-yellow-700"
            } text-white`}
          >
            {formData.status === "Published" ? (
              <>
                <FaToggleOff size={16} />
                Unpublish
              </>
            ) : (
              <>
                <FaToggleOn size={16} />
                Publish
              </>
            )}
          </Button>
          <Button
            onClick={handleDelete}
            loading={isDeleting}
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
          >
            <FaTrash size={16} />
            Delete
          </Button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-soft border border-neutral-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
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
                className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Fuel Type *
              </label>
              <select
                value={formData.fuelType}
                onChange={(e) =>
                  setFormData({ ...formData, fuelType: e.target.value })
                }
                className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div>
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
              className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              rows="3"
            />
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
            {formData.features.length > 0 && (
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

          <div className="flex items-center gap-6">
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
              <span className="text-sm text-neutral-700">Verified Seller</span>
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

          <div className="flex space-x-3">
            <Button
              type="submit"
              loading={isUpdating}
              className="bg-blue-900 hover:bg-blue-800 text-white flex items-center gap-2"
            >
              <FaEdit size={16} />
              Update Car
            </Button>
            <Button
              type="button"
              onClick={() => navigate("/admin/dashboard/cars")}
              className="bg-gray-600 hover:bg-gray-700 text-white flex items-center gap-2"
            >
              <FaTimes size={16} />
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCarEdit;
