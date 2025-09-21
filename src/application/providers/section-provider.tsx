import { useState, type ReactNode } from "react";
import { SectionContext } from "../contexts/section-context";
import { ChartArea, User } from "lucide-react";
import type { SectionType } from "../types/SectionType";
import { v4 as uuidv4 } from 'uuid';
import type { CardType } from "../types/CardType";
import dayjs from "dayjs";

type SectionProviderProps = {
    children: ReactNode;
}

export function SectionProvider({
    children
}: SectionProviderProps) {

    const qualifiedSectionId = uuidv4();

    const [sections, setSections] = useState<SectionType[]>([
        {
            id: qualifiedSectionId,
            title: 'Em Análise',
            cards: [
                {
                    id: uuidv4(),
                    title: 'Huge task',
                    description: 'Very huge description of task here!',
                    sectionId: qualifiedSectionId,
                    expires_at: '21/09/2025 14:30:45',
                    icon: <User size={15} />,
                },
            ],
        },
        {
            id: uuidv4(),
            title: 'Fazendo',
            cards: [],
        },
        {
            id: uuidv4(),
            title: 'Finalizado',
            cards: [],
        },
    ]);

    const sections_count = sections.length;

    const cards_count = sections.reduce((total, section) => total + section.cards.length, 0);

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

        const activeCardId = source.id;
        const targetSectionId = target.id;
        const sourceSectionId = source.data?.sectionId;

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

            // Mesma seção - reordenar
            if (sourceSectionId === targetSectionId) {
                return prevSections.map((section, index) => {
                    if (index === fromSectionIndex) {
                        // Filtra o card movido
                        const filteredCards = section.cards.filter(card => card.id !== activeCardId);

                        // Tenta encontrar a posição de inserção baseada no target
                        // Esta é uma implementação básica - você pode precisar ajustar
                        const overIndex = target.data?.current?.sortable?.index ||
                            target.data?.index ||
                            filteredCards.length;

                        // Insere o card na nova posição
                        const newCards = [
                            ...filteredCards.slice(0, overIndex),
                            { ...cardToMove, sectionId: targetSectionId },
                            ...filteredCards.slice(overIndex)
                        ];

                        return {
                            ...section,
                            cards: newCards
                        };
                    }
                    return section;
                });
            } else {
                // Seções diferentes - mover entre seções
                return prevSections.map((section, index) => {
                    if (index === fromSectionIndex) {
                        return {
                            ...section,
                            cards: section.cards.filter(card => card.id !== activeCardId)
                        };
                    }

                    if (index === toSectionIndex) {
                        // Encontra a posição de inserção na seção de destino
                        const overIndex = target.data?.current?.sortable?.index ||
                            target.data?.index ||
                            section.cards.length;

                        const newCards = [
                            ...section.cards.slice(0, overIndex),
                            { ...cardToMove, sectionId: targetSectionId },
                            ...section.cards.slice(overIndex)
                        ];

                        return {
                            ...section,
                            cards: newCards
                        };
                    }

                    return section;
                });
            }
        });
    };

    function addTask({
        section_id,
        titulo,
        expira_em,
        descricao,
    }: {
        section_id: string;
        titulo: string;
        expira_em: string;
        descricao: string;
    }) {

        const parsedDate = dayjs(expira_em, 'DD/MM/YYYY HH:mm:ss');

        const newTask: CardType = {
            id: uuidv4(),
            title: titulo,
            description: descricao,
            sectionId: section_id,
            expires_at: parsedDate.format('DD/MM/YYYY HH:mm:ss'),
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

    function removeTask({ section_id, task_id }: { section_id: string, task_id: string }) {
        setSections(prevSections =>
            prevSections.map(section =>
                section.id === section_id
                    ? { ...section, cards: section.cards.filter(card => card.id !== task_id) }
                    : section
            )
        );
    }

    function removeSection({ id_section }: { id_section: string }) {
        setSections(prevSections => prevSections.filter(sec => sec.id !== id_section));
    }

    function addSection({ title }: { title: string }) {
        const novaSection: SectionType = { id: uuidv4(), title: title, cards: [] };
        setSections(prevSections => [...prevSections, novaSection]);
    }

    return (
        <SectionContext.Provider value={{
            addTask: addTask,
            removeTask: removeTask,
            addSection: addSection,
            removeSection: removeSection,
            sections: sections,
            handleDragSection: handleDragSection,
            sections_count: sections_count,
            cards_count: cards_count,
        }}>
            {children}
        </SectionContext.Provider>
    );
}