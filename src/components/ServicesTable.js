// export default UserTable;
import React, { useState } from 'react';
import './ServicesTable.css'; // CSS file for user table styling

const ServicesTable = ({ users, heading, buttonLabel }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Get the users for the current page
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="user-table-container">
      <div className="header">
        <h2>{heading}</h2> {/* Dynamic heading */}
        {/* <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        /> */}
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            

          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.description}</td>
             

                {/* <button className={buttonLabel === 'Activate' ? 'activate-btn' : 'deactivate-btn'}>
                  {buttonLabel}
                </button> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={index + 1 === currentPage ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServicesTable;
