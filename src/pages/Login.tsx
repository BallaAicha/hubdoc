import React from 'react';
import { useAuth } from '../context/AuthContext';

export function Login() {
    const { login } = useAuth();

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e9041e] via-white to-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-8">
                {/* Logo Section */}
                <div className="text-center mb-8">
                    <img
                        src="/assets/logo-societe-generale.png"
                        alt="Société Générale Logo"
                        className="w-48 mx-auto mb-4"
                    />
                    <h1 className="text-2xl font-bold text-gray-800">
                        Bienvenue chez Société Générale
                    </h1>
                    <p className="text-gray-600">Connectez-vous avec SgConnect</p>
                </div>

                {/* Bouton de Connexion avec SgConnect */}
                <div className="space-y-6">
                    <div className="text-center">
                        <p className="text-gray-600 mb-4">
                            Cliquez sur le bouton ci-dessous pour vous connecter avec votre compte SgConnect.
                        </p>
                    </div>

                    <button
                        onClick={login}
                        className="w-full py-3 rounded-lg bg-[#e9041e] text-white font-semibold hover:bg-red-600 transition"
                    >
                        Se connecter avec SgConnect
                    </button>
                </div>

                {/* Informations supplémentaires */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Vous serez redirigé vers la page d'authentification SgConnect.
                    </p>
                </div>
            </div>
        </div>
    );
}
