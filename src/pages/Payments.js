// export default Payments;
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import StatCard from '../components/statcard';
import PaymentsTable from '../components/PaymentsTable';
import './Services.css'; // Optional CSS file for services styling
import './Dashboard.css'; // Assuming this CSS file contains styles for stat cards, etc.

const Payments = () => {
  const [payments, setPayments] = useState([]); // State to store payments data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [inactiveUsersCount, setInactiveUsersCount] = useState(0);
  const [consultantsCount, setConsultantsCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);
  const [totalActiveUsers, setTotalActiveUsers] = useState(0);
  const fetchPayments = async () => {
    try {
      const response = await fetch('https://bridechila-apis-2.onrender.com/usersWithBalance');
      const data = await response.json();
      setPayments(data); // Adjust according to your API response
      setLoading(false); // Stop loading
    } catch (error) {
      console.error("Error fetching payments:", error);
      setLoading(false); // Stop loading even if there's an error
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
  useEffect(() => {
    fetchPayments();
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
        {loading ? (
          <p>Loading payments...</p>
        ) : (
          <PaymentsTable
            users={payments}
            heading="All Payments"
            buttonLabel="Deactivate"
          />
        )}
      </div>
    </div>
  );
};

export default Payments;

