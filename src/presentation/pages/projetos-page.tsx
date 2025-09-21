import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { WidgetListarProjetos } from "../components/widgets/widget-listar-projetos/WidgetListarProjetos";

const formSectionSchema = z.object({
    nome: z.string({ error: 'O nome do projeto é obrigatório!' }).min(1, 'O nome do projeto é obrigatório!'),
    descricao: z.string({ error: 'Adicione pelo menos uma descrição simples' }).min(5, 'Adicione pelo menos 5 caracteres nesta descrição deste projeto!'),
});

type FormSectionSchemaType = z.infer<typeof formSectionSchema>;

export function ProjetosPage() {

    const form = useForm<FormSectionSchemaType>({
        resolver: zodResolver(formSectionSchema),
    });

    function resetFormulario() {
        return form.reset({
            nome: '',
            descricao: '',
        });
    }

    function onSubmitForm({
        nome,
        descricao,
    }: FormSectionSchemaType) {
        console.log({ nome, descricao })
        // setProjetos((oldProject) => [...oldProject, { id: 1, titulo: nome, descricao: descricao, atualizado_em: new Date().toString() }])
        resetFormulario();
    }

    return (
        <div className='flex flex-col items-center min-h-screen w-screen bg-zinc-100 p-10'>
            <div className='max-w-6xl w-full'>
                <div className='mb-3'>
                    <div className='flex items-center gap-3 text-zinc-900 mb-20'>
                        <p>Meus Projetos</p>
                    </div>
                    <div className='flex flex-col gap-3 text-zinc-900 border-b-2 border-b-zinc-300 pb-3'>
                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <h2 className='text-3xl'>Meus Projetos</h2>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-zinc-100 cursor-pointer">
                                        <p>Novo Projeto</p>
                                        <Plus />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-zinc-100 border-zinc-100 text-zinc-900 sm:max-w-[425px]">
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmitForm)}>
                                            <DialogHeader>
                                                <DialogTitle className="text-zinc-900">Novo Projeto</DialogTitle>
                                                <DialogDescription className="text-zinc-600">
                                                    Use este menu para criar um novo projeto
                                                </DialogDescription>
                                            </DialogHeader>

                                            <div className="grid gap-4 py-4">
                                                <FormField
                                                    control={form.control}
                                                    name="nome"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-zinc-900">Nome</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    className="text-zinc-900 bg-zinc-100 border-zinc-200"
                                                                    placeholder="Ex.: Meu Super Projeto"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormDescription className="text-zinc-600">
                                                                Este é o titulo do seu novo projeto.
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
                                                            <FormLabel className="text-zinc-900">Descrição</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    className="text-zinc-900 bg-zinc-100 border-zinc-200"
                                                                    placeholder="Ex.: Este meu projeto faz os gerenciamento dos meus produtos"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormDescription className="text-zinc-600">
                                                                Esta é uma descrição simples do que seu projeto faz.
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
                                                <DialogClose asChild>
                                                    <button
                                                        type="submit"
                                                        className='flex pl-3 transition-colors rounded-sm text-sm p-2 items-center justify-center gap-1 text-zinc-800 bg-emerald-500 hover:bg-emerald-400 cursor-pointer'
                                                    >
                                                        Criar
                                                        <Plus />
                                                    </button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </form>
                                    </Form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <div>
                        <WidgetListarProjetos />
                    </div>
                </div>
            </div>
        </div>
    );
}