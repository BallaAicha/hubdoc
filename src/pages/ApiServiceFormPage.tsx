import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiServiceForm } from '../components/apis/ApiServiceForm.tsx';
import {PdfGenerationDialog} from "../components/apis/PdfGenerationDialog.tsx";


export function ApiServiceFormPage() {
    const navigate = useNavigate();
    const [createdServiceId, setCreatedServiceId] = useState<string | null>(null);

    const handleClose = () => navigate('/');

    // Lorsque le service est créé avec succès, affiche la boîte PDF
    const handleSuccess = (serviceId: string) => {
        setCreatedServiceId(serviceId);
    };

    // Ferme le dialog PDF et redirige vers la page d'accueil
    const handleDialogClose = () => {
        setCreatedServiceId(null);
        navigate('/');
    };

    return (
        <div>
            <ApiServiceForm onClose={handleClose} onSuccess={handleSuccess} />

            {createdServiceId && (
                <PdfGenerationDialog
                    serviceId={createdServiceId}
                    onClose={handleDialogClose}
                />
            )}
        </div>
    );
}