import { useNavigate } from 'react-router-dom';
export function BreadcrumbVersion() {
    const navigate = useNavigate();

    return (
        <nav className="mb-4">
            <ol className="flex items-center text-sm text-slate-500">
                <li>
                    <button
                        onClick={() => navigate('/documents')}
                        className="hover:text-primary-600 transition-colors"
                    >
                        Documents
                    </button>
                </li>
                <li className="mx-2">
                    <span>/</span>
                </li>
                <li className="font-medium text-slate-800">Nouvelle version</li>
            </ol>
        </nav>
    );
}