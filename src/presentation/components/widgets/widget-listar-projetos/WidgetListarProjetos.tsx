import { useListarProjetos } from "@/application/hooks/use-listar-projetos";
import { useNavigate } from "react-router";
import { WidgetLoading } from "../widget-loading/WidgetLoading";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ExternalLink, Package, Trash } from "lucide-react";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";

export function WidgetListarProjetos() {

    const navigate = useNavigate();

    const {
        data: projetosList,
        isLoading: isLoadingProjetosList,
    } = useListarProjetos();

    if (isLoadingProjetosList) {
        return (
            <WidgetLoading
                text="Carregando!"
                size="lg"
            />
        );
    }

    if (projetosList && projetosList.length > 0) {
        return (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 py-10 place-items-center">
                {projetosList.map((projeto) => {
                    return (
                        <Card key={'projeto-' + projeto.id} className="w-full max-w-sm bg-zinc-100 border-zinc-300 text-zinc-800 h-full max-h-72">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between gap-3 flex-wrap">
                                    <h2>{projeto.titulo}</h2>
                                    <Package />
                                </CardTitle>
                                <CardDescription className="line-clamp-3 text-zinc-400">
                                    {projeto.descricao}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm h-full">
                                <p>Ultima atualização em</p>
                                <p className="text-zinc-400">{dayjs(projeto.atualizado_em).format('DD/MM/YYYY HH:mm:ss')}</p>
                            </CardContent>
                            <CardFooter className="flex gap-2 justify-between items-center">
                                <Button onClick={() => navigate(`/projetos/${projeto.id}`)} className="cursor-pointer bg-emerald-500 hover:bg-emerald-600">
                                    Ver
                                    <ExternalLink />
                                </Button>
                                <Button className="w-fit cursor-pointer bg-red-500 hover:bg-red-600">
                                    Apagar
                                    <Trash />
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col gap-2 items-center justify-center min-h-[500px]">
                <AlertTriangle className="text-emerald-500" size={60} />
                <h2 className="text-md font-semibold">Sem projetos.</h2>
                <p className="text-sm text-zinc-500">Tente adicionar um novo projeto.</p>
            </div>
        </div>
    );
}