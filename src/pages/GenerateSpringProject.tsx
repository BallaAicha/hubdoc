import React from "react";
import { Box, Code2, Layers, Package, Terminal } from "lucide-react";

export function GenerateSpringProject() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e9041e] via-white to-gray-100 py-12 px-6">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Générateur de projet Spring Hexagonal
                        </h1>
                        <p className="text-lg text-gray-600">
                            Générez un projet Spring Boot basé sur une architecture hexagonale.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-xl p-8">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nom du projet
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e9041e] focus:border-[#e9041e]"
                                        placeholder="Entrez le nom du projet"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Group ID
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e9041e] focus:border-[#e9041e]"
                                        placeholder="com.example"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e9041e] focus:border-[#e9041e]"
                                    rows={3}
                                    placeholder="Description du projet"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Version de Java
                                    </label>
                                    <select
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e9041e] focus:border-[#e9041e]"
                                    >
                                        <option value="21">Java 21 (LTS)</option>
                                        <option value="17">Java 17 (LTS)</option>
                                        <option value="11">Java 11 (LTS)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Version de Gradle
                                    </label>
                                    <select
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e9041e] focus:border-[#e9041e]"
                                    >
                                        <option value="8.5">Gradle 8.5</option>
                                        <option value="8.4">Gradle 8.4</option>
                                        <option value="8.3">Gradle 8.3</option>
                                    </select>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Structure du projet</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                                        <div className="flex items-center text-gray-700 mb-2">
                                            <Box className="w-5 h-5 mr-2 text-[#e9041e]" />
                                            <span className="font-medium">Module Core</span>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            Logique métier et entités de domaine
                                        </p>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                                        <div className="flex items-center text-gray-700 mb-2">
                                            <Layers className="w-5 h-5 mr-2 text-[#e9041e]" />
                                            <span className="font-medium">Module API</span>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            Contrôleurs REST et adaptateurs primaires
                                        </p>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                                        <div className="flex items-center text-gray-700 mb-2">
                                            <Code2 className="w-5 h-5 mr-2 text-[#e9041e]" />
                                            <span className="font-medium">Module Service</span>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            Services et adaptateurs secondaires
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Dépendances incluses</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center text-gray-700">
                                        <Package className="w-5 h-5 mr-2 text-green-600" />
                                        <span>Plateform & Foundation (inclus par défaut)</span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <Terminal className="w-5 h-5 mr-2 text-green-600" />
                                        <span>SGABS  Starter</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center px-6 py-3 text-base font-medium rounded-md bg-[#e9041e] text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500 transition"
                                >
                                    Générer le projet
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        Les projets générés incluent Plateform  et suivent les meilleures pratiques des Normes dev de SGABS.
                    </div>
                </div>
            </div>
        </div>
    );
}