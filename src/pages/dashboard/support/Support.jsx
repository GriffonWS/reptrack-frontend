import React, { useState, useEffect } from 'react'
import { FiSearch, FiMail, FiCalendar, FiAlertCircle, FiLoader } from 'react-icons/fi'
import { getAllSupports, getSupportBySenderId } from '../../../services/supportService.js'
import './Support.css'

const Support = () => {
  const [allSupports, setAllSupports] = useState([])
  const [filteredSupports, setFilteredSupports] = useState([])
  const [searchSenderId, setSearchSenderId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedSupport, setSelectedSupport] = useState(null)

  // Fetch all support queries on component mount
  useEffect(() => {
    fetchAllSupports()
  }, [])

  const fetchAllSupports = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getAllSupports()
      setAllSupports(data)
      setFilteredSupports(data)
    } catch (err) {
      console.error('Error fetching supports:', err)
      setError(err.message || 'Failed to fetch support queries')
      
      // Mock data for demonstration if API fails
      const mockData = [
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
        }
      ]
      setAllSupports(mockData)
      setFilteredSupports(mockData)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    
    if (!searchSenderId.trim()) {
      setFilteredSupports(allSupports)
      return
    }

    setLoading(true)
    setError('')
    try {
      const data = await getSupportBySenderId(searchSenderId)
      setFilteredSupports([data])
    } catch (err) {
      console.error('Error searching support:', err)
      setError(err.message || 'Support query not found')
      setFilteredSupports([])
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setSearchSenderId('')
    setFilteredSupports(allSupports)
    setSelectedSupport(null)
    setError('')
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="support__wrapper">
      <div className="support__container">
        <h1 className="support__title">Support Queries</h1>
        <p className="support__subtitle">Manage and view all customer support requests</p>

        {/* Search Card */}
        <div className="support__search-card">
          <div className="support__search-form">
            <div className="support__form-group" style={{ flex: 1 }}>
              <label className="support__form-label">Search by Sender ID</label>
              <input
                type="text"
                className="support__form-input"
                placeholder="Enter sender ID (e.g., USER001)"
                value={searchSenderId}
                onChange={(e) => setSearchSenderId(e.target.value)}
              />
            </div>
            <button 
              onClick={handleSearch} 
              className="support__search-btn"
              disabled={loading}
            >
              <FiSearch size={18} />
              Search
            </button>
            <button 
              onClick={handleReset} 
              className="support__reset-btn"
              disabled={loading}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="support__error">
            <FiAlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="support__loading">
            <FiLoader size={20} className="support__loading-icon" />
            Loading support queries...
          </div>
        )}

        {/* No Results */}
        {!loading && filteredSupports.length === 0 && (
          <div className="support__no-results">
            <div className="support__no-results-icon">📭</div>
            <p className="support__no-results-text">No support queries found</p>
          </div>
        )}

        {/* Results Grid */}
        {!loading && filteredSupports.length > 0 && (
          <div className="support__results-grid">
            {filteredSupports.map((support) => (
              <div
                key={support.id}
                className="support__card"
                onClick={() => setSelectedSupport(support)}
              >
                <div className="support__card-header">
                  <div className="support__sender-id">{support.sender_id}</div>
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
            ))}
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
                  ×
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
  )
}

export default Support