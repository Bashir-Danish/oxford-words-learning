import { useState } from 'react';
import { useVocabulary } from './hooks/useVocabulary';
import WordCardSlider from './components/WordCardSlider';
import VocabularyFilters from './components/VocabularyFilters';
import VocabularyStatistics from './components/VocabularyStatistics';

/**
 * AppNew - Modern Oxford 3000 Vocabulary Learning Application
 * Features: Card slider interface, progress tracking, filtering, and statistics
 */
function AppNew() {
  const [currentMode, setCurrentMode] = useState('learn'); // 'learn', 'filter', 'statistics'
  
  const {
    loading,
    error,
    currentWord,
    currentWordIndex,
    filteredVocabulary,
    filters,
    setFilters,
    markWordAsLearned,
    nextWord,
    previousWord,
    statistics
  } = useVocabulary();

  // Handle mode changes
  const handleModeChange = (mode) => {
    setCurrentMode(mode);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
          <h2 className="text-2xl font-bold text-gray-800">Loading Oxford 3000 Vocabulary...</h2>
          <p className="text-gray-600">Please wait while we prepare your learning experience</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl text-center space-y-4">
          <div className="text-6xl">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800">Failed to Load Vocabulary Data</h2>
          <p className="text-red-600 font-semibold">{error}</p>
          <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-300">
            <p className="text-sm text-gray-700">Please make sure the <code className="bg-gray-200 px-2 py-1 rounded">OXFORD_3000_ENHANCED_TEMPLATE.json</code> file is in the <code className="bg-gray-200 px-2 py-1 rounded">public</code> folder.</p>
            <button onClick={() => window.location.reload()} className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Compact Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-4xl mx-auto px-3 py-2 sm:px-4 sm:py-2">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center justify-center sm:justify-start gap-2">
                <span>📚</span>
                <span>Oxford 3000</span>
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm">Master Essential English Vocabulary</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <div className="bg-gradient-to-br from-green-400 to-green-600 text-white px-2 py-1 rounded-lg shadow-sm text-center min-w-[70px]">
                <span className="block text-lg font-bold">{statistics?.learnedWords || 0}</span>
                <span className="block text-[10px] opacity-90">Learned</span>
              </div>
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white px-2 py-1 rounded-lg shadow-sm text-center min-w-[70px]">
                <span className="block text-lg font-bold">{statistics?.notLearnedWords || 0}</span>
                <span className="block text-[10px] opacity-90">Remaining</span>
              </div>
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white px-2 py-1 rounded-lg shadow-sm text-center min-w-[70px]">
                <span className="block text-lg font-bold">{statistics?.percentComplete || 0}%</span>
                <span className="block text-[10px] opacity-90">Complete</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Compact Tab Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-3 sm:px-4">
          <div className="flex justify-center gap-1 py-2">
            <button
              className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentMode === 'learn'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => handleModeChange('learn')}
            >
              <span className="text-base">📖</span>
              <span>Learn</span>
            </button>
            <button
              className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentMode === 'filter'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => handleModeChange('filter')}
            >
              <span className="text-base">🔍</span>
              <span>Filter Words</span>
            </button>
            <button
              className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentMode === 'statistics'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => handleModeChange('statistics')}
            >
              <span className="text-base">📊</span>
              <span>Stats</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Compact Main Content */}
      <main className="max-w-4xl mx-auto px-3 py-4 sm:px-4 sm:py-6">
        {currentMode === 'learn' && (
          <div className="space-y-4">
            {/* Word Card Slider */}
            <WordCardSlider
              word={currentWord}
              onMarkAsLearned={markWordAsLearned}
              onNext={nextWord}
              onPrevious={previousWord}
              currentIndex={currentWordIndex}
              totalWords={filteredVocabulary.length}
            />

            {/* Compact Quick Stats Below Card */}
            <div className="w-fit inline-flex flex-wrap justify-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm mx-auto">
              <div className="flex items-center gap-1.5 text-gray-700 text-xs sm:text-sm">
                <span className="text-base">📚</span>
                <span className="font-medium">
                  {filteredVocabulary.length} words
                </span>
              </div>
              {filters.level !== 'all' && (
                <div className="flex items-center gap-1.5 text-gray-700 text-xs sm:text-sm">
                  <span className="text-base">🎯</span>
                  <span className="font-medium">
                    Level: {filters.level}
                  </span>
                </div>
              )}
              {filters.learned !== 'all' && (
                <div className="flex items-center gap-1.5 text-gray-700 text-xs sm:text-sm">
                  <span className="text-base">✓</span>
                  <span className="font-medium">
                    {filters.learned === 'learned' ? 'Learned' : 'Not learned'}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {currentMode === 'filter' && (
          <div>
            <VocabularyFilters
              filters={filters}
              onFiltersChange={setFilters}
              statistics={statistics}
            />
            <div className="text-center mt-4">
              <button
                onClick={() => handleModeChange('learn')}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Apply Filters & Start Learning
              </button>
            </div>
          </div>
        )}

        {currentMode === 'statistics' && (
          <div>
            <VocabularyStatistics statistics={statistics} />
          </div>
        )}
      </main>

      {/* Compact Footer */}
      <footer className="bg-white mt-8 py-4 shadow-md">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 text-center">
          <p className="text-gray-700 text-sm font-semibold">Oxford 3000 Vocabulary Learning App</p>
          <p className="text-gray-600 text-xs mt-1">Build your English vocabulary with confidence! 🚀</p>
        </div>
      </footer>
    </div>
  );
}

export default AppNew;
