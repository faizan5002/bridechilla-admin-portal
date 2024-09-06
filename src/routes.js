import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/Dashboard'; // Create this page later
import Services from './pages/Services';
import Payments from './pages/Payments';
import InactiveUsers from './pages/InactiveUser';
import Consultants from './pages/Consultants';
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/services" element={<Services />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/inactiveUsers" element={<InactiveUsers />} />
        <Route path="/consultants" element={<Consultants />} />


        {/* Add more routes here */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
