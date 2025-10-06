/**
 * API Service - Handle all server API calls
 * Connects React frontend with Node.js/Express backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};

// Helper function to set auth token
const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('auth_token', token);
  } else {
    localStorage.removeItem('auth_token');
  }
};

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ============ Authentication APIs ============

export const authAPI = {
  /**
   * Register a new user
   * @param {Object} userData - { username, password, avatar, email (optional) }
   * @returns {Promise<Object>} User data and token
   */
  register: async (userData) => {
    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (data.token) {
      setAuthToken(data.token);
    }
    
    return data;
  },

  /**
   * Login user
   * @param {Object} credentials - { username, password } or { email, password }
   * @returns {Promise<Object>} User data and token
   */
  login: async (credentials) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (data.token) {
      setAuthToken(data.token);
    }
    
    return data;
  },

  /**
   * Verify current token
   * @returns {Promise<Object>} User data
   */
  verify: async () => {
    return await apiRequest('/auth/verify');
  },

  /**
   * Logout user (client-side only)
   */
  logout: () => {
    setAuthToken(null);
  },
};

// ============ User Management APIs ============

export const userAPI = {
  /**
   * Get current user profile
   * @returns {Promise<Object>} User profile data
   */
  getProfile: async () => {
    return await apiRequest('/users/me');
  },

  /**
   * Update user profile
   * @param {Object} updates - { username, avatar }
   * @returns {Promise<Object>} Updated user data
   */
  updateProfile: async (updates) => {
    return await apiRequest('/users/me', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  /**
   * Delete user account
   * @returns {Promise<Object>} Success message
   */
  deleteAccount: async () => {
    const result = await apiRequest('/users/me', {
      method: 'DELETE',
    });
    
    setAuthToken(null);
    return result;
  },

  /**
   * Change password
   * @param {Object} passwords - { currentPassword, newPassword }
   * @returns {Promise<Object>} Success message
   */
  changePassword: async (passwords) => {
    return await apiRequest('/users/change-password', {
      method: 'POST',
      body: JSON.stringify(passwords),
    });
  },
};

// Note: Progress API removed - now using WordPractice API for per-word data

// ============ Utility Functions ============

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!getAuthToken();
};

/**
 * Get current auth token
 * @returns {string|null}
 */
export const getToken = () => {
  return getAuthToken();
};

/**
 * Set new auth token
 * @param {string} token
 */
export const setToken = (token) => {
  setAuthToken(token);
};

/**
 * Handle API errors uniformly
 * @param {Error} error
 * @returns {string} User-friendly error message
 */
export const handleAPIError = (error) => {
  if (error.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
};

// ============ Word Practice APIs ============

export const practiceAPI = {
  /**
   * Get practice data for a specific word
   * @param {number} wordId - Word ID
   * @returns {Promise<Object>} Word practice data
   */
  getWordPractice: async (wordId) => {
    return await apiRequest(`/practice/word/${wordId}`);
  },

  /**
   * Save practice data for a specific word
   * @param {number} wordId - Word ID
   * @param {Object} practiceData - { word, points, sentence, correctWords, totalWords, percentage }
   * @returns {Promise<Object>} Saved practice data
   */
  saveWordPractice: async (wordId, practiceData) => {
    return await apiRequest(`/practice/word/${wordId}`, {
      method: 'POST',
      body: JSON.stringify(practiceData),
    });
  },

  /**
   * Get all word practice data for current user
   * @returns {Promise<Object>} All practice data
   */
  getAllPractice: async () => {
    return await apiRequest('/practice/all');
  },

  /**
   * Get practice statistics
   * @returns {Promise<Object>} Practice statistics
   */
  getStats: async () => {
    return await apiRequest('/practice/stats');
  },
};

// ============ Vocabulary APIs ============

export const vocabularyAPI = {
  /**
   * Get vocabulary words with pagination
   * @param {Object} params - { startFrom, limit, level, difficulty }
   * @returns {Promise<Object>} Vocabulary words with pagination info
   */
  getWords: async (params = {}) => {
    const { startFrom = 1, limit = 50, level, difficulty } = params;
    const queryParams = new URLSearchParams({
      startFrom: startFrom.toString(),
      limit: limit.toString(),
    });
    
    if (level && level !== 'all') {
      queryParams.append('level', level);
    }
    
    if (difficulty && difficulty !== 'all') {
      queryParams.append('difficulty', difficulty);
    }
    
    return await apiRequest(`/vocabulary/words?${queryParams.toString()}`);
  },

  /**
   * Find the first unlearned word for current user
   * @param {string} level - Optional level filter
   * @returns {Promise<Object>} First unlearned word info
   */
  getFirstUnlearned: async (level) => {
    const queryParams = new URLSearchParams();
    if (level && level !== 'all') {
      queryParams.append('level', level);
    }
    return await apiRequest(`/vocabulary/first-unlearned?${queryParams.toString()}`);
  },

  /**
   * Get total vocabulary and learned counts
   * @returns {Promise<Object>} Total and learned counts
   */
  getCounts: async () => {
    return await apiRequest('/vocabulary/counts');
  },

  /**
   * Get vocabulary statistics
   * @returns {Promise<Object>} Vocabulary statistics
   */
  getStats: async () => {
    return await apiRequest('/vocabulary/stats');
  },

  /**
   * Check learned status for batch of word IDs
   * @param {Array<number>} wordIds - Array of word IDs
   * @returns {Promise<Object>} Learned word IDs
   */
  batchCheck: async (wordIds) => {
    return await apiRequest('/vocabulary/batch-check', {
      method: 'POST',
      body: JSON.stringify({ wordIds }),
    });
  },
};

// ============ Learned Words APIs ============

export const learnedWordsAPI = {
  /**
   * Get all learned words for current user
   * @returns {Promise<Object>} Learned words data
   */
  getAllLearnedWords: async () => {
    return await apiRequest('/learned-words');
  },

  /**
   * Mark a word as learned or not learned
   * @param {number} wordId - Word ID
   * @param {Object} data - { learned, word, level, pos }
   * @returns {Promise<Object>} Success response
   */
  markWord: async (wordId, data) => {
    return await apiRequest(`/learned-words/${wordId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Bulk sync learned words from localStorage
   * @param {Array} words - Array of word objects with { wordId, word, level, pos, learned }
   * @returns {Promise<Object>} Sync result
   */
  bulkSync: async (words) => {
    return await apiRequest('/learned-words/bulk', {
      method: 'POST',
      body: JSON.stringify({ words }),
    });
  },

  /**
   * Get learned words statistics
   * @returns {Promise<Object>} Statistics data
   */
  getStats: async () => {
    return await apiRequest('/learned-words/stats');
  },

  /**
   * Remove a word from learned list
   * @param {number} wordId - Word ID
   * @returns {Promise<Object>} Success response
   */
  removeWord: async (wordId) => {
    return await apiRequest(`/learned-words/${wordId}`, {
      method: 'DELETE',
    });
  },
};

export default {
  auth: authAPI,
  user: userAPI,
  vocabulary: vocabularyAPI,
  practice: practiceAPI,
  learnedWords: learnedWordsAPI,
  isAuthenticated,
  getToken,
  setToken,
  handleAPIError,
};
