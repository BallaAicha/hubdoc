import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Documents } from './pages/Documents';
import { QuickStart } from './pages/QuickStart';
import { GenerateSpringProject } from './pages/GenerateSpringProject';
import { CreateDocumentVersion } from './pages/CreateDocumentVersion.tsx';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login'; // Import de la page Login

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                {/* Barre de navigation */}
                <Navbar />

                {/* Configuration des Routes */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/documents" element={<Documents />} />
                    <Route path="/documents/:folderId" element={<Documents />} />
                    <Route path="/quickstart" element={<QuickStart />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/generate-spring-project" element={<GenerateSpringProject />} />
                    <Route path="/documents/create" element={<CreateDocumentVersion />} />
                    <Route path="/login" element={<Login />} /> {/* Route pour la page Login */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;