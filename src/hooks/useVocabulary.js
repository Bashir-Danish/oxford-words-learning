import { useState, useEffect, useCallback, useRef } from 'react';
import { learnedWordsAPI } from '../services/api';

/**
 * Custom hook to manage Oxford 3000 vocabulary data
 * Loads data from JSON file and provides state management
 * @param {string} userId - Optional user ID for user-specific storage
 */
export const useVocabulary = (userId = null) => {
  const [vocabularyData, setVocabularyData] = useState(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [filters, setFilters] = useState({
    level: 'all', // 'all', 'A1', 'A2', 'B1', 'B2'
    learned: 'all', // 'all', 'learned', 'notLearned'
    searchTerm: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Track if we've loaded from server
  const hasLoadedFromServer = useRef(false);

  // Load vocabulary data from JSON file and sync with server
  useEffect(() => {
    const loadVocabularyData = async () => {
      try {
        setLoading(true);
        
        // Try to load from the JSON file
        const response = await fetch('/OXFORD_3000_ENHANCED_TEMPLATE.json');
        
        if (!response.ok) {
          throw new Error('Failed to load vocabulary data');
        }
        
        const data = await response.json();
        
        // Try to load from server first (if user is logged in)
        if (userId && !hasLoadedFromServer.current) {
          try {
            const serverResponse = await learnedWordsAPI.getAllLearnedWords();
            if (serverResponse.success) {
              const learnedWordIds = serverResponse.data; // Array of IDs [1, 2, 3, ...]
              
              // Mark words as learned based on server data
              data.vocabulary = data.vocabulary.map(word => ({
                ...word,
                learned: learnedWordIds.includes(word.id)
              }));
              
              hasLoadedFromServer.current = true;
              console.log(`✅ Loaded ${learnedWordIds.length} learned words from server`);
            }
          } catch (serverErr) {
            console.log('Server sync unavailable, using localStorage');
          }
        }
        
        // Fallback to localStorage if server failed or no userId
        if (!hasLoadedFromServer.current) {
          const storageKey = userId ? `${userId}_vocabularyProgress` : 'vocabularyProgress';
          const savedProgress = localStorage.getItem(storageKey);
          if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            // Merge learned status from localStorage
            data.vocabulary = data.vocabulary.map(word => {
              const savedWord = progress.vocabulary?.find(w => w.id === word.id);
              if (savedWord) {
                return { 
                  ...word, 
                  learned: savedWord.learned,
                  lastModified: savedWord.lastModified
                };
              }
              return word;
            });
          }
        }
        
        setVocabularyData(data);
        
        // Set current index to first unlearned word (if any)
        const firstUnlearnedIndex = data.vocabulary.findIndex(word => !word.learned);
        if (firstUnlearnedIndex !== -1) {
          setCurrentWordIndex(firstUnlearnedIndex);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading vocabulary:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    loadVocabularyData();
  }, [userId]);

  // Don't update statistics automatically - compute them on-demand in getStatistics()

  // Filter vocabulary based on current filters
  const getFilteredVocabulary = () => {
    if (!vocabularyData) return [];
    
    let filtered = [...vocabularyData.vocabulary];
    
    // Filter by level
    if (filters.level !== 'all') {
      filtered = filtered.filter(word => word.level === filters.level);
    }
    
    // Filter by learned status
    if (filters.learned === 'learned') {
      filtered = filtered.filter(word => word.learned === true);
    } else if (filters.learned === 'notLearned') {
      filtered = filtered.filter(word => word.learned === false);
    }
    
    // Filter by search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(word => 
        word.word.toLowerCase().includes(searchLower) ||
        word.definition.toLowerCase().includes(searchLower) ||
        word.example.toLowerCase().includes(searchLower)
      );
    }
    
    return filtered;
  };

  // Get current word based on filtered list
  const getCurrentWord = () => {
    const filtered = getFilteredVocabulary();
    if (filtered.length === 0) return null;
    
    // Ensure index is within bounds
    const validIndex = Math.min(currentWordIndex, filtered.length - 1);
    return filtered[validIndex];
  };

  // Mark word as learned with server sync
  const markWordAsLearned = useCallback(async (wordId, learned = true) => {
    if (!vocabularyData) return;
    
    const word = vocabularyData.vocabulary.find(w => w.id === wordId);
    if (!word) return;
    
    // Update local state immediately for instant UI feedback
    setVocabularyData(prev => {
      const updatedData = {
        ...prev,
        vocabulary: prev.vocabulary.map(w =>
          w.id === wordId ? { ...w, learned, lastModified: new Date().toISOString() } : w
        )
      };
      
      // Save to localStorage as backup
      const progressData = {
        vocabulary: updatedData.vocabulary.map(w => ({
          id: w.id,
          learned: w.learned,
          lastModified: w.lastModified
        })),
        lastUpdated: new Date().toISOString()
      };
      const storageKey = userId ? `${userId}_vocabularyProgress` : 'vocabularyProgress';
      localStorage.setItem(storageKey, JSON.stringify(progressData));
      
      return updatedData;
    });
    
    // Sync with server in background (if user is logged in)
    if (userId) {
      try {
        await learnedWordsAPI.markWord(wordId, {
          learned,
          word: word.word,
          level: word.level,
          pos: word.pos
        });
        console.log(`✅ Synced word ${wordId} to server`);
      } catch (err) {
        console.error('Failed to sync with server:', err);
        // Still works offline - data is in localStorage
      }
    }
  }, [vocabularyData, userId]);

  // Navigate to next word
  const nextWord = () => {
    const filtered = getFilteredVocabulary();
    if (filtered.length === 0) return;
    
    setCurrentWordIndex(prev => (prev + 1) % filtered.length);
  };

  // Navigate to previous word
  const previousWord = () => {
    const filtered = getFilteredVocabulary();
    if (filtered.length === 0) return;
    
    setCurrentWordIndex(prev => (prev - 1 + filtered.length) % filtered.length);
  };

  // Jump to specific word index
  const goToWord = (index) => {
    const filtered = getFilteredVocabulary();
    if (index >= 0 && index < filtered.length) {
      setCurrentWordIndex(index);
    }
  };

  // Compute statistics on-demand (no state update to avoid infinite loops)

  // Get statistics (computed on-demand to avoid infinite loops)
  const getStatistics = () => {
    if (!vocabularyData) return null;
    
    const totalWords = vocabularyData.vocabulary.length;
    const learnedWords = vocabularyData.vocabulary.filter(w => w.learned).length;
    const percentComplete = totalWords > 0 ? Math.round((learnedWords / totalWords) * 100) : 0;
    
    // Compute stats by level
    const statsByLevel = {};
    const statsByPos = {};
    const statsByDifficulty = { easy: 0, medium: 0, hard: 0 };
    
    vocabularyData.vocabulary.forEach(word => {
      // By level
      if (!statsByLevel[word.level]) {
        statsByLevel[word.level] = { total: 0, learned: 0, notLearned: 0, percentComplete: 0 };
      }
      statsByLevel[word.level].total++;
      if (word.learned) {
        statsByLevel[word.level].learned++;
      } else {
        statsByLevel[word.level].notLearned++;
      }
      
      // By part of speech
      statsByPos[word.pos] = (statsByPos[word.pos] || 0) + 1;
      
      // By difficulty
      if (word.difficulty && statsByDifficulty[word.difficulty] !== undefined) {
        statsByDifficulty[word.difficulty]++;
      }
    });
    
    // Calculate percentages for levels
    Object.keys(statsByLevel).forEach(level => {
      const levelStats = statsByLevel[level];
      if (levelStats.total > 0) {
        levelStats.percentComplete = Math.round((levelStats.learned / levelStats.total) * 100);
      }
    });
    
    return {
      totalWords,
      learnedWords,
      notLearnedWords: totalWords - learnedWords,
      percentComplete,
      byLevel: statsByLevel,
      byPartOfSpeech: statsByPos,
      byDifficulty: statsByDifficulty
    };
  };

  return {
    vocabularyData,
    setVocabularyData,
    loading,
    error,
    currentWord: getCurrentWord(),
    currentWordIndex,
    filteredVocabulary: getFilteredVocabulary(),
    filters,
    setFilters,
    markWordAsLearned,
    nextWord,
    previousWord,
    goToWord,
    statistics: getStatistics()
  };
};
