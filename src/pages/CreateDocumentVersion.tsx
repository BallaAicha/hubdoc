import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, Trash2, ArrowLeft, PlusCircle } from 'lucide-react';
import { DocumentStatus } from '../types/documents';

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

    const addTag = () => {
        setFormData((prev) => ({ ...prev, tags: [...prev.tags, ''] }));
    };

    const removeTag = (index: number) => {
        const newTags = formData.tags.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, tags: newTags }));
    };

    const addMetadataField = () => {
        const newKey = `key${Object.keys(formData.metadata).length + 1}`;
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e9041e] via-white to-gray-100 py-10">
            <div className="container mx-auto max-w-4xl px-6 bg-white shadow-lg rounded-lg p-8">
                {/* Header Section */}
                <header className="mb-8">
                    <button
                        onClick={() => navigate('/documents')}
                        className="flex items-center text-sm text-gray-500 hover:text-gray-800 transition"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Retour aux documents
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800 mt-4">
                        Créer une nouvelle version de document
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Veuillez remplir les champs pour créer une nouvelle version de votre document.
                    </p>
                </header>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Document Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nom du document <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                            placeholder="Entrez le nom"
                            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-[#e9041e] focus:border-[#e9041e] sm:text-sm"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description (facultatif)
                        </label>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                            rows={4}
                            placeholder="Ajoutez une description"
                            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-[#e9041e] focus:border-[#e9041e] sm:text-sm"
                        />
                    </div>

                    {/* File Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Uploader un fichier</label>
                        <div className="mt-2 flex justify-between items-center gap-4 p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                            <div>
                                <UploadCloud className="w-12 h-12 text-gray-400 mx-auto" />
                                <p className="mt-4 text-sm text-gray-600 text-center">
                                    Glisser-déposer ou{' '}
                                    <label htmlFor="file-upload" className="text-[#e9041e] font-medium cursor-pointer">
                                        choisir un fichier
                                    </label>
                                </p>
                                <input
                                    id="file-upload"
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept="application/pdf, application/msword, .docx"
                                />
                            </div>
                            <div>
                                {formData.file ? (
                                    <p className="text-gray-600 font-medium">{formData.file.name}</p>
                                ) : (
                                    <p className="italic text-gray-400">Aucun fichier sélectionné</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tags</label>
                        <div className="mt-2 space-y-2">
                            {formData.tags.map((tag, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        className="flex-1 rounded-lg border-gray-300 focus:ring-[#e9041e] focus:border-[#e9041e] sm:text-sm"
                                        placeholder={`Tag ${index + 1}`}
                                        value={tag}
                                        onChange={(e) =>
                                            setFormData((prev) => {
                                                const newTags = [...prev.tags];
                                                newTags[index] = e.target.value;
                                                return { ...prev, tags: newTags };
                                            })
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeTag(index)}
                                        className="text-gray-400 hover:text-red-500"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addTag}
                                className="text-[#e9041e] font-medium flex items-center gap-2"
                            >
                                <PlusCircle className="w-5 h-5" />
                                Ajouter un tag
                            </button>
                        </div>
                    </div>

                    {/* Metadata */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Métadonnées (options clé-valeur)</label>
                        <div className="mt-2 space-y-2">
                            {Object.entries(formData.metadata).map(([key, value]) => (
                                <div key={key} className="flex gap-2">
                                    <input
                                        type="text"
                                        className="flex-1 rounded-lg border-gray-300 focus:ring-[#e9041e] focus:border-[#e9041e] sm:text-sm"
                                        placeholder="Clé"
                                        value={key}
                                        onChange={(e) => handleMetadataChange(e.target.value, value)}
                                    />
                                    <input
                                        type="text"
                                        className="flex-1 rounded-lg border-gray-300 focus:ring-[#e9041e] focus:border-[#e9041e] sm:text-sm"
                                        placeholder="Valeur"
                                        value={value}
                                        onChange={(e) => handleMetadataChange(key, e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeMetadataField(key)}
                                        className="text-gray-400 hover:text-red-500"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addMetadataField}
                                className="text-[#e9041e] font-medium flex items-center gap-2"
                            >
                                <PlusCircle className="w-5 h-5" />
                                Ajouter une métadonnée
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 rounded-lg bg-[#e9041e] text-white font-semibold hover:bg-red-600 transition"
                        >
                            Enregistrer la version
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}