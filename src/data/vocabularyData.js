/**
 * Vocabulary Data Loader
 * This module loads the Oxford 3000 vocabulary data efficiently
 * Uses fetch from public folder + IndexedDB caching for optimal performance
 */

import { getFromCache, saveToCache, isIndexedDBSupported } from '../utils/vocabularyCache';

// Cache the processed data in memory
let cachedData = null;
const CACHE_KEY = 'vocabulary_data_v1';

/**
 * Get vocabulary data (with multi-layer caching)
 * @returns {Promise<Object>} The vocabulary data
 */
export const getVocabularyData = async () => {
  // Layer 1: Check memory cache (fastest)
  if (cachedData) {
    return cachedData;
  }

  // Layer 2: Check IndexedDB cache (fast)
  if (isIndexedDBSupported()) {
    const cachedFromDB = await getFromCache(CACHE_KEY);
    if (cachedFromDB) {
      cachedData = cachedFromDB;
      console.log('✅ Loaded vocabulary from IndexedDB cache');
      return cachedData;
    }
  }

  // Layer 3: Fetch from public folder
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

  // Save to IndexedDB for next time
  if (isIndexedDBSupported()) {
    await saveToCache(CACHE_KEY, cachedData);
    console.log('💾 Saved vocabulary to IndexedDB cache');
  }

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
