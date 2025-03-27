import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface ServiceDataSourcesProps {
    dataSources: Record<string, boolean>;
}

const ServiceDataSources: React.FC<ServiceDataSourcesProps> = ({ dataSources }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
        >
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Data Sources</h2>
            <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
                <table className="min-w-full divide-y divide-neutral-200">
                    <thead className="bg-neutral-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Source</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-neutral-200">
                    {Object.entries(dataSources).map(([source, isUsed], index) => (
                        <motion.tr
                            key={source}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: 0.4 + (index * 0.05) }}
                        >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                                {source.replace(/([A-Z])/g, ' $1').trim()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {isUsed ? (
                                    <motion.div
                                        whileHover={{ scale: 1.2 }}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200 }}
                                    >
                                        <Check className="h-5 w-5 text-green-500" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        whileHover={{ scale: 1.2 }}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200 }}
                                    >
                                        <X className="h-5 w-5 text-red-500" />
                                    </motion.div>
                                )}
                            </td>
                        </motion.tr>
                    ))}
                    </tbody>
                </table>
                {Object.keys(dataSources).length === 0 && (
                    <div className="px-6 py-4 text-sm text-neutral-500 text-center">
                        No data sources available
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ServiceDataSources;