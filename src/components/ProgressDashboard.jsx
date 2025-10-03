import React from 'react';
import { getFamilyMastery } from '../utils/helpers';

const ProgressDashboard = ({ progress, families }) => {
  const getMasteryLevels = () => {
    const levels = { notPracticed: 0, beginner: 0, intermediate: 0, mastered: 0 };
    
    families.forEach(family => {
      const mastery = getFamilyMastery(progress, family.id);
      if (mastery === 0) levels.notPracticed++;
      else if (mastery === 1) levels.beginner++;
      else if (mastery === 2) levels.intermediate++;
      else levels.mastered++;
    });
    
    return levels;
  };

  const masteryLevels = getMasteryLevels();

  const getFamiliesByLevel = (level) => {
    return families.filter(f => f.level === level);
  };

  const getPracticedByLevel = (level) => {
    return getFamiliesByLevel(level).filter(f => 
      getFamilyMastery(progress, f.id) > 0
    ).length;
  };

  const getLevelProgress = (level) => {
    const total = getFamiliesByLevel(level).length;
    const practiced = getPracticedByLevel(level);
    return { practiced, total, percentage: total > 0 ? (practiced / total) * 100 : 0 };
  };

  const basicProgress = getLevelProgress('Basic');
  const intermediateProgress = getLevelProgress('Intermediate');
  const advancedProgress = getLevelProgress('Advanced');

  return (
    <div className="progress-dashboard">
      <div className="dashboard-header">
        <h2>📊 Your Progress</h2>
        <p>Track your learning journey and celebrate your achievements!</p>
      </div>

      {/* Overview Stats */}
      <div className="stats-grid">
        <div className="stat-card streak">
          <div className="stat-icon-large">🔥</div>
          <div className="stat-number-large">{progress.streak}</div>
          <div className="stat-label-large">Day Streak</div>
          <div className="stat-description">Keep it going!</div>
        </div>

        <div className="stat-card families">
          <div className="stat-icon-large">📚</div>
          <div className="stat-number-large">{progress.totalFamiliesPracticed}</div>
          <div className="stat-label-large">Families Practiced</div>
          <div className="stat-description">Out of {families.length} total</div>
        </div>

        <div className="stat-card sentences">
          <div className="stat-icon-large">📝</div>
          <div className="stat-number-large">{progress.totalSentencesCreated}</div>
          <div className="stat-label-large">Sentences Created</div>
          <div className="stat-description">Keep writing!</div>
        </div>

        <div className="stat-card level">
          <div className="stat-icon-large">⭐</div>
          <div className="stat-number-large">{progress.currentLevel}</div>
          <div className="stat-label-large">Current Level</div>
          <div className="stat-description">
            {progress.currentLevel === 'Basic' && 'Practice 10+ families to reach Intermediate'}
            {progress.currentLevel === 'Intermediate' && 'Practice 30+ families to reach Advanced'}
            {progress.currentLevel === 'Advanced' && 'You\'ve mastered the system!'}
          </div>
        </div>
      </div>

      {/* Mastery Distribution */}
      <div className="dashboard-section">
        <h3>🎯 Mastery Distribution</h3>
        <div className="mastery-chart">
          <div className="mastery-bar-container">
            <div className="mastery-bars">
              <div 
                className="mastery-bar notpracticed"
                style={{ width: `${(masteryLevels.notPracticed / families.length) * 100}%` }}
                title={`${masteryLevels.notPracticed} not practiced`}
              >
                {masteryLevels.notPracticed > 0 && masteryLevels.notPracticed}
              </div>
              <div 
                className="mastery-bar beginner"
                style={{ width: `${(masteryLevels.beginner / families.length) * 100}%` }}
                title={`${masteryLevels.beginner} beginner`}
              >
                {masteryLevels.beginner > 0 && masteryLevels.beginner}
              </div>
              <div 
                className="mastery-bar intermediate"
                style={{ width: `${(masteryLevels.intermediate / families.length) * 100}%` }}
                title={`${masteryLevels.intermediate} intermediate`}
              >
                {masteryLevels.intermediate > 0 && masteryLevels.intermediate}
              </div>
              <div 
                className="mastery-bar mastered"
                style={{ width: `${(masteryLevels.mastered / families.length) * 100}%` }}
                title={`${masteryLevels.mastered} mastered`}
              >
                {masteryLevels.mastered > 0 && masteryLevels.mastered}
              </div>
            </div>
          </div>

          <div className="mastery-legend">
            <div className="legend-item">
              <span className="legend-color notpracticed"></span>
              <span>Not Practiced ({masteryLevels.notPracticed})</span>
            </div>
            <div className="legend-item">
              <span className="legend-color beginner"></span>
              <span>★ Beginner ({masteryLevels.beginner})</span>
            </div>
            <div className="legend-item">
              <span className="legend-color intermediate"></span>
              <span>★★ Intermediate ({masteryLevels.intermediate})</span>
            </div>
            <div className="legend-item">
              <span className="legend-color mastered"></span>
              <span>★★★ Mastered ({masteryLevels.mastered})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="dashboard-section">
        <h3>📈 Progress by Level</h3>
        
        <div className="level-progress-container">
          <div className="level-progress-item">
            <div className="level-progress-header">
              <span className="level-name basic">Basic</span>
              <span className="level-count">
                {basicProgress.practiced} / {basicProgress.total}
              </span>
            </div>
            <div className="progress-bar-track">
              <div 
                className="progress-bar-fill basic"
                style={{ width: `${basicProgress.percentage}%` }}
              ></div>
            </div>
            <div className="level-progress-text">
              {Math.round(basicProgress.percentage)}% Complete
            </div>
          </div>

          <div className="level-progress-item">
            <div className="level-progress-header">
              <span className="level-name intermediate">Intermediate</span>
              <span className="level-count">
                {intermediateProgress.practiced} / {intermediateProgress.total}
              </span>
            </div>
            <div className="progress-bar-track">
              <div 
                className="progress-bar-fill intermediate"
                style={{ width: `${intermediateProgress.percentage}%` }}
              ></div>
            </div>
            <div className="level-progress-text">
              {Math.round(intermediateProgress.percentage)}% Complete
            </div>
          </div>

          <div className="level-progress-item">
            <div className="level-progress-header">
              <span className="level-name advanced">Advanced</span>
              <span className="level-count">
                {advancedProgress.practiced} / {advancedProgress.total}
              </span>
            </div>
            <div className="progress-bar-track">
              <div 
                className="progress-bar-fill advanced"
                style={{ width: `${advancedProgress.percentage}%` }}
              ></div>
            </div>
            <div className="level-progress-text">
              {Math.round(advancedProgress.percentage)}% Complete
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="dashboard-section">
        <h3>🏆 Achievements</h3>
        <div className="achievements-grid">
          <div className={`achievement ${progress.streak >= 3 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">🔥</div>
            <div className="achievement-name">3 Day Streak</div>
            <div className="achievement-desc">
              {progress.streak >= 3 ? 'Unlocked!' : `${3 - progress.streak} more day(s)`}
            </div>
          </div>

          <div className={`achievement ${progress.totalFamiliesPracticed >= 10 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">📚</div>
            <div className="achievement-name">10 Families</div>
            <div className="achievement-desc">
              {progress.totalFamiliesPracticed >= 10 ? 'Unlocked!' : `${10 - progress.totalFamiliesPracticed} more`}
            </div>
          </div>

          <div className={`achievement ${progress.totalSentencesCreated >= 20 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">✍️</div>
            <div className="achievement-name">20 Sentences</div>
            <div className="achievement-desc">
              {progress.totalSentencesCreated >= 20 ? 'Unlocked!' : `${20 - progress.totalSentencesCreated} more`}
            </div>
          </div>

          <div className={`achievement ${progress.streak >= 7 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">💪</div>
            <div className="achievement-name">Week Warrior</div>
            <div className="achievement-desc">
              {progress.streak >= 7 ? 'Unlocked!' : `${7 - progress.streak} more day(s)`}
            </div>
          </div>

          <div className={`achievement ${masteryLevels.mastered >= 10 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">⭐</div>
            <div className="achievement-name">Master 10</div>
            <div className="achievement-desc">
              {masteryLevels.mastered >= 10 ? 'Unlocked!' : `${10 - masteryLevels.mastered} more`}
            </div>
          </div>

          <div className={`achievement ${progress.totalFamiliesPracticed >= 50 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">🎓</div>
            <div className="achievement-name">Graduate</div>
            <div className="achievement-desc">
              {progress.totalFamiliesPracticed >= 50 ? 'Unlocked!' : 'Practice all families'}
            </div>
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="motivational-box">
        <h4>💫 Keep Going!</h4>
        <p>
          {progress.totalFamiliesPracticed < 10 && "You're just getting started! Practice more families to level up."}
          {progress.totalFamiliesPracticed >= 10 && progress.totalFamiliesPracticed < 30 && "Great progress! You're building a strong vocabulary foundation."}
          {progress.totalFamiliesPracticed >= 30 && "Excellent work! You're mastering English word families like a pro!"}
        </p>
      </div>
    </div>
  );
};

export default ProgressDashboard;
