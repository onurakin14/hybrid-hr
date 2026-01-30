"use client";

import React from "react";
import type { User } from "@/types/jsonplaceholder";

/* ---------------- TYPES ---------------- */

type MemberAccess = "Full Access" | "Editor" | "Viewer" | "Admin";
type Presence = "online" | "away" | "offline";

type TeamProps = {
  users: User[];
};

/* ---------------- HELPERS ---------------- */

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function accessBadgeClass(access: MemberAccess) {
  if (access === "Full Access" || access === "Admin") {
    return "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10";
  }
  return "bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-500/10";
}

function presenceDotClass(p: Presence) {
  if (p === "online") return "bg-green-500";
  if (p === "away") return "bg-yellow-500";
  return "bg-gray-400";
}

/* ---------------- ICONS ---------------- */

function IconPlus() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconChat() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 15a4 4 0 0 1-4 4H9l-4 3v-3H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconKebab() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 6.5a1.35 1.35 0 1 0 0-2.7 1.35 1.35 0 0 0 0 2.7Zm0 7a1.35 1.35 0 1 0 0-2.7 1.35 1.35 0 0 0 0 2.7Zm0 7a1.35 1.35 0 1 0 0-2.7 1.35 1.35 0 0 0 0 2.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconGroupAdd() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M16 11a4 4 0 1 0-8 0"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M3.5 20.5a8.5 8.5 0 0 1 17 0"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M18 8v4M16 10h4"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ---------------- COMPONENT ---------------- */

export default function Team({ users }: TeamProps) {
  const composition = [
    {
      label: "Product Design",
      count: users.slice(0, 3).length,
      dot: "bg-purple-500",
    },
    {
      label: "Engineering",
      count: users.slice(3, 7).length,
      dot: "bg-blue-500",
    },
    {
      label: "Marketing",
      count: Math.max(users.length - 7, 0),
      dot: "bg-green-500",
    },
  ] as const;

  const workload = Math.min(50 + users.length * 5, 95);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
      {/* LEFT */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <div className="rounded-xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Project Team</h3>
              <p className="text-sm text-slate-500 mt-1">
                Manage access and roles for this project
              </p>
            </div>

            <button className="flex items-center gap-2 rounded-lg bg-[#4913ec] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3b0fc6]">
              <IconPlus />
              Add Member
            </button>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-200">
            {users.map((u) => {
              const access: MemberAccess = u.id === 1 ? "Admin" : "Editor";
              const presence: Presence = u.id % 3 === 0 ? "away" : "online";

              return (
                <div
                  key={u.id}
                  className="flex items-center justify-between p-6 hover:bg-slate-50 gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className="relative flex-shrink-0">
                      <img
                        src={`https://i.pravatar.cc/120?u=${u.id}`}
                        alt={u.name}
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-white"
                      />
                      <div
                        className={cn(
                          "absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white",
                          presenceDotClass(presence),
                        )}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold text-slate-900 truncate">
                        {u.name}
                      </h4>
                      <p className="text-xs text-slate-500 truncate">
                        {u.company?.name ?? "Company"} •{" "}
                        {u.address?.city ?? "City"}
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:flex flex-col items-center gap-1 w-32 flex-shrink-0">
                    <span
                      className={cn(
                        "inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium w-20",
                        accessBadgeClass(access),
                      )}
                    >
                      {access}
                    </span>
                    <span className="text-xs text-slate-500 whitespace-nowrap">
                      Last active: recently
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button className="p-2 text-slate-400 hover:text-[#4913ec] rounded-lg hover:bg-slate-100">
                      <IconChat />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100">
                      <IconKebab />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <h3 className="text-base font-bold text-slate-900 mb-4">
            Team Composition
          </h3>

          <div className="space-y-4">
            {composition.map((c) => (
              <div
                key={c.label}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <span className={cn("h-2.5 w-2.5 rounded-full", c.dot)} />
                  <span className="text-slate-500">{c.label}</span>
                </div>
                <span className="font-medium text-slate-900">{c.count}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-500">
                Total Workload
              </span>
              <span className="text-sm font-bold text-slate-900">
                {workload}%
              </span>
            </div>

            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-[#4913ec] h-2 rounded-full"
                style={{ width: `${workload}%` }}
              />
            </div>

            <p className="text-xs text-slate-500 mt-2">
              Team capacity is nearing limit.
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-white p-6 shadow-sm ring-1 ring-black/5 border border-indigo-100">
          <div className="flex items-start gap-3 mb-3">
            <div className="rounded-lg bg-white p-2 text-[#4913ec] shadow-sm">
              <IconGroupAdd />
            </div>

            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Need more resources?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Request additional team members from HR.
              </p>
            </div>
          </div>

          <button className="w-full mt-2 rounded-lg border border-[#4913ec]/20 bg-white py-2 text-sm font-medium text-[#4913ec] hover:bg-[#4913ec]/5">
            Request Resources
          </button>
        </div>
      </div>
    </div>
  );
}
