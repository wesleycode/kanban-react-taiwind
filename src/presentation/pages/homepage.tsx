import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DragDropProvider } from "@dnd-kit/react";
import { ChevronRight, CircleUserRound, Dot, Download, Filter } from "lucide-react";
import { Section } from "../components/section/Section";
import { useSectionContext } from "@/application/hooks/use-section-context";

export function HomePage() {

    const {
        handleDragSection,
        sections,
    } = useSectionContext();

    return (
        <div className='flex flex-col items-center min-h-screen w-screen bg-gray-900 p-10'>
            <div className='max-w-6xl w-full'>
                <div className='mb-3'>
                    <div className='flex items-center gap-3 text-gray-400 mb-20'>
                        <p>Leads</p>
                        <span><ChevronRight size={15} /></span>
                        <p className='text-gray-100'>Pipeline View</p>
                    </div>
                    <div className='flex flex-col gap-3 text-gray-100 border-b-gray-600 border-b-2 pb-3'>
                        <div>
                            <h2 className='text-3xl'>Pipeline</h2>
                        </div>
                        <div className='flex flex-wrap items-center justify-between'>
                            <div className='flex flex-wrap gap-1 items-center text-sm'>
                                <p>13 Active Leads</p>
                                <span className=''><Dot /></span>
                                <div className='flex gap-1'>
                                    <p className='text-gray-400'>Pipeline Value: </p>
                                    <strong className='font-bold'>$140.000</strong>
                                </div>
                                <span className=''><Dot /></span>
                                <div className='flex gap-1'>
                                    <p className='text-gray-400'>Target: </p>
                                    <strong className='font-bold'>$175.000</strong>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <CircleUserRound className="w-8 h-8 -mr-2" />
                                <CircleUserRound className="w-8 h-8 -mr-2" />
                                <CircleUserRound className="w-8 h-8" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex items-center justify-between gap-3 mb-6'>
                    <div className='flex gap-3'>
                        <Tabs defaultValue="account" className="w-[400px]">
                            <TabsList>
                                <TabsTrigger value="account">Active</TabsTrigger>
                                <TabsTrigger value="password">Stale</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <Button className='cursor-pointer bg-gray-100 text-gray-700 hover:bg-gray-200'>
                            <Filter size={13} />
                            <p className='text-xs'>Filters</p>
                        </Button>
                    </div>
                    <div className='flex gap-3'>
                        <div className='flex p-1 gap-2'>
                            <Button className='cursor-pointer bg-gray-100 text-gray-700 hover:bg-gray-200'>
                                <Download size={13} />
                                <p className='text-xs'>Export</p>
                            </Button>
                            <Input className='text-gray-700 bg-gray-100' placeholder="Search..." />
                        </div>
                    </div>
                </div>

                <DragDropProvider onDragEnd={handleDragSection}>
                    <div className='mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                        {sections.map((section) => (
                            <div>
                                <Section
                                    key={section.id}
                                    id={section.id}
                                    title={section.title}
                                    cards={section.cards}
                                />
                            </div>
                        ))}
                    </div>
                </DragDropProvider>

            </div>
        </div>
    );
}