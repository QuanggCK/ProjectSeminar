import React from 'react';

export default function Card({ children, className = '', hover = true, padding = 'p-6', ...props }) {
  return (
    <div
      className={`bg-surface rounded-lg-aqua shadow-card ${hover ? 'hover:shadow-card-hover transition-shadow duration-250' : ''} ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function StatCard({ icon, label, value, sublabel, accentColor }) {
  return (
    <Card className="flex items-start gap-4">
      <div
        className="w-11 h-11 rounded-md-aqua flex items-center justify-center text-xl flex-shrink-0"
        style={{ background: accentColor ? `${accentColor}15` : 'rgba(45, 212, 191, 0.1)' }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="font-mono text-label text-secondary uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-primary mt-0.5">{value}</p>
        {sublabel && <p className="text-sm text-secondary mt-0.5">{sublabel}</p>}
      </div>
    </Card>
  );
}
