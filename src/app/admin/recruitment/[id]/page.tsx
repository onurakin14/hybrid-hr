"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface JobDescription {
  title: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [jobDescription, setJobDescription] = useState<JobDescription | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Candidates verilerini çek
        const commentsResponse = await fetch(
          "https://jsonplaceholder.typicode.com/comments",
        );
        const comments: Comment[] = await commentsResponse.json();

        // Job Description verilerini çek
        const postsResponse = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
        );
        const posts: Post[] = await postsResponse.json();

        // İlk post'u al ve job description'a dönüştür
        const firstPost = posts[0];
        const sentences = firstPost.body.split("\n").filter((s) => s.trim());

        setJobDescription({
          title: firstPost.title,
          description: sentences.slice(0, 2).join(" "),
          responsibilities: sentences
            .slice(2, 6)
            .map((s, i) => s.trim() || `Responsibility ${i + 1}`),
          requirements: sentences
            .slice(6, 10)
            .map((s, i) => s.trim() || `Requirement ${i + 1}`),
        });

        // İlk 10 yorumu adaylara dönüştür
        const formattedCandidates: Candidate[] = comments
          .slice(0, 10)
          .map((comment, index) => {
            const stages: Array<
              "Applied" | "Screening" | "Interviewing" | "Offer"
            > = ["Applied", "Screening", "Interviewing", "Offer"];
            const randomStage =
              stages[Math.floor(Math.random() * stages.length)];
            const randomRating = Math.floor(Math.random() * 6);

            const nameParts = comment.name.split(" ");
            const initials =
              nameParts.length > 1
                ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
                : comment.name.substring(0, 2).toUpperCase();

            const randomDays = Math.floor(Math.random() * 30);
            const date = new Date();
            date.setDate(date.getDate() - randomDays);
            const appliedDate = date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return {
              id: comment.id,
              name: comment.name,
              email: comment.email,
              initials: initials,
              appliedDate: appliedDate,
              stage: randomStage,
              rating: randomRating,
            };
          });

        setCandidates(formattedCandidates);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Interviewing":
        return "bg-blue-100 text-blue-800";
      case "Screening":
        return "bg-amber-100 text-amber-800";
      case "Applied":
        return "bg-slate-100 text-slate-800";
      case "Offer":
        return "bg-green-100 text-green-800";
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
            className={`material-symbols-outlined text-[16px] ${
              star <= rating ? "filled" : "text-slate-300"
            }`}
          >
            star
          </span>
        ))}
      </div>
    );
  };

  const pipelineStats = {
    applied: candidates.filter((c) => c.stage === "Applied").length,
    screening: candidates.filter((c) => c.stage === "Screening").length,
    interviewing: candidates.filter((c) => c.stage === "Interviewing").length,
    offer: candidates.filter((c) => c.stage === "Offer").length,
  };

  const totalCandidates = candidates.length || 1;

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
            {jobDescription?.title || "Senior Product Designer"}
          </span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                {jobDescription?.title || "Senior Product Designer"}
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
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4f46e5]"></div>
                </div>
              ) : jobDescription ? (
                <div className="text-slate-600 text-[15px] leading-relaxed space-y-4">
                  <p>{jobDescription.description}</p>
                  <h3 className="text-[15px] font-bold text-slate-900 mt-6 mb-3">
                    Key Responsibilities
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 marker:text-[#4f46e5]">
                    {jobDescription.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <h3 className="text-[15px] font-bold text-slate-900 mt-6 mb-3">
                    Requirements
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 marker:text-[#4f46e5]">
                    {jobDescription.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-slate-500">No job description available.</p>
              )}
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
                      className="pl-10 pr-4 py-2 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4f46e5]/20 focus:border-[#4f46e5] outline-none w-full sm:w-64 text-slate-900"
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
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4f46e5]"></div>
                  </div>
                ) : (
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
                              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold ring-2 ring-white shadow-sm">
                                {candidate.initials}
                              </div>
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
                )}
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
                  {
                    label: "Applied",
                    count: pipelineStats.applied,
                    color: "#4f46e5",
                    width: (pipelineStats.applied / totalCandidates) * 100,
                  },
                  {
                    label: "Screening",
                    count: pipelineStats.screening,
                    color: "#f59e0b",
                    width: (pipelineStats.screening / totalCandidates) * 100,
                  },
                  {
                    label: "Interview",
                    count: pipelineStats.interviewing,
                    color: "#3b82f6",
                    width: (pipelineStats.interviewing / totalCandidates) * 100,
                  },
                  {
                    label: "Offer",
                    count: pipelineStats.offer,
                    color: "#10b981",
                    width: (pipelineStats.offer / totalCandidates) * 100,
                  },
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
              <h3 className="text-sm font-semibold text-slate-900 mb-4">
                Hiring Team
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex -space-x-2 overflow-hidden">
                  <img
                    alt=""
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                  />
                  <img
                    alt=""
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                  />
                  <div className="inline-flex h-10 w-10 rounded-full ring-2 ring-white bg-slate-100 items-center justify-center text-xs font-semibold text-slate-600">
                    +2
                  </div>
                </div>
              </div>
              <div className="text-sm text-slate-500">
                Managed by{" "}
                <a
                  className="text-[#4f46e5] hover:underline font-medium"
                  href="#"
                >
                  Alex Morgan
                </a>
              </div>
              <button className="mt-4 w-full py-2 text-sm font-medium text-slate-700 border border-gray-200 rounded-lg hover:bg-slate-50 transition-colors">
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
                        className={`h-10 w-10 rounded-lg ${
                          doc.color === "blue"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-indigo-50 text-indigo-600"
                        } flex items-center justify-center shrink-0`}
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
