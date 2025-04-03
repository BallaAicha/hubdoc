import axios from 'axios';
import { APIService } from '../types/api';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

class APIDocumentationService {
    async getAllTrigrammes() {
        const res = await apiClient.get<string[]>('/trigrammes');
        return res.data;
    }

    async getServicesByTrigramme(trigramme: string) {
        const res = await apiClient.get<APIService[]>(`/trigramme/${trigramme}`);
        return res.data;
    }

    async getServiceById(id: string) {
        const res = await apiClient.get<APIService>(`/services/${id}`);
        return res.data;
    }

    async createService(service: Omit<APIService, 'id'>) {
        const res = await apiClient.post<APIService>('/services', service);
        return res.data;
    }

    async updateService(id: string, service: APIService) {
        const res = await apiClient.put<APIService>(`/services/${id}`, service);
        return res.data;
    }

    deleteService(id: string) {
        return apiClient.delete(`/services/${id}`);
    }
}

export default new APIDocumentationService();