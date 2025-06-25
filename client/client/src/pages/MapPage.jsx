// src/pages/MapPage.js
import React from 'react';
import './MapPage.css';

const MapPage = () => {


  return (
    <div className="map-page">
      <div className="page-header">
        <h1>Local Markets & Grocers</h1>
        <p>Find fresh ingredients near you</p>
      </div>
      
      <div className="map-container">
        <div className="map-placeholder">
          <div className="map-mock">
            <div className="map-point" style={{ top: '30%', left: '40%' }}>📍</div>
            <div className="map-point" style={{ top: '45%', left: '60%' }}>📍</div>
            <div className="map-point" style={{ top: '65%', left: '35%' }}>📍</div>
            <div className="map-point" style={{ top: '70%', left: '75%' }}>📍</div>
          </div>
          <div className="map-overlay">
            <p>Interactive map showing local markets</p>
          </div>
        </div>
      </div>
      
      <div className="markets-list">
        <h2>Nearby Markets</h2>
        <div className="markets-grid">
          {markets.map(market => (
            <div key={market.id} className="market-card">
              <div className="market-header">
                <h3>{market.name}</h3>
                <div className="distance">{market.distance}</div>
              </div>
              <p className="market-address">{market.address}</p>
              <div className="market-hours">
                <span>Hours:</span> {market.hours}
              </div>
              <div className="market-products">
                <h4>Products Available:</h4>
                <div className="product-tags">
                  {market.products.map((product, index) => (
                    <span key={index} className="product-tag">{product}</span>
                  ))}
                </div>
              </div>
              <button className="directions-btn">Get Directions</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapPage;