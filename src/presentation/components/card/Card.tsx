import { useDraggable } from "@dnd-kit/react";
import type { CardType } from "../../../application/types/CardType";
import { GripVertical, Trash } from "lucide-react";
import { useSectionContext } from "@/application/hooks/use-section-context";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import dayjs from "dayjs";
import { WidgetTimingSection } from "../widgets/widget-timing-section/WidgetTimingSection";

export function Card({
  id,
  title,
  description,
  expires_at,
  sectionId
}: CardType) {

  const {
    removeTask
  } = useSectionContext();

  const { ref, isDragging, } = useDraggable({
    id: id.toString(),
    data: { sectionId }
  });

  return (
    <div
      ref={ref}
      className={`group relative bg-zinc-300 h-fit p-3 mt-3 rounded-md cursor-move transition-opacity ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className='flex items-center justify-between text-zinc-900'>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <GripVertical size={16} className="text-zinc-500" />
            <h3 className='uppercase font-bold text-sm'>{title}</h3>
          </div>
          <div className="flex text-xs flex-col gap-3 ml-6">
            <p className='text-zinc-600'>{description}</p>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <p className="text-zinc-600">Entregar em - {dayjs(expires_at, 'DD/MM/YYYY HH:mm:ss').format('DD/MM/YYYY - HH:mm:ss')}</p>
              <WidgetTimingSection 
                expires_at={expires_at}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-2 right-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-10">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className='text-xs p-2 cursor-pointer text-zinc-700 h-auto bg-zinc-300 hover:bg-zinc-400'
            >
              <Trash size={13} /> 
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-100 border-zinc-100 text-zinc-900 sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-zinc-900">Confirmação</DialogTitle>
              <DialogDescription className="text-zinc-700">
                Tem certeza que deseja apagar esta tarefa neste board?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-col gap-2 sm:flex-row">
              <DialogClose asChild>
                <button
                  className='flex transition-colors rounded-sm text-sm p-2 items-center justify-center gap-1 text-zinc-900 cursor-pointer'
                >
                  Cancelar
                </button>
              </DialogClose>
              <button onClick={() => removeTask({ section_id: sectionId, task_id: id })} className='flex bg-red-500 transition-colors rounded-sm text-sm p-2 items-center justify-center gap-1 text-zinc-200 hover:bg-red-400 cursor-pointer'>
                Apagar
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}