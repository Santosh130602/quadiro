


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"; 
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://quadiro-bcrj.onrender.com/api/user/login', {
        username,
        password,
      });
      const { token } = response.data;
      // Store the token (you can use localStorage or cookies)
      localStorage.setItem('token', token);
      console.log(token);

      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;

      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else if (role === 'user') {
        navigate('/user-dashboard');
      }

      alert('User logged in successfully');
    } catch (error) {
      console.error('Error logging in user', error);
      alert('Error logging in user');
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100 flex-col">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
              >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      <div className='flex mt-10'>
      <p className='mr-2'>Not registerd? </p>
      <Link className='text-blue-700 hover:underline' to='/signUp'> Signup</Link>
      </div>
    </div>
  );
};

export default Login;
