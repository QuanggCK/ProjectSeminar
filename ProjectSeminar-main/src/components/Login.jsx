import React, { useState } from 'react';
import { BookOpen, Code2, Users, Zap, ArrowRight, Loader2 } from 'lucide-react';

const features = [
  { icon: BookOpen, label: '32+ bài học chi tiết', color: '#6366f1' },
  { icon: Code2, label: 'Code mẫu chạy thực tế', color: '#22c55e' },
  { icon: Users, label: 'Quiz kiểm tra kiến thức', color: '#f59e0b' },
  { icon: Zap, label: '4 ngôn ngữ: C, C++, Java, Python', color: '#06b6d4' },
];

const langs = [
  { label: 'C', color: '#3b82f6' },
  { label: 'C++', color: '#8b5cf6' },
  { label: 'Java', color: '#ef4444' },
  { label: 'Python', color: '#f59e0b' },
];

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && !loading) {
      setLoading(true);
      setTimeout(() => onLogin(username.trim()), 600);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative blobs */}
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', top: '-15%', left: '-10%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)', bottom: '-10%', right: '-5%', pointerEvents: 'none' }} />

      <div style={{
        width: '100%', maxWidth: 480,
        background: 'rgba(30,41,59,0.65)', backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24,
        padding: '44px 40px', boxShadow: '0 32px 64px rgba(0,0,0,0.5)',
        animation: 'fadeInUp 0.6s ease',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 68, height: 68, borderRadius: 18,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            marginBottom: 14, boxShadow: '0 8px 28px rgba(99,102,241,0.35)',
          }}>
            <Code2 size={32} color="white" strokeWidth={2.5} />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9', margin: 0 }}>CLB Tin học NTU</h1>
          <p style={{ color: '#64748b', marginTop: 4, fontSize: 13 }}>Nền tảng học lập trình tương tác</p>
        </div>

        {/* Language tags */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 24 }}>
          {langs.map(l => (
            <span key={l.label} style={{
              background: `${l.color}18`, border: `1px solid ${l.color}35`,
              borderRadius: 6, padding: '4px 12px', fontSize: 11, fontWeight: 700, color: l.color,
              transition: 'transform 150ms ease',
            }}>{l.label}</span>
          ))}
        </div>

        {/* Feature list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
          {features.map((f, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 12px', borderRadius: 10,
              background: 'rgba(255,255,255,0.03)',
              animation: `fadeInUp ${0.4 + i * 0.08}s ease forwards`,
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: 8,
                background: `${f.color}15`, border: `1px solid ${f.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <f.icon size={14} color={f.color} />
              </div>
              <span style={{ fontSize: 13, color: '#94a3b8' }}>{f.label}</span>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 6, letterSpacing: '0.3px' }}>
              TÊN ĐĂNG NHẬP
            </label>
            <input
              type="text" value={username}
              onChange={e => setUsername(e.target.value)}
              onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
              placeholder="Nhập tên của bạn..."
              required disabled={loading}
              style={{
                width: '100%', padding: '13px 16px',
                background: '#0f172a', border: `2px solid ${focused ? '#6366f1' : '#1e293b'}`,
                borderRadius: 10, color: '#f1f5f9', fontSize: 14,
                fontFamily: "'Inter', sans-serif", outline: 'none',
                transition: 'border-color 200ms ease', boxSizing: 'border-box',
              }}
            />
          </div>

          <button type="submit" disabled={!username.trim() || loading}
            style={{
              width: '100%', padding: '13px',
              background: username.trim() ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : '#1e293b',
              border: 'none', borderRadius: 10,
              color: username.trim() ? 'white' : '#475569',
              fontSize: 14, fontWeight: 700,
              cursor: username.trim() && !loading ? 'pointer' : 'not-allowed',
              transition: 'all 250ms ease',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
            {loading ? (
              <><Loader2 size={16} style={{ animation: 'spin 0.6s linear infinite' }} /> Đang vào...</>
            ) : (
              <>Bắt đầu học ngay <ArrowRight size={16} /></>
            )}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 16, fontSize: 11, color: '#475569' }}>
          Không cần mật khẩu · Chỉ nhập tên là được
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 24, paddingTop: 20, borderTop: '1px solid #1e293b' }}>
          {[['4', 'Ngôn ngữ'], ['8', 'Chủ đề'], ['32+', 'Bài học']].map(([n, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#a5b4fc' }}>{n}</div>
              <div style={{ fontSize: 10, color: '#475569', marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
