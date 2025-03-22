import { FolderOpen, Plus, FileText, Folder } from "lucide-react";

interface DocumentsHeaderProps {
    handleCreateButtonClick: () => void;
    handleCreateSubFolder: () => void;
    handleCreateDocument: () => void;
    showActionMenu: boolean;
}

export default function DocumentsHeader({ handleCreateButtonClick, handleCreateSubFolder, handleCreateDocument, showActionMenu }: DocumentsHeaderProps) {
    return (
        <div className="bg-gradient-to-r from-[#850606] to-[#a51c1c] shadow-md sticky top-0 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="bg-white p-2 rounded-full shadow-md mr-3">
                        <FolderOpen className="h-6 w-6 text-[#850606]" />
                    </div>
                    <h1 className="text-xl font-bold text-white hidden sm:block">Gestion des Documents</h1>
                </div>
                <div className="relative">
                    <button onClick={handleCreateButtonClick} className="...">
                        <Plus className="h-4 w-4 mr-2" />Créer
                    </button>
                    {showActionMenu && (
                        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                            <button onClick={handleCreateSubFolder} className="..."><Folder className="..." />Créer un dossier</button>
                            <button onClick={handleCreateDocument} className="..."><FileText className="..." />Créer un document</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}