import React from 'react';
import { Link } from 'react-router-dom';
import { courses } from '../data/courses';

const langMeta = {
    c: { emoji: '⚡', bg: 'linear-gradient(135deg, #1d4ed8, #2563eb)', shadow: 'rgba(37,99,235,0.4)' },
    cpp: { emoji: '🚀', bg: 'linear-gradient(135deg, #5b21b6, #7c3aed)', shadow: 'rgba(124,58,237,0.4)' },
    java: { emoji: '☕', bg: 'linear-gradient(135deg, #991b1b, #dc2626)', shadow: 'rgba(220,38,38,0.4)' },
    python: { emoji: '🐍', bg: 'linear-gradient(135deg, #92400e, #d97706)', shadow: 'rgba(217,119,6,0.4)' },
};

const s = {
    page: {
        minHeight: '100vh',
        background: '#0f172a',
        fontFamily: "'Inter', sans-serif",
        color: '#f1f5f9',
    },
    nav: {
        background: 'rgba(15,23,42,0.9)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #1e293b',
        position: 'sticky', top: 0, zIndex: 100,
        padding: '0 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '64px',
    },
    logo: { fontSize: '18px', fontWeight: 800, color: '#f1f5f9', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' },
    userChip: {
        display: 'flex', alignItems: 'center', gap: '10px',
        background: '#1e293b', border: '1px solid #334155',
        borderRadius: '100px', padding: '6px 14px 6px 6px',
    },
    logoutBtn: {
        background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
        color: '#f87171', padding: '6px 14px', borderRadius: '8px',
        cursor: 'pointer', fontSize: '13px', fontWeight: 600,
    },
    hero: {
        padding: '60px 24px 40px',
        maxWidth: '1100px', margin: '0 auto',
        textAlign: 'center',
    },
    heroTitle: { fontSize: '42px', fontWeight: 900, lineHeight: 1.15, margin: '0 0 12px' },
    heroSub: { color: '#64748b', fontSize: '16px', lineHeight: 1.7, maxWidth: '540px', margin: '0 auto 36px' },
    statsRow: { display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '56px' },
    statBox: {
        background: '#1e293b', borderRadius: '16px', padding: '16px 28px',
        textAlign: 'center', border: '1px solid #334155',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '24px', maxWidth: '1100px', margin: '0 auto', padding: '0 24px 60px',
    },
    card: {
        background: '#111827', border: '1px solid #1f2937',
        borderRadius: '20px', overflow: 'hidden',
        cursor: 'pointer', transition: 'transform 0.3s, box-shadow 0.3s',
        textDecoration: 'none', display: 'block',
    },
    footer: {
        textAlign: 'center', padding: '24px',
        borderTop: '1px solid #1e293b',
        color: '#475569', fontSize: '13px',
    },
};

export default function Dashboard({ user, onLogout }) {
    return (
        <div style={s.page}>
            {/* Navbar */}
            <nav style={s.nav}>
                <div style={s.logo}>
                    <span style={{ fontSize: '24px' }}>💻</span>
                    <span>CLB Tin học NTU</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={s.userChip}>
                        <div style={{
                            width: '28px', height: '28px', borderRadius: '50%',
                            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '12px', fontWeight: 700, color: 'white',
                        }}>
                            {user.charAt(0).toUpperCase()}
                        </div>
                        <span style={{ fontSize: '14px', fontWeight: 500, color: '#e2e8f0' }}>{user}</span>
                    </div>
                    <button style={s.logoutBtn} onClick={onLogout}>Đăng xuất</button>
                </div>
            </nav>

            {/* Hero */}
            <div style={s.hero}>
                <div style={{ fontSize: '14px', color: '#6366f1', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>
                    Chào mừng trở lại, {user} 👋
                </div>
                <h1 style={s.heroTitle}>
                    <span style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Học lập trình
                    </span>
                    {' '}cùng CLB
                </h1>
                <p style={s.heroSub}>
                    Từ cơ bản đến nâng cao – C, C++, Java, Python với lý thuyết rõ ràng, code mẫu và quiz tương tác.
                </p>

                {/* Stats */}
                <div style={s.statsRow}>
                    {[['4', 'Ngôn ngữ'], ['8', 'Chủ đề / Ngôn ngữ'], ['32+', 'Bài học'], ['120+', 'Câu hỏi quiz']].map(([n, l]) => (
                        <div key={l} style={s.statBox}>
                            <div style={{ fontSize: '28px', fontWeight: 900, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{n}</div>
                            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{l}</div>
                        </div>
                    ))}
                </div>

                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#94a3b8', marginBottom: '28px' }}>
                    🎯 Chọn ngôn ngữ bạn muốn học
                </h2>
            </div>

            {/* Language cards */}
            <div style={s.grid}>
                {Object.values(courses).map((course) => {
                    const meta = langMeta[course.id];
                    return (
                        <Link
                            key={course.id}
                            to={`/course/${course.id}`}
                            style={s.card}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = `0 20px 40px ${meta.shadow}`;
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {/* Card header */}
                            <div style={{ background: meta.bg, padding: '32px 24px', textAlign: 'center' }}>
                                <div style={{ fontSize: '48px', marginBottom: '8px' }}>{meta.emoji}</div>
                                <div style={{ fontSize: '28px', fontWeight: 900, color: 'white' }}>{course.name}</div>
                            </div>
                            {/* Card body */}
                            <div style={{ padding: '20px 24px 24px' }}>
                                <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6, marginBottom: '16px' }}>
                                    {course.description}
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                                    {course.topics.slice(0, 4).map(t => (
                                        <span key={t.id} style={{
                                            fontSize: '11px', padding: '3px 8px', borderRadius: '6px',
                                            background: '#1e293b', color: '#64748b', border: '1px solid #334155',
                                        }}>{t.icon} {t.title}</span>
                                    ))}
                                    <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', background: '#1e293b', color: '#64748b' }}>
                                        +{course.topics.length - 4} nữa
                                    </span>
                                </div>
                                <div style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    fontSize: '14px', fontWeight: 600,
                                }}>
                                    <span style={{ color: '#6366f1' }}>Học ngay →</span>
                                    <span style={{ color: '#475569', fontSize: '12px' }}>{course.topics.length} chủ đề</span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Footer */}
            <footer style={s.footer}>
                <div>💻 Được thực hiện bởi <strong style={{ color: '#6366f1' }}>CLB Tin học NTU</strong> · Nha Trang University</div>
                <div style={{ marginTop: '4px' }}>Nền tảng học lập trình miễn phí dành cho sinh viên NTU</div>
            </footer>
        </div>
    );
}
