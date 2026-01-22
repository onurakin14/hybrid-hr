"use client";

import {
  Search,
  Bell,
  Plus,
  LayoutGrid,
  List,
  SlidersHorizontal,
  ArrowUpDown,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleCreate } from "@/lib/features/tasks/taskSlice";

interface HeaderProps {
  viewMode: "board" | "list";
  onViewModeChange: (mode: "board" | "list") => void;
}

export default function Header({
  viewMode,
  onViewModeChange,
}: HeaderProps) {
  const dispatch = useDispatch();

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      {/* Top bar */}
      <div className="px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-violet-600 rounded-lg flex items-center justify-center shadow-sm">
              <div className="w-5 h-5 border-2 border-white rounded" />
            </div>
            <span className="font-semibold text-lg">TaskFlow</span>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks, projects..."
              className="pl-10 pr-4 py-2 w-80 bg-gray-50 rounded-lg text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>

        <nav className="flex items-center gap-8">
          <a className="text-sm text-gray-600 hover:text-gray-900">
            Dashboard
          </a>
          <a className="text-sm font-medium text-gray-900">
            Board
          </a>
          <a className="text-sm text-gray-600 hover:text-gray-900">
            Timeline
          </a>
          <a className="text-sm text-gray-600 hover:text-gray-900">
            Team
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg shadow-sm hover:shadow transition relative bg-white">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <button
            onClick={() => dispatch(toggleCreate())}
            className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium shadow hover:shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            New Task
          </button>

          <button className="w-9 h-9 bg-gray-200 rounded-lg shadow-sm" />
        </div>
      </div>

      {/* Sub header */}
      <div className="px-6 py-4 bg-gray-50 shadow-inner">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-semibold">
                Product Roadmap Q3
              </h1>
              <p className="text-sm text-gray-500">
                Updated 10m ago • Public to Team
              </p>
            </div>

            <div className="flex items-center -space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-400 to-violet-600 rounded-full shadow-sm" />
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full shadow-sm" />
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full shadow-sm" />
              <div className="w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center text-xs font-medium">
                +4
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View switch */}
            <div className="flex items-center bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => onViewModeChange("board")}
                className={`flex items-center gap-2 px-3 py-2 text-sm transition ${
                  viewMode === "board"
                    ? "bg-gray-100 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                Board
              </button>

              <button
                onClick={() => onViewModeChange("list")}
                className={`flex items-center gap-2 px-3 py-2 text-sm transition ${
                  viewMode === "list"
                    ? "bg-gray-100 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <List className="w-4 h-4" />
                List
              </button>
            </div>

            <button className="flex items-center gap-2 px-3 py-2 text-sm bg-white rounded-lg shadow-sm hover:shadow transition">
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </button>

            <button className="flex items-center gap-2 px-3 py-2 text-sm bg-white rounded-lg shadow-sm hover:shadow transition">
              <ArrowUpDown className="w-4 h-4" />
              Sort
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
