import React, { useState } from 'react';
import { formatDate, exportSentencesJSON, exportSentencesText, downloadFile } from '../utils/helpers';

const ReviewMode = ({ sentences, onDelete, onEdit, families }) => {
  const [filterFamily, setFilterFamily] = useState('All');
  const [sortBy, setSortBy] = useState('date');

  // Get unique families from saved sentences
  const uniqueFamilies = ['All', ...new Set(sentences.map(s => s.familyName))];

  // Filter sentences
  let filteredSentences = sentences.filter(sentence => 
    filterFamily === 'All' || sentence.familyName === filterFamily
  );

  // Sort sentences
  filteredSentences = [...filteredSentences].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'score') {
      return b.score - a.score;
    } else if (sortBy === 'family') {
      return a.familyName.localeCompare(b.familyName);
    }
    return 0;
  });

  const handleExportJSON = () => {
    const json = exportSentencesJSON(sentences);
    downloadFile(json, 'word-family-sentences.json', 'application/json');
  };

  const handleExportText = () => {
    const text = exportSentencesText(sentences);
    downloadFile(text, 'word-family-sentences.txt', 'text/plain');
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this sentence?')) {
      onDelete(id);
    }
  };

  const getScoreClass = (score) => {
    if (score >= 80) return 'score-high';
    if (score >= 60) return 'score-medium';
    return 'score-low';
  };

  return (
    <div className="review-mode">
      <div className="review-header">
        <div>
          <h2>💾 My Saved Sentences</h2>
          <p>Review and improve your practice sentences</p>
        </div>
        <div className="export-buttons">
          <button className="btn btn-secondary btn-sm" onClick={handleExportJSON}>
            📥 Export JSON
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleExportText}>
            📥 Export Text
          </button>
        </div>
      </div>

      {sentences.length === 0 ? (
        <div className="no-sentences">
          <div className="no-sentences-icon">📝</div>
          <h3>No saved sentences yet</h3>
          <p>Practice word families and save your best sentences to see them here!</p>
        </div>
      ) : (
        <>
          {/* Filters and Sort */}
          <div className="review-controls">
            <div className="filter-group">
              <label>Filter by Family:</label>
              <select
                value={filterFamily}
                onChange={(e) => setFilterFamily(e.target.value)}
                className="filter-select"
              >
                {uniqueFamilies.map(family => (
                  <option key={family} value={family}>{family}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="date">Date (Newest First)</option>
                <option value="score">Score (Highest First)</option>
                <option value="family">Word Family (A-Z)</option>
              </select>
            </div>

            <div className="results-count">
              {filteredSentences.length} sentence{filteredSentences.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Sentences List */}
          <div className="sentences-list">
            {filteredSentences.map(sentence => (
              <div key={sentence.id} className="sentence-card">
                <div className="sentence-card-header">
                  <div className="sentence-meta">
                    <span className={`level-tag ${sentence.familyLevel ? sentence.familyLevel.toLowerCase() : ''}`}>
                      {sentence.familyName}
                    </span>
                    <span className="sentence-date">{formatDate(sentence.date)}</span>
                  </div>
                  <div className={`sentence-score ${getScoreClass(sentence.score)}`}>
                    {sentence.score}/100
                  </div>
                </div>

                <div className="sentence-text">
                  "{sentence.text}"
                </div>

                <div className="sentence-stats">
                  <span className="stat">
                    <strong>{sentence.wordsUsed}</strong> word form{sentence.wordsUsed !== 1 ? 's' : ''} used
                  </span>
                  {sentence.familyCategory && (
                    <span className="category-badge">{sentence.familyCategory}</span>
                  )}
                </div>

                <div className="sentence-actions">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => onEdit(sentence.id)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteClick(sentence.id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewMode;
