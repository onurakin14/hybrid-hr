"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { fetchTasks } from "@/lib/features/tasks/taskSlice";
import Header from "@/components/tasks/tasks-header";
import BoardView from "@/components/tasks/Board";
import CreateTaskModal from "@/components/tasks/create-task-modal";
import TaskListView from "@/components/tasks/list";

export default function TasksPage() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.tasks);
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board');

  useEffect(() => {
    dispatch(fetchTasks() as any);
  }, [dispatch]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header viewMode={viewMode} onViewModeChange={setViewMode} />
      <div className="flex-1 overflow-hidden">
        {viewMode === 'board' ? (
          <BoardView />
        ) : (
          <TaskListView />
        )}
      </div>
      <CreateTaskModal />
    </div>
  );
}
