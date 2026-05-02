import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Search } from 'lucide-react';
import useStore from '../store/useStore';
import Card from '../components/common/Card';
import { courses } from '../data/courses';
import { LANG_THEMES } from '../utils/constants';
import { getCourseProgress } from '../services/courseService';

export default function CoursesPage() {
  const { searchQuery, setSearchQuery } = useStore();

  const courseList = Object.values(courses);

  const filtered = searchQuery.trim()
    ? courseList.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : courseList;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-h1 text-primary flex items-center gap-3">
          <BookOpen size={28} className="text-tertiary" />
          Tất cả khóa học
        </h1>
        <p className="text-secondary mt-2">Chọn ngôn ngữ lập trình bạn muốn học</p>
      </div>

      {/* Search */}
      <div className="mb-6 relative max-w-md animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/50" />
        <input
          type="text"
          placeholder="Tìm kiếm khóa học..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="aqua-input pl-11"
        />
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
        {filtered.map((course) => {
          const theme = LANG_THEMES[course.id] || LANG_THEMES.c;
          let totalSteps = 0;
          course.topics.forEach((t) => {
            totalSteps += t.lessons.length * 2;
            if (t.quiz?.length) totalSteps++;
          });
          const prog = getCourseProgress(course.id, totalSteps);

          return (
            <Link key={course.id} to={`/course/${course.id}`} className="group">
              <Card className="h-full transition-all duration-200 group-hover:-translate-y-0.5">
                <div className="flex gap-5">
                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-lg-aqua flex items-center justify-center text-white font-bold text-2xl flex-shrink-0"
                    style={{ background: theme.accent }}
                  >
                    {course.icon}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h2 className="text-lg font-bold text-primary group-hover:text-tertiary transition-colors">
                          {course.name}
                        </h2>
                        <p className="text-xs font-mono text-secondary/60 uppercase tracking-wider">{course.fullName}</p>
                      </div>
                      <ArrowRight size={18} className="text-secondary/30 group-hover:text-tertiary group-hover:translate-x-0.5 transition-all mt-1 flex-shrink-0" />
                    </div>
                    <p className="text-sm text-secondary mt-2 line-clamp-2">{course.description}</p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 mt-3 text-xs text-secondary">
                      <span>{course.topics.length} chủ đề</span>
                      <span>•</span>
                      <span>{course.topics.reduce((s, t) => s + t.lessons.length, 0)} bài học</span>
                      <span>•</span>
                      <span>{course.topics.reduce((s, t) => s + (t.quiz?.length || 0), 0)} quiz</span>
                    </div>

                    {/* Progress */}
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-mono text-secondary">{prog}% hoàn thành</span>
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

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg text-secondary">Không tìm thấy khóa học phù hợp</p>
        </div>
      )}
    </div>
  );
}
