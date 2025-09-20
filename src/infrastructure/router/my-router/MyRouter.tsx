import { RoutesConstants } from "@/application/constants/RoutesConstants";
import { HomePage } from "@/presentation/pages/homepage";
import { Route, Routes } from "react-router";

export function MyRouter() {
    return (
        <Routes>
            <Route path={RoutesConstants.PAGINA_INICIAL} element={<HomePage />} />
        </Routes>
    );
}