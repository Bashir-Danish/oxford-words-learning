// Utility Functions for Word Family Explorer

// ==================== WORD DETECTION ====================

/**
 * Extract all words from the current word family
 * @param {Object} family - Word family object
 * @returns {Array} Array of lowercase words
 */
export const getWordListFromFamily = (family) => {
  if (!family || !family.forms) return [];
  return family.forms.map(form => form.word.toLowerCase());
};

/**
 * Detect which words from the family are used in the sentence
 * @param {string} sentence - User's sentence
 * @param {Object} family - Word family object
 * @returns {Object} Object with detected words and their POS
 */
export const detectWordsInSentence = (sentence, family) => {
  if (!sentence || !family) return { words: [], count: 0, forms: [] };
  
  const sentenceLower = sentence.toLowerCase();
  const detectedWords = [];
  const detectedForms = [];
  
  family.forms.forEach(form => {
    const word = form.word.toLowerCase();
    // Use word boundary regex to match whole words only
    const regex = new RegExp(`\\b${escapeRegex(word)}\\b`, 'gi');
    const matches = sentenceLower.match(regex);
    
    if (matches) {
      detectedWords.push({
        word: form.word,
        pos: form.pos,
        count: matches.length
      });
      detectedForms.push(form);
    }
  });
  
  return {
    words: detectedWords,
    count: detectedWords.length,
    forms: detectedForms
  };
};

/**
 * Escape special regex characters
 */
const escapeRegex = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * Highlight words from family in the sentence
 * @param {string} sentence - User's sentence
 * @param {Object} family - Word family object
 * @returns {Array} Array of text segments with highlight info
 */
export const highlightWordsInSentence = (sentence, family) => {
  if (!sentence || !family) return [{ text: sentence, highlighted: false }];
  
  const segments = [];
  let currentIndex = 0;
  const sentenceLower = sentence.toLowerCase();
  
  // Find all word matches with positions
  const matches = [];
  family.forms.forEach(form => {
    const word = form.word.toLowerCase();
    const regex = new RegExp(`\\b${escapeRegex(word)}\\b`, 'gi');
    let match;
    
    while ((match = regex.exec(sentenceLower)) !== null) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        word: form.word,
        pos: form.pos
      });
    }
  });
  
  // Sort matches by position
  matches.sort((a, b) => a.start - b.start);
  
  // Build segments
  matches.forEach(match => {
    // Add text before the match
    if (currentIndex < match.start) {
      segments.push({
        text: sentence.substring(currentIndex, match.start),
        highlighted: false
      });
    }
    
    // Add the highlighted match
    segments.push({
      text: sentence.substring(match.start, match.end),
      highlighted: true,
      pos: match.pos
    });
    
    currentIndex = match.end;
  });
  
  // Add remaining text
  if (currentIndex < sentence.length) {
    segments.push({
      text: sentence.substring(currentIndex),
      highlighted: false
    });
  }
  
  return segments.length > 0 ? segments : [{ text: sentence, highlighted: false }];
};

// ==================== VALIDATION ====================

/**
 * Basic grammar and validation checks
 * @param {string} sentence - User's sentence
 * @param {Object} family - Word family object
 * @returns {Object} Validation results
 */
export const validateSentence = (sentence, family) => {
  const errors = [];
  const warnings = [];
  const suggestions = [];
  
  // Check if sentence is empty
  if (!sentence || sentence.trim().length === 0) {
    errors.push("Please write a sentence.");
    return { isValid: false, errors, warnings, suggestions, score: 0 };
  }
  
  // Check minimum length
  if (sentence.trim().length < 10) {
    warnings.push("Your sentence is quite short. Try to make it more detailed.");
  }
  
  // Check for capital letter at start
  if (!/^[A-Z]/.test(sentence.trim())) {
    errors.push("Sentence should start with a capital letter.");
  }
  
  // Check for ending punctuation
  if (!/[.!?]$/.test(sentence.trim())) {
    errors.push("Sentence should end with proper punctuation (. ! ?).");
  }
  
  // Check if at least one word from family is used
  const detected = detectWordsInSentence(sentence, family);
  if (detected.count === 0) {
    errors.push("Please use at least one word from the current word family.");
    return { isValid: false, errors, warnings, suggestions, score: 0 };
  }
  
  // Check for multiple spaces
  if (/\s{2,}/.test(sentence)) {
    warnings.push("There are multiple spaces in your sentence.");
  }
  
  // Calculate score based on various factors
  let score = 0;
  
  // Words used from family (0-50 points)
  score += Math.min(detected.count * 15, 50);
  
  // Sentence length (0-20 points)
  const wordCount = sentence.trim().split(/\s+/).length;
  if (wordCount >= 8 && wordCount <= 25) {
    score += 20;
  } else if (wordCount >= 5) {
    score += 10;
  }
  
  // Grammar basics (0-30 points)
  let grammarScore = 30;
  if (errors.length > 0) grammarScore -= errors.length * 10;
  if (warnings.length > 0) grammarScore -= warnings.length * 5;
  score += Math.max(grammarScore, 0);
  
  // Bonus for using different word forms
  if (detected.count >= 3) {
    score += 10;
    suggestions.push("Excellent! You used " + detected.count + " different word forms.");
  } else if (detected.count === 2) {
    suggestions.push("Good job! Try using one more word form to make it even better.");
  } else {
    suggestions.push("Try using more word forms from this family in your sentence.");
  }
  
  // Cap score at 100
  score = Math.min(score, 100);
  
  const isValid = errors.length === 0;
  
  return {
    isValid,
    errors,
    warnings,
    suggestions,
    score,
    wordsUsed: detected.count,
    wordDetails: detected.words
  };
};

