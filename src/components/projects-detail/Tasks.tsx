"use client";

import { useMemo, useState } from "react";
import type { Todo, User } from "@/types/jsonplaceholder";

type Props = {
  leadUserId: number;
  tasks: Todo[];
  users: User[];
};

type Status = "In Progress" | "To Do" | "Review" | "Done";
type Priority = "High" | "Medium" | "Low";
type SortKey = "dueDate" | "priority" | "status";
type Chip = "all" | "my" | "due";

function statusFromId(id: number, completed: boolean): Status {
  if (completed) return "Done";
  const mod = id % 3;
  if (mod === 0) return "In Progress";
  if (mod === 1) return "To Do";
  return "Review";
}

function priorityFromId(id: number): Priority {
  const mod = id % 3;
  if (mod === 0) return "High";
  if (mod === 1) return "Medium";
  return "Low";
}

function codeFromId(id: number): string {
  const prefixes = ["UX", "DS", "BE", "GEN", "DES"];
  const p = prefixes[id % prefixes.length];
  return `${p}-${100 + (id % 900)}`;
}

function dueDateFromId(id: number): { label: string; sortValue: number } {
  if (id % 5 === 0) return { label: "Tomorrow", sortValue: 1 };
  const day = 10 + (id % 20);
  const month = ["Oct", "Nov"][id % 2];
  const label = `${month} ${String(day).padStart(2, "0")}, 2023`;
  return { label, sortValue: 10 + (id % 40) };
}

function assigneeFromTask(taskId: number, users: User[], leadUserId: number) {
  if (!users.length) return undefined;
  if (taskId % 4 === 0) {
    return users.find((u) => u.id === leadUserId) ?? users[0];
  }
  return users[taskId % users.length];
}

function badgeClassForStatus(s: Status) {
  switch (s) {
    case "In Progress":
      return "bg-orange-50 text-orange-700 ring-1 ring-orange-200";
    case "To Do":
      return "bg-slate-100 text-slate-700 ring-1 ring-slate-200";
    case "Review":
      return "bg-fuchsia-50 text-fuchsia-700 ring-1 ring-fuchsia-200";
    case "Done":
      return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
  }
}

function dotClassForPriority(p: Priority) {
  switch (p) {
    case "High":
      return "bg-red-500";
    case "Medium":
      return "bg-orange-500";
    case "Low":
      return "bg-blue-500";
  }
}

function sortWeightPriority(p: Priority) {
  if (p === "High") return 3;
  if (p === "Medium") return 2;
  return 1;
}

function initials(name?: string) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  const a = parts[0]?.[0] ?? "";
  const b = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (a + b).toUpperCase();
}

function avatarUrl(u?: User) {
  if (!u) return "";
  const imgId = ((u.id - 1) % 70) + 1;
  return `https://i.pravatar.cc/80?img=${imgId}`;
}

