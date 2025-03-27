import React from 'react';
import { FileType2, StickyNote } from 'lucide-react';
import clsx from 'clsx';
import { FormData } from '../../types';

interface MainSectionProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    formErrors: Partial<Record<keyof FormData, string>>;
    setFormErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof FormData, string>>>>;
}

export function MainSection({ formData, setFormData, formErrors, setFormErrors }: MainSectionProps) {
    return (
        <div className="md:col-span-2 space-y-6">
            <div className="space-y-1.5">
                <label htmlFor="name" className="flex items-center text-sm font-medium text-slate-700">
                    <FileType2 className="w-4 h-4 mr-1.5 text-slate-500" />
                    Nom du document <span className="text-primary-500 ml-0.5">*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => {
                        setFormData((prev) => ({ ...prev, name: e.target.value }));
                        if (e.target.value.trim()) {
                            setFormErrors(prev => ({ ...prev, name: undefined }));
                        }
                    }}
                    placeholder="Entrez le nom du document"
                    className={clsx(
                        "w-full px-3.5 py-2.5 bg-white rounded-lg border shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all",
                        formErrors.name ? "border-red-300" : "border-slate-300"
                    )}
                />
                {formErrors.name && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                )}
            </div>

            <div className="space-y-1.5">
                <label htmlFor="description" className="flex items-center text-sm font-medium text-slate-700">
                    <StickyNote className="w-4 h-4 mr-1.5 text-slate-500" />
                    Description
                </label>
                <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    placeholder="Décrivez brièvement cette version du document"
                    className="w-full px-3.5 py-3 bg-white rounded-lg border border-slate-300 shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all resize-none"
                />
            </div>
        </div>
    );
}