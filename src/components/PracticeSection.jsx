import { useState, useEffect, useRef } from 'react';
import { PencilLine, Star, Lightbulb, Check, Eye, EyeOff, Trash2, BookOpen, Pencil, Sparkles } from 'lucide-react';
import { practiceAPI } from '../services/api';
import { validateSentenceWithAI, checkSentenceSimilarity, getAIQualityFeedback } from '../services/aiValidation';

/**
 * PracticeSection - Interactive practice area for writing example sentences
 * Features: textarea input, example comparison, word suggestion system, points scoring
 */
const PracticeSection = ({ word, onAwardPoints }) => {
  const [userSentence, setUserSentence] = useState('');
  const [showExample, setShowExample] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [showPointsAnimation, setShowPointsAnimation] = useState(false);
  const [previousPractice, setPreviousPractice] = useState(null);
  const [loadingPractice, setLoadingPractice] = useState(false);
  const [isValidatingAI, setIsValidatingAI] = useState(false);
  const [aiValidationResult, setAiValidationResult] = useState(null);
  
  // Refs
  const textareaRef = useRef(null);
  const practiceSectionRef = useRef(null);

  // Reset when word changes and load previous practice data
  useEffect(() => {
    setUserSentence('');
    setShowExample(false);
    setCurrentWordIndex(0);
    setEarnedPoints(0);
    setShowPointsAnimation(false);
    setAiValidationResult(null);
    setIsValidatingAI(false);
    
    // Load previous practice data for this word
    const loadPreviousPractice = async () => {
      if (!word?.id) return;
      
      setLoadingPractice(true);
      try {
        const response = await practiceAPI.getWordPractice(word.id);
        if (response.success && response.data && response.data.attempts > 0) {
          setPreviousPractice(response.data);
        } else {
          setPreviousPractice(null);
        }
      } catch (error) {
        console.error('Failed to load previous practice:', error);
        setPreviousPractice(null);
      } finally {
        setLoadingPractice(false);
      }
    };
    
    loadPreviousPractice();
  }, [word?.id]);

  // Add keyboard shortcuts
  // - SHIFT key: Toggle hints ON/OFF
  // - SPACE key: Focus textarea (if not already focused)
  // - CTRL key: Scroll practice section to top
  useEffect(() => {
    const handleKeyDown = (e) => {
      // CTRL key: Scroll to practice section and focus textarea
      if (e.key === 'Control' && !e.repeat) {
        e.preventDefault();
        if (practiceSectionRef.current) {
          // Smooth scroll to practice section
          practiceSectionRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
          // Focus textarea after a short delay
          setTimeout(() => {
            if (textareaRef.current) {
              textareaRef.current.focus();
            }
          }, 300);
        }
      }
      
      // SHIFT key: Toggle hints
      if (e.key === 'Shift' && !e.repeat) {
        e.preventDefault();
        setShowSuggestions(prev => !prev);
      }
      
      // SPACE key: Focus textarea if not already focused
      if (e.code === 'Space' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        // Focus the textarea using ref
        if (textareaRef.current) {
          textareaRef.current.focus();
          // Add a space at the end if there's existing text
          if (userSentence) {
            setUserSentence(prev => prev + ' ');
          }
        }
      }
      // If SPACE is pressed in textarea, let it work normally (no preventDefault)
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [userSentence]); // Add userSentence to dependency array

  if (!word) return null;

  // Get words from the PRACTICE example sentence for suggestions
  const practiceExample = word.practiceExample || word.example || '';
  const exampleWords = practiceExample ? practiceExample.split(' ') : [];
  const userWords = userSentence.trim().split(' ');

  // Calculate similarity or check if word is used
  const wordIsUsedInSentence = userSentence.toLowerCase().includes(word.word.toLowerCase());

  // Get next word suggestion
  const getNextWordSuggestion = () => {
    if (!showSuggestions || !exampleWords.length) return null;
    
    const lastUserWord = userWords[userWords.length - 1]?.trim().toLowerCase();
    
    // Find the matching word index in example
    let suggestionIndex = 0;
    for (let i = 0; i < exampleWords.length; i++) {
      const exampleWord = exampleWords[i].replace(/[.,!?;:"']/g, '').toLowerCase();
      if (exampleWord === lastUserWord) {
        suggestionIndex = i + 1;
        break;
      }
    }

    if (suggestionIndex < exampleWords.length) {
      return exampleWords[suggestionIndex];
    }
    
    return exampleWords[0];
  };

  const nextWordSuggestion = getNextWordSuggestion();

  const handleClearSentence = () => {
    setUserSentence('');
    setShowExample(false);
    setCurrentWordIndex(0);
    setAiValidationResult(null); // Clear AI feedback when clearing sentence
    setShowPointsAnimation(false); // Clear success animation
  };

  const handleUseSuggestion = () => {
    if (nextWordSuggestion) {
      const newSentence = userSentence + (userSentence.trim() ? ' ' : '') + nextWordSuggestion;
      setUserSentence(newSentence);
    }
  };

  const calculateCorrectness = () => {
    const sentence = userSentence.trim();
    if (!sentence || !practiceExample) return { correctWords: 0, totalWords: 0, percentage: 0 };
    
    // Normalize and split both sentences
    const normalizeWord = (w) => w.toLowerCase().replace(/[.,!?;:"']/g, '').trim();
    
    const exampleWordsNormalized = practiceExample.split(' ').map(normalizeWord).filter(w => w);
    const userWordsNormalized = sentence.split(' ').map(normalizeWord).filter(w => w);
    
    // Count how many words from example appear in user's sentence (in any order)
    let correctWords = 0;
    const usedUserWords = new Set();
    
    for (const exampleWord of exampleWordsNormalized) {
      for (let i = 0; i < userWordsNormalized.length; i++) {
        if (!usedUserWords.has(i) && userWordsNormalized[i] === exampleWord) {
          correctWords++;
          usedUserWords.add(i);
          break;
        }
      }
    }
    
    const totalWords = exampleWordsNormalized.length;
    const percentage = totalWords > 0 ? Math.round((correctWords / totalWords) * 100) : 0;
    
    return { correctWords, totalWords, percentage };
  };

  const calculatePoints = () => {
    const sentence = userSentence.trim();
    if (!sentence) return { points: 0, correctWords: 0, totalWords: 0 };
    
    // Get correctness data
    const { correctWords, totalWords, percentage } = calculateCorrectness();
    
    // Base points: 20 points for perfect match
    const maxPoints = 20;
    let points = 0;
    
    if (totalWords > 0) {
      // Calculate points based on correct word ratio
      points = Math.round((correctWords / totalWords) * maxPoints);
    }
    
    // Bonus points for using the target word correctly
    if (wordIsUsedInSentence) {
      points += 5;
    }
    
    // Bonus for proper grammar (capitalization and punctuation)
    if (/^[A-Z]/.test(sentence) && /[.!?]$/.test(sentence)) {
      points += 3;
    }
    
    return { points, correctWords, totalWords, percentage };
  };

  const getSentenceQuality = () => {
    const sentence = userSentence.trim();
    if (!sentence) return null;
    
    const { points, correctWords, totalWords, percentage } = calculatePoints();
    
    if (!wordIsUsedInSentence) {
      return {
        type: 'warning',
        message: `Use the word "${word.word}" in your sentence to earn points!`,
        points: 0,
        correctWords: 0,
        totalWords: 0
      };
    }
    
    if (percentage >= 80) {
      return {
        type: 'success',
        message: `Excellent! ${correctWords}/${totalWords} correct words. +${points} points!`,
        points,
        correctWords,
        totalWords
      };
    } else if (percentage >= 50) {
      return {
        type: 'info',
        message: `Good effort! ${correctWords}/${totalWords} correct. +${points} points!`,
        points,
        correctWords,
        totalWords
      };
    } else {
      return {
        type: 'warning',
        message: `Keep trying! ${correctWords}/${totalWords} correct. +${points} points.`,
        points,
        correctWords,
        totalWords
      };
    }
  };

  const quality = getSentenceQuality();

  const handleSubmitSentence = async () => {
    const sentence = userSentence.trim();
    
    if (!sentence || !wordIsUsedInSentence) {
      return;
    }

    // Check if user's sentence is similar to the existing example
    const similarity = checkSentenceSimilarity(sentence, practiceExample);
    
    // If sentence is too similar to example, use traditional scoring
    // If it's original (different from example), use AI validation
    if (!similarity.isOriginal && similarity.similarity >= 70) {
      // Use traditional scoring for sentences matching the example
      const result = calculatePoints();
      const { points, correctWords, totalWords, percentage } = result;
      
      // Always save attempt, even with 0 points
      await saveAndShowPoints(sentence, points, correctWords, totalWords, percentage, false, true);
    } else {
      // Use AI validation for original sentences
      setIsValidatingAI(true);
      setAiValidationResult(null);
      
      try {
        const validationResponse = await validateSentenceWithAI(
          sentence,
          word.word,
          word.definition || ''
        );
        
        if (validationResponse.success && validationResponse.data) {
          const aiResult = validationResponse.data;
          setAiValidationResult(aiResult);
          
          // Wait for AI result to be set before saving
          // Save to server but DON'T show success animation yet
          await saveAndShowPoints(
            sentence,
            aiResult.points, // Can be 0
            null, // No word matching for AI validation
            null,
            aiResult.score,
            true, // Mark as AI validated
            true  // Show success animation after save
          );
        } else {
          // Fallback to traditional scoring if AI fails
          console.warn('AI validation failed, using traditional scoring');
          const result = calculatePoints();
          const { points, correctWords, totalWords, percentage } = result;
          
          // Always save attempt
          await saveAndShowPoints(sentence, points, correctWords, totalWords, percentage, false, true);
        }
      } catch (error) {
        console.error('AI validation error:', error);
        // Fallback to traditional scoring
        const result = calculatePoints();
        const { points, correctWords, totalWords, percentage } = result;
        
        // Always save attempt
        await saveAndShowPoints(sentence, points, correctWords, totalWords, percentage, false, true);
      } finally {
        // Always turn off loading indicator after everything is done
        setIsValidatingAI(false);
      }
    }
  };

  // Helper function to save points and show animation
  const saveAndShowPoints = async (sentence, points, correctWords, totalWords, percentage, aiValidated = false, showAnimation = true) => {
    // Save to server via new practice API FIRST
    try {
      const response = await practiceAPI.saveWordPractice(word.id, {
        word: word.word,
        points: points,
        sentence: sentence, // Use passed sentence instead of state
        correctWords: correctWords,
        totalWords: totalWords,
        percentage: percentage,
        aiValidated: aiValidated
      });
      
      if (response.success) {
        // Update previous practice data
        setPreviousPractice(response.data);
        console.log('✅ Practice saved:', response.data);
      }
    } catch (error) {
      console.error('❌ Failed to save practice:', error);
      // Continue anyway - show success to user
    }
    
    // AFTER saving, set earned points and show animation if requested
    setEarnedPoints(points);
    // Only show success animation if points > 0 AND showAnimation is true
    if (points > 0 && showAnimation) {
      setShowPointsAnimation(true);
      
      // Hide animation after 3 seconds
      setTimeout(() => {
        setShowPointsAnimation(false);
      }, 3000);
    }
    
    // Call parent callback (optional - for backward compatibility)
    if (onAwardPoints) {
      onAwardPoints(word.id, points, {
        sentence: sentence, // Use passed sentence instead of state
        correctWords,
        totalWords,
        percentage,
        aiValidated
      });
    }
    
    // Clear the input after submission to prevent resubmission
    setUserSentence('');
    setShowExample(false);
    // DON'T clear AI result here - let user see the feedback!
    // It will be cleared when they submit next sentence or word changes
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-4" ref={practiceSectionRef}>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-md p-4 sm:p-5 border-2 border-blue-200">
        {/* Header with Points */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-base sm:text-lg font-bold text-gray-800 flex items-center gap-2">
            <PencilLine className="w-5 h-5" />
            <span>Practice Writing</span>
          </h3>
          <div className="flex gap-2 items-center">
            {/* Star Rating Display - 1-5 stars based on points */}
            <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-yellow-900 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-0.5 shadow-sm">
              {(() => {
                // Use points from practice data, fallback to word.practicePoints
                const totalPoints = previousPractice?.points || word.practicePoints || 0;
                // Calculate stars: 1 star per 5 points, max 5 stars
                const stars = Math.min(5, Math.max(0, Math.ceil(totalPoints / 5)));
                
                return (
                  <>
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-3.5 h-3.5 ${
                          index < stars
                            ? 'fill-yellow-900 text-yellow-900'
                            : 'text-yellow-700 opacity-30'
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-[10px]">({totalPoints})</span>
                  </>
                );
              })()}
            </div>
            <button
              onClick={() => setShowSuggestions(!showSuggestions)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
                showSuggestions
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-700'
              }`}
              title="Press SHIFT to toggle hints"
            >
              <Lightbulb className="w-3.5 h-3.5" /> 
              {showSuggestions ? 'Hints ON' : 'Hints OFF'}
              <span className="text-[10px] opacity-70 ml-1">(Shift)</span>
            </button>
          </div>
        </div>

        {/* Last Practice Score (if exists) - Reserve space during loading to prevent layout shift */}
        {previousPractice && previousPractice.attempts > 0 && (
          <div className="mb-3 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-lg p-3">
            <p className="text-xs font-semibold text-indigo-900 mb-1 flex items-center gap-1">
              <Star className="w-3.5 h-3.5" />
              Your Last Practice:
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <div className="text-xs text-gray-700 mb-1">
                  <span className="font-bold text-indigo-700">{previousPractice.correctWords}/{previousPractice.totalWords}</span> correct words
                  <span className="mx-1">•</span>
                  <span className="font-bold text-green-700">{previousPractice.percentage}%</span>
                  <span className="mx-1">•</span>
                  <span className="font-bold text-amber-700">{previousPractice.points} points</span>
                </div>
                {previousPractice.lastSentence && (
                  <div className="text-xs text-gray-600 italic">"{previousPractice.lastSentence}"</div>
                )}
                <div className="text-[10px] text-gray-500 mt-1">
                  Attempts: {previousPractice.attempts} • Last: {new Date(previousPractice.lastAttemptDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Toast/Notification */}
        {showPointsAnimation && earnedPoints > 0 && (
          <div className="mb-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-lg font-semibold text-sm shadow-lg flex items-center justify-between animate-slideDown">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold">Great job! +{earnedPoints} points earned!</div>
                <div className="text-xs opacity-90">Your sentence has been submitted successfully.</div>
              </div>
            </div>
            <Star className="w-6 h-6 text-yellow-300" />
          </div>
        )}

        {/* Instructions */}
        <div className="mb-3">
          <p className="text-xs sm:text-sm text-gray-700 mb-1">
            Write a sentence using the word <span className="font-bold text-blue-700">"{word.word}"</span>:
          </p>
          
        </div>

        {/* Textarea */}
        <div className="relative mb-3">
          <textarea
            ref={textareaRef}
            value={userSentence}
            onChange={(e) => {
              const newValue = e.target.value;
              setUserSentence(newValue);
              // Clear AI feedback when user starts typing a new sentence
              // (textarea was empty and now has text)
              if (aiValidationResult && userSentence === '' && newValue.length > 0) {
                setAiValidationResult(null);
                setShowPointsAnimation(false);
              }
            }}
            placeholder={`Type your sentence here using "${word.word}"...`}
            className="w-full px-3 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-sm resize-none"
            rows={3}
          />
          
          {/* Next Word Suggestion Overlay */}
          {showSuggestions && nextWordSuggestion && userSentence.trim() && (
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <span className="text-gray-400 text-sm italic opacity-60">
                Next: <span className="font-medium">{nextWordSuggestion}</span>
              </span>
              <button
                onClick={handleUseSuggestion}
                className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
              >
                Use
              </button>
            </div>
          )}
        </div>

        {/* AI Validation Loading Indicator */}
        {isValidatingAI && (
          <div className="mb-3 bg-gradient-to-r from-purple-100 to-indigo-100 border-2 border-purple-300 rounded-lg p-3 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-purple-600 animate-spin" />
            <div>
              <p className="text-sm font-semibold text-purple-900">AI is checking your sentence...</p>
              <p className="text-xs text-purple-700">Please wait</p>
            </div>
          </div>
        )}

        {/* AI Validation Result */}
        {aiValidationResult && !isValidatingAI && (
          <div className={`mb-3 rounded-lg p-3 border-2 ${
            aiValidationResult.isCorrect
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300'
              : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-300'
          }`}>
            <div className="flex items-start gap-2">
              <Sparkles className={`w-5 h-5 mt-0.5 ${
                aiValidationResult.isCorrect ? 'text-green-600' : 'text-red-600'
              }`} />
              <div className="flex-1">
                <p className="text-sm font-semibold mb-1 ${
                  aiValidationResult.isCorrect ? 'text-green-900' : 'text-red-900'
                }">AI Evaluation Result:</p>
                <p className="text-xs mb-2 ${
                  aiValidationResult.isCorrect ? 'text-green-800' : 'text-red-800'
                }">{aiValidationResult.feedback}</p>
                <div className="flex items-center gap-3 text-xs mb-2">
                  <span className={`font-bold ${
                    aiValidationResult.isCorrect ? 'text-green-700' : 'text-red-700'
                  }`}>Score: {aiValidationResult.score}/100</span>
                  {aiValidationResult.isCorrect && (
                    <span className="font-bold text-amber-700">Points: +{aiValidationResult.points}</span>
                  )}
                </div>
                
                {/* Show corrected sentence FIRST if wrong */}
                {aiValidationResult.correctedSentence && !aiValidationResult.isCorrect && (
                  <div className="mb-2 p-2 bg-blue-50 rounded border border-blue-300">
                    <p className="font-semibold mb-1 text-xs text-blue-900">✅ Correct:</p>
                    <p className="text-xs text-blue-800 font-medium">"{aiValidationResult.correctedSentence}"</p>
                  </div>
                )}
                
                {/* Then show errors */}
                {aiValidationResult.errors && aiValidationResult.errors.length > 0 && (
                  <div className="text-xs text-red-700">
                    <p className="font-semibold mb-1">Issues found:</p>
                    <ul className="list-disc list-inside space-y-0.5">
                      {aiValidationResult.errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Word Count & Quality Feedback */}
        <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
          <span className="text-xs text-gray-600">
            {userWords.filter(w => w.trim()).length} words
            {wordIsUsedInSentence && <span className="ml-2 text-green-600 font-semibold inline-flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Word used!</span>}
          </span>
          
          {!aiValidationResult && quality && (
            <div className={`text-xs px-3 py-2 rounded-lg font-medium shadow-sm ${
              quality.type === 'success' ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-300' :
              quality.type === 'warning' ? 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-300' :
              'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-300'
            }`}>
              {quality.message}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mb-3">
          <button
            onClick={handleSubmitSentence}
            disabled={!wordIsUsedInSentence || userSentence.trim().length === 0 || isValidatingAI}
            className="flex-1 min-w-[120px] px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-1"
          >
            {isValidatingAI ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Validating...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Submit & Get Points</span>
              </>
            )}
          </button>
          <button
            onClick={() => setShowExample(!showExample)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors inline-flex items-center gap-1"
          >
            {showExample ? (<><EyeOff className="w-4 h-4" /> Hide</>) : (<><Eye className="w-4 h-4" /> Example</>)}
          </button>
          <button
            onClick={handleClearSentence}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg text-sm font-semibold transition-colors inline-flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" /> Clear
          </button>
        </div>

        {/* Example Sentence Display */}
        {showExample && practiceExample && (
          <div className="bg-white rounded-lg p-4 border-l-4 border-green-500 animate-slideDown">
            <p className="text-xs font-semibold text-green-900 mb-2 flex items-center gap-1"><BookOpen className="w-4 h-4" /> Practice Example from Oxford:</p>
            <p className="text-sm text-gray-800 italic leading-relaxed">"{practiceExample}"</p>
            
            {/* Comparison */}
            {userSentence.trim() && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs font-semibold text-blue-900 mb-2 flex items-center gap-1"><Pencil className="w-4 h-4" /> Your Sentence:</p>
                <p className="text-sm text-gray-800 leading-relaxed">"{userSentence}"</p>
              </div>
            )}
          </div>
        )}

        {/* Suggestion Hints Section */}
        {showSuggestions && exampleWords.length > 0 && (
          <div className="mt-3 bg-blue-100 rounded-lg p-3 border border-blue-300">
            <p className="text-xs font-semibold text-blue-900 mb-2 flex items-center gap-1">
              <Lightbulb className="w-4 h-4" />
              <span>Word Suggestions (from example):</span>
            </p>
            <div className="flex flex-wrap gap-1.5">
              {exampleWords.slice(0, 10).map((w, idx) => {
                const cleanWord = w.replace(/[.,!?;:"']/g, '');
                const isUsed = userSentence.toLowerCase().includes(cleanWord.toLowerCase());
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      const newSentence = userSentence + (userSentence.trim() ? ' ' : '') + cleanWord;
                      setUserSentence(newSentence);
                    }}
                    className={`px-2 py-1 rounded text-xs transition-all ${
                      isUsed
                        ? 'bg-green-200 text-green-800 opacity-50 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-blue-200 cursor-pointer'
                    }`}
                    disabled={isUsed}
                  >
                    {cleanWord}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tips & Scoring Guide */}
        <div className="mt-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-3 border-2 border-amber-300">
          <p className="text-xs font-semibold text-amber-900 mb-2 flex items-center gap-1">
            <Star className="w-4 h-4" />
            Scoring System:
          </p>
          <ul className="text-xs text-gray-700 space-y-1">
            <li>• <span className="font-bold text-purple-700">✨ Write your own sentence:</span> AI will check it and award <span className="font-bold text-green-700">up to 25 points</span></li>
            <li>• Match example words: <span className="font-bold text-blue-700">Up to 20 points</span> (based on correctness)</li>
            <li>• Use the target word: <span className="font-bold text-green-700">+5 bonus points</span></li>
            <li>• Proper grammar (capitalize & punctuate): <span className="font-bold text-indigo-700">+3 bonus points</span></li>
            <li>• <span className="font-bold text-purple-700">Tip:</span> Be creative! Original sentences get AI validation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PracticeSection;
