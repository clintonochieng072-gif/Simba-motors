import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/Button";
import { useToast } from "../contexts/ToastContext";

export default function CarCard({ car }) {
  const { showSuccess } = useToast();
  const [isOrdering, setIsOrdering] = useState(false);

  const handleOrder = async () => {
    setIsOrdering(true);

    const message = `Hi, I'm interested in this car:\n\n${car.name || "N/A"} ${
      car.model || ""
    }\n${car.year ? `Year: ${car.year}` : ""}\n${
      car.condition ? `Condition: ${car.condition}` : ""
    }\n${car.price ? `Price: KSh ${car.price.toLocaleString()}` : ""}\n${
      car.location ? `Location: ${car.location}` : ""
    }\n${car.engineType ? `Engine: ${car.engineType}` : ""}\n${
      car.transmission ? `Transmission: ${car.transmission}` : ""
    }\n${car.mileage ? `Mileage: ${car.mileage} km` : ""}\n${
      car.bodyType ? `Body Type: ${car.bodyType}` : ""
    }\n${
      car.color ? `Color: ${car.color}` : ""
    }\n\nPlease provide more details.`;

    const whatsappUrl = `https://wa.me/254717510255?text=${encodeURIComponent(
      message
    )}`;

    // Simulate a brief delay for UX
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsOrdering(false);
      showSuccess("Opening WhatsApp for order inquiry...");
    }, 500);
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-4 md:p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 transform">
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src={car.images?.[0] || car.image || "/placeholder-car.jpg"}
          alt={`${car.name || "Car"} ${car.model || ""}`}
          className="w-full h-40 md:h-48 object-cover transition-transform duration-300 hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg md:text-xl font-bold text-gray-800">
          {car.name || "N/A"} {car.model || ""}
        </h2>
        <div className="text-gray-600 space-y-1 text-sm md:text-base">
          {car.year && (
            <p className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Year: {car.year}
            </p>
          )}
          {car.condition && (
            <p className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Condition: {car.condition}
            </p>
          )}
          {car.mileage && (
            <p className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Mileage: {car.mileage} km
            </p>
          )}
          {car.engineType && (
            <p className="flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
              Engine: {car.engineType}
            </p>
          )}
          {car.transmission && (
            <p className="flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              Transmission: {car.transmission}
            </p>
          )}
          {car.features && car.features.length > 0 && (
            <div className="mt-2">
              <h4 className="font-semibold text-gray-700 mb-2">
                Key Features:
              </h4>
              <ul className="features-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
                {car.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <span className="text-green-600 mr-1">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {car.bodyType && (
            <p className="flex items-center">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
              Body Type: {car.bodyType}
            </p>
          )}
          {car.location && (
            <p className="flex items-center">
              <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
              Location: {car.location}
            </p>
          )}
          {car.color && (
            <p className="flex items-center">
              <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
              Color: {car.color}
            </p>
          )}
          {car.ownershipHistory && (
            <div className="mt-2">
              <h4 className="font-semibold text-gray-700 mb-2">
                Ownership History:
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {car.ownershipHistory}
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-2 gap-2">
          {car.price && (
            <p className="text-xl md:text-2xl font-bold text-blue-700">
              KSh {car.price.toLocaleString()}
            </p>
          )}
          <Button
            onClick={handleOrder}
            loading={isOrdering}
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl hover:from-blue-700 hover:to-blue-900 shadow-lg font-semibold text-sm md:text-base w-full sm:w-auto"
          >
            Order
          </Button>
        </div>
      </div>
    </div>
  );
}
