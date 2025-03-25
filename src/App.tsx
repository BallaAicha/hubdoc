import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';

import { QuickStart } from './pages/QuickStart';
import { GenerateSpringProject } from './pages/GenerateSpringProject';
import { CreateDocument } from './pages/CreateDocument';
import { CreateDocumentVersion } from './pages/CreateDocumentVersion';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import {MarkdownViewer} from "./pages/MarkdownViewer.tsx";
import {APIDocumentation} from "./pages/APIDocumentation.tsx";
import Documents from "./pages/Documents.tsx";

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                {/* Barre de navigation */}
                <Navbar />

                {/* Configuration des Routes */}
                <Routes>
                    <Route path="/" element={<Home />} />

                    {/* Routes de documents - ordre important! */}
                    <Route path="/documents/create" element={<CreateDocument />} />
                    <Route path="/documents/create/:parentId" element={<CreateDocument />} />
                    <Route path="/documents/:folderId/create" element={<CreateDocument />} /> {/* Route pour créer un document dans un dossier spécifique */}
                    <Route path="/documents/create-version" element={<CreateDocumentVersion />} /> {/* Nouvelle route pour créer une version avec folderId en paramètre de requête */}
                    <Route path="/documents/create-version/:documentId" element={<CreateDocumentVersion />} /> {/* Route pour créer une version d'un document spécifique */}
                    <Route path="/documents/:folderId" element={<Documents />} />
                    <Route path="/documents" element={<Documents />} />

                    <Route path="/quickstart" element={<QuickStart />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/generate-spring-project" element={<GenerateSpringProject />} />
                    <Route path="/login" element={<Login />} />

                    {/* Route dynamique pour des fichiers Markdown */}
                    <Route path="/guide/:page" element={<MarkdownViewer />} />
                    <Route path="/guide/nos-apis" element={<APIDocumentation />} />
                    <Route path="/guide/nos-apis/:apiId" element={<APIDocumentation />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;