// ==================== ENCOURAGEMENT MESSAGES ====================

/**
 * Get encouraging feedback based on score
 * @param {number} score - Validation score
 * @param {number} wordsUsed - Number of word forms used
 * @returns {string} Encouragement message
 */
export const getEncouragementMessage = (score, wordsUsed) => {
  if (score >= 90) {
    return "Outstanding! Your sentence is excellent! 🌟";
  } else if (score >= 80) {
    return "Excellent work! You're doing great! 🎉";
  } else if (score >= 70) {
    return "Very good! Keep up the great work! 👏";
  } else if (score >= 60) {
    return "Good job! You're making progress! 👍";
  } else if (score >= 50) {
    return "Nice try! Keep practicing! 💪";
  } else {
    return "Good start! Let's try to improve it! 😊";
  }
};

// ==================== LOCAL STORAGE ====================

/**
 * Save data to localStorage
 * @param {string} key - Storage key
 * @param {*} data - Data to save
 */
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

/**
 * Load data from localStorage
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if not found
 * @returns {*} Loaded data or default value
 */
export const loadFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 */
export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

// ==================== PROGRESS TRACKING ====================

/**
 * Initialize user progress data
 * @returns {Object} Default progress object
 */
export const initializeProgress = () => {
  return {
    streak: 0,
    lastVisitDate: null,
    totalFamiliesPracticed: 0,
    totalSentencesCreated: 0,
    savedSentences: [],
    familyMastery: {}, // { familyId: practiceCount }
    currentLevel: 'Basic',
    settings: {
      darkMode: false,
      showHints: true,
      showTimer: false
    }
  };
};

/**
 * Update streak based on last visit
 * @param {Object} progress - Current progress object
 * @returns {Object} Updated progress object
 */
export const updateStreak = (progress) => {
  const today = new Date().toDateString();
  const lastVisit = progress.lastVisitDate;
  
  if (!lastVisit) {
    // First visit
    progress.streak = 1;
    progress.lastVisitDate = today;
  } else if (lastVisit === today) {
    // Same day, no change
    return progress;
  } else {
    const lastDate = new Date(lastVisit);
    const todayDate = new Date(today);
    const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      // Consecutive day
      progress.streak += 1;
    } else {
      // Streak broken
      progress.streak = 1;
    }
    
    progress.lastVisitDate = today;
  }
  
  return progress;
};

/**
 * Calculate user level based on progress
 * @param {Object} progress - Current progress object
 * @returns {string} User level
 */
export const calculateUserLevel = (progress) => {
  const practiced = progress.totalFamiliesPracticed;
  
  if (practiced < 10) {
    return 'Basic';
  } else if (practiced < 30) {
    return 'Intermediate';
  } else {
    return 'Advanced';
  }
};

/**
 * Get mastery level for a specific family
 * @param {Object} progress - Current progress object
 * @param {number} familyId - Word family ID
 * @returns {number} Mastery count (0-3+)
 */
export const getFamilyMastery = (progress, familyId) => {
  return progress.familyMastery[familyId] || 0;
};

/**
 * Increment family mastery
 * @param {Object} progress - Current progress object
 * @param {number} familyId - Word family ID
 * @returns {Object} Updated progress object
 */
export const incrementFamilyMastery = (progress, familyId) => {
  if (!progress.familyMastery[familyId]) {
    progress.familyMastery[familyId] = 0;
  }
  progress.familyMastery[familyId] += 1;
  return progress;
};

