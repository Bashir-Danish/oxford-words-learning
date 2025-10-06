/**
 * Vocabulary Data Loader
 * This module loads the Oxford 3000 vocabulary data efficiently
 * Uses dynamic import (lazy loading) to avoid blocking initial app load
 * Vite handles code-splitting and optimization automatically
 */

// Cache the processed data in memory
let cachedData = null;
let loadingPromise = null;

/**
 * Get vocabulary data (with memory caching and async loading)
 * @returns {Promise<Object>} The vocabulary data
 */
export const getVocabularyData = async () => {
  // Check memory cache
  if (cachedData) {
    return cachedData;
  }

  // If already loading, return the same promise
  if (loadingPromise) {
    return loadingPromise;
  }

  // Dynamic import - lazy load the JSON file
  console.log('📦 Loading vocabulary data from bundle (async)...');
  
  loadingPromise = import('./OXFORD_3000_ENHANCED_TEMPLATE.json')
    .then((module) => {
      const vocabularyJson = module.default || module;
      
      if (!vocabularyJson || !vocabularyJson.vocabulary) {
        throw new Error('Invalid vocabulary data structure');
      }
      
      cachedData = {
        ...vocabularyJson,
        vocabulary: vocabularyJson.vocabulary.map(word => ({
          ...word,
          learned: false, // Initialize all as unlearned
          lastModified: null
        }))
      };

      console.log(`✅ Vocabulary data loaded from bundle (${cachedData.vocabulary.length} words)`);
      loadingPromise = null;
      return cachedData;
    })
    .catch((error) => {
      console.error('❌ Error loading vocabulary data:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      loadingPromise = null;
      throw new Error(`Failed to load vocabulary: ${error.message}`);
    });

  return loadingPromise;
};

/**
 * Get compressed vocabulary data (for better performance)
 * This removes unnecessary fields for initial load
 */
export const getCompressedVocabularyData = async () => {
  const data = await getVocabularyData();
  
  return {
    vocabulary: data.vocabulary.map(word => ({
      id: word.id,
      word: word.word,
      pos: word.pos,
      level: word.level,
      definition: word.definition,
      example: word.example,
      persian: word.persian,
      learned: word.learned,
      // Other fields loaded on-demand
    }))
  };
};

/**
 * Clear the cache (useful for testing or updates)
 */
export const clearCache = () => {
  cachedData = null;
};
