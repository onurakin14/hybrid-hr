"use client";

import { useParams, useRouter } from "next/navigation";

interface Candidate {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  initials?: string;
  appliedDate: string;
  stage: "Applied" | "Screening" | "Interviewing" | "Offer";
  rating: number;
}

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();

  const candidates: Candidate[] = [
    {
      id: 1,
      name: "Sarah Jenkins",
      email: "sarah.j@example.com",
      avatar: "https://i.pravatar.cc/150?img=1",
      appliedDate: "Oct 24, 2023",
      stage: "Interviewing",
      rating: 4,
    },
    {
      id: 2,
      name: "Michael Kim",
      email: "m.kim@design.co",
      initials: "MK",
      appliedDate: "Oct 22, 2023",
      stage: "Screening",
      rating: 3,
    },
    {
      id: 3,
      name: "Emily Chen",
      email: "chen.emily@uxmail.com",
      avatar: "https://i.pravatar.cc/150?img=5",
      appliedDate: "Oct 21, 2023",
      stage: "Applied",
      rating: 0,
    },
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Interviewing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "Screening":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "Applied":
        return "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300";
      case "Offer":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5 text-yellow-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`material-symbols-outlined text-[18px] ${
              star <= rating ? "filled" : "text-slate-300 dark:text-slate-600"
            }`}
          >
            star
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#f6f6f8]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-slate-500 mb-6">
          <button
            onClick={() => router.push("/admin/recruitment")}
            className="hover:text-[#4f46e5] transition-colors flex items-center gap-1 font-medium"
          >
            <span className="material-symbols-outlined text-[18px]">
              arrow_back
            </span>
            Jobs List
          </button>
          <span className="mx-2">/</span>
          <span className="text-slate-800 font-medium">
            Senior Product Designer
          </span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                Senior Product Designer
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Open
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-slate-400">
                  domain
                </span>
                Product Department
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-slate-400">
                  location_on
                </span>
                San Francisco, CA (Hybrid)
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-slate-400">
                  schedule
                </span>
                Full-time
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-slate-400">
                  payments
                </span>
                $140k - $180k
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 self-start shrink-0">
            <button className="h-10 px-4 rounded-xl border border-gray-200 bg-white text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">
                edit
              </span>
              Edit
            </button>
            <button className="h-10 px-4 rounded-xl bg-[#4f46e5] hover:bg-[#4338ca] text-white font-medium text-sm shadow-md shadow-indigo-200 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">
                share
              </span>
              Share Posting
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-[#4f46e5]">
                  description
                </span>
                Job Description
              </h2>
              <div className="text-slate-600 text-[15px] leading-relaxed space-y-4">
                <p>
                  We are seeking a talented and experienced Senior Product
                  Designer to join our growing Product team. In this role, you
                  will be responsible for defining the user experience for our
                  core enterprise platform, working closely with product
                  managers, engineers, and researchers to build intuitive and
                  impactful solutions.
                </p>
                <h3 className="text-[15px] font-bold text-slate-900 mt-6 mb-3">
                  Key Responsibilities
                </h3>
                <ul className="list-disc pl-5 space-y-2 marker:text-[#4f46e5]">
                  <li>
                    Lead design projects across the entire product lifecycle and
                    multiple product launches.
                  </li>
                  <li>
                    Partner closely with engineering and product management to
                    find elegant but practical solutions to design challenges.
                  </li>
                  <li>
                    Create wireframes, storyboards, user flows, process flows,
                    and site maps to communicate interaction and design ideas
                    effectively.
                  </li>
                  <li>
                    Conduct user research and evaluate user feedback to enhance
                    the usability of the product.
                  </li>
                </ul>
                <h3 className="text-[15px] font-bold text-slate-900 mt-6 mb-3">
                  Requirements
                </h3>
                <ul className="list-disc pl-5 space-y-2 marker:text-[#4f46e5]">
                  <li>
                    5+ years of experience in product design, UI/UX, or related
                    field.
                  </li>
                  <li>
                    A strong portfolio demonstrating your ability to solve
                    complex problems with simple, elegant design.
                  </li>
                  <li>Proficiency in Figma, Sketch, or Adobe XD.</li>
                  <li>
                    Experience with design systems and maintaining consistency
                    across a platform.
                  </li>
                </ul>
              </div>
            </section>

            {/* Candidates Table */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4f46e5]">
                    group
                  </span>
                  Candidates
                </h2>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <span className="material-symbols-outlined text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 text-[18px]">
                      search
                    </span>
                    <input
                      className="pl-10 pr-4 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4f46e5]/20 focus:border-[#4f46e5] outline-none w-full sm:w-64"
                      placeholder="Search..."
                      type="text"
                    />
                  </div>
                  <button className="p-2 rounded-lg border border-gray-200 hover:bg-slate-50 text-slate-500 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">
                      filter_list
                    </span>
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3.5 font-semibold text-left">
                        Name
                      </th>
                      <th className="px-6 py-3.5 font-semibold text-left">
                        Applied Date
                      </th>
                      <th className="px-6 py-3.5 font-semibold text-left">
                        Stage
                      </th>
                      <th className="px-6 py-3.5 font-semibold text-left">
                        Rating
                      </th>
                      <th className="px-6 py-3.5 font-semibold text-right w-12"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {candidates.map((candidate) => (
                      <tr
                        key={candidate.id}
                        className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {candidate.avatar ? (
                              <img
                                alt={candidate.name}
                                className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                                src={candidate.avatar}
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold ring-2 ring-white shadow-sm">
                                {candidate.initials}
                              </div>
                            )}
                            <div>
                              <div className="font-medium text-slate-900 text-[15px]">
                                {candidate.name}
                              </div>
                              <div className="text-xs text-slate-500">
                                {candidate.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600 text-[14px]">
                          {candidate.appliedDate}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStageColor(
                              candidate.stage,
                            )}`}
                          >
                            {candidate.stage}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {candidate.rating > 0 ? (
                            renderStars(candidate.rating)
                          ) : (
                            <span className="text-xs text-slate-400 italic">
                              Not rated
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-slate-400 hover:text-[#4f46e5] p-1 rounded transition-colors opacity-0 group-hover:opacity-100">
                            <span className="material-symbols-outlined text-[20px]">
                              chevron_right
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 flex justify-center bg-slate-50/30">
                <button className="text-sm font-semibold text-[#4f46e5] hover:text-[#4338ca] transition-colors flex items-center gap-1 py-1.5">
                  View all candidates
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </button>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Hiring Pipeline */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-bold text-slate-900 mb-5">
                Hiring Pipeline
              </h3>
              <div className="space-y-5">
                {[
                  { label: "Applied", count: 24, color: "#4f46e5", width: 100 },
                  { label: "Screening", count: 8, color: "#f59e0b", width: 33 },
                  { label: "Interview", count: 3, color: "#3b82f6", width: 12 },
                  { label: "Offer", count: 0, color: "#10b981", width: 0 },
                ].map((item) => (
                  <div key={item.label} className="group">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-600 font-medium group-hover:text-[#4f46e5] transition-colors">
                        {item.label}
                      </span>
                      <span className="font-bold text-slate-900">
                        {item.count}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${item.width}%`,
                          backgroundColor: item.color,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hiring Team */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-bold text-slate-900 mb-4">
                Hiring Team
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex -space-x-3">
                  <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center text-sm font-bold text-white shadow-md"></div>
                  <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-sm font-bold text-white shadow-md"></div>
                  <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-600 shadow-sm">
                    +2
                  </div>
                </div>
              </div>
              <div className="text-sm text-slate-600">
                Managed by{" "}
                <a
                  className="text-[#4f46e5] hover:underline font-semibold"
                  href="#"
                >
                  Alex Morgan
                </a>
              </div>
              <button className="mt-4 w-full py-2.5 text-sm font-semibold text-slate-700 border border-gray-200 rounded-xl hover:bg-slate-50 transition-colors">
                Manage Team
              </button>
            </div>

            {/* Internal Documents */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-bold text-slate-900 mb-4">
                Internal Documents
              </h3>
              <ul className="space-y-2">
                {[
                  {
                    name: "Hiring_Guidelines.pdf",
                    size: "2.4 MB",
                    type: "PDF",
                    color: "blue",
                    icon: "description",
                  },
                  {
                    name: "Interview_Script_v2.docx",
                    size: "145 KB",
                    type: "DOCX",
                    color: "indigo",
                    icon: "article",
                  },
                ].map((doc, index) => (
                  <li key={index}>
                    <a
                      className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl group transition-colors"
                      href="#"
                    >
                      <div
                        className={`h-10 w-10 rounded-lg bg-${doc.color}-50 text-${doc.color}-600 flex items-center justify-center shrink-0`}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {doc.icon}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {doc.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {doc.size} • {doc.type}
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-slate-400 group-hover:text-[#4f46e5] text-[20px] transition-colors">
                        download
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
