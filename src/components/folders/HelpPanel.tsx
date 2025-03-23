
import { Info, X } from 'lucide-react';

interface HelpPanelProps {
    showHelp: boolean;
    onClose: () => void;
}

export function HelpPanel({ showHelp, onClose }: HelpPanelProps) {
    if (!showHelp) return null;

    return (
        <div className="mt-5 p-4 bg-indigo-50 bg-opacity-95 border border-indigo-100 rounded-lg animate-fadeIn">
            <div className="flex">
                <div className="flex-shrink-0">
                    <Info className="h-5 w-5 text-indigo-500" />
                </div>
                <div className="ml-3 flex-1">
                    <p className="text-sm text-slate-700">
                        <span className="font-medium text-indigo-700">Comment ça fonctionne :</span> Choisissez un type de document,
                        donnez-lui un nom explicite et ajoutez une description détaillée pour faciliter sa recherche
                        et son identification ultérieures. Les champs marqués d'un astérisque (*) sont obligatoires.
                    </p>
                </div>
                <button
                    type="button"
                    className="ml-auto flex-shrink-0 text-indigo-400 hover:text-indigo-500 transition-colors"
                    onClick={onClose}
                    aria-label="Fermer l'aide"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}