// Zustand global store

import { create } from 'zustand';
import { STORAGE_KEYS } from '../utils/constants';
import * as authService from '../services/authService';
import * as courseService from '../services/courseService';

const useStore = create((set, get) => ({
  // ============ AUTH STATE ============
  user: JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || 'null'),
  token: localStorage.getItem(STORAGE_KEYS.TOKEN) || null,
  isAuthenticated: !!localStorage.getItem(STORAGE_KEYS.TOKEN),
  authLoading: false,
  authError: null,

  login: async (name) => {
    set({ authLoading: true, authError: null });
    try {
      const { user, token } = await authService.loginByName(name);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      courseService.logActivity('login', `Đã đăng nhập`);
      set({ user, token, isAuthenticated: true, authLoading: false });
      return true;
    } catch (err) {
      set({ authLoading: false, authError: err.message });
      return false;
    }
  },

  register: async (name, email, password) => {
    set({ authLoading: true, authError: null });
    try {
      const { user, token } = await authService.registerUser({ name, email, password });
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      courseService.logActivity('register', `Đã đăng ký tài khoản`);
      set({ user, token, isAuthenticated: true, authLoading: false });
      return true;
    } catch (err) {
      set({ authLoading: false, authError: err.message });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    set({ user: null, token: null, isAuthenticated: false, authError: null });
  },

  updateUser: async (updates) => {
    const { user } = get();
    if (!user) return;
    try {
      const updated = await authService.updateProfile(user.id, updates);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
      set({ user: updated });
    } catch (err) {
      console.error('Update profile error:', err);
    }
  },

  clearAuthError: () => set({ authError: null }),

  // ============ COURSE STATE ============
  progress: courseService.getProgress(),
  notes: courseService.getNotes(),
  bookmarks: courseService.getBookmarks(),
  activities: courseService.getActivity(),
  searchQuery: '',

  completeStep: (courseId, stepKey) => {
    const progress = courseService.saveStepProgress(courseId, stepKey);
    courseService.logActivity('lesson', `Hoàn thành: ${stepKey}`);
    const activities = courseService.getActivity();
    set({ progress, activities });
  },

  saveQuizScore: (courseId, topicId, score, total) => {
    const progress = courseService.saveQuizScore(courseId, topicId, score, total);
    courseService.logActivity('quiz', `Quiz ${topicId}: ${score}/${total}`);
    const activities = courseService.getActivity();
    set({ progress, activities });
  },

  addNote: (courseId, lessonTitle, content) => {
    const notes = courseService.addNote(courseId, lessonTitle, content);
    courseService.logActivity('note', `Ghi chú: ${lessonTitle}`);
    const activities = courseService.getActivity();
    set({ notes, activities });
  },

  deleteNote: (noteId) => {
    const notes = courseService.deleteNote(noteId);
    set({ notes });
  },

  toggleBookmark: (courseId, stepIndex, stepTitle) => {
    const bookmarks = courseService.toggleBookmark(courseId, stepIndex, stepTitle);
    set({ bookmarks });
  },

  setSearchQuery: (query) => set({ searchQuery: query }),

  // ============ UI STATE ============
  theme: localStorage.getItem('codelearning_theme') || 'light',
  toggleTheme: () => set((s) => {
    const newTheme = s.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('codelearning_theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { theme: newTheme };
  }),
}));

// Apply theme on load
const currentTheme = useStore.getState().theme;
if (currentTheme === 'dark') {
  document.documentElement.classList.add('dark');
}

export default useStore;
