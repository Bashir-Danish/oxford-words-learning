import { useState, useEffect } from 'react';

/**
 * Custom hook to manage Oxford 3000 vocabulary data
 * Loads data from JSON file and provides state management
 */
export const useVocabulary = () => {
  const [vocabularyData, setVocabularyData] = useState(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [filters, setFilters] = useState({
    level: 'all', // 'all', 'A1', 'A2', 'B1', 'B2'
    learned: 'all', // 'all', 'learned', 'notLearned'
    searchTerm: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load vocabulary data from JSON file
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
        
        // Load saved progress from localStorage
        const savedProgress = localStorage.getItem('vocabularyProgress');
        if (savedProgress) {
          const progress = JSON.parse(savedProgress);
          // Merge learned status and modifications from localStorage
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
        
        setVocabularyData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading vocabulary:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    loadVocabularyData();
  }, []);

  // Update statistics whenever vocabulary data changes
  useEffect(() => {
    if (vocabularyData) {
      // Update statistics
      updateStatistics();
    }
  }, [vocabularyData]);

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

  // Mark word as learned
  const markWordAsLearned = (wordId, learned = true) => {
    if (!vocabularyData) return;
    
    setVocabularyData(prev => {
      const updatedData = {
        ...prev,
        vocabulary: prev.vocabulary.map(word =>
          word.id === wordId ? { ...word, learned, lastModified: new Date().toISOString() } : word
        )
      };
      
      // Save to localStorage immediately
      const progressData = {
        vocabulary: updatedData.vocabulary.map(word => ({
          id: word.id,
          learned: word.learned,
          lastModified: word.lastModified
        })),
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem('vocabularyProgress', JSON.stringify(progressData));
      
      return updatedData;
    });
  };

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

  // Update statistics in vocabulary data
  const updateStatistics = () => {
    if (!vocabularyData) return;
    
    // Initialize stats with empty structure
    const stats = {
      byLevel: {},
      byPartOfSpeech: {},
      byDifficulty: { easy: 0, medium: 0, hard: 0 }
    };
    
    vocabularyData.vocabulary.forEach(word => {
      // By level - dynamically create level entries
      if (!stats.byLevel[word.level]) {
        stats.byLevel[word.level] = { total: 0, learned: 0, notLearned: 0, percentComplete: 0 };
      }
      
      stats.byLevel[word.level].total++;
      if (word.learned) {
        stats.byLevel[word.level].learned++;
      } else {
        stats.byLevel[word.level].notLearned++;
      }
      
      // By part of speech
      stats.byPartOfSpeech[word.pos] = (stats.byPartOfSpeech[word.pos] || 0) + 1;
      
      // By difficulty
      if (word.difficulty && stats.byDifficulty[word.difficulty] !== undefined) {
        stats.byDifficulty[word.difficulty]++;
      }
    });
    
    // Calculate percentages
    Object.keys(stats.byLevel).forEach(level => {
      const levelStats = stats.byLevel[level];
      if (levelStats.total > 0) {
        levelStats.percentComplete = Math.round((levelStats.learned / levelStats.total) * 100);
      }
    });
    
    setVocabularyData(prev => ({
      ...prev,
      statistics: stats
    }));
  };

  // Get statistics
  const getStatistics = () => {
    if (!vocabularyData) return null;
    
    const totalWords = vocabularyData.vocabulary.length;
    const learnedWords = vocabularyData.vocabulary.filter(w => w.learned).length;
    const percentComplete = totalWords > 0 ? Math.round((learnedWords / totalWords) * 100) : 0;
    
    return {
      totalWords,
      learnedWords,
      notLearnedWords: totalWords - learnedWords,
      percentComplete,
      byLevel: vocabularyData.statistics?.byLevel || {},
      byPartOfSpeech: vocabularyData.statistics?.byPartOfSpeech || {},
      byDifficulty: vocabularyData.statistics?.byDifficulty || {}
    };
  };

  return {
    vocabularyData,
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
