
import { ArrowLeft, FileText } from 'lucide-react';

interface HeaderProps {
    onCancel: () => void;
}

export function Header({ onCancel }: HeaderProps) {
    return (
        <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center h-16">
                    <button
                        onClick={onCancel}
                        className="inline-flex items-center px-3.5 py-2 border border-transparent text-sm font-medium rounded-md text-slate-600 hover:text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
                        aria-label="Retour"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Retour
                    </button>

                    <h1 className="text-lg font-semibold text-slate-800 flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-indigo-600" />
                        <span className="hidden sm:inline">Nouveau document</span>
                        <span className="sm:hidden">Document</span>
                    </h1>

                    <div className="w-24">
                        {/* Espace pour équilibrer le header */}
                    </div>
                </div>
            </div>
        </header>
    );
}