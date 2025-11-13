const Car = require("../models/Car");

// Get all cars with filtering, sorting, search, and pagination
exports.getCars = async (req, res) => {
  try {
    const {
      search,
      priceMin,
      priceMax,
      year,
      fuelType,
      transmission,
      bodyType,
      location,
      sort,
      page = 1,
      limit = 12,
    } = req.query;
    let query = { status: "Published" };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { model: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = parseInt(priceMin);
      if (priceMax) query.price.$lte = parseInt(priceMax);
    }

    if (year) query.year = parseInt(year);
    if (fuelType) query.fuelType = fuelType;
    if (transmission) query.transmission = transmission;
    if (bodyType) query.bodyType = bodyType;
    if (location) query.location = { $regex: location, $options: "i" };

    let sortOptions = {};
    if (sort) {
      if (sort === "price") sortOptions.price = 1;
      else if (sort === "year") sortOptions.year = -1;
      else if (sort === "mileage") sortOptions.mileage = 1;
    } else {
      sortOptions.createdAt = -1;
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const totalCars = await Car.countDocuments(query);
    const cars = await Car.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    // Ensure features is always an array
    const processedCars = cars.map(car => ({
      ...car.toObject(),
      features: car.features || []
    }));

    res.json({
      cars: processedCars,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalCars / limitNum),
        totalCars,
        hasNext: pageNum * limitNum < totalCars,
        hasPrev: pageNum > 1,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single car
exports.getCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });

    // Ensure features is always an array
    const processedCar = {
      ...car.toObject(),
      features: car.features || []
    };

    res.json(processedCar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
