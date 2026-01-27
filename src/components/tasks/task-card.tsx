"use client";

import { Task } from "@/lib/features/tasks/taskSlice";
import { Calendar, MessageSquare, Paperclip, Flag } from "lucide-react";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const isDone = task.status === "done";

  const priorityColors: Record<string, string> = {
    low: "bg-green-500",
    medium: "bg-orange-500",
    high: "bg-red-500",
  };

  const tagColors: Record<string, string> = {
    Research: "bg-slate-100 text-slate-700",
    Bug: "bg-red-100 text-red-700",
    Design: "bg-blue-100 text-blue-700",
    Backend: "bg-sky-100 text-sky-700",
    Marketing: "bg-pink-100 text-pink-700",
    "UI/UX": "bg-teal-100 text-teal-700",
    DevOps: "bg-green-100 text-green-700",
    Frontend: "bg-cyan-100 text-cyan-700",
  };

  /* Görsel simülasyonu */
  const showImage = task.id % 4 === 0;
  const imageUrl = showImage
    ? "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400"
    : null;

  return (
    <div
      className={`
        bg-white
        rounded-xl
        border
        transition-all
        cursor-pointer
        ${
          isDone
            ? "border-gray-200 opacity-70"
            : "border-gray-200 hover:border-gray-300 hover:shadow-md"
        }
      `}
    >
      {/* Image */}
      {imageUrl && (
        <div className="relative h-32 overflow-hidden rounded-t-xl">
          <img
            src={imageUrl}
            alt=""
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {task.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs px-2 py-0.5 rounded ${
                  tagColors[tag] || "bg-gray-100 text-gray-700"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3
          className={`
            text-sm font-medium mb-3 leading-snug
            ${
              isDone
                ? "line-through text-gray-400"
                : "text-gray-900"
            }
          `}
        >
          {task.todo}
        </h3>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          {task.priority === "high" && !isDone && (
            <div className="flex items-center gap-1 text-red-600">
              <Flag className="w-3 h-3" />
              <span>High</span>
            </div>
          )}

          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>
              {task.dueDate ||
                new Date(
                  Date.now() + task.id * 86400000
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
            </span>
          </div>

          {task.id % 3 === 0 && (
            <div className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              <span>{Math.floor(Math.random() * 10)}</span>
            </div>
          )}

          {task.id % 2 === 0 && (
            <div className="flex items-center gap-1">
              <Paperclip className="w-3 h-3" />
              <span>{Math.floor(Math.random() * 5) + 1}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Avatars */}
          <div className="flex items-center -space-x-2">
            <div className="w-6 h-6 rounded-full bg-linear-to-br from-violet-400 to-violet-600 text-white text-xs font-medium flex items-center justify-center border-2 border-white">
              {task.id % 2 === 0 ? "JD" : "EY"}
            </div>
            {task.id % 3 === 0 && (
              <div className="w-6 h-6 rounded-full bg-linear-to-br from-teal-400 to-teal-600 border-2 border-white" />
            )}
          </div>

          {/* Priority Dot */}
          {task.priority && !isDone && (
            <span
              className={`w-2 h-2 rounded-full ${
                priorityColors[task.priority]
              }`}
            />
          )}
        </div>

        {/* Progress – SADECE IN PROGRESS */}
        {task.status === "in-progress" && (
          <div className="mt-3">
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-violet-600 rounded-full"
                style={{
                  width: `${((task.id * 17) % 100)}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
