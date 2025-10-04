import { useState, useEffect } from 'react';
import { useVocabulary } from './hooks/useVocabulary';
import WordCardSlider from './components/WordCardSlider';
import PracticeSection from './components/PracticeSection';
import VocabularyFilters from './components/VocabularyFilters';
import VocabularyStatistics from './components/VocabularyStatistics';
import UserLoginSimple from './components/UserLoginSimple';
import UserProfileSimple from './components/UserProfileSimple';
import { authAPI, practiceAPI } from './services/api';
import { BookOpen, Search, BarChart3, AlertTriangle, Check, Target } from 'lucide-react';

/**
 * AppNew - Modern Oxford 3000 Vocabulary Learning Application
 * Features: Card slider interface, progress tracking, filtering, and statistics, multi-user support
 */
function AppNew() {
  // User state
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  
  const [currentMode, setCurrentMode] = useState('learn');
  
  // Check for logged in user on mount (verify token)
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await authAPI.verify();
        if (response.success && response.user) {
          setCurrentUser(response.user);
        }
      } catch (error) {
        console.log('No valid session found');
      } finally {
        setUserLoading(false);
      }
    };
    
    verifyToken();
  }, []);
  
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
    statistics,
    vocabularyData,
    setVocabularyData
  } = useVocabulary(currentUser?.id);

  // Handle mode changes
  const handleModeChange = (mode) => {
    setCurrentMode(mode);
  };
  
  // Handler for user login
  const handleUserLogin = (user) => {
    setCurrentUser(user);
  };

  // Handler for user logout/switch
  const handleUserLogout = () => {
    authAPI.logout();
    setCurrentUser(null);
  };

  // Handle award points for practice
  // Note: This is now handled directly in PracticeSection component
  // via practiceAPI.saveWordPractice()
  const handleAwardPoints = async (wordId, points, details = {}) => {
    // Optional: Update local state if needed
    console.log('✨ Points awarded:', { wordId, points, details });
  };

  // Show loading state while checking for user
  if (userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
          <h2 className="text-2xl font-bold text-gray-800">Loading...</h2>
        </div>
      </div>
    );
  }

  // Show login screen if no user is logged in
  if (!currentUser) {
    return <UserLoginSimple onLogin={handleUserLogin} />;
  }
  
  // Loading state for vocabulary data
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
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl text-center space-y-5">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
              <AlertTriangle className="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Failed to Load Vocabulary Data</h2>
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 text-red-800 px-4 py-3 rounded-lg">
            <p className="font-semibold">{error}</p>
          </div>
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-5 rounded-xl border-2 border-amber-300">
            <p className="text-sm text-gray-800 mb-4">Please make sure the <code className="bg-white px-2 py-1 rounded border border-gray-300 font-mono text-xs">OXFORD_3000_ENHANCED_TEMPLATE.json</code> file is in the <code className="bg-white px-2 py-1 rounded border border-gray-300 font-mono text-xs">public</code> folder.</p>
            <button onClick={() => window.location.reload()} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg">
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
        <div className="max-w-4xl mx-auto px-3 py-3 sm:px-4 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center justify-center sm:justify-start gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <span>Oxford {statistics.totalWords}</span>
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm">Master Essential English Vocabulary</p>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2">
              <UserProfileSimple
                currentUser={currentUser}
                onLogout={handleUserLogout}
                statistics={statistics}
              />
              <div className="flex flex-wrap justify-center gap-2">
                <div className="bg-gradient-to-br from-green-400 to-green-600 text-white px-2 py-0 rounded-lg shadow-sm text-center min-w-[70px]">
                  <span className="block text-sm font-bold">{statistics?.learnedWords || 0}</span>
                  <span className="block text-[10px] opacity-90">Learned</span>
                </div>
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white px-2 py-0 rounded-lg shadow-sm text-center min-w-[70px]">
                  <span className="block text-sm font-bold">{statistics?.notLearnedWords || 0}</span>
                  <span className="block text-[10px] opacity-90">Remaining</span>
                </div>
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white px-2 py-0 rounded-lg shadow-sm text-center min-w-[70px]">
                  <span className="block text-sm font-bold">{statistics?.percentComplete || 0}%</span>
                  <span className="block text-[10px] opacity-90">Complete</span>
                </div>
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
              <BookOpen className="w-4 h-4" />
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
              <Search className="w-4 h-4" />
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
              <BarChart3 className="w-4 h-4" />
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

            {/* Practice Section */}
            <PracticeSection 
              word={currentWord} 
              onAwardPoints={handleAwardPoints}
            />

            {/* Compact Quick Stats Below Card */}
            {/* <div className="flex  justify-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
              <div className="flex items-center gap-1.5 text-gray-700 text-xs sm:text-sm">
                <BookOpen className="w-4 h-4" />
                <span className="font-medium">
                  {filteredVocabulary.length} words
                </span>
              </div>
              {filters.level !== 'all' && (
                <div className="flex items-center gap-1.5 text-gray-700 text-xs sm:text-sm">
                  <Target className="w-4 h-4" />
                  <span className="font-medium">
                    Level: {filters.level}
                  </span>
                </div>
              )}
              {filters.learned !== 'all' && (
                <div className="flex items-center gap-1.5 text-gray-700 text-xs sm:text-sm">
                  <Check className="w-4 h-4" />
                  <span className="font-medium">
                    {filters.learned === 'learned' ? 'Learned' : 'Not learned'}
                  </span>
                </div>
              )}
            </div> */}
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
          <p className="text-gray-700 text-sm font-semibold">Oxford {statistics.totalWords} Vocabulary Learning App</p>
          <p className="text-gray-600 text-xs mt-1">Build your English vocabulary with confidence!</p>
        </div>
      </footer>
    </div>
  );
}

export default AppNew;
