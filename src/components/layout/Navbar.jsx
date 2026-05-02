import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, LayoutDashboard, User, LogOut, Menu, Search, GraduationCap, Moon, Sun } from 'lucide-react';
import useStore from '../../store/useStore';
import { APP_NAME } from '../../utils/constants';

export default function Navbar() {
  const { user, logout, searchQuery, setSearchQuery, theme, toggleTheme } = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/courses', label: 'Khóa học', icon: BookOpen },
    { path: '/profile', label: 'Hồ sơ', icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo + Mobile Menu */}
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 bg-tertiary rounded-sm-aqua flex items-center justify-center">
                <GraduationCap size={18} className="text-on-primary" />
              </div>
              <span className="text-lg font-bold text-primary hidden sm:block group-hover:text-tertiary transition-colors">
                {APP_NAME}
              </span>
            </Link>
          </div>

          {/* Center: Nav Links (desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md-aqua text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-tertiary/10 text-tertiary'
                      : 'text-secondary hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Search + User */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden md:flex items-center relative">
              <Search size={14} className="absolute left-3 text-secondary/60" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-2 w-48 text-sm bg-neutral border border-secondary/15 rounded-md-aqua focus:outline-none focus:border-tertiary focus:w-64 transition-all duration-200"
              />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-secondary hover:text-primary transition-colors rounded-sm-aqua hover:bg-primary/5"
              title={theme === 'dark' ? 'Chế độ sáng' : 'Chế độ tối'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* User */}
            {user && (
              <div className="flex items-center gap-1 sm:gap-2">
                <Link to="/profile" className="flex items-center gap-2 hover:bg-primary/5 p-1 sm:p-1.5 rounded-md-aqua transition-colors">
                  <div className="w-8 h-8 rounded-full bg-tertiary/15 flex items-center justify-center text-sm font-bold text-tertiary">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-primary max-w-24 truncate hover:text-tertiary transition-colors">
                    {user.name}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-secondary hover:text-red-500 transition-colors rounded-sm-aqua"
                  title="Đăng xuất"
                >
                  <LogOut size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
