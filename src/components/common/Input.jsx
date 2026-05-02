import React from 'react';

export default function Input({ label, id, error, icon: Icon, className = '', ...props }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="aqua-label">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary">
            <Icon size={16} />
          </div>
        )}
        <input
          id={id}
          className={`aqua-input ${Icon ? 'pl-10' : ''} ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-500 animate-fade-in">{error}</p>
      )}
    </div>
  );
}
