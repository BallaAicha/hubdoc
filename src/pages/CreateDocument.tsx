import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FileText,
    Save,
    ArrowLeft,
    X,
    AlertCircle,
    Info,
    FileEdit,
    CheckCircle2,
    ChevronDown,
    Clock,
    Calendar,
    LayoutGrid,
    Bookmark
} from 'lucide-react';
import clsx from 'clsx';

// Types de documents avec des métadonnées enrichies
const DOCUMENT_TYPES = [
    {
        id: 'standard',
        name: 'Document standard',
        description: 'Document basique pour tous types d\'usage',
        icon: FileText
    },
    {
        id: 'contract',
        name: 'Contrat',
        description: 'Document juridiquement contraignant entre parties',
        icon: FileEdit
    },
    {
        id: 'report',
        name: 'Rapport',
        description: 'Présentation détaillée de données et analyses',
        icon: LayoutGrid
    },
    {
        id: 'invoice',
        name: 'Facture',
        description: 'Document financier pour transactions commerciales',
        icon: Calendar
    }
];

export function CreateDocument() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: 'standard',
        tags: [] as string[]
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);

    // Animation d'entrée
    useEffect(() => {
        document.querySelector('.form-container')?.classList.add('form-appear');
    }, []);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitted(true);

        if (validateForm()) {
            setIsSubmitting(true);

            try {
                // Simuler une requête API
                await new Promise(resolve => setTimeout(resolve, 800));
                console.log('Nouveau document soumis:', formData);

                // Afficher un message de succès temporaire avant la redirection
                document.getElementById('success-message')?.classList.remove('hidden');

                setTimeout(() => {
                    navigate('/documents');
                }, 1200);
            } catch (error) {
                console.error('Erreur lors de la création:', error);
                setIsSubmitting(false);
            }
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

    const selectDocType = (typeId: string) => {
        setFormData(prev => ({...prev, type: typeId}));
        setTypeDropdownOpen(false);
    };

    const handleCancel = () => {
        if (formData.name || formData.description) {
            const dialogContainer = document.getElementById('confirmation-dialog');
            if (dialogContainer) dialogContainer.classList.remove('hidden');
        } else {
            navigate('/documents');
        }
    };

    const handleConfirmCancel = () => {
        navigate('/documents');
    };

    const handleDismissDialog = () => {
        const dialogContainer = document.getElementById('confirmation-dialog');
        if (dialogContainer) dialogContainer.classList.add('hidden');
    };

    // Trouver le type de document actuel
    const selectedType = DOCUMENT_TYPES.find(type => type.id === formData.type);
    const TypeIcon = selectedType?.icon || FileText;

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Header Bar avec un design moderne et une palette de couleurs professionnelle */}
            <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-center h-16">
                        <button
                            onClick={handleCancel}
                            className="inline-flex items-center px-3.5 py-2 border border-transparent text-sm font-medium rounded-md text-slate-600 hover:text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
                            aria-label="Retour"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Retour
                        </button>

                        <h1 className="text-lg font-semibold text-slate-800 flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-indigo-600" />
                            <span className="hidden sm:inline">Nouveau document</span>
                            <span className="sm:hidden">Document</span>
                        </h1>

                        <div className="w-24">
                            {/* Espace pour équilibrer le header */}
                        </div>
                    </div>
                </div>
            </header>

            {/* Conteneur principal avec effet d'apparition */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
                <div className="form-container opacity-0 translate-y-4">
                    {/* Carte principale avec design ombré et effet de hover */}
                    <div className="bg-white shadow-md rounded-xl overflow-hidden border border-slate-200 transition-all duration-300 hover:shadow-lg">
                        {/* En-tête du formulaire avec style visuel distinctif */}
                        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-6 sm:px-8">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <h2 className="text-xl font-semibold text-white flex items-center">
                                        <FileEdit className="h-5 w-5 mr-2 text-indigo-200" />
                                        Créer un document
                                    </h2>
                                    <p className="text-indigo-100 text-sm">
                                        Complétez le formulaire ci-dessous pour créer un nouveau document
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setShowHelp(!showHelp)}
                                    className={`inline-flex items-center text-sm rounded-full p-2 ${showHelp ? 'bg-indigo-500 text-white' : 'text-indigo-100 hover:bg-indigo-500/30'} focus:outline-none transition-colors duration-200`}
                                    aria-expanded={showHelp}
                                    aria-label="Afficher l'aide"
                                >
                                    <Info className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Panneau d'aide avec animation */}
                            {showHelp && (
                                <div className="mt-5 p-4 bg-indigo-50 bg-opacity-95 border border-indigo-100 rounded-lg animate-fadeIn">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <Info className="h-5 w-5 text-indigo-500" />
                                        </div>
                                        <div className="ml-3 flex-1">
                                            <p className="text-sm text-slate-700">
                                                <span className="font-medium text-indigo-700">Comment ça fonctionne :</span> Choisissez un type de document,
                                                donnez-lui un nom explicite et ajoutez une description détaillée pour faciliter sa recherche
                                                et son identification ultérieures. Les champs marqués d'un astérisque (*) sont obligatoires.
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            className="ml-auto flex-shrink-0 text-indigo-400 hover:text-indigo-500 transition-colors"
                                            onClick={() => setShowHelp(false)}
                                            aria-label="Fermer l'aide"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Affichage du message de succès */}
                        <div id="success-message" className="hidden px-6 py-4 mt-4 mx-6 bg-emerald-50 border border-emerald-100 rounded-lg">
                            <div className="flex items-center">
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                <p className="ml-3 text-sm font-medium text-emerald-800">Document créé avec succès !</p>
                            </div>
                        </div>

                        {/* Corps du formulaire avec disposition améliorée */}
                        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
                            <div className="space-y-8">
                                {/* Section Type de document avec sélecteur visuel */}
                                <div className="space-y-4">
                                    <label className="block text-sm font-medium text-slate-700">
                                        Type de document
                                    </label>

                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
                                            className={clsx(
                                                "w-full flex items-center justify-between px-4 py-3.5 border border-slate-300 rounded-lg shadow-sm text-left text-base",
                                                "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
                                                "transition-all duration-200 bg-white hover:bg-slate-50"
                                            )}
                                            aria-haspopup="listbox"
                                            aria-expanded={typeDropdownOpen}
                                        >
                                            <div className="flex items-center">
                        <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-indigo-100 text-indigo-600 mr-3">
                          <TypeIcon className="h-6 w-6" />
                        </span>
                                                <div>
                                                    <span className="block font-medium">{selectedType?.name}</span>
                                                    <span className="block text-sm text-slate-500 mt-0.5">{selectedType?.description}</span>
                                                </div>
                                            </div>
                                            <ChevronDown
                                                className={clsx(
                                                    "h-5 w-5 text-slate-400 transition-transform duration-200",
                                                    typeDropdownOpen ? "transform rotate-180" : ""
                                                )}
                                            />
                                        </button>

                                        {/* Dropdown pour types de documents avec animations */}
                                        {typeDropdownOpen && (
                                            <div className="absolute z-10 w-full mt-2 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden transform opacity-0 scale-95 animate-dropdown origin-top">
                                                <ul className="py-1 max-h-60 overflow-auto" role="listbox">
                                                    {DOCUMENT_TYPES.map(type => (
                                                        <li
                                                            key={type.id}
                                                            onClick={() => selectDocType(type.id)}
                                                            className={clsx(
                                                                "px-3 py-2.5 flex items-center cursor-pointer hover:bg-slate-50",
                                                                formData.type === type.id ? "bg-indigo-50" : ""
                                                            )}
                                                            role="option"
                                                            aria-selected={formData.type === type.id}
                                                        >
                              <span className={clsx(
                                  "inline-flex items-center justify-center h-10 w-10 rounded-md mr-3",
                                  formData.type === type.id ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-600"
                              )}>
                                <type.icon className="h-6 w-6" />
                              </span>
                                                            <div>
                                <span className={clsx(
                                    "block font-medium",
                                    formData.type === type.id ? "text-indigo-700" : "text-slate-700"
                                )}>
                                  {type.name}
                                </span>
                                                                <span className="block text-sm text-slate-500 mt-0.5">
                                  {type.description}
                                </span>
                                                            </div>
                                                            {formData.type === type.id && (
                                                                <CheckCircle2 className="ml-auto h-5 w-5 text-indigo-600" />
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Nom du document avec design visuel amélioré */}
                                <div className="space-y-1.5">
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                                        Nom du document <span className="text-indigo-600">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FileText className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Entrez le nom du document"
                                            className={clsx(
                                                "block w-full rounded-lg shadow-sm sm:text-sm py-3 pl-10 pr-3 transition-all duration-200",
                                                "focus:ring-2 focus:ring-opacity-50 focus:ring-offset-0",
                                                errors.name
                                                    ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                                                    : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                                            )}
                                            required
                                        />
                                        {errors.name && (
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <AlertCircle className="h-5 w-5 text-red-500" />
                                            </div>
                                        )}
                                    </div>
                                    {errors.name && (
                                        <p className="mt-1.5 text-sm text-red-600 flex items-start">
                                            <AlertCircle className="h-4 w-4 mr-1.5 flex-shrink-0 mt-0.5" />
                                            <span>{errors.name}</span>
                                        </p>
                                    )}
                                    {!errors.name && (
                                        <p className="mt-1 text-xs text-slate-500">
                                            Choisissez un nom clair et descriptif pour faciliter la recherche.
                                        </p>
                                    )}
                                </div>

                                {/* Description avec compteur de caractères */}
                                <div className="space-y-1.5">
                                    <label htmlFor="description" className="block text-sm font-medium text-slate-700">
                                        Description <span className="text-slate-500 text-xs font-normal">(facultatif)</span>
                                    </label>
                                    <div className="mt-1 relative">
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Ajoutez une description pour ce document..."
                        className="block w-full rounded-lg border border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm transition-all duration-200 resize-y"
                    />
                                        <div className="absolute bottom-2 right-2 text-xs text-slate-400">
                                            {formData.description.length} caractères
                                        </div>
                                    </div>
                                    <p className="mt-1 text-xs text-slate-500 flex items-center">
                                        <Info className="h-3.5 w-3.5 mr-1 text-slate-400" />
                                        Une description détaillée facilitera la compréhension du contenu et de l'objectif du document.
                                    </p>
                                </div>

                                {/* Informations supplémentaires */}
                                <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                                    <h3 className="text-sm font-medium text-slate-700 mb-3 flex items-center">
                                        <Clock className="h-4 w-4 mr-1.5 text-slate-500" />
                                        Informations de contexte
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                                            <span>Date de création: {new Date().toLocaleDateString('fr-FR')}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Bookmark className="h-4 w-4 mr-2 text-slate-400" />
                                            <span>Version: 1.0</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions du formulaire avec boutons stylisés */}
                            <div className="mt-10 pt-6 border-t border-slate-200">
                                <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="sm:order-1 order-2 inline-flex justify-center items-center px-4 py-2.5 border border-slate-300 shadow-sm text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || (formSubmitted && Object.keys(errors).length > 0)}
                                        className={clsx(
                                            "sm:order-2 order-1 inline-flex justify-center items-center px-6 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200",
                                            (isSubmitting || (formSubmitted && Object.keys(errors).length > 0))
                                                ? "bg-slate-400 cursor-not-allowed"
                                                : "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus:ring-indigo-500 transform hover:-translate-y-0.5"
                                        )}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Création en cours...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="h-4 w-4 mr-2" />
                                                Créer le document
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Carte d'information améliorée */}
                    <div className="mt-8 bg-white shadow-md rounded-xl overflow-hidden border border-slate-200 transition-all duration-300 hover:shadow-lg">
                        <div className="px-6 py-5 border-l-4 border-indigo-500 flex">
                            <div className="flex-shrink-0">
                                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                    <Info className="h-5 w-5 text-indigo-600" />
                                </div>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-sm font-semibold text-slate-800">À propos des documents</h3>
                                <div className="mt-1.5 text-sm text-slate-600">
                                    <p className="mb-2">
                                        Une fois créé, votre document sera accessible depuis la bibliothèque de documents.
                                        Vous pourrez le modifier, le partager avec d'autres utilisateurs ou le supprimer ultérieurement.
                                    </p>
                                    <p>
                                        Les documents peuvent être organisés par dossiers, étiquettes et statuts pour faciliter
                                        la gestion documentaire au sein de votre organisation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal de confirmation avec animation */}
            <div id="confirmation-dialog" className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 hidden animate-fadeIn">
                <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-800">Confirmer l'annulation</h3>
                    </div>
                    <div className="px-6 py-4">
                        <p className="text-slate-600">
                            Êtes-vous sûr de vouloir annuler ? Toutes les modifications seront perdues et ne pourront pas être récupérées.
                        </p>
                    </div>
                    <div className="px-6 py-4 bg-slate-50 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={handleDismissDialog}
                            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                        >
                            Continuer l'édition
                        </button>
                        <button
                            type="button"
                            onClick={handleConfirmCancel}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                        >
                            Annuler et quitter
                        </button>
                    </div>
                </div>
            </div>

            {/* Style personnalisé pour les animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out forwards;
          }
          
          @keyframes dropdownAppear {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
          }
          .animate-dropdown {
            animation: dropdownAppear 0.2s ease-out forwards;
          }
          
          .form-appear {
            animation: formAppear 0.5s ease-out forwards;
          }
          
          @keyframes formAppear {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          
          .form-container {
            transition: opacity 0.4s ease-out, transform 0.4s ease-out;
          }
        `}}
            />

            {/* Footer */}
            <footer className="bg-neutral-800 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <div className="flex items-center space-x-3 mb-6">
                                    <img
                                        src="/src/logo.jpeg"
                                        alt="Logo"
                                        className="h-8 w-auto bg-white rounded-md p-1"
                                    />
                                    <span className="font-bold text-xl">DOC HUB</span>
                                </div>
                                <p className="text-neutral-400 mb-4">
                                    Plateforme de documentation et de génération de projets pour développeurs.
                                </p>
                                <div className="flex space-x-4">
                                    <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                                        <span className="sr-only">Twitter</span>
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                                        <span className="sr-only">GitHub</span>
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                                        <span className="sr-only">LinkedIn</span>
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-white text-lg mb-4">Produit</h3>
                                <ul className="space-y-3">
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Caractéristiques</a></li>
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Tarification</a></li>
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Démo</a></li>
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Roadmap</a></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-white text-lg mb-4">Documentation</h3>
                                <ul className="space-y-3">
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Guides</a></li>
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">API Reference</a></li>
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Tutoriels</a></li>
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Exemples</a></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-white text-lg mb-4">Entreprise</h3>
                                <ul className="space-y-3">
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">À propos</a></li>
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Blog</a></li>
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Carrières</a></li>
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Contact</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-neutral-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                            <p className="text-neutral-400 text-sm">
                                &copy; {new Date().getFullYear()} DOC HUB. Tous droits réservés.
                            </p>
                            <div className="flex space-x-6 mt-4 md:mt-0">
                                <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
                                    Confidentialité
                                </a>
                                <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
                                    Conditions d'utilisation
                                </a>
                                <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
                                    Mentions légales
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}