import React from "react";

function Recruitment() {
  return (
    <React.Fragment>
      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
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
            {/* Card 1 */}
            <div className="flex flex-col bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-[#111318] text-lg font-bold leading-tight group-hover:text-primary transition-colors">Senior UX Designer</h3>
                  <p className="text-[#616f89] text-sm mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">domain</span> Product Team
                  </p>
                </div>
                <button className="size-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#616f89] transition-colors">
                  <span className="material-symbols-outlined">more_horiz</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1 rounded-md font-semibold border border-indigo-100">Full-time</span>
                <span className="bg-gray-50 text-gray-600 text-xs px-2.5 py-1 rounded-md font-medium border border-gray-100 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">location_on</span> Remote
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
            {/* Card 2 */}
            <div className="flex flex-col bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-[#111318] text-lg font-bold leading-tight group-hover:text-primary transition-colors">Backend Engineer</h3>
                  <p className="text-[#616f89] text-sm mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">domain</span> Engineering
                  </p>
                </div>
                <button className="size-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#616f89] transition-colors">
                  <span className="material-symbols-outlined">more_horiz</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1 rounded-md font-semibold border border-indigo-100">Full-time</span>
                <span className="bg-gray-50 text-gray-600 text-xs px-2.5 py-1 rounded-md font-medium border border-gray-100 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">location_on</span> New York, NY
                </span>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#9CA3AF]">Candidates</span>
                  <div className="flex -space-x-2 mt-1.5 pl-1">
                    <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-200 bg-cover" data-alt="Candidate Avatar 3" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAYcV6yseZF_WyjgrN50h8FmgBQ_ZJ1yMqGJf7AJbfslJGn3Y1fqg_wo6pXvJgdF0b07dqnPy-zdZIqMI31gl8lgH0wv0v8VTtXP1HH8Jk3pB2EXa8c6y-oqwtWxDxSaXkd7Xp54ZuuQJXxWwQRFesI98a6MCsofK_m0307eoEs9aguN0hf93uGdB1Xb-GBajkhDwunH798DGzmduWkxj7kCSgPRPfnG4qoEmFdLPjxsqCt4auy70-s7vu6Sldm9RTzY_E1OtsT5Q')" }}></div>
                    <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] text-gray-600 font-bold">+12</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#9CA3AF]">Openings</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    <span className="text-sm font-bold text-[#111318]">1 Open</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Card 3 */}
            <div className="flex flex-col bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all group cursor-pointer relative overflow-hidden opacity-75 hover:opacity-100">
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
            </div>
            {/* Card 4 */}
            <div className="flex flex-col bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-[#111318] text-lg font-bold leading-tight group-hover:text-primary transition-colors">Marketing Specialist</h3>
                  <p className="text-[#616f89] text-sm mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">domain</span> Marketing
                  </p>
                </div>
                <button className="size-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#616f89] transition-colors">
                  <span className="material-symbols-outlined">more_horiz</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1 rounded-md font-semibold border border-indigo-100">Full-time</span>
                <span className="bg-gray-50 text-gray-600 text-xs px-2.5 py-1 rounded-md font-medium border border-gray-100 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">location_on</span> Austin, TX
                </span>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#9CA3AF]">Candidates</span>
                  <div className="flex -space-x-2 mt-1.5 pl-1">
                    <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-200 bg-cover" data-alt="Candidate Avatar 4" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBbh3Q6Zl56R84z43fMnyr36NMRNZEQiC3oShiL38AqEYvSiIWQqQWqcIW3fgfzss8DyrL8ioE_af-0GzoqwQh2e2Tz1YqvcH9Hk4z3ZgMMHJ012Z7f9YmxZajYNDt0XelpMir9GONZu4UoM4MfKsqrR9JCeNYHOJc9qgLXNd6CJLtOU3VjKmTg1Tpb9vwfhHsVYHgQj7wJc9p4nkpelZDztVfkxNuT4bBh2NRhRowTM1OJT1m3f_Zk0BGEA_CpN4H8FIGKKJLuvQ')" }}></div>
                    <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-200 bg-cover" data-alt="Candidate Avatar 5" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCGKCv58enqtAJ2ZEqPi92AMQrKAIfOsbT-0eb-lZQnEUR7f2oFKYPG4aydeYmPnV3UHF2ps7QOtIEntS69gMdDEXerVcij4VmMYvDogRF4eUptkVNmZwvzGWcVEan1xVWmnsonndWRSUEBe83W0hIPA2nH5D1W5As0jLgFPFTdA4Pqafg-kCWQvpIwGvOwbit7jAJQdfVPY1Lkl_NW0D3wxn8hiivm_F8Cxzx8whv150Vv0SzUuCH1teZ55y2hRec5y5VfDdEkkA')" }}></div>
                    <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] text-gray-600 font-bold">+8</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#9CA3AF]">Openings</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    <span className="text-sm font-bold text-[#111318]">3 Open</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Card 5 */}
            <div className="flex flex-col bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-[#111318] text-lg font-bold leading-tight group-hover:text-primary transition-colors">Product Manager</h3>
                  <p className="text-[#616f89] text-sm mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">domain</span> Product
                  </p>
                </div>
                <button className="size-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#616f89] transition-colors">
                  <span className="material-symbols-outlined">more_horiz</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1 rounded-md font-semibold border border-indigo-100">Full-time</span>
                <span className="bg-gray-50 text-gray-600 text-xs px-2.5 py-1 rounded-md font-medium border border-gray-100 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">location_on</span> San Francisco
                </span>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#9CA3AF]">Candidates</span>
                  <div className="flex -space-x-2 mt-1.5 pl-1">
                    <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-200 bg-cover" data-alt="Candidate Avatar 6" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBKEQS1903AruKchN_GbHGMi00Ov604T06zDXxKJ6YZPzkvR9Fg94Il2bS7uRVPQBnxFTgyPCdtrQmp4uGNTtP47PmmfqA8lQzswjZgIA1d8CPg8KicJ3KwkOZaApQX_A1oFJwFclwU5Qpb2aP1I5V0ciLDD7LiCVVnSbmJM-Y78r1v3pp36LP1QZHmpJldRhSLZWH8QXUYgRSvyLvj2hSl_JzbsGo8ZR7BXJdFXvbQq_8EpylmE5MGY576WctVgau8vwjlJoP3Xw')" }}></div>
                    <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] text-gray-600 font-bold">+18</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#9CA3AF]">Openings</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    <span className="text-sm font-bold text-[#111318]">1 Open</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Card 6 */}
            <div className="flex flex-col bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-[#111318] text-lg font-bold leading-tight group-hover:text-primary transition-colors">Frontend Developer</h3>
                  <p className="text-[#616f89] text-sm mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">domain</span> Engineering
                  </p>
                </div>
                <button className="size-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#616f89] transition-colors">
                  <span className="material-symbols-outlined">more_horiz</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1 rounded-md font-semibold border border-indigo-100">Full-time</span>
                <span className="bg-gray-50 text-gray-600 text-xs px-2.5 py-1 rounded-md font-medium border border-gray-100 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">location_on</span> Remote
                </span>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#9CA3AF]">Candidates</span>
                  <div className="flex -space-x-2 mt-1.5 pl-1">
                    <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-200 bg-cover" data-alt="Candidate Avatar 7" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBqc3DiBkDocURGJvqBFPB5hcr1F5kfdUfFlHGmhd2vlDpek_4Gp-tlBFnIJnKhf_UW7mWw8MfhNBHycxkm4PIgAER-eCka63x1LP9aq1c0VdUfAzmneFPcQ-6xj0NNYDp8UDL4N3Y4I-eSRZo9mtvrwzoxptuDWUbwxKowsM2_OfvjtZTTjONxxZu-bKkcaSd4AOZylR9Wkrh2nL_WWPN-lkQY8jvxwMW3o6BqrgpyORlBL4LDCA0DinS6-GKwz8cfF-r4YbfZRA')" }}></div>
                    <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-200 bg-cover" data-alt="Candidate Avatar 8" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDtBm8ODwfvzakHSepYJsWA5VhB_ncu4YJVZgn_tF2vUrCysO1Twm_0PDtaUqgmcvnnHDy4H_WEMIOD-vkCdmMpf2j3wFjSbsDFyUXihzbw0RTbP47WYoo7hlCnuCSMhghcUJ-WUOJQhKqN3TNQ2fv7iRmsqh14M6ncgf8oaKfgocNHtNGH04I0ZFU3gq2haTBvY9ChdmrNcl6NifXhS1mMT2G_dCTQuqTYclpfZpbR8R2XLNmdohXhjbmHmUH5A6b8NDmUr-TeAA')" }}></div>
                    <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] text-gray-600 font-bold">+2</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#9CA3AF]">Openings</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    <span className="text-sm font-bold text-[#111318]">1 Open</span>
                  </div>
                </div>
              </div>
            </div>
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
      </main>
    </React.Fragment>
  );
}
export default Recruitment;
