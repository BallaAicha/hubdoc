// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
// import {DocumentStatus} from "../types";
// import {useCreateDocument} from "../hooks/useCreateDocument.ts";
// import  {FormData} from  "../types";
// import {BreadcrumbVersion} from "../components/createdocumentversion/BreadcrumbVersion.tsx";
// import {FormHeader} from "../components/createdocumentversion/FormHeader.tsx";
// import {MainSection} from "../components/createdocumentversion/MainSection.tsx";
// import {SideSection} from "../components/createdocumentversion/SideSection.tsx";
// import {TagsSection} from "../components/createdocumentversion/TagsSection.tsx";
// import {FormActions} from "../components/createdocumentversion/FormActions.tsx";
// import {MetadataSection} from "../components/createdocumentversion/MetadataSection.tsx";
// export function CreateDocumentVersion() {
//     const navigate = useNavigate();
//     const { documentId } = useParams();
//     const [searchParams] = useSearchParams();
//     const folderIdParam = searchParams.get('folderId');
//     const effectiveFolderId = folderIdParam ? parseInt(folderIdParam) : null;
//     const effectiveParentDocId = documentId ? parseInt(documentId) : null;
//     const [formData, setFormData] = useState<FormData>({
//         name: '',
//         description: '',
//         version: '1.0',
//         fileType: 'pdf',
//         file: null,
//         status: DocumentStatus.DRAFT,
//         folderId: effectiveFolderId,
//         parentDocumentId: effectiveParentDocId,
//         tags: [],
//         metadata: {},
//     });
//     const [currentTag, setCurrentTag] = useState('');
//     const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormData, string>>>({});
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             const formContainer = document.querySelector('.form-container');
//             if (formContainer) {
//                 formContainer.classList.add('form-appear');
//                 formContainer.classList.remove('opacity-0', 'translate-y-4');
//             }
//         }, 100);
//
//         return () => clearTimeout(timer);
//     }, []);
//     const createDocument = useCreateDocument(() => {
//         document.getElementById('success-message')?.classList.remove('hidden');
//         setTimeout(() => {
//             if (effectiveFolderId) {
//                 navigate(`/documents/${effectiveFolderId}`);
//             } else {
//                 navigate('/documents');
//             }
//         }, 1200);
//     });
//     const validateForm = (): boolean => {
//         const errors: Partial<Record<keyof FormData, string>> = {};
//
//         if (!formData.name.trim()) {
//             errors.name = 'Le nom du document est requis';
//         }
//
//         if (!formData.version.trim()) {
//             errors.version = 'Le numéro de version est requis';
//         } else if (!/^\d+(\.\d+)*$/.test(formData.version)) {
//             errors.version = 'Format de version invalide (ex: 1.0, 2.3.1)';
//         }
//
//         setFormErrors(errors);
//         return Object.keys(errors).length === 0;
//     };
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (validateForm()) {
//             setIsSubmitting(true);
//             try {
//                 const documentData = {
//                     name: formData.name,
//                     description: formData.description,
//                     version: formData.version,
//                     fileType: formData.fileType,
//                     fileSize: formData.file ? formData.file.size : 0,
//                     filePath: formData.file ? `/documents/${formData.file.name}` : '',
//                     status: formData.status,
//                     folderId: formData.folderId,
//                     parentDocumentId: formData.parentDocumentId,
//                     tags: formData.tags,
//                     metadata: formData.metadata
//                 };
//
//                 await createDocument.mutateAsync(documentData);
//             } catch (error) {
//                 console.error('Error creating document:', error);
//                 setIsSubmitting(false);
//             }
//         }
//     };
//     return (
//         <div className="min-h-screen bg-slate-50">
//             <div className="container mx-auto max-w-5xl px-4 py-6 sm:py-10">
//                 <BreadcrumbVersion />
//                 <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
//                     <FormHeader effectiveFolderId={effectiveFolderId} />
//                     <form onSubmit={handleSubmit} className="p-6 space-y-8">
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
//                             <MainSection
//                                 formData={formData}
//                                 setFormData={setFormData}
//                                 formErrors={formErrors}
//                                 setFormErrors={setFormErrors}
//                             />
//                             <SideSection
//                                 formData={formData}
//                                 setFormData={setFormData}
//                                 formErrors={formErrors}
//                                 setFormErrors={setFormErrors}
//                             />
//                         </div>
//
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
//                             <TagsSection
//                                 formData={formData}
//                                 setFormData={setFormData}
//                                 currentTag={currentTag}
//                                 setCurrentTag={setCurrentTag}
//                             />
//                             <MetadataSection
//                                 formData={formData}
//                                 setFormData={setFormData}
//                             />
//                         </div>
//
//                         <FormActions
//                             effectiveFolderId={effectiveFolderId}
//                             isSubmitting={isSubmitting}
//                         />
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { DocumentStatus } from "../types";
import { useCreateDocument } from "../hooks/useCreateDocument.ts";
import { FormData } from "../types";
import { BreadcrumbVersion } from "../components/createdocumentversion/BreadcrumbVersion.tsx";
import { FormHeader } from "../components/createdocumentversion/FormHeader.tsx";
import { MainSection } from "../components/createdocumentversion/MainSection.tsx";
import { SideSection } from "../components/createdocumentversion/SideSection.tsx";
import { TagsSection } from "../components/createdocumentversion/TagsSection.tsx";
import { FormActions } from "../components/createdocumentversion/FormActions.tsx";
import { MetadataSection } from "../components/createdocumentversion/MetadataSection.tsx";
import { Upload, FileIcon, X } from 'lucide-react';
import clsx from 'clsx';

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
                // navigate('/documents');
                navigate(`/documents/${effectiveFolderId}`);
            }
        }, 100);
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

        if (!formData.file) {
            errors.file = 'Un fichier est requis';
        }

        if (!formData.folderId) {
            errors.folderId = 'Un dossier est requis';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({
                ...formData,
                file: e.target.files[0],
                fileType: e.target.files[0].type.split('/')[1] || 'pdf'
            });
            setFormErrors({ ...formErrors, file: undefined });
        }
    };

    const removeFile = () => {
        setFormData({
            ...formData,
            file: null
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            try {
                // Afficher les données dans la console pour vérification
                console.log('Document data being submitted:', {
                    file: formData.file,
                    name: formData.name,
                    description: formData.description,
                    version: formData.version,
                    folderId: formData.folderId,
                    parentDocumentId: formData.parentDocumentId,
                    status: formData.status,
                    tags: formData.tags,
                    metadata: formData.metadata
                });

                await createDocument.mutateAsync({
                    file: formData.file!,
                    name: formData.name,
                    description: formData.description,
                    version: formData.version,
                    folderId: formData.folderId,
                    parentDocumentId: formData.parentDocumentId,
                    status: formData.status,
                    tags: formData.tags,
                    metadata: formData.metadata
                });
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
                <div id="success-message" className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg hidden">
                    Document créé avec succès ! Redirection en cours...
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden form-container opacity-0 translate-y-4 transition-all duration-300">
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

                        {/* Section d'upload de fichier */}
                        <div className="mt-6 pt-6 border-t border-slate-200">
                            <h3 className="text-lg font-medium text-slate-800 mb-4">Fichier du document</h3>

                            {!formData.file ? (
                                <div className={clsx(
                                    "border-2 border-dashed rounded-lg p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer",
                                    formErrors.file ? "border-red-300 bg-red-50" : "border-slate-300"
                                )}>
                                    <label htmlFor="file-upload" className="cursor-pointer">
                                        <div className="flex flex-col items-center justify-center">
                                            <Upload className="h-12 w-12 text-slate-400 mb-3" />
                                            <p className="text-slate-700 font-medium mb-1">Glissez un fichier ici ou cliquez pour parcourir</p>
                                            <p className="text-sm text-slate-500 mb-4">PDF, DOCX, XLSX, PPTX, etc. (max. 50 MB)</p>
                                            <button
                                                type="button"
                                                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                                            >
                                                Sélectionner un fichier
                                            </button>
                                            {formErrors.file && (
                                                <p className="mt-2 text-red-600 text-sm">{formErrors.file}</p>
                                            )}
                                        </div>
                                    </label>
                                    <input
                                        id="file-upload"
                                        name="file-upload"
                                        type="file"
                                        className="sr-only"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            ) : (
                                <div className="border rounded-lg p-4 bg-slate-50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <FileIcon className="h-10 w-10 text-primary-500" />
                                            <div>
                                                <p className="font-medium text-slate-800">{formData.file.name}</p>
                                                <p className="text-sm text-slate-500">
                                                    {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={removeFile}
                                            className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            )}
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