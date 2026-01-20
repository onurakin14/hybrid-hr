'use client';

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { logout } from "../../lib/features/users/usersSlice";

function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector((state) => state.user.user);

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isUserProfileOpen, setUserProfileOpen] = useState(false);
    const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

    const handleLogout = () => {
        dispatch(logout());
        router.push('/login');
    };

    const isActive = (href: string): boolean => {
        return pathname.includes(href);
    };

    return (
        <React.Fragment>
            <div className="bg-background-light text-slate-900 font-display overflow-hidden">
                <div className="flex h-screen w-full relative">
                    {/* <!-- Sidebar Navigation --> */}
                    <aside className={`${isSidebarOpen ? 'flex' : 'hidden'} md:flex fixed md:relative flex-col bg-[var(--background)] border-r border-light h-full shrink-0 z-20 transition-all duration-300 w-72`}>
                        {/* <!-- Logo Section --> */}
                        <div className="h-16 flex items-center justify-between px-6 border-b border-transparent">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-white shrink-0">
                                    <span className="material-symbols-outlined text-[20px]">grid_view</span>
                                </div>
                                <h1 className="text-lg font-bold tracking-tight text-slate-900 truncate">Enterprise App</h1>
                            </div>
                            <button
                                onClick={() => setSidebarOpen(false)} title="Close sidebar"
                                className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors shrink-0">
                                <span className="material-symbols-outlined text-[28px]">close</span>
                            </button>
                        </div>
                        {/* <!-- Navigation Links --> */}
                        <div className="flex flex-col gap-1 px-4 py-6 overflow-y-auto grow">
                            {/* <!-- Dashboard --> */}
                            <div>
                                <div className={`flex items-center gap-0 rounded-xl transition-colors group ${isActive('dashboard') ? 'bg-primary-light' : 'nav-inactive'}`}>
                                    <button onClick={() => router.push('/admin/dashboard')} className={`flex-1 flex items-center gap-3 px-3 py-3 rounded-l-xl transition-colors ${isActive('dashboard') ? 'text-primary' : 'text-slate-500'}`} title="Dashboard">
                                        <span className="material-symbols-outlined fill-1 group-hover:text-primary transition-colors">dashboard</span>
                                        <span className="text-sm font-medium">Dashboard</span>
                                    </button>
                                    {isSidebarOpen && (
                                        <button onClick={() => setExpandedMenu(expandedMenu === 'dashboard' ? null : 'dashboard')} className={`px-2 py-3 -ml-3 rounded-r-xl transition-colors`} title="Expand menu">
                                            <span className="material-symbols-outlined text-[18px] transition-transform opacity-60" style={{ transform: expandedMenu === 'dashboard' ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                                        </button>
                                    )}
                                </div>
                                {isSidebarOpen && expandedMenu === 'dashboard' && (
                                    <div className="flex flex-col gap-1 mt-1 ml-2 border-l border-primary/30 pl-2">
                                        <button onClick={() => router.push('/admin/dashboard/overview')} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('overview') ? 'text-primary' : 'text-slate-500 hover:text-primary hover:bg-primary-light-hover'}`}>
                                            <span className="material-symbols-outlined text-[16px]">overview</span>
                                            Overview
                                        </button>
                                    </div>
                                )}
                            </div>
                            {/* <!-- Team Members --> */}
                            <div>
                                <div className={`flex items-center gap-0 rounded-xl transition-colors group ${isActive('teamMembers') ? 'bg-primary-light' : 'nav-inactive'}`}>
                                    <button onClick={() => router.push('/admin/teamMembers')} className={`flex-1 flex items-center gap-3 px-3 py-3 rounded-l-xl transition-colors ${isActive('teamMembers') ? 'text-primary' : 'text-slate-500'}`} title="teamMembers">
                                        <span className="material-symbols-outlined fill-1 group-hover:text-primary transition-colors">group</span>
                                        <span className="text-sm font-medium">Team Members</span>
                                    </button>
                                    {isSidebarOpen && (
                                        <button onClick={() => setExpandedMenu(expandedMenu === 'teamMembers' ? null : 'teamMembers')} className={`px-2 py-3 -ml-3 rounded-r-xl transition-colors`} title="Expand menu">
                                            <span className="material-symbols-outlined text-[18px] transition-transform opacity-60" style={{ transform: expandedMenu === 'teamMembers' ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                            {/* <!-- Projects --> */}
                            <div>
                                <div className={`flex items-center gap-0 rounded-xl transition-colors group ${isActive('projects') ? 'bg-primary-light' : 'nav-inactive'}`}>
                                    <button onClick={() => router.push('/admin/projects')} className={`flex-1 flex items-center gap-3 px-3 py-3 rounded-l-xl transition-colors ${isActive('projects') ? 'text-primary' : 'text-slate-500'}`} title="Projects">
                                        <span className="material-symbols-outlined group-hover:text-primary transition-colors">folder_open</span>
                                        <span className="text-sm font-medium">Projects</span>
                                    </button>
                                    {isSidebarOpen && (
                                        <button onClick={() => setExpandedMenu(expandedMenu === 'projects' ? null : 'projects')} className={`px-2 py-3 -ml-3 rounded-r-xl transition-colors`} title="Expand menu">
                                            <span className="material-symbols-outlined text-[18px] transition-transform opacity-60" style={{ transform: expandedMenu === 'projects' ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                                        </button>
                                    )}
                                </div>
                                {isSidebarOpen && expandedMenu === 'projects' && (
                                    <div className="flex flex-col gap-1 mt-1 ml-2 border-l border-primary/30 pl-2">
                                        <button onClick={() => router.push('/admin/projects')} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('projects') ? 'text-primary' : 'text-slate-500 hover:text-primary hover:bg-primary-light-hover'}`}>
                                            <span className="material-symbols-outlined text-[16px]">list</span>
                                            All Projects
                                        </button>
                                        <button onClick={() => router.push('/admin/projects')} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('projects') ? 'text-primary' : 'text-slate-500 hover:text-primary hover:bg-primary-light-hover'}`}>
                                            <span className="material-symbols-outlined text-[16px]">add</span>
                                            New Project
                                        </button>
                                        <button onClick={() => router.push('/admin/projects')} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('projects') ? 'text-primary' : 'text-slate-500 hover:text-primary hover:bg-primary-light-hover'}`}>
                                            <span className="material-symbols-outlined text-[16px]">archive</span>
                                            Archived
                                        </button>
                                    </div>
                                )}
                            </div>
                            {/* <!-- Tasks --> */}
                            <div>
                                <div className={`flex items-center gap-0 rounded-xl transition-colors group ${isActive('tasks') ? 'bg-primary-light' : 'nav-inactive'}`}>
                                    <button onClick={() => router.push('/admin/tasks')} className={`flex-1 flex items-center gap-3 px-3 py-3 rounded-l-xl transition-colors ${isActive('tasks') ? 'text-primary' : 'text-slate-500'}`} title="Tasks">
                                        <span className="material-symbols-outlined group-hover:text-primary transition-colors">check_box</span>
                                        <span className="text-sm font-medium">Tasks</span>
                                    </button>
                                    {isSidebarOpen && (
                                        <button onClick={() => setExpandedMenu(expandedMenu === 'tasks' ? null : 'tasks')} className={`px-2 py-3 -ml-3 rounded-r-xl transition-colors`} title="Expand menu">
                                            <span className="material-symbols-outlined text-[18px] transition-transform opacity-60" style={{ transform: expandedMenu === 'tasks' ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                                        </button>
                                    )}
                                </div>
                                {isSidebarOpen && expandedMenu === 'tasks' && (
                                    <div className="flex flex-col gap-1 mt-1 ml-2 border-l border-primary/30 pl-2">
                                        <button onClick={() => router.push('/admin/tasks')} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('tasks') ? 'text-primary' : 'text-slate-500 hover:text-primary hover:bg-primary-light-hover'}`}>
                                            <span className="material-symbols-outlined text-[16px]">list</span>
                                            All Tasks
                                        </button>
                                        <button onClick={() => router.push('/admin/tasks')} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('tasks') ? 'text-primary' : 'text-slate-500 hover:text-primary hover:bg-primary-light-hover'}`}>
                                            <span className="material-symbols-outlined text-[16px]">done</span>
                                            Completed
                                        </button>
                                        <button onClick={() => router.push('/admin/tasks')} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('tasks') ? 'text-primary' : 'text-slate-500 hover:text-primary hover:bg-primary-light-hover'}`}>
                                            <span className="material-symbols-outlined text-[16px]">schedule</span>
                                            Pending
                                        </button>
                                    </div>
                                )}
                            </div>
                            {/* <!-- Users --> */}
                            <div>
                                <div className={`flex items-center gap-0 rounded-xl transition-colors group ${isActive('users') ? 'bg-primary-light' : 'nav-inactive'}`}>
                                    <button onClick={() => router.push('/admin/users')} className={`flex-1 flex items-center gap-3 px-3 py-3 rounded-l-xl transition-colors ${isActive('users') ? 'text-primary' : 'text-slate-500'}`} title="Users">
                                        <span className="material-symbols-outlined group-hover:text-primary transition-colors">group</span>
                                        <span className="text-sm font-medium">Users</span>
                                    </button>
                                    {isSidebarOpen && (
                                        <button onClick={() => setExpandedMenu(expandedMenu === 'users' ? null : 'users')} className={`px-2 py-3 -ml-3 rounded-r-xl transition-colors`} title="Expand menu">
                                            <span className="material-symbols-outlined text-[18px] transition-transform opacity-60" style={{ transform: expandedMenu === 'users' ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                                        </button>
                                    )}
                                </div>
                                {isSidebarOpen && expandedMenu === 'users' && (
                                    <div className="flex flex-col gap-1 mt-1 ml-2 border-l border-primary/30 pl-2">
                                        <button onClick={() => router.push('/admin/users')} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('users') ? 'text-primary' : 'text-slate-500 hover:text-primary hover:bg-primary-light-hover'}`}>
                                            <span className="material-symbols-outlined text-[16px]">list</span>
                                            All Users
                                        </button>
                                        <button onClick={() => router.push('/admin/users')} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('users') ? 'text-primary' : 'text-slate-500 hover:text-primary hover:bg-primary-light-hover'}`}>
                                            <span className="material-symbols-outlined text-[16px]">person_add</span>
                                            Add User
                                        </button>
                                        <button onClick={() => router.push('users')} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('users') ? 'text-primary' : 'text-slate-500 hover:text-primary hover:bg-primary-light-hover'}`}>
                                            <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
                                            Permissions
                                        </button>
                                    </div>
                                )}
                            </div>
                            {/* <!-- Candidates --> */}
                            <div>
                                <div className={`flex items-center gap-0 rounded-xl transition-colors group ${isActive('candidates') ? 'bg-primary-light' : 'nav-inactive'}`}>
                                    <button onClick={() => router.push('/admin/candidates')} className={`flex-1 flex items-center gap-3 px-3 py-3 rounded-l-xl transition-colors ${isActive('candidates') ? 'text-primary' : 'text-slate-500'}`} title="Candidates">
                                        <span className="material-symbols-outlined group-hover:text-primary transition-colors">person_add</span>
                                        <span className="text-sm font-medium">Candidates</span>
                                    </button>
                                    {isSidebarOpen && (
                                        <button onClick={() => setExpandedMenu(expandedMenu === 'candidates' ? null : 'candidates')} className={`px-2 py-3 -ml-3 rounded-r-xl transition-colors`} title="Expand menu">
                                            <span className="material-symbols-outlined text-[18px] transition-transform opacity-60" style={{ transform: expandedMenu === 'candidates' ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                                        </button>
                                    )}
                                </div>
                                {isSidebarOpen && expandedMenu === 'candidates' && (
                                    <div className="flex flex-col gap-1 mt-1 ml-2 border-l border-primary/30 pl-2">
                                        <button onClick={() => router.push('/admin/candidates')} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('candidates') ? 'text-primary' : 'text-slate-500 hover:text-primary hover:bg-primary-light-hover'}`}>
                                            <span className="material-symbols-outlined text-[16px]">list</span>
                                            All Candidates
                                        </button>
                                        <button onClick={() => router.push('/admin/candidates')} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('candidates') ? 'text-primary' : 'text-slate-500 hover:text-primary hover:bg-primary-light-hover'}`}>
                                            <span className="material-symbols-outlined text-[16px]">done</span>
                                            Hired
                                        </button>
                                        <button onClick={() => router.push('/admin/candidates')} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('candidates') ? 'text-primary' : 'text-slate-500 hover:text-primary hover:bg-primary-light-hover'}`}>
                                            <span className="material-symbols-outlined text-[16px]">pending_actions</span>
                                            In Review
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="h-px bg-slate-200 my-2"></div>
                            {/* <!-- Support --> */}
                            <button onClick={() => router.push('/admin/help')} className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors group ${isActive('help') ? 'bg-primary-light text-primary' : 'text-slate-500 nav-inactive'}`} title="Support">
                                <span className="material-symbols-outlined">bar_chart</span>
                                <span className="text-sm font-semibold">Reports</span>
                            </button>
                            {/* <!-- Settings --> */}
                            <button onClick={() => router.push('/admin/settings')} className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors group ${isActive('settings') ? 'bg-primary-light text-primary' : 'text-slate-500 nav-inactive'}`} title="Settings">
                                <span className="material-symbols-outlined">settings</span>
                                <span className="text-sm font-semibold">Settings</span>
                            </button>
                        </div>
                        <div className="p-4 mt-auto">
                            <div className="flex items-center gap-3">
                                <button className="group flex items-center justify-center p-0.5 rounded-full ring-2 ring-transparent hover:ring-primary/20 transition-all focus:outline-none shrink-0">
                                    <div className="size-10 rounded-full bg-cover bg-center shadow-inner" data-alt="User profile avatar" style={{ backgroundImage: `url('${currentUser?.image}')` }}></div>
                                </button>
                                {isSidebarOpen && (
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-sm font-semibold text-slate-900 leading-none truncate">{`${currentUser?.firstName} ${currentUser?.lastName}`}</span>
                                        <span className="text-xs text-slate-500 mt-1">Admin</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </aside>
                    {/* <!-- Main Content Wrapper --> */}
                    <div className="flex flex-col flex-1 h-full min-w-0 bg-background-light">
                        {/* <!-- Top Header --> */}
                        <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-[var(--background)] border-b border-light sticky top-0 z-10 shadow-sm shadow-slate-200/50">
                            {/* <!-- Left: Search --> */}
                            <div className="flex items-center gap-4">
                                <button className="md:hidden p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-100" onClick={() => setSidebarOpen(!isSidebarOpen)}>
                                    <span className="material-symbols-outlined">menu</span>
                                </button>
                                {/* <!-- Search Trigger (Visual Only) --> */}
                                <button className="hidden sm:flex flex-1 items-center gap-2 px-8 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-primary hover:ring-1 hover:ring-primary/20 transition-all border border-transparent justify-start">
                                    <span className="material-symbols-outlined text-[20px]">search</span>
                                    <span className="text-sm text-left">Search projects, tasks, or people......</span>
                                </button>
                            </div>
                            {/* <!-- Right: Actions & Profile --> */}
                            <div className="flex items-center gap-3 sm:gap-6">
                                <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
                                {/* <!-- Notification Bell --> */}
                                <div className="flex items-center gap-3 relative group">
                                    <button className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors">
                                        <span className="material-symbols-outlined">notifications</span>
                                        <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span>
                                    </button>
                                    <button onClick={() => setUserProfileOpen(!isUserProfileOpen)} className="flex items-center justify-center p-0.5 rounded-full ring-2 ring-transparent hover:ring-primary/20 transition-all focus:outline-none shrink-0">
                                        <div className="size-10 rounded-full bg-cover bg-center shadow-inner" data-alt="User profile avatar" style={{ backgroundImage: `url('${currentUser?.image}')` }}></div>
                                    </button>
                                    {/* Dropdown Menu */}
                                    <div className={`absolute right-0 top-full mt-1 w-32 bg-white border border-slate-200 rounded-lg shadow-lg z-50 ${isUserProfileOpen ? 'block' : 'hidden'}`}>
                                        <button onClick={handleLogout} className="w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 text-left flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[18px]">logout</span>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </header>
                        {children}
                    </div>
                </div >
            </div >
        </React.Fragment >
    )
}

export default AdminLayout;