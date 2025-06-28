import React from "react";
import { Link } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext"; 
import './Header.css'

function Header() {
    const { currentUser, logout } = useAuth(); 

  const handleLogout = () => {
    logout();
  };
  return (
    <header className="app-header">
      <div className="header-container">  
        <nav className="main-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/map">Market Map</Link></li>
            <li><Link to="/profile">My Profile</Link></li>
          </ul>
        </nav>

        <div className="user-actions">
          {currentUser ? (
            <div className="user-info">
              <span>Hi, {currentUser.name}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="login-btn">Login</Link>
          )}
        </div> 

        
      </div>
    </header>
  );
} 

export default Header