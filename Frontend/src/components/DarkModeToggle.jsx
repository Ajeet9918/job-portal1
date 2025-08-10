import React, { useState, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

const DarkModeToggle = () => {
    const [theme, setTheme] = useState('light');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        applyTheme(savedTheme);

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleSystemThemeChange = (e) => {
            if (savedTheme === 'system') {
                applyTheme('system');
            }
        };

        mediaQuery.addEventListener('change', handleSystemThemeChange);

        return () => {
            mediaQuery.removeEventListener('change', handleSystemThemeChange);
        };
    }, []);

    const applyTheme = (newTheme) => {
        const root = document.documentElement;

        // Remove existing theme classes
        root.classList.remove('dark', 'light');

        let actualTheme = newTheme;

        // Handle system theme
        if (newTheme === 'system') {
            actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        if (actualTheme === 'dark') {
            root.classList.add('dark');
            root.style.setProperty('--bg-primary', '#1f2937');
            root.style.setProperty('--bg-secondary', '#111827');
            root.style.setProperty('--text-primary', '#f9fafb');
            root.style.setProperty('--text-secondary', '#d1d5db');
            root.style.setProperty('--border-color', '#374151');
        } else {
            root.classList.add('light');
            root.style.setProperty('--bg-primary', '#ffffff');
            root.style.setProperty('--bg-secondary', '#f9fafb');
            root.style.setProperty('--text-primary', '#111827');
            root.style.setProperty('--text-secondary', '#6b7280');
            root.style.setProperty('--border-color', '#e5e7eb');
        }
    };

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
        setIsOpen(false);
    };

    const getThemeIcon = () => {
        switch (theme) {
            case 'dark':
                return <Moon className="w-5 h-5" />;
            case 'light':
                return <Sun className="w-5 h-5" />;
            case 'system':
                return <Monitor className="w-5 h-5" />;
            default:
                return <Sun className="w-5 h-5" />;
        }
    };

    const getThemeLabel = () => {
        switch (theme) {
            case 'dark':
                return 'Dark';
            case 'light':
                return 'Light';
            case 'system':
                return 'System';
            default:
                return 'Light';
        }
    };

    return (
        <div className="relative">
            {/* Main Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm"
                aria-label="Toggle theme"
            >
                {getThemeIcon()}
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {getThemeLabel()}
                </span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                    <div className="py-1">
                        <button
                            onClick={() => handleThemeChange('light')}
                            className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${theme === 'light'
                                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                : 'text-gray-700 dark:text-gray-300'
                                }`}
                        >
                            <Sun className="w-4 h-4" />
                            <span>Light</span>
                            {theme === 'light' && (
                                <div className="ml-auto w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                            )}
                        </button>

                        <button
                            onClick={() => handleThemeChange('dark')}
                            className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${theme === 'dark'
                                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                : 'text-gray-700 dark:text-gray-300'
                                }`}
                        >
                            <Moon className="w-4 h-4" />
                            <span>Dark</span>
                            {theme === 'dark' && (
                                <div className="ml-auto w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                            )}
                        </button>

                        <button
                            onClick={() => handleThemeChange('system')}
                            className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${theme === 'system'
                                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                : 'text-gray-700 dark:text-gray-300'
                                }`}
                        >
                            <Monitor className="w-4 h-4" />
                            <span>System</span>
                            {theme === 'system' && (
                                <div className="ml-auto w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* Backdrop to close dropdown */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default DarkModeToggle;
