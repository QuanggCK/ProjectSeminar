import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../data/courses';
import useStore from '../store/useStore';
import { LANG_THEMES, TOPIC_ICONS } from '../utils/constants';
import { BookOpen, Code2, HelpCircle, ChevronLeft, ChevronRight, Menu, X, Copy, Check, RotateCcw, Bookmark, BookmarkCheck, FileText, Send } from 'lucide-react';

function CodeBlock({ code, lang }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const lines = code.split('\n');
  return (
    <div className="rounded-lg-aqua overflow-hidden border border-primary/10" style={{ background: '#0F2E2C' }}>
      <div className="px-5 py-3 flex justify-between items-center border-b border-white/10" style={{ background: '#0a201e' }}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <span className="text-xs font-mono text-white/40 uppercase tracking-wider">{lang}</span>
        </div>
        <button onClick={copy} className="flex items-center gap-1.5 text-xs font-mono text-white/40 hover:text-tertiary transition-colors cursor-pointer">
          {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
        </button>
      </div>
      <div className="flex">
        <div className="py-5 text-right select-none border-r border-white/5 min-w-[44px]">
          {lines.map((_, i) => (<div key={i} className="px-3 text-xs leading-6 font-code text-white/20">{i + 1}</div>))}
        </div>
        <pre className="p-5 font-code text-sm leading-6 text-emerald-100/90 overflow-x-auto flex-1 m-0 whitespace-pre">{code}</pre>
      </div>
    </div>
  );
}

function QuizSection({ quiz, accentColor, courseId, topicId, onSaveScore }) {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  useEffect(() => { setAnswers({}); setShowResults(false); }, [quiz]);
  const select = (qi, oi) => { if (!showResults) setAnswers(p => ({ ...p, [qi]: oi })); };
  const score = quiz.filter((q, i) => answers[i] === q.correct).length;
  const allAnswered = Object.keys(answers).length === quiz.length;
  const reset = () => { setAnswers({}); setShowResults(false); };
  const handleSubmit = () => { setShowResults(true); if (onSaveScore) onSaveScore(courseId, topicId, score, quiz.length); };

  return (
    <div className="animate-fade-in">
      {showResults && (
        <div className="bg-surface rounded-lg-aqua border border-secondary/15 p-6 text-center mb-6 shadow-card">
          <div className="text-5xl mb-3">{score === quiz.length ? '🎉' : score >= quiz.length / 2 ? '👍' : '📚'}</div>
          <div className="text-2xl font-bold text-primary">{score} / {quiz.length} câu đúng</div>
          <p className="text-secondary mt-1 text-sm">{score === quiz.length ? 'Hoàn hảo!' : score >= quiz.length / 2 ? 'Tốt lắm!' : 'Xem lại lý thuyết.'}</p>
          <button onClick={reset} className="mt-4 aqua-btn-secondary text-sm"><RotateCcw size={13} /> Làm lại</button>
        </div>
      )}
      <div className="space-y-4">
        {quiz.map((q, qi) => (
          <div key={qi} className="bg-surface rounded-lg-aqua border border-secondary/10 p-5 shadow-card">
            <p className="font-semibold text-primary mb-3 text-sm"><span className="text-tertiary font-bold">Câu {qi + 1}.</span> {q.question}</p>
            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                let cls = 'bg-neutral border-secondary/10 text-primary';
                if (showResults) {
                  if (oi === q.correct) cls = 'bg-green-50 border-green-300 text-green-700';
                  else if (answers[qi] === oi) cls = 'bg-red-50 border-red-300 text-red-600';
                  else cls = 'bg-neutral/50 border-secondary/5 text-secondary/50';
                } else if (answers[qi] === oi) cls = 'bg-tertiary/10 border-tertiary text-tertiary';
                return (
                  <button key={oi} onClick={() => select(qi, oi)} disabled={showResults}
                    className={`w-full text-left p-3 rounded-md-aqua border flex items-center gap-3 transition-all text-sm font-medium ${cls} ${!showResults ? 'cursor-pointer hover:border-tertiary/50' : ''}`}>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 border ${showResults && oi === q.correct ? 'bg-green-500 text-white border-green-500' : showResults && answers[qi] === oi ? 'bg-red-500 text-white border-red-500' : answers[qi] === oi ? 'bg-tertiary text-on-primary border-tertiary' : 'bg-surface text-secondary border-secondary/20'}`}>{'ABCD'[oi]}</span>
                    <span className="flex-1">{opt}</span>
                    {showResults && oi === q.correct && <Check size={16} className="text-green-500" />}
                    {showResults && answers[qi] === oi && oi !== q.correct && <X size={16} className="text-red-500" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {!showResults && (
        <div className="text-center mt-6">
          <button onClick={handleSubmit} disabled={!allAnswered} className="aqua-btn-primary"><HelpCircle size={16} /> Nộp bài ({Object.keys(answers).length}/{quiz.length})</button>
        </div>
      )}
    </div>
  );
}

function NoteInput({ courseId, lessonTitle, onAdd }) {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const submit = () => { if (text.trim()) { onAdd(courseId, lessonTitle, text.trim()); setText(''); setOpen(false); } };
  if (!open) return <button onClick={() => setOpen(true)} className="aqua-btn-secondary text-sm mt-4"><FileText size={14} /> Ghi chú</button>;
  return (
    <div className="mt-4 bg-surface rounded-md-aqua border border-secondary/15 p-4 animate-scale-in">
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Viết ghi chú..." className="aqua-input min-h-[80px] resize-y text-sm" autoFocus />
      <div className="flex gap-2 mt-2">
        <button onClick={submit} disabled={!text.trim()} className="aqua-btn-primary text-sm"><Send size={13} /> Lưu</button>
        <button onClick={() => { setOpen(false); setText(''); }} className="aqua-btn-secondary text-sm">Hủy</button>
      </div>
    </div>
  );
}

function renderContent(lesson, theme) {
  return lesson.content.split('\n').map((line, idx) => {
    if (line.startsWith('**') && line.endsWith('**'))
      return <p key={idx} className="font-bold text-primary text-lg mt-5 mb-2">{line.replace(/\*\*/g, '')}</p>;
    if (line.startsWith('- ') || line.startsWith('* '))
      return (
        <div key={idx} className="flex gap-2 my-1.5">
          <span style={{ color: theme.accent }} className="mt-0.5 flex-shrink-0">▸</span>
          <span dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>').replace(/`(.*?)`/g, '<code class="bg-neutral px-1.5 py-0.5 rounded text-sm font-code text-tertiary">$1</code>') }} />
        </div>
      );
    if (line.trim() === '') return <br key={idx} />;
    return <p key={idx} className="my-1" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>').replace(/`(.*?)`/g, '<code class="bg-neutral px-1.5 py-0.5 rounded text-sm font-code text-tertiary">$1</code>') }} />;
  });
}

export default function CourseDetailPage() {
  const params = useParams();
  const lang = params.id;
  const course = courses[lang];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { completeStep, saveQuizScore, toggleBookmark, bookmarks, addNote } = useStore();

  const wizardSteps = useMemo(() => {
    if (!course) return [];
    const steps = [];
    course.topics.forEach((t, tIndex) => {
      t.lessons.forEach((lesson, lIndex) => {
        steps.push({ type: 'theory', topic: t, lesson, tIndex, lIndex, title: lesson.title + ' (Lý thuyết)', stepKey: `${t.id}_l${lIndex}_theory` });
        if (lesson.code) steps.push({ type: 'code', topic: t, lesson, tIndex, lIndex, title: lesson.title + ' (Ví dụ)', stepKey: `${t.id}_l${lIndex}_code` });
      });
      if (t.quiz?.length) steps.push({ type: 'quiz', topic: t, quiz: t.quiz, tIndex, title: `Quiz: ${t.title}`, stepKey: `quiz_${t.id}` });
    });
    return steps;
  }, [course]);

  useEffect(() => {
    if (course && wizardSteps[currentStepIndex]?.type !== 'quiz') {
      completeStep(course.id, wizardSteps[currentStepIndex]?.stepKey);
    }
  }, [currentStepIndex]);

  if (!course) return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-xl font-bold text-primary mb-2">Không tìm thấy khóa học</h2>
        <Link to="/courses" className="text-tertiary font-semibold text-sm">← Về danh sách</Link>
      </div>
    </div>
  );

  const theme = LANG_THEMES[lang] || LANG_THEMES.c;
  const step = wizardSteps[currentStepIndex];
  if (!step) return null;
  const topic = step.topic;
  const progress = Math.round(((currentStepIndex + 1) / wizardSteps.length) * 100);
  const isBookmarked = bookmarks.some(b => b.courseId === lang && b.stepIndex === currentStepIndex);

  const changeTopic = (i) => { const idx = wizardSteps.findIndex(s => s.tIndex === i); if (idx !== -1) { setCurrentStepIndex(idx); setSidebarOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); } };
  const next = () => { if (currentStepIndex < wizardSteps.length - 1) { setCurrentStepIndex(currentStepIndex + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); } };
  const prev = () => { if (currentStepIndex > 0) { setCurrentStepIndex(currentStepIndex - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); } };

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {sidebarOpen && <div className="fixed inset-0 bg-primary/40 z-40 lg:hidden animate-fade-in" onClick={() => setSidebarOpen(false)} />}
      <aside className={`fixed lg:sticky top-16 bottom-0 left-0 w-72 bg-surface border-r border-secondary/10 z-50 lg:z-auto overflow-y-auto transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b border-secondary/10" style={{ background: `${theme.accent}08` }}>
          <div className="flex items-center justify-between">
            <div><h3 className="font-bold text-primary text-sm">{course.name}</h3><p className="text-xs text-secondary font-mono">{course.topics.length} chủ đề</p></div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-secondary"><X size={16} /></button>
          </div>
          <div className="mt-3"><div className="flex justify-between text-[10px] font-mono text-secondary mb-1"><span>Tiến độ</span><span>{progress}%</span></div><div className="h-1.5 bg-neutral rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: theme.accent }} /></div></div>
        </div>
        <nav className="py-2">
          <p className="px-4 py-2 text-[10px] font-mono text-secondary uppercase tracking-widest">Chủ đề</p>
          {course.topics.map((t, i) => {
            const isActive = step.tIndex === i;
            return (
              <button key={t.id} onClick={() => changeTopic(i)} className={`w-full text-left px-4 py-3 flex items-center gap-3 text-sm transition-all border-l-[3px] ${isActive ? 'bg-tertiary/5 text-primary font-semibold border-tertiary' : 'text-secondary hover:text-primary border-transparent'}`}>
                <span className="text-base">{TOPIC_ICONS[t.id] || '📄'}</span>
                <span className="flex-1 truncate">{t.title}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: theme.accent }} />}
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="sticky top-16 z-30 bg-surface/95 backdrop-blur-md border-b border-secondary/10 px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1 text-secondary"><Menu size={18} /></button>
              <Link to="/courses" className="text-xs text-secondary hover:text-tertiary flex items-center gap-1"><ChevronLeft size={12} /> Khóa học</Link>
              <span className="text-secondary/30">/</span>
              <span className="text-xs font-semibold text-primary truncate max-w-48">{topic.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => toggleBookmark(lang, currentStepIndex, step.title)} className={`p-2 rounded-sm-aqua transition-colors ${isBookmarked ? 'text-tertiary bg-tertiary/10' : 'text-secondary/40 hover:text-tertiary'}`}>
                {isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
              </button>
              <span className="text-xs font-mono text-secondary">{currentStepIndex + 1}/{wizardSteps.length}</span>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-8 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{step.type === 'theory' ? '📖' : step.type === 'code' ? '💻' : '❓'}</span>
              <h1 className="text-xl sm:text-2xl font-bold text-primary">{step.title}</h1>
            </div>
            <p className="text-sm text-secondary">Chủ đề: <span className="font-semibold" style={{ color: theme.accent }}>{topic.title}</span></p>
          </div>

          <div className="min-h-[40vh] animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {step.type === 'theory' && <div className="text-secondary leading-relaxed">{renderContent(step.lesson, theme)}</div>}
            {step.type === 'code' && <CodeBlock code={step.lesson.code} lang={step.lesson.lang} />}
            {step.type === 'quiz' && <QuizSection quiz={step.quiz} accentColor={theme.accent} courseId={lang} topicId={step.topic.id} onSaveScore={saveQuizScore} />}
          </div>

          {step.type !== 'quiz' && <NoteInput courseId={lang} lessonTitle={step.title} onAdd={addNote} />}

          <div className="flex items-center justify-between mt-12 pt-6 border-t border-secondary/10">
            <button onClick={prev} disabled={currentStepIndex === 0} className="aqua-btn-secondary text-sm"><ChevronLeft size={16} /> Quay lại</button>
            <span className="text-xs font-mono text-secondary hidden sm:block">Bước {currentStepIndex + 1} / {wizardSteps.length}</span>
            {currentStepIndex === wizardSteps.length - 1
              ? <Link to="/courses" className="aqua-btn-primary text-sm">Hoàn thành 🎉</Link>
              : <button onClick={next} className="aqua-btn-primary text-sm">Tiếp theo <ChevronRight size={16} /></button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
