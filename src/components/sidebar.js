
// export default Sidebar;
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import logo from '../assets/logo.jpg';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img src={logo} alt="Logo" className="logo" />
      <ul>
        <li><Link to="/consultants">Consultants</Link></li>
        <li><Link to="/dashboard">Active Users</Link></li>
        <li><Link to="/inactiveUsers">Inactive Users</Link></li>
        {/* <li><Link to="/services">Services</Link></li> */}
        <li><Link to="/payments">Payments</Link></li>
        <li><Link to="/">Logout</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
