import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { ProtectedRoute } from './components/ProtectedRoute';
import { RootRedirect } from './components/RootRedirect';

import { QuickStart } from './pages/QuickStart';
import { GenerateSpringProject } from './pages/GenerateSpringProject';
import { CreateDocument } from './pages/CreateDocument';
import { CreateDocumentVersion } from './pages/CreateDocumentVersion';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { Callback } from './pages/Callback';
import { MarkdownViewer } from "./pages/MarkdownViewer.tsx";
import { APIDocumentation } from "./pages/APIDocumentation.tsx";
import Documents from "./pages/Documents.tsx";
import { ApiServiceFormPage } from "./pages/ApiServiceFormPage.tsx";
import Frontemplate from "./pages/Frontemplate.tsx";
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="min-h-screen bg-gray-50">
                    <Routes>
                        {/* Public routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/callback" element={<Callback />} />

                        {/* Default route - redirect based on authentication status */}
                        <Route path="/" element={<RootRedirect />} />

                        {/* Protected routes */}
                        <Route element={<ProtectedRoute />}>
                            {/* Layout with Navbar for authenticated users */}
                            <Route path="/*" element={
                                <>
                                    <Navbar />
                                    <Routes>
                                        <Route path="/home" element={<Home />} />
                                        <Route path="/forms" element={<ApiServiceFormPage />} />

                                        {/* Document routes */}
                                        <Route path="/documents/create" element={<CreateDocument />} />
                                        <Route path="/documents/create/:parentId" element={<CreateDocument />} />
                                        <Route path="/documents/:folderId/create" element={<CreateDocument />} />
                                        <Route path="/documents/create-version" element={<CreateDocumentVersion />} />
                                        <Route path="/documents/create-version/:documentId" element={<CreateDocumentVersion />} />
                                        <Route path="/documents/:folderId" element={<Documents />} />
                                        <Route path="/documents" element={<Documents />} />

                                        <Route path="/quickstart" element={<QuickStart />} />
                                        <Route path="/settings" element={<Settings />} />
                                        <Route path="/generate-spring-project" element={<GenerateSpringProject />} />
                                        <Route path="/generate-react-project" element={<Frontemplate />} />

                                        {/* Markdown and API documentation routes */}
                                        <Route path="/guide/:page" element={<MarkdownViewer />} />
                                        <Route path="/guide/nos-apis" element={<APIDocumentation />} />
                                        <Route path="/guide/nos-apis/:apiId" element={<APIDocumentation />} />
                                    </Routes>
                                </>
                            } />
                        </Route>
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
