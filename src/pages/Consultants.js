
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import StatCard from '../components/statcard';
import UserTable from '../components/UserTable';
import './Consultants.css'; // CSS file for dashboard styling

const Consultants = () => {
  const [currentView, setCurrentView] = useState('Consultants');
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inactiveUsersCount, setInactiveUsersCount] = useState(0);
  const [consultantsCount, setConsultantsCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);
  const [totalActiveUsers, setTotalActiveUsers] = useState(0);
  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        const response = await fetch('https://bridechila-apis-2.onrender.com/consultants');
        const data = await response.json();
        const formattedConsultants = data.map(user => ({
          name: user.name,
          email: user.email,
          number: user.phoneNumber,
          profession: user.profession || 'N/A',
          status: user.accDeactivated ? 'Inactive' : 'Active',
          role: user.role
        }));
        setConsultants(formattedConsultants);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching consultants:", error);
        setLoading(false);
      }
    };

    const fetchTotals = async () => {
      try {
        const responses = await Promise.all([
          fetch('https://bridechila-apis-2.onrender.com/totalActiveUsers'),
          fetch('https://bridechila-apis-2.onrender.com/totalInactiveUsers'),
          fetch('https://bridechila-apis-2.onrender.com/totalConsultants'),
          fetch('https://bridechila-apis-2.onrender.com/totalCustomers')
        ]);

        const [activeData, inactiveData, consultantsData, customersData] = await Promise.all(
          responses.map(response => response.json())
        );

        setTotalActiveUsers(activeData.totalActiveUsers);
        setInactiveUsersCount(inactiveData.totalInactiveUsers);
        setConsultantsCount(consultantsData.totalConsultants);
        setCustomersCount(customersData.totalCustomers);
      } catch (error) {
        console.error('Error fetching totals:', error);
      }
    };

    fetchConsultants();
    fetchTotals();
  }, [currentView]);

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="dashboard">
      <Sidebar onMenuClick={handleViewChange} />
      <div className="content">
      <div className="stat-cards">
          <StatCard title="Total Active Users" value={totalActiveUsers} />
          <StatCard title="Total Inactive Users" value={inactiveUsersCount} />
          <StatCard title="Total Consultants" value={consultantsCount} />
          <StatCard title="Total Customers" value={customersCount} />
        </div>
        {loading ? (
          <p>Loading consultants...</p>
        ) : (
          <UserTable 
            users={consultants} 
            heading="All Consultants"
            //buttonLabel="Delete"
          />
        )}
      </div>
    </div>
  );
};

export default Consultants;

