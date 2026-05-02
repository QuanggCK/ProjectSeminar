import React from 'react';

export default function Button({ children, variant = 'primary', size = 'md', disabled, loading, icon: Icon, className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-tertiary focus-visible:outline-offset-2';

  const variants = {
    primary: 'bg-tertiary text-on-primary hover:opacity-90 active:translate-y-[0.5px]',
    secondary: 'bg-transparent text-primary border border-secondary/30 hover:border-tertiary hover:text-tertiary',
    ghost: 'bg-transparent text-secondary hover:text-primary hover:bg-primary/5',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-sm-aqua',
    md: 'px-5 py-3 text-body rounded-md-aqua',
    lg: 'px-7 py-3.5 text-lg rounded-md-aqua',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${disabled || loading ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
          <path d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor" className="opacity-75" />
        </svg>
      ) : Icon ? (
        <Icon size={size === 'sm' ? 14 : 16} />
      ) : null}
      {children}
    </button>
  );
}
