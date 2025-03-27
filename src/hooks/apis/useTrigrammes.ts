import {useQuery} from "@tanstack/react-query";
import apiDocumentationService from "../../services/api-documentation-service.ts";


export const useTrigrammes = () => {
    return useQuery<string[], Error>({
        queryKey: ['trigrammes'],
        queryFn: () => apiDocumentationService.getAllTrigrammes(),
        staleTime: 60 * 1000, // Cache for 1 minute
    });
};
