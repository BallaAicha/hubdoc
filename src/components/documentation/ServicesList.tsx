// import React from 'react';
// import { motion } from 'framer-motion';
// import { APIService } from '../../types/api';
// import { Shield, GitBranch, CheckCircle2, AlertCircle } from 'lucide-react';
//
// interface ServicesListProps {
//     services: APIService[];
//     selectedService: APIService | null;
//     onSelectService: (service: APIService) => void;
// }
//
// const ServicesList: React.FC<ServicesListProps> = ({
//                                                        services,
//                                                        onSelectService
//                                                    }) => {
//     const isEmpty = services.length === 0;
//
//     const getCriticalityData = (criticality: string) => {
//         switch (criticality?.toLowerCase()) {
//             case 'critique':
//                 return {
//                     color: 'bg-red-100 text-red-700 border-red-200',
//                     icon: <AlertCircle className="w-4 h-4" />
//                 };
//             case 'haute':
//                 return {
//                     color: 'bg-orange-100 text-orange-700 border-orange-200',
//                     icon: <Shield className="w-4 h-4" />
//                 };
//             case 'moyenne':
//                 return {
//                     color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
//                     icon: <Shield className="w-4 h-4" />
//                 };
//             case 'basse':
//                 return {
//                     color: 'bg-green-100 text-green-700 border-green-200',
//                     icon: <CheckCircle2 className="w-4 h-4" />
//                 };
//             default:
//                 return {
//                     color: 'bg-gray-100 text-gray-700 border-gray-200',
//                     icon: <Shield className="w-4 h-4" />
//                 };
//         }
//     };
//
//     if (isEmpty) {
//         return (
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="text-center py-16 bg-white rounded-2xl shadow-lg border border-neutral-100"
//             >
//                 <div className="text-neutral-500">Aucun service trouvé pour cette recherche</div>
//             </motion.div>
//         );
//     }
//
//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {services.map((service, index) => {
//                 const criticalityData = getCriticalityData(service.criticality);
//
//                 return (
//                     <motion.div
//                         key={service.id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{
//                             duration: 0.4,
//                             delay: index * 0.1,
//                             type: "spring",
//                             stiffness: 100
//                         }}
//                         whileHover={{
//                             y: -5,
//                             transition: { duration: 0.2 }
//                         }}
//                         className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden transition-all cursor-pointer hover:border-primary-300 hover:shadow-xl"
//                         onClick={() => onSelectService(service)}
//                     >
//                         <div className="p-6 space-y-4">
//                             <div className="flex items-start justify-between">
//                                 <h3 className="font-semibold text-xl text-neutral-900 group-hover:text-primary-600 transition-colors">
//                                     {service.name}
//                                 </h3>
//                                 <div className="flex space-x-2">
//                                     {service.bridgeCommunication && (
//                                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
//                                             <GitBranch className="w-3 h-3 mr-1" />
//                                             Bridge
//                                         </span>
//                                     )}
//                                 </div>
//                             </div>
//
//                             <p className="text-neutral-600 text-sm line-clamp-2">
//                                 {service.description}
//                             </p>
//
//                             <div className="flex items-center space-x-2">
//                                 <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${criticalityData.color}`}>
//                                     {criticalityData.icon}
//                                     <span className="ml-1">{service.criticality || 'Non définie'}</span>
//                                 </span>
//                             </div>
//
//                             <div className="grid grid-cols-2 gap-3 pt-2">
//                                 <div className="space-y-2">
//                                     <div className="text-sm">
//                                         <span className="text-neutral-500">PO/CoEDev:</span>
//                                         <p className="font-medium text-neutral-800 truncate">{service.poCoedev || 'N/A'}</p>
//                                     </div>
//                                     <div className="text-sm">
//                                         <span className="text-neutral-500">Techlead:</span>
//                                         <p className="font-medium text-neutral-800 truncate">{service.techlead || 'N/A'}</p>
//                                     </div>
//                                 </div>
//                                 <div className="space-y-2">
//                                     <div className="flex items-center text-sm">
//                                         <span className={`w-2 h-2 rounded-full mr-2 ${service.java17Migrated ? 'bg-green-500' : 'bg-red-500'}`}></span>
//                                         <span className="text-neutral-600">Java 17</span>
//                                     </div>
//                                     <div className="flex items-center text-sm">
//                                         <span className={`w-2 h-2 rounded-full mr-2 ${service.sonarized ? 'bg-green-500' : 'bg-red-500'}`}></span>
//                                         <span className="text-neutral-600">Sonar</span>
//                                     </div>
//                                 </div>
//                             </div>
//
//                             <div className="pt-3 border-t border-neutral-100">
//                                 <div className="flex justify-between items-center">
//                                     <span className="text-xs text-neutral-500">
//                                         Dernière mise à jour: {new Date().toLocaleDateString()}
//                                     </span>
//                                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-200">
//                                         v{service.version || '1.0'}
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                     </motion.div>
//                 );
//             })}
//         </div>
//     );
// };
//
// export default ServicesList;

