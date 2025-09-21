import { useListarProjetos } from "@/application/hooks/use-listar-projetos";
import { Navigate, useNavigate } from "react-router";
import { WidgetLoading } from "../widget-loading/WidgetLoading";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Package, Trash } from "lucide-react";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { RoutesConstants } from "@/application/constants/RoutesConstants";

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
                                <Button onClick={() => navigate(RoutesConstants.BOARDS_PAGE)} className="cursor-pointer bg-emerald-500 hover:bg-emerald-600">
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
        <Navigate to={RoutesConstants.PAGE_NOT_FOUND} />
    );
}