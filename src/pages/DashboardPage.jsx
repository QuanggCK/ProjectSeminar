import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Trophy, Flame, Clock, ArrowRight, FileText } from 'lucide-react';
import useStore from '../store/useStore';
import Card, { StatCard } from '../components/common/Card';
import { courses } from '../data/courses';
import { getGreeting, timeAgo } from '../utils/helpers';
import { LANG_THEMES, ACHIEVEMENTS } from '../utils/constants';
import { getCourseProgress } from '../services/courseService';

export default function DashboardPage() {
  const { user, progress, activities, notes, bookmarks } = useStore();

  // Calculate stats
  const courseList = Object.values(courses);
  const totalLessons = courseList.reduce((sum, c) => {
    let count = 0;
    c.topics.forEach(t => {
      count += t.lessons.length * 2; // theory + code
      if (t.quiz?.length) count += 1;
    });
    return sum + count;
  }, 0);

  const completedSteps = Object.values(progress).reduce((sum, cp) => {
    return sum + Object.values(cp).filter(v => v === true || typeof v === 'object').length;
  }, 0);

  const quizScores = [];
  Object.values(progress).forEach(cp => {
    Object.entries(cp).forEach(([k, v]) => {
      if (k.startsWith('quiz_') && typeof v === 'object') {
        quizScores.push(v);
      }
    });
  });
  const avgScore = quizScores.length > 0
    ? Math.round(quizScores.reduce((s, q) => s + (q.score / q.total) * 100, 0) / quizScores.length)
    : 0;

  // Earned achievements
  const earnedAchievements = ACHIEVEMENTS.filter(a => {
    switch (a.condition) {
      case 'login': return true;
      case 'lesson_1': return completedSteps >= 1;
      case 'quiz_perfect': return quizScores.some(q => q.score === q.total);
      case 'course_50': return courseList.some(c => {
        let total = 0;
        c.topics.forEach(t => { total += t.lessons.length * 2; if (t.quiz?.length) total++; });
        return getCourseProgress(c.id, total) >= 50;
      });
      case 'course_100': return courseList.some(c => {
        let total = 0;
        c.topics.forEach(t => { total += t.lessons.length * 2; if (t.quiz?.length) total++; });
        return getCourseProgress(c.id, total) >= 100;
      });
      case 'notes_5': return notes.length >= 5;
      case 'streak_3': return (user?.streak || 0) >= 3;
      default: return false;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Banner */}
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-h1 text-primary mb-1">
          {getGreeting()},{' '}
          <Link to="/profile" className="text-tertiary hover:underline transition-all">
            {user?.name}
          </Link>{' '}
          👋
        </h1>
        <p className="text-secondary">Tiếp tục hành trình học tập của bạn</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <StatCard icon="📚" label="Khóa học" value={courseList.length} sublabel="ngôn ngữ" />
        <StatCard icon="✅" label="Đã hoàn thành" value={completedSteps} sublabel={`/ ${totalLessons} bước`} />
        <StatCard icon="🏆" label="Điểm quiz TB" value={`${avgScore}%`} sublabel={`${quizScores.length} quiz`} />
        <StatCard icon="🔥" label="Streak" value={user?.streak || 0} sublabel="ngày liên tiếp" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Cards */}
        <div className="lg:col-span-2">
          <h2 className="text-h2 text-primary mb-4 flex items-center gap-2">
            <BookOpen size={20} className="text-tertiary" />
            Khóa học của bạn
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {courseList.map((course) => {
              const theme = LANG_THEMES[course.id] || LANG_THEMES.c;
              let totalSteps = 0;
              course.topics.forEach(t => {
                totalSteps += t.lessons.length * 2;
                if (t.quiz?.length) totalSteps++;
              });
              const prog = getCourseProgress(course.id, totalSteps);

              return (
                <Link key={course.id} to={`/course/${course.id}`} className="group">
                  <Card className="h-full">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-md-aqua flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                        style={{ background: theme.accent }}
                      >
                        {course.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-primary group-hover:text-tertiary transition-colors">
                          {course.name}
                        </h3>
                        <p className="text-sm text-secondary mt-1 line-clamp-2">{course.description}</p>
                        {/* Progress bar */}
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-secondary font-mono">{prog}%</span>
                            <span className="text-secondary">{course.topics.length} chủ đề</span>
                          </div>
                          <div className="h-1.5 bg-neutral rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${prog}%`, background: theme.accent }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* View all button */}
          <Link
            to="/courses"
            className="mt-4 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-tertiary hover:bg-tertiary/5 rounded-md-aqua transition-colors"
          >
            Xem tất cả khóa học <ArrowRight size={14} />
          </Link>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Achievements */}
          <Card>
            <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
              <Trophy size={16} className="text-tertiary" /> Thành tựu
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {ACHIEVEMENTS.map((a) => {
                const earned = earnedAchievements.some(ea => ea.id === a.id);
                return (
                  <div
                    key={a.id}
                    className={`flex flex-col items-center p-2 rounded-sm-aqua text-center ${
                      earned ? 'bg-tertiary/10' : 'bg-neutral opacity-40'
                    }`}
                    title={`${a.title}: ${a.description}`}
                  >
                    <span className="text-xl">{a.icon}</span>
                    <span className="text-[9px] font-mono text-secondary mt-1 leading-tight">{a.title}</span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card>
            <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
              <Clock size={16} className="text-tertiary" /> Hoạt động gần đây
            </h3>
            {activities.length === 0 ? (
              <p className="text-sm text-secondary/60 text-center py-4">Chưa có hoạt động</p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {activities.slice(0, 10).map((act, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 border-b border-secondary/5 last:border-0">
                    <span className="text-sm mt-0.5">
                      {act.type === 'login' ? '🔑' : act.type === 'quiz' ? '📝' : act.type === 'lesson' ? '📖' : act.type === 'note' ? '✏️' : '📌'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-primary truncate">{act.detail}</p>
                      <p className="text-xs text-secondary/60 font-mono">{timeAgo(act.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Quick notes count */}
          <Card className="flex items-center gap-3">
            <div className="w-10 h-10 bg-tertiary/10 rounded-md-aqua flex items-center justify-center">
              <FileText size={18} className="text-tertiary" />
            </div>
            <div>
              <p className="font-bold text-primary">{notes.length} ghi chú</p>
              <p className="text-xs text-secondary">{bookmarks.length} bookmark</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
