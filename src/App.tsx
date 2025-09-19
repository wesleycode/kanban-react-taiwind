import { useDraggable, useDroppable, DragDropProvider } from '@dnd-kit/react';
import {
  Activity,
  AlignVerticalJustifyEnd,
  ChevronRight,
  CircleUserRound,
  MessageSquare,
  Dot,
  Download,
  Filter,
  GripVertical,
  Search,
  Send,
  User,
  PlusCircle
} from 'lucide-react';
import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'

type CardType = {
  id: number;
  title: string;
  description: string;
  sectionId: string;
  icon: React.ReactNode;
}

type SectionType = {
  id: string;
  title: string;
  cards: CardType[];
}

function Card({
  id,
  title,
  description,
  icon,
  sectionId
}: CardType) {

  const { ref, isDragging } = useDraggable({
    id: id.toString(),
    data: { sectionId }
  });

  return (
    <div
      ref={ref}
      className={`bg-gray-700 h-fit p-3 mt-3 rounded-md cursor-move transition-opacity ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className='flex items-center justify-between text-gray-500'>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <GripVertical size={16} className="text-gray-500" />
            <h3 className='uppercase font-bold text-sm'>{title}</h3>
          </div>
          <p className='text-xs text-gray-400 ml-6'>{description}</p>
        </div>
        <div className='text-emerald-500'>
          <MessageSquare />
        </div>
      </div>
      <div className='flex items-center gap-1 px-2 py-1 mt-5 font-light rounded-md text-emerald-200 bg-emerald-600 outline-1 outline-emerald-200 w-fit ml-6'>
        {icon}
        <p className="text-xs">BADGE</p>
      </div>
    </div>
  );
}

function Section({
  id,
  title,
  cards
}: {
  id: string;
  title: string;
  cards: CardType[];
}) {

  const { ref } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={ref}
      className={`flex flex-col p-3 rounded-md bg-gray-800 min-h-[400px] transition-colors`}
    >
      <h3 className='text-md text-gray-400 font-bold uppercase mb-2'>{title}</h3>
      <div className="flex-1">
        {cards.map((card) => (
          <Card
            key={card.id}
            {...card}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
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
        {
          id: 2,
          title: 'Another task',
          description: 'Another description here',
          sectionId: 'qualified',
          icon: <Activity size={15} />,
        }
      ],
    },
    {
      id: 'contact-made',
      title: 'Contact Made',
      cards: [
        {
          id: 3,
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

  const [activeButton, setActiveButton] = useState(0);

  function addNewTask() {

  }

  const handleDragEnd = (event: any) => {
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
      const newSections = [...prevSections];

      // Encontrar a seção de origem e remover o card
      const fromSectionIndex = newSections.findIndex(section => section.id === sourceSectionId);
      const cardIndex = newSections[fromSectionIndex].cards.findIndex(card => card.id === activeCardId);

      if (fromSectionIndex === -1 || cardIndex === -1) {
        return prevSections;
      }

      const [movedCard] = newSections[fromSectionIndex].cards.splice(cardIndex, 1);

      // Encontrar a seção de destino e adicionar o card
      const toSectionIndex = newSections.findIndex(section => section.id === targetSectionId);

      if (toSectionIndex === -1) {
        // Se a seção de destino não existe, restaurar o card na seção original
        newSections[fromSectionIndex].cards.splice(cardIndex, 0, movedCard);
        return prevSections;
      }

      movedCard.sectionId = targetSectionId;
      newSections[toSectionIndex].cards.push(movedCard);

      return newSections;
    });
  };

  return (
    <div className='flex flex-col items-center justify-center w-screen bg-gray-900 p-10'>
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
            <div className='flex gap-1 bg-gray-700 p-1 rounded-md'>
              <button
                onClick={() => setActiveButton(0)}
                className={`${activeButton === 0 && `bg-gray-800`} font-semibold cursor-pointer p-2 rounded-md`}
              >
                <p className='text-xs text-gray-100'>Active</p>
              </button>
              <button
                onClick={() => setActiveButton(1)}
                className={`${activeButton === 1 && `bg-gray-800`} font-semibold cursor-pointer p-2 rounded-md`}
              >
                <p className='text-xs text-gray-100'>Stale</p>
              </button>
            </div>
            <button className='flex items-center gap-1 bg-gray-100 cursor-pointer px-3 rounded-md font-semibold'>
              <Filter size={13} />
              <p className='text-xs text-black'>Filters</p>
            </button>
          </div>
          <div className='flex gap-3'>
            <div className='flex gap-1 bg-gray-100 p-1 rounded-md'>
              <button className='flex items-center gap-1 cursor-pointer py-2 px-3 rounded-md font-semibold'>
                <Download size={13} />
                <p className='text-xs text-black'>Export</p>
              </button>
            </div>
            <div className='flex text-gray-700 gap-2 items-center bg-gray-100 rounded-md p-2'>
              <Search size={13} />
              <input
                className='outline-none text-sm min-w-[150px] bg-transparent'
                placeholder="Search..."
              />
            </div>
          </div>
        </div>

        <DragDropProvider onDragEnd={handleDragEnd}>
          <div className='mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {sections.map((section) => (
              <Section
                key={section.id}
                id={section.id}
                title={section.title}
                cards={section.cards}
              />
            ))}
          </div>
        </DragDropProvider>

        <div className='mt-3'>
          <button onClick={addNewTask} className='flex transition-colors rounded-sm text-sm p-2 items-center justify-center gap-1 text-white bg-emerald-500 hover:bg-emerald-400 cursor-pointer'>
            <PlusCircle size={16} />
            Add
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className='flex flex-col rounded-md bg-gray-800 p-5 gap-3 border-gray-700 border-[1px]'>
              <div className='flex flex-col gap-0'>
                <div className='flex items-center justify-between flex-wrap gap-3'>
                  <p className="text-gray-400 text-xs">MEETINGS</p>
                  <div className='flex items-center gap-1 px-2 py-1 font-light rounded-md text-emerald-200 bg-emerald-600 outline-1 outline-emerald-200 w-fit text-xs'>
                    <User size={15} />
                    <p className="text-sm">BADGE</p>
                  </div>
                </div>
                <h1 className="text-gray-100 font-bold text-lg">Title {index + 1}</h1>
                <h2 className="text-gray-400 text-sm">Description {index + 1}</h2>
              </div>
              <div className='text-gray-400 rounded-2xl py-3'>
                <p className='line-clamp-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, nulla ipsa tempore iusto odit quisquam eius! Minima similique laborum vero distinctio, provident ducimus at voluptas modi.</p>
              </div>
              <div className='flex flex-wrap items-center gap-3'>
                <button className='flex transition-colors rounded-sm text-sm p-2 items-center justify-center gap-1 text-white bg-emerald-500 hover:bg-emerald-400 cursor-pointer'>
                  <Send size={16} />
                  Send
                </button>
                <button className='flex transition-colors rounded-sm text-sm p-2 items-center justify-center gap-1 text-white bg-emerald-500 hover:bg-emerald-400 cursor-pointer'>
                  <Download size={16} />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

export default App;