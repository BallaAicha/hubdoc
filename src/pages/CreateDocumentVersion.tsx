import React, {useState, useRef, useCallback, useEffect} from 'react';
import {useNavigate, useParams, useSearchParams} from 'react-router-dom';
import {
    ArrowLeft,
    PlusCircle,
    Trash2,
    UploadCloud,
    FileText,
    Check,
    X,
    Tag,
    BadgeInfo,
    FileType2,
    StickyNote,
    BarChart4,
    Save,
    Info
} from 'lucide-react';
import { DocumentStatus } from '../types/documents';
import clsx from 'clsx';
import {useCreateDocument} from "../hooks/useCreateDocument.ts";

// Interface mise à jour pour correspondre à votre modèle de document
interface FormData {
    name: string;
    description: string;
    version: string;
    fileType: string;
    file: File | null;
    status: DocumentStatus;
    folderId: number | null;
    parentDocumentId: number | null;
    tags: string[];
    metadata: Record<string, string>;
}

export function CreateDocumentVersion() {
    const navigate = useNavigate();
    const { documentId } = useParams();
    const [searchParams] = useSearchParams();
    const folderIdParam = searchParams.get('folderId');

    // Récupérer le folderId depuis les paramètres d'URL (nouvelle méthode selon la correction)
    const effectiveFolderId = folderIdParam ? parseInt(folderIdParam) : null;
    const effectiveParentDocId = documentId ? parseInt(documentId) : null;

    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        version: '1.0',
        fileType: 'pdf',
        file: null,
        status: DocumentStatus.DRAFT,
        folderId: effectiveFolderId,
        parentDocumentId: effectiveParentDocId,
        tags: [],
        metadata: {},
    });
    const [isDragging, setIsDragging] = useState(false);
    const [currentTag, setCurrentTag] = useState('');
    const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const tagInputRef = useRef<HTMLInputElement>(null);
