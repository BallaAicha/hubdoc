import React from 'react';
import { motion } from 'framer-motion';

interface ServiceInfrastructureProps {
    infrastructure: Record<string, string>;
}

const ServiceInfrastructure: React.FC<ServiceInfrastructureProps> = ({ infrastructure }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
        >
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Infrastructure</h2>
            <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
                <table className="min-w-full divide-y divide-neutral-200">
                    <thead className="bg-neutral-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Environment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">URL</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-neutral-200">
                    {Object.entries(infrastructure).map(([env, url], index) => (
                        <motion.tr
                            key={env}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: 0.1 + (index * 0.05) }}
                        >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                                {env.replace('url_', '').toUpperCase()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                                <code className="bg-neutral-100 px-2 py-1 rounded">{url}</code>
                            </td>
                        </motion.tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default ServiceInfrastructure;