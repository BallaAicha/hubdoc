import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Simulation d'une validation d'email et de mot de passe
        if (email === 'test@socgen.com' && password === 'password123') {
            alert('Connexion réussie');
            navigate('/'); // Redirection vers la page d'accueil
        } else {
            alert('Email ou mot de passe incorrect');
        }
    };

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
                    <p className="text-gray-600">Connectez-vous à votre compte</p>
                </div>

                {/* Formulaire de Connexion */}
                <form onSubmit={handleLogin} className="space-y-6">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Adresse Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="exemple@domaine.com"
                            required
                            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-[#e9041e] focus:border-[#e9041e] sm:text-sm"
                        />
                    </div>

                    {/* Mot de Passe */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Mot de Passe
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-[#e9041e] focus:border-[#e9041e] sm:text-sm"
                        />
                    </div>

                    {/* Bouton de Connexion */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 rounded-lg bg-[#e9041e] text-white font-semibold hover:bg-red-600 transition"
                        >
                            Se Connecter
                        </button>
                    </div>
                </form>

                {/* Lien vers inscription ou récupération de mot de passe */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Vous n'avez pas de compte ?{' '}
                        <a href="#signup" className="text-[#e9041e] font-medium hover:underline">
                            Inscrivez-vous ici
                        </a>
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                        <a href="#forgot-password" className="text-[#e9041e] font-medium hover:underline">
                            Mot de passe oublié ?
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}