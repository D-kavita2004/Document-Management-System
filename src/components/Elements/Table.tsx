import { flexRender } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { useDragableColumns } from '../Hooks/useDragableColumns';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const DraggableHeader = ({ header }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: header.column.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <th
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border border-gray-400 px-4 py-2 text-left whitespace-nowrap"
    >
      <div
        className="flex items-center gap-1 cursor-pointer size-full"
        onClick={header.column.getToggleSortingHandler()}
      >
        {flexRender(header.column.columnDef.header, header.getContext())}
        <ArrowUpDown size={16} />
      </div>
    </th>
  );
};

export const Table = ({ table }) => {
  const {
    DndContext,
    SortableContext,
    sensors,
    handleDragEnd,
    sortableHeaders,
    verticalListSortingStrategy,
    closestCenter,
  } = useDragableColumns(table);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <table className="border-collapse w-full h-full">
        <thead className="bg-[#1A33A9] dark:bg-white dark:text-black text-white sticky top-0 z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <SortableContext
              key={headerGroup.id}
              items={sortableHeaders.find(g => g.id === headerGroup.id)?.headers ?? []}
              strategy={verticalListSortingStrategy}
            >
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <DraggableHeader key={header.id} header={header} />
                ))}
              </tr>
            </SortableContext>
          ))}
        </thead>
        <tbody>
          {table.getPaginationRowModel().rows.map((row) => (
            <tr key={row.id} className="even:bg-gray-200 dark:bg-[#3b3636]">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </DndContext>
  );
};
