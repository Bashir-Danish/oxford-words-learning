import React from 'react';
import { useVocabularyWithSync } from '../hooks/useVocabularyWithSync';

/**
 * Example component showing how to use the server-synced vocabulary hook
 * This replaces localStorage-only storage with database persistence
 */
function LearnedWordsExample({ userId }) {
  const {
    vocabularyData,
    loading,
    error,
    syncing,
    lastSyncTime,
    currentWord,
    markWordAsLearned,
    syncToServer,
    nextWord,
    previousWord,
    statistics,
    isServerSync,
  } = useVocabularyWithSync(userId);

  // Handle marking word as learned
  const handleMarkLearned = async (wordId, isLearned) => {
    await markWordAsLearned(wordId, isLearned);
    // UI updates immediately, sync happens in background
  };

  // Handle manual sync (useful for migration or after being offline)
  const handleManualSync = async () => {
    try {
      const result = await syncToServer();
      alert(`Successfully synced ${result.synced} words to server!`);
    } catch (err) {
      alert('Sync failed: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Loading vocabulary...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!currentWord) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">No words found</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Sync Status Banner */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isServerSync ? (
              <>
                <span className="text-green-600">✓</span>
                <span className="font-medium">Server Sync Active</span>
                {syncing && <span className="text-sm text-gray-600">(Syncing...)</span>}
              </>
            ) : (
              <>
                <span className="text-yellow-600">⚠</span>
                <span className="font-medium">Offline Mode (localStorage only)</span>
              </>
            )}
          </div>
          
          {lastSyncTime && (
            <span className="text-sm text-gray-600">
              Last sync: {lastSyncTime.toLocaleTimeString()}
            </span>
          )}
        </div>
        
        {isServerSync && (
          <button
            onClick={handleManualSync}
            disabled={syncing}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {syncing ? 'Syncing...' : 'Manual Sync'}
          </button>
        )}
      </div>

      {/* Statistics Dashboard */}
      {statistics && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">Total Words</div>
            <div className="text-3xl font-bold">{statistics.totalWords}</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">Learned</div>
            <div className="text-3xl font-bold text-green-600">
              {statistics.learnedWords}
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">Progress</div>
            <div className="text-3xl font-bold text-blue-600">
              {statistics.percentComplete}%
            </div>
          </div>
        </div>
      )}

      {/* Word Card */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {currentWord.level}
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
              {currentWord.pos}
            </span>
          </div>
          
          {/* Learned Toggle */}
          <button
            onClick={() => handleMarkLearned(currentWord.id, !currentWord.learned)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentWord.learned
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {currentWord.learned ? '✓ Learned' : 'Mark as Learned'}
          </button>
        </div>

        <h2 className="text-4xl font-bold mb-4">{currentWord.word}</h2>
        
        <div className="mb-4">
          <p className="text-lg text-gray-700">{currentWord.definition}</p>
        </div>

        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Example:</p>
          <p className="text-gray-800 italic">"{currentWord.example}"</p>
        </div>

        {currentWord.synonyms && currentWord.synonyms.length > 0 && (
          <div className="mb-4">
            <span className="text-sm text-gray-600">Synonyms: </span>
            <span className="text-gray-800">
              {currentWord.synonyms.join(', ')}
            </span>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center pt-4 border-t">
          <button
            onClick={previousWord}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
          >
            ← Previous
          </button>
          
          <button
            onClick={nextWord}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Learning Progress by Level */}
      {statistics && statistics.byLevel && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4">Progress by Level</h3>
          <div className="space-y-4">
            {Object.entries(statistics.byLevel).map(([level, data]) => (
              <div key={level}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{level}</span>
                  <span className="text-sm text-gray-600">
                    {data.learned} / {data.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${data.percentComplete}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sync Status Footer */}
      {syncing && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
          Syncing to server...
        </div>
      )}
    </div>
  );
}

export default LearnedWordsExample;
