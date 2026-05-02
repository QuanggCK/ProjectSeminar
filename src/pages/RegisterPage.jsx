import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, UserPlus, GraduationCap, User } from 'lucide-react';
import useStore from '../store/useStore';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { isValidEmail, isValidPassword } from '../utils/helpers';
import { APP_NAME } from '../utils/constants';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { register, authLoading, authError, clearAuthError } = useStore();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Vui lòng nhập tên';
    if (!isValidEmail(email)) errs.email = 'Email không hợp lệ';
    if (!isValidPassword(password)) errs.password = 'Mật khẩu ít nhất 6 ký tự';
    if (password !== confirmPassword) errs.confirmPassword = 'Mật khẩu không khớp';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearAuthError();
    if (!validate()) return;
    const success = await register(name, email, password);
    if (success) navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-neutral flex">
      {/* Left: Decorative panel (desktop) */}
      <div className="hidden lg:flex flex-1 bg-primary items-center justify-center p-12">
        <div className="max-w-lg text-center animate-fade-in">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-3xl font-bold text-white mb-4">Bắt đầu hành trình</h2>
          <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Tham gia cùng hàng nghìn học viên. Học theo tốc độ riêng, luyện quiz, ghi chú bài học.
          </p>
          <div className="mt-8 flex flex-col gap-3 items-center">
            {['✅ 4 ngôn ngữ lập trình', '✅ Quiz tương tác mỗi chương', '✅ Theo dõi tiến độ', '✅ Ghi chú & Bookmark'].map((item) => (
              <div key={item} className="text-white/70 text-sm">{item}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md animate-fade-in-up">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-tertiary rounded-lg-aqua flex items-center justify-center mx-auto mb-4">
              <GraduationCap size={28} className="text-on-primary" />
            </div>
            <h1 className="text-h1 text-primary">Đăng ký</h1>
            <p className="text-secondary mt-2">Tạo tài khoản {APP_NAME} miễn phí</p>
          </div>

          {/* Error */}
          {authError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md-aqua text-sm text-red-600 animate-fade-in">
              {authError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Họ và tên"
              id="register-name"
              type="text"
              placeholder="Nguyễn Văn A"
              icon={User}
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              required
            />
            <Input
              label="Email"
              id="register-email"
              type="email"
              placeholder="email@example.com"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              required
            />
            <Input
              label="Mật khẩu"
              id="register-password"
              type="password"
              placeholder="Ít nhất 6 ký tự"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              required
            />
            <Input
              label="Xác nhận mật khẩu"
              id="register-confirm"
              type="password"
              placeholder="Nhập lại mật khẩu"
              icon={Lock}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              required
            />
            <Button
              type="submit"
              loading={authLoading}
              className="w-full"
              icon={UserPlus}
            >
              Đăng ký
            </Button>
          </form>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-secondary">
            Đã có tài khoản?{' '}
            <Link to="/" className="font-semibold text-tertiary hover:underline">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
