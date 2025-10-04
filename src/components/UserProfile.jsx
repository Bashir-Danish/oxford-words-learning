import { useState, useEffect } from 'react';
import {
  UserRound,
  ChevronDown,
  LogOut,
  Trash2,
  RefreshCcw,
  Trophy,
  BookOpen,
  PencilLine,
  Star
} from 'lucide-react';
import { 
  getAllUsers, 
  deleteUser, 
  logoutUser, 
  calculateUserStatistics,
  updateUserStats,
  exportUsersToFile
} from '../utils/userManager';
import { exportUserDataAsFile, importUserDataFromFile, syncOPFSToLocal, syncLocalToOPFS, pickAndOverwriteUsers } from '../utils/storageSync';
import { getAllUsersAsync } from '../utils/userManager';

function UserProfile({ currentUser, onSwitchUser, onLogout }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const userStats = calculateUserStatistics(currentUser.id);
      setStats(userStats);
      
      // Update user stats in storage
      updateUserStats(currentUser.id, userStats);
    }
  }, [currentUser]);

  const handleLogout = () => {
    logoutUser();
    setShowMenu(false);
    onLogout();
  };

  const handleDeleteAccount = () => {
    const allUsers = getAllUsers();
    
    if (allUsers.length === 1) {
      alert('Cannot delete the only user account!');
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${currentUser.username}'s profile? This action cannot be undone!`)) {
      deleteUser(currentUser.id);
      logoutUser();
      setShowMenu(false);
      onLogout();
    }
  };

  const formatDate = (dateString) => {
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
    <div className="relative z-40">
      <div 
        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full cursor-pointer transition-all duration-200 font-medium hover:bg-gray-50 hover:border-indigo-400 hover:shadow-sm"
        onClick={() => setShowMenu(!showMenu)}
      >
        <UserRound className="w-5 h-5 text-indigo-600" />
        <span className="text-sm text-gray-800 max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">{currentUser.username}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showMenu ? 'rotate-180' : ''}`} />
      </div>

      {showMenu && (
        <>
          <div 
            className="fixed inset-0 z-30" 
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute top-[calc(100%+8px)] right-0 bg-white border border-gray-200 rounded-xl shadow-xl min-w-[280px] max-w-[90vw] z-50 animate-slideDown pointer-events-auto">
            <div className="p-4 text-center border-b border-gray-200">
              <div className="mx-auto w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                <UserRound className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-0.5">{currentUser.username}</h3>
              <p className="text-xs text-gray-500">Member since {new Date(currentUser.createdAt).toLocaleDateString()}</p>
            </div>

            {stats && (
              <div className="p-3 grid grid-cols-2 gap-2 border-b border-gray-200">
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <div className="leading-tight">
                    <div className="text-sm font-bold text-gray-900">{stats.totalPoints}</div>
                    <div className="text-[11px] text-gray-500">Total Points</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <BookOpen className="w-5 h-5 text-indigo-500" />
                  <div className="leading-tight">
                    <div className="text-sm font-bold text-gray-900">{stats.totalWordsLearned}</div>
                    <div className="text-[11px] text-gray-500">Words Learned</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <PencilLine className="w-5 h-5 text-blue-500" />
                  <div className="leading-tight">
                    <div className="text-sm font-bold text-gray-900">{stats.totalPracticeAttempts}</div>
                    <div className="text-[11px] text-gray-500">Practice Sessions</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <div className="leading-tight">
                    <div className="text-sm font-bold text-gray-900">{stats.averagePoints}</div>
                    <div className="text-[11px] text-gray-500">Avg Points/Word</div>
                  </div>
                </div>
              </div>
            )}

            <div className="p-3 flex flex-col gap-1.5">
              <button 
                type="button"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors bg-gray-50 text-gray-800 hover:bg-indigo-50 hover:text-indigo-600"
                onClick={() => {
                  setShowMenu(false);
                  onSwitchUser();
                }}
              >
                <RefreshCcw className="w-5 h-5" /> Switch User
              </button>
              
              <button 
                type="button"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors bg-gray-50 text-gray-800 hover:bg-orange-50 hover:text-orange-600"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" /> Logout
              </button>

              {/* Backup & Restore */}
              <div className="h-px bg-gray-200 my-1" />
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors bg-gray-50 text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                onClick={() => {
                  exportUserDataAsFile();
                }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v12"/><path d="m8 11 4 4 4-4"/><path d="M20 21H4"/></svg>
                Backup to JSON
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors bg-gray-50 text-gray-800 hover:bg-emerald-50 hover:text-emerald-600"
                onClick={() => exportUsersToFile()}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v12"/><path d="m8 11 4 4 4-4"/><path d="M20 21H4"/></svg>
                Export Users to JSON
              </button>
              <label className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors bg-gray-50 text-gray-800 hover:bg-green-50 hover:text-green-600">
                <input type="file" accept="application/json" className="hidden" onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    await importUserDataFromFile(file);
                    await syncOPFSToLocal();
                    setShowMenu(false);
                    window.location.reload();
                  }
                }} />
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21V9"/><path d="m16 13-4-4-4 4"/><path d="M20 3H4"/></svg>
                Restore from JSON
              </label>
              
              <button 
                type="button"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors bg-gray-50 text-gray-800 hover:bg-red-50 hover:text-red-600"
                onClick={handleDeleteAccount}
              >
                <Trash2 className="w-5 h-5" /> Delete Account
              </button>
            </div>

            <div className="px-4 py-2.5 text-center border-t border-gray-200 bg-gray-50 rounded-b-xl">
              <small className="text-gray-500 text-[11px]">Last active: {formatDate(currentUser.lastActive)}</small>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserProfile;
