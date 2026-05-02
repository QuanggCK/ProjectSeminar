import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center animate-fade-in-up">
        <div className="text-8xl mb-6">🌊</div>
        <h1 className="text-display text-primary mb-2">404</h1>
        <p className="text-xl text-secondary mb-8">Trang bạn tìm không tồn tại</p>
        <Link to="/dashboard" className="aqua-btn-primary">
          <Home size={16} /> Về trang chủ
        </Link>
      </div>
    </div>
  );
}
