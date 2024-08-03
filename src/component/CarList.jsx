

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const CarList = ({ token, isAdmin }) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('https://quadiro-bcrj.onrender.com/api/car/getAllCars', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, [token]);

  return (
    <div>
      <h2 className="text-xl text-center mt-10 mb-10 font-bold">Car List</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {cars.length > 0 ? (
          <ul className="space-y-4">
            {cars.map((car) => (
              <li key={car._id} className="border-b border-gray-300 pb-2">
                <div className='flex justify-between'>
                <div className='p-6 ml-8'>
                <p className='text-left'><strong>Car: &nbsp; &nbsp; &nbsp;</strong> <samp className='text-left'>{car.carname}</samp></p>
                <p className='text-left'><strong>Year: &nbsp; &nbsp; </strong> <samp className='text-left	'>{car.year}</samp></p>
                <p className='text-left'><strong>Price: &nbsp; </strong><samp className='text-left	'>${car.price}</samp> </p>
                </div>
                <img src={car.image} alt={car.carname} className="w-1/3 h-48 object-cover rounded" />
                </div>
                
              </li>
            ))}
          </ul>
        ) : (
          <p>No cars available</p>
        )}
      </div>
    </div>
  );
};

export default CarList;
