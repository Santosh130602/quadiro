


// routes/carRoutes.js
const express = require('express');
const router = express.Router();
const {
  createCar,
  updateCar,
  getAllCars,
  getUserCars,
  deleteCar
} = require('../controller/cars');
const auth = require('../config/protect');
const protect = require("../config/protect")

router.post('/createCar', protect, createCar);
router.put('/updateCar/:id', protect, updateCar);
router.get('/getAllCars', protect, getAllCars);
router.get('/getUserCars', protect, getUserCars);
router.delete('/deleteCar/:id', protect, deleteCar);

module.exports = router;
