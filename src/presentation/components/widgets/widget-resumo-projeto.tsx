import { useListarProjeto } from "@/application/hooks/use-listar-projeto";
import { useSectionContext } from "@/application/hooks/use-section-context";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { CircleUserRound, Dot } from "lucide-react";

export function WidgetResumoProjeto({
    id
}: { id: string }) {

    const {
        sections_count,
        tasks_active,
        tasks_finished,
    } = useSectionContext();

    const {
        data: projetoData,
        isLoading: isLoadingProjetoData,
    } = useListarProjeto({
        id: id,
    });

    return (
        <div className='flex flex-col gap-3 text-zinc-900 border-b-zinc-200 border-b-2 pb-3'>
            <div>
                {isLoadingProjetoData ? (
                    <div className="flex items-center gap-3">
                        <h2 className='text-3xl'>
                            Projeto:
                        </h2>
                        <Spinner variant="ring" className="text-emerald-500" />
                    </div>
                ) : (
                    <h2 className='text-3xl'>
                        Projeto: {projetoData && projetoData.titulo}
                    </h2>
                )}
            </div>
            <div className='flex flex-wrap items-center justify-between'>
                <div className='flex flex-wrap gap-1 items-center text-sm'>
                    <div className='flex gap-1'>
                        <p className='text-zinc-700'>Boards Ativos: </p>
                        <strong className='font-bold'>{sections_count}</strong>
                    </div>
                    <span><Dot /></span>
                    <div className='flex gap-1'>
                        <p className='text-zinc-700'>Tarefas Ativas: </p>
                        <strong className='font-bold'>{tasks_active}</strong>
                    </div>
                    <span><Dot /></span>
                    <div className='flex gap-1'>
                        <p className='text-zinc-700'>Tarefas Finalizadas: </p>
                        <strong className='font-bold'>{tasks_finished}</strong>
                    </div>
                </div>
                <div className='flex items-center'>
                    <CircleUserRound className="w-8 h-8 -mr-4" />
                </div>
            </div>
        </div>
    );
}