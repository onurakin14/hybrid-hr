'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/lib/store';

import { fetchTasks } from '@/lib/features/tasks/taskSlice';

import FilterBar from '@/components/tasks/FilterBar';
import SortMenu from '@/components/tasks/SortMenu';
import Column from '@/components/tasks/Column';
import CreateTaskModal from '@/components/tasks/CreateTaskModal';

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const loading = useSelector((state: RootState) => state.tasks.loading);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Loading tasks...
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">
          Task Board
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Hybrid HR – Kanban Management
        </p>
      </header>

      <FilterBar onCreate={() => setOpen(true)} />
      <SortMenu />

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
        <Column title="Backlog" status="backlog" />
        <Column title="To Do" status="todo" />
        <Column title="In Progress" status="inprogress" />
        <Column title="Done" status="done" />
      </section>

      <CreateTaskModal
        open={open}
        onClose={() => setOpen(false)}
        onCreate={() => setOpen(false)}
      />
    </main>
  );
}
