import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceCard from "./ServiceCard.tsx";


interface AnimatedServicesListProps {
    selectedTrigramme: string;
    filteredServices: any[];
    selectedService: any;
    setSelectedService: (service: any) => void;
    closeMenuIfMobile?: () => void;
}

const AnimatedServicesList: React.FC<AnimatedServicesListProps> = ({
                                                                       selectedTrigramme,
                                                                       filteredServices,
                                                                       selectedService,
                                                                       setSelectedService,
                                                                       closeMenuIfMobile
                                                                   }) => {

    const handleServiceSelect = (service: any) => {
        setSelectedService(service);
        if (closeMenuIfMobile) {
            closeMenuIfMobile();
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
            >
                <h3 className="font-medium text-sm text-neutral-500 mb-2">
                    Services in {selectedTrigramme}
                </h3>
                <div className="space-y-2">
                    <AnimatePresence>
                        {filteredServices.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.05,
                                    type: "spring",
                                    stiffness: 100
                                }}
                            >
                                <ServiceCard
                                    service={service}
                                    isSelected={selectedService?.id === service.id}
                                    onSelect={() => handleServiceSelect(service)}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AnimatedServicesList;