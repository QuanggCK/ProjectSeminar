// Mock Auth Service using localStorage

import { STORAGE_KEYS } from '../utils/constants';
import { generateId } from '../utils/helpers';

/**
 * Get all registered users from localStorage
 */
function getUsersDB() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USERS_DB);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Save users DB to localStorage
 */
function saveUsersDB(users) {
  localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users));
}

/**
 * Register a new user
 */
export async function registerUser({ name, email, password }) {
  // Simulate API delay
  await new Promise((r) => setTimeout(r, 600));

  const users = getUsersDB();

  // Check if email already exists
  if (users.find((u) => u.email === email)) {
    throw new Error('Email đã được sử dụng');
  }

  const newUser = {
    id: generateId(),
    name,
    email,
    password, // In production, hash this!
    avatar: null,
    createdAt: new Date().toISOString(),
    streak: 0,
    lastLoginDate: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsersDB(users);

  // Return user without password
  const { password: _, ...safeUser } = newUser;
  return { user: safeUser, token: `mock_token_${newUser.id}` };
}

/**
 * Login user by name
 */
export async function loginByName(name) {
  await new Promise((r) => setTimeout(r, 400));
  const users = getUsersDB();
  let user = users.find((u) => u.name === name);

  if (!user) {
    user = {
      id: generateId(),
      name,
      avatar: null,
      createdAt: new Date().toISOString(),
      streak: 0,
      lastLoginDate: new Date().toISOString(),
    };
    users.push(user);
  } else {
    // Update streak
    const today = new Date().toDateString();
    const lastLogin = new Date(user.lastLoginDate).toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (lastLogin === yesterday) {
      user.streak = (user.streak || 0) + 1;
    } else if (lastLogin !== today) {
      user.streak = 1;
    }
    user.lastLoginDate = new Date().toISOString();
  }
  
  saveUsersDB(users);
  const { password: _, ...safeUser } = user;
  return { user: safeUser, token: `mock_token_${user.id}` };
}

/**
 * Login user
 */
export async function loginUser({ email, password }) {
  await new Promise((r) => setTimeout(r, 600));

  const users = getUsersDB();
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    throw new Error('Email hoặc mật khẩu không đúng');
  }

  // Update last login and streak
  const today = new Date().toDateString();
  const lastLogin = new Date(user.lastLoginDate).toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (lastLogin === yesterday) {
    user.streak = (user.streak || 0) + 1;
  } else if (lastLogin !== today) {
    user.streak = 1;
  }
  user.lastLoginDate = new Date().toISOString();
  saveUsersDB(users);

  const { password: _, ...safeUser } = user;
  return { user: safeUser, token: `mock_token_${user.id}` };
}

/**
 * Update user profile
 */
export async function updateProfile(userId, updates) {
  await new Promise((r) => setTimeout(r, 400));

  const users = getUsersDB();
  const idx = users.findIndex((u) => u.id === userId);

  if (idx === -1) throw new Error('Người dùng không tồn tại');

  users[idx] = { ...users[idx], ...updates };
  saveUsersDB(users);

  const { password: _, ...safeUser } = users[idx];
  return safeUser;
}

/**
 * Get current user from stored token
 */
export function getCurrentUser() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}
