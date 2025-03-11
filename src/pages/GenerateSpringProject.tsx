import React, { useState } from 'react';

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
        <div className="container mx-auto py-6">
            <h1 className="text-2xl font-bold mb-6">Générateur de projet Spring</h1>

            <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Nom du projet</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-4 py-2"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="Entrez le nom du projet"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Version de Java</label>
                    <select
                        className="w-full border border-gray-300 rounded px-4 py-2"
                        value={javaVersion}
                        onChange={(e) => setJavaVersion(e.target.value)}
                    >
                        <option value="8">Java 8</option>
                        <option value="11">Java 11</option>
                        <option value="17">Java 17 (recommandé)</option>
                        <option value="20">Java 20</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Outil de build</label>
                    <select
                        className="w-full border border-gray-300 rounded px-4 py-2"
                        value={buildTool}
                        onChange={(e) => setBuildTool(e.target.value)}
                    >
                        <option value="Maven">Maven</option>
                        <option value="Gradle">Gradle</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Dépendances</label>
                    {predefinedDependencies.map((dep) => (
                        <label key={dep} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={dependencies.includes(dep)}
                                onChange={() => handleDependencyChange(dep)}
                            />
                            {dep}
                        </label>
                    ))}
                </div>

                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                    Générer le projet
                </button>
            </form>
        </div>
    );
}