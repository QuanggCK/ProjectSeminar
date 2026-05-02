import React, { useState } from 'react';
import { User, Mail, Calendar, Flame, Trophy, FileText, Bookmark, Trash2 } from 'lucide-react';
import useStore from '../store/useStore';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { courses } from '../data/courses';
import { ACHIEVEMENTS, LANG_THEMES } from '../utils/constants';
import { getCourseProgress } from '../services/courseService';
import { formatDate, timeAgo } from '../utils/helpers';

export default function ProfilePage() {
  const { user, updateUser, notes, deleteNote, bookmarks, progress } = useStore();
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [activeTab, setActiveTab] = useState('overview');

  const handleSave = async () => {
    if (editName.trim()) {
      await updateUser({ name: editName.trim() });
      setEditing(false);
    }
  };

  const courseList = Object.values(courses);

  // Stats
  const completedSteps = Object.values(progress).reduce((s, cp) => s + Object.values(cp).filter(v => v === true || typeof v === 'object').length, 0);
  const quizScores = [];
  Object.values(progress).forEach(cp => {
    Object.entries(cp).forEach(([k, v]) => { if (k.startsWith('quiz_') && typeof v === 'object') quizScores.push(v); });
  });

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: User },
    { id: 'notes', label: `Ghi chú (${notes.length})`, icon: FileText },
    { id: 'bookmarks', label: `Bookmark (${bookmarks.length})`, icon: Bookmark },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <Card className="mb-6 animate-fade-in-up">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-tertiary/15 flex items-center justify-center text-3xl font-bold text-tertiary flex-shrink-0">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 text-center sm:text-left">
            {editing ? (
              <div className="flex items-center gap-2 max-w-xs">
                <Input id="edit-name" value={editName} onChange={e => setEditName(e.target.value)} placeholder="Tên mới" />
                <Button onClick={handleSave} size="sm">Lưu</Button>
                <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>Hủy</Button>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-primary">{user?.name}</h1>
                <button onClick={() => setEditing(true)} className="text-xs text-tertiary hover:underline mt-1">Chỉnh sửa</button>
              </>
            )}
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-3 text-sm text-secondary">
              <span className="flex items-center gap-1.5"><Mail size={14} /> {user?.email}</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {formatDate(user?.createdAt)}</span>
              <span className="flex items-center gap-1.5"><Flame size={14} className="text-orange-400" /> {user?.streak || 0} ngày streak</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-surface rounded-md-aqua p-1 shadow-card">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-sm-aqua text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-tertiary/10 text-tertiary' : 'text-secondary hover:text-primary'}`}>
            <tab.icon size={15} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Course Progress */}
            <Card>
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2"><Trophy size={16} className="text-tertiary" /> Tiến độ khóa học</h3>
              <div className="space-y-4">
                {courseList.map(c => {
                  const theme = LANG_THEMES[c.id] || LANG_THEMES.c;
                  let total = 0;
                  c.topics.forEach(t => { total += t.lessons.length * 2; if (t.quiz?.length) total++; });
                  const prog = getCourseProgress(c.id, total);
                  return (
                    <div key={c.id}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-primary flex items-center gap-2">
                          <span className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold" style={{ background: theme.accent }}>{c.icon}</span>
                          {c.name}
                        </span>
                        <span className="font-mono text-secondary">{prog}%</span>
                      </div>
                      <div className="h-2 bg-neutral rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${prog}%`, background: theme.accent }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card className="text-center"><p className="text-2xl font-bold text-primary">{completedSteps}</p><p className="text-xs text-secondary font-mono mt-1">Bước hoàn thành</p></Card>
              <Card className="text-center"><p className="text-2xl font-bold text-primary">{quizScores.length}</p><p className="text-xs text-secondary font-mono mt-1">Quiz đã làm</p></Card>
              <Card className="text-center"><p className="text-2xl font-bold text-primary">{notes.length}</p><p className="text-xs text-secondary font-mono mt-1">Ghi chú</p></Card>
              <Card className="text-center"><p className="text-2xl font-bold text-primary">{bookmarks.length}</p><p className="text-xs text-secondary font-mono mt-1">Bookmark</p></Card>
            </div>

            {/* Achievements */}
            <Card>
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2"><Trophy size={16} className="text-tertiary" /> Thành tựu</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ACHIEVEMENTS.map(a => (
                  <div key={a.id} className="text-center p-3 rounded-md-aqua bg-neutral/50">
                    <span className="text-2xl">{a.icon}</span>
                    <p className="text-xs font-semibold text-primary mt-1">{a.title}</p>
                    <p className="text-[10px] text-secondary">{a.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-3">
            {notes.length === 0 ? (
              <Card className="text-center py-12"><div className="text-4xl mb-3">📝</div><p className="text-secondary">Chưa có ghi chú nào</p></Card>
            ) : notes.map(note => (
              <Card key={note.id} className="flex gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono text-tertiary uppercase tracking-wider">{note.courseId} — {note.lessonTitle}</p>
                  <p className="text-sm text-primary mt-1 whitespace-pre-wrap">{note.content}</p>
                  <p className="text-[10px] text-secondary font-mono mt-2">{timeAgo(note.createdAt)}</p>
                </div>
                <button onClick={() => deleteNote(note.id)} className="p-2 text-secondary/30 hover:text-red-500 transition-colors flex-shrink-0 self-start">
                  <Trash2 size={14} />
                </button>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'bookmarks' && (
          <div className="space-y-3">
            {bookmarks.length === 0 ? (
              <Card className="text-center py-12"><div className="text-4xl mb-3">🔖</div><p className="text-secondary">Chưa có bookmark nào</p></Card>
            ) : bookmarks.map((bm, i) => (
              <Card key={i} className="flex items-center gap-4">
                <Bookmark size={16} className="text-tertiary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary">{bm.stepTitle}</p>
                  <p className="text-xs text-secondary font-mono">{bm.courseId} — Bước {bm.stepIndex + 1}</p>
                </div>
                <p className="text-[10px] text-secondary font-mono flex-shrink-0">{timeAgo(bm.createdAt)}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
