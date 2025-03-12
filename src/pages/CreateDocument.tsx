import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export function CreateDocument() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Nouveau document soumis:', formData);

        // Rediriger vers la page principale des documents après création
        navigate('/documents');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e9041e] via-white to-gray-100 py-10">
            <div className="container mx-auto max-w-4xl px-6 bg-white shadow-lg rounded-lg p-8">
                {/* Header Section */}
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Créer un nouveau document
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Remplissez les informations nécessaires pour créer un document.
                    </p>
                </header>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Document Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Nom du document <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData((prev) => ({...prev, name: e.target.value}))
                            }
                            placeholder="Entrez le nom"
                            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-[#e9041e] focus:border-[#e9041e] sm:text-sm"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Description (facultatif)
                        </label>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData((prev) => ({...prev, description: e.target.value}))
                            }
                            rows={4}
                            placeholder="Ajoutez une description"
                            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-[#e9041e] focus:border-[#e9041e] sm:text-sm"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 rounded-lg bg-[#e9041e] text-white font-semibold hover:bg-red-600 transition"
                        >
                            Créer le document
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}