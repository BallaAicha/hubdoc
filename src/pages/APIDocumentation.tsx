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
    ExternalLink,
    Menu,
    Circle,
    BookOpen,
    Code,
    Star,
    Copy,
    Home
} from 'lucide-react';
import clsx from 'clsx';

// Types
interface ApiItem {
    id: string;
    name: string;
    description: string;
    icon: React.ElementType;
    status?: 'stable' | 'beta' | 'deprecated';
    version?: string;
    category?: string;
}

// Données API
const apiList: ApiItem[] = [
    {
        id: 'api1',
        name: 'Accounts-API',
        description: 'Gestion des comptes utilisateurs',
        icon: User,
        status: 'stable',
        version: 'v2.1.0',
        category: 'Comptes'
    },
    {
        id: 'api2',
        name: 'Loans-API',
        description: 'Gestion des prêts et emprunts',
        icon: FileText,
        status: 'beta',
        version: 'v1.2.3',
        category: 'Financier'
    },
    {
        id: 'api3',
        name: 'Transfer-API',
        description: 'Gestion des transferts',
        icon: ArrowRightLeft,
        status: 'stable',
        version: 'v3.0.1',
        category: 'Transactions'
    },
    {
        id: 'api4',
        name: 'Eligibility-API',
        description: 'Vérification de l\'éligibilité',
        icon: Check,
        status: 'beta',
        version: 'v0.9.5',
        category: 'Validation'
    },
    {
        id: 'api5',
        name: 'Transactions-API',
        description: 'Gestion des transactions',
        icon: CreditCard,
        status: 'stable',
        version: 'v2.4.0',
        category: 'Transactions'
    },

    {
        id: 'api6',
        name: 'Transactions-API test',
        description: 'Gestion des transactions',
        icon: CreditCard,
        status: 'stable',
        version: 'v2.4.0',
        category: 'Transactions'
    },
];

// Composant d'animation de chargement
const Spinner = () => (
    <div className="flex justify-center items-center py-10">
        <div className="relative">
            <div className="h-12 w-12 rounded-full border-t-4 border-b-4 border-primary-600 animate-spin"></div>
            <div className="absolute top-0 left-0 h-12 w-12 rounded-full border-t-4 border-b-4 border-primary-300 animate-ping opacity-20"></div>
        </div>
    </div>
);

