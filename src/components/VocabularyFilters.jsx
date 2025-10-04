import { Search, Check } from 'lucide-react';

/**
 * VocabularyFilters - Component for filtering vocabulary by level, learned status, and search
 */
const VocabularyFilters = ({ filters, onFiltersChange, statistics }) => {
  const handleLevelChange = (level) => {
    onFiltersChange({ ...filters, level });
  };

  const handleLearnedChange = (learned) => {
    onFiltersChange({ ...filters, learned });
  };

  const handleSearchChange = (e) => {
    onFiltersChange({ ...filters, searchTerm: e.target.value });
  };

  const clearFilters = () => {
    onFiltersChange({ level: 'all', learned: 'all', searchTerm: '' });
  };

  const hasActiveFilters = filters.level !== 'all' || filters.learned !== 'all' || filters.searchTerm !== '';

  // Get all available levels from statistics, sorted
  const availableLevels = statistics?.byLevel 
    ? Object.keys(statistics.byLevel).sort((a, b) => {
        const order = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
        return order.indexOf(a) - order.indexOf(b);
      })
    : [];

  const getLevelColor = (level) => {
    const colors = {
      'a1': 'bg-green-500 hover:bg-green-600',
      'a2': 'bg-blue-500 hover:bg-blue-600',
      'b1': 'bg-orange-500 hover:bg-orange-600',
      'b2': 'bg-red-500 hover:bg-red-600',
      'c1': 'bg-purple-600 hover:bg-purple-700',
      'c2': 'bg-indigo-600 hover:bg-indigo-700'
    };
    return colors[level.toLowerCase()] || 'bg-gray-500 hover:bg-gray-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
          <Search className="w-4 h-4" />
          <span>Filter Words</span>
        </h3>
        {hasActiveFilters && (
          <button 
            className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-red-600 transition-colors"
            onClick={clearFilters}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Search</label>
        <input
          type="text"
          className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="Search words, definitions, or examples..."
          value={filters.searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Level Filter */}
      <div className="mb-4">
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Level (CEFR)</label>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          <button
            className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-all ${
              filters.level === 'all'
                ? 'bg-gray-700 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => handleLevelChange('all')}
          >
            All
            {statistics && <span className="ml-1 opacity-75 text-[10px]">({statistics.totalWords})</span>}
          </button>
          {availableLevels.map(level => (
            <button
              key={level}
              className={`px-3 py-1.5 rounded-lg font-semibold text-xs text-white transition-all ${
                filters.level === level
                  ? `${getLevelColor(level)} shadow-md`
                  : `${getLevelColor(level)} opacity-70`
              }`}
              onClick={() => handleLevelChange(level)}
            >
              {level}
              {statistics?.byLevel?.[level] && (
                <span className="ml-1 opacity-90 text-[10px]">({statistics.byLevel[level].total})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Learned Status Filter */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Learning Status</label>
        <div className="flex flex-wrap gap-2">
          <button
            className={`flex-1 min-w-[100px] px-3 py-2 rounded-lg font-semibold text-xs transition-all ${
              filters.learned === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
            }`}
            onClick={() => handleLearnedChange('all')}
          >
            All
            {statistics && <span className="ml-1 opacity-90 text-[10px]">({statistics.totalWords})</span>}
          </button>
          <button
            className={`flex-1 min-w-[100px] px-3 py-2 rounded-lg font-semibold text-xs transition-all ${
              filters.learned === 'notLearned'
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
            }`}
            onClick={() => handleLearnedChange('notLearned')}
          >
            Not Learned
            {statistics && <span className="ml-1 opacity-90 text-[10px]">({statistics.notLearnedWords})</span>}
          </button>
          <button
            className={`flex-1 min-w-[100px] px-3 py-2 rounded-lg font-semibold text-xs transition-all ${
              filters.learned === 'learned'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
            }`}
            onClick={() => handleLearnedChange('learned')}
          >
            <span className="inline-flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Learned</span>
            {statistics && <span className="ml-1 opacity-90 text-[10px]">({statistics.learnedWords})</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VocabularyFilters;
