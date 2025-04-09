import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Info, CircleDot, Coffee, Database, GitBranch } from 'lucide-react';

interface ServiceCardProps {
    service: {
        id: string,
        name: string,
        description: string,
        bridgeCommunication: boolean,
        criticality: 'Critique' | 'Moyenne' | 'Faible',
        poCoedev: string,
        techlead: string,
        java17Migrated: boolean,
        sonarized: boolean,
        version: string
    };
    onSelect: () => void;
}

const criticalityColor = {
    Critique: 'bg-red-500',
    Moyenne: 'bg-yellow-500',
    Faible: 'bg-green-500'
};

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
    return (
        <motion.div
            onClick={onSelect}
            className="cursor-pointer rounded-xl bg-white shadow-lg border border-neutral-200 hover:scale-105 transition-all p-6 flex flex-col gap-4 relative overflow-hidden"
            whileHover={{ boxShadow: "0 10px 15px rgba(0,0,0,0.1)", y: -5 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Criticality Indicator */}
            <div className={clsx("absolute top-0 left-0 w-full h-1", criticalityColor[service.criticality])}></div>

            {/* Service Name */}
            <h2 className="text-xl font-semibold text-neutral-800 truncate">{service.name}</h2>

            {/* Description (Shortened) */}
            <p className="text-sm text-neutral-600 min-h-[3rem] line-clamp-2">{service.description}</p>

            {/* Highlighted Metadata Information */}
            <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-1 text-sm text-neutral-600">
                    <Database className="w-4 h-4 text-primary-600" />Version: <span className="font-medium">{service.version}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                    <CircleDot className="w-4 h-4 text-primary-600" /> Bridge:
                    {service.bridgeCommunication ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-red-500" />}
                </div>
                <div className="flex items-center gap-1 text-sm">
                    <Coffee className="w-4 h-4 text-primary-600" /> Java17:
                    {service.java17Migrated ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-red-500" />}
                </div>
                <div className="flex items-center gap-1 text-sm">
                    <GitBranch className="w-4 h-4 text-primary-600" /> Sonar:
                    {service.sonarized ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-red-500" />}
                </div>
            </div>

            <div className="border-t pt-3 mt-1 flex flex-col gap-1 text-xs">
                <div><Info className="inline w-3 h-3 text-primary-600 mr-1" /> <strong>PO CoEDev:</strong> {service.poCoedev}</div>
                <div><Info className="inline w-3 h-3 text-primary-600 mr-1" /> <strong>Techlead:</strong> {service.techlead}</div>
            </div>

            {/* Criticality Badge */}
            <span className={clsx(
                "absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-semibold text-white shadow",
                criticalityColor[service.criticality])}>
        {service.criticality}
      </span>
        </motion.div>
    );
};

export default ServiceCard;