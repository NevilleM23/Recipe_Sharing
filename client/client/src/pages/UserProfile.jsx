import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './ProfilePage.css';

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('info');
  
  if (!currentUser) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-placeholder">
            {currentUser.name.charAt(0)}
          </div>
        </div>
        <div className="profile-info">
          <h1>{currentUser.name}</h1>
          <p className="profile-email">{currentUser.email}</p>
          <div className="profile-meta">
            <div className="meta-item">
              <span className="meta-value">Member since</span>
              <span>{new Date(currentUser.joined).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          Account Info
        </button>
        <button 
          className={`tab-btn ${activeTab === 'password' ? 'active' : ''}`}
          onClick={() => setActiveTab('password')}
        >
          Change Password
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'info' && (
          <div className="info-section">
            <form className="profile-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  defaultValue={currentUser.name}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  defaultValue={currentUser.email}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  defaultValue={currentUser.phone || ''}
                />
              </div>
              <button type="submit" className="save-btn">
                Save Changes
              </button>
            </form>
          </div>
        )}
        
        {activeTab === 'password' && (
          <div className="password-section">
            <form className="profile-form">
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                />
              </div>
              <button type="submit" className="save-btn">
                Change Password
              </button>
            </form>
          </div>
        )}
      </div>
      
      <div className="logout-section">
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;