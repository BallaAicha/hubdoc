import { useQuery } from '@tanstack/react-query';
import folderService from '../services/folder-service';
import { Folder } from '../types';
export const useRootFolders = () => {
    return useQuery<Folder[], Error>({
        queryKey: ['rootFolders'],
        queryFn: folderService.getRootFolders,
        staleTime: 10 * 1000,
    });
};