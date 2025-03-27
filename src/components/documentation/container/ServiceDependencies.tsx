import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface ServiceDependenciesProps {
    consumes: string[];
    consumedBy: string[];
}

const ServiceDependencies: React.FC<ServiceDependenciesProps> = ({ consumes, consumedBy }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
        >
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Dependencies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border border-neutral-200 p-5">
                    <h3 className="text-lg font-medium text-neutral-700 flex items-center mb-3">
                        <ArrowRight className="h-5 w-5 text-blue-500 mr-2" />
                        Consumes
                    </h3>
                    {consumes && consumes.length > 0 ? (
                        <ul className="space-y-2">
                            {consumes.map((service, index) => (
                                <motion.li
                                    key={service}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2, delay: 0.5 + (index * 0.05) }}
                                    className="px-3 py-2 bg-neutral-50 rounded-md text-sm text-neutral-800"
                                >
                                    {service}
                                </motion.li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-neutral-500">No services consumed</p>
                    )}
                </div>

                <div className="bg-white rounded-lg border border-neutral-200 p-5">
                    <h3 className="text-lg font-medium text-neutral-700 flex items-center mb-3">
                        <ArrowLeft className="h-5 w-5 text-green-500 mr-2" />
                        Consumed By
                    </h3>
                    {consumedBy && consumedBy.length > 0 ? (
                        <ul className="space-y-2">
                            {consumedBy.map((service, index) => (
                                <motion.li
                                    key={service}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2, delay: 0.5 + (index * 0.05) }}
                                    className="px-3 py-2 bg-neutral-50 rounded-md text-sm text-neutral-800"
                                >
                                    {service}
                                </motion.li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-neutral-500">Not consumed by any service</p>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ServiceDependencies;