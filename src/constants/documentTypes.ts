import { FileText, FileEdit, LayoutGrid, Calendar } from 'lucide-react';

export const DOCUMENT_TYPES = [
    {
        id: 'standard',
        name: 'Document standard',
        description: 'Document basique pour tous types d\'usage',
        icon: FileText
    },
    {
        id: 'contract',
        name: 'Contrat',
        description: 'Document juridiquement contraignant entre parties',
        icon: FileEdit
    },
    {
        id: 'report',
        name: 'Rapport',
        description: 'Présentation détaillée de données et analyses',
        icon: LayoutGrid
    },
    {
        id: 'invoice',
        name: 'Facture',
        description: 'Document financier pour transactions commerciales',
        icon: Calendar
    }
];