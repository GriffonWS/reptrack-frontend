import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../../../services/users/userService';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getAllUsers();
        setUsers(response.data || []);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        setError(err.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.firstName?.toLowerCase().includes(searchLower) ||
      user.lastName?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower) ||
      user.phone?.toLowerCase().includes(searchLower) ||
      user.uniqueId?.toLowerCase().includes(searchLower)
    );
  });

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  // Handle sort
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Loading state
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px',
        fontSize: '18px'
      }}>
        <p>Loading users...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#ffebee', 
        color: '#c62828',
        borderRadius: '8px',
        margin: '20px'
      }}>
        <h3>Error Loading Users</h3>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            backgroundColor: '#c62828',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ marginBottom: '15px' }}>All Users ({sortedUsers.length})</h2>
        
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            padding: '10px',
            width: '300px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        />
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th onClick={() => handleSort('id')} style={thStyle}>
                ID {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? '🔼' : '🔽')}
              </th>
              <th onClick={() => handleSort('firstName')} style={thStyle}>
                Name {sortConfig.key === 'firstName' && (sortConfig.direction === 'asc' ? '🔼' : '🔽')}
              </th>
              <th onClick={() => handleSort('email')} style={thStyle}>
                Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '🔼' : '🔽')}
              </th>
              <th onClick={() => handleSort('phone')} style={thStyle}>
                Phone {sortConfig.key === 'phone' && (sortConfig.direction === 'asc' ? '🔼' : '🔽')}
              </th>
              <th style={thStyle}>Unique ID</th>
              <th style={thStyle}>Subscription</th>
              <th style={thStyle}>Gender</th>
              <th onClick={() => handleSort('dateOfJoining')} style={thStyle}>
                Joined {sortConfig.key === 'dateOfJoining' && (sortConfig.direction === 'asc' ? '🔼' : '🔽')}
              </th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Active</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan="10" style={{ padding: '20px', textAlign: 'center' }}>
                  No users found
                </td>
              </tr>
            ) : (
              currentUsers.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={tdStyle}>{user.id}</td>
                  <td style={tdStyle}>{`${user.firstName || ''} ${user.lastName || ''}`}</td>
                  <td style={tdStyle}>{user.email}</td>
                  <td style={tdStyle}>{user.phone}</td>
                  <td style={tdStyle}>{user.uniqueId}</td>
                  <td style={tdStyle}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      backgroundColor: user.subscriptionType ? '#e8f5e9' : '#fff3e0',
                      color: user.subscriptionType ? '#2e7d32' : '#f57c00',
                      fontSize: '12px'
                    }}>
                      {user.subscriptionType || 'None'}
                    </span>
                  </td>
                  <td style={tdStyle}>{user.gender || 'N/A'}</td>
                  <td style={tdStyle}>
                    {user.dateOfJoining ? new Date(user.dateOfJoining).toLocaleDateString() : 'N/A'}
                  </td>
                  <td style={tdStyle}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      backgroundColor: user.status === 'active' ? '#e8f5e9' : '#ffebee',
                      color: user.status === 'active' ? '#2e7d32' : '#c62828',
                      fontSize: '12px'
                    }}>
                      {user.status || 'inactive'}
                    </span>
                  </td>
                  <td style={tdStyle}>{user.active ? '✅' : '❌'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div>
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            style={buttonStyle}
          >
            {'<<'}
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={buttonStyle}
          >
            Previous
          </button>
          <span style={{ margin: '0 10px' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={buttonStyle}
          >
            Next
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            style={buttonStyle}
          >
            {'>>'}
          </button>
        </div>
        
        <div>
          <label style={{ marginRight: '10px' }}>
            Items per page:
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              style={{
                marginLeft: '5px',
                padding: '5px',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};

// Styles
const thStyle = {
  padding: '12px',
  textAlign: 'left',
  fontWeight: 'bold',
  cursor: 'pointer',
  userSelect: 'none',
  borderBottom: '2px solid #ddd'
};

const tdStyle = {
  padding: '12px',
  textAlign: 'left'
};

const buttonStyle = {
  padding: '6px 12px',
  margin: '0 2px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  backgroundColor: 'white',
  cursor: 'pointer',
  fontSize: '14px'
};

export default AllUsers;