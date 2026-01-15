import React from "react";

function Dashboard() {

    return (
        <React.Fragment>
            {/* <!-- Main Scrollable Area --> */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                <div className="mx-auto max-w-7xl h-full flex flex-col">
                    {/* <!-- Empty State Container --> */}
                    <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border-light bg-surface-light/50/50 p-12 text-center min-h-[400px]">
                        <div className="relative flex items-center justify-center size-24 mb-6 rounded-full bg-primary-light">
                            <span className="material-symbols-outlined text-primary text-[40px]">dashboard_customize</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                            Dashboard is ready
                        </h3>
                        <p className="text-slate-500 max-w-md mb-8 leading-relaxed">
                            Select a module from the sidebar to view detailed analytics, manage your team, or track project progress.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-semibold transition-all shadow-lg shadow-primary/25">
                                <span className="material-symbols-outlined mr-2 text-[20px]">add</span>
                                Create New Project
                            </button>
                            <button className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibol  transition-all">
                                <span className="material-symbols-outlined mr-2 text-[20px]">description</span>
                                View Documentation
                            </button>
                        </div>
                    </div>
                    {/* <!-- Optional: Placeholder Grid to hint at layout capabilities --> */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-40 select-none pointer-events-none grayscale">
                        <div className="h-32 rounded-xl bg-white border border-slate-200 p-4 flex flex-col justify-between">
                            <div className="h-8 w-8 rounded bg-slate-100"></div>
                            <div className="space-y-2">
                                <div className="h-4 w-24 bg-slate-100 rounded"></div>
                                <div className="h-3 w-16 bg-slate-50 rounded"></div>
                            </div>
                        </div>
                        <div className="h-32 rounded-xl bg-white border border-slate-200 p-4 flex flex-col justify-between">
                            <div className="h-8 w-8 rounded bg-slate-100"></div>
                            <div className="space-y-2">
                                <div className="h-4 w-24 bg-slate-100 rounded"></div>
                                <div className="h-3 w-16 bg-slate-50 rounded"></div>
                            </div>
                        </div>
                        <div className="h-32 rounded-xl bg-white border border-slate-200 p-4 flex flex-col justify-between">
                            <div className="h-8 w-8 rounded bg-slate-100"></div>
                            <div className="space-y-2">
                                <div className="h-4 w-24 bg-slate-100 rounded"></div>
                                <div className="h-3 w-16 bg-slate-50 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}

export default Dashboard;