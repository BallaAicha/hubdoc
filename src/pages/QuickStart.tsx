import { useNavigate } from 'react-router-dom';
import { FileItem } from '../types';
import {
  Plus,
  FileText,
  Book,
  Code,
  Terminal,
  ArrowRight,
  ChevronRight,
  Rocket,
  ShieldCheck,
  Zap,
  Search,
  Users,
  MessageSquare,
  HelpCircle,
  Check,
  Clock,
  Star,
} from 'lucide-react';
import clsx from 'clsx';
import React, { useState, useEffect } from "react";

// Enrichissement des guides avec de meilleures descriptions et détails
const quickStartGuides: FileItem[] = [
  {
    id: 'guide-installation',
    name: "Guide d'installation API",
    description: "Configuration complète de l'environnement, prérequis système et procédures de déploiement pas à pas",
    type: 'markdown',
    createdAt: '2024-03-01',
    updatedAt: '2024-04-15',
    icon: Book,
    size: null,
    readTime: '8 min',
    complexity: 'Débutant'
  },
  {
    id: 'nos-apis',
    name: 'Documentation des APIs',
    description: "Référence technique complète de tous les endpoints, formats de requêtes/réponses et exemples d'intégration",
    type: 'api',
    createdAt: '2024-03-01',
    updatedAt: '2024-04-18',
    icon: Code,
    size: null,
    readTime: '15 min',
    complexity: 'Intermédiaire'
  }
];

// Enrichissement avec des guides supplémentaires
const popularDocs: FileItem[] = [
  {
    id: 'securite',
    name: 'Sécurité & Authentification',
    description: "Bonnes pratiques, OAuth 2.0, tokens JWT et protection des données sensibles",
    type: 'markdown',
    createdAt: '2024-03-10',
    updatedAt: '2024-04-12',
    icon: ShieldCheck,
    size: null,
    readTime: '12 min',
    complexity: 'Avancé'
  },
  {
    id: 'performances',
    name: 'Optimisation & Performance',
    description: "Techniques de mise en cache, compression et bonnes pratiques pour maximiser les performances",
    type: 'markdown',
    createdAt: '2024-03-15',
    updatedAt: '2024-04-10',
    icon: Zap,
    size: null,
    readTime: '10 min',
    complexity: 'Intermédiaire'
  }
];

// Fonctionnalités principales améliorées avec des badges et détails
const features = [
  {
    title: 'Génération de projet',
    description: 'Créez un nouveau projet Spring Boot en quelques clics avec une configuration optimisée pour la production',
    icon: Terminal,
    color: 'bg-indigo-600',
    badge: 'Populaire',
    badgeColor: 'bg-amber-100 text-amber-800'
  },
  {
    title: 'Documentation interactive',
    description: 'Guides complets, exemples de code et sandbox pour tester les APIs en temps réel',
    icon: Book,
    color: 'bg-emerald-600',
    badge: 'Nouveau',
    badgeColor: 'bg-blue-100 text-blue-800'
  },
  {
    title: 'APIs RESTful évolutives',
    description: 'Architecture moderne, sécurisée et hautement scalable pour vos services distribués',
    icon: Code,
    color: 'bg-violet-600',
    badge: 'Enterprise',
    badgeColor: 'bg-purple-100 text-purple-800'
  },
];

// Témoignages clients pour renforcer la crédibilité
const testimonials = [
  {
    name: 'Sophie Martin',
    role: 'CTO, FinTech Solutions',
    content: 'Cette plateforme nous a permis de réduire de 60% notre temps de développement. La qualité de la documentation est exceptionnelle.',
    avatar: 'https://i.pravatar.cc/100?img=1'
  },
  {
    name: 'Thomas Durand',
    role: 'Lead Developer, E-Commerce Plus',
    content: 'La génération de projet Spring et les APIs prêtes à l\'emploi ont révolutionné notre façon de travailler.',
    avatar: 'https://i.pravatar.cc/100?img=2'
  }
];

