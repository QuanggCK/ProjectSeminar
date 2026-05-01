import React, { useState, useMemo, useEffect } from 'react';
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
    <div className="code-block" style={{ background: '#111827', borderRadius: 12, overflow: 'hidden', border: '1px solid #1f2937' }}>
      <div className="code-block-header" style={{ padding: '12px 20px', background: '#1f2937', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #374151' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="code-block-dots" style={{ display: 'flex', gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#eab308' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
          </div>
          <span style={{ fontSize: 13, color: '#9ca3af', fontWeight: 600 }}>{lang}</span>
        </div>
        <button onClick={copy} style={{ background: 'transparent', border: 'none', color: copied ? '#10b981' : '#9ca3af', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600 }}>
          {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
        </button>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ padding: '20px 0', textAlign: 'right', userSelect: 'none', borderRight: '1px solid #374151', minWidth: 44 }}>
          {lines.map((_, i) => (
            <div key={i} style={{ padding: '0 12px', fontSize: 13, lineHeight: 1.7, color: '#4b5563', fontFamily: "'JetBrains Mono', monospace" }}>{i + 1}</div>
          ))}
        </div>
        <pre style={{ padding: 20, fontFamily: "'JetBrains Mono', monospace", fontSize: 13.5, lineHeight: 1.7, color: '#e5e7eb', overflowX: 'auto', flex: 1, margin: 0, whiteSpace: 'pre' }}>
          {code}
        </pre>
      </div>
    </div>
  );
}

