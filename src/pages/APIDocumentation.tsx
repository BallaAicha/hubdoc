// import React, { useState } from 'react';
// import { mockServices } from '../types/api';
// import {BookOpen, ChevronRight, Code, Home, Menu, Search, X} from 'lucide-react';
// import clsx from 'clsx';
// import {ServiceDocumentation} from "../components/documentation/ServiceDocumentation.tsx";
//
//
//
// // Composant principal
// export function APIDocumentation() {
//     const [selectedTrigramme, setSelectedTrigramme] = useState<string | null>(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//     const [selectedService, setSelectedService] = useState<typeof mockServices[0] | null>(null);
//
//     // Get unique trigrammes
//     const trigrammes = Array.from(new Set(mockServices.map(service => service.trigramme))).sort();
//
//     // Filter services by trigramme and search term
//     const filteredServices = mockServices.filter(service => {
//         const matchesTrigramme = !selectedTrigramme || service.trigramme === selectedTrigramme;
//         const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             service.description.toLowerCase().includes(searchTerm.toLowerCase());
//         return matchesTrigramme && matchesSearch;
//     });
//
//     const toggleMobileMenu = () => {
//         setMobileMenuOpen(!mobileMenuOpen);
//     };
//
//
//
//     return (
//         <div className="min-h-screen bg-neutral-50 flex flex-col">
//             {/* Header */}
//             <header className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-sm">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6">
//                     <div className="flex justify-between h-16">
//                         <div className="flex">
//                             {/* Logo */}
//                             <div className="flex-shrink-0 flex items-center">
//                                 <button onClick={() => { setSelectedService(null); setSelectedTrigramme(null); }} className="flex items-center">
//                                     <div className="h-8 w-8 bg-primary-600 rounded flex items-center justify-center mr-2">
//                                         <Code className="h-5 w-5 text-white" />
//                                     </div>
//                                     <span className="font-bold text-xl text-neutral-800">API Hub</span>
//                                 </button>
//                             </div>
//                         </div>
//
//                         {/* Mobile menu button */}
//                         <div className="md:hidden flex items-center">
//                             <button
//                                 onClick={toggleMobileMenu}
//                                 className="inline-flex items-center justify-center p-2 rounded-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
//                             >
//                                 <span className="sr-only">Open menu</span>
//                                 <Menu className="h-6 w-6" />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </header>
//
//             <div className="flex-1 flex">
//                 {/* Sidebar */}
//                 <aside className="hidden md:block w-80 border-r border-neutral-200 bg-white">
//                     <div className="h-full flex flex-col">
//                         <div className="p-4 border-b border-neutral-200">
//                             <div className="relative">
//                                 <Search className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
//                                 <input
//                                     type="text"
//                                     placeholder="Search services..."
//                                     className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg"
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                 />
//                             </div>
//                         </div>
//
//                         <div className="flex-1 overflow-y-auto p-4">
//                             <div className="grid grid-cols-2 gap-2 mb-6">
//                                 {trigrammes.map((trigramme) => (
//                                     <button
//                                         key={trigramme}
//                                         onClick={() => setSelectedTrigramme(trigramme)}
//                                         className={clsx(
//                                             'p-3 rounded-lg border transition-all text-left',
//                                             selectedTrigramme === trigramme
//                                                 ? 'bg-primary-50 border-primary-200'
//                                                 : 'bg-white border-neutral-200 hover:border-primary-200'
//                                         )}
//                                     >
//                                         <div className="font-medium text-sm">{trigramme}</div>
//                                         <div className="text-xs text-neutral-500 mt-1">
//                                             {mockServices.filter(s => s.trigramme === trigramme).length} services
//                                         </div>
//                                     </button>
//                                 ))}
//                             </div>
//
//                             {selectedTrigramme && (
//                                 <div>
//                                     <h3 className="font-medium text-sm text-neutral-500 mb-2">
//                                         Services in {selectedTrigramme}
//                                     </h3>
//                                     <div className="space-y-2">
//                                         {filteredServices.map((service) => (
//                                             <button
//                                                 key={service.id}
//                                                 onClick={() => setSelectedService(service)}
//                                                 className={clsx(
//                                                     'w-full p-3 rounded-lg border text-left transition-all',
//                                                     selectedService?.id === service.id
//                                                         ? 'bg-primary-50 border-primary-200'
//                                                         : 'bg-white border-neutral-200 hover:border-primary-200'
//                                                 )}
//                                             >
//                                                 <div className="font-medium text-sm">{service.name}</div>
//                                                 <div className="text-xs text-neutral-500 mt-1">{service.description}</div>
//                                             </button>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </aside>
//
//                 {/* Mobile menu */}
//                 <div
//                     className={clsx(
//                         'fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden transition-opacity duration-300',
//                         mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
//                     )}
//                     onClick={toggleMobileMenu}
//                 >
//                     <div
//                         className={clsx(
//                             'fixed inset-y-0 left-0 w-full max-w-xs bg-white transform transition-transform duration-300',
//                             mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
//                         )}
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         <div className="h-full flex flex-col">
//                             <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
//                                 <h2 className="font-semibold text-lg">API Documentation</h2>
//                                 <button
//                                     onClick={toggleMobileMenu}
//                                     className="p-2 rounded-md text-neutral-500 hover:text-neutral-700"
//                                 >
//                                     <X className="h-5 w-5" />
//                                 </button>
//                             </div>
//
//                             <div className="p-4 border-b border-neutral-200">
//                                 <div className="relative">
//                                     <Search className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
//                                     <input
//                                         type="text"
//                                         placeholder="Search services..."
//                                         className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg"
//                                         value={searchTerm}
//                                         onChange={(e) => setSearchTerm(e.target.value)}
//                                     />
//                                 </div>
//                             </div>
//
//                             <div className="flex-1 overflow-y-auto p-4">
//                                 <div className="grid grid-cols-2 gap-2 mb-6">
//                                     {trigrammes.map((trigramme) => (
//                                         <button
//                                             key={trigramme}
//                                             onClick={() => setSelectedTrigramme(trigramme)}
//                                             className={clsx(
//                                                 'p-3 rounded-lg border transition-all text-left',
//                                                 selectedTrigramme === trigramme
//                                                     ? 'bg-primary-50 border-primary-200'
//                                                     : 'bg-white border-neutral-200 hover:border-primary-200'
//                                             )}
//                                         >
//                                             <div className="font-medium text-sm">{trigramme}</div>
//                                             <div className="text-xs text-neutral-500 mt-1">
//                                                 {mockServices.filter(s => s.trigramme === trigramme).length} services
//                                             </div>
//                                         </button>
//                                     ))}
//                                 </div>
//
//                                 {selectedTrigramme && (
//                                     <div>
//                                         <h3 className="font-medium text-sm text-neutral-500 mb-2">
//                                             Services in {selectedTrigramme}
//                                         </h3>
//                                         <div className="space-y-2">
//                                             {filteredServices.map((service) => (
//                                                 <button
//                                                     key={service.id}
//                                                     onClick={() => {
//                                                         setSelectedService(service);
//                                                         setMobileMenuOpen(false);
//                                                     }}
//                                                     className={clsx(
//                                                         'w-full p-3 rounded-lg border text-left transition-all',
//                                                         selectedService?.id === service.id
//                                                             ? 'bg-primary-50 border-primary-200'
//                                                             : 'bg-white border-neutral-200 hover:border-primary-200'
//                                                     )}
//                                                 >
//                                                     <div className="font-medium text-sm">{service.name}</div>
//                                                     <div className="text-xs text-neutral-500 mt-1">{service.description}</div>
//                                                 </button>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//
//                 {/* Main content */}
//                 <main className="flex-1 overflow-y-auto bg-neutral-50">
//                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                         {selectedService ? (
//                             <>
//                                 {/* Breadcrumb */}
//                                 <div className="mb-6 flex items-center space-x-2 text-sm">
//                                     <button
//                                         onClick={() => setSelectedService(null)}
//                                         className="text-neutral-500 hover:text-neutral-700"
//                                     >
//                                         <Home className="h-4 w-4" />
//                                     </button>
//                                     <ChevronRight className="h-4 w-4 text-neutral-400" />
//                                     <span className="text-neutral-500">{selectedService.trigramme}</span>
//                                     <ChevronRight className="h-4 w-4 text-neutral-400" />
//                                     <span className="font-medium text-neutral-900">{selectedService.name}</span>
//                                 </div>
//
//                                 <ServiceDocumentation service={selectedService} />
//                             </>
//                         ) : (
//                             <div className="max-w-4xl mx-auto">
//                                 <div className="text-center mb-12">
//                                     <div className="inline-flex items-center justify-center p-2 bg-primary-100 rounded-full mb-4">
//                                         <div className="bg-primary-600 rounded-full p-2">
//                                             <BookOpen className="h-6 w-6 text-white" />
//                                         </div>
//                                     </div>
//                                     <h1 className="text-4xl font-bold text-neutral-900 mb-4">API Documentation</h1>
//                                     <p className="text-xl text-neutral-600">
//                                         Select a trigramme to explore available services
//                                     </p>
//                                 </div>
//
//                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                                     {trigrammes.map((trigramme) => (
//                                         <button
//                                             key={trigramme}
//                                             onClick={() => setSelectedTrigramme(trigramme)}
//                                             className={clsx(
//                                                 'p-6 rounded-xl border transition-all text-left',
//                                                 selectedTrigramme === trigramme
//                                                     ? 'bg-primary-50 border-primary-200 ring-2 ring-primary-500 ring-opacity-50'
//                                                     : 'bg-white border-neutral-200 hover:border-primary-200 hover:shadow-lg'
//                                             )}
//                                         >
//                                             <h2 className="text-2xl font-bold text-neutral-900">{trigramme}</h2>
//                                             <p className="text-neutral-500 mt-2">
//                                                 {mockServices.filter(s => s.trigramme === trigramme).length} services available
//                                             </p>
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </main>
//             </div>
//         </div>
//     );
// }
import { useState } from 'react';
import { mockServices } from '../types/api';
import { BookOpen, ChevronRight, Home } from 'lucide-react';
import HeaderDoc from "../components/documentation/HeaderDoc.tsx";
import Sidebar from "../components/documentation/Sidebar.tsx";
import MobileMenu from "../components/documentation/MobileMenu.tsx";
import ServiceDocumentationContainer from "../components/documentation/ServiceDocumentationContainer.tsx";
import TrigrammeGrid from "../components/documentation/TrigrammeGrid.tsx";


