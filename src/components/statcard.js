import React from 'react';
import './StatCard.css'; // CSS file for card styling
import icon from '../assets/users.png';

const StatCard = ({ title, value }) => {
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <img src={icon} className="icon"/>
      <p>{value}</p>
    </div>
  );
};

export default StatCard;
