
"use client";

import React from "react";
import type { User } from "@/types/jsonplaceholder";

type CandidateStatus =
  | "Interviewing"
  | "Technical Test"
  | "New Applicant"
  | "Rejected"
  | "Offer Sent";

type Candidate = {
  id: number;
  name: string;
  role: string;
  applied: string;
  status: CandidateStatus;
  avatarUrl?: string;
  initials?: string;
};

type CandidatesProps = {
  users: User[];
};

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

/* ---------------- Icons (no deps) ---------------- */
function IconSearch() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" className="text-slate-400" fill="none">
      <path
        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <path
        d="M16.5 16.5 21 21"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconPlus() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function IconFolder() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="text-white" fill="none">
      <path
        d="M3.5 7.5a2.5 2.5 0 0 1 2.5-2.5h4l2 2h7.5A2.5 2.5 0 0 1 24 9.5v9A2.5 2.5 0 0 1 21.5 21h-15A2.5 2.5 0 0 1 4 18.5v-11Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconStar() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" className="text-amber-500" fill="none">
      <path
        d="M12 3.5l2.7 5.6 6.2.9-4.5 4.4 1.1 6.2L12 17.9 6.5 20.6l1.1-6.2-4.5-4.4 6.2-.9L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" className="text-slate-500" fill="none">
      <path d="M15 18 9 12l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function IconChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" className="text-slate-500" fill="none">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ---------------- UI bits ---------------- */
function StatusPill({ status }: { status: CandidateStatus }) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] leading-none font-medium ring-1";

  const cls =
    status === "Interviewing"
      ? "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200"
      : status === "Technical Test"
        ? "bg-amber-50 text-amber-800 ring-amber-200"
        : status === "New Applicant"
          ? "bg-slate-50 text-slate-700 ring-slate-200"
          : status === "Rejected"
            ? "bg-rose-50 text-rose-700 ring-rose-200"
            : "bg-sky-50 text-sky-700 ring-sky-200";

  return <span className={cn(base, cls)}>{status}</span>;
}

function Avatar({ c }: { c: Candidate }) {
  return (
    <div className="h-10 w-10 shrink-0">
      {c.avatarUrl ? (

        <img src={c.avatarUrl} alt={c.name} className="h-10 w-10 rounded-full object-cover" />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
          {c.initials ?? c.name.split(" ").map((x) => x[0]).slice(0, 2).join("")}
        </div>
      )}
    </div>
  );
}

function SmallAvatar({ url, initials }: { url?: string; initials?: string }) {
  return (
    <div className="h-8 w-8 overflow-hidden rounded-full ring-2 ring-white">
      {url ? (

        <img src={url} alt="" className="h-8 w-8 object-cover" />
      ) : (
        <div className="flex h-8 w-8 items-center justify-center bg-indigo-100 text-[11px] font-semibold text-indigo-700">
          {initials ?? "U"}
        </div>
      )}
    </div>
  );
}

/* ---------------- Mapping helpers ---------------- */
function pickStatus(id: number): CandidateStatus {
  // 5 durum dağıtımı
  const arr: CandidateStatus[] = [
    "Interviewing",
    "Technical Test",
    "New Applicant",
    "Rejected",
    "Offer Sent",
  ];
  return arr[id % arr.length];
}

function pickApplied(id: number) {
  const arr = ["Applied 2d ago", "Applied 5d ago", "Applied 1w ago", "Applied 2w ago"];
  return arr[id % arr.length];
}

function pickRole(u: User) {

  return u.username ? `${u.username}` : "Candidate";
}

