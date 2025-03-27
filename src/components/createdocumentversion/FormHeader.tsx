import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormHeaderProps {
    effectiveFolderId: number | null;
}

export function FormHeader({ effectiveFolderId }: FormHeaderProps) {
    const navigate = useNavigate();

    return (
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
    );
}