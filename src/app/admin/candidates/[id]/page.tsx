import Link from "next/link";
import { apiGet } from "@/lib/api";
import type { User, Post, Todo, Comment } from "@/types/jsonplaceholder";
import { buildCandidateChallenge, buildCandidateFeedback } from "@/lib/candidate-mock";
import CandidateActions from "@/components/candidates/CandidateActions";

function cn(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-500 ring-1 ring-slate-200">
      {children}
    </span>
  );
}

function statusBadgeClass(status: "PENDING" | "IN REVIEW" | "APPROVED") {
  if (status === "APPROVED") return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  if (status === "IN REVIEW") return "bg-amber-50 text-amber-700 ring-amber-200";
  return "bg-slate-50 text-slate-600 ring-slate-200";
}

function scoreBadgeClass(score: number) {
  if (score >= 4.5) return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  if (score >= 4.0) return "bg-blue-50 text-blue-700 ring-blue-200";
  return "bg-amber-50 text-amber-700 ring-amber-200";
}

export default async function CandidateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const candidateId = Number(id);

  const user = (await apiGet(`/users/${id}`)) as User;

  const posts = (await apiGet(`/posts?userId=${candidateId}`)) as Post[];
  const todos = (await apiGet(`/todos?userId=${candidateId}`)) as Todo[];

  const postId = posts?.[0]?.id ?? candidateId;
  const comments = (await apiGet(`/comments?postId=${postId}`)) as Comment[];

  const challenge = buildCandidateChallenge(candidateId, posts, todos);
  const feedback = buildCandidateFeedback(candidateId, comments);

  return (
    <div className="min-h-screen overflow-y-auto">
      <div className="mx-auto max-w-7xl px-6 py-6 pb-16">
        <div className="text-sm text-slate-500">
          <Link href="/admin/candidates" className="hover:text-slate-700">
            Candidates
          </Link>{" "}
          <span className="mx-2">/</span>
          <span className="text-slate-700">{user.name}</span>
        </div>

        <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-semibold text-slate-900">{user.name}</h1>
              <span className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 ring-1 ring-inset ring-violet-200">
                <span className="h-2 w-2 rounded-full bg-violet-600" />
                Technical Interview
              </span>
            </div>

            <div className="text-sm text-slate-500">
              {user.company?.name ?? "Senior Product Designer"} • Applied 2 weeks ago
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 21s7-5.2 7-11a7 7 0 10-14 0c0 5.8 7 11 7 11z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 11.5a2 2 0 100-4 2 2 0 000 4z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <span>{user.address?.city ?? "San Francisco, CA"} (Open to Remote)</span>
            </div>
          </div>

          <CandidateActions candidateId={candidateId} candidateName={user.name} />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4 space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">Contact Information</h2>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Icon>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M4 6h16v12H4V6z" stroke="currentColor" strokeWidth="2" />
                      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </Icon>
                  <div>
                    <div className="text-xs font-semibold text-slate-500">EMAIL</div>
                    <div className="text-slate-700">{user.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Icon>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6.5 3h3L11 8.5l-2 2c1.7 3.4 4.1 5.8 7.5 7.5l2-2L21 17.5v3A2.5 2.5 0 0118.5 23C9.4 22.4 1.6 14.6 1 5.5A2.5 2.5 0 013.5 3h3z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </Icon>
                  <div>
                    <div className="text-xs font-semibold text-slate-500">PHONE</div>
                    <div className="text-slate-700">{user.phone ?? "—"}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Icon>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M14 3h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path
                        d="M21 14v6a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1h6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </Icon>
                  <div>
                    <div className="text-xs font-semibold text-slate-500">SOCIAL</div>
                    <a className="text-violet-700 hover:underline" href="#">
                      linkedin.com/in/{initials(user.name).toLowerCase()}
                    </a>
                  </div>
                </div>
              </div>

              <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3v12m0 0l4-4m-4 4l-4-4M4 21h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Download Resume
              </button>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">Application History</h2>

              <div className="relative mt-4">
                <div className="absolute left-2 top-1 bottom-6 w-px bg-slate-200" />

                <div className="space-y-6">
                  <div className="relative pl-8">
                    <span className="absolute left-0 top-0.5 h-4 w-4 rounded-full bg-violet-600 ring-2 ring-white" />
                    <div className="text-sm font-semibold text-slate-900">Application Received</div>
                    <div className="text-xs text-slate-500">Oct 24, 2023 • 10:30 AM</div>
                    <div className="mt-2 inline-flex items-center rounded-lg bg-slate-50 px-2 py-1 text-xs text-slate-600 ring-1 ring-inset ring-slate-200">
                      Applied via LinkedIn
                    </div>
                  </div>

                  <div className="relative pl-8">
                    <span className="absolute left-0 top-0.5 h-4 w-4 rounded-full bg-violet-600 ring-2 ring-white" />
                    <div className="text-sm font-semibold text-slate-900">Screening Call</div>
                    <div className="text-xs text-slate-500">Oct 26, 2023 • 2:00 PM</div>
                    <div className="mt-2 inline-flex items-center gap-2 rounded-lg bg-slate-50 px-2 py-1 text-xs text-slate-600 ring-1 ring-inset ring-slate-200">
                      <span className="inline-flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-[10px] font-semibold text-slate-600">
                        SJ
                      </span>
                      Passed by Sarah Jenkins
                    </div>
                  </div>

                  <div className="relative pl-8">
                    <span className="absolute left-0 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white ring-2 ring-violet-300">
                      <span className="h-2 w-2 rounded-full bg-violet-600" />
                    </span>
                    <div className="text-sm font-semibold text-violet-700">Technical Interview</div>
                    <div className="text-xs text-slate-500">Current Stage</div>
                    <div className="mt-3 inline-flex w-full items-center gap-2 rounded-xl bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-700 ring-1 ring-inset ring-violet-200">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M7 3v2M17 3v2M4 8h16M6 6h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      Scheduled: Nov 2, 2:00 PM
                    </div>
                  </div>

                  <div className="relative pl-8 opacity-45">
                    <span className="absolute left-0 top-0.5 h-4 w-4 rounded-full border-2 border-slate-300 bg-white ring-2 ring-white" />
                    <div className="text-sm font-semibold text-slate-900">Offer</div>
                    <div className="text-xs text-slate-500">Pending next steps</div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-6 border-b border-slate-200">
              <button className="border-b-2 border-violet-600 pb-3 text-sm font-semibold text-violet-700">
                Overview
              </button>
              <button className="pb-3 text-sm font-semibold text-slate-500 hover:text-slate-700">
                Resume
              </button>
            </div>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-slate-900">{challenge.title}</h3>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ring-inset",
                        statusBadgeClass(challenge.status)
                      )}
                    >
                      {challenge.status}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-500">{challenge.summary}</p>

                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="font-semibold text-violet-700">View Submission</span>
                    <span className="text-slate-300">|</span>
                    <span>Submitted: {challenge.submittedAtLabel}</span>
                  </div>
                </div>

                <div className="w-[220px] shrink-0">
                  <div className="text-right text-[10px] font-semibold tracking-widest text-slate-400">
                    GRADE
                  </div>
                  <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="text-xs text-slate-500">
                      {challenge.status === "APPROVED" ? "Completed" : "Pending"}
                    </div>
                    <div className="mt-3 h-16 rounded-lg bg-white ring-1 ring-slate-200" />
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">Interview Feedback</h3>
                <div className="text-sm text-slate-600">
                  Average Score: <span className="font-semibold text-slate-900">{feedback.avgScore}</span>{" "}
                  <span className="ml-1">⭐</span>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                {feedback.items.map((f, idx) => (
                  <div key={`${f.reviewerName}-${idx}`} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                          {initials(f.reviewerName)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{f.reviewerName}</div>
                          <div className="text-xs text-slate-500">{f.reviewerTitle}</div>
                        </div>
                      </div>

                      <div
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ring-inset",
                          scoreBadgeClass(f.score)
                        )}
                      >
                        {f.score} ⭐
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-slate-600">{f.text}</p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {f.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-slate-50 px-2 py-0.5 text-xs text-slate-600 ring-1 ring-inset ring-slate-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
