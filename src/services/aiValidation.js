/**
 * AI Validation Service - Check user practice sentences using OpenRouter AI
 * Uses DeepSeek model to validate if the sentence is grammatically correct
 * and uses the target word appropriately
 */

// SECURITY NOTE: In production, move API key to backend server!
// Never expose API keys in frontend code for production apps
// You can use environment variables (create a .env file) or hardcode the key here
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || "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";
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "deepseek/deepseek-chat-v3.1:free";
const SITE_URL = import.meta.env.VITE_SITE_URL || window.location.origin;
const SITE_NAME = import.meta.env.VITE_SITE_NAME || "Oxford Word Learning App";

/**
 * Validate a user's sentence using AI
 * @param {string} sentence - The user's sentence to validate
 * @param {string} targetWord - The word that should be used in the sentence
 * @param {string} wordDefinition - Definition of the word for context
 * @returns {Promise<Object>} Validation result with score and feedback
 */
export const validateSentenceWithAI = async (sentence, targetWord, wordDefinition = '') => {
  try {
    // Strict prompt requiring exact target word
    const prompt = `Evaluate if "${targetWord}" is used correctly in: "${sentence}"

JSON:
{"isCorrect":bool,"score":0-100,"points":0-25,"feedback":"short","correctedSentence":"example","errors":["error1","error2"]}

STRICT RULES:
1. Word "${targetWord}" MUST be in sentence → if missing = score 0, points 0
2. Incomplete = 0 points
3. Meaningless = 0 points
4. Wrong grammar = max 40 score
5. correctedSentence MUST:
   - Use "${targetWord}" correctly
   - Be COMPLETE sentence
   - Be MEANINGFUL
   - Natural English
   - No placeholders
6. Max 2-3 clear errors`;

    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": SITE_URL, // Your site URL
        "X-Title": SITE_NAME, // Your app name
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3, // Lower temperature for more consistent evaluation
        max_tokens: 150 // Reduced for fastest response
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the AI's response
    const aiResponse = data.choices?.[0]?.message?.content;
    
    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    // Parse the JSON response from AI
    let result;
    try {
      // Try to extract JSON from the response (in case AI added markdown)
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : aiResponse;
      result = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiResponse);
      throw new Error('Invalid AI response format');
    }

    // Validate the result has required fields
    if (typeof result.isCorrect !== 'boolean' || 
        typeof result.score !== 'number' || 
        typeof result.points !== 'number') {
      throw new Error('AI response missing required fields');
    }

    // Ensure score and points are within valid ranges
    result.score = Math.max(0, Math.min(100, result.score));
    result.points = Math.max(0, Math.min(25, result.points));

    return {
      success: true,
      data: {
        isCorrect: result.isCorrect,
        score: result.score,
        points: result.points,
        feedback: result.feedback || 'Sentence evaluated.',
        correctedSentence: result.correctedSentence || null,
        errors: Array.isArray(result.errors) ? result.errors : [],
        aiValidated: true
      }
    };

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

export default {
  validateSentenceWithAI,
  checkSentenceSimilarity,
  getAIQualityFeedback
};
