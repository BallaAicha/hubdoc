import { useQuery } from '@tanstack/react-query';
import folderService from '../services/folder-service';
import { Folder } from '../types';
export const useFolder = (id: number) => {
    return useQuery<Folder, Error>({
        queryKey: ['folder', id],
        queryFn: () => folderService.getFolder(id),
        staleTime: 10 * 1000,
    });
};