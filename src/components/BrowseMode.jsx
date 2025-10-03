import React, { useState } from 'react';
import { getAllCategories, getAllLevels, getFamilyMastery } from '../utils/helpers';

const BrowseMode = ({ families, progress, onSelectFamily }) => {
  const [filterLevel, setFilterLevel] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const levels = ['All', ...getAllLevels()];
  const categories = ['All', ...getAllCategories()];

  // Filter families
  const filteredFamilies = families.filter(family => {
    const matchesLevel = filterLevel === 'All' || family.level === filterLevel;
    const matchesCategory = filterCategory === 'All' || family.category === filterCategory;
    const matchesSearch = searchTerm === '' || 
      family.baseWord.toLowerCase().includes(searchTerm.toLowerCase()) ||
      family.forms.some(form => form.word.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesLevel && matchesCategory && matchesSearch;
  });

  const getMasteryIcon = (familyId) => {
    const mastery = getFamilyMastery(progress, familyId);
    if (mastery === 0) return '☆☆☆';
    if (mastery === 1) return '★☆☆';
    if (mastery === 2) return '★★☆';
    return '★★★';
  };

  return (
    <div className="browse-mode">
      <div className="browse-header">
        <h2>📚 Browse Word Families</h2>
        <p>Explore and practice any word family from the collection</p>
      </div>

      {/* Filters */}
      <div className="browse-filters">
        <div className="filter-group">
          <label>Search:</label>
          <input
            type="text"
            className="search-input"
            placeholder="Search word families..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Level:</label>
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="filter-select"
          >
            {levels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Category:</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-count">
        Showing {filteredFamilies.length} of {families.length} word families
      </div>

      {/* Family List */}
      <div className="family-list">
        {filteredFamilies.map(family => (
          <div key={family.id} className="family-list-item">
            <div className="family-item-header">
              <h3 className="family-item-title">{family.baseWord}</h3>
              <div className="family-item-badges">
                <span className={`level-badge ${family.level.toLowerCase()}`}>
                  {family.level}
                </span>
                <span className="mastery-badge">
                  {getMasteryIcon(family.id)}
                </span>
              </div>
            </div>

            <div className="family-item-meta">
              <span className="category-badge">{family.category}</span>
              <span className="forms-count">{family.forms.length} forms</span>
            </div>

            <div className="family-item-forms">
              {family.forms.slice(0, 4).map((form, index) => (
                <span key={index} className="form-chip">{form.word}</span>
              ))}
              {family.forms.length > 4 && (
                <span className="form-chip more">+{family.forms.length - 4} more</span>
              )}
            </div>

            <button
              className="btn btn-primary btn-sm"
              onClick={() => onSelectFamily(family)}
            >
              Practice Now →
            </button>
          </div>
        ))}
      </div>

      {filteredFamilies.length === 0 && (
        <div className="no-results">
          <p>No word families found matching your filters.</p>
          <button 
            className="btn btn-secondary"
            onClick={() => {
              setFilterLevel('All');
              setFilterCategory('All');
              setSearchTerm('');
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default BrowseMode;
