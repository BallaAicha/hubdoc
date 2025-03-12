import React, { useState } from 'react';

export function Settings() {
    const [settingsData, setSettingsData] = useState({
        notificationEmails: true,
        darkMode: false,
        autoSave: true,
        language: 'fr',
    });

    const handleToggle = (setting: keyof typeof settingsData) => {
        setSettingsData((prev) => ({
            ...prev,
            [setting]: !prev[setting],
        }));
    };

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSettingsData((prev) => ({
            ...prev,
            language: e.target.value,
        }));
    };

    const handleSave = () => {
        alert("Les paramètres ont été sauvegardés avec succès !");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e9041e] via-white to-gray-100 py-10">
            <div className="container mx-auto max-w-4xl bg-white shadow-xl rounded-lg p-8">
                {/* Header */}
                <header className="mb-8 border-b pb-4">
                    <h1 className="text-3xl font-bold text-gray-800">Paramètres</h1>
                    <p className="text-gray-600">Gérez vos préférences utilisateur et votre configuration.</p>
                </header>

                {/* Settings Form */}
                <div className="space-y-6">
                    {/* Notifications Emails */}
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium text-sm">Notifications par Email</span>
                        <button
                            onClick={() => handleToggle('notificationEmails')}
                            className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ${
                                settingsData.notificationEmails ? 'bg-green-400' : 'bg-gray-300'
                            }`}
                        >
                            <div
                                className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                                    settingsData.notificationEmails ? 'translate-x-6' : ''
                                }`}
                            ></div>
                        </button>
                    </div>

                    {/* Dark Mode */}
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium text-sm">Mode Sombre</span>
                        <button
                            onClick={() => handleToggle('darkMode')}
                            className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ${
                                settingsData.darkMode ? 'bg-[#e9041e]' : 'bg-gray-300'
                            }`}
                        >
                            <div
                                className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                                    settingsData.darkMode ? 'translate-x-6' : ''
                                }`}
                            ></div>
                        </button>
                    </div>

                    {/* Auto-Save */}
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium text-sm">Sauvegarde Automatique</span>
                        <button
                            onClick={() => handleToggle('autoSave')}
                            className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ${
                                settingsData.autoSave ? 'bg-green-400' : 'bg-gray-300'
                            }`}
                        >
                            <div
                                className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                                    settingsData.autoSave ? 'translate-x-6' : ''
                                }`}
                            ></div>
                        </button>
                    </div>

                    {/* Language Selector */}
                    <div>
                        <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                            Langue Préférée
                        </label>
                        <select
                            id="language"
                            value={settingsData.language}
                            onChange={handleLanguageChange}
                            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-[#e9041e] sm:text-sm"
                        >
                            <option value="fr">Français</option>
                            <option value="en">Anglais</option>
                            <option value="es">Espagnol</option>
                            <option value="de">Allemand</option>
                        </select>
                    </div>
                </div>

                {/* Save Button */}
                <div className="mt-8">
                    <button
                        onClick={handleSave}
                        className="w-full py-3 rounded-lg bg-[#e9041e] text-white font-semibold hover:bg-red-600 transition"
                    >
                        Sauvegarder les Paramètres
                    </button>
                </div>
            </div>
        </div>
    );
}