// Composant principal
export function APIDocumentation() {
    const [selectedTrigramme, setSelectedTrigramme] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<typeof mockServices[0] | null>(null);

    // Get unique trigrammes
    const trigrammes = Array.from(new Set(mockServices.map(service => service.trigramme))).sort();

    // Filter services by trigramme and search term
    const filteredServices = mockServices.filter(service => {
        const matchesTrigramme = !selectedTrigramme || service.trigramme === selectedTrigramme;
        const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTrigramme && matchesSearch;
    });

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    // Reset selection
    const resetSelection = () => {
        setSelectedService(null);
        setSelectedTrigramme(null);
    };

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            {/* Header */}
            <HeaderDoc resetSelection={resetSelection} toggleMobileMenu={toggleMobileMenu} />

            <div className="flex-1 flex">
                {/* Sidebar */}
                <Sidebar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedTrigramme={selectedTrigramme}
                    setSelectedTrigramme={setSelectedTrigramme}
                    selectedService={selectedService}
                    setSelectedService={setSelectedService}
                    trigrammes={trigrammes}
                    filteredServices={filteredServices}
                />

                {/* Mobile menu */}
                <MobileMenu
                    mobileMenuOpen={mobileMenuOpen}
                    toggleMobileMenu={toggleMobileMenu}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedTrigramme={selectedTrigramme}
                    setSelectedTrigramme={setSelectedTrigramme}
                    selectedService={selectedService}
                    setSelectedService={setSelectedService}
                    trigrammes={trigrammes}
                    filteredServices={filteredServices}
                />

                {/* Main content */}
                <main className="flex-1 overflow-y-auto bg-neutral-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {selectedService ? (
                            <>
                                {/* Breadcrumb */}
                                <div className="mb-6 flex items-center space-x-2 text-sm">
                                    <button
                                        onClick={() => setSelectedService(null)}
                                        className="text-neutral-500 hover:text-neutral-700 transition-colors"
                                    >
                                        <Home className="h-4 w-4" />
                                    </button>
                                    <ChevronRight className="h-4 w-4 text-neutral-400" />
                                    <span className="text-neutral-500">{selectedService.trigramme}</span>
                                    <ChevronRight className="h-4 w-4 text-neutral-400" />
                                    <span className="font-medium text-neutral-900">{selectedService.name}</span>
                                </div>

                                <ServiceDocumentationContainer service={selectedService} />
                            </>
                        ) : (
                            <div className="max-w-4xl mx-auto">
                                <div
                                    className="text-center mb-12"
                                    data-aos="fade-down"
                                    data-aos-duration="800"
                                >
                                    <div className="inline-flex items-center justify-center p-2 bg-primary-100 rounded-full mb-4">
                                        <div className="bg-primary-600 rounded-full p-2">
                                            <BookOpen className="h-6 w-6 text-white" />
                                        </div>
                                    </div>
                                    <h1 className="text-4xl font-bold text-neutral-900 mb-4">API Documentation</h1>
                                    <p className="text-xl text-neutral-600">
                                        Select a trigramme to explore available services
                                    </p>
                                </div>

                                <TrigrammeGrid
                                    trigrammes={trigrammes}
                                    selectedTrigramme={selectedTrigramme}
                                    setSelectedTrigramme={setSelectedTrigramme}
                                    mockServices={mockServices}
                                />
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default APIDocumentation;