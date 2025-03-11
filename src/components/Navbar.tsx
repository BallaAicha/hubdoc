import React from 'react';
import { Link } from 'react-router-dom';
import { Files, Home, Rocket, Settings } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-orange-500 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <Files className="h-6 w-6" />
          SGABS - HUB DOC
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 hover:text-orange-200">
            <Home className="h-5 w-5" />
            Accueil
          </Link>
          <Link to="/documents" className="flex items-center gap-2 hover:text-orange-200">
            <Files className="h-5 w-5" />
            Documents
          </Link>
          <Link to="/quickstart" className="flex items-center gap-2 hover:text-orange-200">
            <Rocket className="h-5 w-5" />
            Démarrage rapide
          </Link>
          <Link to="/settings" className="flex items-center gap-2 hover:text-orange-200">
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </div>
      </div>
    </nav>
  );
}