export default function Candidates({ users }: CandidatesProps) {
  const progress = 65;

  // API users -> UI candidates
  const candidates: Candidate[] = users.slice(0, 12).map((u) => ({
    id: u.id,
    name: u.name,
    role: pickRole(u),
    applied: pickApplied(u.id),
    status: pickStatus(u.id),
    avatarUrl: `https://i.pravatar.cc/100?u=${u.id}`,
    initials: u.name
      .split(" ")
      .map((x) => x[0])
      .slice(0, 2)
      .join("")
      .toUpperCase(),
  }));

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      {/* LEFT: Candidates table card */}
      <section className="xl:col-span-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-6 py-5">
          <div>
            <h2 className="text-[15px] font-semibold text-slate-900">Candidates</h2>
            <p className="mt-1 text-[13px] text-slate-500">
              Manage and track candidates for this project.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                <IconSearch />
              </span>
              <input
                placeholder="Search candidates"
                className="h-10 w-[220px] rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-[13px] text-slate-700 placeholder:text-slate-400 outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50"
              />
            </div>

            {/* Add Candidate */}
            <button className="inline-flex h-10 items-center gap-2 rounded-xl bg-indigo-600 px-4 text-[13px] font-semibold text-white hover:bg-indigo-700">
              <IconPlus />
              Add Candidate
            </button>
          </div>
        </div>

        {/* Table head */}
        <div className="border-t border-slate-100">
          <div className="grid grid-cols-12 px-6 py-3 text-[11px] font-semibold tracking-wide text-slate-400">
            <div className="col-span-7">CANDIDATE</div>
            <div className="col-span-3">STATUS</div>
            <div className="col-span-2 text-right">ACTIONS</div>
          </div>
        </div>

        {/* Rows */}
        <div className="border-t border-slate-100">
          {candidates.slice(0, 5).map((c) => (
            <div key={c.id} className="border-b border-slate-100 last:border-b-0">
              <div className="grid grid-cols-12 items-center px-6 py-5">
                {/* Candidate */}
                <div className="col-span-7 flex min-w-0 items-center gap-4">
                  <Avatar c={c} />
                  <div className="min-w-0">
                    <div className="truncate text-[13px] font-semibold text-slate-900">{c.name}</div>
                    <div className="truncate text-[12px] text-slate-500">
                      {c.role} <span className="text-slate-300">•</span> {c.applied}
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="col-span-3">
                  <StatusPill status={c.status} />
                </div>

                {/* Actions */}
                <div className="col-span-2 flex justify-end">
                  <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-[12px] font-medium text-slate-600 hover:bg-slate-50">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4">
          <div className="text-[12px] text-slate-500">Showing 1 to 5 of 12 results</div>

          <div className="flex items-center gap-2">
            <button className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50">
              <IconChevronLeft />
            </button>

            <button className="grid h-8 w-8 place-items-center rounded-lg border border-indigo-200 bg-indigo-600 text-[12px] font-semibold text-white">
              1
            </button>
            <button className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white text-[12px] font-semibold text-slate-700 hover:bg-slate-50">
              2
            </button>
            <button className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white text-[12px] font-semibold text-slate-700 hover:bg-slate-50">
              3
            </button>

            <button className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50">
              <IconChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* RIGHT: Sidebar */}
      <aside className="space-y-6">
        {/* Progress card */}
        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] font-semibold text-slate-900">Project Progress</h3>
            <span className="text-[13px] font-semibold text-indigo-600">{progress}%</span>
          </div>

          <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
            <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${progress}%` }} />
          </div>

          <div className="mt-4 flex items-center justify-between text-[12px] text-slate-500">
            <span>Start: Aug 01</span>
            <span>Due: Oct 30</span>
          </div>
        </section>

        {/* Assigned Team */}
        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] font-semibold text-slate-900">Assigned Team</h3>
            <button className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
              +
            </button>
          </div>

          <div className="mt-4 flex items-center">
            <SmallAvatar url={`https://i.pravatar.cc/100?u=1`} />
            <div className="-ml-2">
              <SmallAvatar url={`https://i.pravatar.cc/100?u=2`} />
            </div>
            <div className="-ml-2">
              <SmallAvatar url={`https://i.pravatar.cc/100?u=3`} />
            </div>
            <div className="-ml-2">
              <SmallAvatar url={`https://i.pravatar.cc/100?u=4`} />
            </div>
            <div className="-ml-2">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-600 ring-2 ring-white">
                +2
              </div>
            </div>
          </div>

          <div className="mt-5 border-t border-slate-100 pt-4">
            <div className="flex items-center gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-amber-50 ring-1 ring-amber-200">
                <IconStar />
              </div>
              <div>
                <div className="text-[12px] font-semibold text-slate-900">Project Lead</div>
                <div className="text-[12px] text-slate-500">Sarah Jenkins</div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Resources */}
        <section className="rounded-2xl bg-indigo-950 px-6 py-6 text-white shadow-sm">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
              <IconFolder />
            </div>

            <div className="min-w-0">
              <div className="text-[13px] font-semibold">Project Resources</div>
              <div className="mt-1 text-[12px] text-white/70">
                Access brand assets and guidelines.
              </div>
            </div>
          </div>

          <button className="mt-4 rounded-xl bg-white px-4 py-2 text-[13px] font-semibold text-indigo-950 hover:bg-white/90">
            Open Folder
          </button>
        </section>
      </aside>
    </div>
  );
}
