// Hook pour récupérer un service par ID
import {useQuery} from "@tanstack/react-query";
import {APIService} from "../../types/api.ts";
import apiDocumentationService from "../../services/api-documentation-service.ts";

export const useService = (id: string | null) => {
    return useQuery<APIService, Error>({
        queryKey: ['service', id],
        queryFn: () => apiDocumentationService.getServiceById(id!),
        staleTime: 30 * 1000,
        enabled: !!id, // Only run query if id is provided
    });
};
