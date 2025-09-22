import { useContext } from "react";
import { ProjetoContext } from "../contexts/projects-context";

export function useProjetoContext() {
    
    const context = useContext(ProjetoContext);

    if (!context) {
        throw new Error('O context precisa ser usado dentro de um Provider');
    }

    return context;

}