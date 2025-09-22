import { getListarProjeto } from "@/infrastructure/api/projetos/projetos-api";
import { useQuery } from "@tanstack/react-query";

export function useListarProjeto({ id }: { id?: string }) {
    return useQuery({
        queryKey: ['get-listar-projetos', id],
        queryFn: async () => getListarProjeto({ id }),
    });
}