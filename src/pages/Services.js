// import React from 'react';
// import Sidebar from '../components/sidebar';
// import StatCard from '../components/statcard';
// import ServicesTable from '../components/ServicesTable';
// import './Services.css'; // Optional CSS file for services styling
// import './Dashboard.css'; // Assuming this CSS file contains styles for stat cards, etc.

// const Services = () => {
  
//   const sampleUsers = [
//     { name: 'Service 1', description: 'Description 1', users: '123', consultants: '15' },
//     { name: 'Service 2', description: 'Description 2', users: '456', consultants: '10' },
//     { name: 'Service 3', description: 'Description 3', users: '789', consultants: '8' },
//     // Add more sample user data as needed
//   ];

//   return (
//     <div className="services">
//       <Sidebar />
//       <div className="content">
//         <div className="stat-cards">
//           <StatCard title="Total Active Users" value="1,234" />
//           <StatCard title="Total Inactive Users" value="5,353" />
//           <StatCard title="Total Consultants" value="1,232" />
//           <StatCard title="Total Customers" value="1,243" />
//         </div>
//         <ServicesTable 
//           users={sampleUsers} 
//           heading="All Services" 
//           buttonLabel="Deactivate" // Update as needed
//         />
//       </div>
//     </div>
//   );
// };

// export default Services;
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import StatCard from '../components/statcard';
import ServicesTable from '../components/ServicesTable';
import './Services.css'; // Optional CSS file for services styling
import './Dashboard.css'; // Assuming this CSS file contains styles for stat cards, etc.

const Services = () => {
  const [inactiveUsersCount, setInactiveUsersCount] = useState(0);
  const [consultantsCount, setConsultantsCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);
  const [totalActiveUsers, setTotalActiveUsers] = useState(0);

  // Static dummy data for services
  const services = [
    { name: 'Service 1', description: 'Description 1', users: '123', consultants: '15' },
    { name: 'Service 2', description: 'Description 2', users: '456', consultants: '10' },
    { name: 'Service 3', description: 'Description 3', users: '789', consultants: '8' },
    // Add more dummy service data as needed
  ];

  const fetchTotals = async () => {
    try {
      const responses = await Promise.all([
        fetch('http://localhost:3000/totalActiveUsers'),
        fetch('http://localhost:3000/totalInactiveUsers'),
        fetch('http://localhost:3000/totalConsultants'),
        fetch('http://localhost:3000/totalCustomers')
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

  useEffect(() => {
    fetchTotals();
  }, []);

  return (
    <div className="services">
      <Sidebar />
      <div className="content">
        <div className="stat-cards">
          <StatCard title="Total Active Users" value={totalActiveUsers} />
          <StatCard title="Total Inactive Users" value={inactiveUsersCount} />
          <StatCard title="Total Consultants" value={consultantsCount} />
          <StatCard title="Total Customers" value={customersCount} />
        </div>
        <ServicesTable 
          users={services} 
          heading="All Services" 
          buttonLabel="Deactivate" // Update as needed
        />
      </div>
    </div>
  );
};

export default Services;
