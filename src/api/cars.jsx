// // api/cars.js
// import axios from 'axios';

// const API_URL = 'http://localhost:4000/api';

// export const createCar = async (carData, token) => {
//   const response = await axios.post(`${API_URL}/cars`, carData, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };

// export const updateCar = async (id, carData, token) => {
//   const response = await axios.put(`${API_URL}/cars/${id}`, carData, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };

// export const getAllCars = async (token) => {
//   const response = await axios.get(`${API_URL}/cars`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };

// export const getUserCars = async (token) => {
//   const response = await axios.get(`${API_URL}/usercars`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };

// export const deleteCar = async (id, token) => {
//   const response = await axios.delete(`${API_URL}/cars/${id}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };






import axios from 'axios';

export const createCar = async (formData, token) => {
  const response = await axios.post('http://localhost:4000/api/car/createCar', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const updateCar = async (carId, formData, token) => {
  const response = await axios.put(`http://localhost:4000/api/car/updateCar/${carId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
