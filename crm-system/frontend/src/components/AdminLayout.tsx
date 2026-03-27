'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (!localStorage.getItem('token') && pathname !== '/login') {
      router.push('/login');
    }
  }, [pathname, router]);

  if (pathname === '/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const navLinks = [
    { href: '/dashboard', icon: 'dashboard', label: 'Tổng quan' },
    { href: '/customers', icon: 'group', label: 'Khách hàng' },
    { href: '/products', icon: 'inventory_2', label: 'Sản phẩm đã mua' },
    { href: '/warranties', icon: 'verified_user', label: 'Bảo hành' },
    { href: '/purchases', icon: 'shopping_cart', label: 'Đơn mua hàng' },
    { href: '/interactions', icon: 'event_repeat', label: 'Tương tác' },
    { href: '/catalog', icon: 'category', label: 'Danh mục gốc' },
    { href: '/zns', icon: 'chat', label: 'Zalo ZNS' },
    { href: '/automation', icon: 'smart_toy', label: 'Automation' },
    { href: '/settings', icon: 'settings', label: 'Cấu hình hệ thống' },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full w-64 z-50 bg-[#f2f4f6] dark:bg-slate-950 flex flex-col py-6 px-4 space-y-2">
        <div className="px-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>architecture</span>
            </div>
            <div>
              <h1 className="text-lg font-black text-blue-800 dark:text-blue-300 tracking-tighter">Nexus Admin</h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">The Precision Architect</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href} className={`group relative flex items-center px-4 py-3 text-sm font-semibold tracking-wide transition-colors ${isActive ? 'text-blue-700 dark:text-blue-400 before:absolute before:left-0 before:w-1 before:h-8 before:bg-blue-600 before:rounded-r-full bg-blue-50/50' : 'text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50'}`}>
                <span className="material-symbols-outlined mr-3 transition-transform group-hover:translate-x-1 duration-200">{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="pt-6 mt-6 border-t border-outline-variant/20">
          <button className="w-full py-3 px-4 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-xl shadow-md hover:shadow-xl transition-all active:scale-95 text-sm flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">add_circle</span> Cơ hội mới
          </button>
        </div>
        <div className="mt-auto space-y-1">
          <a className="group flex items-center px-4 py-3 text-sm font-semibold tracking-wide text-slate-500 hover:text-blue-600 transition-colors" href="#">
            <span className="material-symbols-outlined mr-3">help</span> Trung tâm hỗ trợ
          </a>
          <button onClick={handleLogout} className="w-full group flex items-center px-4 py-3 text-sm font-semibold tracking-wide text-error hover:bg-error-container/10 transition-colors text-left border-none bg-transparent cursor-pointer">
            <span className="material-symbols-outlined mr-3">logout</span> Đăng xuất
          </button>
        </div>
      </aside>

      {/* Top Navigation Bar */}
      <header className="fixed top-0 right-0 z-40 w-full bg-white/85 backdrop-blur-xl shadow-[0_16px_48px_rgba(0,74,198,0.08)] tonal-layering-no-border">
        <div className="flex justify-between items-center h-16 px-8 ml-64">
          <div className="flex items-center gap-8">
            <h2 className="text-xl font-bold tracking-tighter text-blue-700 dark:text-blue-400">Nexus CRM</h2>
            <div className="hidden md:flex items-center space-x-6">
              <Link className="text-blue-700 font-inter antialiased text-sm font-medium tracking-tight border-b-2 border-blue-600 pb-1" href="/dashboard">Trang chủ</Link>
              <Link className="text-slate-500 font-inter antialiased text-sm font-medium tracking-tight hover:text-blue-600 transition-all" href="#">Hỗ trợ</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <span className="material-symbols-outlined text-lg">search</span>
              </span>
              <input className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Tìm kiếm hệ thống..." type="text"/>
            </div>
            <button className="p-2 text-slate-500 hover:bg-blue-50/50 rounded-full transition-all active:scale-95 border-none bg-transparent cursor-pointer">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 text-slate-500 hover:bg-blue-50/50 rounded-full transition-all active:scale-95 border-none bg-transparent cursor-pointer">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-outline-variant/30">
              <div className="text-right">
                <p className="text-xs font-bold text-on-surface">Admin Nexus</p>
                <p className="text-[10px] text-slate-500 font-medium">Quản trị viên</p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="User profile" className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPF5Iam_lPuIH7FR2nStZWGyaZ2jNcWUpasj_mN9EjlaGeeWKAwt495cRhmlhElQ3ITFvcCGH1OAwNPveoWCBhwLawH9Jxoe5ksinca3O5aL8EP_d_uhoCSWBpUrDYjvDCPLWDCCLRy3yWOnLMoBYAMWBx6f0eDo9MkJYthUaNYrB6MwNJCdpRKb1S2PxphjpoDy-723tn6WW397rrOEEkjgX8YPzDYQHcNN1pZmbXAjjAlMFh1E83Lz1HThulhOgvU-O5LL1B4W4O"/>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="ml-64 pt-24 pb-12 px-8 w-full min-h-screen overflow-y-auto">
        {children}
        
        {/* Floating Action Button for Dashboard */}
        <div className="fixed bottom-8 right-8 z-50">
          <button className="w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center active:scale-95 transition-all hover:rotate-90 border-none cursor-pointer">
            <span className="material-symbols-outlined text-3xl">add</span>
          </button>
        </div>
      </main>
    </div>
  );
}
