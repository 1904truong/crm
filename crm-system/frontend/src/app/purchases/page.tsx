'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export default function PurchasesPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await api.get('/purchases');
      setData(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="pb-12 px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            <span>Sản phẩm</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary">Đơn mua hàng</span>
          </nav>
          <h2 className="text-3xl font-black text-slate-900 m-0">Danh sách Đơn mua hàng</h2>
          <p className="text-slate-500 text-sm m-0 mt-1">Lịch sử các lần khách hàng giao dịch và mua sản phẩm tại hệ thống.</p>
        </div>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-outline-variant/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[11px] font-black text-slate-500 uppercase tracking-[0.1em] border-b border-slate-100">
                <th className="px-8 py-5">Sự kiện</th>
                <th className="px-8 py-5">Khách hàng</th>
                <th className="px-8 py-5">Người tạo</th>
                <th className="px-8 py-5 text-center">Ngày mua</th>
                <th className="px-8 py-5">Số sản phẩm</th>
                <th className="px-8 py-5 text-right">Ghi chú</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading && <tr><td colSpan={6} className="p-12 text-center text-slate-400 font-bold">Đang tải dữ liệu...</td></tr>}
              {!loading && data.length === 0 && <tr><td colSpan={6} className="p-12 text-center text-slate-400 font-bold">Chưa có đơn mua nào được ghi nhận.</td></tr>}

              {!loading && data.map((ev: any) => (
                <tr key={ev.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <span className="material-symbols-outlined text-lg">receipt_long</span>
                      </div>
                      <span className="font-bold text-sm text-slate-900">#E-{ev.id.slice(-6).toUpperCase()}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="font-bold text-sm text-slate-700">{ev.customer?.full_name}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-slate-500 uppercase">{ev.creator?.name || 'Hệ thống'}</span>
                  </td>
                  <td className="px-8 py-6 text-center text-sm font-bold text-slate-600">
                    {new Date(ev.purchase_at).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-black rounded">{ev.products?.length || 0} sản phẩm</span>
                  </td>
                  <td className="px-8 py-6 text-right max-w-xs truncate text-xs text-slate-400 italic">
                    {ev.note || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
