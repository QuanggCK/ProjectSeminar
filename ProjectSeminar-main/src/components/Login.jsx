import React, { useState } from 'react';

export default function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [focused, setFocused] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
            onLogin(username.trim());
        }
    };

    const langs = [
        { icon: '⚡', label: 'C', color: '#2563eb' },
        { icon: '🚀', label: 'C++', color: '#7c3aed' },
        { icon: '☕', label: 'Java', color: '#dc2626' },
        { icon: '🐍', label: 'Python', color: '#d97706' },
    ];

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #0f172a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            fontFamily: "'Inter', sans-serif",
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Decorative circles */}
            {[
                { w: 400, h: 400, top: '-100px', left: '-100px', color: 'rgba(99,102,241,0.08)' },
                { w: 300, h: 300, bottom: '-80px', right: '-80px', color: 'rgba(139,92,246,0.08)' },
                { w: 200, h: 200, top: '30%', right: '10%', color: 'rgba(6,182,212,0.05)' },
            ].map((c, i) => (
                <div key={i} style={{
                    position: 'absolute', width: c.w, height: c.h,
                    borderRadius: '50%', background: c.color,
                    top: c.top, left: c.left, bottom: c.bottom, right: c.right,
                    pointerEvents: 'none',
                }} />
            ))}

            <div style={{
                width: '100%', maxWidth: '460px',
                background: 'rgba(30,41,59,0.75)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '24px',
                padding: '48px 40px',
                boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
                animation: 'fadeInUp 0.6s ease',
            }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: '72px', height: '72px', borderRadius: '20px',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        marginBottom: '16px',
                        boxShadow: '0 8px 24px rgba(99,102,241,0.4)',
                        fontSize: '32px',
                    }}>💻</div>
                    <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#f1f5f9', margin: 0 }}>
                        CLB Tin học NTU
                    </h1>
                    <p style={{ color: '#94a3b8', marginTop: '6px', fontSize: '14px' }}>
                        Nền tảng học lập trình tương tác
                    </p>
                </div>

                {/* Lang badges */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '32px' }}>
                    {langs.map(l => (
                        <div key={l.label} style={{
                            background: `${l.color}22`,
                            border: `1px solid ${l.color}44`,
                            borderRadius: '8px',
                            padding: '6px 12px',
                            fontSize: '12px',
                            fontWeight: 600,
                            color: l.color === '#d97706' ? '#fbbf24' : l.color === '#dc2626' ? '#f87171' : l.color === '#7c3aed' ? '#a78bfa' : '#60a5fa',
                        }}>
                            {l.icon} {l.label}
                        </div>
                    ))}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '8px' }}>
                            Tên đăng nhập
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            placeholder="Nhập tên của bạn để bắt đầu..."
                            required
                            style={{
                                width: '100%',
                                padding: '14px 16px',
                                background: '#0f172a',
                                border: `2px solid ${focused ? '#6366f1' : '#1e293b'}`,
                                borderRadius: '12px',
                                color: '#f1f5f9',
                                fontSize: '15px',
                                fontFamily: "'Inter', sans-serif",
                                outline: 'none',
                                transition: 'border-color 0.2s',
                                boxSizing: 'border-box',
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!username.trim()}
                        style={{
                            width: '100%',
                            padding: '14px',
                            background: username.trim()
                                ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                                : '#1e293b',
                            border: 'none',
                            borderRadius: '12px',
                            color: username.trim() ? 'white' : '#475569',
                            fontSize: '15px',
                            fontWeight: 700,
                            cursor: username.trim() ? 'pointer' : 'not-allowed',
                            transition: 'all 0.2s',
                            letterSpacing: '0.3px',
                        }}
                    >
                        Bắt đầu học ngay →
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#475569' }}>
                    * Không cần mật khẩu. Chỉ cần nhập tên là được!
                </p>

                {/* Stats */}
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '28px', paddingTop: '24px', borderTop: '1px solid #1e293b' }}>
                    {[['4', 'Ngôn ngữ'], ['8', 'Chủ đề'], ['32+', 'Bài học']].map(([n, l]) => (
                        <div key={l} style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '20px', fontWeight: 800, color: '#a5b4fc' }}>{n}</div>
                            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{l}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
