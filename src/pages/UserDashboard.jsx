

import React, { useState, useEffect } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import CarForm from '../component/CarForm';
import CarList from '../component/CarList';
import Mycar from "../component/myCar"
import {jwtDecode} from "jwt-decode";

const UserDashboard = () => {
  const [cars, setCars] = useState([]);
  const [view, setView] = useState('all');
  const [username, setUsername] = useState();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUsername(decodedToken.username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <div className="w-1/4 bg-gray-800 text-white p-6">
        <h2 className="text-xl font-bold mb-6">{username} Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setView('all')}
              className="w-full text-left bg-gray-700 p-2 rounded-md hover:bg-gray-600"
            >
              All Cars
            </button>
          </li>
          
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left bg-red-600 p-2 rounded-md hover:bg-red-500"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-6">
        {view === 'all' && <CarList token={token} isAdmin={true} />}
      </div>
    </div>
  );
};

export default UserDashboard;
