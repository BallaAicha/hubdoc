import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Files, Home, Rocket, Settings, Menu, X, User,
  LogOut, ChevronDown, Bell, Search, Code,
  HelpCircle, Building2, FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const { user, logout } = useAuth();
  const location = useLocation();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Listen for scroll events to add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const links = [
    { to: "/home", icon: <Home className="h-[18px] w-[18px]" />, label: "Accueil" },
    { to: "/quickstart", icon: <Rocket className="h-[18px] w-[18px]" />, label: "Démarrage rapide" },
    { to: "/guide/nos-apis", icon: <Code className="h-[18px] w-[18px]" />, label: "APIs" },
    { to: "/documents", icon: <Files className="h-[18px] w-[18px]" />, label: "Documents" }
  ];

  const notifications = [
    {
      id: 1,
      title: "Nouvelle API disponible",
      message: "L'API de paiement v2 est maintenant disponible",
      time: "Il y a 30 min",
      unread: true,
    },
    {
      id: 2,
      title: "Maintenance planifiée",
      message: "Mise à jour du système prévue ce weekend",
      time: "Il y a 2h",
      unread: true,
    },
    {
      id: 3,
      title: "Document mis à jour",
      message: "Le guide d'intégration a été mis à jour",
      time: "Hier, 14:30",
      unread: false,
    }
  ];

  return (
      <div className={clsx(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled ? "shadow-lg" : ""
      )}>
        <nav className={clsx(
            "bg-gradient-to-r from-secondary-900 to-secondary-800 border-b border-secondary-700 transition-all duration-300",
            isScrolled ? "py-2" : "py-3"
        )}>
          <div className="container mx-auto px-4 lg:px-6">
            <div className="flex items-center justify-between">
              {/* Logo and title */}
              <Link to="/" className="flex items-center gap-3 group">
                <motion.div 
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  className="bg-gradient-to-br from-primary-500 to-primary-700 p-2 rounded-lg shadow-md"
                >
                  <FileText className="h-5 w-5 text-white" />
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tighter text-white hidden sm:block">
                    CoDev Platform <span className="text-primary-400">.</span>
                  </span>
                </div>
              </Link>

              {/* Search bar - Desktop only */}
              <div className={clsx(
                  "hidden lg:flex items-center relative max-w-md w-full mx-6 transition-all duration-200",
                  searchFocused ? "scale-105" : ""
              )}>
                <div className={clsx(
                    "absolute left-3 transition-colors duration-200",
                    searchFocused ? "text-primary-500" : "text-gray-400"
                )}>
                  <Search className="h-4 w-4" />
                </div>
                <motion.input
                    initial={{ width: "100%" }}
                    whileFocus={{ width: "110%", x: "-5%" }}
                    type="text"
                    placeholder="Rechercher un document, une API..."
                    className={clsx(
                        "w-full rounded-full py-2 pl-9 pr-4 bg-secondary-800/50 border backdrop-blur-sm focus:outline-none focus:ring-2 transition-all duration-200 text-sm text-white placeholder-gray-400",
                        searchFocused ? "border-primary-500/40 ring-primary-500/20 shadow-lg shadow-primary-900/10" : "border-secondary-700"
                    )}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                />
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMobileMenuOpen(!isMobileMenuOpen);
                  }}
                  className="md:hidden rounded-full p-2 text-white hover:bg-secondary-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors"
                  aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Desktop Links */}
              <div className="hidden md:flex items-center gap-1">
                {links.map((link) => (
                    <motion.div
                        key={link.to}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            to={link.to}
                            className={clsx(
                                "flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                                isActive(link.to)
                                    ? "text-white bg-primary-600 shadow-md"
                                    : "text-white hover:bg-secondary-800 hover:text-primary-300"
                            )}
                        >
                            {link.icon}
                            <span>{link.label}</span>
                            {isActive(link.to) && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </Link>
                    </motion.div>
                ))}
              </div>

              {/* Notification and User Menu */}
              <div className="hidden md:flex items-center gap-2">
                {/* Notification bell */}
                <div className="relative" ref={notificationsRef}>
                  <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={clsx(
                          "relative p-2 rounded-full transition-colors",
                          isNotificationsOpen ? "bg-secondary-700 text-primary-500" : "text-white hover:bg-secondary-800"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsNotificationsOpen(!isNotificationsOpen);
                        setIsUserMenuOpen(false);
                      }}
                  >
                    <Bell className="h-[18px] w-[18px]" />
                    <motion.span 
                      initial={{ scale: 0.8 }}
                      animate={{ scale: [0.8, 1.2, 0.8] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"
                    ></motion.span>
                  </motion.button>

                  <AnimatePresence>
                    {isNotificationsOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl py-2 z-50 text-gray-800 border border-gray-100 backdrop-blur-sm"
                        >
                          <div className="px-4 py-2 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-gray-800">Notifications</h3>
                              <span className="text-xs bg-[#ed183b] text-white px-1.5 py-0.5 rounded-full">
                            {notifications.filter(n => n.unread).length} nouvelles
                          </span>
                            </div>
                          </div>

                          <div className="max-h-[320px] overflow-y-auto py-1">
                            {notifications.length > 0 ? (
                                notifications.map(notification => (
                                    <div
                                        key={notification.id}
                                        className={clsx(
                                            "px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors",
                                            notification.unread ? "border-l-2 border-[#ed183b]" : ""
                                        )}
                                    >
                                      <div className="flex justify-between items-start">
                                        <h4 className={clsx(
                                            "text-sm font-medium",
                                            notification.unread ? "text-[#ed183b]" : "text-gray-800"
                                        )}>
                                          {notification.title}
                                        </h4>
                                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{notification.time}</span>
                                      </div>
                                      <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-6 text-center text-gray-500 text-sm">
                                  Aucune notification
                                </div>
                            )}
                          </div>

                          <div className="border-t border-gray-100 mt-1 pt-1 px-4 py-2">
                            <button className="w-full text-center text-sm text-[#ed183b] hover:underline">
                              Voir toutes les notifications
                            </button>
                          </div>
                        </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* User Menu */}
                <div className="relative" ref={userMenuRef}>
                  <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsUserMenuOpen(!isUserMenuOpen);
                        setIsNotificationsOpen(false);
                      }}
                      className={clsx(
                          "flex items-center gap-2 px-3 py-1.5 rounded-full transition-all",
                          isUserMenuOpen ? "bg-secondary-700 shadow-inner" : "hover:bg-secondary-800"
                      )}
                  >
                    <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-full p-1 shadow-md">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-white">{user?.name || 'Utilisateur'}</span>
                    <motion.div
                      animate={{ rotate: isUserMenuOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-3.5 w-3.5 text-white" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-1.5 z-50 text-gray-800 border border-gray-100 backdrop-blur-sm"
                        >
                          <div className="border-b border-gray-100 pb-3 px-4 mb-1">
                            <p className="text-sm font-bold">{user?.name || 'Utilisateur'}</p>
                            <p className="text-xs text-gray-500">{user?.mail || user?.email || 'utilisateur@example.com'}</p>

                            {/* Informations supplémentaires de l'utilisateur */}
                            <div className="mt-2 pt-2 border-t border-gray-100">
                              {user?.sgjob && (
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs font-medium text-gray-700">Fonction:</span>
                                  <span className="text-xs text-gray-600">{user.sgjob}</span>
                                </div>
                              )}

                              {user?.sgservicename && (
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs font-medium text-gray-700">Service:</span>
                                  <span className="text-xs text-gray-600">{user.sgservicename}</span>
                                </div>
                              )}

                              {user?.c && (
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs font-medium text-gray-700">Pays:</span>
                                  <span className="text-xs text-gray-600">{user.c}</span>
                                </div>
                              )}

                              {user?.sgigg && (
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs font-medium text-gray-700">ID:</span>
                                  <span className="text-xs text-gray-600">{user.sgigg}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <motion.button 
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                          >
                            <User className="h-4 w-4 text-primary-500" />
                            <span>Mon profil</span>
                          </motion.button>

                          <motion.button 
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                          >
                            <Building2 className="h-4 w-4 text-primary-500" />
                            <span>Mon organisation</span>
                          </motion.button>

                          <motion.button 
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                          >
                            <Settings className="h-4 w-4 text-primary-500" />
                            <span>Paramètres</span>
                          </motion.button>

                          <motion.button 
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                          >
                            <HelpCircle className="h-4 w-4 text-primary-500" />
                            <span>Aide & Support</span>
                          </motion.button>

                          <div className="border-t border-gray-100 mt-1 pt-1">
                            <motion.button 
                              whileHover={{ x: 5 }}
                              onClick={logout}
                              className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-primary-600 hover:bg-primary-50 transition-colors"
                            >
                              <LogOut className="h-4 w-4" />
                              <span>Se déconnecter</span>
                            </motion.button>
                          </div>
                        </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className={clsx(
              "px-4 pt-2 pb-0 transition-all duration-300 md:hidden",
              isMobileMenuOpen ? "opacity-100 max-h-[60px]" : "opacity-0 max-h-0 pointer-events-none overflow-hidden"
          )}>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search className="h-4 w-4" />
              </div>
              <input
                  type="text"
                  placeholder="Rechercher un document..."
                  className="w-full rounded-full py-2 pl-9 pr-4 bg-gray-100 border border-gray-200 focus:border-[#ed183b]/30 focus:ring-[#ed183b]/10 focus:outline-none text-sm"
              />
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="md:hidden overflow-hidden bg-white shadow-lg"
                >
                  <div className="px-4 py-3 space-y-1.5">
                    {links.map((link) => (
                        <motion.div
                            key={link.to}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link
                                to={link.to}
                                className={clsx(
                                    "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                                    isActive(link.to)
                                        ? "bg-primary-50 text-primary-600 border-l-2 border-primary-500 shadow-sm"
                                        : "text-gray-700 hover:bg-gray-50"
                                )}
                            >
                                <div className={clsx(
                                    "p-2 rounded-md",
                                    isActive(link.to) ? "bg-primary-100" : "bg-gray-100"
                                )}>
                                    {link.icon}
                                </div>
                                <span>{link.label}</span>
                            </Link>
                        </motion.div>
                    ))}

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between px-3 py-2 text-sm text-gray-500 font-medium">
                        <span>Notifications</span>
                        <span className="bg-[#ed183b] text-white text-xs rounded-full px-1.5 py-0.5">
                      {notifications.filter(n => n.unread).length}
                    </span>
                      </div>

                      <div className="max-h-[200px] overflow-y-auto space-y-1 my-2">
                        {notifications.slice(0, 2).map(notification => (
                            <div
                                key={notification.id}
                                className={clsx(
                                    "p-3 mx-3 rounded-lg text-sm",
                                    notification.unread
                                        ? "bg-[#ed183b]/5 border-l-2 border-[#ed183b]"
                                        : "bg-gray-50"
                                )}
                            >
                              <div className="flex justify-between">
                                <h4 className="font-medium text-gray-800">{notification.title}</h4>
                                <span className="text-xs text-gray-500">{notification.time}</span>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                            </div>
                        ))}

                        {notifications.length > 2 && (
                            <button className="w-full text-center text-xs text-[#ed183b] py-2 hover:underline">
                              Voir {notifications.length - 2} notification{notifications.length - 2 > 1 ? 's' : ''} supplémentaire{notifications.length - 2 > 1 ? 's' : ''}
                            </button>
                        )}
                      </div>
                    </div>

                    {/* Mobile User Menu */}
                    <div className="bg-gray-50 rounded-lg p-3 mt-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="bg-gradient-to-r from-[#ed183b] to-[#be0f30] rounded-full p-2 shadow-sm flex-shrink-0">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-gray-800 font-medium">{user?.name || 'Utilisateur'}</div>
                          <div className="text-xs text-gray-500">{user?.mail || user?.email || 'utilisateur@example.com'}</div>

                          {/* Informations supplémentaires de l'utilisateur */}
                          {(user?.sgjob || user?.sgservicename || user?.c || user?.sgigg) && (
                            <div className="mt-2 pt-2 border-t border-gray-200 grid grid-cols-2 gap-x-2 gap-y-1">
                              {user?.sgjob && (
                                <div className="col-span-2">
                                  <span className="text-xs font-medium text-gray-700">Fonction: </span>
                                  <span className="text-xs text-gray-600">{user.sgjob}</span>
                                </div>
                              )}

                              {user?.sgservicename && (
                                <div className="col-span-2">
                                  <span className="text-xs font-medium text-gray-700">Service: </span>
                                  <span className="text-xs text-gray-600">{user.sgservicename}</span>
                                </div>
                              )}

                              {user?.c && (
                                <div>
                                  <span className="text-xs font-medium text-gray-700">Pays: </span>
                                  <span className="text-xs text-gray-600">{user.c}</span>
                                </div>
                              )}

                              {user?.sgigg && (
                                <div>
                                  <span className="text-xs font-medium text-gray-700">ID: </span>
                                  <span className="text-xs text-gray-600">{user.sgigg}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <motion.button 
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center justify-center gap-1.5 py-2 rounded-md bg-white border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                        >
                          <User className="h-4 w-4 text-primary-500" />
                          <span>Profil</span>
                        </motion.button>
                        <motion.button 
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center justify-center gap-1.5 py-2 rounded-md bg-white border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                        >
                          <Settings className="h-4 w-4 text-primary-500" />
                          <span>Paramètres</span>
                        </motion.button>
                        <motion.button 
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center justify-center gap-1.5 py-2 rounded-md bg-white border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors col-span-1 shadow-sm"
                        >
                          <HelpCircle className="h-4 w-4 text-primary-500" />
                          <span>Aide</span>
                        </motion.button>
                        <motion.button 
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={logout}
                          className="flex items-center justify-center gap-1.5 py-2 rounded-md bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm hover:from-primary-700 hover:to-primary-800 transition-colors col-span-1 shadow-md"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Déconnexion</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
  );
}