/**
 * Save a sentence to collection
 * @param {Object} progress - Current progress object
 * @param {Object} sentenceData - Sentence data to save
 * @returns {Object} Updated progress object
 */
export const saveSentence = (progress, sentenceData) => {
  const sentence = {
    id: Date.now(),
    text: sentenceData.text,
    familyId: sentenceData.familyId,
    familyName: sentenceData.familyName,
    score: sentenceData.score,
    wordsUsed: sentenceData.wordsUsed,
    date: new Date().toISOString(),
    ...sentenceData
  };
  
  progress.savedSentences.unshift(sentence);
  progress.totalSentencesCreated += 1;
  
  return progress;
};

/**
 * Delete a saved sentence
 * @param {Object} progress - Current progress object
 * @param {number} sentenceId - Sentence ID to delete
 * @returns {Object} Updated progress object
 */
export const deleteSentence = (progress, sentenceId) => {
  progress.savedSentences = progress.savedSentences.filter(s => s.id !== sentenceId);
  return progress;
};

/**
 * Update a saved sentence
 * @param {Object} progress - Current progress object
 * @param {number} sentenceId - Sentence ID to update
 * @param {Object} updates - Updated data
 * @returns {Object} Updated progress object
 */
export const updateSentence = (progress, sentenceId, updates) => {
  const index = progress.savedSentences.findIndex(s => s.id === sentenceId);
  if (index !== -1) {
    progress.savedSentences[index] = {
      ...progress.savedSentences[index],
      ...updates,
      lastModified: new Date().toISOString()
    };
  }
  return progress;
};

// ==================== EXPORT DATA ====================

/**
 * Export sentences as JSON
 * @param {Array} sentences - Array of saved sentences
 * @returns {string} JSON string
 */
export const exportSentencesJSON = (sentences) => {
  return JSON.stringify(sentences, null, 2);
};

/**
 * Export sentences as text
 * @param {Array} sentences - Array of saved sentences
 * @returns {string} Text string
 */
export const exportSentencesText = (sentences) => {
  let text = 'My Word Family Sentences\n';
  text += '=========================\n\n';
  
  sentences.forEach((sentence, index) => {
    text += `${index + 1}. ${sentence.familyName} (${new Date(sentence.date).toLocaleDateString()})\n`;
    text += `   ${sentence.text}\n`;
    text += `   Score: ${sentence.score}/100 | Words used: ${sentence.wordsUsed}\n\n`;
  });
  
  return text;
};

/**
 * Download text as file
 * @param {string} content - File content
 * @param {string} filename - File name
 * @param {string} mimeType - MIME type
 */
export const downloadFile = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// ==================== DATE/TIME UTILITIES ====================

/**
 * Format date for display
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

/**
 * Get relative time string
 * @param {string|Date} date - Date to compare
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now - d;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  
  return formatDate(date);
};

// ==================== MISC UTILITIES ====================

/**
 * Get all unique categories from word families
 * @param {Array} families - Array of word families (optional, for dynamic filtering)
 * @returns {Array} Array of category strings
 */
export const getAllCategories = (families = []) => {
  if (families.length === 0) {
    // Return default categories if no families provided
    return ['Daily Life', 'Education', 'Business', 'Technology', 'Science', 'Social', 'Arts', 'Health'];
  }
  const categories = new Set(families.map(f => f.category));
  return Array.from(categories).sort();
};

/**
 * Get all unique difficulty levels from word families
 * @param {Array} families - Array of word families (optional, for dynamic filtering)
 * @returns {Array} Array of level strings
 */
export const getAllLevels = (families = []) => {
  if (families.length === 0) {
    // Return default levels if no families provided
    return ['Basic', 'Intermediate', 'Advanced'];
  }
  const levels = new Set(families.map(f => f.level));
  return Array.from(levels).sort();
};

/**
 * Get POS color
 * @param {string} pos - Part of speech
 * @returns {string} Color name
 */
export const getPOSColor = (pos) => {
  const colors = {
    'verb': 'blue',
    'noun': 'green',
    'adjective': 'orange',
    'adverb': 'purple'
  };
  return colors[pos.toLowerCase()] || 'gray';
};

/**
 * Count words in text
 * @param {string} text - Text to count
 * @returns {number} Word count
 */
export const countWords = (text) => {
  if (!text || text.trim().length === 0) return 0;
  return text.trim().split(/\s+/).length;
};

/**
 * Shuffle array
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
