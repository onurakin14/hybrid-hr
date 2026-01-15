"use client"
import { loginUser } from "../../lib/features/users/usersSlice";
import { useAppDispatch } from "../../lib/hooks";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Login() {

    const router = useRouter();
    const dispatch = useAppDispatch();

    const [username, setUsername] = useState("emilys");
    const [password, setPassword] = useState("emilyspass");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // Form default davranışını engelle

        dispatch(loginUser({ username, password })).then(res => {
            if (!res.payload.message) router.push("/admin/dashboard");
            else alert(res.payload.message);
        }).catch(err => console.error(err));
    }

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
                                type="submit">
                                Sign In
                            </button>
                        </form>
                        {/* <!-- SSO Divider --> */}
                        <div className="relative mt-8">
                            <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-500">Or continue with</span>
                            </div>
                        </div>
                        {/* <!-- SSO Buttons --> */}
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-2.5 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors" type="button">
                                <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                                </svg>
                                Google
                            </button>
                            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-2.5 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors" type="button">
                                <svg aria-hidden="true" className="h-5 w-5 text-[#131118]" fill="currentColor" viewBox="0 0 24 24">
                                    <path clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fillRule="evenodd"></path>
                                </svg>
                                GitHub
                            </button>
                        </div>
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
