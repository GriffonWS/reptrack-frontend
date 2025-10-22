import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineSearch } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdChevronLeft, MdChevronRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import './AllUsers.css';
import { Link } from 'react-router-dom';
const AllUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Mock data
  const mockUsers = [
    { id: 1, firstName: 'John', lastName: 'Doe', phone: '9876543210', email: 'john@example.com', subscriptionType: 'Premium', uniqueId: 'MEM001', status: true },
    { id: 2, firstName: 'Jane', lastName: 'Smith', phone: '9876543211', email: 'jane@example.com', subscriptionType: 'Standard', uniqueId: 'MEM002', status: true },
    { id: 3, firstName: 'Mike', lastName: 'Johnson', phone: '9876543212', email: 'mike@example.com', subscriptionType: 'Premium', uniqueId: 'MEM003', status: false },
    { id: 4, firstName: 'Sarah', lastName: 'Williams', phone: '9876543213', email: 'sarah@example.com', subscriptionType: 'Standard', uniqueId: 'MEM004', status: true },
    { id: 5, firstName: 'David', lastName: 'Brown', phone: '9876543214', email: 'david@example.com', subscriptionType: 'Premium', uniqueId: 'MEM005', status: true },
    { id: 6, firstName: 'Emma', lastName: 'Davis', phone: '9876543215', email: 'emma@example.com', subscriptionType: 'None', uniqueId: 'MEM006', status: false },
    { id: 7, firstName: 'Robert', lastName: 'Miller', phone: '9876543216', email: 'robert@example.com', subscriptionType: 'Standard', uniqueId: 'MEM007', status: true },
    { id: 8, firstName: 'Lisa', lastName: 'Wilson', phone: '9876543217', email: 'lisa@example.com', subscriptionType: 'Premium', uniqueId: 'MEM008', status: true },
    { id: 9, firstName: 'James', lastName: 'Moore', phone: '9876543218', email: 'james@example.com', subscriptionType: 'Standard', uniqueId: 'MEM009', status: true },
    { id: 10, firstName: 'Mary', lastName: 'Taylor', phone: '9876543219', email: 'mary@example.com', subscriptionType: 'Premium', uniqueId: 'MEM010', status: false },
    { id: 11, firstName: 'Thomas', lastName: 'Anderson', phone: '9876543220', email: 'thomas@example.com', subscriptionType: 'Standard', uniqueId: 'MEM011', status: true },
    { id: 12, firstName: 'Jennifer', lastName: 'Thomas', phone: '9876543221', email: 'jennifer@example.com', subscriptionType: 'Premium', uniqueId: 'MEM012', status: true },
  ];

  const filteredUsers = mockUsers.filter(user => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      user.firstName?.toLowerCase().includes(searchLower) ||
      user.lastName?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower) ||
      user.phone?.toLowerCase().includes(searchLower) ||
      user.uniqueId?.toLowerCase().includes(searchLower)
    );
  });

  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="users__container">
      <div className="users__wrapper">
        {/* Header */}
        <div className="users__header">
          <div className="users__header-content">
            <h1 className="users__title">All Members</h1>
            <p className="users__subtitle">Total: {totalUsers} members</p>
          </div>
          <Link to="/dashboard/add-user" className="users__add-btn" style={{textDecoration:"none"}}>
            <AiOutlinePlus size={20} />
            Add Member
          </Link>
        </div>

        {/* Search Bar */}
        <div className="users__search-box">
          <div className="users__search-wrapper">
            <AiOutlineSearch className="users__search-icon" />
            <input
              type="text"
              placeholder="Search by name, email, phone, or member ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="users__search-input"
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="users__table-wrapper">
          {/* Desktop Table */}
          <div className="users__desktop-table">
            <table className="users__table">
              <thead>
                <tr>
                  <th>S no</th>
                  <th>Name</th>
                  <th>Mobile Number</th>
                  <th>Email</th>
                  <th>Subscription</th>
                  <th>Member ID</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="users__no-data">
                      {searchTerm ? 'No members found matching your search' : 'No members found'}
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((user, index) => (
                    <tr key={user.id}>
                      <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
                      <td>
                        <div className="users__name-cell">
                          <div className="users__avatar">
                            <span>
                              {user.firstName.charAt(0)}
                              {user.lastName.charAt(0)}
                            </span>
                          </div>
                          <span className="users__name">{user.firstName} {user.lastName}</span>
                        </div>
                      </td>
                      <td>{user.phone}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`users__badge users__badge--${user.subscriptionType !== 'None' ? 'success' : 'gray'}`}>
                          {user.subscriptionType}
                        </span>
                      </td>
                      <td className="users__member-id">{user.uniqueId}</td>
                      <td>
                        <span className={`users__badge users__badge--${user.status ? 'active' : 'inactive'}`}>
                          {user.status ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <Link to={"/dashboard/user/:id"} className="users__action-btn" style={{textDecoration:"none"}}>
                          <AiOutlineEye size={16} />
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="users__mobile-cards">
            {paginatedUsers.length === 0 ? (
              <div className="users__no-data-mobile">
                {searchTerm ? 'No members found matching your search' : 'No members found'}
              </div>
            ) : (
              paginatedUsers.map((user) => (
                <div key={user.id} className="users__card">
                  <div className="users__card-header">
                    <div className="users__card-info">
                      <div className="users__avatar">
                        <span>
                          {user.firstName.charAt(0)}
                          {user.lastName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="users__card-name">{user.firstName} {user.lastName}</h3>
                        <p className="users__card-id">{user.uniqueId}</p>
                      </div>
                    </div>
                    <span className={`users__badge users__badge--${user.status ? 'active' : 'inactive'}`}>
                      {user.status ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  <div className="users__card-body">
                    <div className="users__card-row">
                      <span className="users__card-label">Phone:</span>
                      <span className="users__card-value">{user.phone}</span>
                    </div>
                    <div className="users__card-row">
                      <span className="users__card-label">Email:</span>
                      <span className="users__card-value">{user.email}</span>
                    </div>
                    <div className="users__card-row">
                      <span className="users__card-label">Subscription:</span>
                      <span className={`users__badge users__badge--${user.subscriptionType !== 'None' ? 'success' : 'gray'}`}>
                        {user.subscriptionType}
                      </span>
                    </div>
                  </div>
                  
                  <button className="users__card-btn">
                    <AiOutlineEye size={16} />
                    View Profile
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="users__pagination">
            <div className="users__pagination-info">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalUsers)} of {totalUsers} entries
            </div>
            
            <div className="users__pagination-controls">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="users__pagination-btn"
                title="First page"
              >
                <MdKeyboardDoubleArrowLeft />
              </button>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="users__pagination-btn"
                title="Previous page"
              >
                <MdChevronLeft />
              </button>
              
              <span className="users__pagination-page">
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="users__pagination-btn"
                title="Next page"
              >
                <MdChevronRight />
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="users__pagination-btn"
                title="Last page"
              >
                <MdKeyboardDoubleArrowRight />
              </button>
            </div>

            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="users__items-select"
            >
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
            </select>
          </div>
        )}
      </div>

       </div>
  );
};

export default AllUsers;