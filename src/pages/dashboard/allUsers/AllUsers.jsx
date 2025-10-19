import React, { useState, useEffect } from 'react';
import { AiOutlineEye, AiOutlineSearch } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdChevronLeft, MdChevronRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { getAllUsers } from '../../../services/users/userService';
import { useNavigate } from 'react-router-dom';
import '../allUsers/AllUsers.css';

const AllUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, [currentPage, itemsPerPage]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        limit: itemsPerPage,
        offset: (currentPage - 1) * itemsPerPage,
        sortBy: 'id',
        order: 'DESC'
      };

      const response = await getAllUsers(params);
      
      setUsers(response.data || []);
      setTotalUsers(response.total || 0);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setError(err.message || 'Failed to fetch users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => {
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

  const totalPages = Math.ceil(totalUsers / itemsPerPage);

  const handleViewProfile = (userId) => {
  navigate(`/dashboard/user/${userId}`);
};

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Loading state
  if (loading) {
    return (
      <div className="all-users-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading users...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="all-users-container">
        <div className="error-container">
          <h3 className="error-title">Error Loading Users</h3>
          <p className="error-message">{error}</p>
          <button onClick={fetchUsers} className="error-retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="all-users-container">
      <div className="all-users-wrapper">
        {/* Header */}
       <div className="users-header">
  <div>
    <h1 className="users-title">All Members</h1>
    <p className="users-count">Total: {totalUsers} members</p>
  </div>
  <button
    className="add-member-btn"
    onClick={() => navigate('/dashboard/add-user')}
  >
    <AiOutlinePlus className="add-member-icon" />
    Add Member
  </button>
</div>

        {/* Search Bar */}
        <div className="search-container">
          <div className="search-wrapper">
            <AiOutlineSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, email, phone, or member ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="table-container">
          {/* Desktop Table */}
          <div className="desktop-table">
            <table className="users-table">
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
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="no-data">
                      {searchTerm ? 'No members found matching your search' : 'No members found'}
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user, index) => (
                    <tr key={user.id}>
                      <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
                      <td>
                        <div className="user-name-cell">
                          <div className="user-avatar">
                            <span>
                              {(user.firstName?.charAt(0) || '').toUpperCase()}
                              {(user.lastName?.charAt(0) || '').toUpperCase()}
                            </span>
                          </div>
                          <div className="user-name">
                            {user.firstName || ''} {user.lastName || ''}
                          </div>
                        </div>
                      </td>
                      <td>{user.phone || 'N/A'}</td>
                      <td>{user.email || 'N/A'}</td>
                      <td>
                        <span className={`badge ${user.subscriptionType ? 'badge-success' : 'badge-gray'}`}>
                          {user.subscriptionType || 'None'}
                        </span>
                      </td>
                      <td className="member-id">{user.uniqueId || 'N/A'}</td>
                      <td>
                        <span className={`badge ${user.status ? 'badge-active' : 'badge-inactive'}`}>
                          {user.status ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleViewProfile(user.id)}
                          className="view-profile-btn"
                        >
                          <AiOutlineEye />
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="mobile-cards">
            {filteredUsers.length === 0 ? (
              <div className="no-data-mobile">
                {searchTerm ? 'No members found matching your search' : 'No members found'}
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div key={user.id} className="user-card">
                  <div className="user-card-header">
                    <div className="user-card-info">
                      <div className="user-avatar">
                        <span>
                          {(user.firstName?.charAt(0) || '').toUpperCase()}
                          {(user.lastName?.charAt(0) || '').toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="user-card-name">
                          {user.firstName || ''} {user.lastName || ''}
                        </h3>
                        <p className="user-card-id">{user.uniqueId || 'N/A'}</p>
                      </div>
                    </div>
                    <span className={`badge ${user.status ? 'badge-active' : 'badge-inactive'}`}>
                      {user.status ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  <div className="user-card-details">
                    <div className="user-card-row">
                      <span className="label">Phone:</span>
                      <span className="value">{user.phone || 'N/A'}</span>
                    </div>
                    <div className="user-card-row">
                      <span className="label">Email:</span>
                      <span className="value">{user.email || 'N/A'}</span>
                    </div>
                    <div className="user-card-row">
                      <span className="label">Subscription:</span>
                      <span className={`badge ${user.subscriptionType ? 'badge-success' : 'badge-gray'}`}>
                        {user.subscriptionType || 'None'}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleViewProfile(user.id)}
                    className="view-profile-btn-mobile"
                  >
                    <AiOutlineEye />
                    View Profile
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination-container">
            <div className="pagination-info">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalUsers)} of {totalUsers} entries
            </div>
            
            <div className="pagination-controls">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="pagination-btn"
                title="First page"
              >
                <MdKeyboardDoubleArrowLeft />
              </button>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
                title="Previous page"
              >
                <MdChevronLeft />
              </button>
              
              <span className="pagination-page">
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn"
                title="Next page"
              >
                <MdChevronRight />
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="pagination-btn"
                title="Last page"
              >
                <MdKeyboardDoubleArrowRight />
              </button>
            </div>

            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="items-per-page-select"
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