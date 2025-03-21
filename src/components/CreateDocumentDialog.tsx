import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, FileText, Check, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

interface DocumentFormData {
    name: string;
    description: string;
    status: "DRAFT" | "PUBLISHED";
}

interface FormErrors {
    name?: string;
}

interface CreateDocumentDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateDocument: (document: DocumentFormData) => void;
}

export function CreateDocumentDialog({ isOpen, onClose, onCreateDocument }: CreateDocumentDialogProps) {
    const initialFormState: DocumentFormData = {
        name: '',
        description: '',
        status: "DRAFT"
    };

    const [formData, setFormData] = useState<DocumentFormData>(initialFormState);
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    // Reset form when dialog opens
    useEffect(() => {
        if (isOpen) {
            setFormData(initialFormState);
            setErrors({});
            setTouched({});
            setLoading(false);
        }
    }, [initialFormState, isOpen]);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Le nom du document est requis";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Mark field as touched
        if (!touched[name]) {
            setTouched(prev => ({ ...prev, [name]: true }));
        }

        // Clear error if value is valid
        if (name === 'name' && value.trim() && errors.name) {
            setErrors(prev => ({ ...prev, name: undefined }));
        }
    };

    const handleStatusChange = (newStatus: "DRAFT" | "PUBLISHED") => {
        setFormData(prev => ({
            ...prev,
            status: newStatus
        }));
    };

    const handleBlur = (fieldName: string) => {
        setTouched(prev => ({ ...prev, [fieldName]: true }));

        if (fieldName === 'name' && !formData.name.trim()) {
            setErrors(prev => ({ ...prev, name: "Le nom du document est requis" }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Simuler un petit délai pour donner une impression de traitement
            await new Promise(resolve => setTimeout(resolve, 500));

            onCreateDocument(formData);
            onClose();
        } catch (error) {
            console.error("Error creating document:", error);
        } finally {
            setLoading(false);
        }
    };

    const isSubmitDisabled = loading || !formData.name.trim();

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={loading ? () => {} : onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                    <Dialog.Title as="div" className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-red-100 text-red-600 p-2 rounded-lg">
                                                <FileText className="h-5 w-5" />
                                            </div>
                                            <h3 className="text-lg font-medium leading-6 text-gray-900">Créer un nouveau document</h3>
                                        </div>
                                        <button
                                            type="button"
                                            className="text-gray-400 hover:text-gray-500 rounded-full p-1 hover:bg-gray-100"
                                            onClick={onClose}
                                            disabled={loading}
                                            aria-label="Fermer"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </Dialog.Title>
                                </div>

                                <form onSubmit={handleSubmit} className="p-6">
                                    <div className="space-y-5">
                                        <div>
                                            <label htmlFor="name" className="flex justify-between text-sm font-medium mb-1">
                                                <span className="text-gray-700">Nom <span className="text-red-500">*</span></span>
                                                {touched.name && errors.name && (
                                                    <span className="text-sm text-red-500 flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                                                        {errors.name}
                          </span>
                                                )}
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                onBlur={() => handleBlur('name')}
                                                className={clsx(
                                                    "block w-full rounded-md shadow-sm sm:text-sm",
                                                    touched.name && errors.name
                                                        ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                                                        : "border-gray-300 focus:border-red-500 focus:ring-red-500"
                                                )}
                                                placeholder="Entrez le nom du document"
                                                aria-invalid={touched.name && !!errors.name}
                                                aria-describedby={touched.name && errors.name ? "name-error" : undefined}
                                                disabled={loading}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                                Description
                                            </label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                rows={3}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                                placeholder="Décrivez votre document (optionnel)"
                                                disabled={loading}
                                            />
                                        </div>

                                        <fieldset className="space-y-2">
                                            <legend className="block text-sm font-medium text-gray-700">Statut</legend>
                                            <div className="flex space-x-4">
                                                <label
                                                    className={clsx(
                                                        "relative flex items-center px-4 py-2 rounded-md border cursor-pointer transition-colors",
                                                        formData.status === "DRAFT"
                                                            ? "bg-blue-50 border-blue-200 text-blue-700"
                                                            : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                                                    )}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="status"
                                                        value="DRAFT"
                                                        className="sr-only"
                                                        checked={formData.status === "DRAFT"}
                                                        onChange={() => handleStatusChange("DRAFT")}
                                                        disabled={loading}
                                                    />
                                                    <div className={clsx(
                                                        "w-4 h-4 rounded-full mr-2",
                                                        formData.status === "DRAFT" ? "bg-blue-500" : "bg-gray-300"
                                                    )}/>
                                                    <span>Brouillon</span>
                                                </label>

                                                <label
                                                    className={clsx(
                                                        "relative flex items-center px-4 py-2 rounded-md border cursor-pointer transition-colors",
                                                        formData.status === "PUBLISHED"
                                                            ? "bg-green-50 border-green-200 text-green-700"
                                                            : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                                                    )}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="status"
                                                        value="PUBLISHED"
                                                        className="sr-only"
                                                        checked={formData.status === "PUBLISHED"}
                                                        onChange={() => handleStatusChange("PUBLISHED")}
                                                        disabled={loading}
                                                    />
                                                    <div className={clsx(
                                                        "w-4 h-4 rounded-full mr-2",
                                                        formData.status === "PUBLISHED" ? "bg-green-500" : "bg-gray-300"
                                                    )}/>
                                                    <span>Publié</span>
                                                </label>
                                            </div>
                                        </fieldset>
                                    </div>

                                    <div className="mt-6 flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            disabled={loading}
                                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                                        >
                                            Annuler
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitDisabled}
                                            className={clsx(
                                                "inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors",
                                                isSubmitDisabled
                                                    ? "bg-red-300 cursor-not-allowed"
                                                    : "bg-red-600 hover:bg-red-700"
                                            )}
                                            aria-busy={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Création...
                                                </>
                                            ) : (
                                                <>
                                                    <Check className="h-4 w-4 mr-2" />
                                                    Créer
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}