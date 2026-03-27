'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export default function CatalogPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/products');
      setData(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {/* Breadcrumb & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div className="space-y-2">
          <nav className="flex items-center gap-2 text-xs font-medium text-outline">
            <span>Hệ thống</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span>Kho hàng</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary">Sản phẩm gốc</span>
          </nav>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface m-0">Quản lý Sản phẩm Gốc</h1>
          <p className="text-sm text-slate-500 mt-1 m-0">Định nghĩa danh mục Sản phẩm/Dịch vụ mà doanh nghiệp cung cấp</p>
        </div>
        <button className="bg-primary-container text-white px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-primary-container/20 hover:bg-primary transition-all active:scale-95 border-none cursor-pointer">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Tạo sản phẩm mới
        </button>
      </div>

      {/* Filter Bar Section (Bento Inspired) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
        <div className="lg:col-span-5 bg-surface-container-lowest p-4 rounded-2xl shadow-sm flex items-center gap-3">
          <span className="material-symbols-outlined text-outline">search</span>
          <input className="w-full border-none outline-none focus:ring-0 text-sm bg-transparent" placeholder="Tìm kiếm tên sản phẩm, mã SKU..." type="text"/>
        </div>
        <div className="lg:col-span-3 bg-surface-container-lowest p-4 rounded-2xl shadow-sm flex items-center gap-3">
          <span className="material-symbols-outlined text-outline">category</span>
          <select className="w-full border-none outline-none focus:ring-0 text-sm bg-transparent appearance-none">
            <option value="">Tất cả danh mục</option>
            <option value="electronics">Thiết bị điện tử</option>
            <option value="services">Dịch vụ bảo trì</option>
            <option value="accessories">Phụ kiện</option>
          </select>
        </div>
        <div className="lg:col-span-4 bg-surface-container-lowest p-4 rounded-2xl shadow-sm flex items-center gap-3">
          <span className="material-symbols-outlined text-outline">sort</span>
          <select className="w-full border-none outline-none focus:ring-0 text-sm bg-transparent appearance-none">
            <option value="">Sắp xếp: Mới nhất</option>
            <option value="">Giá: Tăng dần</option>
            <option value="">Giá: Giảm dần</option>
          </select>
        </div>
      </section>

      {/* Transactions Table */}
      <section className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high text-on-surface-variant uppercase text-[11px] font-bold tracking-widest border-none">
                <th className="px-6 py-4">Tên Sản phẩm</th>
                <th className="px-6 py-4">Danh mục</th>
                <th className="px-6 py-4 text-right">Đơn giá</th>
                <th className="px-6 py-4">Mô tả</th>
                <th className="px-6 py-4">Ngày tạo</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-surface-container">
              {loading && <tr><td colSpan={6} className="p-8 text-center text-slate-500 font-medium border-none">Đang tải dữ liệu...</td></tr>}
              {!loading && data.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-slate-500 font-medium border-none">Chưa có dữ liệu nào.</td></tr>}

              {!loading && data.map((item: any, idx) => (
                <tr key={item.id} className={`hover:bg-surface-container-high transition-colors group ${idx % 2 !== 0 ? 'bg-surface-container-low' : ''}`}>
                  <td className="px-6 py-5 font-bold text-primary border-none">{item.name}</td>
                  <td className="px-6 py-5 border-none">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#2563eb]/10 text-[#2563eb] uppercase">
                      {item.category || 'MẶC ĐỊNH'}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right font-mono font-bold text-on-surface border-none">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price || 0)}
                  </td>
                  <td className="px-6 py-5 text-on-surface-variant truncate max-w-[200px] border-none">{item.description || '—'}</td>
                  <td className="px-6 py-5 text-on-surface-variant italic border-none">{new Date(item.created_at).toLocaleDateString('vi-VN')}</td>
                  <td className="px-6 py-5 text-right space-x-2 border-none">
                    <button className="p-2 hover:text-primary transition-colors border-none bg-transparent cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
                    <button className="p-2 hover:text-error transition-colors border-none bg-transparent cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
