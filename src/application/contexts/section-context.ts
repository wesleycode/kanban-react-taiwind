import { createContext } from "react";
import type { SectionType } from "../types/SectionType";

type SectionContextType = {
    addTask: ({ section_id }: {
        section_id: string;
        titulo: string;
        descricao: string;
        expira_em: string;
    }) => void;
    removeTask: ({ section_id, task_id }: { section_id: string, task_id: string }) => void;
    addSection: ({ title }: { title: string }) => void;
    removeSection: ({ id_section }: { id_section: string }) => void;
    sections: SectionType[];
    handleDragSection: (data: any) => void;
    sections_count: number;
    cards_count: number;
}

export const SectionContext = createContext<SectionContextType>({} as SectionContextType);