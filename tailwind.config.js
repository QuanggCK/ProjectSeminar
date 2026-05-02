/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                tertiary: 'var(--color-tertiary)',
                neutral: 'var(--color-neutral)',
                surface: 'var(--color-surface)',
                'on-primary': 'var(--color-on-primary)',
                'accent-light': 'rgba(45, 212, 191, 0.12)',
                'accent-border': 'rgba(45, 212, 191, 0.25)',
            },
            fontFamily: {
                display: ['"DM Sans"', 'system-ui', 'sans-serif'],
                body: ['"DM Sans"', 'system-ui', 'sans-serif'],
                mono: ['"DM Mono"', '"JetBrains Mono"', 'monospace'],
                code: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
            },
            fontSize: {
                'display': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '700' }],
                'h1': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }],
                'h2': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
                'body': ['0.95rem', { lineHeight: '1.6' }],
                'label': ['0.72rem', { lineHeight: '1.4', letterSpacing: '0.06em' }],
            },
            borderRadius: {
                'sm-aqua': '8px',
                'md-aqua': '14px',
                'lg-aqua': '22px',
            },
            spacing: {
                'sm-aqua': '8px',
                'md-aqua': '16px',
                'lg-aqua': '32px',
            },
            boxShadow: {
                'card': '0 1px 3px rgba(15, 46, 44, 0.06), 0 1px 2px rgba(15, 46, 44, 0.04)',
                'card-hover': '0 10px 25px rgba(15, 46, 44, 0.08), 0 4px 10px rgba(15, 46, 44, 0.04)',
                'elevated': '0 20px 40px rgba(15, 46, 44, 0.1)',
            },
            animation: {
                'fade-in': 'fadeIn 0.4s ease-out',
                'fade-in-up': 'fadeInUp 0.5s ease-out',
                'slide-in-left': 'slideInLeft 0.3s ease-out',
                'slide-in-right': 'slideInRight 0.3s ease-out',
                'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
                'scale-in': 'scaleIn 0.2s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(16px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                pulseSoft: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            },
        },
    },
    plugins: [],
}
