import { useContext } from "react";
import { SectionContext } from "../contexts/section-context";

export function useSectionContext() {
    
    const context = useContext(SectionContext);

    if (!context) {
        throw new Error('O context precisa ser usado dentro de um Provider');
    }

    return context;

}