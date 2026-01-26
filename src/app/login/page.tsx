"use client"
import { loginUser, AuthUser } from "../../lib/features/users/authSlice";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Login() {

    const router = useRouter();
    const dispatch = useAppDispatch();
    const { user, loading, error } = useAppSelector((state) => state.auth);

    const [username, setUsername] = useState("emilys");
    const [password, setPassword] = useState("emilyspass");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginUser({ username, password }));
    };

    useEffect(() => {
        if (!loading && user) {
            localStorage.setItem("user", JSON.stringify(user));
            router.push("/admin/dashboard");
        }
    }, [user, loading, router]);

    return (
        <React.Fragment>
            <div className="font-display bg-background-light text-[#131118] min-h-screen flex flex-col justify-center items-center p-4">
                {/* < !--Main Container-- > */}
                <main className="w-full max-w-[440px] flex flex-col items-center">
                    {/* <!-- Logo Section --> */}
                    <div className="mb-8 flex flex-col items-center">
                        <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-white text-2xl">grid_view</span>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-[#131118]">Nexus Enterprise</h1>
                    </div>
                    {/* <!-- Login Card --> */}
                    <div className="w-full bg-white rounded-lg shadow-soft border border-gray-100 p-8 sm:p-10">
                        <div className="mb-8 text-center">
                            <h2 className="text-xl font-semibold text-[#131118] mb-2">Log in to your account</h2>
                            <p className="text-sm text-gray-500">Welcome back! Please enter your details.</p>
                        </div>
                        <form className="space-y-5" onSubmit={handleLogin}>
                            {/* <!-- Email Field --> */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-[#131118]" htmlFor="email">Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-gray-400 text-[20px]">mail</span>
                                    </div>
                                    <input className="block w-full border rounded-lg border-gray-200 bg-white pl-10 pr-3 py-3 text-sm placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                        id="email" name="email" placeholder="name@company.com" type="text" defaultValue={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                            </div>
                            {/* <!-- Password Field --> */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-[#131118]" htmlFor="password">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-gray-400 text-[20px]">lock</span>
                                    </div>
                                    <input className="block w-full border rounded-lg border-gray-200 bg-white pl-10 pr-3 py-3 text-sm placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                        id="password" name="password" placeholder="••••••••" type="password" defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>
                            {/* <!-- Remember Me & Forgot Password --> */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input className="h-4 w-4 border rounded border-gray-300 accent-[var(--primary)]" id="remember-me" name="remember-me" type="checkbox" defaultChecked />
                                    <label className="ml-2 block text-sm text-gray-500" htmlFor="remember-me">Remember me</label>
                                </div>
                                <div className="text-sm">
                                    <a className="font-medium text-primary hover:text-primary-hover transition-colors" href="#">Forgot password?</a>
                                </div>
                            </div>
                            {/* <!-- Submit Button --> */}
                            <button className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200"
                                type="submit" disabled={loading}>
                                {loading ? "Loading..." : "Sign In"}
                            </button>
                        </form>
                        {error && <p className="text-center text-red-500 mt-2">{error}</p>}
                    </div>
                    {/* <!-- Footer --> */}
                    <p className="mt-8 text-center text-sm text-gray-500">
                        New here?
                        <a className="font-semibold leading-6 text-primary hover:text-primary-hover transition-colors ms-1" href="#">Create an account</a>
                    </p>
                    {/* <!-- Small Helper Text for Context --> */}
                    <div className="mt-12 flex items-center gap-4 text-xs text-gray-400">
                        <a className="hover:text-gray-500 transition-colors" href="#">Privacy Policy</a>
                        <span>•</span>
                        <a className="hover:text-gray-500 transition-colors" href="#">Terms of Service</a>
                        <span>•</span>
                        <a className="hover:text-gray-500 transition-colors" href="#">Help Center</a>
                    </div>
                </main>
            </div>
        </React.Fragment>
    );
}

export default Login;
