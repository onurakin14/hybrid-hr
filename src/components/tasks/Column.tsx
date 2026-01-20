"use client"

import { Droppable, Draggable } from "@hello-pangea/dnd"
import TaskCard from "./task-card"
import { Task, Status } from "@/lib/features/tasks/taskSlice"

interface Props {
  status: Status
  title: string
  tasks: Task[]
}

export default function Column({ status, title, tasks }: Props) {
  return (
    <Droppable droppableId={status}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="
            bg-[#F7F8FA]
            rounded-2xl
            p-4
            min-h-[560px]
            flex
            flex-col
          "
        >
          {/* HEADER */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">
              {title}
            </h3>

            <span className="
              text-xs
              font-medium
              bg-gray-200
              text-gray-700
              px-2
              py-0.5
              rounded-full
            ">
              {tasks.length}
            </span>
          </div>

          {/* TASK LIST */}
          <div className="flex flex-col gap-3 flex-1">
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={String(task.id)}
                index={index}
              >
                {provided => (
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

          {/* ADD TASK */}
          <button
            className="
              mt-4
              w-full
              border
              border-dashed
              border-gray-300
              rounded-xl
              py-2
              text-sm
              text-gray-500
              hover:bg-gray-100
              transition
            "
          >
            + Add Task
          </button>
        </div>
      )}
    </Droppable>
  )
}
