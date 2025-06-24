import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    difficulty: 'all',
    budget: 'all'
  });

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm, filters);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const applyFilters = () => {
    onSearch(searchTerm, filters);
    setShowFilters(false);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-bar">
        <div className="search-input">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input-field"
          />
          <button 
            type="button" 
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </button>
          <button type="submit" className="search-btn">Search</button>
        </div>
      </form>

      {showFilters && (
        <div className="filter-panel">
          <div className="filter-group">
            <label>Difficulty:</label>
            <select 
              name="difficulty" 
              value={filters.difficulty}
              onChange={handleFilterChange}
            >
              <option value="all">All Levels</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Budget:</label>
            <select 
              name="budget" 
              value={filters.budget}
              onChange={handleFilterChange}
            >
              <option value="all">Any Budget</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <button 
            className="apply-btn"
            onClick={applyFilters}
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;