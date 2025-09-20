import { useState, type ReactNode } from "react";
import { SectionContext } from "../contexts/section-context";
import { AlignVerticalJustifyEnd, ChartArea, User } from "lucide-react";
import type { SectionType } from "../types/SectionType";

type SectionProviderProps = {
    children: ReactNode;
}

export function SectionProvider({
    children
}: SectionProviderProps) {

    const [sections, setSections] = useState<SectionType[]>([
        {
            id: 'qualified',
            title: 'Qualified',
            cards: [
                {
                    id: 1,
                    title: 'Huge task',
                    description: 'Very huge description of task here!',
                    sectionId: 'qualified',
                    icon: <User size={15} />,
                },
            ],
        },
        {
            id: 'contact-made',
            title: 'Contact Made',
            cards: [
                {
                    id: 2,
                    title: 'Opa',
                    description: 'Brabo',
                    sectionId: 'contact-made',
                    icon: <AlignVerticalJustifyEnd size={15} />,
                }
            ],
        },
        {
            id: 'demo-scheduled',
            title: 'Demo Scheduled',
            cards: [],
        },
        {
            id: 'proposal-made',
            title: 'Proposal Made',
            cards: [],
        }
    ]);

    function handleDragSection(event: any) {
        if (event.canceled) {
            return;
        }

        const operation = event.operation;
        const source = operation.source;
        const target = operation.target;

        if (!target) {
            return;
        }

        const activeCardId = parseInt(source.id);
        const targetSectionId = target.id;
        const sourceSectionId = source.data?.sectionId;

        if (sourceSectionId === targetSectionId) {
            return;
        }

        setSections(prevSections => {
            const fromSectionIndex = prevSections.findIndex(section => section.id === sourceSectionId);
            const toSectionIndex = prevSections.findIndex(section => section.id === targetSectionId);

            if (fromSectionIndex === -1 || toSectionIndex === -1) {
                return prevSections;
            }

            const cardIndex = prevSections[fromSectionIndex].cards.findIndex(card => card.id === activeCardId);

            if (cardIndex === -1) {
                return prevSections;
            }

            const cardToMove = prevSections[fromSectionIndex].cards[cardIndex];

            return prevSections.map((section, index) => {
                if (index === fromSectionIndex) {
                    return {
                        ...section,
                        cards: section.cards.filter(card => card.id !== activeCardId)
                    };
                }

                if (index === toSectionIndex) {
                    return {
                        ...section,
                        cards: [...section.cards, { ...cardToMove, sectionId: targetSectionId }]
                    };
                }

                return section;
            });
        });
    };

    function addTask({
        section_id,
        titulo,
        descricao
    }: {
        section_id: string;
        titulo: string;
        descricao: string;
    }) {

        const newTask = {
            id: Date.now(),
            title: titulo,
            description: descricao,
            sectionId: section_id,
            icon: <ChartArea size={15} />,
        }

        setSections(prevSections =>
            prevSections.map(section =>
                section.id === section_id
                    ? { ...section, cards: [...section.cards, newTask] }
                    : section
            )
        );
    }

    function removeTask({ section_id, task_id }: { section_id: string, task_id: number }) {
        setSections(prevSections =>
            prevSections.map(section =>
                section.id === section_id
                    ? { ...section, cards: section.cards.filter(card => card.id !== task_id) }
                    : section
            )
        );
    }

    return (
        <SectionContext.Provider value={{
            addTask: addTask,
            sections: sections,
            removeTask: removeTask,
            handleDragSection: handleDragSection,
        }}>
            {children}
        </SectionContext.Provider>
    );
}