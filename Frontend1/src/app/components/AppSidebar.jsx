
















'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import {
  SearchIcon,
  ResearchIcon,
  CpuIcon,
  PaperclipIcon,
  MicIcon,
  AudioLinesIcon,
  ArrowRightIcon,
  CompassIcon,
  LibraryIcon,
  LogInIcon,
  UserPlusIcon,
  LogOutIcon
} from './Icons';

const mainNavOptions = [
  { title: "Home", icon: SearchIcon, path: "/" },
  { title: "Discover", icon: CompassIcon, path: "/discover" },
  { title: "Tools", icon: LibraryIcon, path: "/tools" },
];

export const AppSidebar = () => {
  const [activePath, setActivePath] = useState('/');
  const { isAuthenticated, logout } = useAuth();

  return (
    <aside className="w-72 bg-white border-r shadow-lg flex flex-col qai-sidebar">
      <header className="p-6 flex flex-col items-center border-b border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900">
          Query<span className="text-blue-600">AI</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">Your AI Powered Search-Engine</p>
      </header>

      <nav className="flex-1 p-6 flex flex-col gap-3">
        {mainNavOptions.map((item) => {
          const isActive = activePath === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              href={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-50 text-blue-600 border-l-4 border-blue-500 shadow-sm"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              }`}
              onClick={() => setActivePath(item.path)}
            >
              <Icon className="h-6 w-6" />
              {item.title}
            </Link>
          );
        })}

        {isAuthenticated && (
          <Link
            href="/dashboard"
            className={`flex items-center gap-4 px-4 py-3 rounded-lg text-lg font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-all duration-200 ${
              activePath === '/dashboard' ? "bg-blue-50 text-blue-600 border-l-4 border-blue-500 shadow-sm" : ""
            }`}
            onClick={() => setActivePath('/dashboard')}
          >
            <LibraryIcon className="h-6 w-6" />
            Dashboard
          </Link>
        )}
      </nav>

      <div className="px-6 mt-auto">
        {!isAuthenticated ? (
          <>
            <Link
              href="/register"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
            >
              <UserPlusIcon className="h-6 w-6" />
              Sign Up
            </Link>

            <Link
              href="/login"
              className="w-full flex items-center justify-center gap-2 mt-3 px-6 py-3 rounded-lg text-lg font-semibold text-blue-600 border border-blue-200 hover:bg-blue-50 transition-all"
            >
              <LogInIcon className="h-5 w-5" />
              Login
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-lg font-semibold text-gray-700 border border-gray-200 hover:bg-gray-100 transition-all"
          >
            <LogOutIcon className="h-6 w-6" />
            Sign Out
          </button>
        )}
      </div>

      <footer className="p-6 border-t text-sm text-gray-400 text-center">
        © 2025 QueryAI
      </footer>
    </aside>
  );
};


















