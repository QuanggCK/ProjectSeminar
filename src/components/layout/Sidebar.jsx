import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, User, X, Bookmark, FileText, Trophy } from 'lucide-react';
import useStore from '../../store/useStore';

export default function MobileSidebar() {
  const { sidebarOpen, setSidebarOpen } = useStore();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/courses', label: 'Khóa học', icon: BookOpen },
    { path: '/profile', label: 'Hồ sơ', icon: User },
  ];

  if (!sidebarOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-primary/40 z-40 animate-fade-in lg:hidden"
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className="fixed top-0 left-0 bottom-0 w-72 bg-surface z-50 shadow-elevated animate-slide-in-left lg:hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-secondary/10">
          <span className="text-lg font-bold text-primary">Menu</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 text-secondary hover:text-primary transition-colors rounded-sm-aqua"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-3 overflow-y-auto">
          <div className="px-3 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md-aqua text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-tertiary/10 text-tertiary border-l-3 border-tertiary'
                      : 'text-secondary hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-secondary/10">
          <p className="text-xs text-secondary/60 text-center font-mono">CLB Tin học NTU</p>
        </div>
      </aside>
    </>
  );
}
