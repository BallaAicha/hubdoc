import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react'; // Pour une icône moderne de menu déroulant

export function GenerateSpringProject() {
    const [projectName, setProjectName] = useState('');
    const [javaVersion, setJavaVersion] = useState('17');
    const [buildTool, setBuildTool] = useState('Maven');
    const [dependencies, setDependencies] = useState<string[]>([]);

    const predefinedDependencies = ['Platforme', 'Foundation', 'Outils internes'];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const config = {
            projectName,
            javaVersion,
            buildTool,
            dependencies,
        };

        // Simuler l'envoi des données via une API REST
        const response = await fetch('/api/generate-project', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config),
        });

        if (response.ok) {
            alert('Projet généré avec succès!');
        } else {
            alert('Erreur lors de la génération du projet.');
        }
    };

    const handleDependencyChange = (dep: string) => {
        if (dependencies.includes(dep)) {
            setDependencies(dependencies.filter((d) => d !== dep));
        } else {
            setDependencies([...dependencies, dep]);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e9041e] via-white to-gray-100 py-12 px-6">
            <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden">
                {/* En-tête */}
                <header className="bg-[#e9041e] text-white px-6 py-6 text-center">
                    <h1 className="text-3xl font-extrabold tracking-wide">
                        Générateur de projet Spring
                    </h1>
                    <p className="mt-2 text-sm">
                        Créez facilement un projet Spring conforme aux normes de DEV.
                    </p>
                </header>

                {/* Formulaire */}
                <form className="px-8 py-10 space-y-8" onSubmit={handleSubmit}>
                    {/* Nom du projet */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600">
                            Nom du projet <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            placeholder="Entrez le nom du projet"
                            className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#e9041e] focus:ring-2 focus:ring-[#e9041e] text-gray-700"
                            required
                        />
                    </div>

                    {/* Version de Java */}
                    <div className="relative">
                        <label className="block text-sm font-semibold text-gray-600">
                            Version de Java
                        </label>
                        <div className="mt-2 relative">
                            <select
                                value={javaVersion}
                                onChange={(e) => setJavaVersion(e.target.value)}
                                className="appearance-none w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#e9041e] focus:ring-2 focus:ring-[#e9041e] text-gray-700 bg-white"
                            >
                                <option value="8">Java 8</option>
                                <option value="11">Java 11</option>
                                <option value="17">Java 17 (recommandé)</option>
                                <option value="20">Java 20</option>
                            </select>
                            <ChevronDown className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-400 w-5 h-5 pointer-events-none" />
                        </div>
                    </div>

                    {/* Outil de build */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600">
                            Outil de build
                        </label>
                        <div className="mt-2 relative">
                            <select
                                value={buildTool}
                                onChange={(e) => setBuildTool(e.target.value)}
                                className="appearance-none w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#e9041e] focus:ring-2 focus:ring-[#e9041e] text-gray-700 bg-white"
                            >
                                <option value="Maven">Maven</option>
                                <option value="Gradle">Gradle</option>
                            </select>
                            <ChevronDown className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-400 w-5 h-5 pointer-events-none" />
                        </div>
                    </div>

                    {/* Dépendances */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600">
                            Dépendances
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            {predefinedDependencies.map((dep) => (
                                <div
                                    key={dep}
                                    className="flex items-center bg-gray-100 rounded-lg px-4 py-3 cursor-pointer transition hover:bg-[#efccd2]"
                                >
                                    <input
                                        type="checkbox"
                                        className="mr-3 accent-[#e9041e] w-5 h-5"
                                        checked={dependencies.includes(dep)}
                                        onChange={() => handleDependencyChange(dep)}
                                    />
                                    <label className="text-gray-700 text-sm">{dep}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bouton de soumission */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 rounded-lg bg-[#e9041e] text-white font-semibold hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center gap-3"
                        >
                            Générer le projet
                        </button>
                    </div>
                </form>
            </div>

            <footer className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                    © 2024 Générateur Spring. Tous droits réservés.
                </p>
            </footer>
        </div>
    );
}