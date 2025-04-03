import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, FileText, Download } from 'lucide-react';
import axios from 'axios';

interface PdfGenerationDialogProps {
    serviceId: string;
    onClose: () => void;
}

export function PdfGenerationDialog({ serviceId, onClose }: PdfGenerationDialogProps) {
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState("");
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    const generatePdf = async () => {
        setIsGenerating(true);
        setError("");

        try {
            const response = await axios.get(
                `http://localhost:8080/api/${serviceId}/documentation/pdf`,
                { responseType: 'blob' }
            );

            // Créer une URL pour le blob
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(pdfBlob);
            setPdfUrl(url);
        } catch (err) {
            setError("Une erreur s'est produite lors de la génération du PDF");
            console.error(err);
        } finally {
            setIsGenerating(false);
        }
    };

    const downloadPdf = () => {
        if (pdfUrl) {
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = `service-${serviceId}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white rounded-xl shadow-xl max-w-md w-full"
            >
                <div className="p-5 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-neutral-900">Documentation PDF</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-neutral-100"
                    >
                        <X className="h-5 w-5 text-neutral-500" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="text-center mb-6">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 mb-4">
                            <FileText className="h-8 w-8 text-primary-600" />
                        </div>
                        <h3 className="text-lg font-medium text-neutral-900 mb-2">
                            Service créé avec succès!
                        </h3>
                        <p className="text-neutral-600">
                            Souhaitez-vous générer une documentation PDF pour ce service API?
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {pdfUrl && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                            <span className="text-sm text-green-700">PDF généré avec succès!</span>
                            <button
                                onClick={downloadPdf}
                                className="flex items-center text-sm text-primary-600 hover:text-primary-800"
                            >
                                <Download className="h-4 w-4 mr-1" />
                                Télécharger
                            </button>
                        </div>
                    )}
                </div>

                <div className="bg-neutral-50 p-4 rounded-b-xl border-t flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-white text-neutral-700"
                    >
                        Fermer
                    </button>
                    {!pdfUrl && (
                        <button
                            onClick={generatePdf}
                            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-black rounded-lg font-medium flex items-center"
                            disabled={isGenerating}
                        >
                            {isGenerating ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Génération...
                                </>
                            ) : (
                                <>
                                    <FileText className="h-4 w-4 mr-2" />
                                    Générer le PDF
                                </>
                            )}
                        </button>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}