import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import {
    Search,
    ChevronRight,
    User,
    FileText,
    ArrowRightLeft,
    Check,
    CreditCard,
    X,
    ExternalLink
} from 'lucide-react';
import clsx from 'clsx';



const apiList = [
    {
        id: 'api1',
        name: 'Accounts-API',
        description: 'Gestion des comptes utilisateurs',
        icon: User
    },
    {
        id: 'api2',
        name: 'Loans-API',
        description: 'Gestion des prêts et emprunts',
        icon: FileText
    },
    {
        id: 'api3',
        name: 'Transfer-API',
        description: 'Gestion des transferts',
        icon: ArrowRightLeft
    },
    {
        id: 'api4',
        name: 'Eligibility-API',
        description: 'Vérification de l\'éligibilité',
        icon: Check
    },
    {
        id: 'api5',
        name: 'Transactions-API',
        description: 'Gestion des transactions',
        icon: CreditCard
    },
];

// Composant réutilisable pour l'animation de chargement
const Spinner = () => (
    <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-primary-600 border-opacity-75"></div>
    </div>
);

// Composant de badge utilisé pour les statuts, versions, etc.
const Badge = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'success' | 'warning' | 'error' | 'info' }) => {
    const variantClasses = {
        default: 'bg-neutral-100 text-neutral-800',
        success: 'bg-success bg-opacity-10 text-success',
        warning: 'bg-warning bg-opacity-10 text-warning',
        error: 'bg-error bg-opacity-10 text-error',
        info: 'bg-info bg-opacity-10 text-info',
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]}`}>
            {children}
        </span>
    );
};

export function APIDocumentation() {
    const { apiId } = useParams<{ apiId?: string }>();
    const [searchTerm, setSearchTerm] = useState('');
    const [content, setContent] = useState<string>('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMarkdownForAPI = async (apiId: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/markdown/${apiId}.md`);
            if (!response.ok) {
                throw new Error('API introuvable.');
            }
            return await response.text();
        } catch {
            return '# Erreur :\nAPI introuvable ou une autre erreur est survenue.';
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (apiId) {
            fetchMarkdownForAPI(apiId).then((data) => setContent(data));
            // Fermer le menu mobile quand on sélectionne une API
            setMobileMenuOpen(false);
        }
    }, [apiId]);

    const filteredApis = apiList.filter(api =>
        api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        api.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const renderApiItem = (api: typeof apiList[0]) => {
        const Icon = api.icon;
        const isActive = api.id === apiId;

        return (
            <NavLink
                key={api.id}
                to={`/guide/nos-apis/${api.id}`}
                className={({ isActive }: { isActive: boolean }) => clsx(
                    'flex items-center px-4 py-3 rounded-lg transition-all duration-200 group',
                    isActive
                        ? 'bg-primary-50 text-primary-700 font-medium border-l-4 border-primary-600'
                        : 'text-neutral-700 hover:bg-neutral-100 hover:text-primary-600'
                )}
            >
                <div className={clsx(
                    'flex items-center justify-center w-10 h-10 rounded-lg mr-3',
                    isActive ? 'bg-primary-100' : 'bg-neutral-100'
                )}>
                    <Icon className={clsx(
                        'h-5 w-5',
                        isActive ? 'text-primary-600' : 'text-neutral-500'
                    )} />
                </div>
                <div className="flex flex-col flex-1">
                    <span className="font-medium">{api.name}</span>
                    <span className="text-xs text-neutral-500">{api.description}</span>
                </div>
                <ChevronRight className={clsx(
                    'ml-2 h-4 w-4 opacity-70 transition-transform duration-200',
                    isActive ? 'text-primary-600 translate-x-1' : 'text-neutral-400 group-hover:translate-x-1'
                )} />
            </NavLink>
        );
    };

    const selectedApi = apiId ? apiList.find(api => api.id === apiId) : null;

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">


            <div className="pt-16 flex flex-1">
                {/* Sidebar pour desktop */}
                <aside className="hidden md:block md:w-80 lg:w-96 border-r border-neutral-200 flex-col bg-white z-20">
                    <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col">
                        <div className="p-4 border-b border-neutral-100">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Search className="h-4 w-4 text-neutral-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Rechercher une API..."
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <nav className="flex-1 px-3 py-3 space-y-1.5 overflow-y-auto">
                            {filteredApis.map((api) => renderApiItem(api))}

                            {filteredApis.length === 0 && (
                                <div className="text-center py-12 px-4">
                                    <div className="mx-auto h-12 w-12 rounded-full bg-neutral-100 flex items-center justify-center mb-3">
                                        <Search className="h-6 w-6 text-neutral-400" />
                                    </div>
                                    <h3 className="text-sm font-medium text-neutral-700">Aucun résultat</h3>
                                    <p className="mt-1 text-xs text-neutral-500">
                                        Aucune API ne correspond à votre recherche
                                    </p>
                                </div>
                            )}
                        </nav>
                    </div>
                </aside>

                {/* Sidebar mobile */}
                <aside
                    className={clsx(
                        "fixed inset-0 flex flex-col bg-white z-40 transition-transform duration-300 ease-in-out transform",
                        mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
                        "md:hidden"
                    )}
                >
                    <div className="px-4 py-4 border-b border-neutral-200 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-neutral-800">Documentation API</h2>
                        <button
                            onClick={toggleMobileMenu}
                            className="p-2 rounded-md text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="px-4 py-4 border-b border-neutral-100">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Search className="h-4 w-4 text-neutral-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Rechercher une API..."
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <nav className="flex-1 px-3 py-3 overflow-y-auto space-y-1.5">
                        {filteredApis.map((api) => renderApiItem(api))}

                        {filteredApis.length === 0 && (
                            <div className="text-center py-12 px-4">
                                <div className="mx-auto h-12 w-12 rounded-full bg-neutral-100 flex items-center justify-center mb-3">
                                    <Search className="h-6 w-6 text-neutral-400" />
                                </div>
                                <h3 className="text-sm font-medium text-neutral-700">Aucun résultat</h3>
                                <p className="mt-1 text-xs text-neutral-500">
                                    Aucune API ne correspond à votre recherche
                                </p>
                            </div>
                        )}
                    </nav>
                </aside>

                {/* Overlay pour fermer le menu mobile */}
                {mobileMenuOpen && (
                    <div
                        className="fixed inset-0 bg-neutral-900 bg-opacity-50 z-30 md:hidden backdrop-blur-sm"
                        onClick={toggleMobileMenu}
                        aria-hidden="true"
                    />
                )}

                {/* Main content */}
                <main className="flex-1 bg-neutral-50 overflow-y-auto focus:outline-none">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
                        {apiId && selectedApi ? (
                            <div className="bg-white shadow-md rounded-xl overflow-hidden border border-neutral-200">
                                <div className="border-b border-neutral-200 bg-white px-6 py-5 flex items-center">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary-50 mr-4">
                                        {React.createElement(selectedApi.icon, { className: "h-6 w-6 text-primary-600" })}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center">
                                            <h1 className="text-xl font-bold text-neutral-800">{selectedApi.name}</h1>
                                            <Badge variant="success">v1.0</Badge>
                                        </div>
                                        <p className="text-sm text-neutral-500 mt-1">{selectedApi.description}</p>
                                    </div>
                                </div>

                                <div className="px-6 py-6 md:px-8 md:py-8">
                                    {isLoading ? (
                                        <Spinner />
                                    ) : (
                                        <div className="prose prose-red max-w-none">
                                            <ReactMarkdown
                                                children={content}
                                                remarkPlugins={[remarkGfm]}
                                                rehypePlugins={[rehypeHighlight]}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div>
                                {/* Titre de la page d'accueil */}
                                <div className="text-center mb-10">
                                    <h1 className="text-3xl font-bold text-neutral-800 mb-3">Centre de Documentation API</h1>
                                    <p className="text-neutral-600 max-w-2xl mx-auto">
                                        Accédez à toutes nos API et leurs documentations pour développer votre application bancaire
                                    </p>
                                </div>

                                {/* Cartes des APIs */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {apiList.map((api) => {
                                        const Icon = api.icon;
                                        return (
                                            <NavLink
                                                key={api.id}
                                                to={`/guide/nos-apis/${api.id}`}
                                                className="flex flex-col bg-white border border-neutral-200 rounded-xl hover:border-primary-500 hover:shadow-lg transition-all duration-200 group overflow-hidden"
                                            >
                                                <div className="px-5 py-5 flex items-center border-b border-neutral-100">
                                                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-50 mr-3 group-hover:bg-primary-100 transition-colors">
                                                        <Icon className="h-5 w-5 text-primary-600" />
                                                    </div>
                                                    <h3 className="font-semibold text-neutral-800">{api.name}</h3>
                                                </div>
                                                <div className="px-5 py-4 flex-1">
                                                    <p className="text-sm text-neutral-600">{api.description}</p>
                                                </div>
                                                <div className="px-5 py-4 bg-neutral-50 group-hover:bg-primary-50 transition-colors flex items-center justify-between">
                                                    <span className="text-sm font-medium text-primary-700">Consulter la documentation</span>
                                                    <ChevronRight className="h-4 w-4 text-primary-600 transform transition-transform duration-200 group-hover:translate-x-1" />
                                                </div>
                                            </NavLink>
                                        );
                                    })}
                                </div>

                                {/* Section d'informations supplémentaires */}
                                <div className="mt-14 bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
                                    <div className="px-6 py-5 bg-neutral-50 border-b border-neutral-200">
                                        <h2 className="text-xl font-semibold text-neutral-800">Ressources pour développeurs</h2>
                                    </div>
                                    <div className="px-6 py-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-primary-50 mr-4">
                                                    <FileText className="h-6 w-6 text-primary-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-neutral-800">Guide de démarrage</h3>
                                                    <p className="mt-1 text-sm text-neutral-600">Commencez à utiliser nos APIs avec notre guide complet</p>
                                                    <a href="#" className="mt-2 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-800">
                                                        Consulter le guide
                                                        <ExternalLink className="ml-1 h-3.5 w-3.5" />
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-primary-50 mr-4">
                                                    <User className="h-6 w-6 text-primary-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-neutral-800">Support développeurs</h3>
                                                    <p className="mt-1 text-sm text-neutral-600">Besoin d'aide? Notre équipe est disponible pour vous assister</p>
                                                    <a href="#" className="mt-2 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-800">
                                                        Contacter le support
                                                        <ExternalLink className="ml-1 h-3.5 w-3.5" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}