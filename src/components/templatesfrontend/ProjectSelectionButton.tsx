import React, { useState } from 'react';
import { Plus, ArrowRight, Code, Layout } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export const ProjectSelectionButton = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    const handleButtonClick = () => {
        setShowMenu(true);
    };

    const handleSelection = (path: string) => {
        setShowMenu(false);
        navigate(path);
    };

    return (
        <div className="relative">
            <button
                onClick={handleButtonClick}
                className="flex items-center gap-3 py-3.5 px-7 bg-black text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
                <Plus className="w-5 h-5" />
                <span>Générer un projet</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* Menu de sélection qui s'affiche lorsque showMenu est true */}
            {showMenu && (
                <div className="absolute z-50 mt-2 w-72 rounded-lg shadow-xl bg-white border border-gray-200 animate-in fade-in-50 slide-in-from-top-5">
                    <div className="p-2">
                        <h3 className="px-3 py-2 text-sm font-medium text-gray-700">Choisir un type de projet</h3>

                        <button
                            onClick={() => handleSelection('/generate-spring-project')}
                            className="flex items-center w-full gap-3 px-3 py-2.5 text-left rounded-md hover:bg-gray-100 transition-colors"
                        >
                            <div className="p-2 bg-blue-100 rounded-md">
                                <Code className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <div className="font-medium">Backend (Spring)</div>
                                <div className="text-xs text-gray-500">Générer un projet Java Spring Boot</div>
                            </div>
                        </button>

                        <button
                            onClick={() => handleSelection('/generate-react-project')}
                            className="flex items-center w-full gap-3 px-3 py-2.5 text-left rounded-md hover:bg-gray-100 transition-colors"
                        >
                            <div className="p-2 bg-emerald-100 rounded-md">
                                <Layout className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                                <div className="font-medium">Frontend (React)</div>
                                <div className="text-xs text-gray-500">Générer un projet React</div>
                            </div>
                        </button>
                    </div>
                </div>
            )}

            {/* Overlay pour fermer le menu quand on clique ailleurs */}
            {showMenu && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowMenu(false)}
                />
            )}
        </div>
    );
};

// Remplacez le bouton actuel par ce composant dans QuickStart.tsx