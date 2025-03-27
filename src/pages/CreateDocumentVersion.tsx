import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {DocumentStatus} from "../types";
import {useCreateDocument} from "../hooks/useCreateDocument.ts";
import  {FormData} from  "../types";
import {BreadcrumbVersion} from "../components/createdocumentversion/BreadcrumbVersion.tsx";
import {FormHeader} from "../components/createdocumentversion/FormHeader.tsx";
import {MainSection} from "../components/createdocumentversion/MainSection.tsx";
import {SideSection} from "../components/createdocumentversion/SideSection.tsx";
import {TagsSection} from "../components/createdocumentversion/TagsSection.tsx";
import {FormActions} from "../components/createdocumentversion/FormActions.tsx";
import {MetadataSection} from "../components/createdocumentversion/MetadataSection.tsx";
export function CreateDocumentVersion() {
    const navigate = useNavigate();
    const { documentId } = useParams();
    const [searchParams] = useSearchParams();
    const folderIdParam = searchParams.get('folderId');
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
    const [currentTag, setCurrentTag] = useState('');
    const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
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

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            try {
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
    return (
        <div className="min-h-screen bg-slate-50">
            <div className="container mx-auto max-w-5xl px-4 py-6 sm:py-10">
                <BreadcrumbVersion />
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <FormHeader effectiveFolderId={effectiveFolderId} />
                    <form onSubmit={handleSubmit} className="p-6 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                            <MainSection
                                formData={formData}
                                setFormData={setFormData}
                                formErrors={formErrors}
                                setFormErrors={setFormErrors}
                            />
                            <SideSection
                                formData={formData}
                                setFormData={setFormData}
                                formErrors={formErrors}
                                setFormErrors={setFormErrors}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                            <TagsSection
                                formData={formData}
                                setFormData={setFormData}
                                currentTag={currentTag}
                                setCurrentTag={setCurrentTag}
                            />
                            <MetadataSection
                                formData={formData}
                                setFormData={setFormData}
                            />
                        </div>

                        <FormActions
                            effectiveFolderId={effectiveFolderId}
                            isSubmitting={isSubmitting}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}