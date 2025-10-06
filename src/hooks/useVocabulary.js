import { useState, useEffect, useCallback, useRef } from 'react';
import { vocabularyAPI, learnedWordsAPI } from '../services/api';
import { getVocabularyData } from '../data/vocabularyData';
import { 
  saveWordsToLocal, 
  getWordsFromLocal, 
  getFirstUnlearnedFromLocal,
  updateLearnedStatusLocal,
  getLocalWordCount,
  isOnline 
} from '../services/offlineStorage';

/**
 * Custom hook to manage Oxford 3000 vocabulary data
 * Supports infinite scroll, batch loading, and online/offline modes
 * @param {string} userId - Optional user ID for user-specific storage
 */
export const useVocabulary = (userId = null) => {
  const [loadedWords, setLoadedWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [filters, setFilters] = useState({
    level: 'all',
    learned: 'all',
    searchTerm: ''
  });
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingPrevious, setLoadingPrevious] = useState(false);
  const [error, setError] = useState(null);
  const [isOnlineMode, setIsOnlineMode] = useState(isOnline());
  const [hasMore, setHasMore] = useState(true);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [dataSource, setDataSource] = useState('none'); // 'server', 'local', 'bundled', 'none'
  
  // Database counts
  const [dbCounts, setDbCounts] = useState({
    totalWords: 0,
    learnedWords: 0,
    notLearnedWords: 0,
    percentComplete: 0
  });
  
  // Server-side statistics (including level-wise data)
  const [serverStats, setServerStats] = useState(null);
  
  // Refs to track state
  const hasLoadedFromServer = useRef(false);
  const nextWordIdToLoad = useRef(1);
  const previousWordIdToLoad = useRef(null);
  const isLoadingRef = useRef(false);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      console.log('🌐 Back online');
      setIsOnlineMode(true);
    };
    
    const handleOffline = () => {
      console.log('📡 Offline mode');
      setIsOnlineMode(false);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Fetch database counts
  const fetchCounts = useCallback(async () => {
    if (!userId) return;
    
    try {
      if (isOnlineMode) {
        const response = await vocabularyAPI.getCounts();
        if (response.success) {
          setDbCounts(response.data);
          console.log(`📊 Total: ${response.data.totalWords}, Learned: ${response.data.learnedWords}`);
        }
      }
    } catch (err) {
      console.error('Error fetching counts:', err);
    }
  }, [userId, isOnlineMode]);
  
  // Fetch detailed statistics (including level-wise data)
  const fetchStats = useCallback(async () => {
    if (!userId) return;
    
    try {
      if (isOnlineMode) {
        const response = await vocabularyAPI.getStats();
        if (response.success) {
          setServerStats(response.data);
          console.log('📊 Fetched detailed stats from server');
        }
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  }, [userId, isOnlineMode]);
  
  // Load words from server or local storage
  const loadWords = useCallback(async (startFrom, limit = 50) => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    
    try {
      let words = [];
      
      if (isOnlineMode && userId) {
        // Try to load from server
        try {
          const response = await vocabularyAPI.getWords({
            startFrom,
            limit,
            level: filters.level !== 'all' ? filters.level : undefined
          });
          
          if (response.success) {
            words = response.data;
            
            // Save to local storage for offline access
            await saveWordsToLocal(words);
            
            setHasMore(response.pagination.hasMore);
            setDataSource('server');
            console.log(`✅ Loaded ${words.length} words from server (${startFrom} - ${startFrom + words.length - 1})`);
          }
        } catch (err) {
          console.log('Server unavailable, falling back to local storage');
          setIsOnlineMode(false);
          setDataSource('local');
          words = await getWordsFromLocal({ startFrom, limit, level: filters.level });
        }
      } else {
        // Load from local storage (offline mode)
        words = await getWordsFromLocal({ startFrom, limit, level: filters.level });
        console.log(`📂 Loaded ${words.length} words from local storage`);
        setDataSource('local');
        setHasMore(words.length === limit);
      }
      
      return words;
    } catch (err) {
      console.error('Error loading words:', err);
      throw err;
    } finally {
      isLoadingRef.current = false;
    }
  }, [userId, filters.level, isOnlineMode]);
  
  // Initial load: Find first unlearned word and load batch
  useEffect(() => {
    const initialLoad = async () => {
      try {
        setLoading(true);
        
        // Fetch database counts and stats first
        await Promise.all([fetchCounts(), fetchStats()]);
        
        let startWordId = 1;
        
        // Find first unlearned word
        if (userId && isOnlineMode) {
          try {
            const response = await vocabularyAPI.getFirstUnlearned(filters.level);
            if (response.success && response.data) {
              startWordId = response.data.wordId;
              console.log(`📍 Starting from first unlearned word: #${startWordId}`);
            }
          } catch (err) {
            console.log('Could not find first unlearned from server, checking local');
            const localFirst = await getFirstUnlearnedFromLocal(filters.level);
            if (localFirst) {
              startWordId = localFirst.wordId;
            }
          }
        } else {
          // Offline mode - check local storage
          const localFirst = await getFirstUnlearnedFromLocal(filters.level);
          if (localFirst) {
            startWordId = localFirst.wordId;
            console.log(`📍 Starting from first unlearned word (local): #${startWordId}`);
          }
        }
        
        // Load first batch of 50 words
        nextWordIdToLoad.current = startWordId;
        const initialWords = await loadWords(startWordId, 50);
        
        if (initialWords && initialWords.length > 0) {
          setLoadedWords(initialWords);
          nextWordIdToLoad.current = initialWords[initialWords.length - 1].wordId + 1;
          setCurrentWordIndex(0);
        } else {
          // No words available, try fallback to bundled JSON data
          console.log('No words in database, loading from bundled data');
          const data = await getVocabularyData();
          const allWords = data.vocabulary;
          setLoadedWords(allWords.slice(0, 50));
          nextWordIdToLoad.current = 51;
          setHasMore(allWords.length > 50);
          setDataSource('bundled');
          console.log(`✅ Loaded 50/${allWords.length} words from bundled data`);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error during initial load:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    if (userId) {
      initialLoad();
    }
  }, [userId, loadWords, filters.level, isOnlineMode, fetchCounts, fetchStats]);

  // Update previous word ID tracking
  useEffect(() => {
    if (loadedWords.length > 0) {
      const firstWord = loadedWords[0];
      previousWordIdToLoad.current = firstWord.wordId;
      setHasPrevious(firstWord.wordId > 1);
    }
  }, [loadedWords]);
  
  // Load previous words (when going backwards)
  const loadPreviousWords = useCallback(async () => {
    if (!hasPrevious || loadingPrevious || isLoadingRef.current || !previousWordIdToLoad.current) return;
    
    setLoadingPrevious(true);
    
    try {
      // Calculate the starting point for previous batch
      const startFrom = Math.max(1, previousWordIdToLoad.current - 50);
      const limit = previousWordIdToLoad.current - startFrom;
      
      if (limit <= 0) {
        setHasPrevious(false);
        return;
      }
      
      const previousWords = await loadWords(startFrom, limit);
      
      if (previousWords && previousWords.length > 0) {
        // Prepend to the beginning of the list
        setLoadedWords(prev => [...previousWords, ...prev]);
        
        // Adjust current index to maintain position
        setCurrentWordIndex(prev => prev + previousWords.length);
        
        previousWordIdToLoad.current = previousWords[0].wordId;
        setHasPrevious(previousWords[0].wordId > 1);
        
        console.log(`⬅️ Prepended ${previousWords.length} previous words`);
      } else {
        setHasPrevious(false);
      }
    } catch (err) {
      console.error('Error loading previous words:', err);
    } finally {
      setLoadingPrevious(false);
    }
  }, [loadWords, hasPrevious, loadingPrevious]);
  
  // Load more words (infinite scroll forward)
  const loadMoreWords = useCallback(async () => {
    if (!hasMore || loadingMore || isLoadingRef.current) return;
    
    setLoadingMore(true);
    
    try {
      const moreWords = await loadWords(nextWordIdToLoad.current, 50);
      
      if (moreWords && moreWords.length > 0) {
        setLoadedWords(prev => [...prev, ...moreWords]);
        nextWordIdToLoad.current = moreWords[moreWords.length - 1].wordId + 1;
        console.log(`➕ Appended ${moreWords.length} more words`);
      } else {
        // No words from server, try loading from bundled JSON
        console.log('No more words from server, trying bundled data...');
        try {
          const data = await getVocabularyData();
          const allWords = data.vocabulary;
          const currentLength = loadedWords.length;
          
          if (allWords.length > currentLength) {
            const nextBatch = allWords.slice(currentLength, currentLength + 50);
            setLoadedWords(prev => [...prev, ...nextBatch]);
            nextWordIdToLoad.current = currentLength + nextBatch.length + 1;
            setHasMore(allWords.length > currentLength + nextBatch.length);
            setDataSource('bundled');
            console.log(`➕ Loaded ${nextBatch.length} more words from bundled data`);
          } else {
            setHasMore(false);
            console.log('✅ Reached end of vocabulary');
          }
        } catch (fallbackErr) {
          console.error('Failed to load from bundled data:', fallbackErr);
          setHasMore(false);
          console.log('✅ Reached end of vocabulary');
        }
      }
    } catch (err) {
      console.error('Error loading more words:', err);
    } finally {
      setLoadingMore(false);
    }
  }, [loadWords, hasMore, loadingMore, loadedWords.length]);
  
  // Auto-load more words when approaching the end
  useEffect(() => {
    // Trigger load when user is within 5 words of the end of LOADED words (not filtered)
    if (loadedWords.length > 0 && currentWordIndex >= loadedWords.length - 10 && hasMore && !loadingMore) {
      console.log('🔄 Auto-loading next batch... (current index:', currentWordIndex, 'loaded:', loadedWords.length, ')');
      loadMoreWords();
    }
  }, [currentWordIndex, loadedWords.length, hasMore, loadingMore, loadMoreWords]);
  
  // Auto-load previous words when approaching the beginning
  useEffect(() => {
    // Trigger load when user is within 5 words of the beginning
    if (loadedWords.length > 0 && currentWordIndex <= 4 && hasPrevious && !loadingPrevious) {
      console.log('🔄 Auto-loading previous batch...');
      loadPreviousWords();
    }
  }, [currentWordIndex, loadedWords.length, hasPrevious, loadingPrevious, loadPreviousWords]);
  
  // Filter vocabulary based on current filters
  const getFilteredVocabulary = () => {
    if (loadedWords.length === 0) return [];
    
    let filtered = [...loadedWords];
    
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
        (word.example && word.example.toLowerCase().includes(searchLower))
      );
    }
    
    return filtered;
  };

  // Get current word
  const getCurrentWord = () => {
    const filtered = getFilteredVocabulary();
    if (filtered.length === 0) return null;
    
    const validIndex = Math.min(currentWordIndex, filtered.length - 1);
    return filtered[validIndex];
  };

  // Mark word as learned with server and local sync
  const markWordAsLearned = useCallback(async (wordId, learned = true) => {
    if (loadedWords.length === 0) return;
    
    const word = loadedWords.find(w => w.id === wordId || w.wordId === wordId);
    if (!word) return;
    
    // Update local state immediately for instant UI feedback
    setLoadedWords(prev => prev.map(w =>
      (w.id === wordId || w.wordId === wordId) 
        ? { ...w, learned, lastModified: new Date().toISOString() } 
        : w
    ));
    
    // Update local storage
    await updateLearnedStatusLocal(wordId, learned);
    
    // Sync with server in background (if online and user is logged in)
    // ONLY send wordId and learned status - super lightweight!
    if (userId && isOnlineMode) {
      try {
        await learnedWordsAPI.markWord(wordId, {
          learned
        });
        console.log(`✅ Synced word ${wordId} to server (lightweight - only wordId)`);
        
        // Refetch counts and stats to update UI
        fetchCounts();
        fetchStats();
      } catch (err) {
        console.error('Failed to sync with server:', err);
        // Still works - data is in IndexedDB
      }
    }
  }, [loadedWords, userId, isOnlineMode, fetchCounts]);

  // Navigate to next word
  const nextWord = () => {
    const filtered = getFilteredVocabulary();
    if (filtered.length === 0) return;
    
    setCurrentWordIndex(prev => {
      const nextIndex = prev + 1;
      
      // If we're past the end and there are no more words to load, wrap to start
      if (nextIndex >= filtered.length && !hasMore) {
        return 0;
      }
      
      // Otherwise just increment - auto-load will handle fetching more
      // getCurrentWord() will clamp to valid index for display
      return nextIndex;
    });
  };

  // Navigate to previous word
  const previousWord = () => {
    const filtered = getFilteredVocabulary();
    if (filtered.length === 0) return;
    
    // Don't wrap around - just decrement
    // Auto-load will trigger when approaching the beginning
    setCurrentWordIndex(prev => Math.max(prev - 1, 0));
  };

  // Jump to specific word index
  const goToWord = (index) => {
    const filtered = getFilteredVocabulary();
    if (index >= 0 && index < filtered.length) {
      setCurrentWordIndex(index);
    }
  };

  // Get statistics (computed on-demand)
  const getStatistics = () => {
    // Use database counts if available, otherwise fall back to loaded words
    const totalWords = dbCounts.totalWords > 0 ? dbCounts.totalWords : loadedWords.length;
    const learnedWords = dbCounts.learnedWords > 0 ? dbCounts.learnedWords : loadedWords.filter(w => w.learned).length;
    const notLearnedWords = dbCounts.notLearnedWords > 0 ? dbCounts.notLearnedWords : totalWords - learnedWords;
    const percentComplete = dbCounts.percentComplete > 0 ? dbCounts.percentComplete : (totalWords > 0 ? Math.round((learnedWords / totalWords) * 100) : 0);
    
    // Use server stats for level-wise data if available
    if (serverStats && serverStats.byLevel) {
      return {
        totalWords,
        learnedWords,
        notLearnedWords,
        percentComplete,
        byLevel: serverStats.byLevel,
        byPartOfSpeech: {},
        byDifficulty: serverStats.byDifficulty || {}
      };
    }
    
    // Fallback: compute from loaded words (only if no server stats available)
    if (loadedWords.length === 0) {
      return {
        totalWords,
        learnedWords,
        notLearnedWords,
        percentComplete,
        byLevel: {},
        byPartOfSpeech: {},
        byDifficulty: { easy: 0, medium: 0, hard: 0 }
      };
    }
    
    // Compute stats by level from loaded words
    const statsByLevel = {};
    const statsByPos = {};
    const statsByDifficulty = { easy: 0, medium: 0, hard: 0 };
    
    loadedWords.forEach(word => {
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
    loadedWords,
    setLoadedWords,
    loading,
    loadingMore,
    loadingPrevious,
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
    loadMoreWords,
    loadPreviousWords,
    hasMore,
    hasPrevious,
    isOnlineMode,
    dataSource,
    statistics: getStatistics(),
    setCurrentWordIndex,
    dbCounts,
    fetchCounts
  };
};
