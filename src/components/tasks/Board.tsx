'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, createTask } from '@/lib/features/tasks/taskSlice';
import type { RootState, AppDispatch } from '@/lib/store';

import Column from '@/components/tasks/Column';
import CreateTaskModal from '@/components/tasks/CreateTaskModal';
import FilterBar from '@/components/tasks/FilterBar';
import SortMenu from '@/components/tasks/SortMenu';

export default function Board() {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);

  const { loading } = useSelector((state: RootState) => state.tasks);
  const tasks = useSelector(
    (state: RootState) => state.tasks.tasks
  );

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) {
    return <div className="p-10 text-center text-slate-400">Loading…</div>;
  }

  return (
    <>
      <FilterBar onCreate={() => setOpen(true)} />
      <SortMenu />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
        <Column title="Backlog" status="backlog" />
        <Column title="To Do" status="todo" />
        <Column title="In Progress" status="inprogress" />
        <Column title="Done" status="done" />
      </div>

      <CreateTaskModal
        open={open}
        onClose={() => setOpen(false)}
        onCreate={(payload) => {
          dispatch(createTask(payload));
          setOpen(false);
        }}
      />
    </>
  );
}
