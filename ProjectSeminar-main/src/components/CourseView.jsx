import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../data/courses';

const langColors = {
    c: { accent: '#3b82f6', bg: 'linear-gradient(135deg,#1d4ed8,#2563eb)', light: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.3)' },
    cpp: { accent: '#8b5cf6', bg: 'linear-gradient(135deg,#5b21b6,#7c3aed)', light: 'rgba(139,92,246,0.15)', border: 'rgba(139,92,246,0.3)' },
    java: { accent: '#ef4444', bg: 'linear-gradient(135deg,#991b1b,#dc2626)', light: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.3)' },
    python: { accent: '#f59e0b', bg: 'linear-gradient(135deg,#92400e,#d97706)', light: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.3)' },
};

function CodeBlock({ code, lang }) {
    const [copied, setCopied] = useState(false);
    const copy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };
    return (
        <div style={{ background: '#0d1117', border: '1px solid #30363d', borderRadius: '12px', overflow: 'hidden', margin: '16px 0' }}>
            <div style={{ background: '#161b22', padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #30363d' }}>
                <span style={{ fontSize: '12px', color: '#8b949e', fontFamily: "'JetBrains Mono', monospace" }}>● ● &nbsp;&nbsp;{lang}</span>
                <button onClick={copy} style={{ background: 'transparent', border: 'none', color: '#8b949e', cursor: 'pointer', fontSize: '12px', padding: '2px 8px', borderRadius: '4px', transition: 'color 0.2s' }}>
                    {copied ? '✓ Copied' : 'Copy'}
                </button>
            </div>
            <pre style={{ padding: '20px', fontFamily: "'JetBrains Mono', monospace", fontSize: '13.5px', lineHeight: 1.7, color: '#e6edf3', overflowX: 'auto', margin: 0, whiteSpace: 'pre' }}>
                {code}
            </pre>
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
                <div style={{
                    background: score === quiz.length ? 'rgba(34,197,94,0.1)' : score >= quiz.length / 2 ? 'rgba(251,191,36,0.1)' : 'rgba(239,68,68,0.1)',
                    border: `1px solid ${score === quiz.length ? 'rgba(34,197,94,0.3)' : score >= quiz.length / 2 ? 'rgba(251,191,36,0.3)' : 'rgba(239,68,68,0.3)'}`,
                    borderRadius: '16px', padding: '24px', textAlign: 'center', marginBottom: '24px',
                }}>
                    <div style={{ fontSize: '40px', marginBottom: '8px' }}>
                        {score === quiz.length ? '🎉' : score >= quiz.length / 2 ? '👍' : '📚'}
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#f1f5f9' }}>
                        {score} / {quiz.length} câu đúng
                    </div>
                    <div style={{ color: '#94a3b8', marginTop: '4px', fontSize: '14px' }}>
                        {score === quiz.length ? 'Hoàn hảo! Bạn đã nắm vững chủ đề này.' : score >= quiz.length / 2 ? 'Tốt lắm! Hãy ôn lại các câu sai.' : 'Hãy xem lại lý thuyết và thử lại.'}
                    </div>
                    <button onClick={reset} style={{ marginTop: '12px', background: 'transparent', border: `1px solid ${accentColor}`, color: accentColor, borderRadius: '8px', padding: '8px 20px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
                        Làm lại
                    </button>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {quiz.map((q, qi) => (
                    <div key={qi} style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '14px', padding: '20px' }}>
                        <p style={{ fontWeight: 600, color: '#e2e8f0', marginBottom: '14px', fontSize: '15px' }}>
                            <span style={{ color: accentColor }}>Câu {qi + 1}.</span> {q.question}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {q.options.map((opt, oi) => {
                                let bg = '#0f172a', border = '#1e293b', color = '#94a3b8';
                                if (showResults) {
                                    if (oi === q.correct) { bg = 'rgba(34,197,94,0.15)'; border = 'rgba(34,197,94,0.4)'; color = '#86efac'; }
                                    else if (answers[qi] === oi) { bg = 'rgba(239,68,68,0.15)'; border = 'rgba(239,68,68,0.4)'; color = '#fca5a5'; }
                                    else { color = '#475569'; }
                                } else if (answers[qi] === oi) {
                                    bg = `${accentColor}22`; border = accentColor; color = '#e2e8f0';
                                }
                                return (
                                    <button key={oi} onClick={() => select(qi, oi)} disabled={showResults}
                                        style={{
                                            textAlign: 'left', padding: '12px 16px', borderRadius: '10px',
                                            background: bg, border: `1px solid ${border}`, color,
                                            cursor: showResults ? 'default' : 'pointer', fontSize: '14px',
                                            transition: 'all 0.15s', fontFamily: "'Inter', sans-serif",
                                            display: 'flex', alignItems: 'center', gap: '8px',
                                        }}>
                                        <span style={{ minWidth: '20px', height: '20px', borderRadius: '50%', background: border + '44', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}>
                                            {['A', 'B', 'C', 'D'][oi]}
                                        </span>
                                        {opt}
                                        {showResults && oi === q.correct && ' ✓'}
                                        {showResults && answers[qi] === oi && oi !== q.correct && ' ✗'}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {!showResults && (
                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <button onClick={() => setShowResults(true)} disabled={!allAnswered}
                        style={{
                            background: allAnswered ? `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)` : '#1e293b',
                            border: 'none', color: allAnswered ? 'white' : '#475569',
                            padding: '12px 36px', borderRadius: '10px', fontWeight: 700,
                            fontSize: '15px', cursor: allAnswered ? 'pointer' : 'not-allowed',
                            fontFamily: "'Inter', sans-serif",
                        }}>
                        Nộp bài ({Object.keys(answers).length}/{quiz.length})
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
    const [tab, setTab] = useState('theory'); // 'theory' | 'code' | 'quiz'

    if (!course) {
        return (
            <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f1f5f9', fontFamily: "'Inter', sans-serif" }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
                    <h2>Không tìm thấy ngôn ngữ này</h2>
                    <Link to="/dashboard" style={{ color: '#6366f1', marginTop: '16px', display: 'inline-block' }}>← Về trang chủ</Link>
                </div>
            </div>
        );
    }

    const colors = langColors[lang] || langColors.c;
    const topic = course.topics[topicIndex];

    const tabStyle = (t) => ({
        padding: '8px 18px', borderRadius: '8px', border: 'none',
        background: tab === t ? colors.accent : 'transparent',
        color: tab === t ? 'white' : '#64748b',
        fontWeight: 600, fontSize: '13px', cursor: 'pointer',
        fontFamily: "'Inter', sans-serif", transition: 'all 0.2s',
        display: 'flex', alignItems: 'center', gap: '6px',
    });

    return (
        <div style={{ minHeight: '100vh', background: '#0f172a', fontFamily: "'Inter', sans-serif", color: '#f1f5f9', display: 'flex', flexDirection: 'column' }}>
            {/* Top bar */}
            <header style={{ background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #1e293b', padding: '0 24px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Link to="/dashboard" style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        ← Dashboard
                    </Link>
                    <span style={{ color: '#1e293b' }}>/</span>
                    <span style={{ fontSize: '13px', color: '#94a3b8' }}>{course.name}</span>
                    <span style={{ color: '#1e293b' }}>/</span>
                    <span style={{ fontSize: '13px', color: colors.accent, fontWeight: 600 }}>{topic.title}</span>
                </div>
                <div style={{ fontSize: '13px', color: '#475569' }}>
                    💻 CLB Tin học NTU
                </div>
            </header>

            <div style={{ display: 'flex', flex: 1 }}>
                {/* Sidebar */}
                <aside style={{ width: '280px', minWidth: '280px', background: '#070d17', borderRight: '1px solid #1e293b', height: 'calc(100vh - 60px)', position: 'sticky', top: '60px', overflowY: 'auto' }}>
                    {/* Lang header */}
                    <div style={{ background: colors.bg, padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ fontSize: '22px', fontWeight: 900 }}>{course.name}</div>
                        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>{course.topics.length} chủ đề</div>
                    </div>

                    {/* Topic list */}
                    <div style={{ padding: '8px 0' }}>
                        <div style={{ padding: '10px 16px 6px', fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#334155' }}>
                            Nội dung khóa học
                        </div>
                        {course.topics.map((t, i) => (
                            <button key={t.id} onClick={() => { setTopicIndex(i); setTab('theory'); }}
                                style={{
                                    width: '100%', textAlign: 'left', padding: '11px 20px',
                                    background: i === topicIndex ? colors.light : 'transparent',
                                    borderLeft: `3px solid ${i === topicIndex ? colors.accent : 'transparent'}`,
                                    border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                                    display: 'flex', alignItems: 'center', gap: '10px',
                                    fontFamily: "'Inter', sans-serif",
                                }}>
                                <span style={{ fontSize: '16px', minWidth: '22px' }}>{t.icon}</span>
                                <span style={{ fontSize: '13.5px', fontWeight: i === topicIndex ? 700 : 400, color: i === topicIndex ? '#e2e8f0' : '#64748b' }}>
                                    {t.title}
                                </span>
                                {i === topicIndex && (
                                    <span style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: colors.accent, flexShrink: 0 }} />
                                )}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Main content */}
                <main style={{ flex: 1, overflowY: 'auto', padding: '28px 36px' }}>
                    {/* Topic header */}
                    <div style={{ marginBottom: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                            <span style={{ fontSize: '28px' }}>{topic.icon}</span>
                            <h1 style={{ fontSize: '26px', fontWeight: 800, margin: 0 }}>{topic.title}</h1>
                            <span style={{ background: colors.light, border: `1px solid ${colors.border}`, color: colors.accent, fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '100px' }}>
                                {course.name}
                            </span>
                        </div>
                        <p style={{ color: '#64748b', fontSize: '14px' }}>
                            {topic.lessons.length} bài học · {topic.quiz.length} câu hỏi
                        </p>
                    </div>

                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: '4px', background: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '4px', marginBottom: '24px', width: 'fit-content' }}>
                        <button style={tabStyle('theory')} onClick={() => setTab('theory')}>📖 Lý thuyết</button>
                        <button style={tabStyle('code')} onClick={() => setTab('code')}>💻 Code mẫu</button>
                        <button style={tabStyle('quiz')} onClick={() => setTab('quiz')}>❓ Quiz</button>
                    </div>

                    {/* Theory tab */}
                    {tab === 'theory' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {topic.lessons.map((lesson, li) => (
                                <div key={li} style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '14px', padding: '24px' }}>
                                    <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#e2e8f0', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ background: colors.light, border: `1px solid ${colors.border}`, color: colors.accent, borderRadius: '8px', width: '28px', height: '28px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 800, flexShrink: 0 }}>
                                            {li + 1}
                                        </span>
                                        {lesson.title}
                                    </h3>
                                    <div style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '14.5px', whiteSpace: 'pre-line' }}>
                                        {lesson.content.split('\n').map((line, idx) => {
                                            if (line.startsWith('**') && line.endsWith('**')) {
                                                return <p key={idx} style={{ color: '#c7d2fe', fontWeight: 700, margin: '10px 0 4px' }}>{line.replace(/\*\*/g, '')}</p>;
                                            }
                                            if (line.startsWith('- ') || line.startsWith('* ')) {
                                                return <div key={idx} style={{ display: 'flex', gap: '8px', margin: '4px 0' }}>
                                                    <span style={{ color: colors.accent, marginTop: '2px' }}>▸</span>
                                                    <span dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong style="color:#c7d2fe">$1</strong>').replace(/`(.*?)`/g, '<code style="background:#1e293b;padding:1px 5px;border-radius:4px;font-family:JetBrains Mono,monospace;font-size:13px;color:#a5b4fc">$1</code>') }} />
                                                </div>;
                                            }
                                            if (line.trim() === '') return <br key={idx} />;
                                            return <p key={idx} style={{ margin: '2px 0' }} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#c7d2fe">$1</strong>').replace(/`(.*?)`/g, '<code style="background:#1e293b;padding:1px 5px;border-radius:4px;font-family:JetBrains Mono,monospace;font-size:13px;color:#a5b4fc">$1</code>') }} />;
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Code tab */}
                    {tab === 'code' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {topic.lessons.map((lesson, li) => (
                                <div key={li} style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '14px', padding: '24px' }}>
                                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#e2e8f0', marginBottom: '12px' }}>
                                        #{li + 1} – {lesson.title}
                                    </h3>
                                    <CodeBlock code={lesson.code} lang={lesson.lang} />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Quiz tab */}
                    {tab === 'quiz' && (
                        <div>
                            <div style={{ marginBottom: '20px', color: '#64748b', fontSize: '14px' }}>
                                🎯 Trả lời {topic.quiz.length} câu hỏi để kiểm tra kiến thức của bạn.
                            </div>
                            <QuizSection quiz={topic.quiz} accentColor={colors.accent} />
                        </div>
                    )}

                    {/* Prev/Next navigation */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '36px', paddingTop: '24px', borderTop: '1px solid #1e293b' }}>
                        <button
                            onClick={() => { if (topicIndex > 0) { setTopicIndex(topicIndex - 1); setTab('theory'); } }}
                            disabled={topicIndex === 0}
                            style={{ background: topicIndex === 0 ? '#1e293b' : '#111827', border: '1px solid #334155', color: topicIndex === 0 ? '#334155' : '#e2e8f0', padding: '10px 20px', borderRadius: '10px', cursor: topicIndex === 0 ? 'not-allowed' : 'pointer', fontSize: '13px', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}
                        >
                            ← Chủ đề trước
                        </button>
                        <button
                            onClick={() => { if (topicIndex < course.topics.length - 1) { setTopicIndex(topicIndex + 1); setTab('theory'); } }}
                            disabled={topicIndex === course.topics.length - 1}
                            style={{ background: topicIndex === course.topics.length - 1 ? '#1e293b' : colors.light, border: `1px solid ${topicIndex === course.topics.length - 1 ? '#334155' : colors.border}`, color: topicIndex === course.topics.length - 1 ? '#334155' : colors.accent, padding: '10px 20px', borderRadius: '10px', cursor: topicIndex === course.topics.length - 1 ? 'not-allowed' : 'pointer', fontSize: '13px', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}
                        >
                            Chủ đề tiếp →
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}
