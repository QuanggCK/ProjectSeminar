// Utility helper functions

/**
 * Format date to Vietnamese locale string
 */
export function formatDate(date) {
  return new Date(date).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Format relative time (e.g., "2 giờ trước")
 */
export function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  if (seconds < 60) return 'Vừa xong';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} phút trước`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} giờ trước`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} ngày trước`;
  return formatDate(date);
}

/**
 * Calculate course progress percentage
 */
export function calcCourseProgress(courseId, progress) {
  if (!progress || !progress[courseId]) return 0;
  const courseProgress = progress[courseId];
  const completedSteps = Object.values(courseProgress).filter(Boolean).length;
  const totalSteps = Object.keys(courseProgress).length;
  return totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
}

/**
 * Generate a simple unique ID
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text, length = 100) {
  if (!text || text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
}

/**
 * Debounce function
 */
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Get greeting based on time of day
 */
export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Chào buổi sáng';
  if (hour < 18) return 'Chào buổi chiều';
  return 'Chào buổi tối';
}

/**
 * Simple email validation
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Simple password validation (min 6 chars)
 */
export function isValidPassword(password) {
  return password && password.length >= 6;
}
