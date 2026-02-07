/**
 * Branchy - React Component
 * Sub-domains mascot component for React applications
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Branchy.css';

/**
 * Main Branchy Component
 * 
 * @param {Object} props
 * @param {string} props.state - Current state (base|green|yellow|red|blue)
 * @param {number} props.size - Size in pixels
 * @param {boolean} props.animated - Enable animations
 * @param {string} props.label - Accessible label
 * @param {function} props.onClick - Click handler
 * @param {string} props.className - Additional CSS classes
 */
const Branchy = ({ 
  state = 'base', 
  size = 100, 
  animated = true,
  label = null,
  onClick = null,
  className = '',
  showTooltip = false,
  tooltipText = null
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentState, setCurrentState] = useState(state);
  
  // Update state with animation
  useEffect(() => {
    if (state !== currentState) {
      // Optional: Add transition delay
      const timer = setTimeout(() => {
        setCurrentState(state);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [state, currentState]);
  
  const stateLabels = {
    base: 'Ready',
    green: 'Active',
    yellow: 'Warning',
    red: 'Error',
    blue: 'Focused'
  };
  
  const stateDescriptions = {
    base: 'Subdomain is ready',
    green: 'Subdomain is active and healthy',
    yellow: 'Subdomain needs attention',
    red: 'Subdomain has an error',
    blue: 'Subdomain is in focus mode'
  };
  
  const accessibleLabel = label || `Branchy: ${stateLabels[currentState]}`;
  const tooltip = tooltipText || stateDescriptions[currentState];
  
  return (
    <div 
      className={`branchy-container ${animated ? 'animated' : ''} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      aria-label={accessibleLabel}
      tabIndex={onClick ? 0 : -1}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : null}
    >
      <img
        src={`/assets/mascot/branchy-${currentState}.svg`}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        className={`branchy-mascot state-${currentState}`}
        loading="lazy"
      />
      
      {showTooltip && isHovered && (
        <div className="branchy-tooltip" role="tooltip">
          {tooltip}
        </div>
      )}
    </div>
  );
};

Branchy.propTypes = {
  state: PropTypes.oneOf(['base', 'green', 'yellow', 'red', 'blue']),
  size: PropTypes.number,
  animated: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  showTooltip: PropTypes.bool,
  tooltipText: PropTypes.string
};

/**
 * Branchy Status Badge
 * Shows Branchy with a status label
 */
export const BranchyStatus = ({ status, size = 80, showLabel = true }) => {
  const statusMap = {
    'active': 'green',
    'pending': 'yellow',
    'error': 'red',
    'processing': 'blue',
    'inactive': 'base'
  };
  
  const state = statusMap[status] || 'base';
  
  return (
    <div className="branchy-status">
      <Branchy state={state} size={size} />
      {showLabel && (
        <span className={`status-label status-${status}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      )}
    </div>
  );
};

/**
 * Branchy Loader
 * Animated loading indicator
 */
export const BranchyLoader = ({ 
  message = "Loading...",
  size = 120
}) => {
  const [frame, setFrame] = useState(0);
  const states = ['base', 'green', 'blue', 'base'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % states.length);
    }, 500);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="branchy-loader" role="status" aria-live="polite">
      <Branchy state={states[frame]} size={size} animated={true} />
      <p className="loader-message">{message}</p>
    </div>
  );
};

/**
 * Branchy Card
 * Subdomain card with Branchy indicator
 */
export const BranchyCard = ({ 
  subdomain,
  onClick
}) => {
  const statusMap = {
    'active': 'green',
    'pending': 'yellow',
    'error': 'red',
    'maintenance': 'blue',
    'inactive': 'base'
  };
  
  const state = statusMap[subdomain.status] || 'base';
  
  return (
    <div 
      className="branchy-card"
      onClick={() => onClick && onClick(subdomain)}
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick ? 0 : -1}
    >
      <Branchy 
        state={state} 
        size={80}
        animated={true}
        showTooltip={true}
      />
      <div className="card-content">
        <h3 className="subdomain-name">{subdomain.name}</h3>
        <p className="subdomain-url">{subdomain.url}</p>
        <span className={`status-badge status-${subdomain.status}`}>
          {subdomain.status}
        </span>
      </div>
    </div>
  );
};

/**
 * Branchy Dashboard
 * Grid of subdomain cards
 */
export const BranchyDashboard = ({ 
  subdomains,
  onSubdomainClick,
  loading = false
}) => {
  if (loading) {
    return <BranchyLoader message="Loading subdomains..." />;
  }
  
  if (!subdomains || subdomains.length === 0) {
    return (
      <div className="branchy-empty-state">
        <Branchy state="base" size={150} />
        <h3>No subdomains yet</h3>
        <p>Create your first subdomain to get started!</p>
      </div>
    );
  }
  
  return (
    <div className="branchy-dashboard">
      <div className="dashboard-header">
        <h2>Your Subdomains</h2>
        <div className="dashboard-stats">
          {getStatusCounts(subdomains)}
        </div>
      </div>
      
      <div className="branchy-grid">
        {subdomains.map((subdomain) => (
          <BranchyCard
            key={subdomain.id}
            subdomain={subdomain}
            onClick={onSubdomainClick}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Helper: Get status counts
 */
const getStatusCounts = (subdomains) => {
  const counts = subdomains.reduce((acc, sub) => {
    acc[sub.status] = (acc[sub.status] || 0) + 1;
    return acc;
  }, {});
  
  return (
    <div className="status-counts">
      {counts.active && (
        <span className="count active">
          <Branchy state="green" size={20} /> {counts.active}
        </span>
      )}
      {counts.pending && (
        <span className="count pending">
          <Branchy state="yellow" size={20} /> {counts.pending}
        </span>
      )}
      {counts.error && (
        <span className="count error">
          <Branchy state="red" size={20} /> {counts.error}
        </span>
      )}
    </div>
  );
};

/**
 * Branchy Notification
 * Toast-style notification with Branchy
 */
export const BranchyNotification = ({
  type = 'info',
  message,
  onClose
}) => {
  const stateMap = {
    success: 'green',
    warning: 'yellow',
    error: 'red',
    info: 'blue'
  };
  
  return (
    <div className={`branchy-notification notification-${type}`}>
      <Branchy state={stateMap[type]} size={40} />
      <span className="notification-message">{message}</span>
      {onClose && (
        <button 
          className="notification-close"
          onClick={onClose}
          aria-label="Close notification"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Branchy;
