
import { useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';
import clsx from 'clsx';

interface FormActionsProps {
    effectiveFolderId: number | null;
    isSubmitting: boolean;
}

export function FormActions({ effectiveFolderId, isSubmitting }: FormActionsProps) {
    const navigate = useNavigate();

    return (
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
                        <svg className="animate-spin h-4 w-4 text-slate-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
    );
}