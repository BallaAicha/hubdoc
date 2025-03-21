import React from 'react';
import { Mail, Phone, ExternalLink, Download, HelpCircle, AlertCircle, Calendar, ChevronRight } from 'lucide-react';
import { RecentPresentation } from '../types';
import clsx from 'clsx';

// Données des présentations récentes
const recentPresentations: RecentPresentation[] = [
  {
    id: '1',
    title: 'Formation sur les Normes de Dev',
    date: '15 mars 2024',
    duration: '1h30',
    status: 'En cours',
  },
  {
    id: '2',
    title: 'Présentation des cas d\'usages de Platform',
    date: '14 mars 2024',
    duration: '2h00',
    status: 'Terminé',
  },
  {
    id: '3',
    title: 'Réunion Tech Lead Pour les Sujets de Stage PFE',
    date: '13 mars 2024',
    duration: '1h30',
    status: 'Terminé',
  },
];

// Documents importants
const importantDocuments = [
  { id: 1, title: "Normes de développement", category: "Développement" },
  { id: 2, title: "Guide d'intégration", category: "Onboarding" },
  { id: 3, title: "Nos APIs", category: "Documentation" },
  { id: 4, title: "Normes de sécurité", category: "Sécurité" },
  { id: 5, title: "Architecture hexagonale", category: "Architecture" },
];

interface CardProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const Card = ({ children, className, fullWidth = false }: CardProps) => (
    <div className={clsx(
        "bg-white rounded-xl shadow overflow-hidden border border-neutral-200",
        "transition-all duration-300 hover:shadow-lg",
        fullWidth ? "md:col-span-3" : "",
        className
    )}>
      {children}
    </div>
);

const CardHeader = ({ title, icon }: { title: string; icon?: React.ReactNode }) => (
    <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-white">
      <div className="flex items-center gap-2">
        {icon && <div className="text-primary-600">{icon}</div>}
        <h2 className="text-lg font-semibold text-neutral-800">{title}</h2>
      </div>
    </div>
);

const Button = ({
                  children,
                  variant = 'text',
                  size = 'md',
                  className,
                  ...props
                }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'sm' | 'md' | 'lg';
}) => {
  return (
      <button
          className={clsx(
              "flex items-center justify-center transition-all font-medium",
              variant === 'text' && "text-primary-600 hover:text-primary-700 hover:bg-primary-50/50",
              variant === 'outlined' && "border border-primary-600 text-primary-600 hover:bg-primary-50 rounded-lg",
              variant === 'contained' && "bg-primary-600 text-white hover:bg-primary-700 rounded-lg shadow-sm hover:shadow",
              size === 'sm' && "text-xs gap-1.5 px-3 py-1.5",
              size === 'md' && "text-sm gap-2 px-4 py-2",
              size === 'lg' && "text-base gap-2 px-5 py-2.5",
              className
          )}
          {...props}
      >
        {children}
      </button>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  return (
      <span className={clsx(
          "text-xs font-medium px-2.5 py-1 rounded-full",
          status === "En cours"
              ? "bg-primary-50 text-primary-700 border border-primary-200"
              : "bg-success/10 text-success border border-success/20"
      )}>
      {status}
    </span>
  );
};

export function Home() {
  return (
      <div className="min-h-screen bg-neutral-50">
        {/* En-tête Principal avec dégradé */}
        <header className="bg-gradient-to-r from-primary-700 to-primary-800 text-black pt-20 pb-16 px-6 shadow-lg">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center">
              Bienvenue sur votre Portail
            </h1>
            <p className="text-lg md:text-xl opacity-90 text-center max-w-3xl mx-auto font-light">
              Accédez aux documents, présentations et ressources pour optimiser vos processus.
            </p>
          </div>
        </header>

        {/* Contenu Principal - légèrement décalé vers le haut */}
        <div className="max-w-6xl mx-auto px-4 -mt-8">
          {/* Notification principale */}
          <div className="bg-white border-l-4 border-primary-600 text-neutral-700 p-5 rounded-lg flex items-center gap-4 mb-8 shadow-sm">
            <AlertCircle className="w-6 h-6 text-primary-600 flex-shrink-0" />
            <p>
              Merci de consulter la <span className="font-medium text-primary-700">base de connaissance</span> pour découvrir la procédure en cours pour votre intégration.
            </p>
          </div>

          {/* Grille de contenu principale */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Documents */}
            <Card className="md:col-span-2">
              <CardHeader
                  title="Documents Importants"
                  icon={<Download className="w-5 h-5" />}
              />
              <div className="p-6">
                <div className="space-y-1">
                  {importantDocuments.map((doc) => (
                      <div
                          key={doc.id}
                          className="flex items-center justify-between py-3 px-4 hover:bg-neutral-50 rounded-lg cursor-pointer transition-colors group"
                      >
                        <div className="flex flex-col">
                          <span className="text-neutral-800 font-medium">{doc.title}</span>
                          <span className="text-xs text-neutral-500">{doc.category}</span>
                        </div>
                        <Button
                            variant="outlined"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Download className="w-4 h-4" />
                          <span>Télécharger</span>
                        </Button>
                      </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-neutral-100 flex justify-center">
                  <Button variant="text" className="rounded-lg px-4 py-2">
                    Explorer tous les documents
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Centre d'Aide */}
            <Card>
              <CardHeader
                  title="Centre d'Aide"
                  icon={<HelpCircle className="w-5 h-5" />}
              />
              <div className="p-6">
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-neutral-50 transition-colors text-neutral-800 border border-neutral-100">
                    <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                      <HelpCircle className="w-5 h-5 text-primary-600" />
                    </div>
                    <span className="font-medium">Foire aux questions</span>
                  </button>

                  <button className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-neutral-50 transition-colors text-neutral-800 border border-neutral-100">
                    <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary-600" />
                    </div>
                    <span className="font-medium">Contacter le support</span>
                  </button>

                  <button className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-neutral-50 transition-colors text-neutral-800 border border-neutral-100">
                    <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary-600" />
                    </div>
                    <span className="font-medium">contact@pi-becon.com</span>
                  </button>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-100 flex justify-center">
                  <Button variant="text" className="rounded-lg px-4 py-2">
                    Voir toutes les ressources
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Présentations Récentes */}
            <Card fullWidth>
              <CardHeader
                  title="Présentations Récentes"
                  icon={<Calendar className="w-5 h-5" />}
              />
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {recentPresentations.map((presentation) => (
                      <div
                          key={presentation.id}
                          className="bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-md transition-all hover:border-primary-200"
                      >
                        <div className="py-3 px-4 bg-neutral-50 border-b border-neutral-200">
                          <h3 className="font-medium text-neutral-800 line-clamp-1">{presentation.title}</h3>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center text-xs text-neutral-500 mb-4">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{presentation.date}</span>
                            <span className="mx-2 text-neutral-300">•</span>
                            <span>{presentation.duration}</span>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <StatusBadge status={presentation.status} />
                            {presentation.status === "En cours" && (
                                <Button variant="contained" size="sm">
                                  <ExternalLink className="w-3.5 h-3.5" />
                                  <span>Rejoindre</span>
                                </Button>
                            )}
                            {presentation.status === "Terminé" && (
                                <Button variant="outlined" size="sm">
                                  <ExternalLink className="w-3.5 h-3.5" />
                                  <span>Replay</span>
                                </Button>
                            )}
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Button variant="contained" size="lg">
                    Voir toutes les présentations
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
  );
}