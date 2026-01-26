"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { toggleCreate, createTask } from "@/lib/features/tasks/taskSlice";
import { useState } from "react";

export default function CreateTaskModal() {
  const dispatch = useDispatch();
  const open = useSelector((s: RootState) => s.tasks.isCreateOpen);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [tags, setTags] = useState<string[]>([]);
  const [showTagInput, setShowTagInput] = useState(false);
  const [tagInput, setTagInput] = useState("");

  if (!open) return null;

  const addTag = () => {
    if (!tagInput.trim()) return;
    if (tags.includes(tagInput.trim())) return;
    setTags((prev) => [...prev, tagInput.trim()]);
    setTagInput("");
    setShowTagInput(false);
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleCreate = async () => {
    if (!title.trim()) return;

    await dispatch(
      createTask({
        todo: title,
        tags,
        priority,
      }) as any
    );

    setTitle("");
    setDescription("");
    setAssignee("");
    setDueDate("");
    setPriority("medium");
    setTags([]);
    setTagInput("");
    setShowTagInput(false);

    dispatch(toggleCreate());
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-semibold">Create New Task</h2>
            <p className="text-sm text-gray-500">
              Fill in the details below to add a new task to your project.
            </p>
          </div>
          <button
            onClick={() => dispatch(toggleCreate())}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Task Title <span className="text-red-500">*</span>
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="e.g., Q3 Financial Review"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Add details about this task, specific requirements, or goals..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Assignee</label>
            <select
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            >
              <option value="">Select team member</option>
              <option value="Esra">Esra Yılmaz</option>
              <option value="John">John Doe</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Priority</label>
          <div className="flex gap-2">
            {[
              { key: "low", label: "Low", dot: "bg-green-500" },
              { key: "medium", label: "Medium", dot: "bg-orange-500" },
              { key: "high", label: "High", dot: "bg-red-500" },
            ].map((p) => (
              <button
                key={p.key}
                onClick={() => setPriority(p.key as any)}
                className={`flex-1 border rounded-lg px-3 py-2 text-sm flex items-center justify-center gap-2 ${
                  priority === p.key
                    ? "border-violet-500 bg-violet-50 text-violet-600"
                    : "hover:bg-gray-50"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${p.dot}`} />
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Tags</label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm rounded-full bg-gray-100 flex items-center gap-1"
              >
                #{tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </span>
            ))}
            {!showTagInput && (
              <button
                onClick={() => setShowTagInput(true)}
                className="px-3 py-1 text-sm rounded-full border border-dashed text-gray-500 hover:text-gray-700"
              >
                + Add Tag
              </button>
            )}
          </div>
          {showTagInput && (
            <input
              autoFocus
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTag()}
              onBlur={() => setShowTagInput(false)}
              className="mt-2 w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="Tag name"
            />
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => dispatch(toggleCreate())}
            className="px-4 py-2 rounded-lg border text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!title.trim()}
            className="px-4 py-2 rounded-lg bg-violet-600 text-white text-sm hover:bg-violet-700 disabled:opacity-50"
          >
            ✓ Create Task
          </button>
        </div>
      </div>
    </div>
  );
}
