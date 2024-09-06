import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import StatCard from '../components/statcard';
import UserTable from '../components/UserTable';
import './InactiveUser.css'; // CSS file for dashboard styling

const InactiveUsers = () => {
  const [currentView, setCurrentView] = useState('Inactive Users');
  const [inactiveUsers, setInactiveUsers] = useState([]);
  const [consultantsCount, setConsultantsCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);
  const [totalActiveUsers, setTotalActiveUsers] = useState(0);
  const [inactiveUsersCount, setInactiveUsersCount] = useState(0);

  useEffect(() => {
    const fetchInactiveAccounts = async () => {
      try {
        const response = await fetch('https://bridechila-apis-2.onrender.com/inactiveAccounts');
        const data = await response.json();
        const formattedUsers = data.map(user => ({
          id: user.id, // Ensure id is included
          name: user.name || 'N/A',
          email: user.email,
          number: user.phoneNumber || 'N/A',
          profession: user.profession || 'N/A',
          status: user.conAccApproved ? 'Active' : 'Inactive',
          role: user.role,
        }));
        setInactiveUsers(formattedUsers);
      } catch (error) {
        console.error('Error fetching inactive accounts:', error);
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

    fetchInactiveAccounts();
    fetchTotals();
  }, [currentView]);

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleActivateUser = async (Id) => {
    try {
      const response = await fetch(`https://bridechila-apis-2.onrender.com/activate/${Id}`, {
        method: 'PATCH', // Use POST or PUT depending on your API design
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('User activated successfully!');
        // Optionally refetch users or update state
        const updatedUsers = inactiveUsers.filter(user => user.id !== Id);
        setInactiveUsers(updatedUsers);
        // Optionally update totals
      } else {
        alert('Failed to activate user.');
      }
    } catch (error) {
      console.error('Error activating user:', error);
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
          users={inactiveUsers} 
          heading="All Inactive Users"
          buttonLabel="Activate"
          onButtonClick={handleActivateUser} // Pass the callback
        />
      </div>
    </div>
  );
};

export default InactiveUsers;
