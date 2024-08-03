// controllers/carController.js
const Cars = require('../models/cars');

// const createCar = async (req, res) => {
//   try {
//     const userId = req.user.id; // Ensure this matches how your token middleware sets the user id
//     console.log(userId)
//     const { carname, year, price } = req.body;

//     if (!carname || !year || !price) {
//       return res.status(400).send('Missing values');
//     }

//     const newCar = await Cars.create({
//       createdBy: userId,
//       carname,
//       year,
//       price,
//     });

//     const populateCar = await Cars.findById(newCar._id).populate('createdBy', '-password -email');

//     res.status(201).json(populateCar);
//   } catch (error) {
//     res.status(500).send('Error creating car');
//   }
// };

const createCar = async (req, res) => {
  try {
    const userId = req.user.id;
    const { carname, year, price, image } = req.body;

    if (!carname || !year || !price || !image) {
      return res.status(400).send('Missing values');
    }

    const newCar = await Cars.create({
      createdBy: userId,
      carname,
      year,
      price,
      image,
    });

    const populateCar = await Cars.findById(newCar._id).populate('createdBy', '-password -email');

    res.status(201).json(populateCar);
  } catch (error) {
    res.status(500).send('Error creating car');
  }
};











const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { carname, year, price } = req.body;

    if (!carname && !year && !price) {
      return res.status(400).send('No values provided for update');
    }

    const updatedCar = await Cars.findByIdAndUpdate(id, { carname, year, price }, { new: true, runValidators: true });

    if (!updatedCar) {
      return res.status(404).send('Car not found');
    }

    res.status(200).send(updatedCar);
  } catch (error) {
    res.status(500).send('Error updating car details');
  }
};

// const getAllCars = async (req, res) => {
//   try {
//     const cars = await Cars.find();
//     res.status(200).send(cars);
//   } catch (error) {
//     res.status(500).send('Error getting car details');
//   }
// };

const getAllCars = async (req, res) => {
  try {
    const cars = await Cars.find().populate('createdBy', 'username');
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).send('Error getting car details');
  }
};

const getUserCars = async (req, res) => {
  try {
    const user = req.user;
    const cars = await Cars.find({ createdBy: user.id });
    res.status(200).send(cars);
  } catch (error) {
    res.status(500).send('Error getting car details');
  }
};

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCar = await Cars.findByIdAndDelete(id);

    if (!deletedCar) {
      return res.status(404).send('Car not found');
    }

    res.status(200).send('Car deleted');
  } catch (error) {
    res.status(500).send('Error deleting car details');
  }
};

module.exports = {
  createCar,
  updateCar,
  getAllCars,
  getUserCars,
  deleteCar,
};
