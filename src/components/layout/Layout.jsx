import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import BottomNav from './BottomNav';

export default function Layout() {
  return (
    <div className="min-h-screen bg-neutral flex flex-col">
      <Navbar />
      <main className="flex-1 pb-16 lg:pb-0">
        <Outlet />
      </main>
      <BottomNav />
      <footer className="border-t border-secondary/10 bg-surface hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-secondary">
              © 2025 <span className="font-semibold text-primary">CodeLearning</span> — CLB Tin học NTU
            </p>
            <div className="flex items-center gap-4 text-sm text-secondary">
              <span className="font-mono text-label uppercase tracking-wider">Aqua Mint Design</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
