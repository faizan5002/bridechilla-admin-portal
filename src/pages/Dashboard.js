
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import StatCard from '../components/statcard';
import UserTable from '../components/UserTable';
import './Dashboard.css'; // CSS file for dashboard styling

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('Active Users');
  const [users, setUsers] = useState([]);
  const [inactiveUsersCount, setInactiveUsersCount] = useState(0);
  const [consultantsCount, setConsultantsCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);
  const [totalActiveUsers, setTotalActiveUsers] = useState(0);

  useEffect(() => {
    const fetchActiveAccounts = async () => {
      try {
        const response = await fetch('https://bridechila-apis-2.onrender.com/activeAccounts');
        const data = await response.json();
        const formattedUsers = data
          .filter(user => user.conAccApproved)
          .map(user => ({
            id: user.id, // Ensure user ID is included
            name: user.name,
            email: user.email,
            number: user.phoneNumber,
            profession: user.profession || 'N/A',
            status: user.conAccApproved ? 'Active' : 'Inactive',
            role: user.role,
          }));

        setUsers(formattedUsers);
      } catch (error) {
        console.error('Error fetching active accounts:', error);
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

    fetchActiveAccounts();
    fetchTotals();
  }, [currentView]);

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleDeactivate = async (Id) => {
    try {
     const response = await fetch(`https://bridechila-apis-2.onrender.com/deactivate/${Id}`, {
        method: 'PATCH' // Assuming POST request for deactivation
      });
      if (response.ok) {
        alert('User Deactivated successfully!');
      // Optionally update the UI to reflect the change
      setUsers(users.map(user => 
        user.id === Id ? { ...user, status: 'Inactive' } : user
      ));
    }
    else {
      alert('Failed to Deactivate user.');
    }
    } catch (error) {
      console.error('Error deactivating user:', error);
    }
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
        <UserTable 
          users={users} 
          heading={
            currentView === 'Consultants' 
              ? 'All Consultants' 
              : currentView === 'Inactive Users' 
                ? 'All Inactive Users' 
                : 'All Active Users'
          }
          buttonLabel={
            currentView === 'Inactive Users' 
              ? 'Activate' 
              : 'Deactivate'
          }
          onButtonClick={handleDeactivate} // Pass handleDeactivate to UserTable
        />
      </div>
    </div>
  );
};

export default Dashboard;
