import React from 'react';
import { getPOSColor } from '../utils/helpers';

const WordFamilyCard = ({ family, collapsed, onToggleCollapse, mastery }) => {
  if (!family) return null;

  const getMasteryStars = (count) => {
    if (count === 0) return '☆☆☆';
    if (count === 1) return '★☆☆';
    if (count === 2) return '★★☆';
    return '★★★';
  };

  return (
    <div className="word-family-card">
      <div className="card-header">
        <div className="card-title-section">
          <h2 className="family-base-word">{family.baseWord}</h2>
          <div className="family-meta">
            <span className={`level-tag ${family.level.toLowerCase()}`}>
              {family.level}
            </span>
            <span className="category-tag">{family.category}</span>
            <span className="mastery-stars" title={`Practiced ${mastery} time(s)`}>
              {getMasteryStars(mastery)}
            </span>
          </div>
        </div>
        <button
          className="collapse-button"
          onClick={onToggleCollapse}
          aria-label={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? '▼' : '▲'}
        </button>
      </div>

      {!collapsed && (
        <div className="card-content">
          <div className="word-forms-grid">
            {family.forms.map((form, index) => (
              <div
                key={index}
                className={`word-form ${getPOSColor(form.pos)}`}
              >
                <div className="word-form-header">
                  <span className="word-text">{form.word}</span>
                  <span className="pos-tag">{form.pos}</span>
                </div>
                <div className="word-definition">{form.definition}</div>
                <div className="word-example">
                  <em>"{form.example}"</em>
                </div>
              </div>
            ))}
          </div>

          <div className="pos-legend">
            <div className="legend-title">Color Legend:</div>
            <div className="legend-items">
              <span className="legend-item blue">Verb</span>
              <span className="legend-item green">Noun</span>
              <span className="legend-item orange">Adjective</span>
              <span className="legend-item purple">Adverb</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WordFamilyCard;
