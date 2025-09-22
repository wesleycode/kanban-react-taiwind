import { useDraggable } from "@dnd-kit/react";
import type { CardType } from "../../../application/types/CardType";
import { GripVertical, Plus, Trash } from "lucide-react";
import { useSectionContext } from "@/application/hooks/use-section-context";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import dayjs from "dayjs";
import { WidgetTimingSection } from "../widgets/widget-timing-section/WidgetTimingSection";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { WidgetListarSubTasks } from "../widgets/widget-listar-subtasks/WidgetListarSubtasks";
import { useState } from "react";

const subTaskFormSchema = z.object({
  titulo: z.string(),
});

type SubTaskFormSchemaType = z.infer<typeof subTaskFormSchema>;

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

  const form = useForm<SubTaskFormSchemaType>({
    resolver: zodResolver(subTaskFormSchema),
  });

  const [openDrawer, onOpenDrawer] = useState(false);

  return (
    <Drawer direction="right" open={openDrawer} onOpenChange={onOpenDrawer}>
      <Button onClick={() => onOpenDrawer(true)} className="bg-zinc-300 hover:bg-zinc-400" asChild>
        <div
          ref={ref}
          className={`group relative h-fit p-3 mt-3 rounded-md cursor-move transition-opacity ${isDragging ? 'opacity-50' : 'opacity-100'}`}
        >
          <div className='flex items-center justify-between text-zinc-900'>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <GripVertical size={16} className="text-zinc-500" />
                <h3 className='uppercase font-bold text-sm'>{title.length > 5 ? title.substring(0, 5).concat('...') : title}</h3>
              </div>
              <div className="flex text-xs flex-col gap-3 ml-6">
                <p className='text-zinc-600'>{description.length > 5 ? description.substring(0, 5).concat('...') : description}</p>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <p className="text-zinc-600">Entregar em - {dayjs(expires_at, 'DD/MM/YYYY HH:mm:ss').format('DD/MM/YYYY - HH:mm:ss')}</p>
                  <WidgetTimingSection
                    expires_at={expires_at}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Button>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex items-center justify-between">
            <h3>{title.toUpperCase()}</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className='text-xs p-2 cursor-pointer text-zinc-100 h-auto bg-red-500 hover:bg-red-600'
                >
                  <p>Apagar Tarefa</p>
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
                  <button onClick={() =>
                    removeTask({
                      section_id: sectionId,
                      task_id: id
                    })
                  }
                    className='flex bg-red-500 transition-colors rounded-sm text-sm p-2 items-center justify-center gap-1 text-zinc-200 hover:bg-red-400 cursor-pointer'>
                    Apagar
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
          <div className="flex flex-col gap-2 flex-wrap my-10 text-zinc-600">
            <div className="flex items-center gap-2">
              <p>Data de conclusão</p>
              <p>{dayjs(expires_at, 'DD/MM/YYYY HH:mm:ss').format('DD/MM/YYYY')}</p>
            </div>
            <div className="flex items-center gap-2">
              <p>Hora de conclusão</p>
              <p>{dayjs(expires_at, 'DD/MM/YYYY HH:mm:ss').format('HH:mm:ss')}</p>
            </div>
            <div className="flex items-center gap-2">
              <p>Status</p>
              <WidgetTimingSection
                expires_at={expires_at}
              />
            </div>
          </div>
          <p className="text-xs text-zinc-600 font-bold">Subtarefas</p>
          <div className="flex items-center flex-col gap-5 border-t-1 border-t-zinc-100 py-5">
            <Form {...form}>
              <FormField
                control={form.control}
                name="titulo"
                render={({ field }) => (
                  <div className="flex gap-3 items-center justify-between">
                    <FormItem className="w-full">
                      <FormControl className="">
                        <Input
                          className="text-zinc-700 bg-zinc-100 border-0"
                          placeholder="Descrição.."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <Button className="cursor-pointer">
                      <p className="text-xs">Adicionar Subtarefa</p>
                      <Plus />
                    </Button>
                  </div>
                )}
              />
            </Form>
            <WidgetListarSubTasks />
          </div>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" className="cursor-pointer">Voltar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}