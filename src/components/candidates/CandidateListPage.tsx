"use client";

import Link from "next/link";
import * as React from "react";
import type { Candidate, CandidateStatus } from "@/types/jsonplaceholder";
import { avatarUrl } from "@/lib/avatars";

function cn(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

function statusLabel(s: CandidateStatus) {
  switch (s) {
    case "new":
      return "New";
    case "in_review":
      return "In Review";
    case "interview":
      return "Interview";
    case "offer_sent":
      return "Offer Sent";
    case "rejected":
      return "Rejected";
    default:
      return s;
  }
}

function statusClass(s: CandidateStatus) {
  switch (s) {
    case "in_review":
      return "bg-violet-50 text-violet-700 ring-violet-200";
    case "interview":
      return "bg-amber-50 text-amber-700 ring-amber-200";
    case "new":
      return "bg-blue-50 text-blue-700 ring-blue-200";
    case "rejected":
      return "bg-rose-50 text-rose-700 ring-rose-200";
    case "offer_sent":
      return "bg-emerald-50 text-emerald-700 ring-emerald-200";
    default:
      return "bg-slate-50 text-slate-700 ring-slate-200";
  }
}

function StatusBadge({ status }: { status: CandidateStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
        statusClass(status)
      )}
    >
      {statusLabel(status)}
    </span>
  );
}

function Avatar({ name, src }: { name: string; src?: string }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  return (
    <div className="h-9 w-9 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200">
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-slate-600">
          {initials || "?"}
        </div>
      )}
    </div>
  );
}

function formatLastActivity(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString();
}

export default function CandidateListPage({ candidates }: { candidates: Candidate[] }) {
  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState<"all" | CandidateStatus>("all");
  const [role, setRole] = React.useState<"all" | string>("all");

  const [selected, setSelected] = React.useState<Record<string, boolean>>({});

  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({ name: "", email: "", role: "" });

  const keyOf = (id: Candidate["id"]) => String(id);

  const roles = React.useMemo(() => {
    const set = new Set<string>();
    candidates.forEach((c) => c.role && set.add(c.role));
    return Array.from(set);
  }, [candidates]);

  const filtered = React.useMemo(() => {
    const qq = q.trim().toLowerCase();
    return candidates.filter((c) => {
      const matchesQ =
        !qq ||
        c.name.toLowerCase().includes(qq) ||
        c.email.toLowerCase().includes(qq) ||
        c.role.toLowerCase().includes(qq);

      const matchesStatus = status === "all" || c.status === status;
      const matchesRole = role === "all" || c.role === role;

      return matchesQ && matchesStatus && matchesRole;
    });
  }, [candidates, q, status, role]);

  const allChecked = filtered.length > 0 && filtered.every((c) => selected[keyOf(c.id)]);
  const someChecked = filtered.some((c) => selected[keyOf(c.id)]) && !allChecked;

  function toggleAll() {
    const next = { ...selected };
    if (allChecked) filtered.forEach((c) => (next[keyOf(c.id)] = false));
    else filtered.forEach((c) => (next[keyOf(c.id)] = true));
    setSelected(next);
  }

  function updateForm<K extends keyof typeof form>(key: K, val: (typeof form)[K]) {
    setForm((p) => ({ ...p, [key]: val }));
  }

  function closeModal() {
    setOpen(false);
    setForm({ name: "", email: "", role: "" });
  }

  function submit() {
    const name = form.name.trim();
    const email = form.email.trim();
    const roleVal = form.role.trim();

    if (!name || !email || !roleVal) return;

    console.log("New candidate:", { name, email, role: roleVal });

    closeModal();
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-slate-900">Candidates</h2>
          <p className="text-sm text-slate-500">Manage and track applicant progress across all roles</p>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-700"
        >
          <span className="text-base leading-none">+</span>
          Add Candidate
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-md">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, email, or keywords..."
              className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
            >
              <option value="all">Filter by Status</option>
              <option value="new">New</option>
              <option value="in_review">In Review</option>
              <option value="interview">Interview</option>
              <option value="offer_sent">Offer Sent</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
            >
              <option value="all">Filter by Role</option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <button
              type="button"
              title="View options"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M1 14h6m-3-4h6m7 6h6m-3-4h6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
        <div className="overflow-x-auto">
          <table className="min-w-[760px] w-full">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    ref={(el) => {
                      if (el) el.indeterminate = someChecked;
                    }}
                    onChange={toggleAll}
                    className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-200"
                  />
                </th>
                <th className="px-4 py-3">Candidate Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Last Activity</th>
                <th className="w-12 px-4 py-3"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 bg-white">
              {filtered.map((c) => (
                <tr key={keyOf(c.id)} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={!!selected[keyOf(c.id)]}
                      onChange={(e) =>
                        setSelected((prev) => ({
                          ...prev,
                          [keyOf(c.id)]: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-200"
                    />
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={c.name} src={avatarUrl(c.id)} />
                      <div className="min-w-0">
                        <Link
                          href={`/admin/candidates/${c.id}`}
                          className="block truncate text-sm font-semibold text-slate-900 hover:text-violet-700"
                        >
                          {c.name}
                        </Link>
                        <div className="truncate text-xs text-slate-500">{c.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-sm text-slate-700">{c.role}</td>

                  <td className="px-4 py-3">
                    <StatusBadge status={c.status} />
                  </td>

                  <td className="px-4 py-3 text-sm text-slate-600">
                    {formatLastActivity(c.lastActivityAt)}
                  </td>

                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-slate-100"
                      title="More"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 6.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM12 10.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM12 14.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-500">
                    No candidates found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-white px-4 py-3">
          <div className="text-xs text-slate-500">
            Showing <span className="font-semibold text-slate-700">1</span> to{" "}
            <span className="font-semibold text-slate-700">{filtered.length}</span> of{" "}
            <span className="font-semibold text-slate-700">{filtered.length}</span> candidates
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button
              type="button"
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close"
            onClick={closeModal}
            className="absolute inset-0 bg-black/30"
          />

          <div className="relative mx-auto mt-24 w-[92%] max-w-md">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold text-slate-900">Add Candidate</div>
                  <div className="mt-1 text-sm text-slate-500">Enter basic candidate details.</div>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-slate-100"
                  title="Close"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <div className="text-xs font-semibold text-slate-500">NAME</div>
                  <input
                    value={form.name}
                    onChange={(e) => updateForm("name", e.target.value)}
                    className="mt-1 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-500">EMAIL</div>
                  <input
                    value={form.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                    className="mt-1 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
                    placeholder="jane@company.com"
                  />
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-500">ROLE</div>
                  <input
                    value={form.role}
                    onChange={(e) => updateForm("role", e.target.value)}
                    className="mt-1 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
                    placeholder="Frontend Developer"
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={submit}
                  disabled={!form.name.trim() || !form.email.trim() || !form.role.trim()}
                  className="rounded-lg bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 disabled:opacity-50"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
