'use client';

import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '@/lib/features/tasks/taskSlice';
import type { RootState } from '@/lib/store';

export default function SortMenu() {
  const dispatch = useDispatch();
  const sort = useSelector((state: RootState) => state.tasks.sort);

  return (
    <div className="flex justify-end mt-4">
      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
        <span className="text-xs font-bold uppercase text-slate-400">
          Sort
        </span>

        <select
          value={sort}
          onChange={(e) =>
            dispatch(setSort(e.target.value as any))
          }
          className="text-sm font-semibold bg-transparent outline-none"
        >
          <option value="date">Date</option>
          <option value="title">Title</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </div>
  );
}
