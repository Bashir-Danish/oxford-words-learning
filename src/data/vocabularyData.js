/**
 * Vocabulary Data Loader
 * This module loads the Oxford 3000 vocabulary data efficiently
 * Uses fetch from public folder with in-memory caching
 */

// Cache the processed data in memory
let cachedData = null;

/**
 * Get vocabulary data (with memory caching)
 * @returns {Promise<Object>} The vocabulary data
 */
export const getVocabularyData = async () => {
  // Check memory cache
  if (cachedData) {
    return cachedData;
  }

  // Fetch from public folder
  console.log('🌐 Fetching vocabulary data...');
  const response = await fetch('/OXFORD_3000_ENHANCED_TEMPLATE.json');
  
  if (!response.ok) {
    throw new Error('Failed to load vocabulary data');
  }
  
  const vocabularyJson = await response.json();
  
  cachedData = {
    ...vocabularyJson,
    vocabulary: vocabularyJson.vocabulary.map(word => ({
      ...word,
      learned: false, // Initialize all as unlearned
      lastModified: null
    }))
  };

  console.log('✅ Vocabulary data loaded');

  return cachedData;
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
