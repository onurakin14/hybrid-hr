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
