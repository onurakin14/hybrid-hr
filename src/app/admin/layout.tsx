import React from "react";

function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    return (
        <React.Fragment>
            <div className="bg-background-light text-slate-900 font-display overflow-hidden">
                <div className="flex h-screen w-full relative">
                    {/* <!-- Sidebar Navigation --> */}
                    <aside className="hidden md:flex flex-col w-72 bg-surface-light border-r border-border-light h-full shrink-0 z-20 transition-all duration-300">
                        {/* <!-- Logo Section --> */}
                        <div className="h-16 flex items-center px-6 border-b border-transparent">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-white">
                                    <span className="material-symbols-outlined text-[20px]">grid_view</span>
                                </div>
                                <h1 className="text-lg font-bold tracking-tight text-slate-900">Enterprise App</h1>
                            </div>
                        </div>
                        {/* <!-- Navigation Links --> */}
                        <div className="flex flex-col gap-1 px-4 py-6 overflow-y-auto grow">
                            {/* <!-- Dashboard (Active) --> */}
                            <a className="flex items-center gap-3 px-3 py-3 rounded-xl bg-primary/10 text-primary transition-colors group" href="dashboard">
                                <span className="material-symbols-outlined fill-1">dashboard</span>
                                <span className="text-sm font-semibold">Dashboard</span>
                            </a>
                            {/* <!-- Projects --> */}
                            <a className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors group" href="projects">
                                <span className="material-symbols-outlined group-hover:text-primary transition-colors">folder_open</span>
                                <span className="text-sm font-medium">Projects</span>
                            </a>
                            {/* <!-- Tasks --> */}
                            <a className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors group" href="tasks">
                                <span className="material-symbols-outlined group-hover:text-primary transition-colors">check_box</span>
                                <span className="text-sm font-medium">Tasks</span>
                            </a>
                            {/* <!-- Users --> */}
                            <a className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors group" href="users">
                                <span className="material-symbols-outlined group-hover:text-primary transition-colors">group</span>
                                <span className="text-sm font-medium">Users</span>
                            </a>
                            {/* <!-- Candidates --> */}
                            <a className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors group" href="candidates">
                                <span className="material-symbols-outlined group-hover:text-primary transition-colors">person_add</span>
                                <span className="text-sm font-medium">Candidates</span>
                            </a>
                        </div>
                        {/* <!-- Bottom Actions --> */}
                        <div className="p-4 border-t border-border-light mt-auto">
                            <a className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors" href="settings">
                                <span className="material-symbols-outlined">settings</span>
                                <span className="text-sm font-medium">Settings</span>
                            </a>
                            <a className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors" href="help">
                                <span className="material-symbols-outlined">help</span>
                                <span className="text-sm font-medium">Support</span>
                            </a>
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
                                    <h2 className="text-lg font-bold text-slate-900 leading-tight">Dashboard</h2>
                                    <p className="text-xs text-slate-500 hidden sm:block">Overview of your enterprise activity</p>
                                </div>
                            </div>
                            {/* <!-- Right: Actions & Profile --> */}
                            <div className="flex items-center gap-3 sm:gap-6">
                                {/* <!-- Search Trigger (Visual Only) --> */}
                                <button className="hidden sm:flex items-center gap-2 px-3 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-primary hover:ring-1 hover:ring-primary/20 transition-all border border-transparent">
                                    <span className="material-symbols-outlined text-[20px]">search</span>
                                    <span className="text-sm">Search...</span>
                                    <span className="ml-4 text-xs bg-white px-1.5 py-0.5 rounded border border-slate-200">⌘K</span>
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