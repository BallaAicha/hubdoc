import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {X} from "lucide-react";
interface ApiServiceFormProps {
    onClose: () => void;
    onSuccess: (serviceId: string) => void;
}
export function ApiServiceForm({ onClose, onSuccess }: ApiServiceFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        trigramme: "",
        description: "",
        infrastructure: {
            urlInt: "",
            urlUat: "",
            urlOat: "",
            urlProd: ""
        },
        dataSources: {
            rabbitMQ: false,
            commonDB: false,
            dedicatedDB: false,
            s3: false
        },
        clientConsumers: [""],
        consumes: [""],
        consumedBy: [""],
        endpoints: [{
            method: "GET",
            path: "",
            curl: "",
            expectedResponse: "",
            description: ""
        }],
        databaseSchema: ""
    });
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...(prev[parent as keyof typeof prev] as Record<string, unknown>),
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        const [parent, child] = name.split('.');

        setFormData(prev => ({
            ...prev,
            [parent]: {
                ...(prev[parent as keyof typeof prev] as Record<string, unknown>),
                [child]: checked
            }
        }));
    };
    const handleArrayChange = (arrayName: string, index: number, value: string) => {
        setFormData(prev => {
            const newArray = [...prev[arrayName as keyof typeof prev] as string[]];
            newArray[index] = value;
            return { ...prev, [arrayName]: newArray };
        });
    };
    const addArrayItem = (arrayName: string) => {
        setFormData(prev => {
            const newArray = [...prev[arrayName as keyof typeof prev] as string[], ""];
            return { ...prev, [arrayName]: newArray };
        });
    };
    const removeArrayItem = (arrayName: string, index: number) => {
        setFormData(prev => {
            const newArray = [...prev[arrayName as keyof typeof prev] as string[]];
            newArray.splice(index, 1);
            return { ...prev, [arrayName]: newArray };
        });
    };
    const handleEndpointChange = (index: number, field: string, value: string) => {
        setFormData(prev => {
            const newEndpoints = [...prev.endpoints];
            newEndpoints[index] = {
                ...newEndpoints[index],
                [field]: value
            };
            return { ...prev, endpoints: newEndpoints };
        });
    };
    const addEndpoint = () => {
        setFormData(prev => ({
            ...prev,
            endpoints: [
                ...prev.endpoints,
                {
                    method: "GET",
                    path: "",
                    curl: "",
                    expectedResponse: "",
                    description: ""
                }
            ]
        }));
    };
    const removeEndpoint = (index: number) => {
        setFormData(prev => {
            const newEndpoints = [...prev.endpoints];
            newEndpoints.splice(index, 1);
            return { ...prev, endpoints: newEndpoints };
        });
    };
    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError("");

        try {
            const response = await axios.post('http://localhost:8080/api/', formData);
            if (response.data && response.data.id) {
                onSuccess(response.data.id);
            } else {
                setError("La réponse du serveur ne contient pas l'ID du service");
            }
        } catch (err) {
            setError("Une erreur s'est produite lors de la création du service");
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
                <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-neutral-900">
                        {currentStep === 1 ? "Générer une API Service (1/2)" : "Générer une API Service (2/2)"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-neutral-100"
                    >
                        <X className="h-6 w-6 text-neutral-500" />
                    </button>
                </div>

                <div className="p-6">
                    {currentStep === 1 ? (
                        <div className="space-y-6">
                            {/* Informations de base */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-neutral-800">Informations de base</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">Nom du service *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">Trigramme *</label>
                                        <input
                                            type="text"
                                            name="trigramme"
                                            value={formData.trigramme}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                            required
                                            maxLength={3}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Description *</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                        rows={3}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Infrastructure */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-neutral-800">Infrastructure</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">URL INT</label>
                                        <input
                                            type="text"
                                            name="infrastructure.urlInt"
                                            value={formData.infrastructure.urlInt}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">URL UAT</label>
                                        <input
                                            type="text"
                                            name="infrastructure.urlUat"
                                            value={formData.infrastructure.urlUat}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">URL OAT</label>
                                        <input
                                            type="text"
                                            name="infrastructure.urlOat"
                                            value={formData.infrastructure.urlOat}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">URL PROD</label>
                                        <input
                                            type="text"
                                            name="infrastructure.urlProd"
                                            value={formData.infrastructure.urlProd}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Sources de données */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-neutral-800">Sources de données</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="rabbitMQ"
                                            name="dataSources.rabbitMQ"
                                            checked={formData.dataSources.rabbitMQ}
                                            onChange={handleCheckboxChange}
                                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                                        />
                                        <label htmlFor="rabbitMQ" className="ml-2 block text-sm text-neutral-700">RabbitMQ</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="commonDB"
                                            name="dataSources.commonDB"
                                            checked={formData.dataSources.commonDB}
                                            onChange={handleCheckboxChange}
                                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                                        />
                                        <label htmlFor="commonDB" className="ml-2 block text-sm text-neutral-700">Base de données commune</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="dedicatedDB"
                                            name="dataSources.dedicatedDB"
                                            checked={formData.dataSources.dedicatedDB}
                                            onChange={handleCheckboxChange}
                                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                                        />
                                        <label htmlFor="dedicatedDB" className="ml-2 block text-sm text-neutral-700">Base de données dédiée</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="s3"
                                            name="dataSources.s3"
                                            checked={formData.dataSources.s3}
                                            onChange={handleCheckboxChange}
                                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                                        />
                                        <label htmlFor="s3" className="ml-2 block text-sm text-neutral-700">Stockage S3</label>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Schéma de base de données</label>
                                    <input
                                        type="text"
                                        name="databaseSchema"
                                        value={formData.databaseSchema}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                    />
                                </div>
                            </div>

                            {/* Clients Consommateurs */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-neutral-800">Clients Consommateurs</h3>
                                {formData.clientConsumers.map((consumer, index) => (
                                    <div key={`client-consumer-${index}`} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={consumer}
                                            onChange={(e) => handleArrayChange('clientConsumers', index, e.target.value)}
                                            className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                            placeholder="Nom du client consommateur"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeArrayItem('clientConsumers', index)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                            disabled={formData.clientConsumers.length <= 1}
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addArrayItem('clientConsumers')}
                                    className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium"
                                >
                                    + Ajouter un client consommateur
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Services consommés */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-neutral-800">Services consommés</h3>
                                {formData.consumes.map((service, index) => (
                                    <div key={`consumes-${index}`} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={service}
                                            onChange={(e) => handleArrayChange('consumes', index, e.target.value)}
                                            className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                            placeholder="Nom du service consommé"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeArrayItem('consumes', index)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                            disabled={formData.consumes.length <= 1}
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addArrayItem('consumes')}
                                    className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium"
                                >
                                    + Ajouter un service consommé
                                </button>
                            </div>

                            {/* Services consommateurs */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-neutral-800">Services consommateurs</h3>
                                {formData.consumedBy.map((service, index) => (
                                    <div key={`consumedBy-${index}`} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={service}
                                            onChange={(e) => handleArrayChange('consumedBy', index, e.target.value)}
                                            className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                            placeholder="Nom du service consommateur"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeArrayItem('consumedBy', index)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                            disabled={formData.consumedBy.length <= 1}
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addArrayItem('consumedBy')}
                                    className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium"
                                >
                                    + Ajouter un service consommateur
                                </button>
                            </div>

                            {/* Endpoints */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-neutral-800">Endpoints</h3>
                                {formData.endpoints.map((endpoint, index) => (
                                    <div key={`endpoint-${index}`} className="p-4 border border-neutral-200 rounded-lg space-y-3">
                                        <div className="flex justify-between">
                                            <h4 className="font-medium">Endpoint #{index + 1}</h4>
                                            <button
                                                type="button"
                                                onClick={() => removeEndpoint(index)}
                                                className="p-1 text-red-500 hover:bg-red-50 rounded-lg"
                                                disabled={formData.endpoints.length <= 1}
                                            >
                                                <X className="h-5 w-5" />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-neutral-700 mb-1">Méthode</label>
                                                <select
                                                    value={endpoint.method}
                                                    onChange={(e) => handleEndpointChange(index, 'method', e.target.value)}
                                                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                                >
                                                    <option value="GET">GET</option>
                                                    <option value="POST">POST</option>
                                                    <option value="PUT">PUT</option>
                                                    <option value="DELETE">DELETE</option>
                                                    <option value="PATCH">PATCH</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-neutral-700 mb-1">Chemin</label>
                                                <input
                                                    type="text"
                                                    value={endpoint.path}
                                                    onChange={(e) => handleEndpointChange(index, 'path', e.target.value)}
                                                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                                    placeholder="/api/v1/resource"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                                            <input
                                                type="text"
                                                value={endpoint.description}
                                                onChange={(e) => handleEndpointChange(index, 'description', e.target.value)}
                                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 mb-1">Exemple cURL</label>
                                            <textarea
                                                value={endpoint.curl}
                                                onChange={(e) => handleEndpointChange(index, 'curl', e.target.value)}
                                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 font-mono text-sm"
                                                rows={3}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 mb-1">Réponse attendue</label>
                                            <textarea
                                                value={endpoint.expectedResponse}
                                                onChange={(e) => handleEndpointChange(index, 'expectedResponse', e.target.value)}
                                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 font-mono text-sm"
                                                rows={3}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addEndpoint}
                                    className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium"
                                >
                                    + Ajouter un endpoint
                                </button>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}
                </div>

                <div className="sticky bottom-0 bg-white p-4 border-t flex justify-between">
                    {currentStep === 1 ? (
                        <>
                            <button
                                onClick={onClose}
                                className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 text-neutral-700"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={() => setCurrentStep(2)}
                                className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-black rounded-lg font-medium"
                                disabled={!formData.name || !formData.trigramme || !formData.description}
                            >
                                Suivant
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setCurrentStep(1)}
                                className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 text-neutral-700"
                            >
                                Précédent
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-black rounded-lg font-medium flex items-center"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Création en cours...
                                    </>
                                ) : "Créer le service"}
                            </button>
                        </>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}