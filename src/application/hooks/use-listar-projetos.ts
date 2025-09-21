import { getListarProjetos } from "@/infrastructure/api/projetos/projetos-api";
import { useQuery } from "@tanstack/react-query";

export function useListarProjetos() {
    return useQuery({
        queryKey: ['get-listar-projetos'],
        queryFn: getListarProjetos
    });
}