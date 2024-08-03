
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import AdminDashboard from './pages/AdminDashboard';
// import UserDashboard from './pages/UserDashboard';
// import { login } from './api/auth';

// const App = () => {
//   const [token, setToken] = useState('');
//   const [role, setRole] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const { username, password } = e.target.elements;
//     const response = await login({ username: username.value, password: password.value });
//     setToken(response.token);
//     setRole(response.role);
//   };

//   return (
//     <Router>
//       <div>
//         {!token ? (
//           <form onSubmit={handleLogin}>
//             <input type="text" name="username" placeholder="Username" required />
//             <input type="password" name="password" placeholder="Password" required />
//             <button type="submit">Login</button>
//           </form>
//         ) : (
//           <Routes>
//             {role === 'admin' ? (
//               <Route path="/" component={() => <AdminDashboard token={token} />} />
//             ) : (
//               <Route path="/" component={() => <UserDashboard token={token} />} />
//             )}
//           </Routes>
//         )}
//       </div>
//     </Router>
//   );
// };

// export default App;


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
        <Route path="/" element={<Navigate to={role === 'admin' ? '/admin' : '/user'} />} />
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
