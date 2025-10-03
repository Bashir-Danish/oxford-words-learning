import React from 'react';

const Header = ({ streak, level, totalPracticed, totalFamilies }) => {
  const progressPercentage = (totalPracticed / totalFamilies) * 100;
  
  // Get level color
  const getLevelColor = (level) => {
    switch(level) {
      case 'Basic': return '#4CAF50';
      case 'Intermediate': return '#FF9800';
      case 'Advanced': return '#9C27B0';
      default: return '#666';
    }
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-title">
          <h1>📚 Word Family Explorer</h1>
          <p className="subtitle">Master English word families through practice</p>
        </div>
        
        <div className="header-stats">
          {/* Streak Counter */}
          <div className="stat-item streak">
            <div className="stat-icon">🔥</div>
            <div className="stat-content">
              <div className="stat-value">{streak}</div>
              <div className="stat-label">Day Streak</div>
            </div>
          </div>
          
          {/* Level Badge */}
          <div className="stat-item level">
            <div 
              className="level-badge" 
              style={{ backgroundColor: getLevelColor(level) }}
            >
              {level}
            </div>
            <div className="stat-label">Current Level</div>
          </div>
          
          {/* Families Practiced */}
          <div className="stat-item practiced">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-value">{totalPracticed}/{totalFamilies}</div>
              <div className="stat-label">Families Practiced</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill"
          style={{ width: `${progressPercentage}%` }}
        />
        <div className="progress-bar-text">
          {Math.round(progressPercentage)}% Complete
        </div>
      </div>
    </header>
  );
};

export default Header;
