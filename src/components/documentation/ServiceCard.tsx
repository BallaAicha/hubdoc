import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface ServiceCardProps {
    service: any;
    isSelected: boolean;
    onSelect: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isSelected, onSelect }) => {
    return (
        <motion.button
            onClick={onSelect}
            className={clsx(
                'w-full p-3 rounded-lg border text-left transition-all',
                isSelected
                    ? 'bg-primary-50 border-primary-200'
                    : 'bg-white border-neutral-200 hover:border-primary-200'
            )}
            whileHover={{
                y: -2,
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
            }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="font-medium text-sm">{service.name}</div>
            <div className="text-xs text-neutral-500 mt-1">{service.description}</div>
        </motion.button>
    );
};

export default ServiceCard;