import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import {
  FaArrowLeft,
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaCheckCircle,
} from "react-icons/fa";
import { getCar } from "../utils/api";

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [inquiryData, setInquiryData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await getCar(id);
        setCar(response.data);
      } catch (error) {
        console.error("Error fetching car:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    // Mock inquiry submission
    alert("Inquiry sent successfully! We'll contact you soon.");
    setShowInquiryForm(false);
    setInquiryData({ name: "", email: "", phone: "", message: "" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading car details...</p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Car Not Found
          </h2>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              to="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <FaArrowLeft className="mr-2" />
              Back to Listings
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-w-16 aspect-h-9 bg-white rounded-lg overflow-hidden shadow-lg">
                <img
                  src={
                    car.images?.[currentImageIndex] || "/placeholder-car.jpg"
                  }
                  alt={`${car.name} ${car.model}`}
                  className="w-full h-64 sm:h-80 md:h-96 object-contain bg-gray-50"
                />
              </div>
              {car.images && car.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {car.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex
                          ? "border-blue-500"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${car.name} ${car.model} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Car Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {car.name} {car.model}
                  </h1>
                  {car.verifiedSeller && (
                    <div className="flex items-center text-green-600">
                      <FaCheckCircle className="mr-1" />
                      <span className="text-sm font-medium">
                        Verified Seller
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-2xl font-bold text-blue-600 mb-4">
                  KSh {car.price?.toLocaleString()}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>Year: {car.year}</div>
                  <div>Mileage: {car.mileage?.toLocaleString()} km</div>
                  <div>Fuel: {car.fuelType}</div>
                  <div>Transmission: {car.transmission}</div>
                  <div>Body Type: {car.bodyType}</div>
                  <div>Color: {car.color}</div>
                  <div>Engine: {car.engine}</div>
                  <div>Location: {car.location}</div>
                </div>
              </div>

              {/* Full Specifications */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">
                  Full Specifications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      Vehicle Details
                    </h3>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>
                        <strong>Make:</strong> {car.name}
                      </li>
                      <li>
                        <strong>Model:</strong> {car.model}
                      </li>
                      <li>
                        <strong>Year:</strong> {car.year}
                      </li>
                      <li>
                        <strong>Body Type:</strong> {car.bodyType}
                      </li>
                      <li>
                        <strong>Color:</strong> {car.color}
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      Technical Specs
                    </h3>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>
                        <strong>Engine:</strong> {car.engine}
                      </li>
                      <li>
                        <strong>Fuel Type:</strong> {car.fuelType}
                      </li>
                      <li>
                        <strong>Transmission:</strong> {car.transmission}
                      </li>
                      <li>
                        <strong>Mileage:</strong>{" "}
                        {car.mileage?.toLocaleString()} km
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Ownership History
                  </h3>
                  <p className="text-sm text-gray-600">
                    {car.ownershipHistory}
                  </p>
                </div>
                {car.features && car.features.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-medium text-gray-900 mb-2">Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {car.features.map((feature, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Buttons */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Contact Seller</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <a
                    href={`tel:+254712345678`}
                    className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <FaPhone className="mr-2" />
                    Call
                  </a>
                  <a
                    href={`https://wa.me/254712345678?text=Hi, I'm interested in your ${car.name} ${car.model}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <FaWhatsapp className="mr-2" />
                    WhatsApp
                  </a>
                  <button
                    onClick={() => setShowInquiryForm(true)}
                    className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FaEnvelope className="mr-2" />
                    Inquiry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry Modal */}
        {showInquiryForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Send Inquiry</h3>
              <form onSubmit={handleInquirySubmit}>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={inquiryData.name}
                    onChange={(e) =>
                      setInquiryData({ ...inquiryData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={inquiryData.email}
                    onChange={(e) =>
                      setInquiryData({ ...inquiryData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone"
                    value={inquiryData.phone}
                    onChange={(e) =>
                      setInquiryData({ ...inquiryData, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <textarea
                    placeholder="Your Message"
                    value={inquiryData.message}
                    onChange={(e) =>
                      setInquiryData({
                        ...inquiryData,
                        message: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                    required
                  />
                </div>
                <div className="flex space-x-3 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send Inquiry
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowInquiryForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
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

export default CarDetail;
