'use client';

import { useDispatch, useSelector } from 'react-redux';
import {
  setStatusFilter,
  setCompletedFilter,
} from '@/lib/features/tasks/taskSlice';
import type { RootState } from '@/lib/store';

export default function FilterBar({
  onCreate,
}: {
  onCreate: () => void;
}) {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.tasks);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        {/* STATUS */}
        <select
          value={filters.status}
          onChange={(e) =>
            dispatch(setStatusFilter(e.target.value as any))
          }
          className="px-3 py-2 rounded-xl border text-sm font-medium"
        >
          <option value="all">All</option>
          <option value="backlog">Backlog</option>
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>

        {/* COMPLETED */}
        <select
          value={
            filters.completed === 'all'
              ? 'all'
              : filters.completed
              ? 'true'
              : 'false'
          }
          onChange={(e) =>
            dispatch(
              setCompletedFilter(
                e.target.value === 'all'
                  ? 'all'
                  : e.target.value === 'true'
              )
            )
          }
          className="px-3 py-2 rounded-xl border text-sm font-medium"
        >
          <option value="all">All Tasks</option>
          <option value="false">Active</option>
          <option value="true">Completed</option>
        </select>
      </div>

      <button
        onClick={onCreate}
        className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition"
      >
        + New Task
      </button>
    </div>
  );
}
