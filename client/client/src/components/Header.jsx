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
        <div className="logo">
          <h1>Recipe Sharing</h1>
        </div>
        <nav className="main-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/recipes">Recipes</Link></li>
            <li><Link to="/map">Market Map</Link></li>

            {currentUser ? (
              <>
                <li><Link to="/profile">My Profile</Link></li>
                <li><Link to="/create-recipe">Create Recipe</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </nav>

        <div className="user-actions">
          {currentUser ? (
            <div className="user-info">
              <span>Hi, {currentUser.name}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
} 

export default Header