import React from 'react';
import { Link } from 'react-router-dom';
import { courses } from '../data/courses';
import { LogOut } from 'lucide-react';

export default function Dashboard({ user, onLogout }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">CodeLearning</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-700">Xin chào, {user}</span>
                        <button
                            onClick={onLogout}
                            className="p-2 text-gray-500 hover:text-red-600 transition"
                            title="Đăng xuất"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Chọn khóa học của bạn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.values(courses).map((course) => (
                        <Link
                            key={course.id}
                            to={`/course/${course.id}`}
                            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100"
                        >
                            <div className={`h-24 ${course.color} flex items-center justify-center`}>
                                <span className="text-white text-4xl font-bold">{course.icon}</span>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {course.name}
                                </h3>
                                <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                                    {course.description}
                                </p>
                                <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                                    Học ngay &rarr;
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
