import { useState, useEffect } from 'react';
import {ChevronRight, Home, Search, Globe, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HeaderDoc from "../components/documentation/HeaderDoc.tsx";
import Sidebar from "../components/documentation/Sidebar.tsx";
import MobileMenu from "../components/documentation/MobileMenu.tsx";
import ServiceDocumentationContainer from "../components/documentation/ServiceDocumentationContainer.tsx";
import TrigrammeGrid from "../components/documentation/TrigrammeGrid.tsx";

import { APIService } from '../types/api';
import { useQueryClient } from '@tanstack/react-query';
import { useTrigrammes } from "../hooks/apis/useTrigrammes.ts";
import { useServicesByTrigramme } from "../hooks/apis/useServicesByTrigramme.ts";
import { useService } from "../hooks/apis/useService.ts";
import {Footer} from "../components/commons/Footer.tsx";


export function APIDocumentation() {
    const [selectedTrigramme, setSelectedTrigramme] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    // Fetch data using custom hooks
    const { data: trigrammes = [], isLoading: trigrammesLoading } = useTrigrammes();
    const { data: servicesForTrigramme = [], isLoading: servicesLoading } = useServicesByTrigramme(selectedTrigramme);
    const { data: selectedService, isLoading: serviceDetailLoading } = useService(selectedServiceId);

    const queryClient = useQueryClient();

    useEffect(() => {
        // Simulate page loading effect
        const timer = setTimeout(() => {
            setIsPageLoaded(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    // Filter services by search term
    const filteredServices = servicesForTrigramme.filter(service => {
        const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    // Handle service selection
    const handleServiceSelection = (service: APIService) => {
        setSelectedServiceId(service.id);
        // Prefetch service details for better UX
        queryClient.prefetchQuery({
            queryKey: ['service', service.id],
            queryFn: () => service
        });
    };

    // Reset selection
    const resetSelection = () => {
        setSelectedServiceId(null);
        setSelectedTrigramme(null);
    };

    const LoadingSpinner = () => (
        <div className="flex flex-col items-center justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
            <p className="mt-4 text-primary-600 font-medium">Chargement en cours...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex flex-col">
            {/* Header */}
            <HeaderDoc resetSelection={resetSelection} toggleMobileMenu={toggleMobileMenu} />

            <div className="flex-1 flex">
                {/* Sidebar */}
                <Sidebar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedTrigramme={selectedTrigramme}
                    setSelectedTrigramme={setSelectedTrigramme}
                    selectedService={selectedService || null}
                    setSelectedService={handleServiceSelection}
                    trigrammes={trigrammes}
                    filteredServices={filteredServices}
                    isLoading={trigrammesLoading || servicesLoading}
                />

                {/* Mobile menu */}
                <MobileMenu
                    mobileMenuOpen={mobileMenuOpen}
                    toggleMobileMenu={toggleMobileMenu}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedTrigramme={selectedTrigramme}
                    setSelectedTrigramme={setSelectedTrigramme}
                    selectedService={selectedService || null}
                    setSelectedService={handleServiceSelection}
                    trigrammes={trigrammes}
                    filteredServices={filteredServices}
                    isLoading={trigrammesLoading || servicesLoading}
                />

                {/* Main content */}
                <main className="flex-1 overflow-y-auto bg-transparent">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedServiceId || 'home'}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
                        >
                            {selectedService ? (
                                <>
                                    {/* Breadcrumb - Stylized */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="mb-6 flex items-center space-x-2 text-sm bg-white shadow-sm rounded-lg p-3 border border-neutral-100"
                                    >
                                        <button
                                            onClick={() => setSelectedServiceId(null)}
                                            className="text-primary-500 hover:text-primary-700 transition-all hover:scale-110"
                                            aria-label="Retour à l'accueil"
                                        >
                                            <Home className="h-5 w-5" />
                                        </button>
                                        <ChevronRight className="h-4 w-4 text-neutral-400" />
                                        <span
                                            className="text-neutral-500 hover:text-neutral-700 cursor-pointer"
                                            onClick={() => {
                                                setSelectedServiceId(null);
                                                setSelectedTrigramme(selectedService.trigramme);
                                            }}
                                        >
                                            {selectedService.trigramme}
                                        </span>
                                        <ChevronRight className="h-4 w-4 text-neutral-400" />
                                        <span className="font-medium text-neutral-900 truncate max-w-xs">{selectedService.name}</span>
                                    </motion.div>

                                    {serviceDetailLoading ? (
                                        <LoadingSpinner />
                                    ) : (
                                        <ServiceDocumentationContainer service={selectedService} />
                                    )}
                                </>
                            ) : (
                                <div className="max-w-4xl mx-auto">
                                    <motion.div
                                        className="text-center mb-16 mt-8"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.7 }}
                                    >
                                        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full mb-6 shadow-md">
                                            <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-full p-3 shadow-inner">
                                                <Code className="h-8 w-8 text-white" />
                                            </div>
                                        </div>
                                        <h1 className="text-5xl font-bold text-neutral-900 mb-6 tracking-tight">
                                            Documentation API SGABS<span className="text-primary-600">.</span>
                                        </h1>
                                        <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                                            Explorez notre catalogue de services API en sélectionnant un trigramme ci-dessous.
                                            Chaque service est documenté avec des exemples d'utilisation et des spécifications détaillées.
                                        </p>

                                        {/* Recherche globale */}
                                        <div className="mt-8 mb-12 max-w-md mx-auto">
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Search className="h-5 w-5 text-neutral-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Rechercher un service..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    className="block w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-xl bg-white shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all"
                                                />
                                            </div>
                                            {searchTerm && filteredServices.length > 0 && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="mt-2 text-sm text-neutral-500"
                                                >
                                                    {filteredServices.length} résultat(s) trouvé(s)
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>

                                    {trigrammesLoading ? (
                                        <LoadingSpinner />
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <TrigrammeGrid
                                                trigrammes={trigrammes}
                                                selectedTrigramme={selectedTrigramme}
                                                setSelectedTrigramme={setSelectedTrigramme}
                                                isLoading={servicesLoading}
                                            />
                                        </motion.div>
                                    )}

                                    {/* Section d'information supplémentaire */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5, duration: 0.7 }}
                                        className="mt-24 bg-white rounded-xl shadow-md p-8 border border-neutral-100"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center gap-6 text-left">
                                            <div className="bg-primary-100 rounded-full p-4 md:p-5">
                                                <Globe className="h-8 w-8 md:h-10 md:w-10 text-primary-600" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-neutral-900 mb-2">Accès  aux API  de SGABS</h2>
                                                <p className="text-neutral-600">
                                                    Cette  plateforme de documentation fournit un accès centralisé à toutes les API
                                                    disponibles au niveau de SGABS ..
                                                </p>
                                                <div className="mt-4">
                                                    <a
                                                        href="#"
                                                        className="inline-flex items-center font-medium text-primary-600 hover:text-primary-800"
                                                    >
                                                        Voir les standards API
                                                        <ChevronRight className="ml-1 h-4 w-4" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            {/* Footer */}
            <Footer />

        </div>
    );
}

export default APIDocumentation;