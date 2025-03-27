import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, ChevronDown, ChevronUp, Copy, Check, Terminal } from 'lucide-react';
import { clsx } from 'clsx';

interface Endpoint {
    path: string;
    method: string;  // Changé de type union à string pour plus de flexibilité
    description: string;
    curl?: string;  // La commande cURL fournie par l'API
    expectedResponse?: string;  // Réponse attendue également fournie par l'API
    parameters?: {
        name: string;
        type: string;
        required: boolean;
        description: string;
    }[];
    responses?: {
        status: number;
        description: string;
    }[];
}

interface ServiceEndpointsProps {
    endpoints: Endpoint[];
    serviceName?: string;
    infrastructure?: {
        urlInt?: string;
        urlUat?: string;
        urlOat?: string;
        urlProd?: string;
    };
}

const ServiceEndpoints: React.FC<ServiceEndpointsProps> = ({
                                                               endpoints,
                                                               serviceName,
                                                               infrastructure
                                                           }) => {
    const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);
    const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

    const toggleEndpoint = (path: string) => {
        if (expandedEndpoint === path) {
            setExpandedEndpoint(null);
        } else {
            setExpandedEndpoint(path);
        }
    };

    const getMethodColor = (method: string) => {
        switch (method.toUpperCase()) {
            case 'GET': return 'bg-green-100 text-green-800';
            case 'POST': return 'bg-blue-100 text-blue-800';
            case 'PUT': return 'bg-yellow-100 text-yellow-800';
            case 'DELETE': return 'bg-red-100 text-red-800';
            case 'PATCH': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const copyToClipboard = (text: string, endpointPath: string) => {
        navigator.clipboard.writeText(text);
        setCopiedEndpoint(endpointPath);
        setTimeout(() => {
            setCopiedEndpoint(null);
        }, 2000);
    };

    // Formatter la réponse JSON attendue pour l'affichage
    const formatJSON = (jsonString: string) => {
        try {
            const parsed = JSON.parse(jsonString);
            return JSON.stringify(parsed, null, 2);
        } catch (e) {
            return jsonString; // En cas d'échec du parsing, retourner la chaîne d'origine
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
        >
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">API Endpoints</h2>

            {infrastructure && (
                <div className="mb-6 bg-white rounded-lg p-4 border border-neutral-200 shadow-sm">
                    <h3 className="text-sm font-semibold text-neutral-700 mb-2">URLs d'environnement</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        {infrastructure.urlInt && (
                            <div className="p-2 bg-neutral-50 rounded border border-neutral-100">
                                <p className="text-xs font-medium text-neutral-500 mb-1">INT</p>
                                <p className="text-sm font-mono text-neutral-800">{infrastructure.urlInt}</p>
                            </div>
                        )}
                        {infrastructure.urlUat && (
                            <div className="p-2 bg-neutral-50 rounded border border-neutral-100">
                                <p className="text-xs font-medium text-neutral-500 mb-1">UAT</p>
                                <p className="text-sm font-mono text-neutral-800">{infrastructure.urlUat}</p>
                            </div>
                        )}
                        {infrastructure.urlOat && (
                            <div className="p-2 bg-neutral-50 rounded border border-neutral-100">
                                <p className="text-xs font-medium text-neutral-500 mb-1">OAT</p>
                                <p className="text-sm font-mono text-neutral-800">{infrastructure.urlOat}</p>
                            </div>
                        )}
                        {infrastructure.urlProd && (
                            <div className="p-2 bg-neutral-50 rounded border border-neutral-100">
                                <p className="text-xs font-medium text-neutral-500 mb-1">PROD</p>
                                <p className="text-sm font-mono text-neutral-800">{infrastructure.urlProd}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {endpoints && endpoints.length > 0 ? (
                <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden divide-y divide-neutral-200">
                    {endpoints.map((endpoint, index) => (
                        <motion.div
                            key={`${endpoint.method}-${endpoint.path}-${index}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.6 + (index * 0.05) }}
                            className="overflow-hidden"
                        >
                            <div
                                className={clsx(
                                    "flex items-center justify-between p-4 cursor-pointer hover:bg-neutral-50",
                                    expandedEndpoint === endpoint.path && "bg-neutral-50"
                                )}
                                onClick={() => toggleEndpoint(endpoint.path)}
                            >
                                <div className="flex items-center space-x-3">
                                    <span className={`px-3 py-1 rounded-md text-xs font-medium ${getMethodColor(endpoint.method)}`}>
                                        {endpoint.method.toUpperCase()}
                                    </span>
                                    <span className="font-mono text-sm">{endpoint.path}</span>
                                </div>
                                <div>
                                    {expandedEndpoint === endpoint.path ? (
                                        <ChevronUp className="h-5 w-5 text-neutral-500" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5 text-neutral-500" />
                                    )}
                                </div>
                            </div>

                            {expandedEndpoint === endpoint.path && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="px-4 pb-6"
                                >
                                    <div className="bg-neutral-50 p-4 rounded-md mb-5">
                                        <p className="text-sm text-neutral-700">{endpoint.description}</p>
                                    </div>

                                    {/* Exemple cURL */}
                                    {endpoint.curl && (
                                        <div className="mb-6">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="text-sm font-medium text-neutral-700 flex items-center">
                                                    <Terminal className="h-4 w-4 mr-1 text-neutral-600" />
                                                    Requête cURL
                                                </h4>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        copyToClipboard(endpoint.curl!, endpoint.path);
                                                    }}
                                                    className="text-xs flex items-center px-2 py-1 bg-neutral-100 hover:bg-neutral-200 rounded text-neutral-700 transition-colors"
                                                >
                                                    {copiedEndpoint === endpoint.path ? (
                                                        <>
                                                            <Check className="h-3 w-3 mr-1" />
                                                            Copié!
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Copy className="h-3 w-3 mr-1" />
                                                            Copier
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                            <div className="bg-neutral-900 text-neutral-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
                                                <pre className="whitespace-pre-wrap break-all">{endpoint.curl}</pre>
                                            </div>
                                        </div>
                                    )}

                                    {/* Réponse attendue */}
                                    {endpoint.expectedResponse && (
                                        <div className="mb-6">
                                            <h4 className="text-sm font-medium text-neutral-700 mb-2 flex items-center">
                                                <Code className="h-4 w-4 mr-1 text-neutral-600" />
                                                Réponse attendue
                                            </h4>
                                            <div className="bg-neutral-900 text-neutral-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
                                                <pre className="whitespace-pre">{formatJSON(endpoint.expectedResponse)}</pre>
                                            </div>
                                        </div>
                                    )}

                                    {endpoint.parameters && endpoint.parameters.length > 0 && (
                                        <div className="mb-5">
                                            <h4 className="text-sm font-medium text-neutral-700 mb-2">Paramètres</h4>
                                            <div className="border rounded-md overflow-hidden">
                                                <table className="min-w-full divide-y divide-neutral-200">
                                                    <thead className="bg-neutral-50">
                                                    <tr>
                                                        <th className="px-3 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Nom</th>
                                                        <th className="px-3 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Type</th>
                                                        <th className="px-3 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Requis</th>
                                                        <th className="px-3 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Description</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-neutral-200">
                                                    {endpoint.parameters.map((param) => (
                                                        <tr key={param.name}>
                                                            <td className="px-3 py-2 whitespace-nowrap text-sm font-mono text-neutral-800">{param.name}</td>
                                                            <td className="px-3 py-2 whitespace-nowrap text-sm text-neutral-600">{param.type}</td>
                                                            <td className="px-3 py-2 whitespace-nowrap text-sm text-neutral-600">
                                                                {param.required ? "Yes" : "No"}
                                                            </td>
                                                            <td className="px-3 py-2 text-sm text-neutral-600">{param.description}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}

                                    {endpoint.responses && endpoint.responses.length > 0 && (
                                        <div>
                                            <h4 className="text-sm font-medium text-neutral-700 mb-2">Réponses</h4>
                                            <div className="border rounded-md overflow-hidden">
                                                <table className="min-w-full divide-y divide-neutral-200">
                                                    <thead className="bg-neutral-50">
                                                    <tr>
                                                        <th className="px-3 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                                                        <th className="px-3 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Description</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-neutral-200">
                                                    {endpoint.responses.map((response) => (
                                                        <tr key={response.status}>
                                                            <td className="px-3 py-2 whitespace-nowrap text-sm font-mono text-neutral-800">{response.status}</td>
                                                            <td className="px-3 py-2 text-sm text-neutral-600">{response.description}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-lg border border-neutral-200 p-6 text-center">
                    <Code className="h-10 w-10 text-neutral-400 mx-auto mb-2" />
                    <p className="text-neutral-600">Aucun endpoint API documenté</p>
                </div>
            )}
        </motion.div>
    );
};

export default ServiceEndpoints;