function FeatureCard({ feature }: { feature: typeof features[0] }) {
  const Icon = feature.icon;

  return (
      <div className="bg-white rounded-xl p-6 border border-neutral-100 shadow-md hover:shadow-xl transition-all duration-300 group h-full relative overflow-hidden">
        {feature.badge && (
            <span className={`absolute top-3 right-3 text-xs font-medium px-2 py-0.5 rounded-full ${feature.badgeColor}`}>
          {feature.badge}
        </span>
        )}
        <div className={clsx(
            "p-3 rounded-xl inline-flex mb-4 text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3",
            feature.color
        )}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-neutral-800 mb-2">{feature.title}</h3>
        <p className="text-neutral-600 leading-relaxed">{feature.description}</p>

        <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-end">
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group-hover:gap-2 transition-all">
            En savoir plus
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
  );
}

function GuideCard({ guide }: { guide: FileItem }) {
  const navigate = useNavigate();
  const Icon = guide.icon || FileText;

  // Format date nicely
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
      <div
          onClick={() =>
              navigate(guide.type === 'markdown' || guide.type === 'api' ? `/guide/${guide.id}` : '#')
          }
          className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-neutral-100"
      >
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
              <Icon className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-neutral-800 group-hover:text-indigo-600 transition-colors">
                {guide.name}
              </h3>
              <p className="text-sm text-neutral-500 flex items-center gap-2">
                <Clock className="w-3 h-3" />
                Mis à jour le {formatDate(guide.updatedAt)}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-neutral-50 group-hover:bg-indigo-50 flex items-center justify-center transition-colors">
              <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-indigo-600 transition-colors" />
            </div>
          </div>
          <p className="text-neutral-600 line-clamp-2 mb-3">{guide.description}</p>

          <div className="flex items-center gap-3 mt-3">
            {guide.readTime && (
                <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-md font-medium inline-flex items-center">
              <Clock className="w-3 h-3 mr-1" /> {guide.readTime}
            </span>
            )}
            {guide.complexity && (
                <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded-md font-medium">
              {guide.complexity}
            </span>
            )}
          </div>
        </div>
      </div>
  );
}

function StatCard({ icon: Icon, value, label }: { icon: React.ElementType, value: string, label: string }) {
  return (
      <div className="bg-white rounded-xl p-6 border border-neutral-100 shadow-md hover:shadow-lg transition-all duration-300 group">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
            <Icon className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-neutral-800">{value}</p>
            <p className="text-sm text-neutral-500">{label}</p>
          </div>
        </div>
      </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
      <div className="bg-white rounded-xl p-6 border border-neutral-100 shadow-md h-full">
        <div className="flex items-center gap-4 mb-4">
          <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100"
          />
          <div>
            <h4 className="font-semibold text-neutral-800">{testimonial.name}</h4>
            <p className="text-sm text-neutral-500">{testimonial.role}</p>
          </div>
        </div>
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
          ))}
        </div>
        <p className="italic text-neutral-600">"{testimonial.content}"</p>
      </div>
  );
}

function SearchBar() {
  return (
      <div className="relative max-w-lg w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-neutral-400" />
        </div>
        <input
            type="search"
            className="block w-full p-3 pl-10 text-sm border border-neutral-200 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            placeholder="Rechercher dans la documentation..."
        />
        <div className="absolute inset-y-0 right-3 flex items-center">
          <kbd className="px-2 py-1 text-xs font-semibold text-neutral-800 bg-neutral-100 border border-neutral-200 rounded">
            ⌘K
          </kbd>
        </div>
      </div>
  );
}

