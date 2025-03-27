import React from 'react';
import { BarChart4, BadgeInfo, Info } from 'lucide-react';
import clsx from 'clsx';
import { FormData, DocumentStatus } from '../../types';

interface SideSectionProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    formErrors: Partial<Record<keyof FormData, string>>;
    setFormErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof FormData, string>>>>;
}

export function SideSection({ formData, setFormData, formErrors, setFormErrors }: SideSectionProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-1.5">
                <label htmlFor="version" className="flex items-center text-sm font-medium text-slate-700">
                    <BarChart4 className="w-4 h-4 mr-1.5 text-slate-500" />
                    Numéro de version <span className="text-primary-500 ml-0.5">*</span>
                </label>
                <input
                    type="text"
                    id="version"
                    value={formData.version}
                    onChange={(e) => {
                        setFormData((prev) => ({ ...prev, version: e.target.value }));
                        if (/^\d+(\.\d+)*$/.test(e.target.value)) {
                            setFormErrors(prev => ({ ...prev, version: undefined }));
                        }
                    }}
                    placeholder="Ex: 1.0"
                    className={clsx(
                        "w-full px-3.5 py-2.5 bg-white rounded-lg border shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all",
                        formErrors.version ? "border-red-300" : "border-slate-300"
                    )}
                />
                {formErrors.version && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.version}</p>
                )}
            </div>

            <div className="space-y-1.5">
                <label htmlFor="status" className="flex items-center text-sm font-medium text-slate-700">
                    <BadgeInfo className="w-4 h-4 mr-1.5 text-slate-500" />
                    Statut
                </label>
                <div className="relative">
                    <select
                        id="status"
                        value={formData.status}
                        onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as DocumentStatus }))}
                        className="w-full px-3.5 py-2.5 bg-white rounded-lg border border-slate-300 shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none sm:text-sm transition-all"
                    >
                        {Object.values(DocumentStatus).map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
                        <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L6 5L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3.5 mt-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <Info className="h-5 w-5 text-blue-500" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">Informations</h3>
                        <div className="mt-2 text-sm text-blue-700">
                            <ul className="list-disc pl-4 space-y-1">
                                <li>Les champs avec * sont obligatoires</li>
                                <li>Les tags facilitent la recherche</li>
                                <li>Les métadonnées aident à organiser vos documents</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}