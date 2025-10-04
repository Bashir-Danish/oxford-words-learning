import { BarChart3, Check, Circle, BookOpen, Target, Sprout, Leaf, Trees, Trophy, Lightbulb } from 'lucide-react';

/**
 * VocabularyStatistics - Displays comprehensive learning statistics and progress
 */
const VocabularyStatistics = ({ statistics }) => {
  if (!statistics) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-lg text-gray-600">Loading statistics...</p>
      </div>
    );
  }

  const { totalWords, learnedWords, notLearnedWords, percentComplete, byLevel } = statistics;

  const getLevelColor = (level) => {
    const colors = {
      'a1': 'bg-green-500',
      'a2': 'bg-blue-500',
      'b1': 'bg-orange-500',
      'b2': 'bg-red-500',
      'c1': 'bg-purple-600',
      'c2': 'bg-indigo-600'
    };
    return colors[level.toLowerCase()] || 'bg-gray-500';
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-fadeIn">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4 flex items-center justify-center gap-2">
        <BarChart3 className="w-6 h-6 text-indigo-600" /> Your Progress
      </h2>

      {/* Overall Progress */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Overall Progress</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40">
            <svg viewBox="0 0 120 120" className="transform -rotate-90">
              <circle
                className="stroke-gray-200"
                cx="60"
                cy="60"
                r="54"
                strokeWidth="6"
                fill="none"
              />
              <circle
                className="stroke-green-500 transition-all duration-1000"
                cx="60"
                cy="60"
                r="54"
                strokeWidth="6"
                fill="none"
                strokeDasharray={`${339.292 * (percentComplete / 100)} 339.292`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl sm:text-3xl font-bold text-gray-800">{percentComplete}%</span>
              <span className="text-xs text-gray-600">Complete</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="text-center bg-gradient-to-br from-green-50 to-green-100 p-3 sm:p-4 rounded-lg min-w-[90px]">
              <span className="block text-2xl font-bold text-green-700">{learnedWords}</span>
              <span className="block text-xs text-green-600 mt-0.5">Learned</span>
            </div>
            <div className="text-center bg-gradient-to-br from-orange-50 to-orange-100 p-3 sm:p-4 rounded-lg min-w-[90px]">
              <span className="block text-2xl font-bold text-orange-700">{notLearnedWords}</span>
              <span className="block text-xs text-orange-600 mt-0.5">Remaining</span>
            </div>
            <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4 rounded-lg min-w-[90px]">
              <span className="block text-2xl font-bold text-blue-700">{totalWords}</span>
              <span className="block text-xs text-blue-600 mt-0.5">Total</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress by Level */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Progress by CEFR Level</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(byLevel)
            .sort((a, b) => {
              const rank = { a1: 0, a2: 1, b1: 2, b2: 3, c1: 4, c2: 5 };
              const ra = rank[a[0].toLowerCase()] ?? 999;
              const rb = rank[b[0].toLowerCase()] ?? 999;
              return ra - rb; // left → right: easy → hard
            })
            .map(([level, stats]) => (
              <div key={level} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-white font-bold text-xs ${getLevelColor(level)}`}>{level}</span>
                  <span className="text-lg sm:text-xl font-bold text-gray-700">{stats.percentComplete}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <div 
                    className={`h-full ${getLevelColor(level)} transition-all duration-500`}
                    style={{ width: `${stats.percentComplete}%` }}
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 text-[10px] text-gray-600">
                  <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded inline-flex items-center gap-1"><Check className="w-3 h-3" /> {stats.learned}</span>
                  <span className="bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded inline-flex items-center gap-1"><Circle className="w-3 h-3" /> {stats.notLearned}</span>
                  <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded inline-flex items-center gap-1"><BookOpen className="w-3 h-3" /> {stats.total}</span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Learning Milestones */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><Target className="w-5 h-5" /> Milestones</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          <div className={`relative p-3 sm:p-4 rounded-lg text-center transition-all ${
            learnedWords >= 10 
              ? 'bg-gradient-to-br from-green-400 to-green-600 text-white shadow-md' 
              : 'bg-gray-100 text-gray-600 border border-dashed border-gray-300'
          }`}>
            <div className="flex items-center justify-center mb-2"><Sprout className="w-8 h-8" /></div>
            <div className="text-xs sm:text-sm font-bold mb-0.5">Getting Started</div>
            <div className="text-[10px] sm:text-xs mb-1 opacity-90">Learn 10 words</div>
            <div className="text-lg sm:text-xl font-bold">{Math.min(learnedWords, 10)}/10</div>
            {learnedWords >= 10 && <div className="absolute top-1 right-1 text-green-600"><Check className="w-4 h-4" /></div>}
          </div>
          <div className={`relative p-3 sm:p-4 rounded-lg text-center transition-all ${
            learnedWords >= 50 
              ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-md' 
              : 'bg-gray-100 text-gray-600 border border-dashed border-gray-300'
          }`}>
            <div className="flex items-center justify-center mb-2"><Leaf className="w-8 h-8" /></div>
            <div className="text-xs sm:text-sm font-bold mb-0.5">Vocabulary Builder</div>
            <div className="text-[10px] sm:text-xs mb-1 opacity-90">Learn 50 words</div>
            <div className="text-lg sm:text-xl font-bold">{Math.min(learnedWords, 50)}/50</div>
            {learnedWords >= 50 && <div className="absolute top-1 right-1 text-green-600"><Check className="w-4 h-4" /></div>}
          </div>
          <div className={`relative p-3 sm:p-4 rounded-lg text-center transition-all ${
            learnedWords >= 100 
              ? 'bg-gradient-to-br from-purple-400 to-purple-600 text-white shadow-md' 
              : 'bg-gray-100 text-gray-600 border border-dashed border-gray-300'
          }`}>
            <div className="flex items-center justify-center mb-2"><Trees className="w-8 h-8" /></div>
            <div className="text-xs sm:text-sm font-bold mb-0.5">Word Master</div>
            <div className="text-[10px] sm:text-xs mb-1 opacity-90">Learn 100 words</div>
            <div className="text-lg sm:text-xl font-bold">{Math.min(learnedWords, 100)}/100</div>
            {learnedWords >= 100 && <div className="absolute top-1 right-1 text-green-600"><Check className="w-4 h-4" /></div>}
          </div>
          <div className={`relative p-3 sm:p-4 rounded-lg text-center transition-all ${
            learnedWords >= 500 
              ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-md' 
              : 'bg-gray-100 text-gray-600 border border-dashed border-gray-300'
          }`}>
            <div className="flex items-center justify-center mb-2"><Trophy className="w-8 h-8" /></div>
            <div className="text-xs sm:text-sm font-bold mb-0.5">Oxford Expert</div>
            <div className="text-[10px] sm:text-xs mb-1 opacity-90">Learn 500 words</div>
            <div className="text-lg sm:text-xl font-bold">{Math.min(learnedWords, 500)}/500</div>
            {learnedWords >= 500 && <div className="absolute top-1 right-1 text-green-600"><Check className="w-4 h-4" /></div>}
          </div>
        </div>
      </div>

      {/* Learning Tips */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg shadow-sm p-4 sm:p-6 border border-blue-200">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <span>Learning Tips</span>
        </h3>
        <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold mt-1">•</span>
            <span>
              {learnedWords === 0 ? (
                <strong>Start with A1 level words - they are the foundation!</strong>
              ) : learnedWords < 50 ? (
                <strong>Great start! Try to learn 5-10 words per day consistently.</strong>
              ) : learnedWords < 200 ? (
                <strong>You're making progress! Review words you've learned regularly.</strong>
              ) : (
                <strong>Excellent work! Keep challenging yourself with higher levels!</strong>
              )}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold mt-1">•</span>
            <span>Use each new word in 3-5 sentences to remember it better.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold mt-1">•</span>
            <span>Review learned words weekly to maintain long-term memory.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold mt-1">•</span>
            <span>Focus on one level at a time before moving to the next.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VocabularyStatistics;
