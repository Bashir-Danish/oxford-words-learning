import { useState, useEffect } from 'react';
import {
  Eye,
  EyeOff,
  X,
  Check,
  Users,
  Flag,
  BookOpen,
  MessageSquare,
  Globe,
  FileText,
  RotateCcw,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import SpeakerButton from './SpeakerButton';

/**
 * WordCardSlider - Modern compact card component with slider and flip animation
 */
const WordCardSlider = ({ 
  word, 
  onMarkAsLearned, 
  onNext, 
  onPrevious, 
  currentIndex, 
  totalWords,
  loadingMore,
  loadingPrevious,
  hasMore,
  hasPrevious,
  totalDatabaseWords
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Ensure front side is shown and details are hidden when the word/index changes
  useEffect(() => {
    setIsFlipped(false);
    setShowDetails(false);
  }, [word?.id, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent navigation if user is typing in an input or textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      switch(e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          onPrevious && onPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          onNext && onNext();
          break;
        case 'ArrowUp':
        case 'ArrowDown':
          e.preventDefault();
          setIsFlipped(prev => !prev);
          break;
        case 'Enter':
          e.preventDefault();
          handleMarkAsLearned();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrevious, word]);

  if (!word) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-600">No words available with current filters</p>
      </div>
    );
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMarkAsLearned = () => {
    onMarkAsLearned(word.id, !word.learned);
  };

  const getLevelColor = (level) => {
    const colors = {
      'A1': 'bg-green-500',
      'A2': 'bg-blue-500',
      'B1': 'bg-orange-500',
      'B2': 'bg-red-500',
      'C1': 'bg-purple-600',
      'C2': 'bg-indigo-600'
    };
    return colors[level] || 'bg-gray-500';
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Details Button at the very top */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex justify-between text-xs text-gray-600">
          <span>Word {word?.wordId || currentIndex + 1} of {totalDatabaseWords || totalWords}</span>
          <span className="ml-2">{totalDatabaseWords ? Math.round((word?.wordId / totalDatabaseWords) * 100) : Math.round(((currentIndex + 1) / totalWords) * 100)}%</span>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 shadow-md"
        >
          {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>Details</span>
        </button>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${totalDatabaseWords ? (word?.wordId / totalDatabaseWords) * 100 : ((currentIndex + 1) / totalWords) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Card Container with Details Overlay */}
      <div className="perspective-1200 mb-3 relative">
        {/* Details Overlay - Appears on top of front card */}
        {showDetails && !isFlipped && (
          <div className="absolute inset-0 bg-white rounded-lg shadow-2xl p-4 z-20 overflow-y-auto animate-slideDown border-1 border-purple-500">
            <div className="space-y-3">
              <div className="flex justify-between items-center mb-3 border-b-2 border-purple-500 pb-2">
                <h4 className="text-base font-bold text-gray-800 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                  <span>Additional Information</span>
                </h4>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {word.synonyms && word.synonyms.length > 0 && (
                <div className="bg-green-50 rounded-lg p-3 border-l-4 border-green-500">
                  <p className="text-xs font-semibold text-green-900 mb-1">Synonyms:</p>
                  <p className="text-xs text-gray-700">{word.synonyms.join(', ')}</p>
                </div>
              )}
              
              {(word.opposites && word.opposites.length > 0) || (word.antonyms && word.antonyms.length > 0) && (
                <div className="bg-red-50 rounded-lg p-3 border-l-4 border-red-500">
                  <p className="text-xs font-semibold text-red-900 mb-1">Antonyms/Opposites:</p>
                  <p className="text-xs text-gray-700">{(word.opposites || word.antonyms || []).join(', ')}</p>
                </div>
              )}
              
              {word.collocations && word.collocations.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-500">
                  <p className="text-xs font-semibold text-blue-900 mb-1">Common Collocations:</p>
                  <ul className="list-disc list-inside text-xs text-gray-700">
                    {word.collocations.slice(0, 5).map((col, idx) => (
                      <li key={idx}>{col}</li>
                    ))}
                  </ul>
                </div>
              )}

              {word.relatedWords && word.relatedWords.length > 0 && (
                <div className="bg-purple-50 rounded-lg p-3 border-l-4 border-purple-500">
                  <p className="text-xs font-semibold text-purple-900 mb-1">Related Words:</p>
                  <p className="text-xs text-gray-700">{word.relatedWords.join(', ')}</p>
                </div>
              )}

              {word.family && word.family.length > 0 && (
                <div className="bg-orange-50 rounded-lg p-3 border-l-4 border-orange-500">
                  <p className="text-xs font-semibold text-orange-900 mb-1">Word Family:</p>
                  <p className="text-xs text-gray-700">{word.family.join(', ')}</p>
                </div>
              )}

              {word.wordFamily && word.wordFamily.length > 0 && (
                <div className="bg-orange-50 rounded-lg p-3 border-l-4 border-orange-500">
                  <p className="text-xs font-semibold text-orange-900 mb-1">Word Family:</p>
                  <p className="text-xs text-gray-700">{word.wordFamily.join(', ')}</p>
                </div>
              )}

              {!word.synonyms && !word.antonyms && !word.opposites && !word.collocations && !word.relatedWords && !word.wordFamily && !word.family && (
                <div className="text-center text-sm text-gray-500 py-4">
                  No additional details available for this word.
                </div>
              )}
            </div>
          </div>
        )}

        <div 
          className={`relative preserve-3d transition-transform duration-500 ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front of Card - Word Info */}
          <div 
            className="backface-hidden bg-white rounded-lg shadow-lg p-4 sm:p-6 min-h-[280px] sm:min-h-[320px] flex flex-col"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Header with level badge and learned status */}
            <div className="flex justify-between items-start mb-4 gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`${getLevelColor(word.level)} text-white text-xs font-bold px-2 py-1 rounded`}>
                  {word.level}
                </span>
                <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                  {word.pos}
                </span>
                {word.difficulty && (
                  <span className="text-xs text-gray-600 bg-yellow-100 px-2 py-1 rounded">
                    {word.difficulty}
                  </span>
                )}
              </div>
              {word.learned && (
                <Check className="text-green-600 w-5 h-5" />
              )}
            </div>

            {/* Word - Large and centered */}
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-3 mb-2">
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-800">
                  {word.word.charAt(0).toUpperCase() + word.word.slice(1)}
                </h2>
                <SpeakerButton 
                  text={word.word} 
                  size="md" 
                  variant="tertiary"
                />
              </div>
              {word.phonetic && (
                <p className="text-gray-500 text-base">{word.phonetic}</p>
              )}
            </div>

            {/* Word Family - if exists */}
            {word.family && word.family.length > 0 && (
              <div className="mb-4 bg-purple-50 rounded-lg p-3 border border-purple-200">
                <p className="text-xs font-semibold text-purple-900 mb-2 flex items-center justify-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>Word Family:</span>
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {word.family.map((familyWord, idx) => (
                    <span 
                      key={idx}
                      className="inline-block bg-white text-purple-700 px-3 py-1 rounded-full text-xs font-medium border border-purple-300 shadow-sm"
                    >
                      {familyWord}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Word Number */}
            <div className="text-center mb-4">
              <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">
                {word.wordId}
              </span>
            </div>

            {/* Additional Info Tags */}
            {(word.topic || word.americanEnglish || word.britishEnglish) && (
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                {word.topic && (
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
                    <BookOpen className="inline w-3.5 h-3.5 mr-1 align-[-2px]" /> {word.topic}
                  </span>
                )}
                {word.americanEnglish && (
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center gap-1">
                    <Flag className="w-3.5 h-3.5" /> US {word.americanEnglish}
                  </span>
                )}
                {word.britishEnglish && (
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded flex items-center gap-1">
                    <Flag className="w-3.5 h-3.5" /> UK {word.britishEnglish}
                  </span>
                )}
              </div>
            )}

            {/* Flip hint */}
            <div className="text-center mt-auto pt-1 border-t border-gray-200">
              <button 
                onClick={handleFlip}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors inline-flex items-center gap-1"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Flip to see definition & example</span>
              </button>
            </div>
          </div>

          {/* Back of Card - Definition & Example */}
          <div 
            className="absolute inset-0 backface-hidden bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg shadow-lg p-4 sm:p-6 rotate-y-180 min-h-[280px] sm:min-h-[320px]"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="h-full flex flex-col">
              {/* Word Title */}
              <div className="flex items-center justify-center gap-2 mb-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-center">{word.word}</h3>
                <SpeakerButton 
                  text={word.word} 
                  size="md" 
                  variant="secondary"
                />
              </div>
              <p className="text-xs text-center mb-2 font-medium">{word.persian}</p>
              
              
              {/* Main Content */}
              <div className="flex-1 space-y-2 overflow-y-auto">
                {/* Definition */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <p className="font-semibold mb-2 text-sm flex items-center gap-1"><BookOpen className="w-4 h-4" /> Definition:</p>
                  <p className="text-sm leading-relaxed">{word.definition}</p>
                </div>

                {/* Example */}
                {word.example && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="font-semibold text-sm flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" /> Example:
                      </p>
                      <SpeakerButton 
                        text={word.example} 
                        size="sm" 
                        variant="minimal"
                      />
                    </div>
                    <p className="text-sm leading-relaxed italic">"{word.example}"</p>
                  </div>
                )}

                {/* Other Translation (if available) */}
                {word.translation && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <p className="font-semibold mb-2 text-sm flex items-center gap-1"><Globe className="w-4 h-4" /> Translation:</p>
                    <p className="text-sm leading-relaxed">{word.translation}</p>
                  </div>
                )}

                {/* Additional Notes */}
                {word.notes && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <p className="font-semibold mb-2 text-sm flex items-center gap-1"><FileText className="w-4 h-4" /> Notes:</p>
                    <p className="text-sm leading-relaxed">{word.notes}</p>
                  </div>
                )}
              </div>

              {/* Flip back button */}
              <button 
                onClick={handleFlip}
                className="mt-1 pt-2 text-center w-full border-t border-white/30 text-sm font-medium hover:opacity-80 transition-opacity inline-flex items-center justify-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Flip back to word</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="text-center mb-2">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[10px] text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-[9px] font-mono">←</kbd>
            <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-[9px] font-mono">→</kbd>
            Navigate
          </span>
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-[9px] font-mono">↑</kbd>
            <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-[9px] font-mono">↓</kbd>
            Flip
          </span>
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-[9px] font-mono">Enter</kbd>
            Learn
          </span>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <button
          onClick={onPrevious}
          disabled={totalWords <= 1}
          className="flex items-center gap-1 px-3 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <button
          onClick={handleMarkAsLearned}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            word.learned
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
        >
          {word.learned ? (
            <span className="inline-flex items-center gap-1"><Check className="w-4 h-4" /> Learned</span>
          ) : (
            'Mark as Learned'
          )}
        </button>

        <button
          onClick={onNext}
          disabled={totalWords <= 1}
          className="flex items-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-semibold transition-colors"
        >
          <span className="hidden sm:inline">Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Loading Previous Indicator */}
      {loadingPrevious && (
        <div className="text-center py-2">
          <div className="inline-flex items-center gap-2 text-sm text-purple-600">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-600 border-t-transparent"></div>
            <span>Loading previous words...</span>
          </div>
        </div>
      )}
      
      {/* Loading More Indicator */}
      {loadingMore && (
        <div className="text-center py-2">
          <div className="inline-flex items-center gap-2 text-sm text-blue-600">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
            <span>Loading more words...</span>
          </div>
        </div>
      )}
      
      {/* End of vocabulary indicator */}
      {!hasMore && totalWords > 0 && (
        <div className="text-center py-2">
          <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            <Check className="w-4 h-4" />
            <span>You've reached the end of loaded vocabulary</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WordCardSlider;
