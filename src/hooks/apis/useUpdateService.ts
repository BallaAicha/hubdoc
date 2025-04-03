import {useMutation, useQueryClient} from "@tanstack/react-query";
import apiDocumentationService from "../../services/api-documentation-service.ts";
import {APIService} from "../../types/api.ts";
export const useUpdateService = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, service }: { id: string; service: APIService }) =>
            apiDocumentationService.updateService(id, service),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['service', variables.id] });
            queryClient.invalidateQueries({ queryKey: ['services'] });
        },
    });
};
