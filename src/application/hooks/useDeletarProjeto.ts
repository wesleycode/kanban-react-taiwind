import { deleteProjeto } from "@/infrastructure/api/projetos/projetos-api";
import { useMutation } from "@tanstack/react-query";

export function useDeletarProjeto() {
    return useMutation({
        mutationKey: ['delete-projeto'],
        mutationFn: deleteProjeto,
    });
}