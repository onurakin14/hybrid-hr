"use client"
import { fetchUserById, User } from "@/lib/features/users/usersSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function UserDetail() {

    const { id } = useParams();
    const dispatch = useAppDispatch();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        dispatch(fetchUserById(Number(id))).then(res => {
            const data = res.payload as User; setUser(data);
        }).catch(console.error);
    }, []);

    return (
        <React.Fragment>
            <div className="flex-1 max-w-[1440px] overflow-y-auto w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 mb-6 text-sm">
                    <a className="text-[#6b6189] hover:text-primary font-medium" href="#">Home</a>
                    <span className="text-[#9ca3af] material-symbols-outlined text-[16px]">chevron_right</span>
                    <a className="text-[#6b6189] hover:text-primary font-medium" href="#">Employees</a>
                    <span className="text-[#9ca3af] material-symbols-outlined text-[16px]">chevron_right</span>
                    <span className="text-[#6b6189] font-semibold">{user?.firstName} {user?.lastName}</span>
                </div>
                {/* Profile Header Card */}
                <div className="bg-white rounded-xl shadow-card p-6 mb-8 border border-[#e5e7eb]">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                            <div className="relative">
                                <div
                                    className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-cover bg-center border-4 border-white shadow-md"
                                    data-alt="Large profile photo of Alex Morgan"
                                    style={{ backgroundImage: `url(${user?.image})` }}>
                                </div>
                                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white" title="Online"></div>
                            </div>
                            <div className="text-center md:text-left pt-2">
                                <h1 className="text-2xl md:text-3xl font-bold text-[#131118] mb-1">{user?.firstName} {user?.lastName}</h1>
                                <p className="text-[#6b6189] font-medium text-lg mb-2">{user?.company.title}</p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-[#6b6189]">
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[18px]">location_on</span>
                                        {user?.company.address.state}, {user?.company.address.stateCode}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[18px]">badge</span>
                                        EMP-{user?.ein}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[18px]">schedule</span>
                                        Local Time: 10:42 AM
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto mt-2 md:mt-0">
                            <button className="flex-1 md:flex-none h-10 px-5 rounded-lg border border-[#e5e7eb] bg-white text-[#131118] font-semibold text-sm hover:bg-[#f9fafb] transition-colors flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-[20px]">mail</span>
                                Message
                            </button>
                            <button className="flex-1 md:flex-none h-10 px-5 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                Edit Profile
                            </button>
                            <button className="h-10 w-10 rounded-lg border border-[#e5e7eb] bg-white text-[#131118] flex items-center justify-center hover:bg-[#f9fafb]">
                                <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column (Stats & Projects) */}
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        {/* Stats Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* Stat Card 1 */}
                            <div className="bg-white p-6 rounded-xl border border-[#e5e7eb] shadow-card flex flex-col gap-3 group hover:border-primary/30 transition-colors">
                                <div className="flex items-center justify-between">
                                    <span className="text-[#6b6189] text-sm font-medium">Active Tasks</span>
                                    <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
                                    </span>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-[#131118]">12</span>
                                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+2 this week</span>
                                </div>
                            </div>
                            {/* Stat Card 2 */}
                            <div className="bg-white p-6 rounded-xl border border-[#e5e7eb] shadow-card flex flex-col gap-3 group hover:border-primary/30 transition-colors">
                                <div className="flex items-center justify-between">
                                    <span className="text-[#6b6189] text-sm font-medium">On-time Completion</span>
                                    <span className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[20px]">timer_off</span>
                                    </span>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-[#131118]">95%</span>
                                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+5% vs avg</span>
                                </div>
                            </div>
                            {/* Stat Card 3 */}
                            <div className="bg-white p-6 rounded-xl border border-[#e5e7eb] shadow-card flex flex-col gap-3 group hover:border-primary/30 transition-colors">
                                <div className="flex items-center justify-between">
                                    <span className="text-[#6b6189] text-sm font-medium">Hours Logged</span>
                                    <span className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[20px]">history</span>
                                    </span>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-[#131118]">1,240</span>
                                    <span className="text-xs font-medium text-[#6b6189]">Total YTD</span>
                                </div>
                            </div>
                        </div>
                        {/* Projects Table Section */}
                        <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-card overflow-hidden">
                            <div className="px-6 py-5 border-b border-[#f1f0f4] flex items-center justify-between">
                                <h3 className="text-lg font-bold text-[#131118]">Assigned Projects</h3>
                                <div className="flex gap-2">
                                    <button className="p-2 text-[#6b6189] hover:bg-[#f1f0f4] rounded-lg transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">filter_list</span>
                                    </button>
                                    <button className="px-3 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors">
                                        View All
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#fcfcfd] text-[#6b6189] text-xs uppercase tracking-wider font-semibold border-b border-[#f1f0f4]">
                                            <th className="px-6 py-4">Project Name</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Progress</th>
                                            <th className="px-6 py-4">Team</th>
                                            <th className="px-6 py-4 text-right">Due Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#f1f0f4]">
                                        <tr className="group hover:bg-[#f9fafb] transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-primary">
                                                        <span className="material-symbols-outlined">rocket_launch</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-[#131118] text-sm">Q3 Marketing Campaign</p>
                                                        <p className="text-xs text-[#6b6189]">Marketing Dept</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                    In Progress
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 min-w-[140px]">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 h-2 bg-[#f1f0f4] rounded-full overflow-hidden">
                                                        <div className="h-full bg-primary rounded-full w-[75%]"></div>
                                                    </div>
                                                    <span className="text-xs font-medium text-[#6b6189]">75%</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex -space-x-2">
                                                    <div
                                                        className="w-7 h-7 rounded-full border-2 border-white bg-cover"
                                                        data-alt="Team member 1"
                                                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCqxYgpFlS4lmEPkcrjnBDeSkc3-Dp65Y9-vKxwJTYjkmkzoXVicH4Qvor4NKyoI9NeLC8igFDzqiLA8Upt34rMysML8aSSMDxiTiZTv5xPH0jygK4ctcdpTpJkS7AIUi24GorPwwhgPOm5IIWNcECvbHykAAZdVP5uw4kQ2MDkU-gNrab2mhbPXKYwdHrys0NA611O6Z99wRPXcbj_WVUA-q-jLABE8-9dmUVKiWJGxB36xRck37ek3XzuSSFrVpeZzAwMjMIphw")' }}></div>
                                                    <div
                                                        className="w-7 h-7 rounded-full border-2 border-white bg-cover"
                                                        data-alt="Team member 2"
                                                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBI0W2vH4VqLkmyORCijH4tVMQl48dT-UynxlYpzAplPmJxZbXFzQeUAxv8NA4TqcqraqH7OLWAxq_QoN4HxNEohtKV7_sLjRUIcnB-RXyjz2owF53FIZYN2wPFivMte26oiFxp2FS9atuxp3nF2k0i9BSuasjBq7_h5Oku_SMwzWp4CvXggooVyLmW59DIcPfYBXpDLbYOg1b01rk9yYpv7ha3oJyJuOvQr9qXwR5HLdD76wJVg6fmOuhRNAiGcl6QFo3GNFtSvg")' }}></div>
                                                    <div className="w-7 h-7 rounded-full border-2 border-white bg-[#f1f0f4] flex items-center justify-center text-[10px] font-bold text-[#6b6189]">+2</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm text-[#131118] font-medium">
                                                Oct 24, 2023
                                            </td>
                                        </tr>
                                        <tr className="group hover:bg-[#f9fafb] transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                                                        <span className="material-symbols-outlined">smartphone</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-[#131118] text-sm">Mobile App Redesign</p>
                                                        <p className="text-xs text-[#6b6189]">Product Team</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                                                    Review
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 min-w-[140px]">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 h-2 bg-[#f1f0f4] rounded-full overflow-hidden">
                                                        <div className="h-full bg-orange-500 rounded-full w-[90%]"></div>
                                                    </div>
                                                    <span className="text-xs font-medium text-[#6b6189]">90%</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex -space-x-2">
                                                    <div
                                                        className="w-7 h-7 rounded-full border-2 border-white bg-cover"
                                                        data-alt="Team member 3"
                                                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBEhubh0t87VglimRgY0_Lh1_OxZErrYOjZQqPhPjrdmUjHBB0bLdEz9MzdMvRdwFdtFerjJ7unztbUJAo7l9JXe5LZTjMLQ4zpucjx0NWwLJCV-uf0ecgMoBsjMaFxRqHCSoFsDObKwprCmLVirSo2E8CMBECOM4Z7Ilm2FZXbZncb_31vKgc5j4BrOEErSCwiqvcEULMImCl8eYG8E6vpu0c_SMcxfgwh5vKEizgE7VbCA6Hd_oBQMlpwwKfQsng7xH7r5etoSw")' }}></div>
                                                    <div
                                                        className="w-7 h-7 rounded-full border-2 border-white bg-cover"
                                                        data-alt="Team member 4"
                                                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAP7ergofWaTc7LHXelpYBXb46F1m88ugaFyJaYxc9rU6q3RS_3nKjgGabhDKyTlNQslftD43etk8gZ04TlGQoBiuSflzKe-_Cqp96ojod5KCNdU-y_-XCal4a6YclD9k33GFgLT6SD2imd1dBNhv5Q8OxgiSGbrA69qim9XGuD3arRqFgIlCpSs8nO3JpMqC9TYag6ng7qy_ECSbH_sflP5-0N7EAMIObE5Q1p-5P80IXwWyQmFdZtXGBxIFk-BcYgQ69Rs-kaag")' }}></div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm text-[#131118] font-medium">
                                                Nov 02, 2023
                                            </td>
                                        </tr>
                                        <tr className="group hover:bg-[#f9fafb] transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                                                        <span className="material-symbols-outlined">dataset</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-[#131118] text-sm">Internal Dashboard</p>
                                                        <p className="text-xs text-[#6b6189]">Engineering</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                                    Planning
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 min-w-[140px]">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 h-2 bg-[#f1f0f4] rounded-full overflow-hidden">
                                                        <div className="h-full bg-gray-400 rounded-full w-[15%]"></div>
                                                    </div>
                                                    <span className="text-xs font-medium text-[#6b6189]">15%</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex -space-x-2">
                                                    <div
                                                        className="w-7 h-7 rounded-full border-2 border-white bg-cover"
                                                        data-alt="Team member 5"
                                                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDMriolo0rQXzyVEgupJ1MKUmBcMUPpAy1Lqfz2wNkhH20E_AeKFqaV8S-Hk4rKOtOrc3fPG9A5N41OL7wJ9SejkQxlvnp7Uoq5wBfNuYnfWQPl2kG8hzRfJR3GGvNE8i2jPYWx8hoANgjcj6shPhoR1dYDCVOdlMa-iFE1OZLA4Dhpj2LahyZLPBayWeN_JnJn8ywL35E2jKUlTh77RImoBopBe9mGmnhj-0Gzvz1Awr_85azbTtO87t3_rgd8DDnfKBHQPadoCw")' }}></div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm text-[#131118] font-medium">
                                                Dec 15, 2023
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* Right Column (Sidebar) */}
                    <div className="flex flex-col gap-8">
                        {/* Contact Information */}
                        <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-card p-6">
                            <h3 className="text-lg font-bold text-[#131118] mb-6 border-b border-[#f1f0f4] pb-4">Contact Information</h3>
                            <div className="flex flex-col gap-5">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-[#f6f6f8] flex items-center justify-center text-[#6b6189] shrink-0">
                                        <span className="material-symbols-outlined">mail</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-[#6b6189] uppercase tracking-wide">Email Address</p>
                                        <a className="text-[#131118] font-medium hover:text-primary transition-colors" href={`mailto:${user?.email}`}>{user?.email}</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-[#f6f6f8] flex items-center justify-center text-[#6b6189] shrink-0">
                                        <span className="material-symbols-outlined">call</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-[#6b6189] uppercase tracking-wide">Phone Number</p>
                                        <a className="text-[#131118] font-medium hover:text-primary transition-colors" href="tel:+15550123456">{user?.phone}</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-[#f6f6f8] flex items-center justify-center text-[#6b6189] shrink-0">
                                        <span className="material-symbols-outlined">chat</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-[#6b6189] uppercase tracking-wide">Slack Handle</p>
                                        <p className="text-[#131118] font-medium">@{user?.username}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* HR Details */}
                        <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-card p-6">
                            <h3 className="text-lg font-bold text-[#131118] mb-6 border-b border-[#f1f0f4] pb-4">HR Details</h3>
                            <dl className="flex flex-col gap-4">
                                <div className="flex justify-between items-center">
                                    <dt className="text-[#6b6189] text-sm">Department</dt>
                                    <dd className="text-[#131118] font-medium text-sm">{user?.company.department}</dd>
                                </div>
                                <div className="flex justify-between items-center">
                                    <dt className="text-[#6b6189] text-sm">Manager</dt>
                                    <dd className="flex items-center gap-2">
                                        <div
                                            className="w-5 h-5 rounded-full bg-cover"
                                            data-alt="Manager avatar"
                                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBlj0R3EXYQbz3prPJXymxwiLvvEipz58nbpv9RtA_FksvNVJBTrbm9Ebtc87X15VPcrLm7GzAXs_BgOxHDN7hKuenuNI1zcKxOTy2mwCVVwzePjnQUcMt_9UcHk62jA6wYvYaPh4__v5U4XuKkjvCzaQvPu7Oesj5j_DfCVq-vG6D3z0SAUFBVxS9Q8tc0_oaTEcf2ZbTxNQucdkWi3ahMd_9LzNzLlhRDZe8edVJ7iVxf00OrF1sucVRu4gslH0_MK_gamgif8w")' }}></div>
                                        <span className="text-[#131118] font-medium text-sm">Sarah Chen</span>
                                    </dd>
                                </div>
                                <div className="flex justify-between items-center">
                                    <dt className="text-[#6b6189] text-sm">Date Hired</dt>
                                    <dd className="text-[#131118] font-medium text-sm">Aug 14, 2021</dd>
                                </div>
                                <div className="flex justify-between items-center">
                                    <dt className="text-[#6b6189] text-sm">Employment Type</dt>
                                    <dd className="text-[#131118] font-medium text-sm">Full-Time</dd>
                                </div>
                            </dl>
                        </div>
                        {/* Skills */}
                        <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-card p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-[#131118]">Skills</h3>
                                <button className="text-primary hover:bg-primary/10 rounded p-1 transition-colors">
                                    <span className="material-symbols-outlined text-[18px]">add</span>
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-[#f1f0f4] text-[#131118] text-sm font-medium rounded-lg">Figma</span>
                                <span className="px-3 py-1 bg-[#f1f0f4] text-[#131118] text-sm font-medium rounded-lg">React</span>
                                <span className="px-3 py-1 bg-[#f1f0f4] text-[#131118] text-sm font-medium rounded-lg">UI/UX</span>
                                <span className="px-3 py-1 bg-[#f1f0f4] text-[#131118] text-sm font-medium rounded-lg">Prototyping</span>
                                <span className="px-3 py-1 bg-[#f1f0f4] text-[#131118] text-sm font-medium rounded-lg">Team Leadership</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default UserDetail;