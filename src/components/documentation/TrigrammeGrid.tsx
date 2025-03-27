import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { APIService } from '../../types/api';

interface TrigrammeGridProps {
    trigrammes: string[];
    selectedTrigramme: string | null;
    setSelectedTrigramme: (trigramme: string) => void;
    mockServices: APIService[];
}

const TrigrammeGrid: React.FC<TrigrammeGridProps> = ({
                                                         trigrammes,
                                                         selectedTrigramme,
                                                         setSelectedTrigramme,
                                                         mockServices
                                                     }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trigrammes.map((trigramme, index) => (
                <motion.button
                    key={trigramme}
                    onClick={() => setSelectedTrigramme(trigramme)}
                    className={clsx(
                        'p-6 rounded-xl border transition-all text-left transform',
                        selectedTrigramme === trigramme
                            ? 'bg-primary-50 border-primary-200 ring-2 ring-primary-500 ring-opacity-50'
                            : 'bg-white border-neutral-200 hover:border-primary-200 hover:shadow-lg'
                    )}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-neutral-900">{trigramme}</h2>
                            <p className="text-neutral-500 mt-2">
                                {mockServices.filter(s => s.trigramme === trigramme).length} services available
                            </p>
                        </div>
                        <div
                            className={clsx(
                                'w-10 h-10 rounded-full flex items-center justify-center',
                                selectedTrigramme === trigramme ? 'bg-primary-500' : 'bg-neutral-200'
                            )}
                        >
                            <span className="text-lg font-bold text-white">
                                {mockServices.filter(s => s.trigramme === trigramme).length}
                            </span>
                        </div>
                    </div>
                </motion.button>
            ))}
        </div>
    );
};

export default TrigrammeGrid;