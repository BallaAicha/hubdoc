import {Dialog, Transition} from "@headlessui/react";
import {FolderOpen} from "lucide-react";
import {Fragment} from "react";
import {Folder}  from "../../types";
interface FolderModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    selectedItem: Folder | null;
    handleViewFolder: () => void;
}

export default function FolderModal({isModalOpen, setIsModalOpen, selectedItem, handleViewFolder}: FolderModalProps) {
    return (
        <Transition show={isModalOpen} as={Fragment}>
            <Dialog onClose={() => setIsModalOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30"/>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="relative bg-white rounded-lg max-w-md mx-auto p-6 shadow-xl">
                        <Dialog.Title className="text-lg font-medium">{selectedItem?.name}</Dialog.Title>
                        <p className="text-sm text-gray-500 mt-4">{selectedItem?.description || 'Aucune description disponible'}</p>
                        <div className="mt-6 flex justify-end gap-2">
                            <button onClick={() => setIsModalOpen(false)} className="bg-gray-200 px-4 py-2 rounded-md">Fermer</button>
                            <button onClick={handleViewFolder} className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
                                <FolderOpen className="h-4 w-4 mr-2"/> Ouvrir
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}