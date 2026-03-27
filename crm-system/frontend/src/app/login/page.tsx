'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await authApi.login({ email, password });
      localStorage.setItem('token', res.data.access_token);
      router.push('/dashboard');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Tài khoản hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div suppressHydrationWarning className="min-h-screen bg-background text-on-surface antialiased flex items-center justify-center p-6 relative overflow-hidden w-full">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -right-[5%] w-[40%] h-[60%] rounded-full bg-primary/5 blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -left-[5%] w-[30%] h-[50%] rounded-full bg-secondary/5 blur-[100px]"></div>
      </div>
      
      {/* Login Container */}
      <div className="w-full max-w-[440px] z-10">
        {/* Brand Anchor (Identity from JSON) */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 bg-primary-container rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>architecture</span>
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-primary">Nexus CRM</h1>
          <p className="text-sm font-medium text-slate-500 mt-1 uppercase tracking-widest">Kiến trúc sư của sự chính xác</p>
        </div>
        
        {/* Login Card */}
        <div className="bg-surface-container-lowest rounded-xl p-8 md:p-10 shadow-[0_16px_48px_rgba(0,74,198,0.08)] border border-outline-variant/20">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-on-surface tracking-tight">Chào mừng trở lại</h2>
            <p className="text-sm text-outline mt-1">Vui lòng nhập thông tin để truy cập hệ thống.</p>
          </div>
          
          {/* Error State */}
          {errorMsg && (
            <div className="mb-6 p-3 bg-error-container/30 border border-error/10 rounded-lg flex items-start gap-3">
              <span className="material-symbols-outlined text-error text-[20px]">error</span>
              <p className="text-xs font-medium text-error leading-relaxed">{errorMsg}</p>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Username/Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-on-surface-variant">Email hoặc Tên đăng nhập</label>
              <div className="relative group">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline group-focus-within:text-primary transition-colors text-[20px]">person</span>
                <input required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border border-transparent ring-1 ring-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary transition-all outline-none text-sm placeholder:text-outline/60" placeholder="vidu@nexus.com" type="text" />
              </div>
            </div>
            
            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-semibold text-on-surface-variant">Mật khẩu</label>
                <a className="text-xs font-semibold text-primary hover:underline transition-all" href="#">Quên mật khẩu?</a>
              </div>
              <div className="relative group">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline group-focus-within:text-primary transition-colors text-[20px]">lock</span>
                <input required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-12 py-2.5 bg-surface-container-low border border-transparent ring-1 ring-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary transition-all outline-none text-sm placeholder:text-outline/60" placeholder="••••••••" type="password" />
                <button tabIndex={-1} className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none outline-none cursor-pointer text-outline hover:text-on-surface-variant transition-colors flex items-center" type="button">
                  <span className="material-symbols-outlined text-[20px]">visibility</span>
                </button>
              </div>
            </div>
            
            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/20" id="remember" type="checkbox" />
              <label className="text-sm text-on-surface-variant cursor-pointer select-none" htmlFor="remember">Ghi nhớ đăng nhập</label>
            </div>
            
            {/* Submit Button */}
            {!loading ? (
              <button disabled={loading} className="w-full py-3 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all duration-200 border-none cursor-pointer" type="submit">
                Đăng nhập
              </button>
            ) : (
              <button className="w-full py-3 bg-surface-container-high text-outline font-bold rounded-lg flex items-center justify-center gap-3 cursor-not-allowed border-none" disabled type="button">
                <svg className="animate-spin h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
                </svg>
                Đang xử lý...
              </button>
            )}
          </form>
          
          {/* Footer Links */}
          <div className="mt-8 pt-8 border-t border-outline-variant/10 text-center">
            <p className="text-sm text-outline">Bạn chưa có tài khoản? <a className="font-bold text-primary hover:underline" href="#">Liên hệ quản trị viên</a></p>
          </div>
        </div>
        
        {/* Accessibility/Legal Footer */}
        <div className="mt-8 flex justify-center items-center gap-6 text-xs text-outline font-medium">
          <a className="hover:text-primary transition-colors" href="#">Chính sách bảo mật</a>
          <span className="w-1 h-1 bg-outline-variant/40 rounded-full"></span>
          <a className="hover:text-primary transition-colors" href="#">Hỗ trợ kỹ thuật</a>
          <span className="w-1 h-1 bg-outline-variant/40 rounded-full"></span>
          <span className="text-outline/60">v2.4.0</span>
        </div>
      </div>
      
      {/* Background Layer Decoration (Editorial feel) */}
      <div className="fixed bottom-12 right-12 opacity-[0.03] pointer-events-none select-none">
        <h3 className="text-[12rem] font-black tracking-tighter leading-none text-primary m-0 p-0">NEXUS</h3>
      </div>
    </div>
  );
}
