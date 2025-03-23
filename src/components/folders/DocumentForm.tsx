import React from 'react';
import { FileText, AlertCircle, Info, Plus } from 'lucide-react';
import clsx from 'clsx';

interface DocumentFormProps {
    formData: {
        name: string;
        description: string;
    };
    errors: Record<string, string>;
    isSubmitting: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export function DocumentForm({
                                 formData,
                                 errors,
                                 isSubmitting,
                                 onChange,
                                 onSubmit
                             }: DocumentFormProps) {
    return (
        <form onSubmit={onSubmit} className="p-6 sm:p-8">
            <div className="space-y-8">
                {/* Nom du document */}
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
                            onChange={onChange}
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
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                    <label htmlFor="description" className="block text-sm font-medium text-slate-700">
                        Description <span className="text-slate-500 text-xs font-normal">(facultatif)</span>
                    </label>
                    <div className="mt-1 relative">
            <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={onChange}
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

                {/* Actions */}
                <div className="mt-10 pt-6 border-t border-slate-200">
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={clsx(
                                "inline-flex items-center px-6 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white",
                                "focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200",
                                isSubmitting
                                    ? "bg-slate-400 cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus:ring-indigo-500"
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
                                    <Plus className="h-4 w-4 mr-2" />
                                    Créer le document
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}