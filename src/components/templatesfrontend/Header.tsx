import React from 'react';
import { Code } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-blue-600 p-2 rounded text-white mr-3">
              <Code size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">React Project Generator</h1>
              <p className="text-sm text-gray-600">Create standardized React projects</p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-6">
            <a 
              href="#docs" 
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors duration-200"
            >
              Documentation
            </a>
            <a 
              href="#templates" 
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors duration-200"
            >
              Templates
            </a>
            <a 
              href="#about" 
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors duration-200"
            >
              About
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;