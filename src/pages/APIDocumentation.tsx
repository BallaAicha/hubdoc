
import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import {
    Search,
    ChevronRight,
    BookOpen,
    User,
    FileText,
    ArrowRightLeft,
    Check, CreditCard
} from 'lucide-react';



const apiList = [
    {
        id: 'api1',
        name: 'Accounts-API',
        description: 'Gestion des comptes utilisateurs',
        icon: User // Remplacement de Key par User
    },
    {
        id: 'api2',
        name: 'Loans-API',
        description: 'Gestion des prêts et emprunts',
        icon: FileText // Remplacement de Database par FileText
    },
    {
        id: 'api3',
        name: 'Transfer-API',
        description: 'Gestion des transferts',
        icon: ArrowRightLeft // Remplacement d'Upload par ArrowRightLeft
    },
    {
        id: 'api4',
        name: 'eligibility-API',
        description: 'Vérification de l\'éligibilité',
        icon: Check // Changer Trash2 par Check
    },
    {
        id: 'api5',
        name: 'Transactions-API',
        description: 'Gestion des transactions',
        icon: CreditCard // Remplacement de BarChart3 par CreditCard
    },
];

export function APIDocumentation() {
    const { apiId } = useParams<{ apiId?: string }>();

    const [searchTerm, setSearchTerm] = React.useState('');
    const [content, setContent] = React.useState<string>('');

    const fetchMarkdownForAPI = async (apiId: string) => {
        try {
            const response = await fetch(`/markdown/${apiId}.md`);
            if (!response.ok) {
                throw new Error('API introuvable.');
            }
            return await response.text();
        } catch (error) {
            return '# Erreur :\nAPI introuvable ou une autre erreur est survenue.';
        }
    };

    React.useEffect(() => {
        if (apiId) {
            fetchMarkdownForAPI(apiId).then((data) => setContent(data));
        }
    }, [apiId]);

    const filteredApis = apiList.filter(api =>
        api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        api.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}


            <div className="flex pt-16">
                {/* Sidebar */}
                <aside className="w-64 border-r border-gray-200 flex flex-col">
                    <div className="px-4 py-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher une API..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <nav className="flex-1 px-2 space-y-1">
                        {filteredApis.map((api) => {
                            const Icon = api.icon;
                            let isActive = false;
                            if (apiId && apiId === api.id) {
                                isActive = true;
                            }


                            return (
                                <NavLink
                                    key={api.id}
                                    to={`/guide/nos-apis/${api.id}`}
                                    className={({ isActive }: { isActive: boolean }) => `
                    flex items-center px-3 py-2 text-sm font-medium rounded-md group
                    ${isActive
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                                    }
                  `}
                                >
                                    <Icon className={`flex-shrink-0 -ml-1 mr-3 h-6 w-6 ${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'}`} />
                                    <div className="flex flex-col">
                                        <span className="font-medium">{api.name}</span>
                                        <span className="text-xs text-gray-500">{api.description}</span>
                                    </div>
                                    <ChevronRight className={`ml-auto h-5 w-5 ${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'}`} />
                                </NavLink>
                            );
                        })}
                    </nav>
                </aside>

                {/* Main content */}
                <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            {apiId ? (
                                <div className="prose prose-indigo max-w-none markdown-body">
                                    <ReactMarkdown
                                        children={content}
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeHighlight]}
                                    />
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">Pas de documentation sélectionnée</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Sélectionnez une API dans le menu pour afficher sa documentation.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}