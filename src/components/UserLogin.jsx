import { useState, useEffect } from 'react';
import { 
  getAllUsersAsync, 
  createUser, 
  setCurrentUser, 
  verifyUserPassword, 
  AVATARS 
} from '../utils/userManager';
import {
  GraduationCap,
  Trophy,
  BookOpen,
  Plus,
  X,
  AlertTriangle,
  UserRound,
  Briefcase,
  FlaskConical,
  PencilLine
} from 'lucide-react';

const avatarMap = {
  'graduation-cap': GraduationCap,
  'user-round': UserRound,
  'briefcase': Briefcase,
  'flask-conical': FlaskConical,
  'book-open': BookOpen,
  'pencil-line': PencilLine,
};

function Icon({ name, className }) {
  const Cmp = avatarMap[name] || UserRound;
  return <Cmp className={className} />;
}

function UserLogin({ onLogin }) {
  const [users, setUsers] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [error, setError] = useState('');
  const [authUser, setAuthUser] = useState(null);
  const [authPassword, setAuthPassword] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const allUsers = await getAllUsersAsync();
    setUsers(allUsers);
    // Show create form if no users exist
    if (allUsers.length === 0) {
      setShowCreateForm(true);
    }
  };

  const handleSelectUser = (userId) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    setAuthUser(user);
    setAuthPassword('');
  };

  const handleConfirmLogin = async (e) => {
    e?.preventDefault?.();
    setError('');
    if (!authUser) return;
    const ok = await verifyUserPassword(authUser.id, authPassword);
    if (!ok) {
      setError('Invalid password');
      return;
    }
    const user = await setCurrentUser(authUser.id);
    setAuthUser(null);
    setAuthPassword('');
    onLogin(user);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError('');

    if (!newUsername.trim()) {
      setError('Please enter a username');
      return;
    }

    if (newUsername.trim().length < 2) {
      setError('Username must be at least 2 characters');
      return;
    }

    if (!newPassword || newPassword.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const newUser = await createUser(newUsername.trim(), selectedAvatar, newPassword);
      const user = await setCurrentUser(newUser.id);
      onLogin(user);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
    setNewUsername('');
    setNewPassword('');
    setConfirmPassword('');
    setSelectedAvatar(AVATARS[0]);
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 z-[1000] animate-fadeIn">
      {/* Password Login Overlay */}
      {authUser && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/20">
          <form onSubmit={handleConfirmLogin} className="bg-white rounded-xl p-4 w-full max-w-sm shadow-xl border border-gray-100">
            <h3 className="text-base font-bold mb-2 text-gray-800">Login as {authUser.username}</h3>
            <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={authPassword}
              onChange={(e) => setAuthPassword(e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              autoFocus
            />
            {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
            <div className="flex justify-end gap-2 mt-3">
              <button type="button" className="px-3 py-1.5 text-sm border rounded-lg" onClick={() => { setAuthUser(null); setError(''); }}>Cancel</button>
              <button type="submit" className="px-3 py-1.5 text-sm rounded-lg bg-blue-600 text-white">Login</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-[520px] w-full max-h-[92vh] overflow-y-hidden shadow-xl border border-gray-100 animate-slideUp">
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-2 shadow-lg">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-xl font-bold mb-1 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Oxford Word Skills</h1>
          <p className="text-xs text-gray-500">Choose your profile to continue</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-3 py-2 rounded mb-3 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {!showCreateForm ? (
          <div className="user-selection">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
              {users.map(user => (
                <div 
                  key={user.id} 
                  className="group bg-white border-2 border-gray-100 rounded-xl p-3 cursor-pointer transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:-translate-y-1"
                  onClick={() => handleSelectUser(user.id)}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-2 text-2xl group-hover:scale-110 transition-transform">
                      <Icon name={user.avatar} className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="text-xs font-semibold text-gray-800 mb-1 truncate w-full text-center">{user.username}</h3>
                    {/* Stats */}
                    <div className="flex flex-col gap-1 w-full">
                      <div className="flex items-center justify-center gap-1 text-[11px] text-gray-600">
                        <Trophy className="w-3.5 h-3.5" />
                        <span className="font-medium">{user.totalPoints || 0}</span>
                      </div>
                      <div className="flex items-center justify-center gap-1 text-[11px] text-gray-600">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span className="font-medium">{user.totalWordsLearned || 0} words</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div 
                className="group bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-200 rounded-xl p-3 cursor-pointer transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 flex flex-col items-center justify-center"
                onClick={() => setShowCreateForm(true)}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-2 text-white text-xl group-hover:scale-110 transition-transform">
                  <Plus className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold text-gray-700">Add User</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Create Profile</h2>
              {users.length > 0 && (
                <button 
                  type="button" 
                  onClick={handleCancelCreate}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <form onSubmit={handleCreateUser}>
              <div className="mb-4">
                <label className="block mb-1.5 text-xs font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Enter your name"
                  maxLength={20}
                  autoFocus
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm transition-all bg-white text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-xs font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm mt-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-xs font-medium text-gray-700">Choose Avatar</label>
                <div className="grid grid-cols-6 gap-2">
                  {AVATARS.map((key, index) => (
                    <div
                      key={index}
                      className={`p-1.5 border-2 rounded-lg cursor-pointer transition-all text-center ${
                        selectedAvatar === key 
                          ? 'bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-500 shadow-md scale-105' 
                          : 'bg-gray-50 border-gray-200 hover:border-blue-400 hover:scale-105'
                      }`}
                      onClick={() => setSelectedAvatar(key)}
                    >
                      <Icon name={key} className={`w-6 h-6 ${selectedAvatar === key ? 'text-white' : 'text-gray-800'}`} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mt-5">
                <button type="submit" className="flex-1 px-4 py-2 text-sm border-0 rounded-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white">Create Profile</button>
                {users.length > 0 && (
                  <button type="button" className="px-4 py-2 text-sm border-2 border-gray-200 rounded-lg font-medium bg-white text-gray-700" onClick={handleCancelCreate}>Cancel</button>
                )}
              </div>
            </form>
          </div>
        )}

        <div className="text-center mt-5 pt-3 border-t border-gray-100">
          <p className="text-[11px] text-gray-400 flex items-center justify-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>All data is stored securely on your device</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
