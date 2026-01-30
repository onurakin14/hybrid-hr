'use client';

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
    
    const getPageTitle = (path: string): { title: string; subtitle: string } => {
        const segments = path.split('/').filter(Boolean);
        const lastSegment = segments[segments.length - 1];
        
        const pageMap: Record<string, { title: string; subtitle: string }> = {
            'dashboard': { title: 'Dashboard', subtitle: 'Overview of your enterprise activity' },
            'projects': { title: 'Projects', subtitle: 'Manage your projects and tasks' },
            'tasks': { title: 'Tasks', subtitle: 'Track and manage your tasks' },
            'users': { title: 'Users', subtitle: 'Manage team members and permissions' },
            'candidates': { title: 'Candidates', subtitle: 'View and manage job candidates' },
            'settings': { title: 'Settings', subtitle: 'Configure your preferences' },
            'help': { title: 'Support', subtitle: 'Get help and documentation' },
        };
        
        return pageMap[lastSegment] || { title: 'Dashboard', subtitle: 'Overview of your enterprise activity' };
    };
    
    const isActive = (href: string): boolean => {
        return pathname.includes(href);
    };
    
    const { title, subtitle } = getPageTitle(pathname);

    return (
        <React.Fragment>
            <div className="bg-background-light text-slate-900 font-display overflow-hidden">
                <div className="flex h-screen w-full relative">
                    {/* <!-- Sidebar Navigation --> */}
                    <aside className={`hidden md:flex flex-col bg-surface-light border-r border-border-light h-full shrink-0 z-20 transition-all duration-300 ${sidebarOpen ? 'w-72' : 'w-26'}`}>
                        {/* <!-- Logo Section --> */}
                        <div className="h-16 flex items-center justify-between px-6 border-b border-transparent">
                            {sidebarOpen && (
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-white shrink-0">
                                        <span className="material-symbols-outlined text-[20px]">grid_view</span>
                                    </div>
                                    <h1 className="text-lg font-bold tracking-tight text-slate-900 truncate">Enterprise App</h1>
                                </div>
                            )}
                            {!sidebarOpen && (
                                <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-white shrink-0 mx-auto">
                                    <span className="material-symbols-outlined text-[20px]">grid_view</span>
                                </div>
                            )}
                            <button 
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors shrink-0 ml-2"
                                title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                            >
                                <span className="material-symbols-outlined text-[28px]">
                                    {sidebarOpen ? 'chevron_left' : 'chevron_right'}
                                </span>
                            </button>
                        </div>
                        {/* <!-- Navigation Links --> */}
                        <div className="flex flex-col gap-1 px-4 py-6 overflow-y-auto grow">
                            {/* <!-- Dashboard --> */}
                            <button onClick={() => router.push('/admin/dashboard')} className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors group ${isActive('dashboard') ? 'bg-primary-light text-primary' : 'text-slate-500 nav-inactive'} ${!sidebarOpen && 'justify-center'}`} title={!sidebarOpen ? 'Dashboard' : ''}>
                                <span className="material-symbols-outlined fill-1">dashboard</span>
                                {sidebarOpen && <span className="text-sm font-semibold">Dashboard</span>}
                            </button>
                            {/* <!-- Projects --> */}
                            <div>
                                <div className={`flex items-center gap-0 rounded-xl transition-colors group ${isActive('projects') ? 'bg-primary-light' : 'nav-inactive'}`}>
                                    <button onClick={() => router.push('/admin/projects')} className={`flex-1 flex items-center gap-3 px-3 py-3 rounded-l-xl transition-colors ${isActive('projects') ? 'text-primary' : 'text-slate-500'} ${!sidebarOpen && 'justify-center'}`} title={!sidebarOpen ? 'Projects' : ''}>
                                        <span className="material-symbols-outlined group-hover:text-primary transition-colors">folder_open</span>
                                        {sidebarOpen && <span className="text-sm font-medium">Projects</span>}
                                    </button>
                                    {sidebarOpen && (
                                        <button onClick={() => setExpandedMenu(expandedMenu === 'projects' ? null : 'projects')} className={`px-2 py-3 rounded-r-xl transition-colors`} title="Expand menu">
                                            <span className="material-symbols-outlined text-[18px] transition-transform" style={{ transform: expandedMenu === 'projects' ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                                        </button>
                                    )}
                                </div>
                                {sidebarOpen && expandedMenu === 'projects' && (
                                    <div className="flex flex-col gap-1 mt-1 ml-2 border-l border-primary/30 pl-2">
                                        <button onClick={() => router.push('projects')} className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-primary text-sm font-medium transition-colors">
                                            <span className="material-symbols-outlined text-[16px]">list</span>
                                            All Projects
                                        </button>
                                        <button onClick={() => router.push('projects')} className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-primary text-sm font-medium transition-colors">
                                            <span className="material-symbols-outlined text-[16px]">add</span>
                                            New Project
                                        </button>
                                        <button onClick={() => router.push('projects')} className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-primary text-sm font-medium transition-colors">
                                            <span className="material-symbols-outlined text-[16px]">archive</span>
                                            Archived
                                        </button>
                                    </div>
                                )}
                            </div>
                            {/* <!-- Tasks --> */}
                            <div>
                                <div className={`flex items-center gap-0 rounded-xl transition-colors group ${isActive('tasks') ? 'bg-primary-light' : 'nav-inactive'}`}>
                                    <button onClick={() => router.push('/admin/tasks')} className={`flex-1 flex items-center gap-3 px-3 py-3 rounded-l-xl transition-colors ${isActive('tasks') ? 'text-primary' : 'text-slate-500'} ${!sidebarOpen && 'justify-center'}`} title={!sidebarOpen ? 'Tasks' : ''}>
                                        <span className="material-symbols-outlined group-hover:text-primary transition-colors">check_box</span>
                                        {sidebarOpen && <span className="text-sm font-medium">Tasks</span>}
                                    </button>
                                    {sidebarOpen && (
                                        <button onClick={() => setExpandedMenu(expandedMenu === 'tasks' ? null : 'tasks')} className={`px-2 py-3 rounded-r-xl transition-colors`} title="Expand menu">
                                            <span className="material-symbols-outlined text-[18px] transition-transform" style={{ transform: expandedMenu === 'tasks' ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                                        </button>
                                    )}
                                </div>
                                {sidebarOpen && expandedMenu === 'tasks' && (
                                    <div className="flex flex-col gap-1 mt-1 ml-2 border-l border-primary/30 pl-2">
                                        <button onClick={() => router.push('tasks')} className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-primary text-sm font-medium transition-colors">
                                            <span className="material-symbols-outlined text-[16px]">list</span>
                                            All Tasks
                                        </button>
                                        <button onClick={() => router.push('tasks')} className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-primary text-sm font-medium transition-colors">
                                            <span className="material-symbols-outlined text-[16px]">done</span>
                                            Completed
                                        </button>
                                        <button onClick={() => router.push('tasks')} className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-primary text-sm font-medium transition-colors">
                                            <span className="material-symbols-outlined text-[16px]">schedule</span>
                                            Pending
                                        </button>
                                    </div>
                                )}
                            </div>
                            {/* <!-- Users --> */}
                            <div>
                                <div className={`flex items-center gap-0 rounded-xl transition-colors group ${isActive('users') ? 'bg-primary-light' : 'nav-inactive'}`}>
                                    <button onClick={() => router.push('/admin/users')} className={`flex-1 flex items-center gap-3 px-3 py-3 rounded-l-xl transition-colors ${isActive('users') ? 'text-primary' : 'text-slate-500'} ${!sidebarOpen && 'justify-center'}`} title={!sidebarOpen ? 'Users' : ''}>
                                        <span className="material-symbols-outlined group-hover:text-primary transition-colors">group</span>
                                        {sidebarOpen && <span className="text-sm font-medium">Users</span>}
                                    </button>
                                    {sidebarOpen && (
                                        <button onClick={() => setExpandedMenu(expandedMenu === 'users' ? null : 'users')} className={`px-2 py-3 rounded-r-xl transition-colors`} title="Expand menu">
                                            <span className="material-symbols-outlined text-[18px] transition-transform" style={{ transform: expandedMenu === 'users' ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                                        </button>
                                    )}
                                </div>
                                {sidebarOpen && expandedMenu === 'users' && (
                                    <div className="flex flex-col gap-1 mt-1 ml-2 border-l border-primary/30 pl-2">
                                        <button onClick={() => router.push('users')} className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-primary text-sm font-medium transition-colors">
                                            <span className="material-symbols-outlined text-[16px]">list</span>
                                            All Users
                                        </button>
                                        <button onClick={() => router.push('users')} className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-primary text-sm font-medium transition-colors">
                                            <span className="material-symbols-outlined text-[16px]">person_add</span>
                                            Add User
                                        </button>
                                        <button onClick={() => router.push('users')} className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-primary text-sm font-medium transition-colors">
                                            <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
                                            Permissions
                                        </button>
                                    </div>
                                )}
                            </div>
                            {/* <!-- Candidates --> */}
                            <div>
                                <div className={`flex items-center gap-0 rounded-xl transition-colors group ${isActive('candidates') ? 'bg-primary-light' : 'nav-inactive'}`}>
                                    <button onClick={() => router.push('/admin/candidates')} className={`flex-1 flex items-center gap-3 px-3 py-3 rounded-l-xl transition-colors ${isActive('candidates') ? 'text-primary' : 'text-slate-500'} ${!sidebarOpen && 'justify-center'}`} title={!sidebarOpen ? 'Candidates' : ''}>
                                        <span className="material-symbols-outlined group-hover:text-primary transition-colors">person_add</span>
                                        {sidebarOpen && <span className="text-sm font-medium">Candidates</span>}
                                    </button>
                                    {sidebarOpen && (
                                        <button onClick={() => setExpandedMenu(expandedMenu === 'candidates' ? null : 'candidates')} className={`px-2 py-3 rounded-r-xl transition-colors`} title="Expand menu">
                                            <span className="material-symbols-outlined text-[18px] transition-transform" style={{ transform: expandedMenu === 'candidates' ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                                        </button>
                                    )}
                                </div>
                                {sidebarOpen && expandedMenu === 'candidates' && (
                                    <div className="flex flex-col gap-1 mt-1 ml-2 border-l border-primary/30 pl-2">
                                        <button onClick={() => router.push('candidates')} className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-primary text-sm font-medium transition-colors">
                                            <span className="material-symbols-outlined text-[16px]">list</span>
                                            All Candidates
                                        </button>
                                        <button onClick={() => router.push('candidates')} className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-primary text-sm font-medium transition-colors">
                                            <span className="material-symbols-outlined text-[16px]">done</span>
                                            Hired
                                        </button>
                                        <button onClick={() => router.push('candidates')} className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-primary text-sm font-medium transition-colors">
                                            <span className="material-symbols-outlined text-[16px]">pending_actions</span>
                                            In Review
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* <!-- Bottom Actions --> */}
                        <div className="p-4 border-t border-border-light mt-auto">
                            <button onClick={() => router.push('settings')} className={`flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors ${!sidebarOpen && 'justify-center'}`} title={!sidebarOpen ? 'Settings' : ''}>
                                <span className="material-symbols-outlined">settings</span>
                                {sidebarOpen && <span className="text-sm font-medium">Settings</span>}
                            </button>
                            <button onClick={() => router.push('help')} className={`flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors ${!sidebarOpen && 'justify-center'}`} title={!sidebarOpen ? 'Support' : ''}>
                                <span className="material-symbols-outlined">help</span>
                                {sidebarOpen && <span className="text-sm font-medium">Support</span>}
                            </button>
                        </div>
                    </aside>
                    {/* <!-- Main Content Wrapper --> */}
                    <div className="flex flex-col flex-1 h-full min-w-0 bg-background-light">
                        {/* <!-- Top Header --> */}
                        <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-surface-light border-b border-border-light sticky top-0 z-10 shadow-sm shadow-slate-200/50">
                            {/* <!-- Left: Title / Breadcrumbs --> */}
                            <div className="flex items-center gap-4">
                                <button className="md:hidden p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-100">
                                    <span className="material-symbols-outlined">menu</span>
                                </button>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 leading-tight">{title}</h2>
                                    <p className="text-xs text-slate-500 hidden sm:block">{subtitle}</p>
                                </div>
                            </div>
                            {/* <!-- Right: Actions & Profile --> */}
                            <div className="flex items-center gap-3 sm:gap-6">
                                {/* <!-- Search Trigger (Visual Only) --> */}
                                <button className="hidden sm:flex items-center gap-2 px-3 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-primary hover:ring-1 hover:ring-primary/20 transition-all border border-transparent">
                                    <span className="material-symbols-outlined text-[20px]">search</span>
                                    <span className="text-sm">Search...</span>
                                </button>
                                <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
                                {/* <!-- Notification Bell --> */}
                                <button className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors">
                                    <span className="material-symbols-outlined">notifications</span>
                                    <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span>
                                </button>
                                {/* <!-- User Profile Dropdown Trigger --> */}
                                <div className="flex items-center gap-3 pl-2">
                                    <div className="hidden md:flex flex-col items-end">
                                        <span className="text-sm font-semibold text-slate-900 leading-none">Jane Doe</span>
                                        <span className="text-xs text-slate-500 mt-1">Admin</span>
                                    </div>
                                    <button className="group flex items-center justify-center p-0.5 rounded-full ring-2 ring-transparent hover:ring-primary/20 transition-all focus:outline-none">
                                        <div className="size-10 rounded-full bg-cover bg-center shadow-inner" data-alt="User profile avatar of a smiling professional woman" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBaWIEZqYNGM4GL0Wtw1f5vCfW1pvUtWRiomZdhh5_M6k5PS3wZjIelazRSe-hGE5pNe2bRZ2roulRUNWJWYqvSJbKU-3NqmHFfKzPdsjcDUc_dEXwpT_m6RybkebDEtpnKvW9QQBMrtxLsR82LMVh4PtV5dXtOo_NcWGzVZdxw3kvKzkLsNMKa7ASeB3pSc_3aJ8FzBaQtCU4shmkhPl334KM0QK0cUTk0tuoQp_B8kyYp9kzRnglsp4Bk-1YsIN6V00Nro-UbvA')" }}>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </header>
                        {children}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AdminLayout;