// Animation d'entrée
    useEffect(() => {
        const timer = setTimeout(() => {
            const formContainer = document.querySelector('.form-container');
            if (formContainer) {
                formContainer.classList.add('form-appear');
                formContainer.classList.remove('opacity-0', 'translate-y-4');
            }
        }, 100);

        return () => clearTimeout(timer);
    }, []);
    const createDocument = useCreateDocument(() => {
        document.getElementById('success-message')?.classList.remove('hidden');
        setTimeout(() => {
            if (effectiveFolderId) {
                navigate(`/documents/${effectiveFolderId}`);
            } else {
                navigate('/documents');
            }
        }, 1200);
    });

    const validateForm = (): boolean => {
        const errors: Partial<Record<keyof FormData, string>> = {};

        if (!formData.name.trim()) {
            errors.name = 'Le nom du document est requis';
        }

        if (!formData.version.trim()) {
            errors.version = 'Le numéro de version est requis';
        } else if (!/^\d+(\.\d+)*$/.test(formData.version)) {
            errors.version = 'Format de version invalide (ex: 1.0, 2.3.1)';
        }

        // if (!formData.file) {
        //     errors.file = 'Un fichier est requis';
        // }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            try {
                // Création d'un objet avec les attributs nécessaires pour correspondre au modèle
                const documentData = {
                    name: formData.name,
                    description: formData.description,
                    version: formData.version,
                    fileType: formData.fileType,
                    fileSize: formData.file ? formData.file.size : 0,
                    filePath: formData.file ? `/documents/${formData.file.name}` : '',
                    status: formData.status,
                    folderId: formData.folderId,
                    parentDocumentId: formData.parentDocumentId,
                    tags: formData.tags,
                    metadata: formData.metadata
                };

                await createDocument.mutateAsync(documentData);
            } catch (error) {
                console.error('Error creating document:', error);
                setIsSubmitting(false);
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData((prev) => ({
                ...prev,
                file,
                fileType: file.type.split('/')[1] || 'pdf'  // Déduire le type de fichier
            }));
            setFormErrors(prev => ({ ...prev, file: undefined }));
        }
    };

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setFormData((prev) => ({
                ...prev,
                file,
                fileType: file.type.split('/')[1] || 'pdf'  // Déduire le type de fichier
            }));
            setFormErrors(prev => ({ ...prev, file: undefined }));
        }
    }, []);

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const addTag = () => {
        if (currentTag.trim()) {
            // Éviter les doublons
            if (!formData.tags.includes(currentTag.trim())) {
                setFormData((prev) => ({ ...prev, tags: [...prev.tags, currentTag.trim()] }));
            }
            setCurrentTag('');
            tagInputRef.current?.focus();
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

    // Formatage de la taille du fichier
    const formatFileSize = (sizeInBytes: number): string => {
        if (sizeInBytes < 1024) {
            return `${sizeInBytes} B`;
        } else if (sizeInBytes < 1024 * 1024) {
            return `${(sizeInBytes / 1024).toFixed(2)} KB`;
        } else {
            return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="container mx-auto max-w-5xl px-4 py-6 sm:py-10">
                {/* Breadcrumb */}
                <nav className="mb-4">
                    <ol className="flex items-center text-sm text-slate-500">
                        <li>
                            <button
                                onClick={() => navigate('/documents')}
                                className="hover:text-primary-600 transition-colors"
                            >
                                Documents
                            </button>
                        </li>
                        <li className="mx-2">
                            <span>/</span>
                        </li>
                        <li className="font-medium text-slate-800">Nouvelle version</li>
                    </ol>
                </nav>

                {/* Card Container */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-white border-b border-slate-200 px-6 py-5">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate(effectiveFolderId ? `/documents/${effectiveFolderId}` : '/documents')}
                                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                                aria-label="Retour"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="text-xl font-semibold text-slate-900">Nouvelle version de document</h1>
                                <p className="text-sm text-slate-500 mt-1">
                                    Créez une nouvelle version en complétant les informations ci-dessous
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-8">
                        {/* Section Principale */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                            <div className="md:col-span-2 space-y-6">
                                {/* Document Name */}
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

                                {/* Description */}
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

                            <div className="space-y-6">
                                {/* Version Number */}
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

                                {/* Status Select */}
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

                                {/* Info card */}
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
                        </div>

                        {/* Advanced Options */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                            {/* Tags */}
                            <div className="space-y-1.5">
                                <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                                    <Tag className="w-4 h-4 mr-1.5 text-slate-500" />
                                    Tags
                                </label>
                                <div className={clsx(
                                    "min-h-20 rounded-lg border border-slate-300 p-3 bg-white",
                                    formData.tags.length > 0 && "pb-2"
                                )}>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {formData.tags.map((tag, index) => (
                                            <div
                                                key={index}
                                                className="inline-flex items-center bg-slate-100 text-slate-700 text-sm rounded-full py-1 pl-3 pr-1.5 border border-slate-200"
                                            >
                                                <span>{tag}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeTag(index)}
                                                    className="ml-1 p-0.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
                                                >
                                                    <X className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex mt-3">
                                        <input
                                            ref={tagInputRef}
                                            type="text"
                                            className="flex-1 px-3 py-1.5 bg-white rounded-l-md border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-all"
                                            placeholder="Ajouter un tag"
                                            value={currentTag}
                                            onChange={(e) => setCurrentTag(e.target.value)}
                                            onKeyDown={handleTagKeyDown}
                                        />
                                        <button
                                            type="button"
                                            onClick={addTag}
                                            className="px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-r-md border border-l-0 border-slate-300 transition-colors flex items-center"
                                            disabled={!currentTag.trim()}
                                        >
                                            <PlusCircle className="w-4 h-4" />
                                        </button>
                                    </div>
                                    {formData.tags.length === 0 && (
                                        <p className="text-xs text-slate-500 mt-2">
                                            Ajoutez des tags pour faciliter la recherche et le classement
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Metadata */}
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
                        </div>

                        {/* Form Actions */}
                        <div className="pt-6 border-t border-slate-200 mt-8 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-4 space-y-4 space-y-reverse sm:space-y-0">
                            <button
                                type="button"
                                onClick={() => navigate(effectiveFolderId ? `/documents/${effectiveFolderId}` : '/documents')}
                                className="px-5 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={clsx(
                                    "px-5 py-2.5 bg-primary-600 text-black font-medium rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2",
                                    isSubmitting ? "opacity-80 cursor-not-allowed" : "hover:bg-primary-700"
                                )}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-slate-700 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Enregistrement...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Enregistrer
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}