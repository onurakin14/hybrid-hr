"use client";

import React from "react";
import Link from "next/link";

interface Project {
  id: number;
  name: string;
  slug: string;
  company: string;
  status: "Active" | "On Hold" | "At Risk" | "Completed";
  team: string[];
  teamCount?: number;
  timeline: string;
  progress: number;
}

function Projects() {
  const projects: Project[] = [
    {
      id: 1,
      name: "Website Redesign",
      slug: "website-redesign",
      company: "Acme Corp",
      status: "Active",
      team: ["1", "2"],
      teamCount: 3,
      timeline: "Oct 24, 2023",
      progress: 75,
    },
    {
      id: 2,
      name: "Mobile App Development",
      slug: "mobile-app-development",
      company: "Globex Inc.",
      status: "On Hold",
      team: ["1", "2"],
      timeline: "Nov 12, 2023",
      progress: 32,
    },
    {
      id: 3,
      name: "Internal Audit",
      slug: "internal-audit",
      company: "Finance Dept",
      status: "At Risk",
      team: ["1"],
      timeline: "Dec 01, 2023",
      progress: 45,
    },
    {
      id: 4,
      name: "Marketing Campaign",
      slug: "marketing-campaign",
      company: "Stark Industries",
      status: "Completed",
      team: ["1", "2", "3"],
      timeline: "Sep 15, 2023",
      progress: 100,
    },
    {
      id: 5,
      name: "Dashboard Analytics",
      slug: "dashboard-analytics",
      company: "Nexus Internal",
      status: "Active",
      team: ["1"],
      teamCount: 5,
      timeline: "Dec 22, 2023",
      progress: 15,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      case "On Hold":
        return "bg-amber-100 text-amber-700 border border-amber-200";
      case "At Risk":
        return "bg-rose-100 text-rose-700 border border-rose-200";
      case "Completed":
        return "bg-gray-100 text-gray-700 border border-gray-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-500";
      case "On Hold":
        return "bg-amber-500";
      case "At Risk":
        return "bg-rose-500";
      case "Completed":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getProgressColor = (progress: number, status: string) => {
    if (status === "Completed") return "bg-gray-500";
    if (status === "At Risk") return "bg-rose-500";
    if (status === "On Hold") return "bg-amber-500";
    return "bg-[#4913ec]";
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="container mx-auto max-w-7xl p-6 lg:p-10 flex flex-col gap-6">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap gap-2">
          <a className="text-[#6b6189] text-sm font-medium hover:text-[#4913ec] transition-colors cursor-pointer">
            Home
          </a>
          <span className="text-[#6b6189] text-sm font-medium">/</span>
          <span className="text-[#131118] text-sm font-medium">Projects</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between gap-4 md:items-end">
          <div className="flex flex-col gap-2">
            <h2 className="text-[#131118] text-3xl font-bold tracking-tight">
              Projects
            </h2>
            <p className="text-[#6b6189] text-base font-normal max-w-2xl">
              Manage and track all ongoing initiatives across the organization.
              Monitor progress, budgets, and team assignments.
            </p>
          </div>
          <button className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg h-10 px-5 bg-[#4913ec] hover:bg-[#3c0dbf] text-white text-sm font-bold shadow-sm shadow-indigo-200 transition-all">
            <span className="text-xl leading-none">+</span>
            <span>Create Project</span>
          </button>
        </div>

        {/* Filters & Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
          {/* Search */}
          <div className="w-full md:w-96">
            <label className="flex w-full items-center rounded-lg bg-[#f6f6f8] px-3 h-10 border border-transparent focus-within:border-[#4913ec]/50 focus-within:ring-2 focus-within:ring-[#4913ec]/10 transition-all">
              <svg
                className="w-5 h-5 text-[#6b6189] flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                className="w-full bg-transparent border-none focus:ring-0 text-sm text-[#131118] placeholder-[#6b6189] ml-2 outline-none"
                placeholder="Search projects..."
                type="text"
              />
            </label>
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto scrollbar-hide pb-2 md:pb-0">
            <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 hover:bg-gray-200 px-3 transition-colors">
              <span className="text-[#131118] text-xs font-semibold whitespace-nowrap">
                All Status
              </span>
              <svg
                className="w-[18px] h-[18px] text-[#6b6189]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <button className="flex h-8 shrink-0 items-center justify-center rounded-lg bg-white border border-gray-200 hover:bg-gray-50 px-3 transition-colors">
              <span className="text-[#6b6189] text-xs font-medium whitespace-nowrap">
                Active
              </span>
            </button>
            <button className="flex h-8 shrink-0 items-center justify-center rounded-lg bg-white border border-gray-200 hover:bg-gray-50 px-3 transition-colors">
              <span className="text-[#6b6189] text-xs font-medium whitespace-nowrap">
                On Hold
              </span>
            </button>
            <button className="flex h-8 shrink-0 items-center justify-center rounded-lg bg-white border border-gray-200 hover:bg-gray-50 px-3 transition-colors">
              <span className="text-[#6b6189] text-xs font-medium whitespace-nowrap">
                Completed
              </span>
            </button>
          </div>
        </div>

        {/* Projects Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wide text-[#6b6189]">
                    Project Name
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wide text-[#6b6189]">
                    Status
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wide text-[#6b6189]">
                    Team
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wide text-[#6b6189]">
                    Timeline
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wide text-[#6b6189] w-1/6">
                    Progress
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wide text-[#6b6189] text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    className="group hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
  <Link
    href={`/admin/projects/${project.id}`}
    className="flex flex-col cursor-pointer"
  >
    <span className="text-[#131118] font-semibold text-sm group-hover:text-[#4913ec]">
      {project.name}
    </span>
    <span className="text-[#6b6189] text-xs">
      {project.company}
    </span>
  </Link>
</td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          project.status
                        )}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor(
                            project.status
                          )}`}
                        ></span>
                        {project.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex -space-x-2 overflow-hidden">
                        {project.team.map((member, idx) => (
                          <img
                            key={idx}
                            alt="Team member avatar"
                            className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                            src={`https://i.pravatar.cc/150?img=${idx + 1}`}
                          />
                        ))}
                        {project.teamCount &&
                          project.teamCount > project.team.length && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-white bg-gray-100 text-[10px] font-medium text-gray-600">
                              +{project.teamCount - project.team.length}
                            </div>
                          )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-sm text-[#131118]">
                        <svg
                          className="w-[18px] h-[18px] text-[#6b6189]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>{project.timeline}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(
                              project.progress,
                              project.status
                            )}`}
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-[#6b6189] w-10">
                          {project.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-[#6b6189] hover:text-[#4913ec] p-1 rounded-md hover:bg-gray-100 transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4 bg-gray-50/50">
            <p className="text-xs text-[#6b6189]">
              Showing <span className="font-medium text-[#131118]">1</span> to{" "}
              <span className="font-medium text-[#131118]">5</span> of{" "}
              <span className="font-medium text-[#131118]">24</span> results
            </p>
            <div className="flex gap-2">
              <button className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-[#131118] shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#4913ec]/20">
                Previous
              </button>
              <button className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-[#131118] shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#4913ec]/20">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
