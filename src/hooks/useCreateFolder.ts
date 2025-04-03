import { useMutation, useQueryClient } from '@tanstack/react-query';
import folderService from '../services/folder-service';
import {Folder} from "../types";
export interface CreateFolderData {
    name: string;
    description: string;
    parentId: number | null;
}
export const useCreateFolder = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation<Folder, Error, CreateFolderData>({
        mutationFn: folderService.createFolder,
        onMutate: async (newFolder) => {
            await queryClient.cancelQueries({ queryKey: ['folders'] });
            await queryClient.cancelQueries({ queryKey: ['rootFolders'] });
            if (newFolder.parentId) {
                await queryClient.cancelQueries({ queryKey: ['subFolders', newFolder.parentId] });
            }
            const queryKey = newFolder.parentId
                ? ['subFolders', newFolder.parentId]
                : ['rootFolders'];
            const previousFolders = queryClient.getQueryData<Folder[]>(queryKey) || [];
            const optimisticFolder: Folder = {
                ...newFolder,
                id: Math.random(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                subFolderIds: [],
                documentIds: []
            };
            queryClient.setQueryData<Folder[]>(queryKey, [...previousFolders, optimisticFolder]);
            return { previousFolders, queryKey };
        },
        onSuccess: (newFolder) => {
            queryClient.invalidateQueries({ queryKey: ['folders'] });
            queryClient.invalidateQueries({ queryKey: ['rootFolders'] });
            if (newFolder.parentId) {
                queryClient.invalidateQueries({ queryKey: ['subFolders', newFolder.parentId] });
                queryClient.setQueryData(['folder', newFolder.parentId], (oldData: Folder | undefined) => {
                    if (!oldData) return oldData;
                    return {
                        ...oldData,
                        subFolderIds: [...oldData.subFolderIds, newFolder.id]
                    };
                });
            }
            if (onSuccess) {
                onSuccess();
            }
        },
        onError: (_, _newFolder, context: any) => {
            if (!context) return;
            queryClient.setQueryData(context.queryKey, context.previousFolders);
        }
    });
};