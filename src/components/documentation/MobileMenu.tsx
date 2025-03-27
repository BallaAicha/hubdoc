import React from 'react';
import { Search, X } from 'lucide-react';
import clsx from 'clsx';
import AnimatedServicesList from "./AnimatedServicesList.tsx";


interface MobileMenuProps {
    mobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    selectedTrigramme: string | null;
    setSelectedTrigramme: (trigramme: string) => void;
    selectedService: any;
    setSelectedService: (service: any) => void;
    trigrammes: string[];
    filteredServices: any[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({
                                                   mobileMenuOpen,
                                                   toggleMobileMenu,
                                                   searchTerm,
                                                   setSearchTerm,
                                                   selectedTrigramme,
                                                   setSelectedTrigramme,
                                                   selectedService,
                                                   setSelectedService,
                                                   trigrammes,
                                                   filteredServices,
                                               }) => {
    return (
        <div
            className={clsx(
                'fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden transition-opacity duration-300',
                mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            )}
            onClick={toggleMobileMenu}
        >
            <div
                className={clsx(
                    'fixed inset-y-0 left-0 w-full max-w-xs bg-white transform transition-transform duration-300 ease-in-out',
                    mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                )}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="h-full flex flex-col">
                    <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
                        <h2 className="font-semibold text-lg">API Documentation</h2>
                        <button
                            onClick={toggleMobileMenu}
                            className="p-2 rounded-md text-neutral-500 hover:text-neutral-700 transition-colors"
                            aria-label="Close menu"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="p-4 border-b border-neutral-200">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
                            <input
                                type="text"
                                placeholder="Search services..."
                                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="grid grid-cols-2 gap-2 mb-6">
                            {trigrammes.map((trigramme) => (
                                <button
                                    key={trigramme}
                                    onClick={() => setSelectedTrigramme(trigramme)}
                                    className={clsx(
                                        'p-3 rounded-lg border transition-all text-left',
                                        selectedTrigramme === trigramme
                                            ? 'bg-primary-50 border-primary-200'
                                            : 'bg-white border-neutral-200 hover:border-primary-200'
                                    )}
                                >
                                    <div className="font-medium text-sm">{trigramme}</div>
                                    <div className="text-xs text-neutral-500 mt-1">
                                        {filteredServices.filter(s => s.trigramme === trigramme).length} services
                                    </div>
                                </button>
                            ))}
                        </div>

                        {selectedTrigramme && (
                            <AnimatedServicesList
                                selectedTrigramme={selectedTrigramme}
                                filteredServices={filteredServices}
                                selectedService={selectedService}
                                setSelectedService={setSelectedService}
                                closeMenuIfMobile={toggleMobileMenu}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;