import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, ChevronDown, ChevronUp } from 'lucide-react';
import { clsx } from 'clsx';

interface Endpoint {
    path: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    description: string;
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
}

const ServiceEndpoints: React.FC<ServiceEndpointsProps> = ({ endpoints }) => {
    const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);

    const toggleEndpoint = (path: string) => {
        if (expandedEndpoint === path) {
            setExpandedEndpoint(null);
        } else {
            setExpandedEndpoint(path);
        }
    };

    const getMethodColor = (method: string) => {
        switch (method) {
            case 'GET': return 'bg-green-100 text-green-800';
            case 'POST': return 'bg-blue-100 text-blue-800';
            case 'PUT': return 'bg-yellow-100 text-yellow-800';
            case 'DELETE': return 'bg-red-100 text-red-800';
            case 'PATCH': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
        >
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">API Endpoints</h2>
            {endpoints && endpoints.length > 0 ? (
                <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden divide-y divide-neutral-200">
                    {endpoints.map((endpoint, index) => (
                        <motion.div
                            key={`${endpoint.method}-${endpoint.path}`}
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
                    {endpoint.method}
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
                                    className="px-4 pb-4"
                                >
                                    <div className="bg-neutral-50 p-3 rounded-md mb-3">
                                        <p className="text-sm text-neutral-700">{endpoint.description}</p>
                                    </div>

                                    {endpoint.parameters && endpoint.parameters.length > 0 && (
                                        <div className="mb-3">
                                            <h4 className="text-sm font-medium text-neutral-700 mb-2">Parameters</h4>
                                            <div className="border rounded-md overflow-hidden">
                                                <table className="min-w-full divide-y divide-neutral-200">
                                                    <thead className="bg-neutral-50">
                                                    <tr>
                                                        <th className="px-3 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Name</th>
                                                        <th className="px-3 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Type</th>
                                                        <th className="px-3 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Required</th>
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
                                            <h4 className="text-sm font-medium text-neutral-700 mb-2">Responses</h4>
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
                    <p className="text-neutral-600">No API endpoints documented</p>
                </div>
            )}
        </motion.div>
    );
};

export default ServiceEndpoints;