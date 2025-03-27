// Hook pour supprimer un service
import {useMutation, useQueryClient} from "@tanstack/react-query";
import apiDocumentationService from "../../services/api-documentation-service.ts";

export const useDeleteService = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => apiDocumentationService.deleteService(id),
        onSuccess: (_) => {
            queryClient.invalidateQueries({ queryKey: ['services'] });
            queryClient.invalidateQueries({ queryKey: ['trigrammes'] });
        },
    });
};
