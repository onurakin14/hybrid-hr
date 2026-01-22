"use client";

import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import {
  TaskStatus,
  moveTask,
  toggleTaskComplete,
  toggleCreate,
} from "@/lib/features/tasks/taskSlice";
import Column from "./column";
import { Plus } from "lucide-react";

const columns: { id: TaskStatus; title: string }[] = [
  { id: "backlog", title: "Backlog" },
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

export default function BoardView() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

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
            tasks={tasks.filter((t) => t.status === col.id)}
          />
        ))}

       
      
      </div>
    </DragDropContext>
  );
}
