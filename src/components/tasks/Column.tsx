import { useSelector } from 'react-redux';
import { selectFilteredSortedTasks, TaskStatus } from '@/lib/features/tasks/taskSlice';
import type { RootState } from '@/lib/store';
import TaskCard from './TaskCard';

export default function Column({
  title,
  status,
}: {
  title: string;
  status: TaskStatus;
}) {
  const tasks = useSelector((state: RootState) =>
    selectFilteredSortedTasks(state).filter(t => t.status === status)
  );

  return (
    <section className="bg-slate-50 rounded-2xl p-4 flex flex-col max-h-[80vh]">
      <header className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-700">
          {title}
          <span className="ml-2 text-xs text-slate-400">
            {tasks.length}
          </span>
        </h3>
      </header>

      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}
