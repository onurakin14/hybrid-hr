"use client"

import { Task } from "@/lib/features/tasks/taskSlice"

export default function ListView({ tasks }: { tasks: Task[] }) {
  return (
    <div className="bg-white rounded-xl border">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left">Task</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Tag</th>
            <th>Assignee</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map(task => (
            <tr key={task.id} className="border-t">
              <td className="p-3 font-medium">{task.todo}</td>
              <td>{task.status}</td>
              <td>{task.priority}</td>
              <td>{task.tags[0]}</td>
              <td>{task.user.name}</td>
              <td>{task.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
