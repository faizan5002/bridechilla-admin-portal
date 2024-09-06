// export default PaymentsTable;
import React, { useState } from 'react';
import './PaymentsTable.css'; // CSS file for user table styling

const PaymentsTable = ({ users = [], heading, buttonLabel }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="user-table-container">
      <div className="header">
        <h2>{heading}</h2> {/* Dynamic heading */}
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Role</th>
            <th>Available Balance</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.phoneNumber}</td> {/* Adjust field names based on your data */}
                <td>{user.role}</td>
                <td>{user.availableBalance}</td> {/* Adjust field names based on your data */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsTable;
