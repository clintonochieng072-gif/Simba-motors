const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: { type: String }, // Car Make/Brand
  model: { type: String }, // Car Model
  year: { type: Number }, // Year of Manufacture
  condition: { type: String, enum: ["New", "Used"] }, // Condition
  price: { type: Number }, // Price
  location: { type: String }, // Location/City
  engineType: {
    type: String,
    enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
  }, // Engine Type
  transmission: { type: String, enum: ["Manual", "Automatic"] }, // Transmission
  mileage: { type: Number }, // Mileage (for used cars)
  bodyType: {
    type: String,
    enum: [
      "Sedan",
      "SUV",
      "Hatchback",
      "Coupe",
      "Convertible",
      "Wagon",
      "Pickup",
      "Van",
      "Other",
    ],
  }, // Body Type
  color: { type: String }, // Exterior Color
  engine: { type: String }, // Engine description
  ownershipHistory: { type: String }, // Legacy field, can be optional
  verifiedSeller: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["Published", "Draft", "Sold"],
    default: "Published",
  },
  images: [{ type: String }], // Array of Cloudinary URLs
  features: [{ type: String }], // Array of car features
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Car", carSchema);