import React from 'react';
import { motion } from 'framer-motion';
import { APIService } from '../../types/api';
import {
    Shield,
    GitBranch,
    CheckCircle2,
    AlertCircle,
    Calendar,
    User,
    Code,
    BarChart4,
    Eye,
    ChevronRight
} from 'lucide-react';
import clsx from 'clsx';

interface ServicesListProps {
    services: APIService[];
    selectedService: APIService | null;
    onSelectService: (service: APIService) => void;
}

const ServicesList: React.FC<ServicesListProps> = ({
                                                       services,
                                                       onSelectService
                                                   }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    const getCriticalityData = (criticality: string) => {
        switch (criticality?.toLowerCase()) {
            case 'critique':
                return {
                    color: 'bg-red-50 text-red-700 border-red-200',
                    badgeColor: 'bg-red-700',
                    hoverColor: 'group-hover:bg-red-100',
                    highlightColor: 'bg-red-700/10',
                    icon: <AlertCircle className="w-4 h-4" />,
                    label: 'Criticité Critique'
                };
            case 'haute':
                return {
                    color: 'bg-orange-50 text-orange-700 border-orange-200',
                    badgeColor: 'bg-orange-700',
                    hoverColor: 'group-hover:bg-orange-100',
                    highlightColor: 'bg-orange-700/10',
                    icon: <Shield className="w-4 h-4" />,
                    label: 'Criticité Haute'
                };
            case 'moyenne':
                return {
                    color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
                    badgeColor: 'bg-yellow-700',
                    hoverColor: 'group-hover:bg-yellow-100',
                    highlightColor: 'bg-yellow-700/10',
                    icon: <Shield className="w-4 h-4" />,
                    label: 'Criticité Moyenne'
                };
            case 'basse':
                return {
                    color: 'bg-green-50 text-green-700 border-green-200',
                    badgeColor: 'bg-green-700',
                    hoverColor: 'group-hover:bg-green-100',
                    highlightColor: 'bg-green-700/10',
                    icon: <CheckCircle2 className="w-4 h-4" />,
                    label: 'Criticité Basse'
                };
            default:
                return {
                    color: 'bg-gray-50 text-gray-700 border-gray-200',
                    badgeColor: 'bg-gray-700',
                    hoverColor: 'group-hover:bg-gray-100',
                    highlightColor: 'bg-gray-700/10',
                    icon: <Shield className="w-4 h-4" />,
                    label: 'Criticité Non définie'
                };
        }
    };

    if (services.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20 bg-white rounded-xl shadow-lg border border-neutral-100"
            >
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="p-4 rounded-full bg-neutral-50">
                        <Eye className="w-10 h-10 text-neutral-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-700">Aucun service trouvé</h3>
                    <p className="text-neutral-500 max-w-md">
                        Aucun service ne correspond à votre recherche. Veuillez modifier vos critères et réessayer.
                    </p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {services.map((service) => {
                const criticalityData = getCriticalityData(service.criticality);

                return (
                    <motion.div
                        key={service.id}
                        variants={itemVariants}
                        whileHover={{
                            y: -5,
                            transition: { duration: 0.2 }
                        }}
                        className={clsx(
                            "group bg-white rounded-xl border border-neutral-200 overflow-hidden transition-all cursor-pointer",
                            "hover:border-primary-300 hover:shadow-xl relative"
                        )}
                        onClick={() => onSelectService(service)}
                    >
                        {/* Criticality indicator line at top */}
                        <div className={`h-1.5 w-full ${criticalityData.badgeColor}`}></div>

                        <div className="p-6 space-y-5">
                            {/* Header with name and badge */}
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center">
                                        <h2 className="font-bold text-xl text-neutral-900 group-hover:text-primary-700 transition-colors mr-2">
                                            {service.name}
                                        </h2>
                                        <span className="text-sm font-medium text-neutral-500 px-2 py-0.5 bg-neutral-100 rounded">
                      {service.trigramme}
                    </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${criticalityData.color}`}>
                      {criticalityData.icon}
                        <span className="ml-1 capitalize">{service.criticality || 'Non définie'}</span>
                    </span>

                                        {service.bridgeCommunication && (
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        <GitBranch className="w-3 h-3 mr-1" />
                        Bridge
                      </span>
                                        )}
                                    </div>
                                </div>

                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-200">
                  v{service.version || '1.0'}
                </span>
                            </div>

                            {/* Description section */}
                            <div className={`p-3 rounded-lg ${criticalityData.highlightColor} border border-${criticalityData.color.split(' ')[1]}`}>
                                <p className="text-neutral-700 line-clamp-2">
                                    {service.description}
                                </p>
                            </div>

                            {/* Team information */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <h4 className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Équipe</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <div className="h-7 w-7 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                                                <User className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <span className="text-xs text-neutral-500 block">PO/CoEDev</span>
                                                <span className="font-medium text-neutral-900">{service.poCoedev || 'N/A'}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <div className="h-7 w-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700">
                                                <Code className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <span className="text-xs text-neutral-500 block">Techlead</span>
                                                <span className="font-medium text-neutral-900">{service.techlead || 'N/A'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Technical information */}
                                <div className="space-y-3">
                                    <h4 className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Statut Technique</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <div className={`w-3 h-3 rounded-full ${service.java17Migrated ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-neutral-700">Java 17</span>
                                                    <span className={`text-xs font-medium ${service.java17Migrated ? 'text-green-600' : 'text-red-600'}`}>
                            {service.java17Migrated ? 'Migré' : 'Non migré'}
                          </span>
                                                </div>
                                                <div className="w-full bg-neutral-200 rounded-full h-1.5 mt-1">
                                                    <div className={`h-1.5 rounded-full ${service.java17Migrated ? 'bg-green-500' : 'bg-red-500'}`}
                                                         style={{ width: service.java17Migrated ? '100%' : '0%' }}>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <div className={`w-3 h-3 rounded-full ${service.sonarized ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-neutral-700">Sonarization</span>
                                                    <span className={`text-xs font-medium ${service.sonarized ? 'text-green-600' : 'text-red-600'}`}>
                            {service.sonarized ? 'Sonarisé' : 'Non sonarisé'}
                          </span>
                                                </div>
                                                <div className="w-full bg-neutral-200 rounded-full h-1.5 mt-1">
                                                    <div className={`h-1.5 rounded-full ${service.sonarized ? 'bg-green-500' : 'bg-red-500'}`}
                                                         style={{ width: service.sonarized ? '100%' : '0%' }}>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="pt-3 border-t border-neutral-100">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center text-neutral-500 text-xs">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        Mis à jour le {new Date().toLocaleDateString('fr-FR', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}
                                    </div>
                                    <button className="text-primary-600 font-medium text-sm flex items-center group-hover:text-primary-700">
                                        Détails <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </motion.div>
    );
};

export default ServicesList;