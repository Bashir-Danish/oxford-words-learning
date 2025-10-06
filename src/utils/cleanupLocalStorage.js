/**
 * Cleanup Old LocalStorage Data
 * 
 * This utility removes old vocabulary-related localStorage items
 * that are no longer used by the application.
 * 
 * The app now uses:
 * - MongoDB (server-side) for learned words
 * - IndexedDB (client-side) for offline caching
 * 
 * LocalStorage is only used for auth tokens.
 */

/**
 * Clean up old vocabulary localStorage items
 */
export const cleanupOldVocabularyData = () => {
  try {
    const keysToRemove = [];
    
    // Find all keys in localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      
      // Remove old vocabulary-related keys
      if (
        key.includes('vocabularyProgress') ||
        key.includes('learned_words_') ||
        key.includes('vocabulary_') ||
        key.includes('_vocabularyData') ||
        key.includes('_learnedWords')
      ) {
        keysToRemove.push(key);
      }
    }
    
    // Remove all found keys
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
      console.log(`🧹 Removed old localStorage key: ${key}`);
    });
    
    if (keysToRemove.length > 0) {
      console.log(`✅ Cleaned up ${keysToRemove.length} old vocabulary localStorage items`);
    } else {
      console.log('✨ No old vocabulary localStorage items found');
    }
    
    return keysToRemove.length;
  } catch (error) {
    console.error('Error cleaning up localStorage:', error);
    return 0;
  }
};

/**
 * Get localStorage usage info
 */
export const getLocalStorageInfo = () => {
  try {
    const items = [];
    let totalSize = 0;
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      const size = new Blob([value]).size;
      
      items.push({
        key,
        size,
        sizeKB: (size / 1024).toFixed(2)
      });
      
      totalSize += size;
    }
    
    return {
      itemCount: items.length,
      totalSize,
      totalSizeKB: (totalSize / 1024).toFixed(2),
      totalSizeMB: (totalSize / 1024 / 1024).toFixed(2),
      items: items.sort((a, b) => b.size - a.size)
    };
  } catch (error) {
    console.error('Error getting localStorage info:', error);
    return null;
  }
};

/**
 * Log current storage usage
 */
export const logStorageUsage = () => {
  const info = getLocalStorageInfo();
  
  if (!info) return;
  
  console.log('📊 LocalStorage Usage:');
  console.log(`   Total items: ${info.itemCount}`);
  console.log(`   Total size: ${info.totalSizeKB} KB`);
  console.log('\n📝 Items:');
  
  info.items.forEach(item => {
    console.log(`   ${item.key}: ${item.sizeKB} KB`);
  });
};

/**
 * Auto-cleanup on app load
 * Call this once when the app initializes
 */
export const autoCleanup = () => {
  console.log('🔍 Checking for old localStorage data...');
  const removed = cleanupOldVocabularyData();
  
  if (removed > 0) {
    console.log(`✅ Cleanup complete! Removed ${removed} old items.`);
  }
  
  // Log remaining storage usage
  if (import.meta.env.DEV) {
    logStorageUsage();
  }
};

export default {
  cleanupOldVocabularyData,
  getLocalStorageInfo,
  logStorageUsage,
  autoCleanup
};
