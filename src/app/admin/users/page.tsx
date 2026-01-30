"use client"
import { createUser, fetchUsers, fetchUsersByPage, User } from "@/lib/features/users/usersSlice";
import { useAppDispatch } from "../../../lib/hooks";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Users() {

    const router = useRouter();
    const dispatch = useAppDispatch();

    const [users, setUsers] = useState<User[]>();
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);

    const [pageCount, setPageCount] = useState<number>(1);
    const [userCount, setUserCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [newUser, setNewUser] = useState<User>();
    const [isAddUserModalActive, setAddUserModalActive] = useState(false);

    useEffect(() => {
        dispatch(fetchUsers()).then(res => {
            const data = res.payload as User[];
            setUserCount(data.length);
            setPageCount(Math.ceil(data.length / limit));
        }).then(getUsers);
    }, [dispatch]);

    const getUsers = () => {
        dispatch(fetchUsersByPage({ limit, skip })).then(res => {
            const data = res.payload as User[]; setUsers(data);
        });
    }

    const handlePreviousPageButton = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setSkip(skip - limit);
            getUsers();
        }
    }

    const handleNextPageButton = () => {
        if (currentPage < pageCount) {
            setCurrentPage(currentPage + 1);
            setSkip(skip + limit);
            getUsers();
        }
    }

    useEffect(() => {
        setSkip((currentPage - 1) * limit);
        getUsers();
    }, [currentPage]);

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(pageCount, currentPage + 2);
    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    const handleUserFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewUser((data: any) => ({ ...data, [name]: value }));
    }

    const handleAddUser = () => {
        dispatch(createUser(newUser!)).then(res => {
            console.log(res.payload); setAddUserModalActive(false);
        }).catch(console.error);
    }

    if (isAddUserModalActive) {
        return (
            <React.Fragment>
                <div className="font-display bg-background-light overflow-hidden">
                    {/* Main Container simulating the app backdrop */}
                    <div className="relative flex h-screen w-full items-center justify-center p-4">
                        {/* Background Pattern/Mock Content to provide context */}
                        <div
                            className="absolute inset-0 z-0 opacity-40 pointer-events-none"
                            data-alt="Abstract dot pattern background"
                            style={{ backgroundImage: "radial-gradient(#4913ec 0.5px, transparent 0.5px), radial-gradient(#4913ec 0.5px, #f6f6f8 0.5px)", backgroundSize: "20px 20px", backgroundPosition: "0 0, 10px 10px" }}>
                        </div>
                        {/* Overlay Backdrop */}
                        <div className="absolute inset-0 z-10 bg-black/20 backdrop-blur-sm"></div>
                        {/* Modal Component */}
                        <div className="relative z-20 flex w-full max-w-[720px] flex-col rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                            {/* Header */}
                            <div className="flex items-start justify-between border-b border-[#dedbe6] p-6 pb-5">
                                <div className="flex flex-col gap-1 pr-8">
                                    <h3 className="text-2xl font-bold tracking-tight text-[#131118]">Add New User</h3>
                                    <p className="text-sm font-normal leading-normal text-[#6b6189]">
                                        Fill in the information below to add a new member to the team.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setAddUserModalActive(false)}
                                    className="group flex h-9 w-9 items-center justify-center rounded-lg text-[#6b6189] transition-colors hover:bg-[#f6f6f8] hover:text-[#131118]">
                                    <span className="material-symbols-outlined !text-[24px]" data-icon="close">close</span>
                                </button>
                            </div>
                            {/* Scrollable Content Area */}
                            <div className="flex flex-col gap-6 overflow-y-auto p-6 max-h-[70vh]">
                                {/* Row 1: Names */}
                                <div className="flex flex-col gap-6 md:flex-row">
                                    <label className="flex flex-1 flex-col gap-2">
                                        <span className="text-sm font-medium text-[#131118]">First Name</span>
                                        <input name="firstName" onChange={handleUserFormChange} className="h-12 w-full rounded-lg border border-[#dedbe6] bg-white px-4 text-base text-[#131118] placeholder:text-[#9ca3af] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Jane" type="text" />
                                    </label>
                                    <label className="flex flex-1 flex-col gap-2">
                                        <span className="text-sm font-medium text-[#131118]">Last Name</span>
                                        <input name="lastName" onChange={handleUserFormChange} className="h-12 w-full rounded-lg border border-[#dedbe6] bg-white px-4 text-base text-[#131118] placeholder:text-[#9ca3af] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Doe" type="text" />
                                    </label>
                                </div>
                                {/* Row 2: Email & Role */}
                                <div className="flex flex-col gap-6 md:flex-row">
                                    {/* Email uses 2/3 width on desktop */}
                                    <label className="flex flex-[2] flex-col gap-2">
                                        <span className="text-sm font-medium text-[#131118]">Email Address</span>
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] !text-[20px]">mail</span>
                                            <input name="email" onChange={handleUserFormChange} className="h-12 w-full rounded-lg border border-[#dedbe6] bg-white pl-10 pr-4 text-base text-[#131118] placeholder:text-[#9ca3af] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="jane.doe@company.com" type="email" />
                                        </div>
                                    </label>
                                    {/* Role uses 1/3 width */}
                                    <label className="flex flex-1 flex-col gap-2">
                                        <span className="text-sm font-medium text-[#131118]">Role</span>
                                        <div className="relative">
                                            <select name="role" onChange={handleUserFormChange} className="h-12 w-full appearance-none rounded-lg border border-[#dedbe6] bg-white px-4 pr-10 text-base text-[#131118] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                                                <option disabled value="">Select a role</option>
                                                <option value="admin">Administrator</option>
                                                <option value="manager">Manager</option>
                                                <option value="editor">Editor</option>
                                                <option value="viewer">Viewer</option>
                                            </select>
                                            <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6189]">expand_more</span>
                                        </div>
                                    </label>
                                </div>
                                {/* Row 3: Passwords */}
                                <div className="flex flex-col gap-6 md:flex-row">
                                    <label className="flex flex-1 flex-col gap-2">
                                        <span className="text-sm font-medium text-[#131118]">Password</span>
                                        <div className="relative">
                                            <input name="password" onChange={handleUserFormChange} className="h-12 w-full rounded-lg border border-[#dedbe6] bg-white px-4 pr-10 text-base text-[#131118] placeholder:text-[#9ca3af] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="••••••••" type="password" />
                                            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#4913ec] transition-colors">
                                                <span className="material-symbols-outlined !text-[20px]">visibility</span>
                                            </button>
                                        </div>
                                    </label>
                                    <label className="flex flex-1 flex-col gap-2">
                                        <span className="text-sm font-medium text-[#131118]">Confirm Password</span>
                                        <div className="relative">
                                            <input name="password" onChange={handleUserFormChange} className="h-12 w-full rounded-lg border border-[#dedbe6] bg-white px-4 pr-10 text-base text-[#131118] placeholder:text-[#9ca3af] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="••••••••" type="password" />
                                            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#4913ec] transition-colors">
                                                <span className="material-symbols-outlined !text-[20px]">visibility_off</span>
                                            </button>
                                        </div>
                                    </label>
                                </div>
                                {/* Helper text for password */}
                                <div className="flex items-center gap-2 text-xs text-[#6b6189]">
                                    <span className="material-symbols-outlined !text-[16px]">info</span>
                                    <p>Password must be at least 8 characters long and contain one symbol.</p>
                                </div>
                            </div>
                            {/* Footer */}
                            <div className="flex items-center justify-end gap-3 rounded-b-2xl bg-[#f6f6f8] p-6">
                                <button
                                    onClick={() => setAddUserModalActive(false)}
                                    className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center rounded-lg border border-[#dedbe6] bg-white px-4 text-sm font-semibold text-[#131118] shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200">
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleAddUser()}
                                    className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all hover:bg-[#3c0fc4] focus:outline-none focus:ring-2 focus:ring-[#4913ec] focus:ring-offset-2">
                                    <span className="material-symbols-outlined !text-[18px]">person_add</span>
                                    Create User
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

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
                            <button
                                onClick={() => setAddUserModalActive(true)}
                                className="flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white gap-2 pl-3 text-sm font-bold shadow-md hover:bg-primary/90 transition-all">
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
                                    {users && users.length > 0 ? (
                                        users.map((item, index) => (
                                            item?.id ? (
                                                <tr key={index} className="hover:bg-gray-50 transition-colors group">
                                                    <td className="px-6 py-4 cursor-pointer">
                                                        <Link href={`/admin/users/${item.id}`}>
                                                            <div className="flex items-center gap-4">
                                                                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-white shadow-sm" data-alt="Portrait of Jane Doe" style={{ backgroundImage: `url(${item.image})` }}></div>
                                                                <div className="flex flex-col">
                                                                    <span className="text-[#131118] text-sm font-semibold">{item.firstName} {item.lastName}</span>
                                                                    <span className="text-[#6b6189] text-xs">{item.email}</span>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset capitalize 
                                                        ${item.role == "admin" && "bg-purple-50 text-purple-700 ring-purple-700/10"}
                                                        ${item.role == "moderator" && "bg-blue-50 text-blue-700 ring-blue-700/10"}
                                                        ${item.role == "user" && "bg-gray-100 text-gray-600 ring-gray-500/10"}`}>
                                                            {item.role}
                                                        </span>
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
                                            ) : null
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="text-center py-4">
                                                Loading users...
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination Footer */}
                        <div className="flex items-center justify-between border-t border-[#dedbe6] px-6 py-4 bg-gray-50/50">
                            <p className="text-sm text-[#6b6189]">
                                Showing <span className="font-medium text-[#131118]">{(currentPage - 1) * limit + 1}</span> to <span className="font-medium text-[#131118]">{Math.min(currentPage * limit, userCount)}</span> of <span className="font-medium text-[#131118]">{userCount}</span> results
                            </p>
                            <div className="flex items-center gap-2">
                                <button onClick={handlePreviousPageButton} className="flex items-center justify-center rounded-lg border border-[#dedbe6] bg-white px-3 py-1.5 text-sm font-medium text-[#131118] hover:bg-gray-50 disabled:opacity-50 transition-colors">
                                    Previous
                                </button>
                                {startPage > 1 && <span className="text-[#6b6189] px-1">...</span>}
                                {pages.map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`flex items-center justify-center rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${page === currentPage
                                            ? 'bg-primary text-white hover:bg-primary/90'
                                            : 'border border-[#dedbe6] bg-white text-[#131118] hover:bg-gray-50'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                {endPage < pageCount && <span className="text-[#6b6189] px-1">...</span>}
                                <button onClick={handleNextPageButton} className="flex items-center justify-center rounded-lg border border-[#dedbe6] bg-white px-3 py-1.5 text-sm font-medium text-[#131118] hover:bg-gray-50 transition-colors">
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

export default Users;