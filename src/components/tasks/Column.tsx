"use client";

import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import { Task, TaskStatus } from "@/lib/features/tasks/taskSlice";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleCreate } from "@/lib/features/tasks/taskSlice";

export default function Column({
  title,
  status,
  tasks,
}: {
  title: string;
  status: TaskStatus;
  tasks: Task[];
}) {
  const dispatch = useDispatch();

  return (
    <div className="shrink-0 w-72 bg-gray-50 rounded-2xl p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm">{title}</h3>
        <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>

      {/* Tasks */}
      <Droppable droppableId={status}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex-1 space-y-3 overflow-y-auto pr-1 scrollbar-thin"
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={String(task.id)}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard task={task} />
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
      
      <button
        onClick={() => dispatch(toggleCreate())}
        className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 hover:text-gray-700 border border-dashed border-gray-300 rounded-xl py-2 hover:bg-gray-100 transition"
      >
        <Plus className="w-4 h-4" />
        Add Task
      </button>
    </div>
  );
}
