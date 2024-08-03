
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './component/login';
import Signup from './component/signup';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import PrivateRoute from './api/PrivateRoute';
import { login, signup } from './api/auth';

const App = () => {
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');

  const handleLogin = async (username, password) => {
    const response = await login({ username, password });
    setToken(response.token);
    setRole(response.role);
  };

  const handleSignup = async (username, password, userRole) => {
    const response = await signup({ username, password, role: userRole });
    setToken(response.token);
    setRole(response.role);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
        // <Route path="/" element={<Navigate to={role === 'admin' ? '/admin' : '/user'} />} />
    <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/admin-dashboard"
          element={<PrivateRoute token={token} role="admin"><AdminDashboard /></PrivateRoute>}
        />
        <Route
          path="/user-dashboard"
          element={<PrivateRoute token={token} role="user"><UserDashboard /></PrivateRoute>}
        />
      </Routes>
    </Router>
  );
};

export default App;
