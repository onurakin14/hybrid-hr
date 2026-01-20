"use client"

import { Task } from "@/lib/features/tasks/taskSlice"

const priorityColor = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
}

export default function TaskCard({ task }: { task: Task }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border">
      {/* TAG + PRIORITY */}
      <div className="flex justify-between mb-2">
        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
          {task.tags[0]}
        </span>

        <span
          className={`text-xs px-2 py-0.5 rounded ${priorityColor[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      {/* TITLE */}
      <h4 className="text-sm font-medium mb-3">{task.todo}</h4>

      {/* FOOTER */}
      <div className="flex justify-between text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <img
            src={task.user.avatar}
            alt=""
            className="w-6 h-6 rounded-full"
          />
          <span>{task.user.name}</span>
        </div>

        <span>{task.date}</span>
      </div>
    </div>
  )
}
