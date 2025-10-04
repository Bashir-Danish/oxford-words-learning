/**
 * IndexedDB Cache for Vocabulary Data
 * Provides faster loading and offline support
 */

const DB_NAME = 'OxfordVocabularyDB';
const DB_VERSION = 1;
const STORE_NAME = 'vocabulary';

/**
 * Open IndexedDB connection
 */
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    };
  });
};

/**
 * Save data to IndexedDB
 */
export const saveToCache = async (key, data) => {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    await store.put({
      key,
      data,
      timestamp: Date.now()
    });
    
    return true;
  } catch (error) {
    console.warn('Failed to save to IndexedDB:', error);
    return false;
  }
};

/**
 * Get data from IndexedDB
 */
export const getFromCache = async (key, maxAge = 24 * 60 * 60 * 1000) => {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    
    return new Promise((resolve, reject) => {
      const request = store.get(key);
      
      request.onsuccess = () => {
        const result = request.result;
        
        if (!result) {
          resolve(null);
          return;
        }
        
        // Check if cache is still valid
        const age = Date.now() - result.timestamp;
        if (age > maxAge) {
          resolve(null);
          return;
        }
        
        resolve(result.data);
      };
      
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn('Failed to get from IndexedDB:', error);
    return null;
  }
};

/**
 * Clear cache
 */
export const clearCache = async () => {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    await store.clear();
    return true;
  } catch (error) {
    console.warn('Failed to clear IndexedDB:', error);
    return false;
  }
};

/**
 * Check if IndexedDB is supported
 */
export const isIndexedDBSupported = () => {
  return 'indexedDB' in window;
};
