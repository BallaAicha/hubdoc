import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Files, Home, Rocket, Settings, Menu, X } from 'lucide-react';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
      <nav className="bg-[#e9041e] text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo and title */}
          <Link to="/" className="text-xl font-bold flex items-center gap-2">
            <img
                src="assets/logo-societe-generale.png"
                alt="Société Générale Logo"
                className="h-10 w-10"
            />
            SGABS - HUB DOC
          </Link>

          {/* Mobile Menu Button */}
          <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white focus:outline-none"
          >
            {isMobileMenuOpen ? (
                <X className="h-6 w-6" /> /* Close icon */
            ) : (
                <Menu className="h-6 w-6" /> /* Hamburger icon */
            )}
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 hover:text-orange-200">
              <Home className="h-5 w-5" />
              Accueil
            </Link>
            <Link
                to="/documents"
                className="flex items-center gap-2 hover:text-orange-200"
            >
              <Files className="h-5 w-5" />
              Documents
            </Link>
            <Link
                to="/quickstart"
                className="flex items-center gap-2 hover:text-orange-200"
            >
              <Rocket className="h-5 w-5" />
              Démarrage rapide
            </Link>
            <Link
                to="/settings"
                className="flex items-center gap-2 hover:text-orange-200"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </div>
        </div>

        {/* Mobile Links */}
        {isMobileMenuOpen && (
            <div className="md:hidden flex flex-col gap-4 mt-4">
              <Link
                  to="/"
                  className="flex items-center gap-2 hover:text-orange-200"
                  onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home className="h-5 w-5" />
                Accueil
              </Link>
              <Link
                  to="/documents"
                  className="flex items-center gap-2 hover:text-orange-200"
                  onClick={() => setIsMobileMenuOpen(false)}
              >
                <Files className="h-5 w-5" />
                Documents
              </Link>
              <Link
                  to="/quickstart"
                  className="flex items-center gap-2 hover:text-orange-200"
                  onClick={() => setIsMobileMenuOpen(false)}
              >
                <Rocket className="h-5 w-5" />
                Démarrage rapide
              </Link>
              <Link
                  to="/settings"
                  className="flex items-center gap-2 hover:text-orange-200"
                  onClick={() => setIsMobileMenuOpen(false)}
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>
            </div>
        )}
      </nav>
  );
}