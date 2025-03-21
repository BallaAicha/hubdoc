import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FileText,
    Save,
    ArrowLeft,
    X,
    AlertCircle,
    Info
} from 'lucide-react';
import clsx from 'clsx';


export function CreateDocument() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: 'standard',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Le nom du document est requis';
        } else if (formData.name.length < 3) {
            newErrors.name = 'Le nom doit contenir au moins 3 caractères';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitted(true);

        if (validateForm()) {
            console.log('Nouveau document soumis:', formData);
            // Simuler une sauvegarde réussie
            setTimeout(() => {
                navigate('/documents');
            }, 500);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Effacer l'erreur si l'utilisateur modifie le champ
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleCancel = () => {
        if (formData.name || formData.description) {
            if (window.confirm('Êtes-vous sûr de vouloir annuler ? Toutes les modifications seront perdues.')) {
                navigate('/documents');
            }
        } else {
            navigate('/documents');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Bar */}
            <header className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <button
                            onClick={handleCancel}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-150"
                        >
                            <ArrowLeft className="h-4 w-4 mr-1.5" />
                            Retour
                        </button>

                        <h1 className="text-lg font-bold text-neutral-800 flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-primary-600" />
                            Nouveau document
                        </h1>

                        <div className="w-24">
                            {/* Spacer for layout balance */}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white shadow rounded-lg overflow-hidden border border-neutral-200 transition-all duration-200 hover:shadow-md">
                    {/* Form Header */}
                    <div className="px-6 py-5 border-b border-neutral-200 bg-white">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-neutral-800">Créer un document</h2>

                            <button
                                type="button"
                                onClick={() => setShowHelp(!showHelp)}
                                className="inline-flex items-center text-sm text-neutral-500 hover:text-primary-600 focus:outline-none transition-colors duration-150"
                                aria-expanded={showHelp}
                                aria-label="Afficher l'aide"
                            >
                                <Info className="h-5 w-5" />
                                <span className="ml-1.5 hidden sm:inline">Aide</span>
                            </button>
                        </div>

                        {showHelp && (
                            <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-md animate-fadeIn">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <Info className="h-5 w-5 text-info" />
                                    </div>
                                    <div className="ml-3 flex-1">
                                        <p className="text-sm text-neutral-700">
                                            Complétez ce formulaire pour créer un nouveau document.
                                            Les champs marqués d'un astérisque (*) sont obligatoires.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        className="ml-auto flex-shrink-0 text-blue-400 hover:text-blue-500 transition-colors"
                                        onClick={() => setShowHelp(false)}
                                        aria-label="Fermer l'aide"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Form Body */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-8">
                        <div className="space-y-6">
                            {/* Document Type */}
                            <div className="group">
                                <label htmlFor="type" className="block text-sm font-medium text-neutral-700 mb-1">
                                    Type de document
                                </label>
                                <div className="relative">
                                    <select
                                        id="type"
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border border-neutral-300 pl-3 pr-10 py-2.5 bg-white shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-30 sm:text-sm transition-all duration-150"
                                    >
                                        <option value="standard">Document standard</option>
                                        <option value="contract">Contrat</option>
                                        <option value="report">Rapport</option>
                                        <option value="invoice">Facture</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-500">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Document Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                                    Nom du document <span className="text-primary-600">*</span>
                                </label>
                                <div className="mt-1 relative">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Entrez le nom du document"
                                        className={clsx(
                                            "block w-full rounded-md shadow-sm sm:text-sm py-2.5 transition-all duration-150 border",
                                            errors.name
                                                ? "border-error focus:border-error focus:ring focus:ring-error focus:ring-opacity-30 pr-10"
                                                : "border-neutral-300 focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-30"
                                        )}
                                        required
                                    />
                                    {errors.name && (
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <AlertCircle className="h-5 w-5 text-error" />
                                        </div>
                                    )}
                                </div>
                                {errors.name && (
                                    <p className="mt-1.5 text-sm text-error flex items-center">
                                        <AlertCircle className="h-4 w-4 mr-1.5 flex-shrink-0" />
                                        <span>{errors.name}</span>
                                    </p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
                                    Description <span className="text-neutral-500 text-xs font-normal">(facultatif)</span>
                                </label>
                                <div className="mt-1">
                  <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Ajoutez une description pour ce document..."
                      className="block w-full rounded-md border border-neutral-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-30 sm:text-sm transition-all duration-150 resize-y"
                  />
                                </div>
                                <p className="mt-1.5 text-xs text-neutral-500">
                                    Une description claire aidera les autres utilisateurs à comprendre l'objectif de ce document.
                                </p>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="pt-5 border-t border-neutral-200">
                            <div className="flex justify-end gap-x-3">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="inline-flex items-center px-4 py-2.5 border border-neutral-300 shadow-sm text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    disabled={formSubmitted && Object.keys(errors).length > 0}
                                    className={clsx(
                                        "inline-flex items-center px-5 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150",
                                        (formSubmitted && Object.keys(errors).length > 0)
                                            ? "bg-neutral-400 cursor-not-allowed"
                                            : "bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 transform hover:-translate-y-0.5"
                                    )}
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    Créer le document
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Additional Info Card */}
                <div className="mt-6 bg-white shadow rounded-lg overflow-hidden border border-neutral-200 transition-all duration-200 hover:shadow-md">
                    <div className="px-6 py-5 bg-white border-l-4 border-info">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <Info className="h-5 w-5 text-info" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-neutral-800">À propos des documents</h3>
                                <div className="mt-1.5 text-sm text-neutral-600">
                                    <p>
                                        Une fois créé, votre document sera accessible depuis la bibliothèque de documents.
                                        Vous pourrez le modifier, le partager ou le supprimer ultérieurement.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Add custom styles */}
            <style dangerouslySetInnerHTML={{
              __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}} />
        </div>
    );
}