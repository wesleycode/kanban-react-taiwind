import { useSectionContext } from "@/application/hooks/use-section-context";
import { CircleUserRound, Dot } from "lucide-react";

export function WidgetResumoProjeto() {

    const {
        sections_count,
        cards_count,
    } = useSectionContext();

    return (
        <div className='flex flex-col gap-3 text-zinc-900 border-b-zinc-200 border-b-2 pb-3'>
            <div>
                <h2 className='text-3xl'>Projeto: Boarding</h2>
            </div>
            <div className='flex flex-wrap items-center justify-between'>
                <div className='flex flex-wrap gap-1 items-center text-sm'>
                    <div className='flex gap-1'>
                        <p className='text-zinc-700'>Boards Ativos: </p>
                        <strong className='font-bold'>{sections_count}</strong>
                    </div>
                    <span><Dot /></span>
                    <div className='flex gap-1'>
                        <p className='text-zinc-700'>Cards Ativos: </p>
                        <strong className='font-bold'>{cards_count}</strong>
                    </div>
                    <span><Dot /></span>
                    <div className='flex gap-1'>
                        <p className='text-zinc-700'>Target: </p>
                        <strong className='font-bold'>$175.000</strong>
                    </div>
                </div>
                <div className='flex items-center'>
                    <CircleUserRound className="w-8 h-8 -mr-4" />
                </div>
            </div>
        </div>
    );
}