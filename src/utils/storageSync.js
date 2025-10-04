// storageSync.js - Sync user-related data between localStorage and a JSON file
// Background save target: Origin Private File System (OPFS) as user-data.json
// Optional export/import for human-readable backup files

const USERS_KEY = 'oxford_users';
const CURRENT_USER_KEY = 'oxford_current_user';

const OPFS_FILENAME = 'user-data.json';
const USERS_FILENAME = 'users.json';

// Collect all relevant app data to sync
export function snapshotAllUserData() {
  const usersJson = localStorage.getItem(USERS_KEY);
  const users = usersJson ? JSON.parse(usersJson) : [];
  const currentUserId = localStorage.getItem(CURRENT_USER_KEY) || null;

  // Collect per-user vocabulary progress if present
  const progressByUser = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      if (key.endsWith('_vocabularyProgress')) {
        const uid = key.replace('_vocabularyProgress', '');
        const val = localStorage.getItem(key);
        progressByUser[uid] = val ? JSON.parse(val) : null;
      }
    }
  } catch (_) {
    // ignore parse errors
  }

  return { users, currentUserId, progressByUser, version: 1, savedAt: new Date().toISOString() };
}

export function applySnapshotToLocalStorage(snapshot) {
  if (!snapshot || typeof snapshot !== 'object') return;
  const { users = [], currentUserId = null, progressByUser = {} } = snapshot;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  if (currentUserId) localStorage.setItem(CURRENT_USER_KEY, currentUserId);
  else localStorage.removeItem(CURRENT_USER_KEY);
  Object.entries(progressByUser).forEach(([uid, data]) => {
    localStorage.setItem(`${uid}_vocabularyProgress`, JSON.stringify(data || {}));
  });
}

// ---------- OPFS (Origin Private File System) helpers ----------
async function getOpfsRoot() {
  if (!('storage' in navigator) || !navigator.storage.getDirectory) return null;
  try {
    const root = await navigator.storage.getDirectory();
    return root;
  } catch {
    return null;
  }
}

export async function writeSnapshotToOPFS(snapshot) {
  const root = await getOpfsRoot();
  if (!root) return false;
  try {
    const handle = await root.getFileHandle(OPFS_FILENAME, { create: true });
    const writable = await handle.createWritable();
    await writable.write(JSON.stringify(snapshot, null, 2));
    await writable.close();
    return true;
  } catch (e) {
    console.warn('OPFS write failed:', e);
    return false;
  }
}

export async function readSnapshotFromOPFS() {
  const root = await getOpfsRoot();
  if (!root) return null;
  try {
    const handle = await root.getFileHandle(OPFS_FILENAME, { create: false });
    const file = await handle.getFile();
    const text = await file.text();
    return JSON.parse(text);
  } catch {
    return null;
  }
}

// Users file helpers
export async function readUsersFromOPFS() {
  const root = await getOpfsRoot();
  if (!root) return null;
  try {
    const handle = await root.getFileHandle(USERS_FILENAME, { create: false });
    const file = await handle.getFile();
    const text = await file.text();
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function writeUsersToOPFS(usersArray) {
  const root = await getOpfsRoot();
  if (!root) return false;
  try {
    const handle = await root.getFileHandle(USERS_FILENAME, { create: true });
    const writable = await handle.createWritable();
    await writable.write(JSON.stringify(usersArray || [], null, 2));
    await writable.close();
    return true;
  } catch (e) {
    console.warn('OPFS users write failed:', e);
    return false;
  }
}

export async function syncLocalToOPFS() {
  const snap = snapshotAllUserData();
  return await writeSnapshotToOPFS(snap);
}

export async function syncOPFSToLocal() {
  const snap = await readSnapshotFromOPFS();
  if (!snap) return false;
  applySnapshotToLocalStorage(snap);
  return true;
}

// ---------- Download / Upload helpers ----------
export function downloadSnapshot(snapshot, filename = 'user-data-backup.json') {
  const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function exportUserDataAsFile() {
  const snap = snapshotAllUserData();
  downloadSnapshot(snap);
}

export async function importUserDataFromFile(file) {
  if (!file) return false;
  try {
    const text = await file.text();
    const snap = JSON.parse(text);
    applySnapshotToLocalStorage(snap);
    // Also push into OPFS for persistence
    await writeSnapshotToOPFS(snap);
    return true;
  } catch (e) {
    console.error('Failed to import user data:', e);
    return false;
  }
}

export function downloadUsers(users, filename = 'users.json') {
  const blob = new Blob([JSON.stringify(users || [], null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function pickAndOverwriteUsers(users) {
  if (!window.showOpenFilePicker) {
    // Fallback to download
    downloadUsers(users);
    return { ok: false, reason: 'no-fsa' };
  }
  try {
    const [handle] = await window.showOpenFilePicker({
      multiple: false,
      types: [{ description: 'JSON', accept: { 'application/json': ['.json'] } }],
      excludeAcceptAllOption: false
    });
    const writable = await handle.createWritable();
    await writable.write(JSON.stringify(users || [], null, 2));
    await writable.close();
    return { ok: true };
  } catch (e) {
    console.warn('pickAndOverwriteUsers canceled or failed:', e);
    return { ok: false, reason: 'error' };
  }
}
