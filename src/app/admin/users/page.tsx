"use client"
import { fetchUsers, User } from "@/lib/features/users/usersSlice";
import { useAppDispatch } from "../../../lib/hooks";
import React, { useEffect, useState } from "react";

function TeamMembers() {

    const dispatch = useAppDispatch();

    const [users, setUsers] = useState<User[]>();

    useEffect(() => {
        dispatch(fetchUsers()).then(res => {
            const data = res.payload as User[];
            setUsers(data);
            console.log(res.payload);
        }).catch(console.error);
    }, []);


    return (
        <React.Fragment>
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto bg-background-light p-6 lg:p-8">
                <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
                    {/* Page Heading Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-[#131118] text-3xl font-bold leading-tight tracking-tight">User Management</h2>
                            <p className="text-[#6b6189] text-base font-normal">Manage access, roles, and project assignments for your team.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center justify-center rounded-lg h-10 px-4 bg-white border border-[#dedbe6] text-[#131118] gap-2 text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
                                <span className="material-symbols-outlined text-lg">filter_list</span>
                                <span>Filter</span>
                            </button>
                            <button className="flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white gap-2 pl-3 text-sm font-bold shadow-md hover:bg-primary/90 transition-all">
                                <span className="material-symbols-outlined text-lg">add</span>
                                <span>Add Member</span>
                            </button>
                        </div>
                    </div>
                    {/* Main Card */}
                    <div className="flex flex-col rounded-xl border border-[#dedbe6] bg-white shadow-sm overflow-hidden">
                        {/* Toolbar inside Card */}
                        <div className="p-4 border-b border-[#dedbe6] flex items-center justify-between gap-4 bg-white">
                            <label className="relative flex items-center max-w-md w-full">
                                <span className="material-symbols-outlined absolute left-3 text-[#6b6189]">search</span>
                                <input className="w-full h-10 pl-10 pr-4 rounded-lg bg-[#f6f6f8] border-none text-sm text-[#131118] placeholder-[#6b6189] focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all" placeholder="Search by name, role or email..." type="text" />
                            </label>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-[#6b6189] font-medium hidden sm:block">View:</span>
                                <button className="p-2 rounded hover:bg-gray-100 text-primary bg-primary/5">
                                    <span className="material-symbols-outlined text-lg">table_rows</span>
                                </button>
                                <button className="p-2 rounded hover:bg-gray-100 text-[#6b6189]">
                                    <span className="material-symbols-outlined text-lg">grid_view</span>
                                </button>
                            </div>
                        </div>
                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-[#dedbe6]">
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#6b6189] w-[35%]">User</th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#6b6189] w-[15%]">Role</th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#6b6189] w-[15%]">Status</th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#6b6189] w-[20%]">Projects</th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#6b6189] w-[15%] text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#dedbe6]">
                                    {users?.map((item, index) => {
                                        return (
                                            <tr key={index} className="hover:bg-gray-50 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-white shadow-sm" data-alt="Portrait of Jane Doe" style={{ backgroundImage: `url(${item.image})` }}></div>
                                                        <div className="flex flex-col">
                                                            <span className="text-[#131118] text-sm font-semibold">{item.firstName} {item.lastName}</span>
                                                            <span className="text-[#6b6189] text-xs">{item.email}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center rounded-md bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 capitalize">{item.role}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="relative flex h-2.5 w-2.5">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                                        </span>
                                                        <span className="text-sm font-medium text-[#131118]">Active</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex -space-x-2 overflow-hidden">
                                                            <div className="inline-block size-6 rounded-full ring-2 ring-white bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600">P1</div>
                                                            <div className="inline-block size-6 rounded-full ring-2 ring-white bg-pink-100 flex items-center justify-center text-[10px] font-bold text-pink-600">P2</div>
                                                            <div className="inline-block size-6 rounded-full ring-2 ring-white bg-orange-100 flex items-center justify-center text-[10px] font-bold text-orange-600">P3</div>
                                                        </div>
                                                        <span className="text-xs text-[#6b6189] font-medium">+9 others</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="p-1.5 rounded-md text-[#6b6189] hover:text-primary hover:bg-primary/5 transition-colors" title="Edit">
                                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                                        </button>
                                                        <button className="p-1.5 rounded-md text-[#6b6189] hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete">
                                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination Footer */}
                        <div className="flex items-center justify-between border-t border-[#dedbe6] px-6 py-4 bg-gray-50/50">
                            <p className="text-sm text-[#6b6189]">
                                Showing <span className="font-medium text-[#131118]">1</span> to <span className="font-medium text-[#131118]">6</span> of <span className="font-medium text-[#131118]">45</span> results
                            </p>
                            <div className="flex items-center gap-2">
                                <button className="flex items-center justify-center rounded-lg border border-[#dedbe6] bg-white px-3 py-1.5 text-sm font-medium text-[#131118] hover:bg-gray-50 disabled:opacity-50 transition-colors">
                                    Previous
                                </button>
                                <button className="flex items-center justify-center rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
                                    1
                                </button>
                                <button className="flex items-center justify-center rounded-lg border border-[#dedbe6] bg-white px-3 py-1.5 text-sm font-medium text-[#131118] hover:bg-gray-50 transition-colors">
                                    2
                                </button>
                                <button className="flex items-center justify-center rounded-lg border border-[#dedbe6] bg-white px-3 py-1.5 text-sm font-medium text-[#131118] hover:bg-gray-50 transition-colors">
                                    3
                                </button>
                                <span className="text-[#6b6189] px-1">...</span>
                                <button className="flex items-center justify-center rounded-lg border border-[#dedbe6] bg-white px-3 py-1.5 text-sm font-medium text-[#131118] hover:bg-gray-50 transition-colors">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default TeamMembers;