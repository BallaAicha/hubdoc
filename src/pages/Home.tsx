import React from 'react';
import { Mail, Phone, ExternalLink, Download } from 'lucide-react';
import { RecentPresentation } from '../types';

const recentPresentations: RecentPresentation[] = [
  {
    id: '1',
    title: 'Présentation technique App Mobile et API Business',
    date: '15 mars 2024',
    duration: '1h30',
    status: 'En cours',
  },
  {
    id: '2',
    title: 'Demande de Paiement (Request to Pay) - MX2 de documentation technique',
    date: '14 mars 2024',
    duration: '2h00',
    status: 'Terminé',
  },
  {
    id: '3',
    title: 'Guide de déploiement de l\'API et Sandbox',
    date: '13 mars 2024',
    duration: '1h30',
    status: 'Terminé',
  },
];

export function Home() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-[#e9041e] via-gray-100 to-gray-50 py-12 md:px-6 px-4">
        {/* En-tête Principal */}
        <header className="max-w-5xl mx-auto mb-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Bienvenue sur votre Page d'Accueil</h1>
          <p className="text-gray-200 font-medium text-lg">
            Accédez aux documents, présentations et ressources nécessaires pour une meilleure optimisation de vos processus.
          </p>
        </header>

        {/* Notifications et Contenu Principal */}
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Notification principale */}
          <div className="bg-[#fef4f5] border border-[#e9041e] text-[#e9041e] p-4 rounded-lg flex items-center space-x-4 shadow">
            <div className="flex-shrink-0">
              <span className="w-6 h-6 flex items-center justify-center rounded-full border border-[#e9041e] font-bold">!</span>
            </div>
            <p className="text-sm">
              Merci de consulter la page de <strong>base de connaissance</strong> pour découvrir la procédure en cours pour votre intégration.
            </p>
          </div>

          {/* Grille de contenu principale */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Centre d'Aide */}
            <div className="flex flex-col bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">Centre d'Aide</h2>
              <div className="space-y-3">
                <button className="flex items-center gap-3 text-gray-700 hover:text-[#e9041e] transition">
                  <span className="w-6 h-6 flex justify-center items-center rounded-full bg-gray-200 font-bold text-gray-600">?</span>
                  Faire aux questions
                </button>
                <button className="flex items-center gap-3 text-gray-700 hover:text-[#e9041e] transition">
                  <Phone className="w-5 h-5" />
                  Contacter le support
                </button>
                <button className="flex items-center gap-3 text-gray-700 hover:text-[#e9041e] transition">
                  <Mail className="w-5 h-5" />
                  contact@pi-becon.com
                </button>
              </div>
              <button className="mt-4 text-[#e9041e] hover:underline self-start">
                Voir plus...
              </button>
            </div>

            {/* Documents */}
            <div className="flex flex-col bg-white rounded-lg shadow-lg p-6 md:col-span-2">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">Documents</h2>
              <div className="space-y-3">
                {[
                  "Spécifications générales des messages dans PI",
                  "Répertoire des BICs (PI BAC)",
                  "Cas d'usage / Scénarios de transfert",
                  "Spécifications fonctionnelles de l'AIP",
                  "Exigences minimales de l'interface utilisateur",
                ].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between hover:bg-gray-50 rounded-lg px-4 py-2 transition">
                      <span className="text-gray-700">{doc}</span>
                      <Download className="text-[#e9041e] w-5 h-5 cursor-pointer hover:scale-110 transition" />
                    </div>
                ))}
              </div>
              <button className="mt-4 text-[#e9041e] hover:underline self-start">
                Voir plus...
              </button>
            </div>

            {/* Présentations Récentes */}
            <div className="flex flex-col bg-white rounded-lg shadow-lg p-6 md:col-span-3">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">Présentations Récentes</h2>
              <div className="space-y-4">
                {recentPresentations.map((presentation) => (
                    <div key={presentation.id} className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 transition">
                      <h3 className="font-semibold text-gray-800">{presentation.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                        <span>{presentation.date}</span>
                        <span>•</span>
                        <span>{presentation.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-[#e9041e] text-sm hover:underline cursor-pointer">
                        <ExternalLink className="w-4 h-4" />
                        <span>Rejoindre</span>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}