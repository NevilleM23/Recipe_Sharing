import React, { useState, useEffect } from 'react';
import './MapPage.css';

const API_BASE = import.meta.env.VITE_API_URL || 'https://recipe-sharing-x9px.onrender.com/api';

const MapPage = () => {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [searchLocation, setSearchLocation] = useState('');

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        let url = `${API_BASE}/markets/`;
        if (searchLocation) {
          url += `?near=${encodeURIComponent(searchLocation)}`;
        }
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch markets');
        }
        
        const data = await response.json();
        setMarkets(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load markets: ' + err.message);
        setLoading(false);
      }
    };
    
    fetchMarkets();
  }, [searchLocation]);

  const handleSearch = (e) => {
    e.preventDefault();
  }

  if (loading) {
    return <div className="loading">Loading markets...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
      <div className="map-page">
      <div className="page-header">
        <h1>Find Local Markets</h1>
        <p>Discover fresh ingredients near you</p>
      </div>
      
      <div className="map-container">
        <div className="map-search">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Enter your location"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        
        <div className="map-content">
          <div className="map-visual">
            <div className="map-placeholder">
              <div className="map-grid">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="grid-line"></div>
                ))}
              </div>
              
              {markets.map((market, index) => (
                <div
                  key={market.id}
                  className={`map-marker ${selectedMarket?.id === market.id ? 'active' : ''}`}
                  style={{
                    left: `${10 + (index % 5) * 20}%`,
                    top: `${20 + Math.floor(index / 5) * 20}%`
                  }}
                  onClick={() => setSelectedMarket(market)}
                >
                  <div className="marker-pin"></div>
                  <div className="marker-label">{market.name}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="market-details">
            {selectedMarket ? (
              <div className="market-card">
                <div className="market-header">
                  <h2>{selectedMarket.name}</h2>
                  <div className="market-location">
                    <span>📍</span> {selectedMarket.location}
                  </div>
                </div>
                
                <div className="market-info">
                  <div className="info-item">
                    <span className="info-label">Contact:</span>
                    <span>{selectedMarket.contact || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Hours:</span>
                    <span>{selectedMarket.operating_hours || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Coordinates:</span>
                    <span>{selectedMarket.latitude}, {selectedMarket.longitude}</span>
                  </div>
                </div>
                
                <div className="market-actions">
                  <button className="directions-btn">Get Directions</button>
                </div>
                {selectedMarket.ingredient_prices && selectedMarket.ingredient_prices.length > 0 && (() => {
                  // Get only the latest price per ingredient
                  const latestPrices = {};
                  selectedMarket.ingredient_prices.forEach((price) => {
                    const key = price.ingredient_id;
                    if (!latestPrices[key] || new Date(price.date_recorded) > new Date(latestPrices[key].date_recorded)) {
                      latestPrices[key] = price;
                    }
                  });
                  const latestPriceList = Object.values(latestPrices);
                  return (
                    <div className="market-prices">
                      <h3>Ingredient Prices</h3>
                      <table className="ingredient-prices-table">
                        <thead>
                          <tr>
                            <th>Ingredient</th>
                            <th>Unit</th>
                            <th>Price</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {latestPriceList.map((price) => (
                            <tr key={price.id || `${price.ingredient_id}-${price.date_recorded}`}>
                              <td>{price.ingredient_name}</td>
                              <td>{price.unit || '-'}</td>
                              <td>${price.price.toFixed(2)}</td>
                              <td>{price.date_recorded ? new Date(price.date_recorded).toLocaleDateString() : '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className="market-placeholder">
                <p>Select a market on the map to see details</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="markets-list">
        <h2>All Markets</h2>
        <div className="markets-grid">
          {markets.map(market => (
            <div 
              key={market.id} 
              className={`market-card ${selectedMarket?.id === market.id ? 'selected' : ''}`}
              onClick={() => setSelectedMarket(market)}
            >
              <div className="market-header">
                <h3>{market.name}</h3>
                <div className="distance">📍</div>
              </div>
              <p className="market-address">{market.location}</p>
              <div className="market-hours">
                <span>Hours:</span> {market.operating_hours || 'N/A'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default MapPage;