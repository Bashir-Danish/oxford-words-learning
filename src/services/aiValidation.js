/**
 * AI Validation Service - Check user practice sentences using Groq AI
 * Routes AI requests through backend server for security
 */

import { getToken } from './api.js';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Validate a user's sentence using AI
 * @param {string} sentence - The user's sentence to validate
 * @param {string} targetWord - The word that should be used in the sentence
 * @param {string} wordDefinition - Definition of the word for context
 * @returns {Promise<Object>} Validation result with score and feedback
 */
export const validateSentenceWithAI = async (sentence, targetWord, wordDefinition = '') => {
  try {
    const token = getToken();
    
    const response = await fetch(`${API_BASE_URL}/ai/validate-sentence`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      },
      body: JSON.stringify({ sentence, targetWord, wordDefinition })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || `API request failed: ${response.status}`);
    }

    const result = await response.json();
    
    // Backend returns { success, data, error }
    if (!result.success) {
      throw new Error(result.error || 'Validation failed');
    }

    return result;

  } catch (error) {
    console.error('AI Validation Error:', error);
    
    return {
      success: false,
      error: error.message || 'Failed to validate sentence',
      data: null
    };
  }
};

/**
 * Check if a sentence matches the existing example
 * @param {string} userSentence - User's sentence
 * @param {string} exampleSentence - The reference example sentence
 * @returns {Object} Similarity information
 */
export const checkSentenceSimilarity = (userSentence, exampleSentence) => {
  if (!userSentence || !exampleSentence) {
    return { isOriginal: true, similarity: 0 };
  }

  // Normalize sentences for comparison
  const normalize = (str) => 
    str.toLowerCase()
       .replace(/[.,!?;:\"']/g, '')
       .replace(/\s+/g, ' ')
       .trim();

  const userNorm = normalize(userSentence);
  const exampleNorm = normalize(exampleSentence);

  // Check if sentences are identical
  if (userNorm === exampleNorm) {
    return { isOriginal: false, similarity: 100 };
  }

  // Calculate word overlap
  const userWords = new Set(userNorm.split(' '));
  const exampleWords = new Set(exampleNorm.split(' '));
  
  let matchCount = 0;
  userWords.forEach(word => {
    if (exampleWords.has(word)) matchCount++;
  });

  const similarity = Math.round((matchCount / Math.max(userWords.size, exampleWords.size)) * 100);

  // Consider it "not original" if similarity is very high (>70%)
  return { 
    isOriginal: similarity < 70, 
    similarity 
  };
};

/**
 * Get quality feedback based on AI validation results
 * @param {Object} validationResult - Result from validateSentenceWithAI
 * @returns {Object} Quality object with type and message
 */
export const getAIQualityFeedback = (validationResult) => {
  if (!validationResult?.isCorrect) {
    return {
      type: 'error',
      message: validationResult?.feedback || 'Please review your sentence.',
      points: validationResult?.points || 0
    };
  }

  const score = validationResult.score || 0;
  const points = validationResult.points || 0;

  if (score >= 90) {
    return {
      type: 'success',
      message: `🎉 Excellent! ${validationResult.feedback || ''} +${points} points!`,
      points
    };
  } else if (score >= 70) {
    return {
      type: 'info',
      message: `👍 Good work! ${validationResult.feedback || ''} +${points} points!`,
      points
    };
  } else if (score >= 50) {
    return {
      type: 'warning',
      message: `✏️ Keep practicing! ${validationResult.feedback || ''} +${points} points.`,
      points
    };
  } else {
    return {
      type: 'warning',
      message: `${validationResult.feedback || 'Try again!'} +${points} points.`,
      points
    };
  }
};
/**
 * Get AI explanation and Persian translation for a word
 * @param {Object} wordData - Complete word object with all properties
 * @returns {Promise<Object>} Explanation with Persian translations
 */
export const explainWordWithAI = async (wordData) => {
  try {
    const token = getToken();
    
    const response = await fetch(`${API_BASE_URL}/ai/explain-word`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      },
      body: JSON.stringify({ wordData })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || `API request failed: ${response.status}`);
    }

    const result = await response.json();
    
    // Backend returns { success, explanation, error }
    if (!result.success) {
      throw new Error(result.error || 'Explanation failed');
    }

    return result;

  } catch (error) {
    console.error('AI Explanation Error:', error);
    
    return {
      success: false,
      error: error.message || 'Failed to get AI explanation',
      explanation: null
    };
  }
};

export default {
  validateSentenceWithAI,
  checkSentenceSimilarity,
  getAIQualityFeedback,
  explainWordWithAI
};
