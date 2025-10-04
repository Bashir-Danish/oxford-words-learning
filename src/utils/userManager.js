import { downloadUsers, writeUsersToOPFS, readUsersFromOPFS } from './storageSync';

/**
 * User Manager - Handle multi-user functionality without backend
 * Users are stored in localStorage and automatically synced to OPFS (Origin Private File System)
 * On first load, initializes from public/users.json if available
 */

const USERS_KEY = 'oxford_users';
const CURRENT_USER_KEY = 'oxford_current_user';
const INITIALIZED_KEY = 'oxford_users_initialized';

// Avatar options for users (lucide-react icon keys)
export const AVATARS = [
  'graduation-cap',
  'user-round',
  'briefcase',
  'flask-conical',
  'book-open',
  'pencil-line'
];

// ---------- Password hashing (SHA-256) ----------
async function hashPassword(password) {
  const enc = new TextEncoder();
  const data = enc.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// In-memory cache
let cachedUsers = null;

// Helper to save users to both localStorage and OPFS
async function saveUsers(users) {
  cachedUsers = users;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  // Auto-sync to OPFS for persistence
  await writeUsersToOPFS(users);
}

// ---------- Users getters ----------
export const getAllUsers = () => {
  if (cachedUsers) return cachedUsers;
  const usersJson = localStorage.getItem(USERS_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

export const getAllUsersAsync = async () => {
  // Return cached users if available
  if (cachedUsers) return cachedUsers;

  // Try to load from localStorage first
  let users = getAllUsers();
  
  // If no users in localStorage, check if we need to initialize
  const isInitialized = localStorage.getItem(INITIALIZED_KEY);
  
  if (users.length === 0 && !isInitialized) {
    // First load - try to initialize from public/users.json
    try {
      const res = await fetch('/users.json', { cache: 'no-store' });
      if (res.ok) {
        const publicUsers = await res.json();
        if (Array.isArray(publicUsers) && publicUsers.length > 0) {
          console.log('Initializing users from public/users.json');
          users = publicUsers;
          await saveUsers(users);
        }
      }
    } catch (err) {
      console.log('No users.json found or error loading:', err.message);
    }
    
    // If still no users, try OPFS
    if (users.length === 0) {
      const opfsUsers = await readUsersFromOPFS();
      if (opfsUsers && Array.isArray(opfsUsers) && opfsUsers.length > 0) {
        console.log('Loading users from OPFS');
        users = opfsUsers;
        await saveUsers(users);
      }
    }
    
    // Mark as initialized
    localStorage.setItem(INITIALIZED_KEY, 'true');
  }
  
  cachedUsers = users;
  return users;
};

/**
 * Get current logged-in user
 */
export const getCurrentUser = () => {
  const currentUserId = localStorage.getItem(CURRENT_USER_KEY);
  if (!currentUserId) return null;
  
  const users = getAllUsers();
  return users.find(u => u.id === currentUserId) || null;
};

/**
 * Create a new user (requires password)
 */
export const createUser = async (username, avatar = AVATARS[0], password) => {
  if (!password || password.length < 4) {
    throw new Error('Password must be at least 4 characters');
  }
  const users = await getAllUsersAsync();
  // Check if username already exists
  if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
    throw new Error('Username already exists');
  }
  const newUser = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    username: username.trim(),
    avatar,
    createdAt: new Date().toISOString(),
    lastActive: new Date().toISOString(),
    totalPoints: 0,
    totalWordsLearned: 0,
    totalPracticeAttempts: 0,
    passwordHash: await hashPassword(password)
  };
  const next = [...users, newUser];
  // Save to localStorage and OPFS automatically
  await saveUsers(next);
  console.log('User created and saved:', newUser.username);
  return newUser;
};

/**
 * Verify user password
 */
export const verifyUserPassword = async (userId, password) => {
  const users = await getAllUsersAsync();
  const user = users.find(u => u.id === userId);
  if (!user) return false;
  const hashed = await hashPassword(password || '');
  return user.passwordHash === hashed;
};

/**
 * Set current active user (after verification)
 */
export const setCurrentUser = async (userId) => {
  const users = getAllUsers();
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    throw new Error('User not found');
  }
  
  // Update last active
  user.lastActive = new Date().toISOString();
  await saveUsers(users);
  localStorage.setItem(CURRENT_USER_KEY, userId);
  
  return user;
};

/**
 * Update user stats
 */
export const updateUserStats = async (userId, stats) => {
  const users = await getAllUsersAsync();
  const idx = users.findIndex(u => u.id === userId);
  if (idx === -1) throw new Error('User not found');
  users[idx] = { ...users[idx], ...stats, lastActive: new Date().toISOString() };
  await saveUsers(users);
  return users[idx];
};

/**
 * Delete a user and their data
 */
export const deleteUser = async (userId) => {
  const users = await getAllUsersAsync();
  const filtered = users.filter(u => u.id !== userId);
  await saveUsers(filtered);
  
  // Clear user-specific local data
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(`${userId}_`)) keysToRemove.push(key);
  }
  keysToRemove.forEach(k => localStorage.removeItem(k));
  if (localStorage.getItem(CURRENT_USER_KEY) === userId) localStorage.removeItem(CURRENT_USER_KEY);
};

/**
 * Logout current user
 */
export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

/**
 * Get user-specific localStorage key
 */
export const getUserKey = (userId, key) => {
  return `${userId}_${key}`;
};

/**
 * Save data for specific user
 */
export const saveUserData = (userId, key, data) => {
  const userKey = getUserKey(userId, key);
  localStorage.setItem(userKey, JSON.stringify(data));
};

/**
 * Load data for specific user
 */
export const loadUserData = (userId, key) => {
  const userKey = getUserKey(userId, key);
  const data = localStorage.getItem(userKey);
  return data ? JSON.parse(data) : null;
};

/**
 * Export users to downloadable JSON file (for manual backup)
 */
export const exportUsersToFile = async () => {
  const users = await getAllUsersAsync();
  downloadUsers(users, 'users-backup.json');
};

/**
 * Get user statistics from their progress data
 */
export const calculateUserStatistics = (userId) => {
  const progressData = loadUserData(userId, 'vocabularyProgress');
  
  if (!progressData || !progressData.vocabulary) {
    return {
      totalPoints: 0,
      totalWordsLearned: 0,
      totalPracticeAttempts: 0,
      averagePoints: 0
    };
  }
  
  const vocab = progressData.vocabulary;
  const totalPoints = vocab.reduce((sum, word) => sum + (word.practicePoints || 0), 0);
  const totalWordsLearned = vocab.filter(word => word.learned).length;
  const totalPracticeAttempts = vocab.reduce((sum, word) => sum + (word.practiceAttempts || 0), 0);
  const wordsWithAttempts = vocab.filter(word => (word.practiceAttempts || 0) > 0).length;
  const averagePoints = wordsWithAttempts > 0 ? Math.round(totalPoints / wordsWithAttempts) : 0;
  
  return {
    totalPoints,
    totalWordsLearned,
    totalPracticeAttempts,
    averagePoints
  };
};
