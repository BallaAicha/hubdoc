

export function Footer() {
    return (
        <footer className="bg-neutral-800 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Logo et description */}
                        <div>
                            <div className="flex items-center space-x-3 mb-6">
                                <img
                                    src="/src/logo.jpeg"
                                    alt="Logo"
                                    className="h-8 w-auto bg-white rounded-md p-1"
                                />
                                <span className="font-bold text-xl">DOC HUB</span>
                            </div>
                            <p className="text-neutral-400 mb-4">
                                Plateforme de documentation et de génération de projets pour développeurs.
                            </p>
                            {/* Social Links */}
                            <div className="flex space-x-4">
                                {/* Social icons here */}
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <div>
                            <h3 className="font-semibold text-white text-lg mb-4">Produit</h3>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Caractéristiques</a></li>
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Tarification</a></li>
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Démo</a></li>
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Roadmap</a></li>
                            </ul>
                        </div>

                        {/* Documentation Links */}
                        <div>
                            <h3 className="font-semibold text-white text-lg mb-4">Documentation</h3>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Guides</a></li>
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">API Reference</a></li>
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Tutoriels</a></li>
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Exemples</a></li>
                            </ul>
                        </div>

                        {/* Company Links */}
                        <div>
                            <h3 className="font-semibold text-white text-lg mb-4">Entreprise</h3>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">À propos</a></li>
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Carrières</a></li>
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div className="border-t border-neutral-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-neutral-400 text-sm">
                            &copy; {new Date().getFullYear()} DOC HUB. Tous droits réservés.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
                                Confidentialité
                            </a>
                            <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
                                Conditions d'utilisation
                            </a>
                            <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
                                Mentions légales
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}