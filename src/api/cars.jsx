

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
