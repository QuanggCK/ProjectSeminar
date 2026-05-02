// Course data service — progress, notes, bookmarks (localStorage)

import { STORAGE_KEYS } from '../utils/constants';

/* =============== PROGRESS =============== */

export function getProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function saveStepProgress(courseId, stepKey, value = true) {
  const progress = getProgress();
  if (!progress[courseId]) progress[courseId] = {};
  progress[courseId][stepKey] = value;
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  return progress;
}

export function saveQuizScore(courseId, topicId, score, total) {
  const progress = getProgress();
  if (!progress[courseId]) progress[courseId] = {};
  progress[courseId][`quiz_${topicId}`] = { score, total, date: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  return progress;
}

export function getCourseProgress(courseId, totalSteps) {
  const progress = getProgress();
  if (!progress[courseId]) return 0;
  const completed = Object.keys(progress[courseId]).filter(
    (k) => progress[courseId][k] === true || (typeof progress[courseId][k] === 'object')
  ).length;
  return totalSteps > 0 ? Math.round((completed / totalSteps) * 100) : 0;
}

/* =============== NOTES =============== */

export function getNotes() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.NOTES);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addNote(courseId, lessonTitle, content) {
  const notes = getNotes();
  const note = {
    id: Date.now().toString(36),
    courseId,
    lessonTitle,
    content,
    createdAt: new Date().toISOString(),
  };
  notes.unshift(note);
  localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  return notes;
}

export function deleteNote(noteId) {
  let notes = getNotes();
  notes = notes.filter((n) => n.id !== noteId);
  localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  return notes;
}

/* =============== BOOKMARKS =============== */

export function getBookmarks() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function toggleBookmark(courseId, stepIndex, stepTitle) {
  let bookmarks = getBookmarks();
  const idx = bookmarks.findIndex((b) => b.courseId === courseId && b.stepIndex === stepIndex);

  if (idx !== -1) {
    bookmarks.splice(idx, 1);
  } else {
    bookmarks.push({
      courseId,
      stepIndex,
      stepTitle,
      createdAt: new Date().toISOString(),
    });
  }

  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  return bookmarks;
}

export function isBookmarked(courseId, stepIndex) {
  const bookmarks = getBookmarks();
  return bookmarks.some((b) => b.courseId === courseId && b.stepIndex === stepIndex);
}

/* =============== ACTIVITY LOG =============== */

const ACTIVITY_KEY = 'codelearning_activity';

export function getActivity() {
  try {
    const data = localStorage.getItem(ACTIVITY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function logActivity(type, detail) {
  const activities = getActivity();
  activities.unshift({
    type,
    detail,
    timestamp: new Date().toISOString(),
  });
  // Keep only last 50 activities
  const trimmed = activities.slice(0, 50);
  localStorage.setItem(ACTIVITY_KEY, JSON.stringify(trimmed));
  return trimmed;
}
