
import apiClient from './api-client';
import {Folder} from "../types";


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
}

export default new FolderService();