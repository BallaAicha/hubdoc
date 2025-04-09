import React from 'react';
import { motion } from 'framer-motion';
import { Box, ArrowRight } from 'lucide-react';

interface TrigrammeGridProps {
    trigrammes: string[];
    selectedTrigramme: string | null;
    setSelectedTrigramme: (trigramme: string) => void;
    isLoading: boolean;
}

export function TrigrammeGrid({
                                  trigrammes,
                                  selectedTrigramme,
                                  setSelectedTrigramme,
                                  isLoading
                              }: TrigrammeGridProps) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="animate-pulse">
                        <div className="h-40 bg-neutral-100 rounded-2xl"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {trigrammes.map((trigramme) => (
                <motion.div key={trigramme} variants={item}>
                    <button
                        onClick={() => setSelectedTrigramme(trigramme)}
                        className={`group w-full h-40 p-6 rounded-2xl border-2 text-left transition-all duration-300 relative overflow-hidden ${
                            selectedTrigramme === trigramme
                                ? 'border-primary-500 bg-primary-50'
                                : 'border-neutral-200 bg-white hover:border-primary-300 hover:shadow-lg'
                        }`}
                    >
                        <div className="relative z-10">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className={`p-2 rounded-lg ${
                                    selectedTrigramme === trigramme
                                        ? 'bg-primary-100'
                                        : 'bg-neutral-100 group-hover:bg-primary-50'
                                } transition-colors`}>
                                    <Box className={`w-6 h-6 ${
                                        selectedTrigramme === trigramme
                                            ? 'text-primary-600'
                                            : 'text-neutral-600 group-hover:text-primary-600'
                                    } transition-colors`} />
                                </div>
                                <h3 className={`text-2xl font-bold ${
                                    selectedTrigramme === trigramme
                                        ? 'text-primary-700'
                                        : 'text-neutral-800 group-hover:text-primary-700'
                                } transition-colors`}>
                                    {trigramme}
                                </h3>
                            </div>

                            <p className="text-sm text-neutral-600 mb-4">
                                Explorez les services {trigramme}
                            </p>

                            <div className={`inline-flex items-center text-sm font-medium ${
                                selectedTrigramme === trigramme
                                    ? 'text-primary-600'
                                    : 'text-neutral-600 group-hover:text-primary-600'
                            } transition-colors`}>
                                Voir les services
                                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>

                        <div className={`absolute inset-0 bg-gradient-to-br ${
                            selectedTrigramme === trigramme
                                ? 'from-primary-50/50 to-primary-100/50'
                                : 'from-neutral-50/0 to-neutral-100/0 group-hover:from-primary-50/30 group-hover:to-primary-100/30'
                        } transition-all duration-500`} />
                    </button>
                </motion.div>
            ))}
        </motion.div>
    );
}

export default TrigrammeGrid;