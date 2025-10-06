





// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// const EditIcon = (props) => (
//     <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M17 3a2.85 2.85 0 0 0-4 0L7 13v4h4L21 7a2.85 2.85 0 0 0 0-4Z" />
//         <path d="m15 6 2 2" />
//     </svg>
// );

// const EditNameModal = ({ isOpen, onClose, currentName, onSave }) => {
//     const [name, setName] = useState(currentName);

//     if (!isOpen) return null;

//     const handleSave = () => {
//         onSave(name);
//         onClose();
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//             <div className="bg-gray-800 border border-blue-500 rounded-lg shadow-2xl p-6 w-full max-w-sm">
//                 <h3 className="text-xl font-bold text-white mb-4">Change Display Name</h3>
//                 <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <div className="flex justify-end space-x-3 mt-4">
//                     <button onClick={onClose} className="px-4 py-2 text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600">Cancel</button>
//                     <button onClick={handleSave} className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">Save</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default function DashboardPage() {
//     const { isAuthenticated, user, logout, loading: authLoading } = useAuth();
//     const router = useRouter();

//     const [history, setHistory] = useState([]);
//     const [historyLoading, setHistoryLoading] = useState(true);
//     const [historyError, setHistoryError] = useState(null);
//     const [displayName, setDisplayName] = useState('');
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     useEffect(() => {
//         if (!authLoading && !isAuthenticated) {
//             router.push('/login');
//         }
//     }, [authLoading, isAuthenticated, router]);

//     useEffect(() => {
//         if (user && user.email) {
//             const savedName = localStorage.getItem('queryai-displayName');
//             if (savedName) {
//                 setDisplayName(savedName);
//             } else {
//                 setDisplayName(user.email.split('@')[0]);
//             }
//         }
//     }, [user]);

//     useEffect(() => {
//         const fetchHistory = async () => {
//             if (!isAuthenticated) {
//                 setHistoryLoading(false);
//                 return;
//             }

//             const token = localStorage.getItem('token');
//             if (!token) {
//                 setHistoryLoading(false);
//                 setHistoryError("Authentication token not found.");
//                 return;
//             }

//             try {
//                 const response = await fetch('http://localhost:5000/api/history', {
//                     headers: {
//                         'x-auth-token': token,
//                     },
//                 });
//                 if (!response.ok) {
//                     const errorData = await response.json();
//                     throw new Error(errorData.message || 'Failed to fetch history');
//                 }
//                 const data = await response.json();
//                 setHistory(data);
//             } catch (error) {
//                 console.error('Frontend History Fetch Error:', error);
//                 setHistoryError(error.message);
//             } finally {
//                 setHistoryLoading(false);
//             }
//         };

//         if (!authLoading && isAuthenticated) {
//             fetchHistory();
//         }
//     }, [authLoading, isAuthenticated]);

//     if (authLoading || !isAuthenticated) {
//         return (
//             <div className="flex items-center justify-center min-h-full bg-gray-900 text-white">
//                 <p>Loading dashboard...</p>
//             </div>
//         );
//     }

//     const handleNameSave = (newName) => {
//         setDisplayName(newName);
//         localStorage.setItem('queryai-displayName', newName);
//     };

//     return (
//         <>
//             <EditNameModal 
//                 isOpen={isModalOpen} 
//                 onClose={() => setIsModalOpen(false)} 
//                 currentName={displayName} 
//                 onSave={handleNameSave}
//             />
//             <div className="p-4 md:p-8 bg-gray-900 text-white min-h-full">
//                 <header className="mb-8 p-6 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-[0_0_15px_rgba(70,130,255,0.2)]">
//                     <div className="flex justify-between items-start">
//                         <div>
//                             <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
//                                 Welcome, {displayName}!
//                             </h1>
//                         </div>
//                         <button 
//                             onClick={() => setIsModalOpen(true)}
//                             className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
//                         >
//                             <EditIcon />
//                             Change Name
//                         </button>
//                     </div>
//                 </header>

//                 <div className="space-y-12">
//                     <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
//                         <h2 className="text-2xl font-bold mb-4">Your Search History</h2>
//                         {historyLoading ? (
//                             <p className="text-gray-400">Loading history...</p>
//                         ) : historyError ? (
//                             <p className="text-red-500">Error: {historyError}</p>
//                         ) : history.length > 0 ? (
//                             <ul className="space-y-3">
//                                 {history.map(item => (
//                                     <li key={item._id} className="p-3 bg-gray-700/50 rounded-md hover:bg-gray-700 transition-colors">
//                                         <Link href={`/?q=${encodeURIComponent(item.query)}`} className="text-blue-400">
//                                             {item.query}
//                                         </Link>
//                                         <p className="text-xs text-gray-500 mt-1">
//                                             {new Date(item.createdAt).toLocaleString()}
//                                         </p>
//                                     </li>
//                                 ))}
//                             </ul>
//                         ) : (
//                             <p className="text-gray-400">Your recent searches will appear here.</p>
//                         )}
//                     </div>
//                     <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
//                         <h2 className="text-2xl font-bold mb-4">Saved Items</h2>
//                         <p className="text-gray-400">Bookmarked articles and results will appear here.</p>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }


















'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const EditIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.85 2.85 0 0 0-4 0L7 13v4h4L21 7a2.85 2.85 0 0 0 0-4Z" />
    <path d="m15 6 2 2" />
  </svg>
);

function EditNameModal({ isOpen, onClose, currentName, onSave }) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (isOpen) setName(currentName || '');
  }, [isOpen, currentName]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 qai-modal-dim"></div>
      <div className="relative w-full max-w-md p-6 qai-rounded-4xl bg-gradient-to-br from-gray-900/70 to-gray-900/55 border border-blue-600/20 shadow-[0_30px_80px_rgba(6,12,32,0.6)]">
        <h3 className="text-xl font-extrabold text-white mb-4">Change display name</h3>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-4 focus:ring-blue-500/25"
        />
        <div className="flex justify-end gap-3 mt-5">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700">Cancel</button>
          <button onClick={() => { onSave(name); onClose(); }} className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">Save</button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { isAuthenticated, user, logout, loading: authLoading } = useAuth();
  const router = useRouter();

  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({ queries: 0, bookmarks: 0 });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.push('/login');
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (user && user.email) {
      const saved = localStorage.getItem('queryai-displayName');
      if (saved) setDisplayName(saved);
      else setDisplayName(user.email.split('@')[0]);
    }
  }, [user]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!isAuthenticated) { setHistoryLoading(false); return; }
      const token = localStorage.getItem('token');
      if (!token) { setHistoryLoading(false); setHistoryError('Authentication token not found.'); return; }
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/history`, { headers: { 'x-auth-token': token } });
        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.message || 'Failed to fetch history');
        }
        const data = await response.json();
        setHistory(data);
        setStats(prev => ({ ...prev, queries: data.length }));
      } catch (err) {
        console.error('History fetch error', err);
        setHistoryError(err.message || 'Failed to fetch');
      } finally {
        setHistoryLoading(false);
      }
    };
    if (!authLoading && isAuthenticated) fetchHistory();
  }, [authLoading, isAuthenticated]);

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center qai-bg-slow text-white">
        <div className="p-6 qai-rounded-3xl bg-black/40 backdrop-blur-sm border border-white/10">
          <p className="text-lg font-medium">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  const handleNameSave = (newName) => {
    setDisplayName(newName);
    localStorage.setItem('queryai-displayName', newName);
  };

  const initials = (displayName || 'U').split(' ').map(s => s[0]?.toUpperCase()).slice(0,2).join('');

  return (
    <>
      <EditNameModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} currentName={displayName} onSave={handleNameSave} />
      <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-black text-white p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 p-6 qai-rounded-4xl bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-blue-600/10 shadow-[0_30px_70px_rgba(6,12,32,0.6)]">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 qai-rounded-3xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-extrabold text-white shadow-[0_12px_40px_rgba(139,92,246,0.12)]">
                    {initials}
                  </div>
                  <div>
                    <h1 className="text-4xl font-extrabold tracking-tight qai-anim-text">
                      Hello, <span className="text-white">{displayName}</span>
                    </h1>
                    <p className="text-gray-300 mt-1">Welcome back. Your AI workspace is ready.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 qai-rounded-3xl bg-white/6 border border-white/6 hover:bg-white/8">
                    <EditIcon className="w-4 h-4 text-white/80" />
                    <span className="text-sm text-white/90">Edit</span>
                  </button>
                  <Link href="/">
                  <button className="px-4 py-2 qai-rounded-3xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold">Sign out</button> </Link>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="p-4 qai-rounded-3xl bg-gradient-to-br from-white/3 to-white/2 border border-white/6">
                  <div className="text-sm text-gray-300">Queries</div>
                  <div className="text-2xl font-bold text-white mt-1">{stats.queries}</div>
                </div>
                <div className="p-4 qai-rounded-3xl bg-gradient-to-br from-white/3 to-white/2 border border-white/6">
                  <div className="text-sm text-gray-300">Saved</div>
                  <div className="text-2xl font-bold text-white mt-1">{stats.bookmarks}</div>
                </div>
                <div className="p-4 qai-rounded-3xl bg-gradient-to-br from-white/3 to-white/2 border border-white/6">
                  <div className="text-sm text-gray-300">Workspace</div>
                  <div className="text-2xl font-bold text-white mt-1">AI Hub</div>
                </div>
              </div>
            </div>

            <div className="p-6 qai-rounded-4xl bg-gradient-to-br from-gray-900/45 to-gray-900/25 border border-blue-600/10 shadow-[0_20px_50px_rgba(6,12,32,0.5)]">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-300">Plan</div>
                  <div className="text-lg font-bold text-white">Creator</div>
                </div>
                <div>
                  <button className="px-3 py-2 qai-rounded-3xl bg-white/6 border border-white/8">Manage</button>
                </div>
              </div>
              <div className="mt-6">
                <button className="w-full py-3 qai-rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500 font-bold">New Search</button>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <button className="py-2 qai-rounded-3xl bg-white/5 text-sm">Saved</button>
                  <button className="py-2 qai-rounded-3xl bg-white/5 text-sm">Templates</button>
                  <button className="py-2 qai-rounded-3xl bg-white/5 text-sm">Settings</button>
                </div>
              </div>
            </div>
          </header>

          <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <section className="lg:col-span-2 p-6 qai-rounded-3xl bg-gradient-to-br from-gray-900/40 to-gray-900/22 border border-blue-700/8 shadow-[0_30px_60px_rgba(5,10,30,0.6)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-extrabold">Your Search History</h2>
                <div className="text-sm text-gray-300">{history.length} results</div>
              </div>

              {historyLoading ? (
                <div className="p-6 qai-rounded-3xl bg-black/30">Loading history…</div>
              ) : historyError ? (
                <div className="p-6 qai-rounded-3xl bg-black/30 text-red-400">Error: {historyError}</div>
              ) : history.length > 0 ? (
                <ul className="space-y-4">
                  {history.map(item => (
                    <li key={item._id} className="group p-4 qai-rounded-3xl bg-gradient-to-br from-white/3 to-white/2 border border-white/6 flex items-start justify-between hover:scale-[1.01] transition">
                      <div>
                        <Link href={`/?q=${encodeURIComponent(item.query)}`} className="text-blue-300 text-lg font-semibold">
                          {item.query}
                        </Link>
                        <p className="text-xs text-gray-400 mt-2">{new Date(item.createdAt).toLocaleString()}</p>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <a href={`/?q=${encodeURIComponent(item.query)}`} className="text-sm px-3 py-1 qai-rounded-3xl bg-white/6">Replay</a>
                        <button className="text-sm px-3 py-1 qai-rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500">Details</button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-6 qai-rounded-3xl bg-black/30 text-gray-400">
                  Your recent searches will appear here. Try a new query to get started.
                </div>
              )}
            </section>

            <aside className="p-6 qai-rounded-3xl bg-gradient-to-br from-gray-900/35 to-gray-900/18 border border-blue-700/8 shadow-[0_20px_40px_rgba(6,12,32,0.5)]">
              <h3 className="text-2xl font-extrabold mb-4">Saved Items</h3>
              <div className="space-y-4">
                <div className="p-4 qai-rounded-3xl bg-white/3 border border-white/6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-white">Example Article</div>
                      <div className="text-xs text-gray-400 mt-1">Saved 2 days ago</div>
                    </div>
                    <div className="text-sm text-blue-300">View</div>
                  </div>
                </div>
                <div className="p-4 qai-rounded-3xl bg-white/3 border border-white/6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-white">Insight Note</div>
                      <div className="text-xs text-gray-400 mt-1">Saved a week ago</div>
                    </div>
                    <div className="text-sm text-blue-300">View</div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm text-gray-300 mb-3">Quick Actions</h4>
                <div className="grid gap-3">
                  <button className="w-full py-3 qai-rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500 font-semibold">New Bookmark</button>
                  <button className="w-full py-3 qai-rounded-3xl bg-white/6">Export</button>
                </div>
              </div>

              <div className="mt-6">
                <div className="p-4 qai-rounded-3xl bg-black/20 border border-white/6 text-center">
                  <div className="text-sm text-gray-300">Reserve spot for future widget</div>
                  <div className="mt-3">
                    <button className="py-2 px-4 qai-rounded-3xl bg-white/6">Reserve</button>
                  </div>
                </div>
              </div>
            </aside>
          </main>
        </div>
      </div>
    </>
  );
}

