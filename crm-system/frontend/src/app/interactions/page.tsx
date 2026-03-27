'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';

// --- Sub-Components ---

const InteractionForm = ({ onSave, onCancel }: { onSave: (data: any) => void, onCancel: () => void }) => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    customer_id: '',
    type: 'CALL',
    interaction_at: new Date().toISOString().slice(0, 16),
    content: '',
    has_follow_up: false,
    follow_up_at: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    api.get('/customers').then(res => setCustomers(res.data)).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onCancel();
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 shadow-xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center">
              <span className="material-symbols-outlined">check</span>
            </div>
            <div>
              <p className="text-sm font-bold text-emerald-900 m-0">Thành công</p>
              <p className="text-xs text-emerald-700 m-0">Đã lưu thông tin tương tác thành công</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-1">
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <span>CSKH</span>
          <span className="material-symbols-outlined text-[12px]">chevron_right</span>
          <span className="text-primary font-medium">Tương tác</span>
        </nav>
        <h2 className="text-3xl font-black text-on-surface m-0">Ghi nhận tương tác mới</h2>
        <p className="text-slate-500 text-sm m-0">Cập nhật chi tiết hoạt động chăm sóc khách hàng vào hệ thống.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-10 rounded-[32px] shadow-sm border border-outline-variant/10">
        <div className="space-y-8">
          {/* Chọn khách hàng */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500">Chọn khách hàng *</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">person</span>
              <select 
                required
                value={formData.customer_id}
                onChange={(e) => setFormData({...formData, customer_id: e.target.value})}
                className="w-full pl-12 pr-10 py-4 bg-surface-container-low border-none rounded-2xl text-sm appearance-none outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              >
                <option value="">Chọn khách hàng...</option>
                {customers.map(c => <option key={c.id} value={c.id}>{c.full_name}</option>)}
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">unfold_more</span>
            </div>
          </div>

          {/* Loại tương tác */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500">Loại tương tác *</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'CALL', label: 'Gọi điện', icon: 'call' },
                { id: 'EMAIL', label: 'Email', icon: 'mail' },
                { id: 'ZALO', label: 'Zalo', icon: 'chat' },
                { id: 'MEETING', label: 'Gặp mặt', icon: 'groups' }
              ].map(type => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setFormData({...formData, type: type.id})}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all group ${formData.type === type.id ? 'border-primary bg-primary/5 text-primary' : 'border-surface-container-high bg-transparent text-slate-600 hover:border-slate-300'}`}
                >
                  <span className={`material-symbols-outlined ${formData.type === type.id ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600'}`}>{type.icon}</span>
                  <span className="text-sm font-bold">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Người thực hiện */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500">Người thực hiện</label>
            <div className="relative">
              <div className="w-full px-4 py-4 bg-surface-container-low border-none rounded-2xl text-sm flex items-center justify-between text-slate-600">
                <span className="font-medium">Admin User (Bạn)</span>
                <span className="material-symbols-outlined text-slate-400">swap_vert</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Thời gian */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500">Thời gian tương tác</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">calendar_today</span>
              <input 
                type="datetime-local"
                value={formData.interaction_at}
                onChange={(e) => setFormData({...formData, interaction_at: e.target.value})}
                className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" 
              />
            </div>
          </div>

          {/* Nội dung */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500">Nội dung tương tác</label>
            <textarea 
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              className="w-full bg-surface-container-low border-none rounded-2xl p-5 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all min-h-[140px] resize-none font-medium" 
              placeholder="Ghi chú tóm tắt nội dung trao đổi..."
            ></textarea>
          </div>

          {/* Nhắc việc */}
          <div className="bg-blue-50/50 p-6 rounded-3xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">notifications</span>
                <div>
                  <p className="text-sm font-bold text-blue-900 m-0">Tạo nhắc việc theo dõi</p>
                  <p className="text-[10px] text-blue-700 m-0">Hệ thống sẽ gửi thông báo cho bạn</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.has_follow_up} 
                  onChange={(e) => setFormData({...formData, has_follow_up: e.target.checked})}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            {formData.has_follow_up && (
               <div className="space-y-3 animate-in fade-in zoom-in-95 duration-300">
                <label className="text-[10px] font-black uppercase tracking-widest text-blue-800">Thời gian nhắc việc</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-blue-400">alarm</span>
                  <input 
                    type="datetime-local"
                    value={formData.follow_up_at}
                    onChange={(e) => setFormData({...formData, follow_up_at: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-white border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary/20 shadow-sm font-medium" 
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 flex items-center justify-end gap-6 pt-6 border-t border-outline-variant/10">
          <button type="button" onClick={onCancel} className="text-slate-500 font-bold text-sm hover:underline border-none bg-transparent cursor-pointer">Hủy</button>
          <button type="submit" className="px-10 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all border-none cursor-pointer">Lưu tương tác</button>
        </div>
      </form>
    </div>
  );
};

export default function InteractionsPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'LIST' | 'CREATE'>('LIST');

  const fetchInteractions = async () => {
    setLoading(true);
    try {
      const res = await api.get('/interactions');
      setData(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInteractions();
  }, []);

  const handleSave = async (formData: any) => {
    try {
      const payload = {
        type: formData.type,
        interaction_at: new Date(formData.interaction_at).toISOString(),
        content: formData.content,
        follow_up_at: formData.has_follow_up ? new Date(formData.follow_up_at).toISOString() : null,
      };
      await api.post(`/interactions/customers/${formData.customer_id}`, payload);
      fetchInteractions();
    } catch (e) {
      console.error(e);
    }
  };

  const getTypeDisplay = (type: string) => {
    switch(type) {
      case 'CALL': return { label: 'Gọi điện', bg: 'bg-blue-100 text-blue-700' };
      case 'EMAIL': return { label: 'Email', bg: 'bg-purple-100 text-purple-700' };
      case 'MEETING': return { label: 'Gặp mặt', bg: 'bg-orange-100 text-orange-700' };
      case 'ZALO': return { label: 'Zalo', bg: 'bg-teal-100 text-teal-700' };
      default: return { label: type || 'Khác', bg: 'bg-slate-100 text-slate-700' };
    }
  };

  const getStatusDisplay = (status: string, followUp: string | null) => {
    if (status === 'COMPLETED') return { element: <span className="text-xs font-bold text-green-600">Đã hoàn thành</span> };
    if (!followUp) return { element: <span className="text-xs font-bold text-slate-500">Không có lịch</span> };
    
    const isOverdue = new Date(followUp) < new Date();
    if (isOverdue) return { element: (
      <div className="flex flex-col">
        <span className="text-xs font-bold text-error">{new Date(followUp).toLocaleString('vi-VN')}</span>
        <span className="text-[9px] font-bold text-error/80 uppercase">Quá hạn</span>
      </div>
    )};
    
    return { element: (
      <div className="flex flex-col">
        <span className="text-xs font-bold text-primary">{new Date(followUp).toLocaleString('vi-VN')}</span>
      </div>
    )};
  };

  if (viewMode === 'CREATE') return <InteractionForm onSave={handleSave} onCancel={() => setViewMode('LIST')} />;

  return (
    <>
      <div className="space-y-8 animate-in fade-in duration-500">
        {/* Breadcrumb & Title */}
        <div className="space-y-2">
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <span>Hệ thống</span>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span>Chăm sóc khách hàng</span>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-primary font-medium">Tương tác & Nhắc việc</span>
          </nav>
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-on-surface m-0">Tương tác & Nhắc việc</h2>
              <p className="text-slate-500 text-sm mt-1 m-0">Quản lý các điểm chạm và theo dõi tiến độ công việc với khách hàng.</p>
            </div>
            <button 
              onClick={() => setViewMode('CREATE')}
              className="bg-gradient-to-br from-primary to-primary-container text-white px-5 py-2.5 rounded-lg font-semibold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 border-none cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">add</span> Tạo nhắc việc mới
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.04)] grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="space-y-1.5 md:col-span-1">
            <label className="text-[11px] font-bold uppercase text-slate-400 tracking-wider px-1">Tìm khách hàng</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-base">person_search</span>
              <input className="w-full pl-9 pr-4 py-2.5 bg-surface-container-low border-none rounded-lg text-sm focus:ring-1 focus:ring-primary/30 outline-none" placeholder="Tên khách hàng..." type="text"/>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase text-slate-400 tracking-wider px-1">Người phụ trách</label>
            <select className="w-full px-4 py-2.5 bg-surface-container-low border-none rounded-lg text-sm focus:ring-1 focus:ring-primary/30 appearance-none outline-none">
              <option>Tất cả quản trị</option>
              <option>Nguyễn Văn A</option>
              <option>Trần Thị B</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase text-slate-400 tracking-wider px-1">Loại tương tác</label>
            <select className="w-full px-4 py-2.5 bg-surface-container-low border-none rounded-lg text-sm focus:ring-1 focus:ring-primary/30 outline-none">
              <option>Tất cả loại hình</option>
              <option>Gọi điện</option>
              <option>Email</option>
              <option>Gặp mặt</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase text-slate-400 tracking-wider px-1">Thời gian</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-base">calendar_today</span>
              <input className="w-full pl-9 pr-4 py-2.5 bg-surface-container-low border-none rounded-lg text-sm focus:ring-1 focus:ring-primary/30 outline-none" type="text" placeholder="01/10/2023 - 31/10/2023"/>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase text-slate-400 tracking-wider px-1">Trạng thái</label>
            <select className="w-full px-4 py-2.5 bg-surface-container-low border-none rounded-lg text-sm font-medium text-primary focus:ring-1 focus:ring-primary/30 outline-none">
              <option>Hôm nay</option>
              <option className="text-error">Quá hạn</option>
              <option>7 ngày tới</option>
            </select>
          </div>
        </div>

        {/* Data Table Section */}
        <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.04)] mb-8">
          <div className="p-6 border-b border-surface-container-high flex justify-between items-center bg-surface-container-low/30">
            <div className="flex items-center gap-4">
              <h3 className="font-bold text-on-surface m-0">Danh sách nhắc việc</h3>
              <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">{data.length} bản ghi</span>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-xs font-semibold text-primary hover:bg-primary/5 rounded-lg transition-colors flex items-center gap-2 border-none bg-transparent cursor-pointer">
                <span className="material-symbols-outlined text-sm">done_all</span> Đánh dấu xong
              </button>
              <button className="px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2 border-none bg-transparent cursor-pointer">
                <span className="material-symbols-outlined text-sm">download</span> Xuất Excel
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-high/50 text-slate-500 text-[11px] font-bold uppercase tracking-widest border-none">
                  <th className="py-4 px-4 min-w-[200px] pl-8">Khách hàng</th>
                  <th className="py-4 px-4 w-32">Loại</th>
                  <th className="py-4 px-4">Nội dung nhắc việc</th>
                  <th className="py-4 px-4 w-40">Ngày tương tác</th>
                  <th className="py-4 px-4 w-40">Ngày nhắc</th>
                  <th className="py-4 px-4">Người phụ trách</th>
                  <th className="py-4 pr-8 pl-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low">
                {loading && <tr><td colSpan={7} className="p-8 text-center text-slate-500 font-medium border-none">Đang tải dữ liệu...</td></tr>}
                {!loading && data.length === 0 && <tr><td colSpan={7} className="p-8 text-center text-slate-500 font-medium border-none">Không có tương tác nào.</td></tr>}

                {!loading && data.map((item: any, idx) => {
                  const t = getTypeDisplay(item.type);
                  const statusElement = getStatusDisplay(item.status, item.follow_up_at);
                  const customer = item.customer?.full_name || 'Khách vãng lai';
                  
                  return (
                    <tr key={item.id} className={`hover:bg-surface-container-low transition-colors group ${idx % 2 !== 0 ? 'bg-surface-container-low/20' : ''}`}>
                      <td className="py-4 px-4 pl-8 border-none">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs text-center leading-[36px]">
                            {customer.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-on-surface m-0 leading-tight">{customer}</p>
                            <p className="text-[11px] text-slate-500 m-0 mt-0.5">ID: #{item.customer?.code || item.customer_id.slice(0,5)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 border-none">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase ${t.bg}`}>
                          {t.label}
                        </span>
                      </td>
                      <td className="py-4 px-4 border-none">
                        <p className="text-sm text-slate-600 m-0 truncate max-w-xs" title={item.content}>{item.content || '—'}</p>
                      </td>
                      <td className="py-4 px-4 text-xs text-slate-500 border-none">{new Date(item.interaction_at).toLocaleString('vi-VN')}</td>
                      <td className="py-4 px-4 border-none">
                        {statusElement.element}
                      </td>
                      <td className="py-4 px-4 border-none">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-secondary-container flex items-center justify-center text-[10px] font-bold text-on-secondary-container leading-[24px]">
                            NV
                          </div>
                          <span className="text-xs font-medium text-slate-600">{item.owner?.name || 'Admin'}</span>
                        </div>
                      </td>
                      <td className="py-4 pr-8 pl-4 text-right border-none">
                        <div className="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {item.status !== 'COMPLETED' && (
                            <button className="p-2 text-slate-400 hover:text-green-600 transition-colors bg-transparent border-none cursor-pointer" title="Đánh dấu hoàn thành">
                              <span className="material-symbols-outlined text-xl">check_circle</span>
                            </button>
                          )}
                          <button className="p-2 text-slate-400 hover:text-on-surface transition-colors bg-transparent border-none cursor-pointer">
                            <span className="material-symbols-outlined text-xl">more_vert</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="p-6 bg-white border-t border-surface-container-low flex items-center justify-between">
            <p className="text-xs text-slate-500 m-0">Hiển thị <span className="font-bold text-on-surface">{data.length}</span> trong số <span className="font-bold text-on-surface">{data.length}</span> bản ghi</p>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-slate-400 hover:bg-surface-container-low transition-colors disabled:opacity-50 bg-transparent cursor-pointer" disabled>
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-bold shadow-sm border-none cursor-pointer">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-slate-400 hover:bg-surface-container-low transition-colors bg-transparent cursor-pointer">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Stats (Architectural Detail) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-8">
          <div className="bg-primary/5 rounded-xl p-5 border-l-4 border-primary">
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary/70 m-0">Tổng hoàn thành tháng này</p>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-extrabold text-primary leading-none">482</span>
              <span className="text-[10px] font-bold text-green-600 mb-0.5">+12%</span>
            </div>
          </div>
          <div className="bg-error/5 rounded-xl p-5 border-l-4 border-error">
            <p className="text-[10px] font-bold uppercase tracking-wider text-error/70 m-0">Nhắc việc quá hạn</p>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-extrabold text-error leading-none">{data.filter((d:any) => new Date(d.follow_up_at) < new Date() && d.status !== 'COMPLETED').length}</span>
              <span className="text-[10px] font-bold text-error mb-0.5">Cần xử lý ngay</span>
            </div>
          </div>
          <div className="bg-surface-container-highest/40 rounded-xl p-5 border-l-4 border-slate-300">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 m-0">Tỷ lệ tương tác thành công</p>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-extrabold text-slate-700 leading-none">68%</span>
              <div className="flex-1 h-1.5 bg-slate-200 rounded-full mb-1.5 overflow-hidden">
                <div className="h-full bg-slate-400" style={{ width: '68%' }}></div>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/20 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <span className="material-symbols-outlined">analytics</span>
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface m-0">Chỉ số Hiệu suất</p>
              <p className="text-[10px] text-slate-500 m-0 mt-0.5">Dữ liệu cập nhật 5 phút trước</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
