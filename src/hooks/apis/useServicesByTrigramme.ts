import {useQuery} from "@tanstack/react-query";
import {APIService} from "../../types/api.ts";
import apiDocumentationService from "../../services/api-documentation-service.ts";
export const useServicesByTrigramme = (trigramme: string | null) => {
    return useQuery<APIService[], Error>({
        queryKey: ['services', 'trigramme', trigramme],
        queryFn: () => trigramme ? apiDocumentationService.getServicesByTrigramme(trigramme) : Promise.resolve([]),
        staleTime: 30 * 1000, // Cache for 30 seconds
        enabled: !!trigramme, // Only run query if trigramme is provided
    });
};
