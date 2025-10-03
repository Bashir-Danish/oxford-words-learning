import { useState, useEffect } from 'react';
import { wordFamilies, getRandomWordFamily } from './data/wordFamilies';
import {
  loadFromLocalStorage,
  saveToLocalStorage,
  initializeProgress,
  updateStreak,
  calculateUserLevel,
  incrementFamilyMastery,
  saveSentence as saveSentenceToProgress,
  deleteSentence as deleteSentenceFromProgress,
  updateSentence as updateSentenceInProgress
} from './utils/helpers';

// Import components
import Header from './components/Header';
import WordFamilyCard from './components/WordFamilyCard';
import SentenceInput from './components/SentenceInput';
import FeedbackPanel from './components/FeedbackPanel';
import ExampleSentences from './components/ExampleSentences';
import BrowseMode from './components/BrowseMode';
import ReviewMode from './components/ReviewMode';
import ProgressDashboard from './components/ProgressDashboard';
import DataImport from './components/DataImport';

import './App.css';

function App() {
  // State for current mode
  const [mode, setMode] = useState('daily'); // 'daily', 'browse', 'review', 'progress'
  
  // State for all families (sample + imported)
  const [allFamilies, setAllFamilies] = useState([]);
  
  // State for current word family
  const [currentFamily, setCurrentFamily] = useState(null);
  
  // State for user input
  const [sentence, setSentence] = useState('');
  
  // State for feedback
  const [feedback, setFeedback] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  // State for UI flags
  const [showExamples, setShowExamples] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [cardCollapsed, setCardCollapsed] = useState(false);
  
  // State for user progress
  const [progress, setProgress] = useState(null);
  
  // State for celebration animation
  const [showCelebration, setShowCelebration] = useState(false);

  // Convert imported Oxford units to word family format
  const convertOxfordUnitsToFamilies = (oxfordUnits) => {
    return oxfordUnits.map(unit => {
      // Create forms from vocabulary
      const forms = unit.vocabulary.map(vocab => ({
        word: vocab.word,
        pos: vocab.pos,
        definition: vocab.definition,
        example: vocab.example
      }));

      // Create base word from first vocabulary item or unit title
      const baseWord = unit.vocabulary.length > 0 ? unit.vocabulary[0].word : unit.title;

      return {
        id: `oxford-${unit.unitNumber}`,
        baseWord: baseWord,
        level: 'Elementary',
        category: 'Oxford Unit ' + unit.unitNumber,
        forms: forms,
        exampleSentences: [],
        hints: [`Practice vocabulary from Unit ${unit.unitNumber}: ${unit.title}`],
        unitNumber: unit.unitNumber,
        unitTitle: unit.title,
        isOxfordUnit: true
      };
    });
  };

  // Load and merge all families (sample + imported)
  const loadAllFamilies = () => {
    // Get imported Oxford units from localStorage
    const oxfordUnits = JSON.parse(localStorage.getItem('oxfordUnits') || '[]');
    const convertedOxfordFamilies = convertOxfordUnitsToFamilies(oxfordUnits);
    
    // Merge sample families with imported Oxford units
    const merged = [...wordFamilies, ...convertedOxfordFamilies];
    
    return merged;
  };

  // Initialize app - load progress and set first word family
  useEffect(() => {
    // Load all families
    const families = loadAllFamilies();
    setAllFamilies(families);

    // Load or initialize progress
    let userProgress = loadFromLocalStorage('wordFamilyProgress');
    
    if (!userProgress) {
      userProgress = initializeProgress();
    }
    
    // Update streak
    userProgress = updateStreak(userProgress);
    userProgress.currentLevel = calculateUserLevel(userProgress);
    
    setProgress(userProgress);
    saveToLocalStorage('wordFamilyProgress', userProgress);
    
    // Load today's word family or random one
    if (families.length > 0) {
      const lastFamilyId = loadFromLocalStorage('lastFamilyId');
      let family;
      
      if (lastFamilyId) {
        family = families.find(f => f.id === lastFamilyId) || families[0];
      } else {
        family = families[Math.floor(Math.random() * families.length)];
      }
      
      setCurrentFamily(family);
    }
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    if (progress) {
      saveToLocalStorage('wordFamilyProgress', progress);
    }
  }, [progress]);

  // Handler for checking sentence
  const handleCheckSentence = (validationResult) => {
    setFeedback(validationResult);
    setShowFeedback(true);
    
    // Show celebration for good scores
    if (validationResult.score >= 70) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
    }
    
    // Update progress
    if (validationResult.isValid && currentFamily) {
      const newProgress = { ...progress };
      incrementFamilyMastery(newProgress, currentFamily.id);
      
      // Increment practiced count if first time
      if (!newProgress.familyMastery[currentFamily.id] || newProgress.familyMastery[currentFamily.id] === 1) {
        newProgress.totalFamiliesPracticed += 1;
      }
      
      setProgress(newProgress);
    }
  };

  // Handler for saving sentence
  const handleSaveSentence = () => {
    if (!feedback || !feedback.isValid || !currentFamily) {
      alert('Please check your sentence first before saving!');
      return;
    }
    
    const sentenceData = {
      text: sentence,
      familyId: currentFamily.id,
      familyName: currentFamily.baseWord,
      familyLevel: currentFamily.level,
      familyCategory: currentFamily.category,
      score: feedback.score,
      wordsUsed: feedback.wordsUsed,
      wordDetails: feedback.wordDetails
    };
    
    const newProgress = { ...progress };
    saveSentenceToProgress(newProgress, sentenceData);
    setProgress(newProgress);
    
    alert('Sentence saved successfully! 🎉');
  };

  // Handler for next word family
  const handleNextFamily = () => {
    if (allFamilies.length === 0) return;
    
    let newFamily;
    
    // Get a different family from all available families
    do {
      newFamily = allFamilies[Math.floor(Math.random() * allFamilies.length)];
    } while (newFamily.id === currentFamily.id && allFamilies.length > 1);
    
    setCurrentFamily(newFamily);
    saveToLocalStorage('lastFamilyId', newFamily.id);
    
    // Reset state
    setSentence('');
    setFeedback(null);
    setShowFeedback(false);
    setShowExamples(false);
    setShowHints(false);
  };

  // Handler for selecting a family from browse mode
  const handleSelectFamily = (family) => {
    setCurrentFamily(family);
    saveToLocalStorage('lastFamilyId', family.id);
    setMode('daily');
    setSentence('');
    setFeedback(null);
    setShowFeedback(false);
    setShowExamples(false);
    setShowHints(false);
  };

  // Handler for deleting a saved sentence
  const handleDeleteSentence = (sentenceId) => {
    const newProgress = { ...progress };
    deleteSentenceFromProgress(newProgress, sentenceId);
    setProgress(newProgress);
  };

  // Handler for editing a saved sentence
  const handleEditSentence = (sentenceId) => {
    const sentenceData = progress.savedSentences.find(s => s.id === sentenceId);
    if (sentenceData) {
      const family = allFamilies.find(f => f.id === sentenceData.familyId);
      if (family) {
        setCurrentFamily(family);
        setSentence(sentenceData.text);
        setMode('daily');
        setFeedback(null);
        setShowFeedback(false);
      }
    }
  };

  // Handler to refresh families after import
  const handleDataImported = () => {
    const families = loadAllFamilies();
    setAllFamilies(families);
    
    // If no current family, set the first one
    if (!currentFamily && families.length > 0) {
      setCurrentFamily(families[0]);
    }
  };

  // Show loading state
  if (!progress || !currentFamily) {
    return (
      <div className="app loading">
        <div className="loading-spinner">
          <h2>Loading Word Family Explorer...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={`app ${progress.settings.darkMode ? 'dark-mode' : ''}`}>
      {/* Header */}
      <Header
        streak={progress.streak}
        level={progress.currentLevel}
        totalPracticed={progress.totalFamiliesPracticed}
        totalFamilies={allFamilies.length}
      />

      {/* Mode Tabs */}
      <div className="mode-tabs">
        <button
          className={`mode-tab ${mode === 'daily' ? 'active' : ''}`}
          onClick={() => setMode('daily')}
        >
          <span className="tab-icon">📝</span>
          Daily Challenge
        </button>
        <button
          className={`mode-tab ${mode === 'browse' ? 'active' : ''}`}
          onClick={() => setMode('browse')}
        >
          <span className="tab-icon">📚</span>
          Browse
        </button>
        <button
          className={`mode-tab ${mode === 'review' ? 'active' : ''}`}
          onClick={() => setMode('review')}
        >
          <span className="tab-icon">💾</span>
          Review ({progress.savedSentences.length})
        </button>
        <button
          className={`mode-tab ${mode === 'progress' ? 'active' : ''}`}
          onClick={() => setMode('progress')}
        >
          <span className="tab-icon">📊</span>
          Progress
        </button>
        <button
          className={`mode-tab ${mode === 'import' ? 'active' : ''}`}
          onClick={() => setMode('import')}
        >
          <span className="tab-icon">📥</span>
          Import Data
        </button>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {mode === 'daily' && (
          <div className="daily-mode">
            {/* Word Family Card */}
            <WordFamilyCard
              family={currentFamily}
              collapsed={cardCollapsed}
              onToggleCollapse={() => setCardCollapsed(!cardCollapsed)}
              mastery={progress.familyMastery[currentFamily.id] || 0}
            />

            {/* Sentence Input Area */}
            <SentenceInput
              sentence={sentence}
              onSentenceChange={setSentence}
              family={currentFamily}
              onCheck={handleCheckSentence}
            />

            {/* Action Buttons */}
            <div className="action-buttons">
              <button
                className="btn btn-secondary"
                onClick={() => setShowHints(!showHints)}
              >
                {showHints ? '🙈 Hide Hints' : '💡 Need Help?'}
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowExamples(!showExamples)}
              >
                {showExamples ? '📖 Hide Examples' : '📖 Show Examples'}
              </button>
              {feedback && feedback.isValid && (
                <button
                  className="btn btn-success"
                  onClick={handleSaveSentence}
                >
                  💾 Save Sentence
                </button>
              )}
              <button
                className="btn btn-primary"
                onClick={handleNextFamily}
              >
                ⏭️ Next Word Family
              </button>
            </div>

            {/* Hints Section */}
            {showHints && currentFamily.hints && (
              <div className="hints-section">
                <h3>💡 Helpful Hints:</h3>
                <ul>
                  {currentFamily.hints.map((hint, index) => (
                    <li key={index}>{hint}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Feedback Panel */}
            {showFeedback && feedback && (
              <FeedbackPanel
                feedback={feedback}
                onClose={() => setShowFeedback(false)}
              />
            )}

            {/* Example Sentences */}
            {showExamples && (
              <ExampleSentences
                family={currentFamily}
                onClose={() => setShowExamples(false)}
              />
            )}

            {/* Celebration Animation */}
            {showCelebration && (
              <div className="celebration">
                <div className="celebration-content">
                  🎉 Excellent! 🎉
                </div>
              </div>
            )}
          </div>
        )}

        {mode === 'browse' && (
          <BrowseMode
            families={allFamilies}
            progress={progress}
            onSelectFamily={handleSelectFamily}
          />
        )}

        {mode === 'review' && (
          <ReviewMode
            sentences={progress.savedSentences}
            onDelete={handleDeleteSentence}
            onEdit={handleEditSentence}
            families={allFamilies}
          />
        )}

        {mode === 'progress' && (
          <ProgressDashboard
            progress={progress}
            families={allFamilies}
          />
        )}

        {mode === 'import' && (
          <DataImport onDataImported={handleDataImported} />
        )}
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <p>Word Family Explorer - Oxford Word Skills</p>
        <p className="footer-note">Practice daily to improve your vocabulary! 📚</p>
      </footer>
    </div>
  );
}

export default App;
