import React from 'react';
import { motion } from 'framer-motion';

interface ServiceClientsProps {
    clients: string[];
}

const ServiceClients: React.FC<ServiceClientsProps> = ({ clients }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
        >
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Client Consumers</h2>
            <div className="flex flex-wrap gap-2">
                {clients.map((client, index) => (
                    <motion.span
                        key={client}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.3,
                            delay: 0.3 + (index * 0.05),
                            type: "spring",
                            stiffness: 100
                        }}
                        whileHover={{
                            scale: 1.05,
                            backgroundColor: 'rgba(var(--color-primary-200))'
                        }}
                    >
                        {client}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
};

export default ServiceClients;