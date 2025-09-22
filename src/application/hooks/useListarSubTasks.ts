import { getListarSubTasks } from "@/infrastructure/api/tarefas/tarefas-api";
import { useQuery } from "@tanstack/react-query";

export function useListarSubTasks() {
    return useQuery({
        queryKey: ['get-listar-sub-tasks'],
        queryFn: getListarSubTasks
    });
}