const Car = require("../models/Car");
const cloudinary = require("../cloudinary");

// Get dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalCars = await Car.countDocuments();
    const activeListings = await Car.countDocuments({ status: "Published" });
    const pendingApprovals = await Car.countDocuments({ status: "Draft" });
    const totalRevenue = await Car.aggregate([
      { $match: { status: "Sold" } },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);
    const revenue = totalRevenue.length > 0 ? totalRevenue[0].total : 0;

    // Mock data for new leads and active users (since we don't have user model yet)
    const newLeads = 12; // Mock
    const activeUsers = 45; // Mock

    res.json({
      totalActiveListings: activeListings,
      totalRevenue: revenue,
      newLeads,
      pendingApprovals,
      totalCars,
      activeUsers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all cars for admin
exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    // Ensure features is always an array
    const processedCars = cars.map(car => ({
      ...car.toObject(),
      features: car.features || []
    }));
    res.json(processedCars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new car
exports.addCar = async (req, res) => {
  try {
    const {
      name,
      model,
      year,
      condition,
      price,
      location,
      engineType,
      transmission,
      mileage,
      bodyType,
      color,
      ownershipHistory,
      verifiedSeller,
      engine,
      status,
      features,
    } = req.body;
    let images = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          const result = await cloudinary.uploader.upload(file.path);
          images.push(result.secure_url);
        } catch (cloudinaryError) {
          console.error("Cloudinary upload error:", cloudinaryError);
          throw new Error("Failed to upload image to cloud storage");
        }
      }
    }

    // Handle features: if it's a string, split into array; otherwise use as array
    let processedFeatures = [];
    if (features === undefined || features === null) {
      processedFeatures = [];
    } else if (Array.isArray(features)) {
      processedFeatures = features;
    } else if (typeof features === "string") {
      processedFeatures = features
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f);
    } else {
      processedFeatures = [];
    }

    const car = new Car({
      name,
      model,
      year: year ? parseInt(year) : undefined,
      condition,
      price: price ? parseInt(price) : undefined,
      location,
      engineType,
      transmission,
      mileage: mileage ? parseInt(mileage) : undefined,
      bodyType,
      color,
      ownershipHistory,
      verifiedSeller: verifiedSeller === "true",
      engine,
      features: processedFeatures,
      status: status || "Published",
      images,
    });

    const savedCar = await car.save();
    // Ensure features is always an array in response
    const processedCar = {
      ...savedCar.toObject(),
      features: savedCar.features || []
    };
    res.status(201).json(processedCar);
  } catch (error) {
    console.error("Error adding car:", error);
    res
      .status(500)
      .json({ message: "Failed to add car", error: error.message });
  }
};

// Update car
exports.updateCar = async (req, res) => {
  try {
    const updateData = {};
    let images = req.body.images || [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          const result = await cloudinary.uploader.upload(file.path);
          images.push(result.secure_url);
        } catch (cloudinaryError) {
          console.error("Cloudinary upload error:", cloudinaryError);
          throw new Error("Failed to upload image to cloud storage");
        }
      }
      updateData.images = images;
    }

    // Only update fields that are provided
    if (req.body.name !== undefined) updateData.name = req.body.name;
    if (req.body.model !== undefined) updateData.model = req.body.model;
    if (req.body.year !== undefined)
      updateData.year = req.body.year ? parseInt(req.body.year) : undefined;
    if (req.body.condition !== undefined)
      updateData.condition = req.body.condition;
    if (req.body.price !== undefined)
      updateData.price = req.body.price ? parseInt(req.body.price) : undefined;
    if (req.body.location !== undefined)
      updateData.location = req.body.location;
    if (req.body.fuelType !== undefined)
      updateData.engineType = req.body.fuelType;
    if (req.body.transmission !== undefined)
      updateData.transmission = req.body.transmission;
    if (req.body.mileage !== undefined)
      updateData.mileage = req.body.mileage
        ? parseInt(req.body.mileage)
        : undefined;
    if (req.body.bodyType !== undefined)
      updateData.bodyType = req.body.bodyType;
    if (req.body.color !== undefined) updateData.color = req.body.color;
    if (req.body.ownershipHistory !== undefined)
      updateData.ownershipHistory = req.body.ownershipHistory;
    if (req.body.verifiedSeller !== undefined)
      updateData.verifiedSeller = req.body.verifiedSeller === "true";
    if (req.body.engine !== undefined) updateData.engine = req.body.engine;
    if (req.body.status !== undefined) updateData.status = req.body.status;
    if (req.body.features !== undefined) {
      // Handle features: if it's a string, split into array; otherwise use as array
      let processedFeatures = [];
      if (Array.isArray(req.body.features)) {
        processedFeatures = req.body.features;
      } else if (typeof req.body.features === "string") {
        processedFeatures = req.body.features
          .split(",")
          .map((f) => f.trim())
          .filter((f) => f);
      }
      updateData.features = processedFeatures;
    }

    const updatedCar = await Car.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updatedCar) return res.status(404).json({ message: "Car not found" });
    // Ensure features is always an array in response
    const processedCar = {
      ...updatedCar.toObject(),
      features: updatedCar.features || []
    };
    res.json(processedCar);
  } catch (error) {
    console.error("Error updating car:", error);
    res
      .status(500)
      .json({ message: "Failed to update car", error: error.message });
  }
};

// Delete car
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json({ message: "Car deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