// Composant Badge
const Badge = ({ children, variant = 'default', size = 'md' }: {
    children: React.ReactNode,
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'beta' | 'stable' | 'deprecated',
    size?: 'sm' | 'md'
}) => {
    const variantClasses = {
        default: 'bg-neutral-100 text-neutral-800',
        success: 'bg-emerald-50 text-emerald-700',
        warning: 'bg-amber-50 text-amber-700',
        error: 'bg-rose-50 text-rose-700',
        info: 'bg-sky-50 text-sky-700',
        beta: 'bg-violet-50 text-violet-700',
        stable: 'bg-emerald-50 text-emerald-700',
        deprecated: 'bg-rose-50 text-rose-700',
    };

    const sizeClasses = {
        sm: 'text-xs py-0.5 px-2',
        md: 'text-xs py-1 px-2.5'
    };

    return (
        <span className={`inline-flex items-center rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {variant === 'beta' && <Circle className="w-2 h-2 mr-1 fill-violet-500 stroke-none" />}
            {variant === 'stable' && <Circle className="w-2 h-2 mr-1 fill-emerald-500 stroke-none" />}
            {variant === 'deprecated' && <Circle className="w-2 h-2 mr-1 fill-rose-500 stroke-none" />}
            {children}
    </span>
    );
};

// Composant CopyButton
const CopyButton = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="inline-flex items-center px-2 py-1 text-xs font-medium text-neutral-500 bg-neutral-100 rounded hover:bg-neutral-200 transition-colors"
        >
            {copied ? (
                <>
                    <Check className="h-3 w-3 mr-1" />
                    <span>Copié</span>
                </>
            ) : (
                <>
                    <Copy className="h-3 w-3 mr-1" />
                    <span>Copier</span>
                </>
            )}
        </button>
    );
};

// Composant pour les cartes de ressources
const ResourceCard = ({ icon: Icon, title, description, link, linkText }: {
    icon: React.ElementType,
    title: string,
    description: string,
    link: string,
    linkText: string
}) => (
    <div className="flex flex-col h-full bg-white border border-neutral-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary-300 group">
        <div className="p-5 flex-grow">
            <div className="flex items-center mb-4">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-primary-50 mr-3 group-hover:bg-primary-100 transition-colors">
                    <Icon className="h-5 w-5 text-primary-600" />
                </div>
                <h3 className="font-semibold text-neutral-800">{title}</h3>
            </div>
            <p className="text-sm text-neutral-600 mb-4">{description}</p>
        </div>
        <div className="px-5 py-3 bg-neutral-50 group-hover:bg-primary-50 transition-colors border-t border-neutral-200 group-hover:border-primary-100">
            <a href={link} className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-800">
                {linkText}
                <ExternalLink className="ml-1 h-3.5 w-3.5" />
            </a>
        </div>
    </div>
);

// Composant principal
export function APIDocumentation() {
    const { apiId } = useParams<{ apiId?: string }>();
    const [searchTerm, setSearchTerm] = useState('');
    const [content, setContent] = useState<string>('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const fetchMarkdownForAPI = async (apiId: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/markdown/${apiId}.md`);
            if (!response.ok) {
                throw new Error('API introuvable.');
            }
            return await response.text();
        } catch {
            return '# Erreur \n\nAPI introuvable ou une autre erreur est survenue.';
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (apiId) {
            fetchMarkdownForAPI(apiId).then((data) => setContent(data));
            setMobileMenuOpen(false);
        }
    }, [apiId]);

    // Obtenir les catégories uniques
    const categories = Array.from(new Set(apiList.map(api => api.category)));

    // Filtrer les APIs par recherche et catégorie
    const filteredApis = apiList.filter(api => {
        const matchesSearch = api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            api.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? api.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    // Trouver l'API sélectionnée
    const selectedApi = apiId ? apiList.find(api => api.id === apiId) : null;

    // Fonction pour afficher le badge de statut
    const getStatusBadge = (status?: string) => {
        if (!status) return null;

        switch(status) {
            case 'stable':
                return <Badge variant="stable">Stable</Badge>;
            case 'beta':
                return <Badge variant="beta">Beta</Badge>;
            case 'deprecated':
                return <Badge variant="deprecated">Deprecated</Badge>;
            default:
                return null;
        }
    };

    const renderApiItem = (api: typeof apiList[0]) => {
        const Icon = api.icon;
        const isActive = api.id === apiId;

        return (
            <li key={api.id}>
                <NavLink
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
                        isActive ? 'bg-primary-100' : 'bg-neutral-100 group-hover:bg-neutral-200'
                    )}>
                        <Icon className={clsx(
                            'h-5 w-5',
                            isActive ? 'text-primary-600' : 'text-neutral-500 group-hover:text-primary-600'
                        )} />
                    </div>
                    <div className="flex flex-col flex-1">
                        <div className="flex items-center">
                            <span className="font-medium">{api.name}</span>
                            <div className="ml-2">{getStatusBadge(api.status)}</div>
                        </div>
                        <span className="text-xs text-neutral-500">{api.description}</span>
                    </div>
                    <ChevronRight className={clsx(
                        'ml-2 h-4 w-4 opacity-70 transition-transform duration-200',
                        isActive ? 'text-primary-600 translate-x-1' : 'text-neutral-400 group-hover:translate-x-1'
                    )} />
                </NavLink>
            </li>
        );
    };

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            {/* Logo */}
                            <div className="flex-shrink-0 flex items-center">
                                <NavLink to="/guide/nos-apis" className="flex items-center">
                                    <div className="h-8 w-8 bg-primary-600 rounded flex items-center justify-center mr-2">
                                        <Code className="h-5 w-5 text-white" />
                                    </div>
                                    <span className="font-bold text-xl text-neutral-800">API Hub</span>
                                </NavLink>
                            </div>

                            {/* Navigation desktop */}
                            <nav className="hidden md:ml-8 md:flex space-x-8 items-center">
                                <NavLink to="/" className="text-neutral-600 hover:text-neutral-900 px-3 py-2 text-sm font-medium">
                                    Accueil
                                </NavLink>
                                <NavLink to="/guide/nos-apis" className="text-primary-600 border-b-2 border-primary-600 px-3 py-2 text-sm font-medium">
                                    Documentation
                                </NavLink>
                                <NavLink to="/support" className="text-neutral-600 hover:text-neutral-900 px-3 py-2 text-sm font-medium">
                                    Support
                                </NavLink>
                            </nav>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={toggleMobileMenu}
                                className="inline-flex items-center justify-center p-2 rounded-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                            >
                                <span className="sr-only">Ouvrir le menu</span>
                                <Menu className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="pt-0 flex flex-1">
                {/* Sidebar pour desktop */}
                <aside className="hidden md:block md:w-80 lg:w-96 border-r border-neutral-200 bg-white z-20">
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

                        {/* Filtres par catégorie */}
                        <div className="px-4 py-3 border-b border-neutral-100">
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className={clsx(
                                        'px-2.5 py-1.5 text-xs font-medium rounded-full transition-colors',
                                        !selectedCategory ? 'bg-primary-100 text-primary-800' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                    )}
                                >
                                    Toutes
                                </button>
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category || null)}
                                        className={clsx(
                                            'px-2.5 py-1.5 text-xs font-medium rounded-full transition-colors',
                                            selectedCategory === category ? 'bg-primary-100 text-primary-800' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                        )}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
                            <ul className="space-y-1.5">
                                {filteredApis.map((api) => renderApiItem(api))}
                            </ul>

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

                    {/* Filtres pour mobile */}
                    <div className="px-4 py-3 border-b border-neutral-100">
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={clsx(
                                    'px-2.5 py-1.5 text-xs font-medium rounded-full transition-colors',
                                    !selectedCategory ? 'bg-primary-100 text-primary-800' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                )}
                            >
                                Toutes
                            </button>
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category as string)}
                                    className={clsx(
                                        'px-2.5 py-1.5 text-xs font-medium rounded-full transition-colors',
                                        selectedCategory === category ? 'bg-primary-100 text-primary-800' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                    )}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <nav className="flex-1 px-3 py-3 overflow-y-auto">
                        <ul className="space-y-1.5">
                            {filteredApis.map((api) => renderApiItem(api))}
                        </ul>

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

                {/* Bouton d'ouverture du menu mobile flottant (visible seulement quand le menu est fermé) */}
                {!mobileMenuOpen && (
                    <button
                        onClick={toggleMobileMenu}
                        className="fixed bottom-6 left-6 z-30 md:hidden flex items-center justify-center p-3 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                )}

                {/* Main content */}
                <main className="flex-1 bg-neutral-50 overflow-y-auto focus:outline-none">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
                        {/* Fil d'Ariane */}
                        {apiId && (
                            <div className="mb-6 flex items-center text-sm text-neutral-500">
                                <NavLink to="/guide/nos-apis" className="flex items-center hover:text-primary-600">
                                    <Home className="h-3.5 w-3.5 mr-1" />
                                    <span>Accueil</span>
                                </NavLink>
                                <ChevronRight className="mx-1 h-3.5 w-3.5" />
                                {selectedApi && (
                                    <span className="font-medium text-neutral-800">
                    {selectedApi.name}
                  </span>
                                )}
                            </div>
                        )}

                        {apiId && selectedApi ? (
                            <div>
                                {/* En-tête API */}
                                <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-neutral-200 mb-6">
                                    <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-6 py-5 text-white">
                                        <div className="flex items-center">
                                            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white bg-opacity-20 mr-4">
                                                {React.createElement(selectedApi.icon, { className: "h-6 w-6 text-white" })}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <h1 className="text-xl font-bold text-white">{selectedApi.name}</h1>
                                                    {selectedApi.version && <Badge variant="default">{selectedApi.version}</Badge>}
                                                    {getStatusBadge(selectedApi.status)}
                                                </div>
                                                <p className="text-sm text-white text-opacity-90 mt-1">{selectedApi.description}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Onglets de navigation */}
                                    <div className="px-6 border-b border-neutral-200 flex overflow-x-auto">
                                        <button className="px-4 py-3 text-sm font-medium border-b-2 border-primary-500 text-primary-700">Documentation</button>
                                        <button className="px-4 py-3 text-sm font-medium text-neutral-600 hover:text-neutral-800">Exemples</button>
                                        <button className="px-4 py-3 text-sm font-medium text-neutral-600 hover:text-neutral-800">Références</button>
                                        <button className="px-4 py-3 text-sm font-medium text-neutral-600 hover:text-neutral-800">Changelog</button>
                                    </div>
                                </div>

                                {/* Contenu de l'API */}
                                <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-neutral-200">
                                    <div className="px-6 py-6 md:px-8 md:py-8">
                                        {isLoading ? (
                                            <Spinner />
                                        ) : (
                                            <div className="prose prose-primary max-w-none">
                                                <ReactMarkdown
                                                    children={content}
                                                    remarkPlugins={[remarkGfm]}
                                                    rehypePlugins={[rehypeHighlight]}
                                                    components={{
                                                        code({ node, inline, className, children, ...props }) {
                                                            const match = /language-(\w+)/.exec(className || '');
                                                            const language = match ? match[1] : '';

                                                            if (!inline && match) {
                                                                return (
                                                                    <div className="relative">
                                                                        <div className="absolute top-2 right-2">
                                                                            <CopyButton text={String(children).replace(/\n$/, '')} />
                                                                        </div>
                                                                        <div className="bg-neutral-800 rounded-md text-xs py-1 px-2 text-white font-mono">
                                                                            {language}
                                                                        </div>
                                                                        <pre className={className} {...props}>
                                                                          <code className={className} {...props}>
                                                                            {children}
                                                                          </code>
                                                                        </pre>
                                                                    </div>
                                                                );
                                                            }

                                                            return <code className={className} {...props}>{children}</code>;
                                                        }
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Section Assistance */}
                                <div className="mt-8 bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-neutral-800 mb-2">Besoin d'aide avec cette API?</h3>
                                        <p className="text-neutral-600 text-sm mb-4">Notre équipe de support peut vous aider à intégrer cette API dans votre application.</p>
                                        <div className="flex flex-wrap gap-3">
                                            <a href="#" className="inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50">
                                                Consulter la FAQ
                                            </a>
                                            <a href="#" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
                                                Contacter le support
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                {/* Titre de la page d'accueil */}
                                <div className="text-center mb-12">
                                    <div className="inline-flex items-center justify-center p-2 bg-primary-100 rounded-full mb-4">
                                        <div className="bg-primary-600 rounded-full p-2">
                                            <BookOpen className="h-6 w-6 text-white" />
                                        </div>
                                    </div>
                                    <h1 className="text-4xl font-extrabold text-neutral-900 mb-4">Centre de Documentation API</h1>
                                    <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                                        Accédez à toutes nos API et leurs documentations pour développer votre application bancaire de manière industrielle
                                    </p>
                                </div>

                                {/* Section de recherche */}
                                <div className="max-w-2xl mx-auto mb-12">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                            <Search className="h-5 w-5 text-neutral-400" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Rechercher une API par nom ou fonctionnalité..."
                                            className="w-full pl-12 pr-4 py-4 bg-white border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all shadow-sm text-lg"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Filtres par catégorie */}
                                <div className="flex flex-wrap gap-2 justify-center mb-10">
                                    <button
                                        onClick={() => setSelectedCategory(null)}
                                        className={clsx(
                                            'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                                            !selectedCategory ? 'bg-primary-100 text-primary-800 ring-2 ring-primary-100 ring-offset-2' : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-300'
                                        )}
                                    >
                                        Toutes nos API
                                    </button>
                                    {categories.map(category => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={clsx(
                                                'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                                                selectedCategory === category ? 'bg-primary-100 text-primary-800 ring-2 ring-primary-100 ring-offset-2' : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-300'
                                            )}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>

                                {/* Liste des API */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                    {filteredApis.map(api => (
                                        <NavLink
                                            key={api.id}
                                            to={`/guide/nos-apis/${api.id}`}
                                            className="group"
                                        >
                                            <div className="flex flex-col h-full bg-white border border-neutral-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary-300">
                                                <div className="p-6">
                                                    <div className="flex items-center mb-4">
                                                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-neutral-100 group-hover:bg-primary-100 mr-4 transition-colors">
                                                            {React.createElement(api.icon, { className: "h-6 w-6 text-neutral-600 group-hover:text-primary-600 transition-colors" })}
                                                        </div>
                                                        <div>
                                                            <div className="flex flex-wrap items-center gap-2">
                                                                <h3 className="font-semibold text-neutral-800 group-hover:text-primary-700 transition-colors">{api.name}</h3>
                                                                {api.version && <Badge size="sm">{api.version}</Badge>}
                                                                {getStatusBadge(api.status)}
                                                            </div>
                                                            <p className="text-sm text-neutral-500 mt-1">{api.description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-auto px-6 py-4 border-t border-neutral-100 bg-neutral-50 group-hover:bg-primary-50 transition-colors flex justify-between items-center">
                                                    <span className="text-sm text-neutral-500 group-hover:text-primary-700 transition-colors">Voir la documentation</span>
                                                    <ChevronRight className="h-4 w-4 text-neutral-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                                                </div>
                                            </div>
                                        </NavLink>
                                    ))}
                                </div>

                                {/* Aucun résultat */}
                                {filteredApis.length === 0 && (
                                    <div className="text-center py-20 px-4 bg-white rounded-xl border border-neutral-200 shadow-sm">
                                        <div className="mx-auto h-16 w-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                                            <Search className="h-8 w-8 text-neutral-400" />
                                        </div>
                                        <h3 className="text-lg font-medium text-neutral-700">Aucun résultat</h3>
                                        <p className="mt-2 text-neutral-500 max-w-md mx-auto">
                                            Aucune API ne correspond à votre recherche. Essayez avec d'autres termes ou consultez toutes nos API disponibles.
                                        </p>
                                        <button
                                            onClick={() => { setSearchTerm(''); setSelectedCategory(null); }}
                                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                                        >
                                            Voir toutes les API
                                        </button>
                                    </div>
                                )}

                                {/* Ressources additionnelles */}
                                {filteredApis.length > 0 && (
                                    <div className="mt-16">
                                        <h2 className="text-2xl font-bold text-neutral-800 mb-6 text-center">Ressources additionnelles</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            <ResourceCard
                                                icon={BookOpen}
                                                title="Guides d'intégration"
                                                description="Consultez nos guides pour intégrer nos API efficacement dans votre application."
                                                link="/guide/integration"
                                                linkText="Voir les guides"
                                            />
                                            <ResourceCard
                                                icon={Code}
                                                title="Exemples de code"
                                                description="Des exemples concrets pour vous aider à démarrer rapidement avec nos API."
                                                link="/guide/examples"
                                                linkText="Explorer les exemples"
                                            />
                                            <ResourceCard
                                                icon={Star}
                                                title="Bonnes pratiques"
                                                description="Découvrez les bonnes pratiques pour tirer le meilleur parti de nos API."
                                                link="/guide/best-practices"
                                                linkText="Consulter les bonnes pratiques"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Footer */}
            <footer className="bg-neutral-800 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <div className="flex items-center space-x-3 mb-6">
                                    <img
                                        src="/src/logo.jpeg"
                                        alt="Logo"
                                        className="h-8 w-auto bg-white rounded-md p-1"
                                    />
                                    <span className="font-bold text-xl">DOC HUB</span>
                                </div>
                                <p className="text-neutral-400 mb-4">
                                    Plateforme de documentation et de génération de projets pour développeurs.
                                </p>
                                <div className="flex space-x-4">
                                    <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                                        <span className="sr-only">Twitter</span>
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                                        <span className="sr-only">GitHub</span>
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                                        <span className="sr-only">LinkedIn</span>
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-white text-lg mb-4">Produit</h3>
                                <ul className="space-y-3">
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Caractéristiques</a></li>
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Tarification</a></li>
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Démo</a></li>
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Roadmap</a></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-white text-lg mb-4">Documentation</h3>
                                <ul className="space-y-3">
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Guides</a></li>
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">API Reference</a></li>
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Tutoriels</a></li>
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Exemples</a></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-white text-lg mb-4">Entreprise</h3>
                                <ul className="space-y-3">
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">À propos</a></li>
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Blog</a></li>
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Carrières</a></li>
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Contact</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-neutral-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                            <p className="text-neutral-400 text-sm">
                                &copy; {new Date().getFullYear()} DOC HUB. Tous droits réservés.
                            </p>
                            <div className="flex space-x-6 mt-4 md:mt-0">
                                <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
                                    Confidentialité
                                </a>
                                <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
                                    Conditions d'utilisation
                                </a>
                                <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
                                    Mentions légales
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}