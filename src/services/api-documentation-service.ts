import axios from 'axios';
import { APIService } from '../types/api';

// Définition de la base URL - peut être configuré via des variables d'environnement
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

class APIDocumentationService {
    getAllTrigrammes() {
        return apiClient.get<string[]>('/trigrammes').then(res => res.data);
    }

    getServicesByTrigramme(trigramme: string) {
        return apiClient.get<APIService[]>(`/services/trigramme/${trigramme}`).then(res => res.data);
    }

    getServiceById(id: string) {
        return apiClient.get<APIService>(`/services/${id}`).then(res => res.data);
    }

    createService(service: Omit<APIService, 'id'>) {
        return apiClient.post<APIService>('/services', service).then(res => res.data);
    }

    updateService(id: string, service: APIService) {
        return apiClient.put<APIService>(`/services/${id}`, service).then(res => res.data);
    }

    deleteService(id: string) {
        return apiClient.delete(`/services/${id}`);
    }
}

export default new APIDocumentationService();