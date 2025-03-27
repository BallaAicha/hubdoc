import React from 'react';
import { Code, Menu } from 'lucide-react';

interface HeaderProps {
    resetSelection: () => void;
    toggleMobileMenu: () => void;
}

const HeaderDoc: React.FC<HeaderProps> = ({ resetSelection, toggleMobileMenu }) => {
    return (
        <header className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-16">
        <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
    <button
        onClick={resetSelection}
    className="flex items-center group"
    aria-label="Return to home"
    >
    <div className="h-8 w-8 bg-primary-600 rounded flex items-center justify-center mr-2 group-hover:scale-110 transition-transform">
    <Code className="h-5 w-5 text-white" />
        </div>
        <span className="font-bold text-xl text-neutral-800 group-hover:text-primary-600 transition-colors">API Hub</span>
    </button>
    </div>
    </div>

    {/* Mobile menu button */}
    <div className="md:hidden flex items-center">
    <button
        onClick={toggleMobileMenu}
    className="inline-flex items-center justify-center p-2 rounded-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
    aria-label="Open menu"
    >
    <Menu className="h-6 w-6" />
        </button>
        </div>
        </div>
        </div>
        </header>
);
};

export default HeaderDoc;