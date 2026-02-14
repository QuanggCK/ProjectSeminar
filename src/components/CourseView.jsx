import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../data/courses';
import { ChevronLeft, BookOpen, BrainCircuit, CheckCircle, XCircle } from 'lucide-react';

export default function CourseView() {
    const { id } = useParams();
    const course = courses[id];
    const [activeTab, setActiveTab] = useState('theory');
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    if (!course) {
        return <div className="text-center mt-20">Khóa học không tồn tại! <Link to="/dashboard" className="text-blue-600">Quay lại</Link></div>;
    }

    const handleOptionSelect = (questionId, optionIndex) => {
        if (showResults) return;
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: optionIndex
        }));
    };

    const calculateScore = () => {
        let score = 0;
        course.quiz.forEach(q => {
            if (selectedAnswers[q.id] === q.correctAnswer) {
                score++;
            }
        });
        return score;
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className={`${course.color} text-white shadow-lg`}>
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    <Link to="/dashboard" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition">
                        <ChevronLeft size={20} className="mr-1" /> Quay lại Dashboard
                    </Link>
                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl font-bold">{course.name}</h1>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                            {course.theory.length} Bài học
                        </span>
                    </div>
                    <p className="mt-2 text-white/90">{course.description}</p>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('theory')}
                            className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2
                ${activeTab === 'theory'
                                    ? `border-${course.color.replace('bg-', '')} text-blue-600`
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
                        >
                            <BookOpen size={18} />
                            Lý thuyết
                        </button>
                        <button
                            onClick={() => setActiveTab('quiz')}
                            className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2
                ${activeTab === 'quiz'
                                    ? `border-${course.color.replace('bg-', '')} text-blue-600`
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
                        >
                            <BrainCircuit size={18} />
                            Bài tập Trắc nghiệm
                        </button>
                    </nav>
                </div>
            </div>

            {/* Content */}
            <main className="flex-1 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 w-full">
                {activeTab === 'theory' ? (
                    <div className="space-y-8">
                        {course.theory.map((lesson) => (
                            <div key={lesson.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-sm">
                                        {lesson.id}
                                    </span>
                                    {lesson.title}
                                </h3>
                                <div className="prose prose-blue max-w-none text-gray-600">
                                    <pre className="whitespace-pre-wrap font-sans">{lesson.content}</pre>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="max-w-3xl mx-auto">
                        {showResults && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 text-center">
                                <h3 className="text-2xl font-bold text-green-800 mb-2">Kết quả của bạn</h3>
                                <p className="text-green-700 text-lg">
                                    Bạn trả lời đúng <span className="font-bold">{calculateScore()}</span> / {course.quiz.length} câu hỏi!
                                </p>
                                <button
                                    onClick={() => { setShowResults(false); setSelectedAnswers({}); }}
                                    className="mt-4 text-green-700 underline hover:text-green-900"
                                >
                                    Làm lại bài kiểm tra
                                </button>
                            </div>
                        )}

                        <div className="space-y-6">
                            {course.quiz.map((q, index) => {
                                const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
                                const isSelected = selectedAnswers[q.id] !== undefined;

                                return (
                                    <div key={q.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                                        <h4 className="text-lg font-medium text-gray-900 mb-4">
                                            Câu {index + 1}: {q.question}
                                        </h4>
                                        <div className="space-y-3">
                                            {q.options.map((opt, optIndex) => {
                                                let optionClass = "w-full text-left p-4 rounded-lg border transition-all duration-200 ";

                                                if (showResults) {
                                                    if (optIndex === q.correctAnswer) {
                                                        optionClass += "bg-green-100 border-green-500 text-green-800 font-medium";
                                                    } else if (selectedAnswers[q.id] === optIndex) {
                                                        optionClass += "bg-red-100 border-red-500 text-red-800";
                                                    } else {
                                                        optionClass += "bg-gray-50 border-gray-200 opacity-50";
                                                    }
                                                } else {
                                                    if (selectedAnswers[q.id] === optIndex) {
                                                        optionClass += "bg-blue-50 border-blue-500 text-blue-700 ring-1 ring-blue-500";
                                                    } else {
                                                        optionClass += "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300";
                                                    }
                                                }

                                                return (
                                                    <button
                                                        key={optIndex}
                                                        onClick={() => handleOptionSelect(q.id, optIndex)}
                                                        disabled={showResults}
                                                        className={optionClass}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <span>{opt}</span>
                                                            {showResults && optIndex === q.correctAnswer && <CheckCircle size={20} className="text-green-600" />}
                                                            {showResults && selectedAnswers[q.id] === optIndex && optIndex !== q.correctAnswer && <XCircle size={20} className="text-red-600" />}
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {!showResults && (
                            <div className="mt-8 flex justify-center">
                                <button
                                    onClick={() => setShowResults(true)}
                                    disabled={Object.keys(selectedAnswers).length < course.quiz.length}
                                    className={`
                    px-8 py-3 rounded-lg font-bold text-white shadow-md transition-all
                    ${Object.keys(selectedAnswers).length < course.quiz.length
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-1'}
                  `}
                                >
                                    Nộp bài
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
