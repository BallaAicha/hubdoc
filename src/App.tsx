import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Documents } from './pages/Documents';
import { QuickStart } from './pages/QuickStart';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/quickstart" element={<QuickStart />} />
          <Route path="/settings" element={<div className="p-4">Settings page coming soon</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;