import React from 'react';
import { getEncouragementMessage } from '../utils/helpers';

const FeedbackPanel = ({ feedback, onClose }) => {
  if (!feedback) return null;

  const encouragement = getEncouragementMessage(feedback.score, feedback.wordsUsed);
  
  const getScoreColor = (score) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FF9800';
    return '#F44336';
  };

  return (
    <div className="feedback-panel">
      <div className="feedback-header">
        <h3>📋 Feedback</h3>
        <button className="close-button" onClick={onClose}>×</button>
      </div>

      <div className="feedback-content">
        {/* Score Display */}
        <div className="score-display">
          <div 
            className="score-circle"
            style={{ 
              background: `conic-gradient(${getScoreColor(feedback.score)} ${feedback.score * 3.6}deg, #e0e0e0 0deg)` 
            }}
          >
            <div className="score-inner">
              <div className="score-value">{feedback.score}</div>
              <div className="score-label">/ 100</div>
            </div>
          </div>
          <div className="encouragement-message">
            {encouragement}
          </div>
        </div>

        {/* Word Usage Stats */}
        <div className="stats-section">
          <div className="stat-box">
            <div className="stat-number">{feedback.wordsUsed}</div>
            <div className="stat-text">Word Forms Used</div>
          </div>
        </div>

        {/* Errors */}
        {feedback.errors && feedback.errors.length > 0 && (
          <div className="feedback-section errors">
            <h4>❌ Errors to Fix:</h4>
            <ul>
              {feedback.errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Warnings */}
        {feedback.warnings && feedback.warnings.length > 0 && (
          <div className="feedback-section warnings">
            <h4>⚠️ Suggestions:</h4>
            <ul>
              {feedback.warnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Suggestions */}
        {feedback.suggestions && feedback.suggestions.length > 0 && (
          <div className="feedback-section suggestions">
            <h4>💡 Tips:</h4>
            <ul>
              {feedback.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Word Details */}
        {feedback.wordDetails && feedback.wordDetails.length > 0 && (
          <div className="feedback-section word-details">
            <h4>📝 Words You Used:</h4>
            <div className="word-detail-list">
              {feedback.wordDetails.map((detail, index) => (
                <div key={index} className="word-detail-item">
                  <span className="word-detail-word">{detail.word}</span>
                  <span className="word-detail-pos">({detail.pos})</span>
                  {detail.count > 1 && (
                    <span className="word-detail-count">× {detail.count}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPanel;
