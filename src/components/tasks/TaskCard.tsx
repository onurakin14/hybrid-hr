import { Task } from '@/lib/features/tasks/taskSlice';

export default function TaskCard({ task }: { task: Task }) {
  return (
    <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow transition">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-100 text-slate-600">
          Priority {task.priority}
        </span>
      </div>

      <h4 className="font-semibold text-slate-800 text-sm">
        {task.title}
      </h4>

      <p className="text-xs text-slate-400 mt-2">
        {new Date(task.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
