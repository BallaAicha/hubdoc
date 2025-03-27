import React from 'react';
import { motion } from 'framer-motion';
import {APIService} from "../../../types/api.ts";

interface ServiceHeaderProps {
    service: APIService;
}

const ServiceHeader: React.FC<ServiceHeaderProps> = ({ service }) => {
    return (
        <motion.div
            className="border-b border-neutral-200 pb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">{service.name}</h1>
            <p className="text-neutral-600">{service.description}</p>
        </motion.div>
    );
};

export default ServiceHeader;