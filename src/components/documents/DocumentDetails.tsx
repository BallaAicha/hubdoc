import { Dialog, Transition } from "@headlessui/react";
import {X, Download, Eye, FileText, Star, Share} from "lucide-react";

import { Document } from "../../types";
import React from "react";

interface DocumentDetailsProps {
    showDetails: boolean;
    setShowDetails: (value: boolean) => void;
    selectedItem: Document | null;
}

export default function DocumentDetails({ showDetails, setShowDetails, selectedItem }: DocumentDetailsProps) {
    return (
        <Transition show={showDetails} as={React.Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => setShowDetails(false)}>
                <div className="flex items-center justify-center min-h-screen">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30"/>
                    <div className="relative bg-white rounded-lg max-w-3xl w-full mx-auto p-6 shadow-xl">
                        <button
                            onClick={() => setShowDetails(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                        >
                            <X className="h-6 w-6"/>
                        </button>

                        {selectedItem && !('subFolderIds' in selectedItem) && (
                            <>
                                <div className="flex items-start mb-6">
                                    <div className="mr-4">
                                        <FileText className="h-12 w-12 text-red-500"/>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">{selectedItem.name}</h2>
                                        <p className="text-sm text-gray-500 mt-1">{selectedItem.description}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-medium text-gray-700 mb-2">Informations</h3>
                                        <div className="space-y-2 text-sm">
                                            <p><span
                                                className="text-gray-500">Type:</span> {selectedItem.fileType || 'Non spécifié'}
                                            </p>
                                            <p><span
                                                className="text-gray-500">Version:</span> {selectedItem.version || 'N/A'}
                                            </p>
                                            <p><span
                                                className="text-gray-500">Taille:</span> {selectedItem.fileSize || 'N/A'}
                                            </p>

                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-medium text-gray-700 mb-2">Dates</h3>
                                        <div className="space-y-2 text-sm">
                                            <p><span
                                                className="text-gray-500">Date de création:</span> {new Date(selectedItem.createdAt).toLocaleDateString('fr-FR')}
                                            </p>
                                            <p><span
                                                className="text-gray-500">Dernière modification:</span> {new Date(selectedItem.updatedAt).toLocaleDateString('fr-FR')}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex space-x-2">
                                    <button
                                        className="px-3 py-2 bg-blue-600 text-white rounded-md flex items-center">
                                        <Download className="h-4 w-4 mr-2"/>
                                        Télécharger
                                    </button>
                                    <button
                                        className="px-3 py-2 bg-gray-200 text-gray-800 rounded-md flex items-center">
                                        <Eye className="h-4 w-4 mr-2"/>
                                        Visualiser
                                    </button>
                                    <button
                                        className="px-3 py-2 bg-gray-200 text-gray-800 rounded-md flex items-center">
                                        <Star className="h-4 w-4 mr-2"/>
                                        Favoris
                                    </button>
                                    <button
                                        className="px-3 py-2 bg-gray-200 text-gray-800 rounded-md flex items-center">
                                        <Share className="h-4 w-4 mr-2"/>
                                        Partager
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}



