import { useDraggable } from "@dnd-kit/react";
import type { CardType } from "../../../application/types/CardType";
import { GripVertical, Trash2 } from "lucide-react";
import { useSectionContext } from "@/application/hooks/use-section-context";
import { Button } from "@/components/ui/button";

export function Card({
  id,
  title,
  description,
  sectionId
}: CardType) {

  const {
    removeTask
  } = useSectionContext();

  const { ref, isDragging } = useDraggable({
    id: id.toString(),
    data: { sectionId }
  });

  return (
    <div
      ref={ref}
      className={`group relative bg-gray-700 h-fit p-3 mt-3 rounded-md cursor-move transition-opacity ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className='flex items-center justify-between text-gray-500'>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <GripVertical size={16} className="text-gray-500" />
            <h3 className='uppercase font-bold text-sm'>{title}</h3>
          </div>
          <p className='text-xs text-gray-400 ml-6'>{description}</p>
        </div>
      </div>
      <div className="absolute top-2 right-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-10">
        <Button 
          size="sm"
          className='text-xs p-2 cursor-pointer bg-red-600 hover:bg-red-500 text-gray-100 h-auto' 
          onClick={() => removeTask({ section_id: sectionId, task_id: id })}
        >
          <Trash2 size={14} />
        </Button>
      </div>
    </div>
  );
}