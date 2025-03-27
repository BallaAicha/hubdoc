import React from 'react';
import { BadgeInfo, PlusCircle, Trash2 } from 'lucide-react';
import { FormData } from '../../types';

interface MetadataSectionProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export function MetadataSection({ formData, setFormData }: MetadataSectionProps) {
    const addMetadataField = () => {
        const newKey = `Propriété ${Object.keys(formData.metadata).length + 1}`;
        setFormData((prev) => ({ ...prev, metadata: { ...prev.metadata, [newKey]: '' } }));
    };

    const removeMetadataField = (key: string) => {
        const newMetadata = { ...formData.metadata };
        delete newMetadata[key];
        setFormData((prev) => ({ ...prev, metadata: newMetadata }));
    };

    const handleMetadataChange = (key: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            metadata: { ...prev.metadata, [key]: value },
        }));
    };

    const updateMetadataKey = (oldKey: string, newKey: string) => {
        if (oldKey === newKey) return;

        const newMetadata = { ...formData.metadata };
        const value = newMetadata[oldKey];
        delete newMetadata[oldKey];
        newMetadata[newKey] = value;

        setFormData((prev) => ({
            ...prev,
            metadata: newMetadata,
        }));
    };

    return (
        <div className="space-y-1.5">
            <div className="flex justify-between items-center mb-2">
                <label className="flex items-center text-sm font-medium text-slate-700">
                    <BadgeInfo className="w-4 h-4 mr-1.5 text-slate-500" />
                    Métadonnées
                </label>
                <button
                    type="button"
                    onClick={addMetadataField}
                    className="inline-flex items-center gap-1.5 text-xs font-medium py-1 px-2.5 rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors"
                >
                    <PlusCircle className="w-3 h-3" />
                    Ajouter une propriété
                </button>
            </div>
            <div className="rounded-lg border border-slate-300 overflow-hidden bg-white min-h-20">
                {Object.entries(formData.metadata).length === 0 ? (
                    <div className="p-4 text-sm text-slate-500 text-center">
                        Aucune métadonnée. Cliquez sur "Ajouter une propriété" pour en créer.
                    </div>
                ) : (
                    <div className="divide-y divide-slate-200">
                        {Object.entries(formData.metadata).map(([key, value]) => (
                            <div key={key} className="grid grid-cols-12 gap-2 p-2.5">
                                <input
                                    type="text"
                                    className="col-span-5 px-3 py-1.5 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Clé"
                                    value={key}
                                    onChange={(e) => updateMetadataKey(key, e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="col-span-6 px-3 py-1.5 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Valeur"
                                    value={value}
                                    onChange={(e) => handleMetadataChange(key, e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeMetadataField(key)}
                                    className="col-span-1 flex items-center justify-center text-slate-400 hover:text-primary-500 transition-colors"
                                    aria-label="Supprimer cette métadonnée"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}