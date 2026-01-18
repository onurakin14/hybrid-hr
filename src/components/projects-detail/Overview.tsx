import type { Comment, Post, Todo, User } from "@/types/jsonplaceholder";

export default function OverviewTab({
  post,
  lead,
  recent,
  pending,
  progress,
}: {
  post: Post;
  lead: User;
  recent: Comment[];
  pending: Todo[];
  progress: number;
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
              This project requires close collaboration between the design, engineering, and HR
              teams to ensure candidate data flows seamlessly into our ATS.
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
                  className={[
                    "mt-1.5 h-2 w-2 rounded-full",
                    i === 0 ? "bg-emerald-500" : i === 1 ? "bg-indigo-500" : "bg-slate-300",
                  ].join(" ")}
                />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-slate-900">{c.name}</div>
                  <div className="mt-1 text-xs text-slate-500">
                    Approved by {lead.name} •{" "}
                    {i === 0 ? "2 hours ago" : i === 1 ? "Yesterday" : "3 days ago"}
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
                  className={[
                    "mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold",
                    idx === 0 ? "bg-amber-100 text-amber-700" : "bg-indigo-100 text-indigo-700",
                  ].join(" ")}
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

        <section className="rounded-xl border border-dashed border-slate-200 bg-white p-5 shadow-sm text-sm text-slate-600">
          Sidebar will be implemented by teammates.
          <div className="mt-3 text-xs text-slate-500">
            Lead: <span className="font-medium text-slate-700">{lead.name}</span>
          </div>
        </section>
      </aside>
    </div>
  );
}
