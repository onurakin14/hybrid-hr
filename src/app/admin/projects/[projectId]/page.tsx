import Link from "next/link";
import { apiGet } from "@/lib/api";
import type { Comment, Post, Todo, User } from "@/types/jsonplaceholder";
import Tasks from "@/components/projects-detail/Tasks";
import Team from "@/components/projects-detail/Team";
import Candidates from "@/components/projects-detail/Candidates";
import OverviewTab from "@/components/projects-detail/Overview";

export const dynamic = "force-dynamic";

type Tab = "overview" | "tasks" | "team" | "candidates";

function clampId(n: number) {
  if (Number.isNaN(n) || n < 1) return 1;
  if (n > 100) return 100;
  return n;
}

function titleCase(s: string) {
  return s
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export default async function ProjectDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ projectId: string }>;
  searchParams?: Promise<{ tab?: string }>;
}) {
  const { projectId } = await params;
  const id = clampId(Number(projectId));

  const sp = (await searchParams) ?? {};
  const activeTab: Tab = (sp.tab as Tab) ?? "overview";

  // Overview datası
  const post = await apiGet<Post>(`/posts/${id}`);

  const leadUserId = ((post.userId - 1) % 10) + 1;
  const lead = await apiGet<User>(`/users/${leadUserId}`);

  const comments = await apiGet<Comment[]>(`/comments?postId=${id}`);
  const recent = comments.slice(0, 3);

  // Tasks datası
  const todos = await apiGet<Todo[]>(`/todos?userId=${leadUserId}`);
  const pending = todos.filter((t) => !t.completed).slice(0, 2);
  const tasks = todos.slice(0, 12);

  // ✅ Ortak users 
  const users = await apiGet<User[]>(`/users`);

  // ✅ Team tab 
  const teamUsers = users.slice(0, 8);

  // ✅ Candidates tab 
  const candidateUsers = users;

  const progress = 50 + (id % 50);

  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto bg-slate-50">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-8 lg:px-10 xl:px-20 space-y-6">
        {/* Breadcrumb + Header */}
        <div className="space-y-2">
          <div className="text-sm text-slate-500">
            <Link href="/admin/projects" className="hover:text-slate-700">
              Projects
            </Link>{" "}
            <span className="mx-2">›</span>
            <span>Website Redesign</span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="max-w-[52rem] whitespace-normal break-words text-3xl font-semibold text-slate-900">
                  {titleCase(post.title)}
                </h1>
                <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
                  Active
                </span>
              </div>

              <p className="max-w-2xl text-sm text-slate-600">
                Manage project details, team members, and the hiring pipeline for the upcoming
                launch.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button className="h-10 w-10 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
                ⋯
              </button>
              <button className="h-10 rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-700">
                Edit Project
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200">
          <div className="flex gap-6">
            <Link
              href={`/admin/projects/${id}?tab=overview`}
              className={`relative py-3 text-sm font-medium ${activeTab === "overview"
                  ? "text-indigo-600"
                  : "text-slate-600 hover:text-slate-900"
                }`}
            >
              Overview
              {activeTab === "overview" && (
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-indigo-600" />
              )}
            </Link>

            <Link
              href={`/admin/projects/${id}?tab=tasks`}
              className={`relative py-3 text-sm font-medium ${activeTab === "tasks"
                  ? "text-indigo-600"
                  : "text-slate-600 hover:text-slate-900"
                }`}
            >
              <span className="flex items-center gap-2">
                Tasks
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                  {todos.length}
                </span>
              </span>
              {activeTab === "tasks" && (
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-indigo-600" />
              )}
            </Link>

            <Link
              href={`/admin/projects/${id}?tab=team`}
              className={`relative py-3 text-sm font-medium ${activeTab === "team"
                  ? "text-indigo-600"
                  : "text-slate-600 hover:text-slate-900"
                }`}
            >
              Team
              {activeTab === "team" && (
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-indigo-600" />
              )}
            </Link>

            <Link
              href={`/admin/projects/${id}?tab=candidates`}
              className={`relative py-3 text-sm font-medium ${activeTab === "candidates"
                  ? "text-indigo-600"
                  : "text-slate-600 hover:text-slate-900"
                }`}
            >
              Candidates
              {activeTab === "candidates" && (
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-indigo-600" />
              )}
            </Link>


          </div>
        </div>

        {/* CONTENT */}
        {activeTab === "tasks" ? (
          <Tasks leadUserId={leadUserId} tasks={tasks} users={users} />
        ) : activeTab === "team" ? (
          <Team users={teamUsers} />
        ) : activeTab === "candidates" ? (
          <Candidates users={candidateUsers} />

        ) : (
          <OverviewTab
            post={post}
            lead={lead}
            recent={recent}
            pending={pending}
            progress={progress}
            teamUsers={teamUsers}
            candidateUsers={candidateUsers}
          />
        )}
      </div>
    </div>
  );
}