function QuizSection({ quiz, accentColor }) {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setAnswers({});
    setShowResults(false);
  }, [quiz]);

  const select = (qi, oi) => { if (!showResults) setAnswers(p => ({ ...p, [qi]: oi })); };
  const score = quiz.filter((q, i) => answers[i] === q.correct).length;
  const allAnswered = Object.keys(answers).length === quiz.length;
  const reset = () => { setAnswers({}); setShowResults(false); };

  return (
    <div>
      {showResults && (
        <div className="score-card" style={{ background: 'rgba(30,41,59,0.5)', border: '1px solid #334155', borderRadius: 12, padding: 24, textAlign: 'center', marginBottom: 24 }}>
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
          <div key={qi} className="lesson-card" style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 12, padding: 20 }}>
            <p style={{ fontWeight: 600, color: '#e2e8f0', marginBottom: 12, fontSize: 14 }}>
              <span style={{ color: accentColor, fontWeight: 800 }}>Câu {qi + 1}.</span> {q.question}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {q.options.map((opt, oi) => {
                let bg = '#0f172a', border = '1px solid #334155', color = '#cbd5e1';
                if (showResults) {
                  if (oi === q.correct) { bg = 'rgba(34,197,94,0.1)'; border = '1px solid #22c55e'; color = '#22c55e'; }
                  else if (answers[qi] === oi) { bg = 'rgba(239,68,68,0.1)'; border = '1px solid #ef4444'; color = '#ef4444'; }
                  else { opacity: 0.5; }
                } else if (answers[qi] === oi) {
                  bg = `${accentColor}20`; border = `1px solid ${accentColor}`; color = accentColor;
                }
                return (
                  <button key={oi} onClick={() => select(qi, oi)} disabled={showResults} 
                    style={{ background: bg, border, color, padding: '12px 16px', borderRadius: 8, textAlign: 'left', display: 'flex', alignItems: 'center', cursor: showResults ? 'default' : 'pointer', transition: 'all 0.2s', fontSize: 14, fontWeight: 500 }}>
                    <span style={{
                      minWidth: 22, height: 22, borderRadius: '50%',
                      background: showResults && oi === q.correct ? '#22c55e' : (showResults && answers[qi] === oi ? '#ef4444' : '#1e293b'), border: '1px solid #334155', color: showResults && (oi === q.correct || answers[qi] === oi) ? '#fff' : '#94a3b8',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700, flexShrink: 0, marginRight: 12
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
          <button onClick={() => setShowResults(true)} disabled={!allAnswered} 
            style={{ background: accentColor, color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: allAnswered ? 'pointer' : 'not-allowed', opacity: allAnswered ? 1 : 0.4, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <HelpCircle size={16} /> Nộp bài ({Object.keys(answers).length}/{quiz.length})
          </button>
        </div>
      )}
    </div>
  );
}

export default function CourseView() {
  const params = useParams();
  const lang = params.lang || params.id;
  const course = courses[lang];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Flatten course data into wizard steps
  const wizardSteps = useMemo(() => {
    if (!course) return [];
    const steps = [];
    course.topics.forEach((t, tIndex) => {
      t.lessons.forEach((lesson, lIndex) => {
        steps.push({ type: 'theory', topic: t, lesson, tIndex, lIndex, title: lesson.title + ' (Lý thuyết)' });
        if (lesson.code) {
          steps.push({ type: 'code', topic: t, lesson, tIndex, lIndex, title: lesson.title + ' (Ví dụ)' });
        }
      });
      if (t.quiz && t.quiz.length > 0) {
        steps.push({ type: 'quiz', topic: t, quiz: t.quiz, tIndex, title: `Quiz: ${t.title}` });
      }
    });
    return steps;
  }, [course]);

  // Handle course not found
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
  const currentStep = wizardSteps[currentStepIndex];
  if(!currentStep) return null;

  const topic = currentStep.topic;
  const progress = Math.round(((currentStepIndex + 1) / wizardSteps.length) * 100);

  const changeTopic = (tIndex) => { 
    const idx = wizardSteps.findIndex(s => s.tIndex === tIndex);
    if(idx !== -1) {
      setCurrentStepIndex(idx);
      setSidebarOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const nextStep = () => {
    if (currentStepIndex < wizardSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const SidebarContent = () => (
    <>
      <div style={{ background: colors.bg, padding: '18px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 900, color: 'white' }}>{course.name}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{course.topics.length} chủ đề</div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="mobile-menu-btn" style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white' }}>
            <X size={18} />
          </button>
        </div>
        <div style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>
            <span>Tiến độ tổng</span><span>{progress}%</span>
          </div>
          <div style={{ height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 100 }}>
            <div style={{ height: '100%', borderRadius: 100, background: 'rgba(255,255,255,0.9)', width: `${progress}%`, transition: 'width 350ms ease' }} />
          </div>
        </div>
      </div>

      <div style={{ padding: '6px 0' }}>
        <div style={{ padding: '10px 16px 4px', fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#64748b' }}>
          Danh sách chủ đề
        </div>
        {course.topics.map((t, i) => {
          const isActive = currentStep.tIndex === i;
          return (
            <button key={t.id} onClick={() => changeTopic(i)}
              style={{
                width: '100%', textAlign: 'left', background: isActive ? 'rgba(255,255,255,0.03)' : 'transparent', border: 'none',
                padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12, color: isActive ? '#fff' : '#94a3b8',
                cursor: 'pointer', transition: 'all 0.2s', borderLeft: `3px solid ${isActive ? colors.accent : 'transparent'}`
              }}>
              <span style={{ fontSize: 16, minWidth: 20 }}>{topicIcons[t.id] || '📄'}</span>
              <span style={{ fontSize: 14, fontWeight: isActive ? 600 : 500 }}>{t.title}</span>
              {isActive && <span style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: colors.accent, flexShrink: 0 }} />}
            </button>
          );
        })}
      </div>
    </>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', fontFamily: "'Inter', sans-serif", color: '#f1f5f9', display: 'flex', flexDirection: 'column' }}>
      {sidebarOpen && <div className="sidebar-overlay open" onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 140 }} />}

      <header style={{
        background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #1e293b', padding: '0 20px', height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 150,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'none' }}>
            <Menu size={18} />
          </button>
          <Link to="/dashboard" className="breadcrumb-link" style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#94a3b8', textDecoration: 'none', fontSize: 13 }}>
            <ChevronLeft size={14} /> Dashboard
          </Link>
          <span style={{ color: '#334155' }}>/</span>
          <span style={{ fontSize: 13, color: '#cbd5e1' }}>{course.name}</span>
          <span style={{ color: '#334155' }}>/</span>
          <span style={{ fontSize: 13, color: colors.accent, fontWeight: 600 }}>{topic.title}</span>
        </div>
        <span style={{ fontSize: 12, color: '#475569', display: 'flex', alignItems: 'center', gap: 4 }}>
          <Code2 size={12} /> CLB Tin học NTU
        </span>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        <aside style={{ width: 280, minWidth: 280, background: '#070d17', borderRight: '1px solid #1e293b', height: 'calc(100vh - 56px)', position: 'sticky', top: 56, overflowY: 'auto' }} className="desktop-sidebar">
          <SidebarContent />
        </aside>

        <aside className={`sidebar-mobile${sidebarOpen ? ' open' : ''}`} style={{ background: '#070d17', overflowY: 'auto', position: 'fixed', top: 56, bottom: 0, left: sidebarOpen ? 0 : -280, width: 280, zIndex: 145, transition: 'left 0.3s' }}>
          <SidebarContent />
        </aside>

        <main className="content-area" style={{ flex: 1, overflowY: 'auto', padding: '32px 40px', maxWidth: 900, margin: '0 auto' }}>
          
          <div style={{ marginBottom: 32, animation: 'fadeInUp 0.4s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 28 }}>{currentStep.type === 'theory' ? '📖' : currentStep.type === 'code' ? '💻' : '❓'}</span>
              <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, color: '#fff' }}>
                {currentStep.title}
              </h1>
            </div>
            <p style={{ color: '#64748b', fontSize: 14 }}>
              Chủ đề: <strong style={{ color: '#cbd5e1' }}>{topic.title}</strong>
            </p>
          </div>

          <div style={{ minHeight: '50vh', animation: 'fadeInUp 0.5s ease' }}>
            {currentStep.type === 'theory' && (
              <div style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: 15, whiteSpace: 'pre-line' }}>
                {currentStep.lesson.content.split('\n').map((line, idx) => {
                  if (line.startsWith('**') && line.endsWith('**'))
                    return <p key={idx} style={{ color: '#e2e8f0', fontWeight: 700, margin: '14px 0 6px', fontSize: 17 }}>{line.replace(/\*\*/g, '')}</p>;
                  if (line.startsWith('- ') || line.startsWith('* '))
                    return <div key={idx} style={{ display: 'flex', gap: 8, margin: '6px 0' }}>
                      <span style={{ color: colors.accent, marginTop: 2 }}>▸</span>
                      <span dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong style="color:#e2e8f0">$1</strong>').replace(/`(.*?)`/g, '<code style="background:#1e293b;padding:2px 6px;border-radius:4px;font-family:JetBrains Mono,monospace;font-size:13.5px;color:#a5b4fc">$1</code>') }} />
                    </div>;
                  if (line.trim() === '') return <br key={idx} />;
                  return <p key={idx} style={{ margin: '4px 0' }} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#e2e8f0">$1</strong>').replace(/`(.*?)`/g, '<code style="background:#1e293b;padding:2px 6px;border-radius:4px;font-family:JetBrains Mono,monospace;font-size:13.5px;color:#a5b4fc">$1</code>') }} />;
                })}
              </div>
            )}

            {currentStep.type === 'code' && (
              <CodeBlock code={currentStep.lesson.code} lang={currentStep.lesson.lang} />
            )}

            {currentStep.type === 'quiz' && (
              <QuizSection quiz={currentStep.quiz} accentColor={colors.accent} />
            )}
          </div>

          {/* Navigation Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 48, paddingTop: 24, borderTop: '1px solid #1e293b' }}>
            <button onClick={prevStep} disabled={currentStepIndex === 0}
              style={{
                background: '#111827', border: '1px solid #334155', borderRadius: 8,
                color: currentStepIndex === 0 ? '#475569' : '#e2e8f0', padding: '12px 20px',
                cursor: currentStepIndex === 0 ? 'not-allowed' : 'pointer',
                fontSize: 14, fontWeight: 600, fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', gap: 8, transition: 'all 150ms',
              }}>
              <ChevronLeft size={16} /> Quay lại
            </button>
            
            <span style={{ color: '#64748b', fontSize: 13, fontWeight: 600 }}>
              {currentStepIndex + 1} / {wizardSteps.length}
            </span>

            {currentStepIndex === wizardSteps.length - 1 ? (
              <Link to="/dashboard" style={{
                background: colors.bg, border: 'none', borderRadius: 8, textDecoration: 'none',
                color: '#fff', padding: '12px 20px', cursor: 'pointer',
                fontSize: 14, fontWeight: 600, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 8
              }}>
                Hoàn thành khóa học 🎉
              </Link>
            ) : (
              <button onClick={nextStep}
                style={{
                  background: colors.light, border: `1px solid ${colors.border}`, borderRadius: 8,
                  color: colors.accent, padding: '12px 20px', cursor: 'pointer',
                  fontSize: 14, fontWeight: 600, fontFamily: 'inherit',
                  display: 'flex', alignItems: 'center', gap: 8, transition: 'all 150ms',
                }}>
                Tiếp theo <ChevronRight size={16} />
              </button>
            )}
          </div>
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .content-area { padding: 24px 20px !important; }
        }
      `}</style>
    </div>
  );
}
