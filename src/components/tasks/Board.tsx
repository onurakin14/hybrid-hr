"use client"

import { DragDropContext } from "@hello-pangea/dnd"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { moveTask } from "@/lib/features/tasks/taskSlice"
import Column from "./column"
import { Status } from "@/lib/features/tasks/taskSlice"

const columns: { key: Status; title: string }[] = [
  { key: "backlog", title: "Backlog" },
  { key: "todo", title: "To Do" },
  { key: "inprogress", title: "In Progress" },
  { key: "done", title: "Done" },
]

export default function Board() {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(state => state.tasks.tasks)

  return (
    <DragDropContext
      onDragEnd={result => {
        if (!result.destination) return

        dispatch(
          moveTask({
            id: Number(result.draggableId),
            status: result.destination.droppableId as Status,
          })
        )
      }}
    >
      <div className="grid grid-cols-4 gap-6">
        {columns.map(col => (
          <Column
            key={col.key}
            status={col.key}
            title={col.title}
            tasks={tasks.filter(t => t.status === col.key)}
          />
        ))}
      </div>
    </DragDropContext>
  )
}
