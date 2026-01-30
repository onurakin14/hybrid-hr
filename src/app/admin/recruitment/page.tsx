"use client"
import { fetchUsersByPage, User } from "@/lib/features/users/usersSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Recruitment() {

    const router = useRouter();
    const dispatch = useAppDispatch();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        dispatch(fetchUsersByPage({})).then(res => {
            const data = res.payload as User[];
            setUsers(data);
        });
    }, []);

    return (
        <React.Fragment>
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
                <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
                    {/* Breadcrumbs */}
                    <div className="flex flex-wrap gap-2 text-sm">
                        <a className="text-[#616f89] font-medium hover:text-primary transition-colors" href="#">Home</a>
                        <span className="text-[#616f89] font-medium">/</span>
                        <a className="text-[#616f89] font-medium hover:text-primary transition-colors" href="#">Recruitment</a>
                        <span className="text-[#616f89] font-medium">/</span>
                        <span className="text-[#111318] font-medium">Job Postings</span>
                    </div>
                    {/* PageHeading */}
                    <div className="flex flex-wrap justify-between items-end gap-4 pb-2 border-b border-gray-100">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-[#111318] text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Job Postings</h1>
                            <p className="text-[#616f89] text-base font-normal">Manage your open positions and track recruitment progress.</p>
                        </div>
                        <button className="flex items-center gap-2 h-10 px-5 bg-primary hover:bg-blue-700 text-white text-sm font-bold rounded-lg shadow-sm shadow-blue-200 transition-all transform active:scale-95">
                            <span className="material-symbols-outlined text-[20px]">add</span>
                            <span className="truncate">Create Job</span>
                        </button>
                    </div>
                    {/* Filter & Search Bar */}
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                        {/* Search */}
                        <div className="w-full md:w-96">
                            <label className="flex w-full items-center h-10 rounded-lg bg-[#f0f2f4] px-3 gap-2 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                                <span className="material-symbols-outlined text-[#616f89]">search</span>
                                <input className="w-full bg-transparent border-none text-sm text-[#111318] placeholder:text-[#616f89] focus:ring-0 p-0" placeholder="Search by job title, ID, or keyword..." />
                            </label>
                        </div>
                        {/* Filters */}
                        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                            <button className="flex items-center gap-2 h-10 px-3 bg-white border border-[#e5e7eb] rounded-lg text-sm font-medium text-[#111318] whitespace-nowrap hover:bg-gray-50">
                                <span className="material-symbols-outlined text-[18px]">filter_list</span>
                                <span>Filter</span>
                            </button>
                            <div className="h-10 w-px bg-gray-200 mx-1 hidden md:block"></div>
                            <select className="h-10 bg-white border border-[#e5e7eb] rounded-lg text-sm px-3 pr-8 text-[#111318] focus:ring-primary focus:border-primary">
                                <option>All Departments</option>
                                <option>Engineering</option>
                                <option>Product</option>
                                <option>Design</option>
                                <option>Marketing</option>
                            </select>
                            <select className="h-10 bg-white border border-[#e5e7eb] rounded-lg text-sm px-3 pr-8 text-[#111318] focus:ring-primary focus:border-primary">
                                <option>Status: All</option>
                                <option>Open</option>
                                <option>Closed</option>
                                <option>Draft</option>
                            </select>
                        </div>
                    </div>
                    {/* Job Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {/* Open Card */}
                        {users.map((item, index) =>
                            <div key={index}
                                onClick={() => router.push(`/admin/recruitment/${item.id}`)}
                                className="flex flex-col bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all group cursor-pointer relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-[#111318] text-lg font-bold leading-tight group-hover:text-primary transition-colors">{item.company.title}</h3>
                                        <p className="text-[#616f89] text-sm mt-1 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[16px]">domain</span> {item.company.department}
                                        </p>
                                    </div>
                                    <button className="size-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#616f89] transition-colors">
                                        <span className="material-symbols-outlined">more_horiz</span>
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1 rounded-md font-semibold border border-indigo-100">Full-time</span>
                                    <span className="bg-gray-50 text-gray-600 text-xs px-2.5 py-1 rounded-md font-medium border border-gray-100 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">location_on</span> {item.company.address.state}, {item.company.address.stateCode}
                                    </span>
                                </div>
                                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-wider font-bold text-[#9CA3AF]">Candidates</span>
                                        <div className="flex -space-x-2 mt-1.5 pl-1">
                                            <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-200 bg-cover" data-alt="Candidate Avatar 1" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBuTh5FFL_9JaaHeFDRjPtuaMGBRPxyDOP2C6KV379wVz4b9_SJi3EtgL74TBCo2OsgeRXyBRCfopiKprQZ11fB5_vm55DykOXKqZ7ZLq3ZJYQZt2rrjO1eKaJa605IIrTOlrroWMfRP0k86P38fev6T5QrVeDF8I38JUrYOhdhxyVHTK2IB6NFCCvNR5poysCsd-d7a3GSdZtn6OtbYrULW7tHGePtQLi0ROKZYa1zcWJPs0obbQsu6YCOGqE_LBfr8J7eeAMKeA')" }}></div>
                                            <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-200 bg-cover" data-alt="Candidate Avatar 2" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBs82dACgAi3v7bj_7NuUOUMmzwjbM-u4nKuu5LXuivAYFZ3e-Op0xoFEW59WQIHrtf4IUbA6rso-C-SHHvRgO3XmBESz2HwJzIOX3bPh6IrZQ5B433HqC0PV5pEQ_rea7jXpsBAkCbSVPHMdhDJljs1g6IAppeeEkRV5TKOxe1mQZzJOHNeLnO-DXcC44s3mfPaibFxm9auX3MMP-TOfHVhUp4IzDftx4volmGZu3Ma0MYd4j7XinjXVQoPWYFFq7PEFWd8RiX3Q')" }}></div>
                                            <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] text-gray-600 font-bold">+5</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] uppercase tracking-wider font-bold text-[#9CA3AF]">Openings</span>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                                            <span className="text-sm font-bold text-[#111318]">2 Open</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Closed Card */}
                        {/* <div className="flex flex-col bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all group cursor-pointer relative overflow-hidden opacity-75 hover:opacity-100">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-[#111318] text-lg font-bold leading-tight text-gray-500">HR Coordinator</h3>
                                    <p className="text-[#616f89] text-sm mt-1 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[16px]">domain</span> Human Resources
                                    </p>
                                </div>
                                <button className="size-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#616f89] transition-colors">
                                    <span className="material-symbols-outlined">more_horiz</span>
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="bg-gray-100 text-gray-500 text-xs px-2.5 py-1 rounded-md font-semibold border border-gray-200">Contract</span>
                                <span className="bg-gray-50 text-gray-600 text-xs px-2.5 py-1 rounded-md font-medium border border-gray-100 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">location_on</span> London, UK
                                </span>
                            </div>
                            <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#9CA3AF]">Candidates</span>
                                    <span className="text-xs text-gray-500 mt-1">Position filled</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#9CA3AF]">Status</span>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="flex h-2 w-2 rounded-full bg-gray-400"></span>
                                        <span className="text-sm font-bold text-gray-500">Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    {/* Pagination */}
                    <div className="flex items-center justify-between py-4 border-t border-gray-200">
                        <p className="text-sm text-[#616f89]">Showing <span className="font-bold text-[#111318]">1-6</span> of <span className="font-bold text-[#111318]">24</span> jobs</p>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 text-sm rounded-lg border border-gray-200 text-[#616f89] hover:bg-gray-50 disabled:opacity-50">Previous</button>
                            <button className="px-3 py-1 text-sm rounded-lg bg-primary text-white hover:bg-blue-700">1</button>
                            <button className="px-3 py-1 text-sm rounded-lg border border-gray-200 text-[#616f89] hover:bg-gray-50">2</button>
                            <button className="px-3 py-1 text-sm rounded-lg border border-gray-200 text-[#616f89] hover:bg-gray-50">3</button>
                            <button className="px-3 py-1 text-sm rounded-lg border border-gray-200 text-[#616f89] hover:bg-gray-50">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
export default Recruitment;
