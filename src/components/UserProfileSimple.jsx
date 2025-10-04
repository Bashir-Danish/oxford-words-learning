import { useState } from 'react';
import {
  UserRound,
  ChevronDown,
  LogOut,
  Trophy,
  BookOpen,
  PencilLine,
  Star
} from 'lucide-react';

function UserProfileSimple({ currentUser, onLogout, statistics }) {
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    setShowMenu(false);
    onLogout();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString();
  };

  if (!currentUser) return null;

  return (
    <div className="relative z-50">
      <div 
        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full cursor-pointer transition-all duration-200 font-medium hover:bg-gray-50 hover:border-indigo-400 hover:shadow-sm"
        onClick={() => setShowMenu(!showMenu)}
      >
        <UserRound className="w-5 h-5 text-indigo-600" />
        <span className="text-sm text-gray-800 max-w-[80px] sm:max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">
          {currentUser.username}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showMenu ? 'rotate-180' : ''}`} />
      </div>

      {showMenu && (
        <>
          <div 
            className="fixed inset-0 z-[100]" 
            onClick={() => setShowMenu(false)}
          />
           {/* Mobile: Fixed centered modal, Desktop: Absolute dropdown */}
          <div className="fixed sm:absolute top-1/2 sm:top-[calc(100%+8px)] left-1/2 sm:left-auto right-auto sm:right-0 -translate-x-1/2 sm:translate-x-0 -translate-y-1/2 sm:translate-y-0 bg-white border border-gray-200 rounded-xl shadow-2xl w-[90vw] max-w-[320px] sm:w-auto sm:min-w-[280px] sm:max-w-[400px] z-[101] animate-slideDown pointer-events-auto">
            {/* User Info */}
            <div className="p-3 sm:p-4 text-center border-b border-gray-200">
              <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                <UserRound className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-600" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-0.5 truncate px-2">{currentUser.username}</h3>
              <p className="text-[11px] sm:text-xs text-gray-500 truncate px-2">
                Member since {currentUser.createdAt ? new Date(currentUser.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'}
              </p>
            </div>

            {/* Statistics - Using dynamic vocabulary stats + server user data */}
            <div className="p-3 grid grid-cols-2 gap-2 border-b border-gray-200">
              <div className="flex items-center gap-1.5 p-2 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg border border-amber-200">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0" />
                <div className="leading-tight min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-amber-900 truncate">
                    {currentUser.totalPoints || 0}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-amber-700 truncate">Points</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 p-2 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                <div className="leading-tight min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-green-900 truncate">
                    {statistics?.learnedWords || currentUser.totalWordsLearned || 0}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-green-700 truncate">Learned</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <PencilLine className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                <div className="leading-tight min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-blue-900 truncate">
                    {currentUser.totalPracticeAttempts || 0}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-blue-700 truncate">Practice</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 p-2 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
                <div className="leading-tight min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-purple-900 truncate">
                    {statistics?.percentComplete || 0}%
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-purple-700 truncate">Complete</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-2 sm:p-3">
              <button 
                type="button"
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-sm hover:shadow-md"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" /> <span>Logout</span>
              </button>
            </div>

            {/* Footer */}
            <div className="px-3 py-2 text-center border-t border-gray-200 bg-gray-50 rounded-b-xl">
              <small className="text-gray-500 text-[10px] sm:text-[11px]">
                Last active: {formatDate(currentUser.lastActive)}
              </small>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserProfileSimple;
