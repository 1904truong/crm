'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export default function AutomationPage() {
  const [loading, setLoading] = useState(false);
  const [rules, setRules] = useState<any[]>([]);

  const fetchRules = async () => {
    setLoading(true);
    try {
      const res = await api.get('/automation/rules');
      setRules(res.data);
    } catch (e) {
      console.error(e);
      // Fallback mockup
      setRules([
        { id: '1', name: 'Nhắc bảo hành sắp hết hạn', type: 'WARRANTY_SOON', is_active: true, condition: '7_days', action: 'SEND_ZNS_98721' },
        { id: '2', name: 'Chúc mừng sinh nhật khách hàng VIP', type: 'CUSTOMER_BIRTHDAY', is_active: false, condition: '0_days', action: 'SEND_ZNS_34567' },
        { id: '3', name: 'Chăm sóc lấy Review sau mua', type: 'POST_PURCHASE', is_active: true, condition: '14_days', action: 'SEND_ZNS_12345' }
      ] as any);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const toggleRule = async (id: string, currentStatus: boolean) => {
    try {
      // Optimistic update
      setRules(rules.map((r:any) => r.id === id ? { ...r, is_active: !currentStatus } : r));
      await api.patch(`/automation/rules/${id}`, { is_active: !currentStatus });
    } catch {
      // Revert if error
      setRules(rules.map((r:any) => r.id === id ? { ...r, is_active: currentStatus } : r));
      alert('Không thể thay đổi trạng thái Automation Rule');
    }
  }

  return (
    <>
      <div className="space-y-8">
        {/* Breadcrumb & Title */}
        <div className="space-y-2 mb-8">
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <span>Hệ thống</span>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-primary font-medium">Chiến dịch Tự động (Automation)</span>
          </nav>
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-on-surface m-0">Automation Rules</h2>
              <p className="text-slate-500 text-sm mt-1 m-0">Thiết lập các kịch bản tương tác và chăm sóc tệp khách hàng tự động.</p>
            </div>
            <button className="bg-gradient-to-br from-primary to-primary-container text-white px-5 py-2.5 rounded-lg font-semibold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 border-none cursor-pointer">
              <span className="material-symbols-outlined text-sm">add</span> Tạo Rule mới
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <span className="material-symbols-outlined">electric_bolt</span>
              </div>
              <span className="px-2 py-1 rounded-md bg-green-50 text-green-700 font-bold text-xs">Active</span>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest m-0">Rules đang chạy</p>
              <h3 className="text-3xl font-black text-slate-800 m-0 mt-1">{rules.filter((r:any)=>r.is_active).length}</h3>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                <span className="material-symbols-outlined">conveyor_belt</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest m-0">Tương tác tự động tháng này</p>
              <h3 className="text-3xl font-black text-slate-800 m-0 mt-1">1,248</h3>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <span className="material-symbols-outlined">warning</span>
              </div>
              <span className="px-2 py-1 rounded-md bg-red-50 text-red-700 font-bold text-xs">Cảnh báo</span>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest m-0">Rules gặp lỗi thực thi</p>
              <h3 className="text-3xl font-black text-slate-800 m-0 mt-1">0</h3>
            </div>
          </div>
        </div>

        {/* Rules Table */}
        <section className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50">
          <div className="p-6 border-b border-surface-container-high flex justify-between items-center bg-surface-container-low/30">
            <div className="flex items-center gap-4">
              <h3 className="font-bold text-on-surface m-0">Danh sách các Kịch bản (Trigger)</h3>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-surface-container-low text-slate-500 uppercase text-[11px] font-bold tracking-wider border-none">
                  <th className="px-6 py-4 w-16 text-center">Trạng thái</th>
                  <th className="px-6 py-4">Tên Kịch Bản</th>
                  <th className="px-6 py-4">Sự kiện kích hoạt (Trigger)</th>
                  <th className="px-6 py-4">Hành động (Action)</th>
                  <th className="px-6 py-4 text-right">Lần chạy cuối</th>
                  <th className="px-6 py-4 text-right">Cấu hình</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading && <tr><td colSpan={6} className="p-8 text-center text-slate-500 font-medium border-none">Đang tải cấu hình...</td></tr>}
                {!loading && rules.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-slate-500 font-medium border-none">Chưa có Automation Rule nào.</td></tr>}
                
                {!loading && rules.map((r: any) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-5 border-none text-center">
                      <button 
                        onClick={() => toggleRule(r.id, r.is_active)}
                        className={`w-10 h-5 rounded-full relative transition-colors border-none cursor-pointer ${r.is_active ? 'bg-emerald-500' : 'bg-slate-300'}`}
                      >
                        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${r.is_active ? 'translate-x-5' : ''}`}></span>
                      </button>
                    </td>
                    <td className="px-6 py-5 border-none">
                      <p className="font-bold text-slate-900 m-0">{r.name}</p>
                      <p className="text-[11px] text-slate-500 m-0 mt-0.5">ID: {r.id}</p>
                    </td>
                    <td className="px-6 py-5 border-none">
                      <span className="inline-flex items-center px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-mono text-xs font-medium">
                        {r.type} <span className="text-primary ml-2">({r.condition})</span>
                      </span>
                    </td>
                    <td className="px-6 py-5 border-none">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                        <span className="material-symbols-outlined text-[12px]">send</span> {r.action}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right border-none text-slate-500 text-xs">
                      {new Date().toLocaleTimeString('vi-VN')} hôm nay
                    </td>
                    <td className="px-6 py-5 text-right border-none">
                      <button className="p-2 text-slate-400 hover:text-primary transition-colors border-none bg-transparent cursor-pointer">
                        <span className="material-symbols-outlined text-xl">edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
