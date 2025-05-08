import {
      DndContext,
      closestCenter,
      useSensor,
      useSensors,
      PointerSensor,
    } from '@dnd-kit/core';
    import {
      SortableContext,
      verticalListSortingStrategy,
      arrayMove,
    } from '@dnd-kit/sortable';
    import { useMemo } from 'react';
    
    export const useDragableColumns = (table: any) => {
      const sensors = useSensors(useSensor(PointerSensor));
    
      const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
    
        const allLeafColumns = table.getAllLeafColumns();
        const oldIndex = allLeafColumns.findIndex(c => c.id === active.id);
        const newIndex = allLeafColumns.findIndex(c => c.id === over.id);
        
    
        table.setColumnOrder((old: string[]) => arrayMove(old, oldIndex, newIndex));
      };
    
      const sortableHeaders = useMemo(() => {
        return table.getHeaderGroups().map((group: any) => ({
          id: group.id,
          headers: group.headers.map((h: any) => h.column.id),
        }));
      }, [table]);
    
      return {
        sensors,
        handleDragEnd,
        sortableHeaders,
        DndContext,
        SortableContext,
        verticalListSortingStrategy,
        closestCenter
      };
    };
    