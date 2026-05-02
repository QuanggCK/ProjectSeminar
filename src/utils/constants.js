// App-wide constants

export const APP_NAME = 'CodeLearning';
export const APP_DESCRIPTION = 'Nền tảng học lập trình trực tuyến';
export const APP_AUTHOR = 'CLB Tin học NTU';

// LocalStorage keys
export const STORAGE_KEYS = {
  USER: 'codelearning_user',
  TOKEN: 'codelearning_token',
  PROGRESS: 'codelearning_progress',
  NOTES: 'codelearning_notes',
  BOOKMARKS: 'codelearning_bookmarks',
  USERS_DB: 'codelearning_users_db',
};

// Route paths
export const ROUTES = {
  LOGIN: '/',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  COURSES: '/courses',
  COURSE_DETAIL: '/course/:id',
  PROFILE: '/profile',
};

// Course language colors (Aqua Mint compatible)
export const LANG_THEMES = {
  c: {
    accent: '#2563eb',
    bg: '#EFF6FF',
    iconBg: '#DBEAFE',
    border: 'rgba(37, 99, 235, 0.2)',
  },
  cpp: {
    accent: '#7C3AED',
    bg: '#F5F3FF',
    iconBg: '#EDE9FE',
    border: 'rgba(124, 58, 237, 0.2)',
  },
  java: {
    accent: '#DC2626',
    bg: '#FEF2F2',
    iconBg: '#FEE2E2',
    border: 'rgba(220, 38, 38, 0.2)',
  },
  python: {
    accent: '#D97706',
    bg: '#FFFBEB',
    iconBg: '#FEF3C7',
    border: 'rgba(217, 119, 6, 0.2)',
  },
};

// Achievement definitions
export const ACHIEVEMENTS = [
  { id: 'first_login', title: 'Bước đầu tiên', description: 'Đăng nhập lần đầu', icon: '🎯', condition: 'login' },
  { id: 'first_lesson', title: 'Học viên mới', description: 'Hoàn thành bài học đầu tiên', icon: '📖', condition: 'lesson_1' },
  { id: 'quiz_perfect', title: 'Xuất sắc', description: 'Đạt 100% một bài quiz', icon: '🏆', condition: 'quiz_perfect' },
  { id: 'course_half', title: 'Nửa đường', description: 'Hoàn thành 50% một khóa học', icon: '⚡', condition: 'course_50' },
  { id: 'course_complete', title: 'Tốt nghiệp', description: 'Hoàn thành một khóa học', icon: '🎓', condition: 'course_100' },
  { id: 'all_courses', title: 'Bậc thầy', description: 'Hoàn thành tất cả khóa học', icon: '👑', condition: 'all_courses' },
  { id: 'notes_5', title: 'Chăm chỉ', description: 'Viết 5 ghi chú', icon: '📝', condition: 'notes_5' },
  { id: 'streak_3', title: 'Kiên trì', description: 'Học 3 ngày liên tiếp', icon: '🔥', condition: 'streak_3' },
];

// Topic icon mapping
export const TOPIC_ICONS = {
  intro: '🚀',
  basic: '📦',
  control: '🔀',
  functions: '⚡',
  'data-structure': '🗂️',
  memory: '🧠',
  oop: '🏛️',
  advanced: '🔥',
};
