"use client";

// Gerekli import'lar
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { Task, TaskStatus } from "@/lib/features/tasks/taskSlice";
import { useState } from "react";
import React from "react";
import { toggleCreate } from "@/lib/features/tasks/taskSlice";

export default function TaskListView() {
  // Redux store'dan task'ları al
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  // Filtreleme state'leri
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<'low' | 'medium' | 'high' | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sayfalama state'leri
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Task'ları filtrele
  const filteredTasks = tasks.filter(task => {
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesAssignee = assigneeFilter === 'all' ||
      (task.id % 2 === 0 ? "Jane Doe" : "Esra Yılmaz") === assigneeFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesSearch = searchQuery === '' ||
      task.todo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.tags && task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesStatus && matchesAssignee && matchesPriority && matchesSearch;
  });

  // Sayfalama hesaplamaları
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTasks = filteredTasks.slice(startIndex, endIndex);

  // Filtre değiştiğinde ilk sayfaya dön
  React.useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, assigneeFilter, priorityFilter, searchQuery]);

  // Status badge'leri için renkler
  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "backlog":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600";
      case "todo":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
      case "done":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600";
    }
  };

  // Status etiketlerini çevir
  const getStatusLabel = (status: TaskStatus) => {
    switch (status) {
      case "backlog":
        return "Backlog";
      case "todo":
        return "To Do";
      case "in-progress":
        return "In Progress";
      case "done":
        return "Done";
      default:
        return status;
    }
  };

  // Priority renkleri
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-blue-500";
      case "low":
        return "bg-gray-300 dark:bg-gray-600";
      default:
        return "bg-gray-300 dark:bg-gray-600";
    }
  };

  // Priority etiketlerini çevir
  const getPriorityLabel = (priority?: string) => {
    switch (priority) {
      case "high":
        return "High";
      case "medium":
        return "Medium";
      case "low":
        return "Low";
      default:
        return "Low";
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Ana içerik alanı */}
      <main className="flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative w-full">
        {/* Üst bar - Başlık ve aksiyon butonu */}
        <header className="flex-shrink-0 px-8 py-6 bg-background-light dark:bg-background-dark z-10">
          <div className="max-w-[1400px] mx-auto w-full flex flex-col gap-6">
            {/* Sayfa başlığı ve ana aksiyon */}
            <div className="flex flex-wrap justify-between items-end gap-4">
              <div className="flex flex-col gap-1">
                <h2 className="text-[#131118] dark:text-white text-3xl font-bold tracking-tight">All Tasks</h2>
                <p className="text-[#6b6189] dark:text-gray-400 text-base">Manage and track team progress across all projects.</p>
              </div>
              <button 
                onClick={() => dispatch(toggleCreate())}
                className="flex items-center justify-center gap-2 h-10 px-5 bg-primary hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm shadow-indigo-200 dark:shadow-none transition-all"
              >
                <span className="material-symbols-outlined" style={{fontSize: "20px"}}>add</span>
                <span>Create Task</span>
              </button>
            </div>
          </div>
        </header>

        {/* Kaydırılabilir içerik alanı */}
        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <div className="max-w-[1400px] mx-auto w-full flex flex-col gap-4">
            {/* Filtreler ve arama kartı */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-center sticky top-0 z-20">
              {/* Arama çubuğu */}
              <div className="w-full lg:max-w-md relative">
                <div className="flex items-center w-full h-10 rounded-lg bg-[#f1f0f4] dark:bg-gray-900 border border-transparent focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                  <div className="pl-3 flex items-center justify-center text-[#6b6189] dark:text-gray-400">
                    <span className="material-symbols-outlined" style={{fontSize: "20px"}}>search</span>
                  </div>
                  <input
                    className="w-full h-full bg-transparent border-none focus:ring-0 text-sm text-[#131118] dark:text-white placeholder-[#6b6189] dark:placeholder-gray-500"
                    placeholder="Search tasks by name or description..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              {/* Filtre butonları */}
              <div className="flex gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 no-scrollbar items-center">
                <button
                  onClick={() => setStatusFilter(statusFilter === 'all' ? 'backlog' : statusFilter === 'backlog' ? 'todo' : statusFilter === 'todo' ? 'in-progress' : statusFilter === 'in-progress' ? 'done' : 'all')}
                  className={`flex h-9 items-center gap-2 px-3 rounded-lg border transition-colors whitespace-nowrap ${
                    statusFilter !== 'all'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-[#131118] dark:text-gray-200'
                  }`}
                >
                  <span className="text-sm font-medium">
                    Status: {statusFilter === 'all' ? 'All' : getStatusLabel(statusFilter)}
                  </span>
                  <span className="material-symbols-outlined text-[#6b6189]" style={{fontSize: "18px"}}>expand_more</span>
                </button>
                <button
                  onClick={() => setAssigneeFilter(assigneeFilter === 'all' ? 'Jane Doe' : assigneeFilter === 'Jane Doe' ? 'Esra Yılmaz' : 'all')}
                  className={`flex h-9 items-center gap-2 px-3 rounded-lg border transition-colors whitespace-nowrap ${
                    assigneeFilter !== 'all'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-[#131118] dark:text-gray-200'
                  }`}
                >
                  <span className="text-sm font-medium">
                    Assignee: {assigneeFilter === 'all' ? 'All' : assigneeFilter}
                  </span>
                  <span className="material-symbols-outlined text-[#6b6189]" style={{fontSize: "18px"}}>expand_more</span>
                </button>
                <button
                  onClick={() => setPriorityFilter(priorityFilter === 'all' ? 'low' : priorityFilter === 'low' ? 'medium' : priorityFilter === 'medium' ? 'high' : 'all')}
                  className={`flex h-9 items-center gap-2 px-3 rounded-lg border transition-colors whitespace-nowrap ${
                    priorityFilter !== 'all'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-[#131118] dark:text-gray-200'
                  }`}
                >
                  <span className="text-sm font-medium">
                    Priority: {priorityFilter === 'all' ? 'All' : priorityFilter.charAt(0).toUpperCase() + priorityFilter.slice(1)}
                  </span>
                  <span className="material-symbols-outlined text-[#6b6189]" style={{fontSize: "18px"}}>expand_more</span>
                </button>
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>
                <button
                  onClick={() => {
                    setStatusFilter('all');
                    setAssigneeFilter('all');
                    setPriorityFilter('all');
                    setSearchQuery('');
                  }}
                  className="text-primary hover:text-indigo-700 text-sm font-medium whitespace-nowrap px-2"
                >
                  Clear all
                </button>
              </div>
            </div>

            {/* Task'lar tablosu */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden flex-1 flex flex-col">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 text-xs uppercase text-[#6b6189] dark:text-gray-400 font-semibold tracking-wider">
                      <th className="p-4 w-10 text-center">
                        <input className="rounded border-gray-300 text-primary focus:ring-primary/20 cursor-pointer" type="checkbox"/>
                      </th>
                      <th className="p-4 min-w-[240px]">Task Name</th>
                      <th className="p-4 w-32">Status</th>
                      <th className="p-4 w-48">Assignee</th>
                      <th className="p-4 w-32">Due Date</th>
                      <th className="p-4 w-28">Priority</th>
                      <th className="p-4 w-16 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {currentTasks.map((task) => (
                      <tr key={task.id} className="group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="p-4 text-center">
                          <input className="rounded border-gray-300 text-primary focus:ring-primary/20 cursor-pointer" type="checkbox"/>
                        </td>
                        <td className="p-4">
                          <a className="text-sm font-medium text-[#131118] dark:text-white hover:text-primary transition-colors block" href="#">{task.todo}</a>
                          <span className="text-xs text-[#6b6189] dark:text-gray-400">Project: {task.tags?.[0] || 'General'}</span>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status || 'backlog')}`}>
                            {getStatusLabel(task.status || 'backlog')}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center size-6 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 text-white text-xs font-medium">
                              {task.id % 2 === 0 ? "JD" : "EY"}
                            </div>
                            <span className="text-sm text-[#131118] dark:text-gray-200">
                              {task.id % 2 === 0 ? "Jane Doe" : "Esra Yılmaz"}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-[#131118] dark:text-gray-300">
                            {task.dueDate || new Date(Date.now() + task.id * 86400000).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric"
                            })}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1.5">
                            <div className={`size-2 rounded-full ${getPriorityColor(task.priority)}`}></div>
                            <span className="text-sm font-medium text-[#131118] dark:text-gray-200">{getPriorityLabel(task.priority)}</span>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                            <span className="material-symbols-outlined" style={{fontSize: "20px"}}>more_horiz</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Sayfalama footer'ı */}
              <div className="bg-gray-50/50 dark:bg-gray-900/50 p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between mt-auto">
                <p className="text-sm text-[#6b6189] dark:text-gray-400">
                  Showing <span className="font-medium text-[#131118] dark:text-white">{startIndex + 1}-{Math.min(endIndex, filteredTasks.length)}</span> of <span className="font-medium text-[#131118] dark:text-white">{filteredTasks.length}</span> tasks
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-[#131118] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
