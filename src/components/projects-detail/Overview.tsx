import type { Comment, Post, Todo, User } from "@/types/jsonplaceholder";

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/);
  const a = parts[0]?.[0] ?? "U";
  const b = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (a + b).toUpperCase();
}


function AvatarSm({ u }: { u: User }) {
  const url = `https://i.pravatar.cc/80?img=${u.id}`;
  return (
    <div className="h-8 w-8 overflow-hidden rounded-full ring-2 ring-white">

      <img src={url} alt={u.name} className="h-8 w-8 object-cover" />
    </div>
  );
}

function AvatarMd({ u }: { u: User }) {
  const url = `https://i.pravatar.cc/100?img=${u.id}`;
  return (
    <div className="h-10 w-10 overflow-hidden rounded-full">

      <img src={url} alt={u.name} className="h-10 w-10 object-cover" />
    </div>
  );
}

export default function OverviewTab({
  post,
  lead,
  recent,
  pending,
  progress,
  teamUsers,
  candidateUsers,
}: {
  post: Post;
  lead: User;
  recent: Comment[];
  pending: Todo[];
  progress: number;
  teamUsers: User[];
  candidateUsers: User[];
}) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
      {/* LEFT */}
      <div className="lg:col-span-8 space-y-6">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">About Project</h2>

          <div className="mt-3 space-y-3">
            <p className="text-sm leading-6 text-slate-600">{post.body}</p>
            <p className="text-sm leading-6 text-slate-600">
              This project requires close collaboration between the design, engineering, and HR teams
              to ensure candidate data flows seamlessly into our ATS.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-md bg-fuchsia-50 px-2 py-1 text-xs font-medium text-fuchsia-700 ring-1 ring-fuchsia-200">
              UI/UX Design
            </span>
            <span className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-200">
              Frontend Dev
            </span>
            <span className="rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-800 ring-1 ring-amber-200">
              Branding
            </span>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">Recent Activity</h2>
            <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
              View all
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {recent.map((c, i) => (
              <div key={c.id} className="flex gap-3">
                <span
                  className={cn(
                    "mt-1.5 h-2 w-2 rounded-full",
                    i === 0 ? "bg-emerald-500" : i === 1 ? "bg-indigo-500" : "bg-slate-300"
                  )}
                />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-slate-900">{c.name}</div>
                  <div className="mt-1 text-xs text-slate-500">
                    Approved by {lead.name} • {i === 0 ? "2 hours ago" : i === 1 ? "Yesterday" : "3 days ago"}
                  </div>
                  <div className="mt-1 text-xs text-slate-500 truncate">{c.email}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">Pending Tasks</h2>

          <div className="mt-4 space-y-3">
            {pending.map((t, idx) => (
              <div
                key={t.id}
                className="flex items-start justify-between gap-4 rounded-lg border border-slate-100 bg-white p-3 hover:bg-slate-50"
              >
                <label className="flex items-start gap-3">
                  <input type="checkbox" defaultChecked={t.completed} className="mt-1 h-4 w-4" />
                  <div>
                    <div className="text-sm font-medium text-slate-900">{t.title}</div>
                    <div className="text-xs text-slate-500">
                      Due {idx === 0 ? "Tomorrow" : "Oct 24"} • Assigned to You
                    </div>
                  </div>
                </label>

                <span
                  className={cn(
                    "mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold",
                    idx === 0 ? "bg-amber-100 text-amber-700" : "bg-indigo-100 text-indigo-700"
                  )}
                >
                  {idx === 0 ? "P1" : "P2"}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* RIGHT */}
      <aside className="lg:col-span-4 space-y-6">
        {/* Progress */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">Project Progress</h3>
            <span className="text-sm font-semibold text-indigo-600">{progress}%</span>
          </div>

          <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
            <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${progress}%` }} />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
            <span>Start: Aug 01</span>
            <span>Due: Oct 30</span>
          </div>
        </section>

        {/* Assigned Team */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">Assigned Team</h3>
            <button className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
              +
            </button>
          </div>

          <div className="mt-4 flex items-center">
            {teamUsers.slice(0, 4).map((u, idx) => (
              <div key={u.id} className={cn(idx > 0 && "-ml-2")}>
                <AvatarSm u={u} />
              </div>
            ))}
            {teamUsers.length > 4 && (
              <div className="-ml-2">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-600 ring-2 ring-white">
                  +{teamUsers.length - 4}
                </div>
              </div>
            )}
          </div>

          <div className="mt-5 border-t border-slate-100 pt-4">
            <div className="flex items-center gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-amber-50 ring-1 ring-amber-200">
                ⭐
              </div>
              <div>
                <div className="text-[12px] font-semibold text-slate-900">Project Lead</div>
                <div className="text-[12px] text-slate-500">{lead.name}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Candidates */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">Candidates</h3>
            <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
              View All
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {candidateUsers.slice(0, 3).map((u) => (
              <div key={u.id} className="flex items-center justify-between rounded-lg border border-slate-100 p-3 hover:bg-slate-50">
                <div className="flex items-center gap-3 min-w-0">
                  <AvatarMd u={u} />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-slate-900">
                      {u.name}
                    </div>
                    <div className="truncate text-xs text-slate-500">
                      {u.company?.name ?? "Candidate"} • {u.address?.city ?? "—"}
                    </div>
                  </div>
                </div>

                <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50">
                  View
                </button>
              </div>
            ))}
          </div>

          <button className="mt-4 w-full rounded-lg border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
            + Shortlist Candidate
          </button>
        </section>

        {/* Resources */}
        <section className="rounded-xl bg-indigo-950 p-5 text-white shadow-sm">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">📁</div>
            <div className="min-w-0">
              <div className="text-sm font-semibold">Project Resources</div>
              <div className="mt-1 text-xs text-white/70">Access brand assets and guidelines.</div>
            </div>
          </div>

          <button className="mt-4 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-indigo-950 hover:bg-white/90">
            Open Folder
          </button>
        </section>
      </aside>
    </div>
  );
}
