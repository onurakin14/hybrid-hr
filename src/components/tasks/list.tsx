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

      </table>
    </div>
  )
}
