import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, PlusCircle, Trash2, UploadCloud, FileText, Check, X } from 'lucide-react';
import { DocumentStatus } from '../types/documents';
import clsx from 'clsx';

interface FormData {
    name: string;
    description: string;
    versionNumber: string;
    file: File | null;
    status: DocumentStatus;
    tags: string[];
    metadata: Record<string, string>;
}

export function CreateDocumentVersion() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        versionNumber: '1.0',
        file: null,
        status: DocumentStatus.DRAFT,
        tags: [],
        metadata: {},
    });
    const [isDragging, setIsDragging] = useState(false);
    const [currentTag, setCurrentTag] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        navigate('/documents');
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFormData((prev) => ({ ...prev, file: e.dataTransfer.files[0] }));
        }
    };

    const addTag = () => {
        if (currentTag.trim()) {
            setFormData((prev) => ({ ...prev, tags: [...prev.tags, currentTag.trim()] }));
            setCurrentTag('');
        }
    };

    const handleTagKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

    const removeTag = (index: number) => {
        const newTags = formData.tags.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, tags: newTags }));
    };

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
        <div className="min-h-screen bg-[#f9fafb]">
            <div className="container mx-auto max-w-4xl px-4 py-8 sm:py-12">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-200">
                    {/* Header Section */}
                    <div className="bg-white border-b border-neutral-200 px-6 py-6">
                        <div className="flex items-center mb-1">
                            <button
                                onClick={() => navigate('/documents')}
                                className="mr-4 p-2 rounded-full hover:bg-neutral-100 text-neutral-500 transition-colors"
                                aria-label="Retour"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <h1 className="text-xl font-semibold text-neutral-800">Nouvelle version de document</h1>
                        </div>
                        <p className="text-sm text-neutral-500 ml-11">
                            Créez une nouvelle version en complétant les informations ci-dessous
                        </p>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Document Name */}
                            <div className="space-y-1.5">
                                <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
                                    Nom du document <span className="text-primary-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                                    placeholder="Entrez le nom du document"
                                    className="w-full px-3.5 py-2.5 bg-white rounded-lg border border-neutral-300 shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all"
                                    required
                                />
                            </div>

                            {/* Version Number */}
                            <div className="space-y-1.5">
                                <label htmlFor="versionNumber" className="block text-sm font-medium text-neutral-700">
                                    Numéro de version <span className="text-primary-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="versionNumber"
                                    value={formData.versionNumber}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, versionNumber: e.target.value }))}
                                    placeholder="Ex: 1.0"
                                    className="w-full px-3.5 py-2.5 bg-white rounded-lg border border-neutral-300 shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Status Select */}
                        <div className="space-y-1.5">
                            <label htmlFor="status" className="block text-sm font-medium text-neutral-700">
                                Statut
                            </label>
                            <div className="relative">
                                <select
                                    id="status"
                                    value={formData.status}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as DocumentStatus }))}
                                    className="w-full px-3.5 py-2.5 bg-white rounded-lg border border-neutral-300 shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none sm:text-sm transition-all"
                                >
                                    {Object.values(DocumentStatus).map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-neutral-500">
                                    <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L6 5L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-1.5">
                            <label htmlFor="description" className="block text-sm font-medium text-neutral-700">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                                rows={3}
                                placeholder="Décrivez brièvement cette version du document"
                                className="w-full px-3.5 py-2.5 bg-white rounded-lg border border-neutral-300 shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all resize-none"
                            />
                        </div>

                        {/* File Upload */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-neutral-700">
                                Document <span className="text-primary-500">*</span>
                            </label>
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={clsx(
                                    "border-2 border-dashed rounded-lg transition-all duration-200",
                                    isDragging ? "border-primary-500 bg-primary-50" : "border-neutral-300 bg-neutral-50",
                                    formData.file ? "border-success bg-success/5" : "",
                                    "p-6"
                                )}
                            >
                                {!formData.file ? (
                                    <div className="flex flex-col items-center justify-center py-4">
                                        <div className="mb-3 bg-white p-3 rounded-full shadow-sm border border-neutral-200">
                                            <UploadCloud className="w-6 h-6 text-neutral-400" />
                                        </div>
                                        <p className="text-sm text-neutral-600 text-center mb-2">
                                            <span className="font-medium">Cliquez pour télécharger</span> ou glissez-déposez
                                        </p>
                                        <p className="text-xs text-neutral-500 text-center mb-3">
                                            PDF, DOC, DOCX (max. 10 MB)
                                        </p>
                                        <label
                                            htmlFor="file-upload"
                                            className="inline-flex items-center gap-2 bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-800 px-4 py-2 rounded-lg cursor-pointer transition-colors shadow-sm"
                                        >
                                            <FileText className="w-4 h-4" />
                                            Sélectionner un fichier
                                        </label>
                                        <input
                                            id="file-upload"
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileChange}
                                            accept="application/pdf, application/msword, .docx"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <div className="bg-success/10 p-2 rounded-full">
                                                <Check className="w-5 h-5 text-success" />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-neutral-800 font-medium truncate max-w-xs sm:max-w-md">
                                                    {formData.file.name}
                                                </p>
                                                <p className="text-xs text-neutral-500">
                                                    {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, file: null }))}
                                            className="p-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-full text-neutral-500 hover:text-primary-500 transition-colors"
                                            aria-label="Supprimer le fichier"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Tags
                            </label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {formData.tags.map((tag, index) => (
                                    <div key={index} className="inline-flex items-center bg-neutral-100 text-neutral-800 text-sm rounded-full py-1 pl-3 pr-1">
                                        <span>{tag}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeTag(index)}
                                            className="ml-1 p-1 rounded-full hover:bg-neutral-200 text-neutral-500 transition-colors"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex">
                                <input
                                    type="text"
                                    className="flex-1 px-3.5 py-2.5 bg-white rounded-l-lg border border-neutral-300 shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all"
                                    placeholder="Ajouter un tag"
                                    value={currentTag}
                                    onChange={(e) => setCurrentTag(e.target.value)}
                                    onKeyDown={handleTagKeyDown}
                                />
                                <button
                                    type="button"
                                    onClick={addTag}
                                    className="px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-r-lg border border-l-0 border-neutral-300 transition-colors flex items-center"
                                >
                                    <PlusCircle className="w-5 h-5" />
                                </button>
                            </div>
                            <p className="text-xs text-neutral-500 mt-1">
                                Appuyez sur Entrée après chaque tag ou utilisez le bouton +
                            </p>
                        </div>

                        {/* Metadata */}
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                                <label className="block text-sm font-medium text-neutral-700">
                                    Métadonnées
                                </label>
                                <button
                                    type="button"
                                    onClick={addMetadataField}
                                    className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                                >
                                    <PlusCircle className="w-4 h-4" />
                                    Ajouter une propriété
                                </button>
                            </div>
                            <div className="rounded-lg border border-neutral-300 overflow-hidden bg-white">
                                {Object.entries(formData.metadata).length === 0 ? (
                                    <div className="p-4 text-sm text-neutral-500 text-center border-dashed border-2 border-neutral-200 m-2 rounded-lg">
                                        Aucune métadonnée. Cliquez sur "Ajouter une propriété" pour en créer.
                                    </div>
                                ) : (
                                    <div className="divide-y divide-neutral-200">
                                        {Object.entries(formData.metadata).map(([key, value], index) => (
                                            <div key={key} className="grid grid-cols-12 gap-2 p-2">
                                                <input
                                                    type="text"
                                                    className="col-span-5 px-3 py-2 border border-neutral-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                                    placeholder="Clé"
                                                    value={key}
                                                    onChange={(e) => updateMetadataKey(key, e.target.value)}
                                                />
                                                <input
                                                    type="text"
                                                    className="col-span-6 px-3 py-2 border border-neutral-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                                    placeholder="Valeur"
                                                    value={value}
                                                    onChange={(e) => handleMetadataChange(key, e.target.value)}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeMetadataField(key)}
                                                    className="col-span-1 flex items-center justify-center text-neutral-400 hover:text-primary-500 transition-colors"
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

                        {/* Form Actions */}
                        <div className="pt-4 border-t border-neutral-200 mt-8 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-4 space-y-4 space-y-reverse sm:space-y-0">
                            <button
                                type="button"
                                onClick={() => navigate('/documents')}
                                className="px-4 py-2.5 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors shadow-sm flex items-center justify-center gap-2"
                                disabled={!formData.name || !formData.file}
                            >
                                <Check className="w-4 h-4" />
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}