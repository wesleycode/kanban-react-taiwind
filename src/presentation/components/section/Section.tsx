import { useDroppable } from "@dnd-kit/react";
import type { CardType } from "../../../application/types/CardType";
import { Card } from "../card/Card";
import { CalendarIcon, Plus, Trash } from "lucide-react";
import { useSectionContext } from "@/application/hooks/use-section-context";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import dayjs from "dayjs";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    titulo: z.string({ error: 'O titulo é obrigatório!' }).min(1, 'O titulo é obrigatório!'),
    descricao: z.string({ error: 'A descrição da tarefa é obrigatório!' }).min(1, 'A descrição é obrigatória!'),
    data_tarefa: z.date(),
    hora_tarefa: z.string('Formato de hora inválido'),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function Section({
    id,
    title,
    cards
}: {
    id: string;
    title: string;
    cards: CardType[];
}) {

    const [open, setOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    const {
        addTask,
        removeSection,
    } = useSectionContext();

    const { ref } = useDroppable({
        id: id,
    });

    function resetFormulario() {
        return form.reset({
            titulo: '',
            descricao: ''
        });
    }

    function onSubmitForm({
        titulo,
        descricao,
        data_tarefa,
        hora_tarefa
    }: FormSchemaType) {

        if (!data_tarefa || !hora_tarefa) {
            console.error('Data ou hora não informada');
            return;
        }

        const dataCompleta = dayjs(data_tarefa)
            .set('hour', parseInt(hora_tarefa.split(':')[0]))
            .set('minute', parseInt(hora_tarefa.split(':')[1]))
            .set('second', 0);

        const dataFormatada = dataCompleta.format('DD/MM/YYYY HH:mm:ss');

        addTask({
            section_id: id,
            titulo: titulo,
            descricao: descricao,
            expira_em: dataFormatada,
        });

        setOpen(false);
        resetFormulario();
    }

    return (
        <div
            ref={ref}
            className={'flex flex-col p-3 rounded-md bg-zinc-200 min-h-[600px] w-full max-w-[300px] transition-colors'}
        >
            <div className="flex w-full items-center justify-between gap-3 flex-wrap">
                <h3 className='text-md text-zinc-900 font-bold uppercase mb-2'>{title} ({cards.length})</h3>
                <Dialog>
                    <DialogTrigger asChild>
                        <button className='flex transition-colors rounded-sm text-sm p-2 items-center justify-center gap-1 text-zinc-200 hover:bg-red-400 cursor-pointer'>
                            <Trash size={16} />
                        </button>
                    </DialogTrigger>
                    <DialogContent className="bg-zinc-800 border-zinc-700 text-zinc-700 sm:max-w-[425px]">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmitForm)}>
                                <DialogHeader>
                                    <DialogTitle className="text-zinc-700">Confirmação</DialogTitle>
                                    <DialogDescription className="text-zinc-300">
                                        Tem certeza que deseja apagar este board com todas as tarefas nele?
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="flex flex-col gap-2 sm:flex-row">
                                    <DialogClose asChild>
                                        <button
                                            onClick={() => {
                                                resetFormulario();
                                            }}
                                            className='flex transition-colors rounded-sm text-sm p-2 items-center justify-center gap-1 text-white cursor-pointer'
                                        >
                                            Cancelar
                                        </button>
                                    </DialogClose>
                                    <button onClick={() => removeSection({ id_section: id })} className='flex bg-red-500 transition-colors rounded-sm text-sm p-2 items-center justify-center gap-1 text-zinc-200 hover:bg-red-400 cursor-pointer'>
                                        Apagar
                                    </button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex flex-col gap-2 items-center">
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        {...card}
                    />
                ))}
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <button className='flex mt-3 transition-colors rounded-sm text-sm p-2 items-center justify-center gap-1 text-zinc-900 bg-emerald-500 hover:bg-emerald-400 cursor-pointer'>
                        <Plus size={16} />
                        Nova Tarefa
                    </button>
                </DialogTrigger>
                <DialogContent className="bg-zinc-100 border-zinc-700 text-zinc-700 sm:max-w-[425px]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmitForm)}>
                            <DialogHeader>
                                <DialogTitle className="text-zinc-700">Criar nova task</DialogTitle>
                                <DialogDescription className="text-zinc-700">
                                    Use este menu para criar uma nova task
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-4 py-4">
                                <FormField
                                    control={form.control}
                                    name="titulo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-zinc-700">Titulo</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-zinc-700 bg-zinc-100 border-zinc-600"
                                                    placeholder="Ex.: Titulo da tarefa"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-zinc-400">
                                                Este é o titulo da sua tarefa
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="descricao"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-zinc-700">Descrição</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    className="text-zinc-700 min-h-[200px] bg-zinc-100 border-zinc-600"
                                                    placeholder="Ex.: Descrição da tarefa"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-zinc-400">
                                                Esta é a descrição da sua tarefa
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="data_tarefa"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <div className="flex justify-between">
                                                <FormLabel className="w-fit">Data de entrega</FormLabel>
                                                <FormLabel className="w-fit">Hora de entrega</FormLabel>
                                            </div>
                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                <div>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "pl-3 text-left font-normal bg-zinc-100 border-[1px] border-zinc-600 hover:bg-zinc-100 hover:text-zinc-700",
                                                                        !field.value && "text-zinc-700"
                                                                    )}
                                                                >
                                                                    {field.value ? (
                                                                        <p className="text-zinc-700">{dayjs(field.value).format('DD/MM/YYYY')}</p>
                                                                    ) : (
                                                                        <span>Escolha uma data</span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) =>
                                                                    dayjs(date).isBefore(dayjs(), 'day')
                                                                }
                                                                captionLayout="dropdown"
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                                <div>
                                                    <Input
                                                        type="time"
                                                        id="time-picker"
                                                        step="1"
                                                        defaultValue="09:00"
                                                        className="bg-zinc-100 border-zinc-600 hover:bg-zinc-100 hover:text-zinc-700 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none w-fit"
                                                        {...form.register('hora_tarefa')}
                                                    />
                                                </div>
                                            </div>
                                            <FormDescription className="text-zinc-400">
                                                Esta é a data para finalizar esta tarefa
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <DialogFooter className="flex flex-col gap-2 sm:flex-row">
                                <DialogClose asChild>
                                    <button
                                        onClick={() => {
                                            resetFormulario();
                                        }}
                                        className='flex transition-colors rounded-sm text-sm p-2 items-center justify-center gap-1 cursor-pointer'
                                    >
                                        Cancelar
                                    </button>
                                </DialogClose>
                                <button
                                    type="submit"
                                    className='flex transition-colors rounded-sm text-sm p-2 items-center justify-center gap-1 text-white bg-emerald-500 hover:bg-emerald-400 cursor-pointer'
                                >
                                    Adicionar
                                </button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}