import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMail, FiCalendar, FiX, FiAlertCircle } from 'react-icons/fi';
import { getAllSupportQueries } from '../../../services/support/supportService';
import { removeToken } from '../../../utils/token';
import Loader from '../../../components/Loader/Loader';
import './Support.css';

const Support = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSupport, setSelectedSupport] = useState(null);
  const [supports, setSupports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch support queries on component mount
  useEffect(() => {
    fetchSupportQueries();
  }, []);

  const fetchSupportQueries = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await getAllSupportQueries();

      if (response.success && response.data) {
        // Sort by created_at in descending order (most recent first)
        const sortedData = response.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        setSupports(sortedData);
      } else {
        setError('Failed to load support queries');
      }
    } catch (err) {
      console.error('Error fetching support queries:', err);
      setError(err.message || 'Failed to load support queries');

      // If unauthorized, redirect to login
      if (err.message.includes('Unauthorized') || err.message.includes('token')) {
        removeToken();
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSupports = supports.filter(support =>
    support.sender_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (support.email && support.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    support.query.toLowerCase().includes(searchTerm.toLowerCase())
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

        {/* Error Message */}
        {error && (
          <div className="support__error-card">
            <FiAlertCircle className="support__error-icon" />
            <div>
              <p className="support__error-title">Error Loading Support Queries</p>
              <p className="support__error-message">{error}</p>
              <button
                className="support__error-retry"
                onClick={fetchSupportQueries}
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && <Loader />}

        {/* Results Grid */}
        {!isLoading && !error && (
          <div className="support__results-grid">
            {filteredSupports.length === 0 ? (
              <div className="support__no-results">
                <div className="support__no-results-icon">📭</div>
                <p className="support__no-results-text">
                  {searchTerm ? 'No support queries match your search' : 'No support queries found'}
                </p>
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
        )}

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