import { useState } from 'react';
import { TaskStatus } from '@/lib/features/tasks/taskSlice';

export default function CreateTaskModal({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (payload: { title: string; status: TaskStatus }) => void;
}) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<TaskStatus>('backlog');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6">
        <h2 className="font-bold text-lg mb-4">Create Task</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="w-full border rounded-xl px-3 py-2 mb-4"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
          className="w-full border rounded-xl px-3 py-2 mb-6"
        >
          <option value="backlog">Backlog</option>
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-slate-400">
            Cancel
          </button>
          <button
            disabled={!title.trim()}
            onClick={() => onCreate({ title, status })}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl disabled:opacity-50"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
