import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {Files, Home, Rocket, Settings, Menu, X, User, LogOut, ChevronDown, Bell, Search, Code} from 'lucide-react';
import clsx from 'clsx';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Listen for scroll events to add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsUserMenuOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const links = [
    { to: "/", icon: <Home className="h-[18px] w-[18px]" />, label: "Accueil" },
    { to: "/quickstart", icon: <Rocket className="h-[18px] w-[18px]" />, label: "Démarrage rapide" },
    { to: "/guide/nos-apis", icon: <Code className="h-[18px] w-[18px]" />, label: "APIs" },
    { to: "/documents", icon: <Files className="h-[18px] w-[18px]" />, label: "Documents" }
  ];


  return (
      <div className={clsx(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled ? "shadow-lg" : ""
      )}>
        <nav className={clsx(
            "bg-gradient-to-r from-[#7B0000] to-[#9E0000] text-white transition-all duration-300",
            isScrolled ? "py-2" : "py-3"
        )}>
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between">
              {/* Logo and title */}
              <Link to="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-white rounded-lg blur-[1px] opacity-50 group-hover:opacity-80 transition-all duration-300"></div>
                  <div className="bg-white relative p-2.5 rounded-lg shadow-md group-hover:shadow-lg group-hover:-translate-y-0.5 transition-all duration-300">
                    <div className="text-[#7B0000] font-extrabold text-xl">SG</div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tighter hidden sm:block">SGABS Hub Doc</span>
                  <span className="text-xs text-gray-200 font-medium tracking-wider hidden sm:block">Documentation Center</span>
                  <span className="text-xl font-bold tracking-tight sm:hidden">Hub</span>
                </div>
              </Link>

              {/* Search bar - Desktop only */}
              <div className="hidden lg:flex items-center relative max-w-md w-full mx-6">
                <div className="absolute left-3 text-gray-300">
                  <Search className="h-4 w-4" />
                </div>
                <input
                    type="text"
                    placeholder="Rechercher un document..."
                    className="w-full rounded-full py-1.5 pl-9 pr-4 bg-white/10 border border-white/20 focus:bg-white/20 focus:outline-none focus:ring-1 focus:ring-white/30 text-sm transition-all"
                />
              </div>

              {/* Mobile Menu Button */}
              <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMobileMenuOpen(!isMobileMenuOpen);
                  }}
                  className="md:hidden rounded-full p-2 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors"
                  aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                    <X className="h-5 w-5" />
                ) : (
                    <Menu className="h-5 w-5" />
                )}
              </button>

              {/* Desktop Links */}
              <div className="hidden md:flex items-center gap-1">
                {links.map((link) => (
                    <Link
                        key={link.to}
                        to={link.to}
                        className={clsx(
                            "flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                            isActive(link.to)
                                ? "bg-white/15 text-white backdrop-blur-sm shadow-sm border-b-2 border-white"
                                : "text-white/90 hover:bg-white/10 hover:text-white"
                        )}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                ))}
              </div>

              {/* Notification and User Menu */}
              <div className="hidden md:flex items-center gap-2">
                {/* Notification bell */}
                <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
                  <Bell className="h-[18px] w-[18px]" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full"></span>
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsUserMenuOpen(!isUserMenuOpen);
                      }}
                      className={clsx(
                          "flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-white/10 transition-all",
                          isUserMenuOpen ? "bg-white/10" : ""
                      )}
                  >
                    <div className="bg-gradient-to-tr from-red-500 to-red-700 rounded-full p-1 shadow-sm ring-2 ring-white/20">
                      <User className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">Ousmane</span>
                    <ChevronDown className={clsx(
                        "h-3.5 w-3.5 transition-transform",
                        isUserMenuOpen ? "rotate-180" : ""
                    )} />
                  </button>

                  {/* Dropdown menu */}
                  {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1.5 z-50 text-gray-800 border border-gray-100 animate-in fade-in duration-150 origin-top-right">
                        <div className="border-b border-gray-100 pb-2 px-4 mb-1">
                          <p className="text-sm font-medium">Ousmane</p>
                          <p className="text-xs text-gray-500">ousmane@sgabs.com</p>
                        </div>
                        <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                          <User className="h-4 w-4 text-gray-500" />
                          <span>Mon profil</span>
                        </button>
                        <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                          <Settings className="h-4 w-4 text-gray-500" />
                          <span>Paramètres</span>
                        </button>
                        <div className="border-t border-gray-100 mt-1 pt-1">
                          <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                            <LogOut className="h-4 w-4" />
                            <span>Se déconnecter</span>
                          </button>
                        </div>
                      </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className={clsx(
              "px-4 pt-2 pb-0 transition-all duration-300 md:hidden",
              isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
                <Search className="h-4 w-4" />
              </div>
              <input
                  type="text"
                  placeholder="Rechercher un document..."
                  className="w-full rounded-full py-2 pl-9 pr-4 bg-white/10 border border-white/20 focus:bg-white/20 focus:outline-none text-sm"
              />
            </div>
          </div>

          {/* Mobile Links */}
          <div
              className={clsx(
                  "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
                  isMobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              )}
          >
            <div className="px-4 py-3 space-y-1.5">
              {links.map((link) => (
                  <Link
                      key={link.to}
                      to={link.to}
                      className={clsx(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                          isActive(link.to)
                              ? "bg-white/15 text-white backdrop-blur-sm border-l-2 border-white"
                              : "text-white/90 hover:bg-white/10 hover:text-white"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
              ))}

              <div className="border-t border-white/10 my-2 pt-2">
                <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full hover:bg-white/10">
                  <Bell className="h-[18px] w-[18px]" />
                  <span>Notifications</span>
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-1.5">2</span>
                </button>
              </div>

              {/* Mobile User Menu */}
              <div className="bg-white/10 rounded-lg p-3 mt-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gradient-to-tr from-red-500 to-red-600 rounded-full p-2 shadow-sm">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Ousmane</div>
                    <div className="text-xs text-gray-300">ousmane@sgabs.com</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center justify-center gap-1.5 flex-1 py-1.5 rounded bg-white/10 text-sm hover:bg-white/20 transition-colors">
                    <User className="h-4 w-4" />
                    <span>Profil</span>
                  </button>
                  <button className="flex items-center justify-center gap-1.5 flex-1 py-1.5 rounded bg-red-600/80 text-sm hover:bg-red-600 transition-colors">
                    <LogOut className="h-4 w-4" />
                    <span>Déconnexion</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
  );
}