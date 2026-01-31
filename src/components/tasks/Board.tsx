"use client";

import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import {
  TaskStatus,
  moveTask,
} from "@/lib/features/tasks/taskSlice";
import Column from "./Column";
import { useMemo } from "react";

const columns: { id: TaskStatus; title: string }[] = [
  { id: "backlog", title: "Backlog" },
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

const priorityRank: Record<string, number> = {
  low: 1,
  medium: 2,
  high: 3,
};

export default function BoardView() {
  const dispatch = useDispatch();
  const { tasks, filter, sort } = useSelector(
    (state: RootState) => state.tasks
  );

  /* ================= FILTER + SORT ================= */
  const processedTasks = useMemo(() => {
    let result = [...tasks];

    // FILTER (priority)
    if (filter.priority) {
      result = result.filter(
        (t) => t.priority === filter.priority
      );
    }

    // SORT (priority asc / desc)
    if (sort.field === "priority") {
      result.sort((a, b) => {
        const aVal = priorityRank[a.priority ?? "low"];
        const bVal = priorityRank[b.priority ?? "low"];

        return sort.order === "asc"
          ? aVal - bVal
          : bVal - aVal;
      });
    }

    return result;
  }, [tasks, filter, sort]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const taskId = Number(result.draggableId);
    const newStatus = result.destination.droppableId as TaskStatus;

    dispatch(moveTask({ taskId, status: newStatus }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-6 p-6 overflow-x-auto h-[calc(100vh-220px)]">
        {columns.map((col) => (
          <Column
            key={col.id}
            title={col.title}
            status={col.id}
            tasks={processedTasks.filter(
              (t) => t.status === col.id
            )}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
