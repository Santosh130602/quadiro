import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    // Check if token is expired
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('token'); // Remove expired token
      return <Navigate to="/login" />;
    }

    return children;
  } catch (error) {
    console.error('Error decoding token', error);
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
