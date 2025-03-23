// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Navbar } from './components/Navbar';
// import { Home } from './pages/Home';
//
// import { QuickStart } from './pages/QuickStart';
// import { GenerateSpringProject } from './pages/GenerateSpringProject';
// import { CreateDocument } from './pages/CreateDocument'; // Nouvelle page ajoutée
// import { CreateDocumentVersion } from './pages/CreateDocumentVersion'; // Ajouté pour les versions
// import { Settings } from './pages/Settings';
// import { Login } from './pages/Login';
// import {MarkdownViewer} from "./pages/MarkdownViewer.tsx";
// import {APIDocumentation} from "./pages/APIDocumentation.tsx";
// import Documents from "./pages/Documents.tsx"; // Import de la page Login
//
// function App() {
//     return (
//         <Router>
//             <div className="min-h-screen bg-gray-50">
//                 {/* Barre de navigation */}
//                 <Navbar />
//
//                 {/* Configuration des Routes */}
//                 <Routes>
//                     <Route path="/" element={<Home />} />
//                     <Route path="/documents" element={<Documents />} />
//                     <Route path="/documents/:folderId" element={<Documents />} />
//                     <Route path="/documents/create" element={<CreateDocument />} />
//                     {/* Mise à jour ici : route de création un fichier */}
//                     <Route path="/documents/:folderId/create-version" element={<CreateDocumentVersion />} />
//                     <Route path="/quickstart" element={<QuickStart />} />
//                     <Route path="/settings" element={<Settings />} />
//                     <Route path="/generate-spring-project" element={<GenerateSpringProject />} />
//                     <Route path="/login" element={<Login />} /> {/* Route pour la page Login */}
//
//                     {/* Route dynamique pour des fichiers Markdown */}
//                     <Route path="/guide/:page" element={<MarkdownViewer />} />
//                     <Route path="/guide/nos-apis" element={<APIDocumentation />} />
//                     <Route path="/guide/nos-apis/:apiId" element={<APIDocumentation />} />
//                 </Routes>
//             </div>
//         </Router>
//     );
// }
//
// export default App;
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
                    <Route path="/documents/create/:parentId" element={<CreateDocument />} /> {/* Ajout de cette route */}
                    <Route path="/documents/:folderId/create-version" element={<CreateDocumentVersion />} />
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