import { RoutesConstants } from "@/application/constants/RoutesConstants";
import { BoardsPage } from "@/presentation/pages/boards-page";
import { ProjetosPage } from "@/presentation/pages/projetos-page";
import { Route, Routes } from "react-router";

export function MyRouter() {
    return (
        <Routes>
            <Route path={RoutesConstants.PROJETOS_PAGE} element={<ProjetosPage />} />
            <Route path={RoutesConstants.BOARDS_PAGE} element={<BoardsPage />} />
        </Routes>
    );
}