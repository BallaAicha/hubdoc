import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useCreateFolder } from "../hooks/useCreateFolder";
import { Header } from "../components/folders/Header";
import { HelpPanel } from "../components/folders/HelpPanel";
import { DocumentTypeSelector } from "../components/folders/DocumentTypeSelector";
import { DocumentForm } from "../components/folders/DocumentForm";
import { Footer } from "../components/commons/Footer";
export function CreateDocument() {
    const navigate = useNavigate();
    const { folderId } = useParams();
    const { parentId } = useParams();
    const [searchParams] = useSearchParams();
    const parentIdFromQuery = searchParams.get('parentId');
    const effectiveParentId = folderId ? parseInt(folderId) :
        parentIdFromQuery ? parseInt(parentIdFromQuery) : null;
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: 'standard',
        tags: [] as string[]
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showHelp, setShowHelp] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);

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
    const createFolder = useCreateFolder(() => {
        document.getElementById('success-message')?.classList.remove('hidden');
        setTimeout(() => {
            if (effectiveParentId) {
                navigate(`/documents/${effectiveParentId}`);
            } else {
                navigate('/documents');
            }
        }, 100);
    });
    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Le nom du document est requis';
        } else if (formData.name.length < 3) {
            newErrors.name = 'Le nom doit contenir au moins 3 caractères';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            try {
                await createFolder.mutateAsync({
                    name: formData.name,
                    description: formData.description,
                    parentId: parentId ? parseInt(parentId) : null
                });
            } catch (error) {
                console.error('Error creating folder:', error);
                setIsSubmitting(false);
            }
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };
    const handleCancel = () => {
        navigate('/documents');
    };
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Header onCancel={handleCancel} />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
                <div className="form-container opacity-0 translate-y-4">
                    <div className="bg-white shadow-md rounded-xl overflow-hidden border border-slate-200 transition-all duration-300 hover:shadow-lg">
                        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-6 sm:px-8">
                            <HelpPanel showHelp={showHelp} onClose={() => setShowHelp(false)} />
                        </div>

                        <div id="success-message" className="hidden px-6 py-4 mt-4 mx-6 bg-emerald-50 border border-emerald-100 rounded-lg">
                            <div className="flex items-center">
                                <p className="ml-3 text-sm font-medium text-emerald-800">Document créé avec succès !</p>
                            </div>
                        </div>

                        <DocumentTypeSelector
                            selectedType={formData.type}
                            onTypeSelect={(type) => setFormData(prev => ({ ...prev, type }))}
                            isOpen={typeDropdownOpen}
                            onToggle={() => setTypeDropdownOpen(!typeDropdownOpen)}
                        />

                        <DocumentForm
                            formData={formData}
                            errors={errors}
                            isSubmitting={isSubmitting}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

