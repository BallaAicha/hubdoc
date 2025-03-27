// Hook pour créer un nouveau service
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {APIService} from "../../types/api.ts";
import apiDocumentationService from "../../services/api-documentation-service.ts";

export const useCreateService = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newService: Omit<APIService, 'id'>) => apiDocumentationService.createService(newService),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] });
            queryClient.invalidateQueries({ queryKey: ['trigrammes'] });
        },
    });
};
