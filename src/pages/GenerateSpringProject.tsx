
import React, { useState, useEffect } from "react";
import {
    Box,
    Check,
    ChevronDown,
    Code2,
    Download,
    Layers,
    Package,
    Terminal,
    X,
    FileCode,
    Settings,
    CheckCircle2,
    AlertCircle,
    ArrowRight
} from "lucide-react";
import clsx from "clsx";
import {useProjectGeneration} from "../hooks/useProjectGeneration.ts";


// Composant pour les étapes du processus
const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number, totalSteps: number }) => {
    return (
        <div className="flex items-center justify-center mb-10">
            {Array.from({ length: totalSteps }).map((_, index) => (
                <React.Fragment key={index}>
                    <div className="flex flex-col items-center">
                        <div className={clsx(
                            "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                            index < currentStep
                                ? "bg-blue-600 text-white"
                                : index === currentStep
                                    ? "bg-blue-100 border-2 border-blue-600 text-blue-600"
                                    : "bg-gray-100 text-gray-400"
                        )}>
                            {index < currentStep ? (
                                <CheckCircle2 className="w-5 h-5" />
                            ) : (
                                <span className="font-semibold">{index + 1}</span>
                            )}
                        </div>
                        <span className={clsx(
                            "text-xs mt-2 font-medium",
                            index === currentStep ? "text-blue-600" : "text-gray-500"
                        )}>
                            {index === 0 ? "Infos" : index === 1 ? "Structure" : "Dépendances"}
                        </span>
                    </div>
                    {index < totalSteps - 1 && (
                        <div className={clsx(
                            "h-0.5 w-12 mx-2",
                            index < currentStep ? "bg-blue-600" : "bg-gray-200"
                        )} />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

// Composant pour les cartes de module
const ModuleCard = ({
                        title,
                        description,
                        icon: Icon,
                        selected,
                        onClick
                    }: {
    title: string,
    description: string,
    icon: React.ElementType,
    selected: boolean,
    onClick: () => void
}) => {
    return (
        <div
            onClick={onClick}
            className={clsx(
                "relative p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer",
                "transform hover:scale-[1.02] hover:shadow-md",
                selected
                    ? "border-blue-600 bg-blue-50/50"
                    : "border-gray-200 hover:border-gray-300"
            )}
        >
            <div className={clsx(
                "absolute -right-2 -top-2 w-6 h-6 rounded-full",
                selected ? "bg-blue-600" : "bg-gray-200"
            )}>
                {selected && <Check className="w-4 h-4 text-white absolute top-1 left-1" />}
            </div>
            <div className="flex items-start">
                <div className={clsx(
                    "p-3 rounded-lg mr-4",
                    selected ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
                )}>
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                    <p className="text-sm text-gray-600">{description}</p>
                </div>
            </div>
        </div>
    );
};

// Composant pour l'en-tête des sections
const SectionHeader = ({ title, icon: Icon, expanded, onToggle }: {
    title: string,
    icon: React.ElementType,
    expanded: boolean,
    onToggle: () => void
}) => {
    return (
        <div
            className="flex justify-between items-center cursor-pointer py-4 px-1"
            onClick={onToggle}
        >
            <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            </div>
            <div className={clsx(
                "w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 transition-transform duration-300",
                expanded && "transform rotate-180"
            )}>
                <ChevronDown className="w-5 h-5 text-gray-600" />
            </div>
        </div>
    );
};

export function GenerateSpringProject() {
    const { generateAndDownload, isGenerating, error } = useProjectGeneration();
    const AVAILABLE_DEPENDENCIES = [
        { key: "swagger", label: "Swagger / OpenAPI" },
        { key: "testcontainers", label: "Testcontainers" },
        { key: "liquibase", label: "Liquibase" },
        { key: "security", label: "Spring Security" },
        { key: "actuator", label: "Spring Actuator" },
        { key: "graphql", label: "Spring GraphQL" },
        { key: "mapstruct", label: "MapStruct" },
        { key: "jpa", label: "Spring Data JPA" },
        { key: "vault", label: "Spring Vault" },
        { key: "validation", label: "Validation" },
        { key: "lombok", label: "Lombok" },
        { key: "web", label: "Spring Web" }
    ];

    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        projectName: "",
        groupId: "",
        artifactId: "",
        description: "",
        javaVersion: "17",
        gradleVersion: "7.5",
        modules: {
            core: true,
            api: true,
            service: true
        },
        dependencies: {
            platform: true,
            sgabsStarter: true,
            swagger: false,
            testcontainers: false,
            liquibase: false,
            security: false,
            actuator: false
        }
    });

    const [expandedSections, setExpandedSections] = useState({
        structure: true,
        dependencies: true,
        preview: false
    });

    const [notification, setNotification] = useState<{
        type: "success" | "error" | "info",
        message: string
    } | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'projectName' ? { artifactId: value } : {})
        }));
    };

    const handleModuleToggle = (module: string) => {
        setFormData(prev => ({
            ...prev,
            modules: {
                ...prev.modules,
                [module]: !prev.modules[module as keyof typeof prev.modules]
            }
        }));
    };

    const handleDependencyToggle = (dep: string) => {
        setFormData(prev => ({
            ...prev,
            dependencies: {
                ...prev.dependencies,
                [dep]: !prev.dependencies[dep as keyof typeof prev.dependencies]
            }
        }));
    };

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section as keyof typeof prev]
        }));
    };

    const nextStep = () => {
        setCurrentStep(prev => Math.min(prev + 1, 2));
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const projectRequest = {
            projectName: formData.projectName,
            groupId: formData.groupId,
            artifactId: formData.artifactId || formData.projectName,
            description: formData.description,
            javaVersion: formData.javaVersion,
            gradleVersion: formData.gradleVersion
        };

        console.log('Submitting project request:', projectRequest);

        const success = await generateAndDownload(projectRequest);

        if (success) {
            setNotification({
                type: "success",
                message: "Projet généré avec succès! Téléchargement en cours..."
            });
        } else {
            setNotification({
                type: "error",
                message: error || "Une erreur est survenue lors de la génération du projet."
            });
        }
    };

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="space-y-8 animate-fadeIn">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-2">
                                    Nom du projet <span className="text-blue-600">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        id="projectName"
                                        name="projectName"
                                        type="text"
                                        value={formData.projectName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow-sm"
                                        placeholder="mon-projet-spring"
                                        required
                                    />
                                    <FileCode className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="groupId" className="block text-sm font-medium text-gray-700 mb-2">
                                    Group ID <span className="text-blue-600">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        id="groupId"
                                        name="groupId"
                                        type="text"
                                        value={formData.groupId}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow-sm"
                                        placeholder="com.entreprise.projet"
                                        required
                                    />
                                    <Code2 className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow-sm"
                                rows={3}
                                placeholder="Description détaillée du projet (optionnelle)"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label htmlFor="javaVersion" className="block text-sm font-medium text-gray-700 mb-2">
                                    Version de Java
                                </label>
                                <div className="relative">
                                    <select
                                        id="javaVersion"
                                        name="javaVersion"
                                        value={formData.javaVersion}
                                        onChange={handleInputChange}
                                        className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white shadow-sm appearance-none"
                                    >
                                        <option value="17">Java 17 (LTS)</option>
                                        <option value="11">Java 11 (LTS)</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>




                            <div>
                                <label htmlFor="gradleVersion" className="block text-sm font-medium text-gray-700 mb-2">
                                    Version de Gradle
                                </label>
                                <div className="relative">
                                    <select
                                        id="gradleVersion"
                                        name="gradleVersion"
                                        value={formData.gradleVersion}
                                        onChange={handleInputChange}
                                        className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white shadow-sm appearance-none"
                                    >
                                        <option value="7.5">Gradle 7.5</option>
                                        <option value="7.4">Gradle 7.4</option>
                                        <option value="7.3">Gradle 7.3</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div className="space-y-8 animate-fadeIn">
                        <p className="text-gray-700 mb-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <AlertCircle className="inline w-5 h-5 text-blue-600 mr-2 relative -top-0.5" />
                            Sélectionnez les modules à inclure dans votre architecture hexagonale.
                        </p>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <ModuleCard
                                title="Core Module"
                                description="Logique métier et entités de domaine. Contient les ports et la définition des interfaces."
                                icon={Box}
                                selected={formData.modules.core}
                                onClick={() => handleModuleToggle('core')}
                            />

                            <ModuleCard
                                title="API Module"
                                description="Contrôleurs REST et adaptateurs primaires. Gestion des entrées du système."
                                icon={Layers}
                                selected={formData.modules.api}
                                onClick={() => handleModuleToggle('api')}
                            />

                            <ModuleCard
                                title="Service Module"
                                description="Services et adaptateurs secondaires. Implémentations et sorties du système."
                                icon={Code2}
                                selected={formData.modules.service}
                                onClick={() => handleModuleToggle('service')}
                            />
                        </div>

                        <div className="rounded-xl overflow-hidden border border-gray-200">
                            <SectionHeader
                                title="Prévisualisation de la structure"
                                icon={FileCode}
                                expanded={expandedSections.preview}
                                onToggle={() => toggleSection('preview')}
                            />

                            {expandedSections.preview && (
                                <div className="p-5 bg-gray-900 text-gray-100 font-mono rounded-b-xl overflow-x-auto text-sm">
                                    <pre>{formData.projectName || "my-project"}/
├── build.gradle.kts
├── settings.gradle.kts
├── gradle/
                                        {formData.modules.core ? `├── core/
│   ├── build.gradle.kts
    ├── lombok.config
│   └── src/
│       ├── main/java/com/${formData.groupId?.split('.').pop() || "example"}/core
│       │   ├── usecases/
│       │   ├── ports/
│       │   └── services/
│       └── test/java/` : ''}

                                        {formData.modules.api ? `├── api/
│   ├── build.gradle.kts
│   └── src/
│       ├── main/java/com/${formData.groupId?.split('.').pop() || "example"}/api
│       │   ├── controllers/
│       │   ├── dto/
│       │   └── mappers/
│       └── test/java/` : ''}
                                        {formData.modules.service ? `└── service/
    ├── build.gradle.kts
    └── src/
        ├── main/java/com/${formData.groupId?.split('.').pop() || "example"}/service
        │   ├── adapters/
        │   ├── config/
        │   └── repositories/
        └── test/java/` : ''}</pre>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-8 animate-fadeIn">
                        <p className="text-gray-700 mb-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <AlertCircle className="inline w-5 h-5 text-blue-600 mr-2 relative -top-0.5" />
                            Sélectionnez les dépendances supplémentaires pour votre projet.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                                <h3 className="font-semibold text-lg text-gray-800 mb-4">Incluses par défaut</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center text-gray-700">
                                        <div className="bg-green-100 p-2 rounded-lg mr-3">
                                            <Package className="w-4 h-4 text-green-600" />
                                        </div>
                                        <span>Plateform & Foundation</span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <div className="bg-green-100 p-2 rounded-lg mr-3">
                                            <Terminal className="w-4 h-4 text-green-600" />
                                        </div>
                                        <span>SGABS Starter</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                                <h3 className="font-semibold text-lg text-gray-800 mb-4">Dépendances optionnelles</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {AVAILABLE_DEPENDENCIES.map(dep => (
                                        <div key={dep.key} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100">
                                            <input
                                                type="checkbox"
                                                id={dep.key}
                                                checked={formData.dependencies[dep.key]}
                                                onChange={() => handleDependencyToggle(dep.key)}
                                                className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
                                            />
                                            <label htmlFor={dep.key} className="ml-3 cursor-pointer">{dep.label}</label>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>

                        <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
                            <h3 className="font-semibold text-gray-800 flex items-center mb-3">
                                <Settings className="w-5 h-5 mr-2 text-blue-600" />
                                Configuration générée
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <span className="text-sm text-gray-500">Nom du projet</span>
                                    <p className="font-medium">{formData.projectName || "Non défini"}</p>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-500">Group ID</span>
                                    <p className="font-medium">{formData.groupId || "Non défini"}</p>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-500">Version Java</span>
                                    <p className="font-medium">Java {formData.javaVersion}</p>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-500">Version Gradle</span>
                                    <p className="font-medium">Gradle {formData.gradleVersion}</p>
                                </div>
                                <div className="sm:col-span-2">
                                    <span className="text-sm text-gray-500">Modules</span>
                                    <p className="font-medium">
                                        {Object.entries(formData.modules)
                                            .filter(([_, isEnabled]) => isEnabled)
                                            .map(([name]) => name.charAt(0).toUpperCase() + name.slice(1))
                                            .join(', ')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4 py-10">
                {notification && (
                    <div className={clsx(
                        "fixed top-5 right-5 p-4 shadow-lg rounded-lg flex items-center justify-between z-50 animate-fade-in-down",
                        notification.type === "success" ? "bg-green-50 border-l-4 border-green-500" :
                            notification.type === "error" ? "bg-red-50 border-l-4 border-red-500" :
                                "bg-blue-50 border-l-4 border-blue-500"
                    )}>
                        <div className="flex items-center">
                            {notification.type === "success" && <CheckCircle2 className="h-6 w-6 text-green-500 mr-3" />}
                            {notification.type === "error" && <AlertCircle className="h-6 w-6 text-red-500 mr-3" />}
                            {notification.type === "info" && <AlertCircle className="h-6 w-6 text-blue-500 mr-3" />}
                            <span className={clsx(
                                notification.type === "success" ? "text-green-800" :
                                    notification.type === "error" ? "text-red-800" :
                                        "text-blue-800"
                            )}>{notification.message}</span>
                        </div>
                        <button
                            onClick={() => setNotification(null)}
                            className="text-gray-400 hover:text-gray-600 ml-4"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                )}

                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="mb-4 flex items-center justify-center">
                            <div className="bg-blue-600 text-white p-3 rounded-lg">
                                <Package className="w-8 h-8" />
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
                            Générateur de projet Spring Hexagonal
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Créez rapidement un projet Spring Boot avec architecture hexagonale optimisé et prêt à l'emploi.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <form onSubmit={handleSubmit}>
                            <div className="border-b border-gray-200 bg-gray-50 p-6">
                                <StepIndicator currentStep={currentStep} totalSteps={3} />
                            </div>

                            <div className="p-6 md:p-10">
                                {renderStep()}
                            </div>

                            <div className="bg-gray-50 p-6 flex justify-between items-center">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    disabled={currentStep === 0}
                                    className={clsx(
                                        "px-6 py-2.5 rounded-lg font-medium transition-all",
                                        currentStep === 0
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                                    )}
                                >
                                    Précédent
                                </button>

                                <div>
                                    {currentStep < 2 ? (
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all flex items-center"
                                        >
                                            Suivant
                                            <ArrowRight className="ml-2 w-4 h-4" />
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            disabled={isGenerating || !formData.projectName || !formData.groupId}
                                            className={clsx(
                                                "px-6 py-2.5 rounded-lg font-medium transition-all flex items-center",
                                                (isGenerating || !formData.projectName || !formData.groupId)
                                                    ? "bg-blue-400 text-white cursor-not-allowed"
                                                    : "bg-blue-600 text-white hover:bg-blue-700"
                                            )}
                                        >
                                            {isGenerating ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Génération en cours...
                                                </>
                                            ) : (
                                                <>
                                                    <Download className="w-5 h-5 mr-2" />
                                                    Générer le projet
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="mt-8 text-center text-sm text-gray-500 flex items-center justify-center">
                        <AlertCircle className="w-4 h-4 mr-2 text-blue-500" />
                        Les projets générés incluent Plateform et suivent les meilleures pratiques des Normes dev de SGABS.
                    </div>
                </div>
            </div>
        </div>
    );
}