

import React, { useState } from 'react';
import axios from 'axios';
import { FcAddImage } from "react-icons/fc";

const CarForm = ({ setCars, token }) => {
  const [formData, setFormData] = useState({
    carname: '',
    year: '',
    price: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);

    uploadImageToCloudinary(file);
  };

  const uploadImageToCloudinary = (file) => {
    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "liaison"); 
    data.append("cloud_name", "dh5s1wktp"); 

    fetch("https://api.cloudinary.com/v1_1/dh5s1wktp/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setImageURL(data.url);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error uploading image:', err);
        setLoading(false);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('https://quadiro-bcrj.onrender.com/api/car/createCar', {
        ...formData,
        image: imageURL,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setCars((prev) => [...prev, response.data]);

      setFormData({
        carname: '',
        year: '',
        price: '',
      });
      setSelectedImage(null);
      setImageURL('');
    } catch (error) {
      console.error('Error creating car:', error.response?.data || error.message);
      setError(error.response?.data || 'Error creating car. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Create Car</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label htmlFor="carname" className="block text-sm font-medium text-gray-700">Car Name</label>
        <input
          type="text"
          name="carname"
          value={formData.carname}
          onChange={handleChange}
          placeholder="Car Name"
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
          placeholder="Year"
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
          placeholder="Price"
          required
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="file-upload" className="block mb-2 cursor-pointer text-center">
          {selectedImage ? (
            <img src={selectedImage} alt="Selected" className="w-full h-48 object-cover rounded" />
          ) : (
            <div className="flex items-center justify-center w-full h-48 border-2 border-dashed rounded cursor-pointer">
              <FcAddImage className="text-6xl" />
            </div>
          )}
          <input type="file" accept="image/*" id="file-upload" className="hidden" onChange={handleFileInputChange} />
        </label>
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Car'}
      </button>
    </form>
  );
};

export default CarForm;

