








'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await register(email, password);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen relative bg-gradient-to-br from-blue-900 via-black to-blue-800 overflow-hidden">
            <div className="absolute inset-0 animate-bgSlow"></div>

            <div className="relative z-10 w-full max-w-xl p-12 bg-white/5 backdrop-blur-4xl rounded-4xl shadow-[0_0_60px_rgba(0,0,255,0.5)] border border-blue-500/20 space-y-8">
                <h1 className="text-4xl md:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-text">
                    Create your  Account
                </h1>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="relative">
                        <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                            className="w-full px-6 py-4 border border-white/20 rounded-2xl bg-gradient-to-tr from-white/5 to-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:border-blue-400 transition-all text-lg"
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                            className="w-full px-6 py-4 border border-white/20 rounded-2xl bg-gradient-to-tr from-white/5 to-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:border-blue-400 transition-all text-lg"
                        />
                    </div>

                    {error && <p className="text-sm text-red-400">{error}</p>}

                    <button
                        type="submit"
                        className="w-full px-6 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-all flex justify-center items-center"
                        disabled={loading}
                    >
                        {loading ? <LoadingDots /> : "Sign Up"}
                    </button>
                </form>

                <p className="text-sm text-center text-white/70">
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium text-blue-400 hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}

const LoadingDots = () => (
    <div className="flex space-x-2">
        <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-white rounded-full animate-bounce animation-delay-200"></span>
        <span className="w-2 h-2 bg-white rounded-full animate-bounce animation-delay-400"></span>
    </div>
);
