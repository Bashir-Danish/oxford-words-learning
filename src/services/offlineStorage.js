/**
 * Offline Storage Service
 * Manages local vocabulary storage using IndexedDB for offline mode
 */

const DB_NAME = 'OxfordWordsDB';
const DB_VERSION = 1;
const STORE_NAME = 'vocabulary';
const LEARNED_STORE_NAME = 'learnedWords';

/**
 * Initialize IndexedDB
 */
const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error('IndexedDB error:', request.error);
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create vocabulary store if it doesn't exist
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const vocabStore = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        vocabStore.createIndex('wordId', 'wordId', { unique: false });
        vocabStore.createIndex('level', 'level', { unique: false });
        vocabStore.createIndex('learned', 'learned', { unique: false });
      }

      // Create learned words store
      if (!db.objectStoreNames.contains(LEARNED_STORE_NAME)) {
        const learnedStore = db.createObjectStore(LEARNED_STORE_NAME, { keyPath: 'wordId' });
        learnedStore.createIndex('learnedAt', 'learnedAt', { unique: false });
      }
    };
  });
};

/**
 * Save words to IndexedDB
 * @param {Array} words - Array of word objects
 */
export const saveWordsToLocal = async (words) => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    for (const word of words) {
      store.put(word);
    }

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => {
        console.log(`✅ Saved ${words.length} words to local storage`);
        resolve();
      };
      transaction.onerror = () => reject(transaction.error);
    });
  } catch (error) {
    console.error('Error saving words to local storage:', error);
    throw error;
  }
};

/**
 * Get words from IndexedDB with pagination
 * @param {Object} params - { startFrom, limit, level }
 */
export const getWordsFromLocal = async (params = {}) => {
  try {
    const { startFrom = 1, limit = 50, level } = params;
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.getAll();

      request.onsuccess = () => {
        let words = request.result;

        // Filter by level if specified
        if (level && level !== 'all') {
          words = words.filter(w => w.level === level);
        }

        // Sort by wordId
        words.sort((a, b) => a.wordId - b.wordId);

        // Apply pagination
        const startIndex = words.findIndex(w => w.wordId >= startFrom);
        if (startIndex === -1) {
          resolve([]);
          return;
        }

        const paginatedWords = words.slice(startIndex, startIndex + limit);
        resolve(paginatedWords);
      };

      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error getting words from local storage:', error);
    throw error;
  }
};

/**
 * Get first unlearned word from IndexedDB
 * @param {string} level - Optional level filter
 */
export const getFirstUnlearnedFromLocal = async (level) => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.getAll();

      request.onsuccess = () => {
        let words = request.result;

        // Filter by level if specified
        if (level && level !== 'all') {
          words = words.filter(w => w.level === level);
        }

        // Sort by wordId
        words.sort((a, b) => a.wordId - b.wordId);

        // Find first unlearned
        const firstUnlearned = words.find(w => !w.learned);

        if (firstUnlearned) {
          resolve({
            wordId: firstUnlearned.wordId,
            word: firstUnlearned.word,
            level: firstUnlearned.level
          });
        } else {
          // All learned, return first word
          resolve(words.length > 0 ? {
            wordId: words[0].wordId,
            word: words[0].word,
            level: words[0].level,
            allLearned: true
          } : null);
        }
      };

      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error getting first unlearned from local:', error);
    throw error;
  }
};

/**
 * Update learned status locally
 * @param {number} wordId - Word ID
 * @param {boolean} learned - Learned status
 */
export const updateLearnedStatusLocal = async (wordId, learned) => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME, LEARNED_STORE_NAME], 'readwrite');
    const vocabStore = transaction.objectStore(STORE_NAME);
    const learnedStore = transaction.objectStore(LEARNED_STORE_NAME);

    // Update word in vocabulary store
    const getRequest = vocabStore.get(wordId);
    
    return new Promise((resolve, reject) => {
      getRequest.onsuccess = () => {
        const word = getRequest.result;
        if (word) {
          word.learned = learned;
          word.lastModified = new Date().toISOString();
          vocabStore.put(word);

          // Update learned words store
          if (learned) {
            learnedStore.put({
              wordId,
              word: word.word,
              level: word.level,
              pos: word.pos,
              learnedAt: new Date().toISOString()
            });
          } else {
            learnedStore.delete(wordId);
          }
        }

        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
      };

      getRequest.onerror = () => reject(getRequest.error);
    });
  } catch (error) {
    console.error('Error updating learned status locally:', error);
    throw error;
  }
};

/**
 * Get all learned word IDs from local storage
 */
export const getLearnedWordsLocal = async () => {
  try {
    const db = await initDB();
    const transaction = db.transaction([LEARNED_STORE_NAME], 'readonly');
    const store = transaction.objectStore(LEARNED_STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.getAllKeys();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error getting learned words from local:', error);
    return [];
  }
};

/**
 * Clear all local data
 */
export const clearLocalData = async () => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME, LEARNED_STORE_NAME], 'readwrite');
    const vocabStore = transaction.objectStore(STORE_NAME);
    const learnedStore = transaction.objectStore(LEARNED_STORE_NAME);

    vocabStore.clear();
    learnedStore.clear();

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => {
        console.log('✅ Local data cleared');
        resolve();
      };
      transaction.onerror = () => reject(transaction.error);
    });
  } catch (error) {
    console.error('Error clearing local data:', error);
    throw error;
  }
};

/**
 * Get total word count from local storage
 */
export const getLocalWordCount = async () => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.count();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error getting local word count:', error);
    return 0;
  }
};

/**
 * Check if online
 */
export const isOnline = () => {
  return navigator.onLine;
};

export default {
  saveWordsToLocal,
  getWordsFromLocal,
  getFirstUnlearnedFromLocal,
  updateLearnedStatusLocal,
  getLearnedWordsLocal,
  clearLocalData,
  getLocalWordCount,
  isOnline
};