export default function Tasks({ leadUserId, tasks, users }: Props) {
  const [q, setQ] = useState("");
  const [chip, setChip] = useState<Chip>("all");
  const [sortKey, setSortKey] = useState<SortKey>("dueDate");
  const [page, setPage] = useState(1);

  const pageSize = 5;

  const enriched = useMemo(() => {
    return tasks.map((t) => {
      const status = statusFromId(t.id, t.completed);
      const priority = priorityFromId(t.id);
      const code = codeFromId(t.id);
      const due = dueDateFromId(t.id);
      const assignee = assigneeFromTask(t.id, users, leadUserId);
      return { ...t, status, priority, code, due, assignee };
    });
  }, [tasks, users, leadUserId]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    let rows = enriched;

    if (query) {
      rows = rows.filter((r) => {
        const hay = `${r.title} ${r.code} ${r.assignee?.name ?? ""}`.toLowerCase();
        return hay.includes(query);
      });
    }

    if (chip === "my") rows = rows.filter((r) => r.assignee?.id === leadUserId);
    if (chip === "due") rows = rows.filter((r) => r.due.sortValue <= 15);

    rows = [...rows].sort((a, b) => {
      if (sortKey === "dueDate") return a.due.sortValue - b.due.sortValue;
      if (sortKey === "priority")
        return sortWeightPriority(b.priority) - sortWeightPriority(a.priority);
      return a.status.localeCompare(b.status);
    });

    return rows;
  }, [enriched, q, chip, sortKey, leadUserId]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);

  const paged = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  const showingFrom = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const showingTo = Math.min(currentPage * pageSize, total);

  return (
    <div className="space-y-4">
      {/* TOP ROW: Search + Chips (left) / Filter + Sort + Add (right) */}
      <div className="flex flex-wrap items-center justify-between gap-3">

        {/* LEFT */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          {/* Search (h-10) */}
          <div className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 shadow-sm">
            <span className="text-slate-400">⌕</span>
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
              placeholder="Search tasks..."
              className="w-52 sm:w-64 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          {/* Chips (same row, same height) */}
          <div className="flex h-10 items-center rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
            {[
              { key: "all" as const, label: "All" },
              { key: "my" as const, label: "My Tasks" },
              { key: "due" as const, label: "Due Soon" },
            ].map((c) => {
              const active = chip === c.key;
              return (
                <button
                  key={c.key}
                  onClick={() => {
                    setChip(c.key);
                    setPage(1);
                  }}
                  className={[
                    "h-8 rounded-md px-3 text-xs font-medium transition",
                    active ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50",
                  ].join(" ")}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 lg:justify-end">
          <button className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm hover:bg-slate-50">
            Filter
          </button>

          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm"
          >
            <option value="dueDate">Sort: Due Date</option>
            <option value="priority">Sort: Priority</option>
            <option value="status">Sort: Status</option>
          </select>

          <button className="h-10 rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
            + Add Task
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr className="text-xs font-semibold tracking-wider text-slate-500">
              <th className="w-10 px-4 py-3">
                <input type="checkbox" className="h-4 w-4" />
              </th>
              <th className="px-4 py-3">TASK NAME</th>
              <th className="px-4 py-3">STATUS</th>
              <th className="px-4 py-3">PRIORITY</th>
              <th className="px-4 py-3">ASSIGNEE</th>
              <th className="px-4 py-3">DUE DATE</th>
              <th className="w-10 px-4 py-3"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 bg-white">
            {paged.map((r) => (
              <tr key={r.id} className="text-sm">
                <td className="px-4 py-3 align-top">
                  <input type="checkbox" defaultChecked={r.completed} className="h-4 w-4" />
                </td>

                <td className="px-4 py-3">
                  <div className="font-medium text-slate-900">{r.title}</div>
                  <div className="text-xs text-slate-500">{r.code}</div>
                </td>

                {/* Status badge: more padding + leading-none so text doesn't touch */}
                <td className="px-4 py-3">
                  <span
                    className={[
                      "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium leading-none",
                      badgeClassForStatus(r.status),
                    ].join(" ")}
                  >
                    {r.status}
                  </span>
                </td>

                {/* Priority: colored dot + label */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className={`h-2 w-2 rounded-full ${dotClassForPriority(r.priority)}`} />
                    <span className="text-sm">{r.priority}</span>
                  </div>
                </td>

                {/* Assignee: avatar + name */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {r.assignee ? (
                      <img
                        src={avatarUrl(r.assignee)}
                        alt={r.assignee.name}
                        className="h-6 w-6 shrink-0 rounded-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : null}

                    {/* Fallback initials (if no assignee or image blocked) */}

                    <div className="text-sm text-slate-900">
                      {r.assignee?.name ?? "Unassigned"}
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3">
                  {r.due.label === "Tomorrow" ? (
                    <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-medium leading-none text-red-700 ring-1 ring-red-200">
                      Tomorrow
                    </span>
                  ) : (
                    <span className="text-sm text-slate-700">{r.due.label}</span>
                  )}
                </td>

                <td className="px-4 py-3 text-right">
                  <button className="rounded-lg px-2 py-1 text-slate-500 hover:bg-slate-100">
                    ⋯
                  </button>
                </td>
              </tr>
            ))}

            {paged.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-500">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-3 text-xs text-slate-500">
          <div>
            Showing {showingFrom} to {showingTo} of {total} tasks
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-sm disabled:opacity-50"
            >
              Previous
            </button>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
