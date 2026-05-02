import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, GraduationCap, ArrowRight } from 'lucide-react';
import useStore from '../store/useStore';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { APP_NAME } from '../utils/constants';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, authLoading, authError, clearAuthError } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearAuthError();
    const success = await login(email, password);
    if (success) navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-neutral flex">
      {/* Left: Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md animate-fade-in-up">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-tertiary rounded-lg-aqua flex items-center justify-center mx-auto mb-4">
              <GraduationCap size={28} className="text-on-primary" />
            </div>
            <h1 className="text-h1 text-primary">{APP_NAME}</h1>
            <p className="text-secondary mt-2">Đăng nhập để tiếp tục học tập</p>
          </div>

          {/* Error */}
          {authError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md-aqua text-sm text-red-600 animate-fade-in">
              {authError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email"
              id="login-email"
              type="email"
              placeholder="email@example.com"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Mật khẩu"
              id="login-password"
              type="password"
              placeholder="Nhập mật khẩu"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              loading={authLoading}
              className="w-full"
              icon={ArrowRight}
            >
              Đăng nhập
            </Button>
          </form>

          {/* Register link */}
          <p className="mt-6 text-center text-sm text-secondary">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="font-semibold text-tertiary hover:underline">
              Đăng ký ngay
            </Link>
          </p>

          {/* Demo hint */}
          <div className="mt-8 p-4 bg-surface rounded-md-aqua border border-secondary/10">
            <p className="text-xs text-secondary text-center font-mono uppercase tracking-wider mb-2">Demo nhanh</p>
            <p className="text-sm text-secondary text-center">
              Đăng ký tài khoản mới rồi đăng nhập. Dữ liệu lưu trên trình duyệt.
            </p>
          </div>
        </div>
      </div>

      {/* Right: Decorative panel (desktop) */}
      <div className="hidden lg:flex flex-1 bg-primary items-center justify-center p-12">
        <div className="max-w-lg text-center animate-fade-in">
          <div className="text-6xl mb-6">💻</div>
          <h2 className="text-3xl font-bold text-white mb-4">Học lập trình dễ dàng</h2>
          <p className="text-secondary text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Khám phá C, C++, Java và Python với bài giảng có ví dụ code, quiz tương tác và theo dõi tiến độ.
          </p>
          <div className="flex justify-center gap-4 mt-8">
            {['C', 'C++', 'Java', 'Python'].map((lang) => (
              <div key={lang} className="px-4 py-2 rounded-md-aqua border border-white/20 text-white/80 text-sm font-mono">
                {lang}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
