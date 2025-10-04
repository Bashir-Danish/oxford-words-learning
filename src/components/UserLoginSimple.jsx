import { useState } from 'react';
import {
  GraduationCap,
  UserRound,
  Briefcase,
  FlaskConical,
  BookOpen,
  PencilLine,
  AlertTriangle,
  LogIn,
  UserPlus
} from 'lucide-react';
import { authAPI, handleAPIError } from '../services/api';

// Avatar options
const AVATARS = [
  'graduation-cap',
  'user-round',
  'briefcase',
  'flask-conical',
  'book-open',
  'pencil-line'
];

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

function UserLoginSimple({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password) {
      setError('Please enter username and password');
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.login({
        username: username.trim(),
        password: password
      });
      
      if (response.success && response.user) {
        onLogin(response.user);
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      setError(handleAPIError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    if (!password) {
      setError('Please enter a password');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.register({
        username: username.trim(),
        password: password,
        avatar: selectedAvatar
      });
      
      if (response.success && response.user) {
        onLogin(response.user);
      } else {
        setError(response.message || 'Signup failed');
      }
    } catch (err) {
      setError(handleAPIError(err));
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setError('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 z-[1000] animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 animate-slideUp my-4 max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-2 shadow-lg">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl font-bold mb-1 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Oxford Word Skills
          </h1>
          <p className="text-xs text-gray-500">
            {isSignup ? 'Create your account to get started' : 'Welcome back! Please login to continue'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 text-red-800 px-4 py-3 rounded-lg mb-3 text-sm flex items-center gap-3 shadow-sm animate-slideDown">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={isSignup ? handleSignup : handleLogin} autoComplete="off">
          {/* Username */}
          <div className="mb-3">
            <label className="block mb-1 text-xs font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm transition-all bg-white text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              autoComplete="off"
              autoFocus
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="block mb-1 text-xs font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isSignup ? "Create a password" : "Enter your password"}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm transition-all bg-white text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              autoComplete="new-password"
              disabled={loading}
            />
          </div>

          {/* Confirm Password (Signup only) */}
          {isSignup && (
            <div className="mb-3">
              <label className="block mb-1 text-xs font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm transition-all bg-white text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                autoComplete="new-password"
                disabled={loading}
              />
            </div>
          )}

          {/* Avatar Selection (Signup only) */}
          {isSignup && (
            <div className="mb-4">
              <label className="block mb-1.5 text-xs font-medium text-gray-700">
                Choose Avatar
              </label>
              <div className="grid grid-cols-6 gap-1.5">
                {AVATARS.map((avatarKey) => (
                  <div
                    key={avatarKey}
                    className={`p-2 border-2 rounded-lg cursor-pointer transition-all text-center ${
                      selectedAvatar === avatarKey
                        ? 'bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-500 shadow-md scale-105'
                        : 'bg-gray-50 border-gray-200 hover:border-blue-400 hover:scale-105'
                    }`}
                    onClick={() => setSelectedAvatar(avatarKey)}
                  >
                    <Icon
                      name={avatarKey}
                      className={`w-5 h-5 mx-auto ${
                        selectedAvatar === avatarKey ? 'text-white' : 'text-gray-700'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2.5 rounded-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{isSignup ? 'Creating Account...' : 'Logging in...'}</span>
              </>
            ) : (
              <>
                {isSignup ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                <span>{isSignup ? 'Create Account' : 'Login'}</span>
              </>
            )}
          </button>
        </form>

        {/* Toggle Login/Signup */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-600">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
            {' '}
            <button
              type="button"
              onClick={toggleMode}
              disabled={loading}
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors disabled:opacity-50"
            >
              {isSignup ? 'Login' : 'Sign up'}
            </button>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-4 pt-3 border-t border-gray-100">
          <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>All data is stored securely</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserLoginSimple;
