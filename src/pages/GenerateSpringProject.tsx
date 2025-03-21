import React, { useState } from "react";
import { Box, Check, ChevronDown, Code2, Download, Layers, Package, Terminal, X } from "lucide-react";
import clsx from "clsx";

export function GenerateSpringProject() {
    // État du formulaire
    const [formData, setFormData] = useState({
        projectName: "",
        groupId: "",
        description: "",
        javaVersion: "21",
        gradleVersion: "8.5",
        modules: {
            core: true,
            api: true,
            service: true
        },
        dependencies: {
            platform: true,
            sgabsStarter: true,
            swagger: false,
            testcontainers: false,
            liquibase: false
        }
    });

    // État pour afficher/masquer les sections
    const [expandedSections, setExpandedSections] = useState({
        structure: true,
        dependencies: true,
        preview: false
    });

    // État pour montrer/masquer le toast de confirmation
    const [showToast, setShowToast] = useState(false);

    // État pour indiquer le chargement
    const [isGenerating, setIsGenerating] = useState(false);

    // Gestion des changements de formulaire
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Gestion des modules
    const handleModuleToggle = (module: string) => {
        setFormData(prev => ({
            ...prev,
            modules: {
                ...prev.modules,
                [module]: !prev.modules[module as keyof typeof prev.modules]
            }
        }));
    };

    // Gestion des dépendances
    const handleDependencyToggle = (dep: string) => {
        setFormData(prev => ({
            ...prev,
            dependencies: {
                ...prev.dependencies,
                [dep]: !prev.dependencies[dep as keyof typeof prev.dependencies]
            }
        }));
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsGenerating(true);

        // Simulation d'une génération de projet
        setTimeout(() => {
            console.log("Projet généré avec les paramètres:", formData);
            setIsGenerating(false);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 5000);
        }, 1500);
    };

    // Toggle sections
    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section as keyof typeof prev]
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br  bg-neutral-50 via-white to-gray-100 py-12 px-6">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Notification toast */}
                    {showToast && (
                        <div className="fixed top-5 right-5 bg-green-50 border-l-4 border-green-500 p-4 shadow-lg rounded-md flex items-center justify-between z-50 animate-fade-in-down">
                            <div className="flex items-center">
                                <Check className="h-6 w-6 text-green-500 mr-3" />
                                <span className="text-green-800">Projet généré avec succès!</span>
                            </div>
                            <button
                                onClick={() => setShowToast(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    )}

                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Générateur de projet Spring Hexagonal
                        </h1>
                        <p className="text-lg text-gray-600">
                            Générez un projet Spring Boot basé sur une architecture hexagonale.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-xl p-8">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-2">
                                        Nom du projet
                                    </label>
                                    <input
                                        id="projectName"
                                        name="projectName"
                                        type="text"
                                        value={formData.projectName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e9041e] focus:border-[#e9041e]"
                                        placeholder="Entrez le nom du projet"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="groupId" className="block text-sm font-medium text-gray-700 mb-2">
                                        Group ID
                                    </label>
                                    <input
                                        id="groupId"
                                        name="groupId"
                                        type="text"
                                        value={formData.groupId}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e9041e] focus:border-[#e9041e]"
                                        placeholder="com.example"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e9041e] focus:border-[#e9041e]"
                                    rows={3}
                                    placeholder="Description du projet"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="javaVersion" className="block text-sm font-medium text-gray-700 mb-2">
                                        Version de Java
                                    </label>
                                    <select
                                        id="javaVersion"
                                        name="javaVersion"
                                        value={formData.javaVersion}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e9041e] focus:border-[#e9041e]"
                                    >
                                        <option value="21">Java 21 (LTS)</option>
                                        <option value="17">Java 17 (LTS)</option>
                                        <option value="11">Java 11 (LTS)</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="gradleVersion" className="block text-sm font-medium text-gray-700 mb-2">
                                        Version de Gradle
                                    </label>
                                    <select
                                        id="gradleVersion"
                                        name="gradleVersion"
                                        value={formData.gradleVersion}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e9041e] focus:border-[#e9041e]"
                                    >
                                        <option value="8.5">Gradle 8.5</option>
                                        <option value="8.4">Gradle 8.4</option>
                                        <option value="8.3">Gradle 8.3</option>
                                    </select>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6">
                                <div
                                    className="flex justify-between items-center cursor-pointer"
                                    onClick={() => toggleSection('structure')}
                                >
                                    <h3 className="text-lg font-medium text-gray-900">Structure du projet</h3>
                                    <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections.structure ? 'transform rotate-180' : ''}`} />
                                </div>

                                {expandedSections.structure && (
                                    <div className="mt-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div
                                                className={clsx("p-4 rounded-lg border transition-all",
                                                    formData.modules.core
                                                        ? "bg-white border-[#e9041e] shadow-sm"
                                                        : "bg-gray-100 border-gray-200"
                                                )}
                                                onClick={() => handleModuleToggle('core')}
                                            >
                                                <div className="flex items-center justify-between text-gray-700 mb-2">
                                                    <div className="flex items-center">
                                                        <Box className={clsx("w-5 h-5 mr-2", formData.modules.core ? "text-[#e9041e]" : "text-gray-500")} />
                                                        <span className="font-medium">Module Core</span>
                                                    </div>
                                                    <div className={clsx("w-5 h-5 rounded-full flex items-center justify-center",
                                                        formData.modules.core ? "bg-[#e9041e]" : "bg-gray-200"
                                                    )}>
                                                        {formData.modules.core && <Check className="w-3 h-3 text-white" />}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    Logique métier et entités de domaine
                                                </p>
                                            </div>
                                            <div
                                                className={clsx("p-4 rounded-lg border transition-all",
                                                    formData.modules.api
                                                        ? "bg-white border-[#e9041e] shadow-sm"
                                                        : "bg-gray-100 border-gray-200"
                                                )}
                                                onClick={() => handleModuleToggle('api')}
                                            >
                                                <div className="flex items-center justify-between text-gray-700 mb-2">
                                                    <div className="flex items-center">
                                                        <Layers className={clsx("w-5 h-5 mr-2", formData.modules.api ? "text-[#e9041e]" : "text-gray-500")} />
                                                        <span className="font-medium">Module API</span>
                                                    </div>
                                                    <div className={clsx("w-5 h-5 rounded-full flex items-center justify-center",
                                                        formData.modules.api ? "bg-[#e9041e]" : "bg-gray-200"
                                                    )}>
                                                        {formData.modules.api && <Check className="w-3 h-3 text-white" />}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    Contrôleurs REST et adaptateurs primaires
                                                </p>
                                            </div>
                                            <div
                                                className={clsx("p-4 rounded-lg border transition-all",
                                                    formData.modules.service
                                                        ? "bg-white border-[#e9041e] shadow-sm"
                                                        : "bg-gray-100 border-gray-200"
                                                )}
                                                onClick={() => handleModuleToggle('service')}
                                            >
                                                <div className="flex items-center justify-between text-gray-700 mb-2">
                                                    <div className="flex items-center">
                                                        <Code2 className={clsx("w-5 h-5 mr-2", formData.modules.service ? "text-[#e9041e]" : "text-gray-500")} />
                                                        <span className="font-medium">Module Service</span>
                                                    </div>
                                                    <div className={clsx("w-5 h-5 rounded-full flex items-center justify-center",
                                                        formData.modules.service ? "bg-[#e9041e]" : "bg-gray-200"
                                                    )}>
                                                        {formData.modules.service && <Check className="w-3 h-3 text-white" />}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    Services et adaptateurs secondaires
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6">
                                <div
                                    className="flex justify-between items-center cursor-pointer"
                                    onClick={() => toggleSection('dependencies')}
                                >
                                    <h3 className="text-lg font-medium text-gray-900">Dépendances incluses</h3>
                                    <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections.dependencies ? 'transform rotate-180' : ''}`} />
                                </div>

                                {expandedSections.dependencies && (
                                    <div className="mt-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Dépendances obligatoires */}
                                            <div className="flex items-center text-gray-700">
                                                <Package className="w-5 h-5 mr-2 text-green-600" />
                                                <span>Plateform & Foundation (inclus par défaut)</span>
                                            </div>
                                            <div className="flex items-center text-gray-700">
                                                <Terminal className="w-5 h-5 mr-2 text-green-600" />
                                                <span>SGABS Starter</span>
                                            </div>

                                            {/* Dépendances optionnelles */}
                                            <div className="flex items-center justify-between p-2 rounded hover:bg-gray-100">
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id="swagger"
                                                        checked={formData.dependencies.swagger}
                                                        onChange={() => handleDependencyToggle('swagger')}
                                                        className="w-4 h-4 mr-3 accent-[#e9041e]"
                                                    />
                                                    <label htmlFor="swagger" className="cursor-pointer">Swagger / OpenAPI</label>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between p-2 rounded hover:bg-gray-100">
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id="testcontainers"
                                                        checked={formData.dependencies.testcontainers}
                                                        onChange={() => handleDependencyToggle('testcontainers')}
                                                        className="w-4 h-4 mr-3 accent-[#e9041e]"
                                                    />
                                                    <label htmlFor="testcontainers" className="cursor-pointer">Testcontainers</label>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between p-2 rounded hover:bg-gray-100">
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id="liquibase"
                                                        checked={formData.dependencies.liquibase}
                                                        onChange={() => handleDependencyToggle('liquibase')}
                                                        className="w-4 h-4 mr-3 accent-[#e9041e]"
                                                    />
                                                    <label htmlFor="liquibase" className="cursor-pointer">Liquibase</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Prévisualisation de la structure */}
                            <div className="bg-gray-50 rounded-lg p-6">
                                <div
                                    className="flex justify-between items-center cursor-pointer"
                                    onClick={() => toggleSection('preview')}
                                >
                                    <h3 className="text-lg font-medium text-gray-900">Prévisualisation de la structure</h3>
                                    <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections.preview ? 'transform rotate-180' : ''}`} />
                                </div>

                                {expandedSections.preview && (
                                    <div className="mt-4 p-4 bg-gray-800 text-gray-200 font-mono rounded overflow-x-auto text-sm">
                                        <pre>{formData.projectName || "my-project"}/
├── build.gradle.kts
├── settings.gradle.kts
├── gradle/
                                            {formData.modules.core ? `├── core/
│   ├── build.gradle.kts
│   └── src/
│       ├── main/java/
│       └── test/java/` : ''}
                                            {formData.modules.api ? `├── api/
│   ├── build.gradle.kts
│   └── src/
│       ├── main/java/
│       └── test/java/` : ''}
                                            {formData.modules.service ? `└── service/
    ├── build.gradle.kts
    └── src/
        ├── main/java/
        └── test/java/` : ''}</pre>
                                    </div>
                                )}
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isGenerating}
                                    className={clsx(
                                        "w-full flex items-center justify-center px-6 py-3 text-base font-medium rounded-md transition",
                                        "bg-[#e9041e] text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500",
                                        isGenerating && "opacity-75 cursor-not-allowed"
                                    )}
                                >
                                    {isGenerating ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Génération en cours...
                                        </>
                                    ) : (
                                        <>
                                            <Download className="w-5 h-5 mr-2" />
                                            Générer le projet
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        Les projets générés incluent Plateform et suivent les meilleures pratiques des Normes dev de SGABS.
                    </div>
                </div>
            </div>
        </div>
    );
}