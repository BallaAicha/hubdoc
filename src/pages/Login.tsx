import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Lock, ArrowRight } from 'lucide-react';
import { auth } from './env';
import { pkceChallenge } from '../utils/pkce';

// Constants for sessionStorage keys
const CODE_VERIFIER_KEY = 'sg-connect-code-verifier';
const STATE_KEY = 'sg-connect-state';

export function Login() {
    const [isLoaded, setIsLoaded] = useState(false);

    const handleLogin = async (): Promise<void> => {
        try {
            // Generate PKCE challenge
            const cr = await pkceChallenge();

            // Generate random state for CSRF protection
            const state = Array.from(window.crypto.getRandomValues(new Uint8Array(16)))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');

            // Store code_verifier and state in sessionStorage
            sessionStorage.setItem(CODE_VERIFIER_KEY, cr.code_verifier);
            sessionStorage.setItem(STATE_KEY, state);

            console.log('PKCE challenge generated. Code verifier stored in session storage.');

            // Create authorization parameters with PKCE
            const params = new URLSearchParams({
                client_id: auth.ENV_CLIENT_ID,
                redirect_uri: auth.ENV_REDIRECT_URI,
                response_type: 'code',
                scope: auth.ENV_SCOPE,
                state: state,
                code_challenge: cr.code_challenge,
                code_challenge_method: 'S256'
            });

            // Redirect to authorization endpoint
            console.log('Redirecting to authorization endpoint with PKCE parameters');
            window.location.href = `${auth.ENV_AUTHORIZATION_ENDPOINT}?${params}`;
        } catch (err) {
            console.error('Error during login initialization:', err);
            alert('Failed to initialize login process. Please try again.');
        }
    };

    // Animation effect when component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    // Auto-trigger login when component mounts
    useEffect((): void => {
        handleLogin();
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                duration: 0.6,
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    // Decorative elements animation
    const decorVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: (custom: number) => ({
            scale: 1,
            opacity: 0.8,
            transition: { 
                delay: custom * 0.2,
                duration: 0.7,
                type: "spring",
                stiffness: 100
            }
        })
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900 flex items-center justify-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div 
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"}
                    custom={0}
                    variants={decorVariants}
                    className="absolute -right-20 -top-20 w-96 h-96 bg-primary-500 opacity-10 rounded-full blur-3xl"
                />
                <motion.div 
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"}
                    custom={0.3}
                    variants={decorVariants}
                    className="absolute left-1/4 bottom-0 w-96 h-96 bg-secondary-500 opacity-10 rounded-full blur-3xl"
                />
                <motion.div 
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"}
                    custom={0.6}
                    variants={decorVariants}
                    className="absolute right-1/3 top-1/4 w-64 h-64 bg-primary-400 opacity-10 rounded-full blur-3xl"
                />
            </div>

            <motion.div 
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                variants={containerVariants}
                className="relative z-10 max-w-md w-full px-6"
            >
                <motion.div 
                    variants={itemVariants}
                    className="bg-white shadow-2xl rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10"
                >
                    <div className="bg-gradient-to-r from-primary-600 to-primary-700 py-6 px-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                                    <FileText className="h-6 w-6 text-white" />
                                </div>
                                <h2 className="text-xl font-bold text-white">CoDev Platform</h2>
                            </div>
                            <div className="bg-white/20 h-8 w-8 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <Lock className="h-4 w-4 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        {/* Logo Section */}
                        <motion.div variants={itemVariants} className="text-center mb-8">
                            <div className="flex justify-center mb-6">
                                <img
                                    src="/assets/logo-societe-generale.png"
                                    alt="Société Générale Logo"
                                    className="w-48 mx-auto"
                                />
                            </div>
                            <h1 className="text-2xl font-bold text-secondary-900 mb-2">
                                Bienvenue chez Société Générale
                            </h1>
                            <p className="text-gray-600">Connectez-vous avec SgConnect pour accéder à la plateforme</p>
                        </motion.div>

                        {/* Bouton de Connexion avec SgConnect */}
                        <motion.div variants={itemVariants} className="space-y-6">
                            <div className="text-center">
                                <p className="text-gray-600 mb-4">
                                    Cliquez sur le bouton ci-dessous pour vous connecter avec votre compte SgConnect.
                                </p>
                            </div>

                            <motion.button
                                onClick={handleLogin}
                                whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(233, 4, 30, 0.2)" }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg shadow-primary-600/20 flex items-center justify-center gap-2"
                            >
                                <span>Se connecter avec SgConnect</span>
                                <ArrowRight className="h-4 w-4" />
                            </motion.button>
                        </motion.div>

                        {/* Informations supplémentaires */}
                        <motion.div variants={itemVariants} className="mt-8 text-center">
                            <p className="text-sm text-gray-500">
                                Vous serez redirigé vers la page d'authentification SgConnect.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.div 
                    variants={itemVariants}
                    className="mt-6 text-center text-white/70 text-sm"
                >
                    <p>© {new Date().getFullYear()} Société Générale. Tous droits réservés.</p>
                </motion.div>
            </motion.div>
        </div>
    );
}
