import React from 'react';
import { Link } from 'react-router-dom';
import { courses } from '../data/courses';
import { LogOut, BookOpen, Code2, HelpCircle, Layers, ArrowRight, Github, Globe, Heart } from 'lucide-react';

const langMeta = {
  c:      { icon: Code2,    bg: 'linear-gradient(135deg, #1d4ed8, #3b82f6)', shadow: 'rgba(59,130,246,0.35)', iconColor: '#93c5fd' },
  cpp:    { icon: Layers,   bg: 'linear-gradient(135deg, #5b21b6, #8b5cf6)', shadow: 'rgba(139,92,246,0.35)', iconColor: '#c4b5fd' },
  java:   { icon: BookOpen, bg: 'linear-gradient(135deg, #991b1b, #ef4444)', shadow: 'rgba(239,68,68,0.35)', iconColor: '#fca5a5' },
  python: { icon: Globe,    bg: 'linear-gradient(135deg, #92400e, #f59e0b)', shadow: 'rgba(245,158,11,0.35)', iconColor: '#fcd34d' },
};

export default function Dashboard({ user, onLogout }) {
  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', fontFamily: "'Inter', sans-serif", color: '#f1f5f9' }}>
      {/* Navbar */}
      <nav style={{
        background: 'rgba(15,23,42,0.92)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #1e293b', position: 'sticky', top: 0, zIndex: 100,
        padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Code2 size={16} color="white" strokeWidth={2.5} />
          </div>
          <span style={{ fontSize: 16, fontWeight: 800 }}>CLB Tin học NTU</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#1e293b', border: '1px solid #334155',
            borderRadius: 100, padding: '5px 14px 5px 5px',
          }}>
            <div style={{
              width: 26, height: 26, borderRadius: '50%',
              background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700, color: 'white',
            }}>{user.charAt(0).toUpperCase()}</div>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#e2e8f0' }}>{user}</span>
          </div>
          <button onClick={onLogout} style={{
            background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)',
            color: '#f87171', padding: '6px 12px', borderRadius: 8,
            cursor: 'pointer', fontSize: 12, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 5,
            transition: 'all 150ms ease', fontFamily: 'inherit',
          }}><LogOut size={13} /> Đăng xuất</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ padding: '56px 24px 36px', maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 13, color: '#6366f1', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <Layers size={14} /> Chào mừng, {user}
        </div>
        <h1 style={{ fontSize: 40, fontWeight: 900, lineHeight: 1.15, margin: '0 0 14px' }}>
          <span style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Học lập trình
          </span>
          {' '}cùng CLB
        </h1>
        <p style={{ color: '#64748b', fontSize: 15, lineHeight: 1.7, maxWidth: 520, margin: '0 auto 36px' }}>
          Lý thuyết rõ ràng · Code mẫu thực tế · Quiz tương tác
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 48, flexWrap: 'wrap' }}>
          {[
            { icon: BookOpen, n: '4', l: 'Ngôn ngữ' },
            { icon: Layers, n: '8', l: 'Chủ đề / Ngôn ngữ' },
            { icon: Code2, n: '32+', l: 'Bài học' },
            { icon: HelpCircle, n: '120+', l: 'Câu hỏi quiz' },
          ].map(s => (
            <div key={s.l} style={{
              background: '#111827', borderRadius: 14, padding: '16px 24px',
              textAlign: 'center', border: '1px solid #1f2937',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              minWidth: 120,
            }}>
              <s.icon size={18} color="#6366f1" style={{ marginBottom: 4 }} />
              <div style={{ fontSize: 24, fontWeight: 900, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.n}</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>{s.l}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#94a3b8', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <Code2 size={18} /> Chọn ngôn ngữ bạn muốn học
        </h2>
      </div>

      {/* Language cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: 20, maxWidth: 1100, margin: '0 auto', padding: '0 24px 48px',
      }}>
        {Object.values(courses).map((course) => {
          const meta = langMeta[course.id];
          const IconComp = meta.icon;
          return (
            <Link key={course.id} to={`/course/${course.id}`} className="card-hover"
              style={{
                background: '#111827', border: '1px solid #1f2937',
                borderRadius: 20, overflow: 'hidden',
                textDecoration: 'none', display: 'block',
                transition: 'transform 250ms ease, box-shadow 250ms ease',
              }}>
              <div style={{ background: meta.bg, padding: '28px 24px', textAlign: 'center', position: 'relative' }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: 'rgba(255,255,255,0.15)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 8,
                }}>
                  <IconComp size={26} color="white" />
                </div>
                <div style={{ fontSize: 26, fontWeight: 900, color: 'white' }}>{course.name}</div>
              </div>
              <div style={{ padding: '18px 22px 22px' }}>
                <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>
                  {course.description}
                </p>

                {/* Progress bar (decorative) */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#475569', marginBottom: 4 }}>
                    <span>{course.topics.length} chủ đề</span>
                    <span>Bắt đầu</span>
                  </div>
                  <div className="progress-bar"><div className="progress-bar-fill" style={{ width: '0%' }} /></div>
                </div>

                {/* Topic previews */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 14 }}>
                  {course.topics.slice(0, 3).map(t => (
                    <span key={t.id} style={{
                      fontSize: 10, padding: '2px 8px', borderRadius: 5,
                      background: '#1e293b', color: '#64748b', border: '1px solid #334155',
                    }}>{t.title}</span>
                  ))}
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 5, background: '#1e293b', color: '#64748b' }}>
                    +{course.topics.length - 3} nữa
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, fontWeight: 600 }}>
                  <span style={{ color: '#6366f1', display: 'flex', alignItems: 'center', gap: 4 }}>
                    Học ngay <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid #1e293b', padding: '32px 24px',
        maxWidth: 1100, margin: '0 auto',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Code2 size={18} color="#6366f1" />
              <span style={{ fontSize: 14, fontWeight: 800, color: '#e2e8f0' }}>CLB Tin học NTU</span>
            </div>
            <p style={{ fontSize: 12, color: '#475569', maxWidth: 280, lineHeight: 1.5 }}>
              Nền tảng học lập trình miễn phí cho sinh viên Nha Trang University.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Ngôn ngữ</div>
              {['C', 'C++', 'Java', 'Python'].map(l => (
                <div key={l} style={{ fontSize: 12, color: '#64748b', padding: '2px 0' }}>{l}</div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Liên kết</div>
              <a href="https://github.com/QuanggCK/ProjectSeminar" target="_blank" rel="noreferrer" style={{
                fontSize: 12, color: '#64748b', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, padding: '2px 0',
                transition: 'color 150ms',
              }}><Github size={12} /> GitHub</a>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #1e293b', textAlign: 'center', fontSize: 11, color: '#334155' }}>
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            Được thực hiện với <Heart size={10} color="#ef4444" fill="#ef4444" /> bởi CLB Tin học NTU · {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    </div>
  );
}
