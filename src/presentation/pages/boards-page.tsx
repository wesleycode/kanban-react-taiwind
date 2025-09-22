import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DragDropProvider } from "@dnd-kit/react";
import { ChevronRight, Filter, Plus, Search } from "lucide-react";
import { Section } from "../components/section/Section";
import { useSectionContext } from "@/application/hooks/use-section-context";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { WidgetResumoProjeto } from "../components/widgets/widget-resumo-projeto";
import { useNavigate, useParams } from "react-router";
import { RoutesConstants } from "@/application/constants/RoutesConstants";

const formSectionSchema = z.object({
    titulo: z.string({ error: 'O titulo é obrigatório!' }).min(1, 'O titulo é obrigatório!'),
});

type FormSectionSchemaType = z.infer<typeof formSectionSchema>;

export function BoardsPage() {

    const {
        addSection,
        handleDragSection,
        sections,
    } = useSectionContext();

    const {
        id
    } = useParams();

    console.log(id);

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const form = useForm<FormSectionSchemaType>({
        resolver: zodResolver(formSectionSchema),
    });

    function resetFormulario() {
        return form.reset({
            titulo: '',
        });
    }

    function onSubmitForm({
        titulo,
    }: FormSectionSchemaType) {
        addSection({
            title: titulo,
        });
        setOpen(false);
        resetFormulario();
    }

    return (
        <div className='flex flex-col items-center min-h-screen w-screen bg-zinc-100 p-10'>
            <div className='max-w-6xl w-full'>

                <div className='mb-3'>
                    <div className='flex items-center gap-3 text-zinc-400 mb-20'>
                        <Button variant={'link'} onClick={() => navigate(RoutesConstants.PROJETOS_PAGE)} className="text-zinc-800 p-0 cursor-pointer">Meus Projetos</Button>
                        <span><ChevronRight size={15} /></span>
                        <p className='text-zinc-900'>Visão do Projeto</p>
                    </div>
                    <WidgetResumoProjeto />
                </div>

                <div className='flex items-center justify-between gap-3 mb-6'>
                    <div className='flex gap-3'>
                        <Button className='cursor-pointer bg-zinc-200 text-zinc-900 hover:bg-zinc-300'>
                            <Filter size={13} />
                            <p className='text-xs'>Filtros</p>
                        </Button>
                    </div>
                    <div className='flex gap-3'>
                        <div className='flex p-1 gap-2'>
                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger asChild>
                                    <Button className='cursor-pointer bg-zinc-200 text-zinc-900 hover:bg-zinc-300'>
                                        <Plus size={13} />
                                        <p className='text-xs'>Adicionar Seção</p>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-zinc-100 border-zinc-100 text-zinc-900 sm:max-w-[425px]">
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmitForm)}>
                                            <DialogHeader>
                                                <DialogTitle className="text-zinc-800">Criar novo Board</DialogTitle>
                                                <DialogDescription className="text-zinc-600">
                                                    Use este menu para criar um novo board
                                                </DialogDescription>
                                            </DialogHeader>

                                            <div className="grid gap-4 py-4">
                                                <FormField
                                                    control={form.control}
                                                    name="titulo"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-zinc-800">Titulo</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    className="bg-zinc-200 text-zinc-900"
                                                                    placeholder="Ex.: Em Teste"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormDescription className="text-zinc-600">
                                                                Este é o titulo do seu novo board de tarefas.
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
                                                        className='flex transition-colors rounded-sm text-sm p-2 items-center justify-center gap-1 text-zinc-800 cursor-pointer'
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
                            <Input className='bg-zinc-200 text-zinc-900 hover:bg-zinc-300 border-0' placeholder="Procurar..." />
                            <Button className='cursor-pointer bg-zinc-200 text-zinc-900 hover:bg-zinc-300'>
                                <Search />
                            </Button>
                        </div>
                    </div>
                </div>

                <DragDropProvider onDragEnd={handleDragSection}>
                    <div className='mb-6 flex gap-4 overflow-x-scroll no-scrollbar'>
                        {sections.map((section) => (
                            <Section
                                key={section.id}
                                id={section.id}
                                title={section.title}
                                cards={section.cards}
                            />
                        ))}
                    </div>
                </DragDropProvider>

            </div>
        </div>
    );
}