import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Files, Home, Rocket, Settings, Menu, X, User, LogOut } from 'lucide-react';
import clsx from 'clsx';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const links = [
    { to: "/", icon: <Home className="h-5 w-5" />, label: "Accueil" },
    { to: "/quickstart", icon: <Rocket className="h-5 w-5" />, label: "Démarrage rapide" },
    { to: "/documents", icon: <Files className="h-5 w-5" />, label: "Documents" },
    { to: "/settings", icon: <Settings className="h-5 w-5" />, label: "Paramètres" }
  ];

  return (
      <nav className="bg-gradient-to-r from-[#850606] to-[#850606] text-white shadow-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo and title */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-white p-1.5 rounded-md shadow-md group-hover:shadow-lg transition-all">
                <div className="text-[#850606] font-bold text-xl">SG</div>
              </div>
              <span className="text-xl font-bold tracking-tight hidden sm:block">SGABS Hub Doc</span>
              <span className="text-xl font-bold tracking-tight sm:hidden">Hub</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden rounded-full p-2 text-white hover:bg-[#991b1b] focus:outline-none focus:ring-2 focus:ring-white transition-colors"
                aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
              ) : (
                  <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {links.map((link) => (
                  <Link
                      key={link.to}
                      to={link.to}
                      className={clsx(
                          "flex items-center space-x-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out",
                          isActive(link.to)
                              ? "bg-[#dc2626] text-white shadow-md"
                              : "text-white hover:bg-[#991b1b]/70 hover:shadow-sm"
                      )}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
              ))}
            </div>

            {/* User Menu */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center space-x-2 border-l pl-4 border-[#dc2626]/50">
                <div className="bg-[#dc2626] rounded-full p-1.5 shadow-sm">
                  <User className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">Ousmane</span>
                <button
                    className="p-1.5 rounded-full hover:bg-[#991b1b] transition-colors flex items-center justify-center"
                    aria-label="Se déconnecter"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Links */}
        <div
            className={clsx(
                "md:hidden bg-[#7f1d1d] transition-all duration-300 ease-in-out border-t border-[#991b1b] shadow-lg",
                isMobileMenuOpen ? "max-h-96 py-2" : "max-h-0 overflow-hidden"
            )}
        >
          <div className="px-4 space-y-1 pb-3 pt-1">
            {links.map((link) => (
                <Link
                    key={link.to}
                    to={link.to}
                    className={clsx(
                        "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-base font-medium transition-colors",
                        isActive(link.to)
                            ? "bg-[#dc2626] text-white"
                            : "text-white hover:bg-[#991b1b]"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
            ))}

            {/* Mobile User Menu */}
            <div className="pt-3 mt-2 border-t border-[#991b1b]/60">
              <div className="flex items-center justify-between px-3 py-2.5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#dc2626] rounded-full p-1.5">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="text-white font-medium">Ousmane</span>
                </div>
                <button
                    className="p-1.5 rounded-full hover:bg-[#991b1b] transition-colors"
                    aria-label="Se déconnecter"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
  );
}