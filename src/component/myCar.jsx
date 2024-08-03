



import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Mycar = ({ token, isAdmin }) => {
  const [cars, setCars] = useState([]);
  const [editCar, setEditCar] = useState(null); // For edit modal
  const [formData, setFormData] = useState({ carname: '', year: '', price: '', image: '' });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/car/getAllCars', {
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

  const editHandler = (car) => {
    setEditCar(car);
    setFormData({ carname: car.carname, year: car.year, price: car.price, image: car.image });
  };

  const updateCar = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:4000/api/car/updateCar/${editCar._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCars((prev) => prev.map((car) => (car._id === editCar._id ? response.data : car)));
      setEditCar(null);
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/car/deleteCar/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCars((prev) => prev.filter((car) => car._id !== id));
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2 className="text-xl text-center mt-10 mb-10 font-bold">My Car</h2>
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
                {isAdmin && (
                  <div className='flex gap-4 mt-2'>
                    <button onClick={() => editHandler(car)} className="text-gray-100 text-xs bg-blue-500 px-6 py-1 rounded">Edit</button>
                    <button onClick={() => deleteHandler(car._id)} className="text-gray-100 text-xs bg-red-500 px-6 py-1 rounded">Delete</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No cars available</p>
        )}

        {editCar && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold">Edit Car</h2>
              <form onSubmit={updateCar} className="space-y-4">
                <div>
                  <label htmlFor="carname" className="block text-sm font-medium text-gray-700">Car Name</label>
                  <input
                    type="text"
                    name="carname"
                    value={formData.carname}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <img src={formData.image} alt="Selected" className="w-full h-48 object-cover rounded" />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setEditCar(null)}
                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mycar;

