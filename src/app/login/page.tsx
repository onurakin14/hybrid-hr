import React from "react";

function Login() {

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
                        <form className="space-y-5">
                            {/* <!-- Email Field --> */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-[#131118]" htmlFor="email">Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-gray-400 text-[20px]">mail</span>
                                    </div>
                                    <input className="block w-full border rounded-lg border-gray-200 bg-white pl-10 pr-3 py-3 text-sm placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary transition-colors" id="email" name="email" placeholder="name@company.com" required type="email" />
                                </div>
                            </div>
                            {/* <!-- Password Field --> */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-[#131118]" htmlFor="password">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-gray-400 text-[20px]">lock</span>
                                    </div>
                                    <input className="block w-full border rounded-lg border-gray-200 bg-white pl-10 pr-3 py-3 text-sm placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary transition-colors" id="password" name="password" placeholder="••••••••" required type="password" />
                                </div>
                            </div>
                            {/* <!-- Remember Me & Forgot Password --> */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input className="h-4 w-4 border rounded border-gray-300 text-primary focus:ring-primary" id="remember-me" name="remember-me" type="checkbox" />
                                    <label className="ml-2 block text-sm text-gray-500" htmlFor="remember-me">Remember me</label>
                                </div>
                                <div className="text-sm">
                                    <a className="font-medium text-primary hover:text-primary-hover transition-colors" href="#">Forgot password?</a>
                                </div>
                            </div>
                            {/* <!-- Submit Button --> */}
                            <button className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200" type="submit">
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
                                <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
                                    <path d="M12.0003 20.45c4.6667 0 8.4503-3.7836 8.4503-8.4503 0-.742-.0833-1.467-.2417-2.1666H12.0003v4.1002h4.7501c-.2083 1.1083-1.075 2.5333-2.6083 3.5583l-.024.1565 2.2227 1.723.154.0155c2.5166-2.3167 3.9666-5.725 3.9666-9.5534 0-.8917-.0917-1.7584-.25-2.5917H3.5503v16.9006h8.45Z" fill="#4285F4"></path>
                                    <path d="M3.55 12c0-1.2833.3083-2.4917.85-3.5667l-2.4833-1.925C.7 8.5 0 10.1917 0 12c0 1.8083.7 3.5 1.9167 4.9083l2.4833-1.925c-.5417-1.075-.85-2.2833-.85-3.5667Z" fill="#FBBC05"></path>
                                    <path d="M12 3.55c2.4 0 4.5667.85 6.2583 2.475l2.675-2.675C18.425 1.175 15.425 0 12 0 7.4333 0 3.4083 2.6167 1.4833 6.5083l2.4833 1.925C5.1667 5.5667 8.2917 3.55 12 3.55Z" fill="#EA4335"></path>
                                    <path d="M12 24c3.425 0 6.425-1.175 8.9333-3.3583l-2.3767-1.8791c-1.6333 1.0917-3.7917 1.6875-6.5566 1.6875-3.7083 0-6.8333-2.0167-8.0333-4.8833l-2.4833 1.925C3.4083 21.3833 7.4333 24 12 24Z" fill="#34A853"></path>
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
