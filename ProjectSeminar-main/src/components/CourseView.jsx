import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../data/courses';
import { BookOpen, Code2, HelpCircle, ChevronLeft, ChevronRight, Menu, X, Copy, Check, RotateCcw } from 'lucide-react';

const langColors = {
  c:      { accent: '#3b82f6', bg: 'linear-gradient(135deg,#1d4ed8,#2563eb)', light: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.25)' },
  cpp:    { accent: '#8b5cf6', bg: 'linear-gradient(135deg,#5b21b6,#7c3aed)', light: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.25)' },
  java:   { accent: '#ef4444', bg: 'linear-gradient(135deg,#991b1b,#dc2626)', light: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.25)' },
  python: { accent: '#f59e0b', bg: 'linear-gradient(135deg,#92400e,#d97706)', light: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)' },
};

const topicIcons = {
  intro: '🚀', basic: '📦', control: '🔀', functions: '⚡',
  'data-structure': '🗂️', memory: '🧠', oop: '🏛️', advanced: '🔥',
};

function CodeBlock({ code, lang }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const lines = code.split('\n');
  return (
    <div className="code-block">
      <div className="code-block-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="code-block-dots"><span /><span /><span /></div>
          <span>{lang}</span>
        </div>
        <button onClick={copy} className={`copy-btn${copied ? ' copied' : ''}`}>
          {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
        </button>
      </div>
      <div style={{ display: 'flex' }}>
        {/* Line numbers */}
        <div style={{
          padding: '20px 0', textAlign: 'right', userSelect: 'none',
          borderRight: '1px solid #30363d', minWidth: 44,
        }}>
          {lines.map((_, i) => (
            <div key={i} style={{ padding: '0 12px', fontSize: 13, lineHeight: 1.7, color: '#484f58', fontFamily: "'JetBrains Mono', monospace" }}>
              {i + 1}
            </div>
          ))}
        </div>
        <pre style={{ padding: 20, fontFamily: "'JetBrains Mono', monospace", fontSize: 13.5, lineHeight: 1.7, color: '#e6edf3', overflowX: 'auto', flex: 1, margin: 0, whiteSpace: 'pre' }}>
          {code}
        </pre>
      </div>
    </div>
  );
}

function QuizSection({ quiz, accentColor }) {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const select = (qi, oi) => { if (!showResults) setAnswers(p => ({ ...p, [qi]: oi })); };
  const score = quiz.filter((q, i) => answers[i] === q.correct).length;
  const allAnswered = Object.keys(answers).length === quiz.length;
  const reset = () => { setAnswers({}); setShowResults(false); };

  return (
    <div>
      {showResults && (
        <div className="score-card">
          <div style={{ fontSize: 40, marginBottom: 8 }}>{score === quiz.length ? '🎉' : score >= quiz.length / 2 ? '👍' : '📚'}</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9' }}>{score} / {quiz.length} câu đúng</div>
          <div style={{ color: '#94a3b8', marginTop: 6, fontSize: 14 }}>
            {score === quiz.length ? 'Hoàn hảo! Bạn nắm vững rồi.' : score >= quiz.length / 2 ? 'Tốt lắm! Ôn lại câu sai nhé.' : 'Xem lại lý thuyết và thử lại.'}
          </div>
          <button onClick={reset} style={{
            marginTop: 14, background: 'transparent', border: `1px solid ${accentColor}`,
            color: accentColor, borderRadius: 8, padding: '8px 20px', cursor: 'pointer',
            fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
            display: 'inline-flex', alignItems: 'center', gap: 6, transition: 'all 150ms',
          }}><RotateCcw size={13} /> Làm lại</button>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {quiz.map((q, qi) => (
          <div key={qi} className="lesson-card" style={{ padding: 20 }}>
            <p style={{ fontWeight: 600, color: '#e2e8f0', marginBottom: 12, fontSize: 14 }}>
              <span style={{ color: accentColor, fontWeight: 800 }}>Câu {qi + 1}.</span> {q.question}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {q.options.map((opt, oi) => {
                let cls = 'quiz-option';
                if (showResults) {
                  if (oi === q.correct) cls += ' correct';
                  else if (answers[qi] === oi) cls += ' wrong';
                  else cls += ' dim';
                } else if (answers[qi] === oi) cls += ' selected';
                return (
                  <button key={oi} onClick={() => select(qi, oi)} disabled={showResults} className={cls}>
                    <span style={{
                      minWidth: 22, height: 22, borderRadius: '50%',
                      background: '#1e293b', border: '1px solid #334155',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700, flexShrink: 0,
                    }}>{'ABCD'[oi]}</span>
                    <span>{opt}</span>
                    {showResults && oi === q.correct && <Check size={16} color="#22c55e" style={{ marginLeft: 'auto' }} />}
                    {showResults && answers[qi] === oi && oi !== q.correct && <X size={16} color="#ef4444" style={{ marginLeft: 'auto' }} />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!showResults && (
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button onClick={() => setShowResults(true)} disabled={!allAnswered} className="btn-primary"
            style={{ opacity: allAnswered ? 1 : 0.4, cursor: allAnswered ? 'pointer' : 'not-allowed' }}>
            <HelpCircle size={16} /> Nộp bài ({Object.keys(answers).length}/{quiz.length})
          </button>
        </div>
      )}
    </div>
  );
}

export default function CourseView() {
  const { lang } = useParams();
  const course = courses[lang];
  const [topicIndex, setTopicIndex] = useState(0);
  const [tab, setTab] = useState('theory');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!course) {
    return (
      <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f1f5f9', fontFamily: "'Inter', sans-serif" }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🔍</div>
          <h2 style={{ marginBottom: 12 }}>Không tìm thấy ngôn ngữ này</h2>
          <Link to="/dashboard" style={{ color: '#6366f1', fontSize: 14 }}>← Về trang chủ</Link>
        </div>
      </div>
    );
  }

  const colors = langColors[lang] || langColors.c;
  const topic = course.topics[topicIndex];
  const progress = Math.round(((topicIndex + 1) / course.topics.length) * 100);

  const changeTopic = (i) => { setTopicIndex(i); setTab('theory'); setSidebarOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const SidebarContent = () => (
    <>
      {/* Lang header */}
      <div style={{ background: colors.bg, padding: '18px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 900, color: 'white' }}>{course.name}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{course.topics.length} chủ đề</div>
          </div>
          {/* Mobile close */}
          <button onClick={() => setSidebarOpen(false)} className="mobile-menu-btn" style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white' }}>
            <X size={18} />
          </button>
        </div>
        {/* Progress */}
        <div style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>
            <span>Tiến độ</span><span>{topicIndex + 1}/{course.topics.length}</span>
          </div>
          <div style={{ height: 3, background: 'rgba(255,255,255,0.15)', borderRadius: 100 }}>
            <div style={{ height: '100%', borderRadius: 100, background: 'rgba(255,255,255,0.7)', width: `${progress}%`, transition: 'width 350ms ease' }} />
          </div>
        </div>
      </div>

      {/* Topic list */}
      <div style={{ padding: '6px 0' }}>
        <div style={{ padding: '10px 16px 4px', fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#334155' }}>
          Nội dung
        </div>
        {course.topics.map((t, i) => (
          <button key={t.id} onClick={() => changeTopic(i)}
            className={`topic-item${i === topicIndex ? ' active' : ''}`}
            style={{ borderLeft: `3px solid ${i === topicIndex ? colors.accent : 'transparent'}` }}>
            <span style={{ fontSize: 15, minWidth: 20 }}>{topicIcons[t.id] || '📄'}</span>
            <span>{t.title}</span>
            {i === topicIndex && <span style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: colors.accent, flexShrink: 0 }} />}
          </button>
        ))}
      </div>
    </>
  );

  const tabData = [
    { key: 'theory', icon: BookOpen, label: 'Lý thuyết' },
    { key: 'code', icon: Code2, label: 'Code mẫu' },
    { key: 'quiz', icon: HelpCircle, label: 'Quiz' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', fontFamily: "'Inter', sans-serif", color: '#f1f5f9', display: 'flex', flexDirection: 'column' }}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && <div className="sidebar-overlay open" onClick={() => setSidebarOpen(false)} />}

      {/* Top bar */}
      <header style={{
        background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #1e293b', padding: '0 20px', height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 150,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Mobile hamburger */}
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
            <Menu size={18} />
          </button>
          <Link to="/dashboard" className="breadcrumb-link" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <ChevronLeft size={14} /> Dashboard
          </Link>
          <span style={{ color: '#1e293b' }}>/</span>
          <span style={{ fontSize: 13, color: '#94a3b8' }}>{course.name}</span>
          <span style={{ color: '#1e293b' }}>/</span>
          <span style={{ fontSize: 13, color: colors.accent, fontWeight: 600 }}>{topic.title}</span>
        </div>
        <span style={{ fontSize: 12, color: '#334155', display: 'flex', alignItems: 'center', gap: 4 }}>
          <Code2 size={12} /> CLB Tin học NTU
        </span>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Desktop sidebar */}
        <aside style={{
          width: 280, minWidth: 280, background: '#070d17',
          borderRight: '1px solid #1e293b', height: 'calc(100vh - 56px)',
          position: 'sticky', top: 56, overflowY: 'auto',
        }}
          className="desktop-sidebar"
        >
          <SidebarContent />
        </aside>

        {/* Mobile sidebar */}
        <aside className={`sidebar-mobile${sidebarOpen ? ' open' : ''}`}
          style={{ background: '#070d17', overflowY: 'auto' }}>
          <SidebarContent />
        </aside>

        {/* Main content */}
        <main className="content-area" style={{ flex: 1, overflowY: 'auto', padding: '28px 36px' }}>
          {/* Topic header */}
          <div style={{ marginBottom: 20, animation: 'fadeInUp 0.4s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 26 }}>{topicIcons[topic.id] || '📄'}</span>
              <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>{topic.title}</h1>
              <span style={{ background: colors.light, border: `1px solid ${colors.border}`, color: colors.accent, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100 }}>
                {course.name}
              </span>
            </div>
            <p style={{ color: '#475569', fontSize: 13 }}>
              {topic.lessons.length} bài học · {topic.quiz.length} câu hỏi
            </p>
          </div>

          {/* Tabs */}
          <div className="tab-group" style={{ marginBottom: 24 }}>
            {tabData.map(t => (
              <button key={t.key} className={`tab-btn${tab === t.key ? ' active' : ''}`}
                onClick={() => setTab(t.key)}>
                <t.icon size={14} /> {t.label}
              </button>
            ))}
          </div>

          {/* Theory */}
          {tab === 'theory' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {topic.lessons.map((lesson, li) => (
                <div key={li} className="lesson-card">
                  <h3>
                    <span style={{
                      background: colors.light, border: `1px solid ${colors.border}`, color: colors.accent,
                      borderRadius: 8, width: 28, height: 28, display: 'inline-flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: 13, fontWeight: 800, flexShrink: 0,
                    }}>{li + 1}</span>
                    {lesson.title}
                  </h3>
                  <div style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: 14.5, whiteSpace: 'pre-line' }}>
                    {lesson.content.split('\n').map((line, idx) => {
                      if (line.startsWith('**') && line.endsWith('**'))
                        return <p key={idx} style={{ color: '#c7d2fe', fontWeight: 700, margin: '10px 0 4px' }}>{line.replace(/\*\*/g, '')}</p>;
                      if (line.startsWith('- ') || line.startsWith('* '))
                        return <div key={idx} style={{ display: 'flex', gap: 8, margin: '3px 0' }}>
                          <span style={{ color: colors.accent, marginTop: 2 }}>▸</span>
                          <span dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong style="color:#c7d2fe">$1</strong>').replace(/`(.*?)`/g, '<code style="background:#1e293b;padding:1px 6px;border-radius:4px;font-family:JetBrains Mono,monospace;font-size:12.5px;color:#a5b4fc">$1</code>') }} />
                        </div>;
                      if (line.trim() === '') return <br key={idx} />;
                      return <p key={idx} style={{ margin: '2px 0' }} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#c7d2fe">$1</strong>').replace(/`(.*?)`/g, '<code style="background:#1e293b;padding:1px 6px;border-radius:4px;font-family:JetBrains Mono,monospace;font-size:12.5px;color:#a5b4fc">$1</code>') }} />;
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Code */}
          {tab === 'code' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {topic.lessons.map((lesson, li) => (
                <div key={li} className="lesson-card">
                  <h3 style={{ fontSize: 15 }}>
                    <Code2 size={16} color={colors.accent} /> {lesson.title}
                  </h3>
                  <CodeBlock code={lesson.code} lang={lesson.lang} />
                </div>
              ))}
            </div>
          )}

          {/* Quiz */}
          {tab === 'quiz' && (
            <div>
              <div style={{ marginBottom: 18, color: '#475569', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                <HelpCircle size={14} /> Trả lời {topic.quiz.length} câu hỏi để kiểm tra kiến thức.
              </div>
              <QuizSection quiz={topic.quiz} accentColor={colors.accent} />
            </div>
          )}

          {/* Nav buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, paddingTop: 20, borderTop: '1px solid #1e293b' }}>
            <button onClick={() => topicIndex > 0 && changeTopic(topicIndex - 1)}
              disabled={topicIndex === 0}
              style={{
                background: '#111827', border: '1px solid #1f2937', borderRadius: 10,
                color: topicIndex === 0 ? '#334155' : '#e2e8f0', padding: '10px 18px',
                cursor: topicIndex === 0 ? 'not-allowed' : 'pointer',
                fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', gap: 6, transition: 'all 150ms',
              }}><ChevronLeft size={15} /> Chủ đề trước</button>
            <button onClick={() => topicIndex < course.topics.length - 1 && changeTopic(topicIndex + 1)}
              disabled={topicIndex === course.topics.length - 1}
              style={{
                background: topicIndex === course.topics.length - 1 ? '#111827' : colors.light,
                border: `1px solid ${topicIndex === course.topics.length - 1 ? '#1f2937' : colors.border}`,
                borderRadius: 10,
                color: topicIndex === course.topics.length - 1 ? '#334155' : colors.accent,
                padding: '10px 18px', cursor: topicIndex === course.topics.length - 1 ? 'not-allowed' : 'pointer',
                fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', gap: 6, transition: 'all 150ms',
              }}>Chủ đề tiếp <ChevronRight size={15} /></button>
          </div>
        </main>
      </div>

      {/* Hide desktop sidebar on mobile */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
        }
      `}</style>
    </div>
  );
}
