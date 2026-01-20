"use client"

import CreateTaskModal from "./create-task-modal"

export default function TasksHeader() {
  return (
    <div className="mb-6">
      {/* TOP LINE */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Tasks</h1>
          <p className="text-sm text-gray-500">
            Manage tasks across projects
          </p>
        </div>

        <CreateTaskModal />
        
      </div>

      {/* TOOLBAR */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="px-3 py-1.5 text-sm rounded-lg bg-gray-900 text-white">
            Board
          </button>
          <button className="px-3 py-1.5 text-sm rounded-lg text-gray-600 hover:bg-gray-100">
            List
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm border rounded-lg">
            Filter
          </button>
          <button className="px-3 py-1.5 text-sm border rounded-lg">
            Sort
          </button>
        </div>
      </div>
    </div>
  )
}
