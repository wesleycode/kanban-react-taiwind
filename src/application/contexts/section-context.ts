import { createContext } from "react";
import type { SectionType } from "../types/SectionType";

type SectionContextType = {
    addTask: ({ section_id }: {
        section_id: string;
        titulo: string;
        descricao: string;
    }) => void;
    removeTask: ({ section_id, task_id }: { section_id: string, task_id: number }) => void;
    sections: SectionType[];
    handleDragSection: (data: any) => void;
}

export const SectionContext = createContext<SectionContextType>({} as SectionContextType);