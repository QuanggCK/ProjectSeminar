import React from 'react';

export default function LoadingSpinner({ size = 'md', text }) {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <div className={`${sizes[size]} relative`}>
        <div className="absolute inset-0 rounded-full border-2 border-tertiary/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-tertiary animate-spin" />
      </div>
      {text && <p className="text-sm text-secondary animate-pulse-soft">{text}</p>}
    </div>
  );
}

export function FullPageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral">
      <div className="text-center animate-fade-in">
        <div className="w-12 h-12 mx-auto relative mb-4">
          <div className="absolute inset-0 rounded-full border-2 border-tertiary/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-tertiary animate-spin" />
        </div>
        <p className="font-mono text-label text-secondary uppercase tracking-widest">Đang tải...</p>
      </div>
    </div>
  );
}
