
import apiClient from './api-client';
import {Folder} from "../types";
import {CreateFolderData} from "../hooks/useCreateFolder.ts";


class FolderService {
    async getRootFolders() {
        const res = await apiClient.get<Folder[]>('/folders/root');
        return res.data;
    }

    async getFolder(id: number) {
        const res = await apiClient.get<Folder>(`/folders/${id}`);
        return res.data;
    }

    async getSubFolders(parentId: number) {
        const res = await apiClient.get<Folder[]>(`/folders/${parentId}/subfolders`);
        return res.data;
    }

    async createFolder(folder: CreateFolderData): Promise<Folder> {
        const res = await apiClient.post<Folder>('/folders', folder);
        return res.data;
    }

}

export default new FolderService();