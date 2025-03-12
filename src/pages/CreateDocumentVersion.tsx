import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, ArrowLeft } from 'lucide-react';
import { DocumentStatus } from '../types/documents.ts';

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
    const [activeTab, setActiveTab] = useState<'main' | 'tags' | 'metadata'>('main');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        navigate('/documents');
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({
                ...prev,
                file: e.target.files![0],
            }));
        }
    };

    const handleTagChange = (index: number, value: string) => {
        const newTags = [...formData.tags];
        newTags[index] = value;
        setFormData(prev => ({ ...prev, tags: newTags }));
    };

    const handleMetadataChange = (key: string, value: string) => {
        const newMetadata = { ...formData.metadata, [key]: value };
        setFormData(prev => ({ ...prev, metadata: newMetadata }));
    };

    const addTag = () => {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, ''] }));
    };

    const removeTag = (index: number) => {
        const newTags = formData.tags.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, tags: newTags }));
    };

    const addMetadataField = () => {
        const newKey = `key${Object.keys(formData.metadata).length + 1}`;
        setFormData(prev => ({
            ...prev,
            metadata: { ...prev.metadata, [newKey]: '' },
        }));
    };

    const removeMetadataField = (key: string) => {
        const newMetadata = { ...formData.metadata };
        delete newMetadata[key];
        setFormData(prev => ({ ...prev, metadata: newMetadata }));
    };

    return (
        <div className="container mx-auto py-6 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <button
                        onClick={() => navigate('/documents')}
                        className="inline-flex items-center text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Back to Documents
                    </button>
                </div>

                <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
                    <h1 className="text-2xl font-bold mb-6">Create New Document Version</h1>

                    <div className="mb-4 border-b border-gray-200">
                        <nav className="-mb-px flex space-x-4">
                            <button
                                className={`py-2 px-4 text-sm font-medium ${
                                    activeTab === 'main'
                                        ? 'border-orange-500 text-orange-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                                onClick={() => setActiveTab('main')}
                            >
                                Main Info
                            </button>
                            <button
                                className={`py-2 px-4 text-sm font-medium ${
                                    activeTab === 'tags'
                                        ? 'border-orange-500 text-orange-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                                onClick={() => setActiveTab('tags')}
                            >
                                Tags
                            </button>
                            <button
                                className={`py-2 px-4 text-sm font-medium ${
                                    activeTab === 'metadata'
                                        ? 'border-orange-500 text-orange-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                                onClick={() => setActiveTab('metadata')}
                            >
                                Metadata
                            </button>
                        </nav>
                    </div>

                    {activeTab === 'main' && (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Main Info Form */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Document Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="versionNumber" className="block text-sm font-medium text-gray-700">
                                        Version Number
                                    </label>
                                    <input
                                        type="text"
                                        id="versionNumber"
                                        value={formData.versionNumber}
                                        onChange={e =>
                                            setFormData(prev => ({ ...prev, versionNumber: e.target.value }))
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        value={formData.status}
                                        onChange={e =>
                                            setFormData(prev => ({
                                                ...prev,
                                                status: e.target.value as DocumentStatus,
                                            }))
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                                    >
                                        {Object.values(DocumentStatus).map(status => (
                                            <option key={status} value={status}>
                                                {status.charAt(0) + status.slice(1).toLowerCase()}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Document File</label>
                                <div
                                    className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
                                        isDragging ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
                                    } border-dashed rounded-md transition-colors duration-200`}
                                    onDragOver={e => {
                                        e.preventDefault();
                                        setIsDragging(true);
                                    }}
                                    onDragLeave={e => {
                                        e.preventDefault();
                                        setIsDragging(false);
                                    }}
                                    onDrop={e => {
                                        e.preventDefault();
                                        setIsDragging(false);

                                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                            setFormData(prev => ({
                                                ...prev,
                                                file: e.dataTransfer.files[0],
                                            }));
                                        }
                                    }}
                                >
                                    <div className="space-y-1 text-center">
                                        <Upload
                                            className={`mx-auto h-12 w-12 ${
                                                isDragging ? 'text-orange-500' : 'text-gray-400'
                                            }`}
                                        />
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="file-upload"
                                                    type="file"
                                                    className="sr-only"
                                                    onChange={handleFileChange}
                                                    accept=".pdf,.doc,.docx"
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PDF, DOC, up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}

                    {activeTab === 'tags' && (
                        <div>
                            <h2 className="text-xl font-bold mb-4">Manage Tags</h2>
                            {formData.tags.map((tag, index) => (
                                <div key={index} className="flex items-center space-x-2 mb-3">
                                    <input
                                        type="text"
                                        value={tag}
                                        onChange={e => handleTagChange(index, e.target.value)}
                                        placeholder="Tag"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                    />
                                    <button
                                        onClick={() => removeTag(index)}
                                        className="text-gray-500 hover:text-red-500"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={addTag}
                                className="text-orange-600 hover:text-orange-500 font-bold"
                            >
                                + Add Tag
                            </button>
                        </div>
                    )}

                    {activeTab === 'metadata' && (
                        <div>
                            <h2 className="text-xl font-bold mb-4">Manage Metadata</h2>
                            {Object.entries(formData.metadata).map(([key, value]) => (
                                <div key={key} className="flex items-center space-x-4 mb-3">
                                    <input
                                        type="text"
                                        value={key}
                                        onChange={e =>
                                            handleMetadataChange(e.target.value, formData.metadata[key] || '')
                                        }
                                        placeholder="Key"
                                        className="block w-1/2 rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                    />
                                    <input
                                        type="text"
                                        value={value}
                                        onChange={e => handleMetadataChange(key, e.target.value)}
                                        placeholder="Value"
                                        className="block w-1/2 rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                    />
                                    <button
                                        onClick={() => removeMetadataField(key)}
                                        className="text-gray-500 hover:text-red-500"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={addMetadataField}
                                className="text-orange-600 hover:text-orange-500 font-bold"
                            >
                                + Add Metadata Field
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}