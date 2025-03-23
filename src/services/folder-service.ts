
import apiClient from './api-client';
import {Folder} from "../types";
import {CreateFolderData} from "../hooks/useCreateFolder.ts";


class FolderService {
    getRootFolders() {
        return apiClient.get<Folder[]>('/folders/root').then(res => res.data);
    }

    getFolder(id: number) {
        return apiClient.get<Folder>(`/folders/${id}`).then(res => res.data);
    }

    getSubFolders(parentId: number) {
        return apiClient.get<Folder[]>(`/folders/${parentId}/subfolders`).then(res => res.data);
    }

    createFolder(folder: CreateFolderData): Promise<Folder> {
        return apiClient.post<Folder>('/folders', folder).then(res => res.data);
    }

}

export default new FolderService();