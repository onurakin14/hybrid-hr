'use client';

export default function Overview() {
    return (
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
                    {/* Page Heading */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight text-[#131118] dark:text-white mb-1">Dashboard</h2>
                            <p className="text-[#6b6189] dark:text-text-secondary-dark">Overview of your projects and team performance</p>
                        </div>
                        <button className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/25 transition-all active:scale-95">
                            <span className="material-symbols-outlined text-[20px]">add</span>
                            Create Project
                        </button>
                    </div>
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {/* Stat Card 1 */}
                        <div className="bg-white dark:bg-card-dark rounded-xl p-6 border border-[#f1f0f4] dark:border-gray-800 shadow-sm flex flex-col gap-4 group hover:border-primary/30 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="size-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <span className="material-symbols-outlined icon-filled">folder</span>
                                </div>
                                <span className="flex items-center text-emerald-600 dark:text-emerald-400 text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-lg">+15%</span>
                            </div>
                            <div>
                                <p className="text-[#6b6189] dark:text-text-secondary-dark text-sm font-medium mb-1">Active Projects</p>
                                <p className="text-3xl font-bold text-[#131118] dark:text-white">12</p>
                            </div>
                        </div>
                        {/* Stat Card 2 */}
                        <div className="bg-white dark:bg-card-dark rounded-xl p-6 border border-[#f1f0f4] dark:border-gray-800 shadow-sm flex flex-col gap-4 group hover:border-primary/30 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="size-10 rounded-lg bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                    <span className="material-symbols-outlined icon-filled">assignment_late</span>
                                </div>
                                <span className="flex items-center text-emerald-600 dark:text-emerald-400 text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-lg">+5%</span>
                            </div>
                            <div>
                                <p className="text-[#6b6189] dark:text-text-secondary-dark text-sm font-medium mb-1">Open Tasks</p>
                                <p className="text-3xl font-bold text-[#131118] dark:text-white">48</p>
                            </div>
                        </div>
                        {/* Stat Card 3 */}
                        <div className="bg-white dark:bg-card-dark rounded-xl p-6 border border-[#f1f0f4] dark:border-gray-800 shadow-sm flex flex-col gap-4 group hover:border-primary/30 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="size-10 rounded-lg bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                    <span className="material-symbols-outlined icon-filled">person_search</span>
                                </div>
                                <span className="flex items-center text-emerald-600 dark:text-emerald-400 text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-lg">+12%</span>
                            </div>
                            <div>
                                <p className="text-[#6b6189] dark:text-text-secondary-dark text-sm font-medium mb-1">Active Candidates</p>
                                <p className="text-3xl font-bold text-[#131118] dark:text-white">8</p>
                            </div>
                        </div>
                        {/* Stat Card 4 */}
                        <div className="bg-white dark:bg-card-dark rounded-xl p-6 border border-[#f1f0f4] dark:border-gray-800 shadow-sm flex flex-col gap-4 group hover:border-primary/30 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="size-10 rounded-lg bg-pink-50 dark:bg-pink-500/10 flex items-center justify-center text-pink-600 dark:text-pink-400">
                                    <span className="material-symbols-outlined icon-filled">group</span>
                                </div>
                                <span className="flex items-center text-[#6b6189] dark:text-gray-500 text-xs font-bold bg-gray-50 dark:bg-white/5 px-2 py-1 rounded-lg">0%</span>
                            </div>
                            <div>
                                <p className="text-[#6b6189] dark:text-text-secondary-dark text-sm font-medium mb-1">Team Members</p>
                                <p className="text-3xl font-bold text-[#131118] dark:text-white">24</p>
                            </div>
                        </div>
                    </div>
                    {/* Main Grid: Charts & Activity */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[400px]">
                        {/* Chart Section */}
                        <div className="lg:col-span-2 bg-white dark:bg-card-dark rounded-xl p-6 border border-[#f1f0f4] dark:border-gray-800 shadow-sm flex flex-col">
                            <div className="flex items-start justify-between mb-8">
                                <div>
                                    <h3 className="text-lg font-bold text-[#131118] dark:text-white">Weekly Task Velocity</h3>
                                    <p className="text-sm text-[#6b6189] dark:text-text-secondary-dark mt-1">Tasks completed vs planned</p>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-bold text-[#131118] dark:text-white">84</span>
                                    <span className="text-sm font-medium text-[#6b6189]">Tasks</span>
                                    <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold ml-1">↑ 8%</span>
                                </div>
                            </div>
                            {/* Bar Chart Visual */}
                            <div className="flex-1 w-full min-h-[250px] grid grid-cols-7 items-end gap-3 sm:gap-6 px-2">
                                {/* Mon */}
                                <div className="flex flex-col items-center gap-2 group w-full h-full justify-end">
                                    <div className="w-full bg-primary/20 dark:bg-primary/10 rounded-t-lg relative group-hover:bg-primary/30 transition-all" style={{ height: '60%' }}>
                                        <div className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all duration-500" style={{ height: '70%' }}></div>
                                        {/* Tooltip */}
                                        <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap z-10">12 Tasks</div>
                                    </div>
                                    <span className="text-xs font-semibold text-[#6b6189] dark:text-gray-500">Mon</span>
                                </div>
                                {/* Tue */}
                                <div className="flex flex-col items-center gap-2 group w-full h-full justify-end">
                                    <div className="w-full bg-primary/20 dark:bg-primary/10 rounded-t-lg relative group-hover:bg-primary/30 transition-all" style={{ height: '45%' }}>
                                        <div className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all duration-500" style={{ height: '85%' }}></div>
                                        <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap z-10">8 Tasks</div>
                                    </div>
                                    <span className="text-xs font-semibold text-[#6b6189] dark:text-gray-500">Tue</span>
                                </div>
                                {/* Wed */}
                                <div className="flex flex-col items-center gap-2 group w-full h-full justify-end">
                                    <div className="w-full bg-primary/20 dark:bg-primary/10 rounded-t-lg relative group-hover:bg-primary/30 transition-all" style={{ height: '75%' }}>
                                        <div className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all duration-500" style={{ height: '60%' }}></div>
                                        <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap z-10">15 Tasks</div>
                                    </div>
                                    <span className="text-xs font-semibold text-[#6b6189] dark:text-gray-500">Wed</span>
                                </div>
                                {/* Thu */}
                                <div className="flex flex-col items-center gap-2 group w-full h-full justify-end">
                                    <div className="w-full bg-primary/20 dark:bg-primary/10 rounded-t-lg relative group-hover:bg-primary/30 transition-all" style={{ height: '85%' }}>
                                        <div className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all duration-500" style={{ height: '90%' }}></div>
                                        <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap z-10">22 Tasks</div>
                                    </div>
                                    <span className="text-xs font-semibold text-[#6b6189] dark:text-gray-500">Thu</span>
                                </div>
                                {/* Fri */}
                                <div className="flex flex-col items-center gap-2 group w-full h-full justify-end">
                                    <div className="w-full bg-primary/20 dark:bg-primary/10 rounded-t-lg relative group-hover:bg-primary/30 transition-all" style={{ height: '55%' }}>
                                        <div className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all duration-500" style={{ height: '75%' }}></div>
                                        <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap z-10">18 Tasks</div>
                                    </div>
                                    <span className="text-xs font-semibold text-[#6b6189] dark:text-gray-500">Fri</span>
                                </div>
                                {/* Sat */}
                                <div className="flex flex-col items-center gap-2 group w-full h-full justify-end">
                                    <div className="w-full bg-primary/20 dark:bg-primary/10 rounded-t-lg relative group-hover:bg-primary/30 transition-all" style={{ height: '30%' }}>
                                        <div className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all duration-500" style={{ height: '40%' }}></div>
                                        <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap z-10">4 Tasks</div>
                                    </div>
                                    <span className="text-xs font-semibold text-[#6b6189] dark:text-gray-500">Sat</span>
                                </div>
                                {/* Sun */}
                                <div className="flex flex-col items-center gap-2 group w-full h-full justify-end">
                                    <div className="w-full bg-primary/20 dark:bg-primary/10 rounded-t-lg relative group-hover:bg-primary/30 transition-all" style={{ height: '25%' }}>
                                        <div className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all duration-500" style={{ height: '30%' }}></div>
                                        <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap z-10">2 Tasks</div>
                                    </div>
                                    <span className="text-xs font-semibold text-[#6b6189] dark:text-gray-500">Sun</span>
                                </div>
                            </div>
                        </div>
                        {/* Recent Activity Feed */}
                        <div className="lg:col-span-1 bg-white dark:bg-card-dark rounded-xl p-6 border border-[#f1f0f4] dark:border-gray-800 shadow-sm flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-[#131118] dark:text-white">Recent Activity</h3>
                                <button className="text-primary dark:text-primary-light text-sm font-bold hover:underline">View All</button>
                            </div>
                            <div className="flex flex-col gap-6 overflow-y-auto pr-2">
                                {/* Activity Item 1 */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 relative">
                                        <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                            <span className="material-symbols-outlined text-[20px]">badge</span>
                                        </div>
                                        <div className="absolute bottom-0 right-0 size-3 bg-white dark:bg-card-dark rounded-full flex items-center justify-center">
                                            <div className="size-2 bg-emerald-500 rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-semibold text-[#131118] dark:text-white leading-tight">New Candidate Applied</p>
                                        <p className="text-xs text-[#6b6189] dark:text-text-secondary-dark">Sarah Jenkins applied for <span className="font-medium text-[#131118] dark:text-gray-300">UX Designer</span></p>
                                        <span className="text-[11px] text-[#6b6189] font-medium mt-0.5">2 hours ago</span>
                                    </div>
                                </div>
                                {/* Activity Item 2 */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 relative">
                                        <div className="size-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                            <span className="material-symbols-outlined text-[20px] icon-filled">edit_document</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-semibold text-[#131118] dark:text-white leading-tight">Task Updated</p>
                                        <p className="text-xs text-[#6b6189] dark:text-text-secondary-dark">Project Alpha status changed to <span className="text-orange-600 font-medium">In Progress</span></p>
                                        <span className="text-[11px] text-[#6b6189] font-medium mt-0.5">4 hours ago</span>
                                    </div>
                                </div>
                                {/* Activity Item 3 */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 relative">
                                        <div className="size-10 rounded-full bg-cover bg-center" data-alt="Profile picture of John Doe" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAw8h43hKXBX888oiPR78q76KHNDP_0ld32gIdZBIuGwHRr27t8W-34A1pcW6uvS_pycfI2ZonhHnDKAgypsFyUgFEUbt1EH30xmQkISVltsWe2pymjUkrGMATr_HSo5kq-S_OZV-fJKfFbUvDBoNVfT6pjwl9gzpMSJnruD7d2UiDJLy6bNnZdDBOFZFpNbPeIz1Iq-ANWbt9fRlZslThF8C58t2MlkfoAfHB-NuKFYt1UZadf5kKWsYp9aWXLe6uKUr0Z_mbBNw")' }}></div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-semibold text-[#131118] dark:text-white leading-tight">Comment Added</p>
                                        <p className="text-xs text-[#6b6189] dark:text-text-secondary-dark">John Doe commented on <span className="font-medium text-[#131118] dark:text-gray-300">Q3 Marketing Report</span></p>
                                        <span className="text-[11px] text-[#6b6189] font-medium mt-0.5">5 hours ago</span>
                                    </div>
                                </div>
                                {/* Activity Item 4 */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 relative">
                                        <div className="size-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                            <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-semibold text-[#131118] dark:text-white leading-tight">Meeting Scheduled</p>
                                        <p className="text-xs text-[#6b6189] dark:text-text-secondary-dark">Quarterly Review with <span className="font-medium text-[#131118] dark:text-gray-300">Design Team</span></p>
                                        <span className="text-[11px] text-[#6b6189] font-medium mt-0.5">Tomorrow, 10:00 AM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
