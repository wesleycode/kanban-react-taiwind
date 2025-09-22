import { useListarSubTasks } from "@/application/hooks/useListarSubTasks";
import { Checkbox } from "@/components/ui/checkbox";
import { WidgetLoading } from "../widget-loading/WidgetLoading";
import { CheckCheck } from "lucide-react";

export function WidgetListarSubTasks() {

    const {
        data: listaSubTasks,
        isLoading: isLoadingSubTasks
    } = useListarSubTasks();

    if (isLoadingSubTasks) {
        return (
            <WidgetLoading />
        );
    }

    if (listaSubTasks && listaSubTasks.length > 0) {
        return (
            <div className="flex flex-col gap-2 w-full">
                {listaSubTasks.map((subtarefa) => {
                    return (
                        <div key={subtarefa.id + '-sub-task'} className="flex gap-2 items-center">
                            <Checkbox checked={subtarefa.finalizada} />
                            <p>{subtarefa.titulo}</p>
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col gap-2 items-center justify-center min-h-52">
                <CheckCheck className="text-emerald-500" />
                <h2 className="text-md font-semibold">Sem subtarefas pendentes.</h2>
                <p className="text-sm text-zinc-500">Tente adicionar outra subtarefa</p>
            </div>
        </div>
    );
}