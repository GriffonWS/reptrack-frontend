import React, { useState } from 'react';
import { FiSearch, FiMail, FiCalendar, FiX } from 'react-icons/fi';
import './Support.css';

const Support = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSupport, setSelectedSupport] = useState(null);

  // Mock data
  const supports = [
    {
      id: 1,
      sender_id: 'USER001',
      email: 'user1@example.com',
      query: 'How do I reset my password?',
      created_at: '2024-10-10T10:30:00Z'
    },
    {
      id: 2,
      sender_id: 'USER002',
      email: 'user2@example.com',
      query: 'I cannot access my account',
      created_at: '2024-10-09T14:15:00Z'
    },
    {
      id: 3,
      sender_id: 'USER003',
      email: 'user3@example.com',
      query: 'How to update my profile information?',
      created_at: '2024-10-08T09:45:00Z'
    },
    {
      id: 4,
      sender_id: 'USER004',
      email: 'user4@example.com',
      query: 'Equipment booking issue',
      created_at: '2024-10-07T16:20:00Z'
    },
    {
      id: 5,
      sender_id: 'USER005',
      email: 'user5@example.com',
      query: 'Membership renewal problem',
      created_at: '2024-10-06T11:45:00Z'
    },
    {
      id: 6,
      sender_id: 'USER006',
      email: 'user6@example.com',
      query: 'Payment not processed',
      created_at: '2024-10-05T13:30:00Z'
    }
  ];

  const filteredSupports = supports.filter(support =>
    support.sender_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    support.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="support__container">
      <div className="support__wrapper">
        {/* Header */}
        <div className="support__header">
          <div>
            <h1 className="support__title">Support Queries</h1>
            <p className="support__subtitle">Manage and view all customer support requests</p>
          </div>
        </div>

        {/* Search Card */}
        <div className="support__search-card">
          <div className="support__search-wrapper">
            <FiSearch className="support__search-icon" />
            <input
              type="text"
              className="support__search-input"
              placeholder="Search by sender ID or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Results Grid */}
        <div className="support__results-grid">
          {filteredSupports.length === 0 ? (
            <div className="support__no-results">
              <div className="support__no-results-icon">📭</div>
              <p className="support__no-results-text">No support queries found</p>
            </div>
          ) : (
            filteredSupports.map((support) => (
              <div
                key={support.id}
                className="support__card"
                onClick={() => setSelectedSupport(support)}
              >
                <div className="support__card-header">
                  <span className="support__sender-badge">{support.sender_id}</span>
                </div>

                <div className="support__card-info">
                  <FiMail className="support__card-info-icon" />
                  <span className="support__card-info-text">{support.email}</span>
                </div>

                <div className="support__card-query">
                  {support.query}
                </div>

                <div className="support__card-footer">
                  <FiCalendar className="support__card-footer-icon" />
                  <span>{formatDate(support.created_at)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal for full view */}
        {selectedSupport && (
          <div 
            className="support__modal-overlay" 
            onClick={() => setSelectedSupport(null)}
          >
            <div 
              className="support__modal" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="support__modal-header">
                <h2 className="support__modal-title">Support Query Details</h2>
                <button
                  className="support__modal-close"
                  onClick={() => setSelectedSupport(null)}
                >
                  <FiX size={24} />
                </button>
              </div>
              <div className="support__modal-body">
                <div className="support__modal-section">
                  <div className="support__modal-label">Sender ID</div>
                  <div className="support__modal-value">{selectedSupport.sender_id}</div>
                </div>
                <div className="support__modal-section">
                  <div className="support__modal-label">Email Address</div>
                  <div className="support__modal-value">{selectedSupport.email}</div>
                </div>
                <div className="support__modal-section">
                  <div className="support__modal-label">Query</div>
                  <div className="support__modal-value">{selectedSupport.query}</div>
                </div>
                <div className="support__modal-section">
                  <div className="support__modal-label">Created At</div>
                  <div className="support__modal-value">
                    {formatDate(selectedSupport.created_at)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Support;