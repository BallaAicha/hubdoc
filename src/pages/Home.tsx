import React from 'react';
import { Mail, Phone, ExternalLink, Download } from 'lucide-react';
import { RecentPresentation } from '../types';

const recentPresentations: RecentPresentation[] = [
  {
    id: '1',
    title: 'Présentation technique App Mobile et API Business',
    date: '15 mars 2024',
    duration: '1h30',
    status: 'En cours'
  },
  {
    id: '2',
    title: 'Demande de Paiement (Request to Pay) - MX2 de documentation technique',
    date: '14 mars 2024',
    duration: '2h00',
    status: 'Terminé'
  },
  {
    id: '3',
    title: 'Guide de déploiement de l\'API et Sandbox',
    date: '13 mars 2024',
    duration: '1h30',
    status: 'Terminé'
  }
];

export function Home() {
  return (
    <div className="container mx-auto py-6">
      <div className="bg-orange-100 p-4 mb-6 rounded-lg">
        <p className="text-orange-800">
          Merci de consulter la page de base de connaissance pour découvrir la procédure en cours pour votre intégration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Centre d'aide</h2>
          <div className="space-y-4">
            <button className="w-full text-left flex items-center gap-2 text-gray-700 hover:text-orange-500">
              <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">?</span>
              Faire aux questions
            </button>
            <button className="w-full text-left flex items-center gap-2 text-gray-700 hover:text-orange-500">
              <Phone className="w-5 h-5" />
              Contacter le support
            </button>
            <button className="w-full text-left flex items-center gap-2 text-gray-700 hover:text-orange-500">
              <Mail className="w-5 h-5" />
              contact@pi-becon.com
            </button>
          </div>
          <button className="mt-4 text-orange-500 hover:text-orange-600">
            Voir plus...
          </button>
        </div>

        <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Documents</h2>
          <div className="space-y-4">
            {[
              "Spécifications générales des messages dans PI",
              "Répertoire des BICs (PI BAC)",
              "Cas d'usage / Scénarios de transfert",
              "Spécifications fonctionnelles de l'AIP",
              "Exigences minimales de l'interface utilisateur"
            ].map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50">
                <span className="text-gray-700">{doc}</span>
                <Download className="w-5 h-5 text-gray-500 hover:text-orange-500 cursor-pointer" />
              </div>
            ))}
          </div>
          <button className="mt-4 text-orange-500 hover:text-orange-600">
            Voir plus...
          </button>
        </div>

        <div className="col-span-1 bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Présentations récentes</h2>
          </div>
          <div className="space-y-4">
            {recentPresentations.map((presentation) => (
              <div key={presentation.id} className="border-b pb-3">
                <h3 className="font-medium text-gray-800">{presentation.title}</h3>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                  <span>{presentation.date}</span>
                  <span>•</span>
                  <span>{presentation.duration}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <ExternalLink className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-orange-500">Rejoindre</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}