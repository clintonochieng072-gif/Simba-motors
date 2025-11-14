import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { addCar } from "../utils/api";
import { Button } from "../components/ui/Button";
import { useToast } from "../contexts/ToastContext";
import {
  FaPlus,
  FaTimes,
  FaEye,
  FaUpload,
  FaCar,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaGasPump,
  FaCogs,
  FaTachometerAlt,
  FaPalette,
  FaTag,
} from "react-icons/fa";

const AdminAddCar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showSuccess, showError } = useToast();
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
    ownershipHistory: "",
    status: "Published",
  });
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const formDataRef = useRef(formData);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  // Handle back button navigation
  useEffect(() => {
    const handlePopState = () => {
      // When back button is pressed on add car page, navigate to cars list
      navigate("/admin/dashboard/cars", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFeatureAdd = (feature) => {
    if (
      feature.trim() &&
      !formDataRef.current.features.includes(feature.trim())
    ) {
      setFormData((prev) => {
        const newData = {
          ...prev,
          features: [...prev.features, feature.trim()],
        };
        formDataRef.current = newData;
        return newData;
      });
    }
  };

  const handleFeatureRemove = (index) => {
    setFormData((prev) => {
      const newData = {
        ...prev,
        features: prev.features.filter((_, i) => i !== index),
      };
      formDataRef.current = newData;
      return newData;
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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter((file) => file.type.startsWith("image/"));

    if (validImages.length !== files.length) {
      alert("Please select only image files");
      return;
    }

    setImages(validImages);

    // Create preview URLs
    const previews = validImages.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previewImages.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviewImages(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem("adminToken");
    const carData = new FormData();

    // Only append non-empty fields
    Object.keys(formDataRef.current).forEach((key) => {
      if (
        formDataRef.current[key] !== "" &&
        formDataRef.current[key] !== null &&
        formDataRef.current[key] !== undefined &&
        formDataRef.current[key] !== []
      ) {
        if (Array.isArray(formDataRef.current[key])) {
          // For arrays like features, append as JSON string
          carData.append(key, JSON.stringify(formDataRef.current[key]));
        } else {
          carData.append(key, formDataRef.current[key]);
        }
      }
    });

    images.forEach((image) => carData.append("images", image));

    try {
      await addCar(carData, token);
      showSuccess("Car added successfully!");
      setTimeout(() => (window.location.href = "/admin/dashboard/cars"), 1000);
    } catch (error) {
      console.error("Error adding car:", error);
      showError("Failed to add car. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-soft border border-neutral-200 p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-heading font-bold text-neutral-800 flex items-center gap-3">
            <FaPlus className="text-primary-600" />
            Add New Car
          </h1>
          <Button
            onClick={handlePreview}
            variant="outline"
            className="flex items-center gap-2"
          >
            <FaEye size={16} />
            Preview
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Car Make/Brand *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 sm:p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="e.g., Toyota"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Car Model *
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                className="w-full p-2 sm:p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="e.g., Prado"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Year of Manufacture
              </label>
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="w-full p-2 sm:p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Condition
              </label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                className="w-full p-2 sm:p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              >
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Price (KSh)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-2 sm:p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="e.g., 2500000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Location/City
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full p-2 sm:p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="e.g., Nairobi"
              />
            </div>
          </div>

          {/* Technical Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Engine Type
              </label>
              <select
                name="engineType"
                value={formData.engineType}
                onChange={handleInputChange}
                className="w-full p-2 sm:p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              >
                <option value="">Select Engine Type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Transmission
              </label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleInputChange}
                className="w-full p-2 sm:p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              >
                <option value="">Select Transmission</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Mileage (km)
              </label>
              <input
                type="number"
                name="mileage"
                value={formData.mileage}
                onChange={handleInputChange}
                className="w-full p-2 sm:p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="e.g., 50000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Body Type
              </label>
              <select
                name="bodyType"
                value={formData.bodyType}
                onChange={handleInputChange}
                className="w-full p-2 sm:p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              >
                <option value="">Select Body Type</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Coupe">Coupe</option>
                <option value="Convertible">Convertible</option>
                <option value="Wagon">Wagon</option>
                <option value="Pickup">Pickup</option>
                <option value="Van">Van</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Exterior Color
              </label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className="w-full p-2 sm:p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="e.g., White"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full p-2 sm:p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
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
                className="w-full p-2 sm:p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="Type a feature and press Enter (e.g., Air Conditioning)"
                onKeyPress={handleFeatureKeyPress}
              />
            </div>
            {(formData.features || []).length > 0 && (
              <div className="flex flex-wrap gap-2">
                {(formData.features || []).map((feature, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
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

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Ownership History
            </label>
            <textarea
              name="ownershipHistory"
              value={formData.ownershipHistory}
              onChange={handleInputChange}
              className="w-full p-2 sm:p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              placeholder="Describe the ownership history..."
              rows="3"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Photos (At least 1 main image) *
            </label>
            <label
              className="border-2 border-dashed border-neutral-300 rounded-lg p-4 sm:p-6 text-center hover:border-primary-500 transition-colors cursor-pointer"
              onClick={() => document.getElementById("image-upload").click()}
            >
              <FaUpload className="mx-auto text-neutral-400 text-2xl sm:text-3xl mb-4" />
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="visually-hidden"
                id="image-upload"
                required={images.length === 0}
              />
              <div className="text-primary-600 hover:text-primary-700 font-medium text-sm sm:text-base">
                Click to upload images
              </div>
              <p className="text-sm text-neutral-500 mt-2">
                PNG, JPG, GIF up to 10MB each
              </p>
            </label>
            {previewImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mt-4">
                {previewImages.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-20 sm:h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <FaTimes size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 border-t border-neutral-200">
            <Button
              type="button"
              onClick={() => navigate("/admin/dashboard/cars")}
              className="bg-gray-600 hover:bg-gray-700 text-white flex items-center justify-center gap-2 order-2 sm:order-1"
            >
              <FaTimes size={16} />
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 order-1 sm:order-2"
            >
              <FaPlus size={16} />
              Save Car
            </Button>
          </div>
        </form>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-heading font-bold text-neutral-800">
                  Preview
                </h2>
                <Button
                  onClick={() => setShowPreview(false)}
                  variant="ghost"
                  size="icon"
                  className="text-neutral-400 hover:text-neutral-600"
                >
                  <FaTimes size={20} />
                </Button>
              </div>
              <div className="space-y-4">
                {previewImages.length > 0 && (
                  <img
                    src={previewImages[0]}
                    alt="Car preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {formData.name && (
                    <div>
                      <span className="font-medium">Make:</span> {formData.name}
                    </div>
                  )}
                  {formData.model && (
                    <div>
                      <span className="font-medium">Model:</span>{" "}
                      {formData.model}
                    </div>
                  )}
                  {formData.year && (
                    <div>
                      <span className="font-medium">Year:</span> {formData.year}
                    </div>
                  )}
                  {formData.condition && (
                    <div>
                      <span className="font-medium">Condition:</span>{" "}
                      {formData.condition}
                    </div>
                  )}
                  {formData.price && (
                    <div>
                      <span className="font-medium">Price:</span> KSh{" "}
                      {formData.price.toLocaleString()}
                    </div>
                  )}
                  {formData.location && (
                    <div>
                      <span className="font-medium">Location:</span>{" "}
                      {formData.location}
                    </div>
                  )}
                  {formData.engineType && (
                    <div>
                      <span className="font-medium">Engine:</span>{" "}
                      {formData.engineType}
                    </div>
                  )}
                  {formData.transmission && (
                    <div>
                      <span className="font-medium">Transmission:</span>{" "}
                      {formData.transmission}
                    </div>
                  )}
                  {formData.mileage && (
                    <div>
                      <span className="font-medium">Mileage:</span>{" "}
                      {formData.mileage} km
                    </div>
                  )}
                  {formData.bodyType && (
                    <div>
                      <span className="font-medium">Body Type:</span>{" "}
                      {formData.bodyType}
                    </div>
                  )}
                  {formData.color && (
                    <div>
                      <span className="font-medium">Color:</span>{" "}
                      {formData.color}
                    </div>
                  )}
                  {(formData.features || []).length > 0 && (
                    <div className="col-span-2">
                      <span className="font-medium">Features:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {(formData.features || []).map((feature, index) => (
                          <span
                            key={index}
                            className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-xs"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {formData.ownershipHistory && (
                    <div>
                      <span className="font-medium">Ownership History:</span>{" "}
                      {formData.ownershipHistory}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAddCar;
