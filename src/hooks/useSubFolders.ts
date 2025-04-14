import { useQuery } from '@tanstack/react-query';
import { Folder } from '../types';
import folderService from "../services/folder-service.ts";
export const useSubFolders = (parentId: number | null) => {
    return useQuery<Folder[], Error>({
        queryKey: ['subFolders', parentId],
        queryFn: () => folderService.getSubFolders(parentId),
        staleTime: 10 * 1000,
        // Ne pas exécuter la requête si on est à la racine (parentId = 0)
        enabled: parentId > 0,
    });
};