export function QuickStart() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
      <div className="min-h-screen bg-neutral-50">



        {/* Hero section avec gradient amélioré et animation */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-700 to-indigo-500 text-white relative overflow-hidden">
          {/* Formes décoratives avec animation */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-white animate-pulse-slow"></div>
            <div className="absolute right-10 bottom-10 w-80 h-80 rounded-full bg-white animate-pulse-slow animation-delay-1000"></div>
            <div className="absolute left-1/3 top-1/4 w-40 h-40 rounded-full bg-white animate-pulse-slow animation-delay-2000"></div>
            <div className="absolute bottom-32 left-1/4 w-24 h-24 rounded-full bg-white animate-pulse-slow animation-delay-3000"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white mb-6 text-sm font-medium backdrop-blur-sm">
                    <Rocket className="w-4 h-4 mr-2" />
                    <span className="relative">Plateforme de développement de nouvelle génération</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
                    Accélérez votre <br className="hidden md:inline" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-400 font-extrabold">
                    innovation
                  </span>
                  </h1>
                  <p className="text-xl text-white/90 leading-relaxed max-w-xl mb-8">
                    Notre plateforme documentaire et nos outils optimisés vous permettent de développer plus rapidement, avec une qualité industrielle inégalée.
                  </p>

                  <div className="flex flex-wrap gap-4 items-center">
                    <button
                        onClick={() => navigate('/generate-spring-project')}
                        className="flex items-center gap-3 py-3.5 px-7 bg-white text-indigo-700 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Générer un projet</span>
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                    <button
                        onClick={() => navigate('/documents')}
                        className="flex items-center gap-3 py-3.5 px-7 bg-transparent border border-white/50 hover:bg-white/10 text-white font-medium rounded-lg transition-all duration-300"
                    >
                      <Book className="w-5 h-5" />
                      <span>Consulter la doc</span>
                    </button>
                  </div>
                </div>

                <div className="hidden lg:block w-96 h-96 relative">
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20">
                    <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                    <div className="p-8 h-full flex flex-col">
                      <div className="flex items-center mb-6">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="flex-1 overflow-hidden">
                      <pre className="text-xs text-white/80 font-mono overflow-hidden">
                        <code className="language-java">
{`@RestController
@RequestMapping("/api/v1")
public class ApiController {

  @GetMapping("/hello")
  public ResponseEntity<Map<String, String>> hello() {
    return ResponseEntity.ok(Map.of(
      "message", "Hello, World!",
      "timestamp", LocalDateTime.now().toString()
    ));
  }
}`}
                        </code>
                      </pre>
                      </div>
                      <div className="h-8 bg-indigo-900/50 rounded flex items-center px-3 mt-auto">
                        <span className="text-xs text-green-300">✓ Prêt pour le déploiement</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16">
                <StatCard icon={Terminal} value="< 2 min" label="Temps de génération d'un projet" />
                <StatCard icon={Code} value="25+" label="APIs documentées" />
                <StatCard icon={Book} value="10+" label="Guides techniques" />
              </div>
            </div>
          </div>
        </div>

        {/* Trust section */}
        <div className="bg-white border-b border-neutral-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto">
              <p className="text-center text-sm font-medium text-neutral-500 mb-6">TRUSTED BY INDUSTRY LEADERS</p>
              <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 opacity-70">
                {/* Placeholder logos - à remplacer par vos propres logos */}
                <img src="src/logo.jpeg" alt="Client" className="h-8 w-auto" />
                <img src="src/logo.jpeg" alt="Client" className="h-8 w-auto" />
                <img src="src/logo.jpeg" alt="Client" className="h-8 w-auto" />
                <img src="src/logo.jpeg" alt="Client" className="h-8 w-auto" />
                <img src="src/logo.jpeg" alt="Client" className="h-8 w-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            {/* Features section */}
            <div className="mb-20">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 mb-4 text-sm font-medium">
                  <Check className="w-4 h-4 mr-2" />
                  Caractéristiques principales
                </div>
                <h2 className="text-3xl font-bold text-neutral-800 mb-4">Tout ce dont vous avez besoin pour développer rapidement</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Notre plateforme offre des outils puissants et une documentation complète pour accélérer votre développement sans compromettre la qualité.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <FeatureCard key={index} feature={feature} />
                ))}
              </div>
            </div>

            {/* Documentation section */}
            <div className="mb-20">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 mb-4 text-sm font-medium">
                  <Book className="w-4 h-4 mr-2" />
                  Documentation
                </div>
                <h2 className="text-3xl font-bold text-neutral-800 mb-4">Des ressources complètes et accessibles</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Explorez notre documentation détaillée avec des exemples concrets et des guides pas à pas pour maîtriser notre plateforme.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl p-8 border border-neutral-100 shadow-lg">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-bold text-neutral-800 flex items-center">
                        <Book className="w-6 h-6 mr-3 text-indigo-600" />
                        Guides essentiels
                      </h3>
                      <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 text-sm">
                        <span>Tous les guides</span>
                        <ChevronRight className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                      {quickStartGuides.map((guide) => (
                          <GuideCard key={guide.id} guide={guide} />
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-white rounded-2xl p-8 border border-neutral-100 shadow-lg h-full">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-bold text-neutral-800 flex items-center">
                        <Star className="w-6 h-6 mr-3 text-amber-500" />
                        Les plus consultés
                      </h3>
                      <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 text-sm">
                        <span>Tout voir</span>
                        <ChevronRight className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                      {popularDocs.map((doc) => (
                          <GuideCard key={doc.id} guide={doc} />
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-neutral-100">
                      <button
                          onClick={() => navigate('/documents')}
                          className="w-full py-3 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <span>Voir toute la documentation</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials section */}
            <div className="mb-20">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 mb-4 text-sm font-medium">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Témoignages
                </div>
                <h2 className="text-3xl font-bold text-neutral-800 mb-4">Ce qu'en disent nos clients</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Découvrez comment notre plateforme transforme le développement pour des entreprises de toutes tailles.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((testimonial, index) => (
                    <TestimonialCard key={index} testimonial={testimonial} />
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-indigo-700 to-purple-700 rounded-3xl overflow-hidden">
              <div className="px-8 py-12 sm:px-12 sm:py-16 md:flex md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <h2 className="text-3xl font-bold tracking-tight text-white">
                    Prêt à accélérer votre développement ?
                  </h2>
                  <p className="mt-3 text-lg text-indigo-100 max-w-md">
                    Créez un nouveau projet Spring Boot maintenant et découvrez la rapidité de mise en production.
                  </p>
                </div>
                <div className="mt-8 md:mt-0 md:shrink-0">
                  <button
                      onClick={() => navigate('/generate-spring-project')}
                      className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-900 bg-white hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl"
                  >
                    Commencer <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Help & Support */}
        <div className="bg-neutral-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-violet-100 text-violet-700 mb-4 text-sm font-medium">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Support & Assistance
                </div>
                <h2 className="text-3xl font-bold text-neutral-800 mb-4">Besoin d'aide ?</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Notre équipe de support est disponible pour vous accompagner à chaque étape de votre développement.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-6 border border-neutral-100 shadow-md hover:shadow-lg transition-all duration-300 text-center">
                  <div className="p-3 bg-violet-50 rounded-full mx-auto w-16 h-16 flex items-center justify-center mb-4">
                    <MessageSquare className="w-8 h-8 text-violet-600" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-800 mb-2">Chat en direct</h3>
                  <p className="text-neutral-600 mb-4">Discutez en temps réel avec nos experts techniques.</p>
                  <button className="text-violet-600 hover:text-violet-800 font-medium flex items-center gap-1 mx-auto">
                    <span>Démarrer un chat</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-white rounded-xl p-6 border border-neutral-100 shadow-md hover:shadow-lg transition-all duration-300 text-center">
                  <div className="p-3 bg-blue-50 rounded-full mx-auto w-16 h-16 flex items-center justify-center mb-4">
                    <Book className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-800 mb-2">Base de connaissances</h3>
                  <p className="text-neutral-600 mb-4">Explorez nos solutions aux problèmes courants.</p>
                  <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 mx-auto">
                    <span>Consulter les articles</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-white rounded-xl p-6 border border-neutral-100 shadow-md hover:shadow-lg transition-all duration-300 text-center">
                  <div className="p-3 bg-emerald-50 rounded-full mx-auto w-16 h-16 flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-800 mb-2">Communauté</h3>
                  <p className="text-neutral-600 mb-4">Rejoignez notre communauté de développeurs.</p>
                  <button className="text-emerald-600 hover:text-emerald-800 font-medium flex items-center gap-1 mx-auto">
                    <span>Forum communautaire</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-neutral-800 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
                  <div className="flex space-x-4">
                    <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                      <span className="sr-only">Twitter</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                      <span className="sr-only">GitHub</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-white text-lg mb-4">Produit</h3>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Caractéristiques</a></li>
                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Tarification</a></li>
                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Démo</a></li>
                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Roadmap</a></li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-white text-lg mb-4">Documentation</h3>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Guides</a></li>
                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">API Reference</a></li>
                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Tutoriels</a></li>
                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Exemples</a></li>
                  </ul>
                </div>

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
      </div>
  );
}