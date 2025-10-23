import React, { useState, useEffect } from 'react';
import { AiOutlineEye, AiOutlineSearch } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdChevronLeft, MdChevronRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import './AllUsers.css';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../../../services/user/userService';
import Loader from '../../../components/Loader/Loader';

const AllUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0); // API uses 0-based pagination
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, itemsPerPage]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await getAllUsers(currentPage, itemsPerPage);

      if (response.success && response.data) {
        setUsers(response.data.content || []);
        setTotalUsers(response.data.totalElements || 0);
        setTotalPages(response.data.totalPages || 0);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Client-side filtering for search
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

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(0); // Reset to first page
  };

  if (isLoading) {
    return (
      <div className="users__container">
        <Loader />
      </div>
    );
  }

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

        {/* Error Message */}
        {error && (
          <div className="users__error" style={{
            padding: '12px 16px',
            marginBottom: '20px',
            backgroundColor: '#fff5f5',
            color: '#c53030',
            border: '1px solid #fc8181',
            borderRadius: '8px'
          }}>
            {error}
          </div>
        )}

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
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="users__no-data">
                      {searchTerm ? 'No members found matching your search' : 'No members found'}
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user, index) => (
                    <tr key={user.id}>
                      <td>{(currentPage * itemsPerPage) + index + 1}</td>
                      <td>
                        <div className="users__name-cell">
                          <div className="users__avatar">
                            <span>
                              {user.firstName?.charAt(0) || 'U'}
                              {user.lastName?.charAt(0) || 'U'}
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
                        <span className={`users__badge users__badge--${user.active ? 'active' : 'inactive'}`}>
                          {user.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <Link to={`/dashboard/user/${user.id}`} className="users__action-btn" style={{textDecoration:"none"}}>
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
            {filteredUsers.length === 0 ? (
              <div className="users__no-data-mobile">
                {searchTerm ? 'No members found matching your search' : 'No members found'}
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div key={user.id} className="users__card">
                  <div className="users__card-header">
                    <div className="users__card-info">
                      <div className="users__avatar">
                        <span>
                          {user.firstName?.charAt(0) || 'U'}
                          {user.lastName?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <div>
                        <h3 className="users__card-name">{user.firstName} {user.lastName}</h3>
                        <p className="users__card-id">{user.uniqueId}</p>
                      </div>
                    </div>
                    <span className={`users__badge users__badge--${user.active ? 'active' : 'inactive'}`}>
                      {user.active ? 'Active' : 'Inactive'}
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

                  <Link to={`/dashboard/user/${user.id}`} className="users__card-btn" style={{textDecoration:"none"}}>
                    <AiOutlineEye size={16} />
                    View Profile
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="users__pagination">
            <div className="users__pagination-info">
              Showing {(currentPage * itemsPerPage) + 1} to {Math.min((currentPage + 1) * itemsPerPage, totalUsers)} of {totalUsers} entries
            </div>

            <div className="users__pagination-controls">
              <button
                onClick={() => handlePageChange(0)}
                disabled={currentPage === 0}
                className="users__pagination-btn"
                title="First page"
              >
                <MdKeyboardDoubleArrowLeft />
              </button>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="users__pagination-btn"
                title="Previous page"
              >
                <MdChevronLeft />
              </button>

              <span className="users__pagination-page">
                Page {currentPage + 1} of {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className="users__pagination-btn"
                title="Next page"
              >
                <MdChevronRight />
              </button>
              <button
                onClick={() => handlePageChange(totalPages - 1)}
                disabled={currentPage === totalPages - 1}
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