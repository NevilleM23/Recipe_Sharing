import React from "react";

function Header({ isLoggedIn, onLogin, onLogout, user }) {
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
      </div>
    </header>
  );
} 

export default Header