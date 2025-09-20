import { useDroppable } from "@dnd-kit/react";
import type { CardType } from "../../../application/types/CardType";
import { Card } from "../card/Card";
import { PlusCircle } from "lucide-react";
import { useSectionContext } from "@/application/hooks/use-section-context";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
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

const formSchema = z.object({
    titulo: z.string({ error: 'O titulo é obrigatório!' }).min(1, 'O titulo é obrigatório!'),
    descricao: z.string({ error: 'A descrição da tarefa é obrigatório!' }).min(1, 'A descrição é obrigatória!'),
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
    }: FormSchemaType) {
        addTask({
            section_id: id,
            titulo: titulo,
            descricao: descricao
        });
        setOpen(false);
        resetFormulario();
    }

    return (
        <div
            ref={ref}
            className={'flex flex-col p-3 rounded-md bg-gray-800 min-h-[600px] transition-colors'}
        >
            <h3 className='text-md text-gray-400 font-bold uppercase mb-2'>{title}</h3>
            <div className="flex-1">
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        {...card}
                    />
                ))}
            </div>
            <Drawer direction="right" open={open} onOpenChange={setOpen}>
                <DrawerTrigger>
                    <button className='flex mt-3 transition-colors rounded-sm text-sm p-2 items-center justify-center gap-1 text-white bg-emerald-500 hover:bg-emerald-400 cursor-pointer'>
                        <PlusCircle size={16} />
                        Criar Novo
                    </button>
                </DrawerTrigger>
                <DrawerContent className="bg-gray-800 border-l-gray-800">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmitForm)}>
                            <DrawerHeader>
                                <DrawerTitle className="text-gray-100">Criar nova task</DrawerTitle>
                                <DrawerDescription className="text-gray-300">Use este menu para criar uma nova task</DrawerDescription>
                                <FormField
                                    control={form.control}
                                    name="titulo"
                                    render={({ field }) => (
                                        <FormItem className="mt-3">
                                            <FormLabel className="text-gray-100">Titulo</FormLabel>
                                            <FormControl>
                                                <Input className="text-gray-100" placeholder="Ex.: Titulo da tarefa" {...field} />
                                            </FormControl>
                                            <FormDescription className="text-gray-100">
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
                                        <FormItem className="mt-3">
                                            <FormLabel className="text-gray-100">Descricao</FormLabel>
                                            <FormControl>
                                                <Input className="text-gray-100" placeholder="Ex.: Descrição da tarefa" {...field} />
                                            </FormControl>
                                            <FormDescription className="text-gray-100">
                                                Este é a descrição da sua tarefa
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </DrawerHeader>
                            <DrawerFooter>
                                <button
                                    type="submit"
                                    className='flex mt-3 transition-colors w-full rounded-sm text-sm p-2 items-center justify-center gap-1 text-white bg-emerald-500 hover:bg-emerald-400 cursor-pointer'
                                >
                                    <PlusCircle size={16} />
                                    Adicionar
                                </button>
                                <DrawerClose asChild>
                                    <button
                                        onClick={() => {
                                            resetFormulario();
                                        }}
                                        className='flex w-full mt-3 transition-colors rounded-sm text-sm p-2 items-center justify-center gap-1 text-white bg-red-500 hover:bg-red-400 cursor-pointer'
                                    >
                                        Cancelar
                                    </button>
                                </DrawerClose>
                            </DrawerFooter>
                        </form>
                    </Form>
                </DrawerContent>
            </Drawer>
        </div>
    );
}