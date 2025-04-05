import { ProjectRequest } from '../types/project';
import apiClient from './api-client';

export const generateProject = async (data: ProjectRequest): Promise<Blob> => {
    try {
        const response = await apiClient.post('/generate-project', data, {
            responseType: 'blob'
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to generate project');
    }
};