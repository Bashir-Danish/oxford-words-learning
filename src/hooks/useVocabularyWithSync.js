import { useState, useEffect, useCallback } from 'react';
import { learnedWordsAPI, isAuthenticated } from '../services/api';

/**
 * Enhanced vocabulary hook with server synchronization
 * Syncs learned words with backend database when user is authenticated
 * Falls back to localStorage for offline/guest usage
 * 
 * @param {string} userId - Optional user ID for user-specific storage
 * @param {boolean} useServer - Whether to sync with server (default: true if authenticated)
 */
export const useVocabularyWithSync = (userId = null, useServer = null) => {
  const [vocabularyData, setVocabularyData] = useState(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [filters, setFilters] = useState({
    level: 'all',
    learned: 'all',
    searchTerm: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);

  // Determine if we should use server
  const shouldUseServer = useServer !== null ? useServer : isAuthenticated();

  // Storage key for localStorage fallback
  const getStorageKey = () => userId ? `${userId}_vocabularyProgress` : 'vocabularyProgress';

  /**
   * Load vocabulary data from JSON and merge with learned status
   */
  const loadVocabularyData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Load base vocabulary from JSON
      const response = await fetch('/OXFORD_3000_ENHANCED_TEMPLATE.json');
      if (!response.ok) {
        throw new Error('Failed to load vocabulary data');
      }
      
      const data = await response.json();
      
      // Get learned words from server or localStorage
      let learnedWordsMap = {};
      
      if (shouldUseServer) {
        try {
          const serverData = await learnedWordsAPI.getAllLearnedWords();
          if (serverData.success && serverData.data) {
            // Create a map of learned word IDs
            serverData.data.forEach(item => {
              learnedWordsMap[item.word_id] = {
                learned: item.learned,
                learnedAt: item.learned_at,
                updatedAt: item.updated_at
              };
            });
            setLastSyncTime(new Date());
          }
        } catch (err) {
          console.warn('Failed to load from server, falling back to localStorage:', err);
          // Fall back to localStorage if server fails
          const localData = localStorage.getItem(getStorageKey());
          if (localData) {
            const progress = JSON.parse(localData);
            progress.vocabulary?.forEach(word => {
              if (word.learned) {
                learnedWordsMap[word.id] = {
                  learned: true,
                  lastModified: word.lastModified
                };
              }
            });
          }
        }
      } else {
        // Use localStorage only
        const localData = localStorage.getItem(getStorageKey());
        if (localData) {
          const progress = JSON.parse(localData);
          progress.vocabulary?.forEach(word => {
            if (word.learned) {
              learnedWordsMap[word.id] = {
                learned: true,
                lastModified: word.lastModified
              };
            }
          });
        }
      }
      
      // Merge learned status into vocabulary
      data.vocabulary = data.vocabulary.map(word => ({
        ...word,
        learned: learnedWordsMap[word.id]?.learned || false,
        lastModified: learnedWordsMap[word.id]?.lastModified || learnedWordsMap[word.id]?.updatedAt
      }));
      
      setVocabularyData(data);
      setLoading(false);
    } catch (err) {
      console.error('Error loading vocabulary:', err);
      setError(err.message);
      setLoading(false);
    }
  }, [userId, shouldUseServer]);

  // Load data on mount
  useEffect(() => {
    loadVocabularyData();
  }, [loadVocabularyData]);

  // Update statistics whenever vocabulary changes
  useEffect(() => {
    if (vocabularyData) {
      updateStatistics();
    }
  }, [vocabularyData]);

  /**
   * Mark word as learned/unlearned with server sync
   */
  const markWordAsLearned = useCallback(async (wordId, learned = true) => {
    if (!vocabularyData) return;
    
    const word = vocabularyData.vocabulary.find(w => w.id === wordId);
    if (!word) return;

    // Update local state immediately for responsive UI
    setVocabularyData(prev => {
      const updatedData = {
        ...prev,
        vocabulary: prev.vocabulary.map(w =>
          w.id === wordId 
            ? { ...w, learned, lastModified: new Date().toISOString() } 
            : w
        )
      };
      
      // Save to localStorage as backup
      const progressData = {
        vocabulary: updatedData.vocabulary
          .filter(w => w.learned)
          .map(w => ({
            id: w.id,
            learned: w.learned,
            lastModified: w.lastModified
          })),
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(getStorageKey(), JSON.stringify(progressData));
      
      return updatedData;
    });

    // Sync with server if authenticated
    if (shouldUseServer) {
      try {
        setSyncing(true);
        await learnedWordsAPI.markWord(wordId, {
          learned,
          word: word.word,
          level: word.level,
          pos: word.pos
        });
        setLastSyncTime(new Date());
      } catch (err) {
        console.error('Failed to sync with server:', err);
        // Show notification to user (you can add toast/notification here)
      } finally {
        setSyncing(false);
      }
    }
  }, [vocabularyData, shouldUseServer, userId]);

  /**
   * Bulk sync localStorage data to server
   * Useful for migrating existing data
   */
  const syncToServer = useCallback(async () => {
    if (!shouldUseServer || !vocabularyData) return;
    
    try {
      setSyncing(true);
      
      const learnedWords = vocabularyData.vocabulary
        .filter(w => w.learned)
        .map(w => ({
          wordId: w.id,
          word: w.word,
          level: w.level,
          pos: w.pos,
          learned: true
        }));
      
      if (learnedWords.length === 0) {
        console.log('No learned words to sync');
        return { success: true, synced: 0 };
      }
      
      const result = await learnedWordsAPI.bulkSync(learnedWords);
      setLastSyncTime(new Date());
      
      console.log('Sync completed:', result);
      return result;
    } catch (err) {
      console.error('Failed to sync to server:', err);
      throw err;
    } finally {
      setSyncing(false);
    }
  }, [vocabularyData, shouldUseServer]);

  // Filter vocabulary
  const getFilteredVocabulary = useCallback(() => {
    if (!vocabularyData) return [];
    
    let filtered = [...vocabularyData.vocabulary];
    
    if (filters.level !== 'all') {
      filtered = filtered.filter(word => word.level === filters.level);
    }
    
    if (filters.learned === 'learned') {
      filtered = filtered.filter(word => word.learned === true);
    } else if (filters.learned === 'notLearned') {
      filtered = filtered.filter(word => !word.learned);
    }
    
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(word => 
        word.word.toLowerCase().includes(searchLower) ||
        word.definition.toLowerCase().includes(searchLower) ||
        word.example.toLowerCase().includes(searchLower)
      );
    }
    
    return filtered;
  }, [vocabularyData, filters]);

  // Get current word
  const getCurrentWord = useCallback(() => {
    const filtered = getFilteredVocabulary();
    if (filtered.length === 0) return null;
    
    const validIndex = Math.min(currentWordIndex, filtered.length - 1);
    return filtered[validIndex];
  }, [getFilteredVocabulary, currentWordIndex]);

  // Navigation
  const nextWord = useCallback(() => {
    const filtered = getFilteredVocabulary();
    if (filtered.length === 0) return;
    setCurrentWordIndex(prev => (prev + 1) % filtered.length);
  }, [getFilteredVocabulary]);

  const previousWord = useCallback(() => {
    const filtered = getFilteredVocabulary();
    if (filtered.length === 0) return;
    setCurrentWordIndex(prev => (prev - 1 + filtered.length) % filtered.length);
  }, [getFilteredVocabulary]);

  const goToWord = useCallback((index) => {
    const filtered = getFilteredVocabulary();
    if (index >= 0 && index < filtered.length) {
      setCurrentWordIndex(index);
    }
  }, [getFilteredVocabulary]);

  // Update statistics
  const updateStatistics = useCallback(() => {
    if (!vocabularyData) return;
    
    const stats = {
      byLevel: {},
      byPartOfSpeech: {},
      byDifficulty: { easy: 0, medium: 0, hard: 0 }
    };
    
    vocabularyData.vocabulary.forEach(word => {
      if (!stats.byLevel[word.level]) {
        stats.byLevel[word.level] = { total: 0, learned: 0, notLearned: 0, percentComplete: 0 };
      }
      
      stats.byLevel[word.level].total++;
      if (word.learned) {
        stats.byLevel[word.level].learned++;
      } else {
        stats.byLevel[word.level].notLearned++;
      }
      
      stats.byPartOfSpeech[word.pos] = (stats.byPartOfSpeech[word.pos] || 0) + 1;
      
      if (word.difficulty && stats.byDifficulty[word.difficulty] !== undefined) {
        stats.byDifficulty[word.difficulty]++;
      }
    });
    
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
  }, [vocabularyData]);

  // Get statistics
  const getStatistics = useCallback(() => {
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
  }, [vocabularyData]);

  return {
    vocabularyData,
    setVocabularyData,
    loading,
    error,
    syncing,
    lastSyncTime,
    currentWord: getCurrentWord(),
    currentWordIndex,
    filteredVocabulary: getFilteredVocabulary(),
    filters,
    setFilters,
    markWordAsLearned,
    syncToServer,
    nextWord,
    previousWord,
    goToWord,
    statistics: getStatistics(),
    isServerSync: shouldUseServer
  };
};

export default useVocabularyWithSync;
