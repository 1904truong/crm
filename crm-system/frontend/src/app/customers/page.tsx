'use client';

import React, { useState, useEffect } from 'react';



// --- Sub-Components ---

const CustomerForm = ({ customer, onSave, onCancel }: { customer?: any, onSave: (data: any) => void, onCancel: () => void }) => {
  const [formData, setFormData] = useState(customer || {
    full_name: '',
    customer_type: 'Khách hàng cá nhân',
    source: 'Facebook Ads',
    assigned_to: 'Trần Thị B',
    status: 'ACTIVE',
    contacts: [{ type: 'Số điện thoại', value: '', is_primary: true }],
    tags: '',
    notes: ''
  });

  const handleContactChange = (idx: number, field: string, value: any) => {
    const nextContacts = [...formData.contacts];
    if (field === 'is_primary') {
      nextContacts.forEach((c, i) => c.is_primary = i === idx);
    } else {
      nextContacts[idx] = { ...nextContacts[idx], [field]: value };
    }
    setFormData({ ...formData, contacts: nextContacts });
  };

  const removeContact = (idx: number) => {
    if (formData.contacts.length <= 1) return;
    const nextContacts = formData.contacts.filter((_: any, i: number) => i !== idx);
    if (!nextContacts.some((c: any) => c.is_primary)) {
      nextContacts[0].is_primary = true;
    }
    setFormData({ ...formData, contacts: nextContacts });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-on-surface m-0">{customer ? 'Chỉnh sửa khách hàng' : 'Tạo Khách hàng mới'}</h2>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-xs text-slate-500">Trang chủ / Khách hàng / {customer ? 'Sửa' : 'Tạo mới'}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onCancel} className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-surface-container-high transition-all border-none bg-transparent cursor-pointer">Hủy bỏ</button>
          <button onClick={() => onSave(formData)} className="px-8 py-2.5 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all border-none cursor-pointer">Lưu khách hàng</button>
        </div>
      </div>

      {/* Thông tin cơ bản */}
      <section className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-outline-variant/10">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-1.5 h-6 bg-primary rounded-full"></div>
          <h3 className="text-lg font-bold text-on-surface m-0">Thông tin cơ bản</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Họ và tên *</label>
            <input 
              value={formData.full_name}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              className="w-full bg-surface-container-low border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
              placeholder="Nguyễn Văn A" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Mã khách hàng</label>
            <div className="relative">
              <input 
                readOnly 
                disabled 
                value={formData.code || ''}
                className="w-full bg-surface-container-low border-none rounded-xl p-4 text-sm text-slate-400 outline-none cursor-not-allowed" 
              />
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 text-sm">lock</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phân loại khách hàng *</label>
            <div className="relative">
              <select 
                value={formData.customer_type}
                onChange={(e) => setFormData({...formData, customer_type: e.target.value})}
                className="w-full bg-surface-container-low border-none rounded-xl p-4 text-sm appearance-none outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option>Khách hàng cá nhân</option>
                <option>Doanh nghiệp</option>
                <option>Đại lý</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Nguồn khách hàng</label>
            <div className="relative">
              <select 
                value={formData.source}
                onChange={(e) => setFormData({...formData, source: e.target.value})}
                className="w-full bg-surface-container-low border-none rounded-xl p-4 text-sm appearance-none outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option>Facebook Ads</option>
                <option>Google Search</option>
                <option>Giới thiệu</option>
                <option>Trực tiếp</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Người phụ trách</label>
            <div className="relative">
              <select 
                value={formData.assigned_to}
                onChange={(e) => setFormData({...formData, assigned_to: e.target.value})}
                className="w-full bg-surface-container-low border-none rounded-xl p-4 text-sm appearance-none outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option>Trần Thị B</option>
                <option>Nguyễn Văn C</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
            </div>
          </div>
          <div className="space-y-2 text-center md:text-left">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-3">Trạng thái *</label>
            <div className="flex p-1 bg-surface-container-low rounded-xl w-full">
              <button 
                type="button"
                onClick={() => setFormData({...formData, status: 'ACTIVE'})}
                className={`flex-1 py-2 rounded-lg font-bold text-xs transition-all border-none cursor-pointer ${formData.status === 'ACTIVE' ? 'bg-white text-primary shadow-sm' : 'bg-transparent text-slate-400 shadow-none'}`}
              >Hoạt động</button>
              <button 
                type="button"
                onClick={() => setFormData({...formData, status: 'INACTIVE'})}
                className={`flex-1 py-2 rounded-lg font-bold text-xs transition-all border-none cursor-pointer ${formData.status === 'INACTIVE' ? 'bg-white text-primary shadow-sm' : 'bg-transparent text-slate-400 shadow-none'}`}
              >Tạm dừng</button>
            </div>
          </div>
        </div>
      </section>

      {/* Thông tin liên hệ */}
      <section className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-outline-variant/10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-6 bg-primary rounded-full"></div>
            <h3 className="text-lg font-bold text-on-surface m-0">Thông tin liên hệ</h3>
          </div>
          <button 
            type="button"
            onClick={() => setFormData({...formData, contacts: [...formData.contacts, { type: 'Số điện thoại', value: '', is_primary: false }]})}
            className="flex items-center gap-2 text-primary font-bold text-sm hover:underline border-none bg-transparent cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span> Thêm liên hệ
          </button>
        </div>
        <div className="overflow-hidden rounded-2xl border border-outline-variant/10">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-surface-container-low text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Loại</th>
                <th className="px-6 py-4">Giá trị liên hệ</th>
                <th className="px-6 py-4 text-center">Chính</th>
                <th className="px-6 py-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {formData.contacts.map((contact: any, idx: number) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5 border-none">
                    <select 
                      value={contact.type} 
                      onChange={(e) => handleContactChange(idx, 'type', e.target.value)}
                      className="bg-transparent border-none font-medium text-on-surface outline-none cursor-pointer"
                    >
                      <option>Số điện thoại</option>
                      <option>Email</option>
                      <option>Zalo</option>
                    </select>
                  </td>
                  <td className="px-6 py-5 border-none">
                    <input 
                      value={contact.value} 
                      onChange={(e) => handleContactChange(idx, 'value', e.target.value)}
                      className="bg-transparent border-none w-full font-bold text-on-surface focus:ring-0 outline-none" 
                    />
                  </td>
                  <td className="px-6 py-5 text-center border-none">
                    <input 
                      type="radio" 
                      checked={contact.is_primary} 
                      onChange={() => handleContactChange(idx, 'is_primary', true)}
                      className="w-4 h-4 text-primary focus:ring-primary/20 border-slate-300" 
                    />
                  </td>
                  <td className="px-6 py-5 text-right border-none">
                    <button 
                      type="button"
                      onClick={() => removeContact(idx)}
                      className="text-slate-300 hover:text-error transition-colors border-none bg-transparent cursor-pointer"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tags & Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-outline-variant/10">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1.5 h-6 bg-primary rounded-full"></div>
            <h3 className="text-lg font-bold text-on-surface m-0">Thẻ phân loại</h3>
          </div>
          <div className="relative">
            <input 
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              className="w-full bg-surface-container-low border-none rounded-xl p-4 text-sm outline-none" 
              placeholder="Thêm tag mới..." 
            />
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">sell</span>
          </div>
        </section>
        <section className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-outline-variant/10">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1.5 h-6 bg-primary rounded-full"></div>
            <h3 className="text-lg font-bold text-on-surface m-0">Ghi chú nhanh</h3>
          </div>
          <textarea 
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            className="w-full bg-surface-container-low border-none rounded-xl p-4 text-sm min-h-[100px] outline-none resize-none" 
            placeholder="Ghi chú về khách hàng này..."
          ></textarea>
        </section>
      </div>

      <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-emerald-100 flex items-center gap-3">
        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
          <span className="material-symbols-outlined text-sm">check</span>
        </div>
        <p className="text-xs font-semibold text-emerald-800 m-0">Tất cả thay đổi đã được tự động lưu bản nháp lúc {new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</p>
      </div>
    </div>
  );
};

const CustomerDetail = ({ customer, onBack }: { customer: any, onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header Profile */}
      <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-outline-variant/10 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-8 w-full">
            <div className="w-24 h-24 rounded-3xl bg-primary/10 text-primary flex items-center justify-center text-4xl font-black">
              {customer.full_name?.split(' ').map((n:string)=>n[0]).join('').slice(0, 2).toUpperCase() || 'KH'}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-black text-on-surface m-0">{customer.full_name}</h2>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wider border border-amber-200">★ VIP</span>
              </div>
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">call</span> 0901234567</div>
                <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">mail</span> {customer.email || '—'}</div>
                <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">location_on</span> Quận 1, TP. Hồ Chí Minh</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-3 bg-blue-50 text-primary hover:bg-blue-100 rounded-xl font-bold text-sm transition-all border-none cursor-pointer flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[20px]">chat</span> Gửi ZNS
            </button>
            <button className="flex-1 md:flex-none px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 transition-all border-none cursor-pointer flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[20px]">add_task</span> Thêm tương tác
            </button>
            <button className="p-3 bg-surface-container-low rounded-xl text-slate-500 border-none cursor-pointer"><span className="material-symbols-outlined">more_horiz</span></button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-8 mt-10 border-b border-outline-variant/10">
          {['overview', 'timeline', 'products', 'zns'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold tracking-tight transition-all border-none bg-transparent cursor-pointer relative ${activeTab === tab ? 'text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-primary after:rounded-full' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {tab === 'overview' ? 'Tổng quan' : tab === 'timeline' ? 'Dòng thời gian' : tab === 'products' ? 'Sản phẩm & Bảo hành' : 'Lịch sử ZNS'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {activeTab === 'overview' && (
            <>
              {/* Thông tin sản phẩm hiện tại */}
              <section className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-outline-variant/10">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8 m-0">Thông tin sản phẩm hiện tại</h3>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-48 h-48 bg-surface-container-low rounded-2xl flex items-center justify-center text-slate-300">
                    <span className="material-symbols-outlined text-6xl">photo_library</span>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase m-0">Tên sản phẩm</p>
                      <p className="text-sm font-black text-on-surface m-0 mt-1">SP Model X1</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase m-0">Số Serial</p>
                      <p className="text-sm font-black text-primary m-0 mt-1 uppercase tracking-tight">SNX1-00231</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase m-0">Thời hạn bảo hành</p>
                      <p className="text-sm font-black text-on-surface m-0 mt-1">12 tháng</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase m-0">Ngày kích hoạt</p>
                      <p className="text-sm font-black text-on-surface m-0 mt-1">15/05/2023</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="bg-blue-50/50 p-4 rounded-2xl text-center">
                    <p className="text-2xl font-black text-blue-800 m-0">02</p>
                    <p className="text-[10px] font-bold text-blue-600 uppercase mt-1 m-0">Lượt bảo trì</p>
                  </div>
                  <div className="bg-emerald-50/50 p-4 rounded-2xl text-center">
                    <p className="text-2xl font-black text-emerald-800 m-0">85%</p>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase mt-1 m-0">Chỉ số hài lòng</p>
                  </div>
                  <div className="bg-slate-100/50 p-4 rounded-2xl text-center">
                    <p className="text-2xl font-black text-slate-800 m-0">24tr</p>
                    <p className="text-[10px] font-bold text-slate-600 uppercase mt-1 m-0">Giá trị vòng đời</p>
                  </div>
                </div>
              </section>

              {/* Ghi chú & Tương tác */}
              <section className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-outline-variant/10">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest m-0">Ghi chú & Tương tác gần đây</h3>
                   <button className="text-xs font-bold text-primary hover:underline border-none bg-transparent cursor-pointer">Xem tất cả</button>
                </div>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">sms</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="text-sm font-bold text-on-surface m-0">Gửi ZNS - Nhắc lịch bảo trì định kỳ</p>
                        <span className="text-[10px] text-slate-400">10:30, Hôm qua</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 m-0 leading-relaxed">Đã gửi tin nhắn nhắc bảo dưỡng máy model X1 định kỳ 6 tháng. Khách hàng đã nhận và xem tin nhắn.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">handyman</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="text-sm font-bold text-on-surface m-0">Hoàn thành lắp đặt & Bàn giao</p>
                        <span className="text-[10px] text-slate-400">14/05/2023</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 m-0 leading-relaxed">Kỹ thuật viên đã hoàn thành lắp đặt tại nhà, hướng dẫn khách hàng sử dụng app Nexus.</p>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          {/* Nhắc việc sắp tới */}
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-outline-variant/10">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black text-on-surface m-0">Nhắc việc sắp tới</h3>
                <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-[10px] font-bold">2</span>
            </div>
            <div className="space-y-4">
              <div className="pl-4 border-l-4 border-blue-500 bg-blue-50/30 p-4 rounded-r-2xl">
                <p className="text-sm font-bold text-on-surface m-0">Gọi xác nhận lịch hẹn</p>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-1">
                  <span className="material-symbols-outlined text-[14px]">schedule</span> Ngày mai, 09:00 AM
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold border-none">Hủy</button>
                  <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold border-none">Xong</button>
                </div>
              </div>
              <div className="pl-4 border-l-4 border-orange-500 bg-orange-50/30 p-4 rounded-r-2xl">
                <p className="text-sm font-bold text-on-surface m-0">Kiểm tra bảo hành máy</p>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-1">
                  <span className="material-symbols-outlined text-[14px]">event</span> 25/08/2023
                </div>
              </div>
              <button className="w-full py-3 rounded-xl border border-dashed border-slate-300 text-slate-400 text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer bg-transparent">
                + Tạo nhắc việc mới
              </button>
            </div>
          </section>

          {/* Định danh khách hàng */}
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-outline-variant/10">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 m-0">Định danh khách hàng</h3>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Phân khúc</span>
                <span className="text-xs font-black text-on-surface">Doanh nghiệp</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Nguồn khách</span>
                <span className="text-xs font-black text-on-surface">Facebook Ads</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Người quản lý</span>
                <div className="flex items-center gap-2">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPF5Iam_lPuIH7FR2nStZWGyaZ2jNcWUpasj_mN9EjlaGeeWKAwt495cRhmlhElQ3ITFvcCGH1OAwNPveoWCBhwLawH9Jxoe5ksinca3O5aL8EP_d_uhoCSWBpUrDYjvDCPLWDCCLRy3yWOnLMoBYAMWBx6f0eDo9MkJYthUaNYrB6MwNJCdpRKb1S2PxphjpoDy-723tn6WW397rrOEEkjgX8YPzDYQHcNN1pZmbXAjjAlMFh1E83Lz1HThulhOgvU-O5LL1B4W4O" className="w-5 h-5 rounded-full" />
                  <span className="text-xs font-black text-on-surface">Trần Thị B</span>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-50 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded">KHÁCH CŨ</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold rounded uppercase">Máy X Series</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-600 text-[10px] font-bold rounded uppercase">Ưu tiên 1</span>
              </div>
            </div>
          </section>

          {/* Upsell Card */}
          <div className="bg-gradient-to-br from-blue-700 to-indigo-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-sm">trending_up</span>
              </div>
              <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest m-0">Tiềm năng bán thêm</p>
              <h4 className="text-xl font-black mt-2 mb-4 leading-tight">SP Model X2 Pro</h4>
              <p className="text-xs text-blue-100 leading-relaxed mb-6">Dựa trên lịch sử sử dụng, khách hàng có 80% khả năng nâng cấp lên dòng Pro vào tháng 12.</p>
              <button className="w-full py-2.5 bg-white text-blue-700 rounded-xl font-bold text-xs hover:bg-slate-100 transition-all border-none cursor-pointer">Xem chi tiết cơ hội</button>
            </div>
            <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-500">
               <span className="material-symbols-outlined" style={{ fontSize: '120px' }}>rocket_launch</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Page ---
import { customerApi } from '@/lib/api';

export default function CustomersPage() {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'LIST' | 'CREATE' | 'DETAIL'>('LIST');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  // Filter & Pagination State
  const [search, setSearch] = useState('');
  const [customerType, setCustomerType] = useState('ALL');
  const [status, setStatus] = useState('ACTIVE');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const params: any = {
        page,
        limit,
        search: search || undefined,
        customer_type: customerType !== 'ALL' ? (customerType === 'Cá nhân' ? 'PERSONAL' : customerType === 'Doanh nghiệp' ? 'BUSINESS' : 'ENTERPRISE') : undefined,
        is_active: status === 'ACTIVE' ? true : status === 'INACTIVE' ? false : undefined
      };
      
      const res = await customerApi.getCustomers(params);
      const rawData = res.data;
      
      // Handle standard paginated response
      if (rawData && typeof rawData === 'object') {
        const list = rawData.data || rawData.items;
        if (Array.isArray(list)) {
          setData(list);
          setTotal(rawData.total || list.length);
          return;
        }
      }
      
      if (Array.isArray(rawData)) {
        setData(rawData);
        setTotal(rawData.length);
      } else {
        setData([]);
        setTotal(0);
      }
    } catch (e) {
      console.error('Fetch error:', e);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and dependency-based fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCustomers();
    }, 400); // Debounce search
    return () => clearTimeout(timer);
  }, [search, customerType, status, page]);

  const handleSave = async (customerData: any) => {
    setLoading(true);
    try {
      const primaryPhone = customerData.contacts?.find((c: any) => c.type === 'Số điện thoại' && c.is_primary)?.value;
      const primaryEmail = customerData.contacts?.find((c: any) => c.type === 'Email' && c.is_primary)?.value;

      const payload = {
        full_name: customerData.full_name,
        customer_type: customerData.customer_type === 'Doanh nghiệp' ? 'BUSINESS' : customerData.customer_type === 'Đại lý' ? 'ENTERPRISE' : 'PERSONAL',
        phone_primary: primaryPhone || undefined,
        email_primary: primaryEmail || undefined,
        source: customerData.source,
        notes: customerData.notes,
        is_active: customerData.status === 'ACTIVE'
      };

      if (customerData.id) {
        await customerApi.updateCustomer(customerData.id, payload);
      } else {
        await customerApi.createCustomer(payload);
      }
      
      setViewMode('LIST');
      fetchCustomers();
    } catch (e: any) {
      console.error(e);
      alert('Lỗi khi lưu khách hàng: ' + (e.response?.data?.message || e.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn lưu kho khách hàng này?')) return;
    try {
      await customerApi.deleteCustomer(id);
      fetchCustomers();
    } catch (e) {
      console.error(e);
      alert('Không thể xóa khách hàng');
    }
  };

  if (viewMode === 'CREATE') return <CustomerForm customer={selectedCustomer} onSave={handleSave} onCancel={() => setViewMode('LIST')} />;
  if (viewMode === 'DETAIL') return <CustomerDetail customer={selectedCustomer} onBack={() => setViewMode('LIST')} />;

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-8 animate-in fade-in duration-700">
      {/* Breadcrumbs & Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div className="space-y-3">
          <nav className="flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">
            <span>Hệ thống</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-primary/70">Danh sách khách hàng</span>
          </nav>
          <h1 className="text-5xl font-black tracking-tight text-on-surface m-0 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500">
            Khách hàng
          </h1>
          <p className="text-slate-500 font-medium text-sm max-w-2xl leading-relaxed m-0">
            Quản lý và tối ưu hóa mối quan hệ với <span className="text-slate-900 font-black underline decoration-primary/30 decoration-2 underline-offset-4">{total} khách hàng</span> đang hoạt động trong hệ thống của bạn.
          </p>
        </div>
        <button 
          onClick={() => { setSelectedCustomer(null); setViewMode('CREATE'); }}
          className="group flex items-center justify-center gap-3 px-8 py-4.5 bg-slate-900 text-white rounded-2xl font-black text-sm shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] hover:-translate-y-1 active:scale-95 transition-all outline-none border-none cursor-pointer"
        >
          <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
            <span className="material-symbols-outlined text-[18px]">add</span>
          </div>
          Thêm khách hàng
        </button>
      </div>

      {/* Modern Tool Bar */}
      <div className="bg-white/40 backdrop-blur-3xl p-5 rounded-[2.5rem] border border-white/60 shadow-[0_8px_40px_-10px_rgba(0,0,0,0.03)] mb-10 flex flex-col xl:flex-row gap-5 items-center">
        <div className="relative w-full xl:w-[450px] group">
          <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
          <input 
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-14 pr-6 py-4.5 bg-white border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all placeholder:text-slate-300 outline-none shadow-sm" 
            placeholder="Tìm tên, số điện thoại hoặc mã KH..." 
            type="text"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto xl:ml-auto">
          <div className="relative min-w-[180px]">
            <select 
              value={customerType}
              onChange={(e) => { setCustomerType(e.target.value); setPage(1); }}
              className="w-full appearance-none pl-5 pr-12 py-4.5 bg-white border border-slate-100 rounded-3xl text-xs font-black text-slate-600 uppercase tracking-wider focus:ring-4 focus:ring-primary/5 cursor-pointer outline-none shadow-sm transition-all"
            >
              <option value="ALL">Tất cả loại khách</option>
              <option>Cá nhân</option>
              <option>Doanh nghiệp</option>
              <option>Đại lý</option>
            </select>
            <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">expand_more</span>
          </div>

          <div className="relative min-w-[200px]">
            <select 
              value={status}
              onChange={(e) => { setStatus(e.target.value); setPage(1); }}
              className="w-full appearance-none pl-5 pr-12 py-4.5 bg-white border border-slate-100 rounded-3xl text-xs font-black text-slate-600 uppercase tracking-wider focus:ring-4 focus:ring-primary/5 cursor-pointer outline-none shadow-sm transition-all"
            >
              <option value="ACTIVE">Đang hoạt động</option>
              <option value="INACTIVE">Đã tạm dừng</option>
              <option value="ALL">Tất cả trạng thái</option>
            </select>
            <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">settings</span>
          </div>

          <button className="flex items-center gap-3 px-6 py-4.5 bg-white border border-slate-100 rounded-3xl text-xs font-black text-slate-500 uppercase tracking-wider hover:bg-slate-50 hover:text-primary transition-all shadow-sm border-none cursor-pointer outline-none">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            Bộ lọc nâng cao
          </button>
          
          <div className="w-[1px] h-10 bg-slate-100 mx-2 hidden xl:block"></div>
          
          <button className="w-12 h-12 flex items-center justify-center bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-primary hover:shadow-md transition-all cursor-pointer outline-none border-none">
            <span className="material-symbols-outlined">download</span>
          </button>
        </div>
      </div>

      {/* Premium Table Section */}
      <div className="bg-white/60 backdrop-blur-xl rounded-[3rem] p-4 border border-white/80 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100/50">
                <th className="px-8 py-7">Mã KH</th>
                <th className="px-8 py-7">Khách hàng</th>
                <th className="px-8 py-7">SĐT Chính</th>
                <th className="px-8 py-7">Loại</th>
                <th className="px-8 py-7">Mua gần nhất</th>
                <th className="px-8 py-7">Trạng thái</th>
                <th className="px-8 py-7">Phụ trách</th>
                <th className="px-8 py-7">Cập nhật</th>
                <th className="px-8 py-7 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading && <tr><td colSpan={9} className="p-20 text-center"><div className="w-12 h-12 border-4 border-slate-100 border-t-primary rounded-full animate-spin mx-auto"></div><p className="mt-4 text-xs font-black text-slate-300 uppercase tracking-widest">Đang kết nối dữ liệu...</p></td></tr>}
              {!loading && data?.length === 0 && <tr><td colSpan={9} className="p-20 text-center text-slate-300 font-black uppercase tracking-widest text-xs">Chưa có thông tin khách hàng nào</td></tr>}
              
              {!loading && data?.map((customer: any, idx) => {
                const primaryPhone = customer.phone_primary || '—';
                const avatarCode = customer.full_name?.split(' ').map((n:string)=>n[0]).join('').slice(0, 2).toUpperCase() || 'KH';
                
                const colors = ['bg-blue-100 text-blue-600', 'bg-purple-100 text-purple-600', 'bg-amber-100 text-amber-600', 'bg-emerald-100 text-emerald-600', 'bg-rose-100 text-rose-600'];
                const colorClass = colors[idx % colors.length];

                const typeLabels: any = { 'PERSONAL': 'Cá nhân', 'BUSINESS': 'Doanh nghiệp', 'ENTERPRISE': 'Đại lý' };
                const typeColors: any = { 
                  'PERSONAL': 'bg-blue-50 text-blue-500 border-blue-100', 
                  'BUSINESS': 'bg-purple-50 text-purple-500 border-purple-100', 
                  'ENTERPRISE': 'bg-amber-50 text-amber-600 border-amber-100' 
                };

                return (
                  <tr 
                    key={customer.id} 
                    onClick={() => { setSelectedCustomer(customer); setViewMode('DETAIL'); }} 
                    className="group hover:bg-slate-50/50 transition-all cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-500"
                    style={{ animationDelay: `${idx * 10}ms` }}
                  >
                    <td className="px-8 py-6">
                      <span className="text-xs font-black text-slate-300 group-hover:text-primary transition-colors">#{customer.code || customer.id.slice(0,6).toUpperCase()}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xs font-black shadow-sm ${colorClass} border-2 border-white`}>
                          {avatarCode}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 m-0 group-hover:text-primary transition-colors">{customer.full_name}</p>
                          <p className="text-[11px] font-bold text-slate-400 m-0 mt-0.5">{customer.email_primary || 'chưa có email'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-xs font-black text-slate-700 m-0">{primaryPhone}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase border ${typeColors[customer.customer_type] || 'bg-slate-50 text-slate-400'}`}>
                        {typeLabels[customer.customer_type] || 'Cá nhân'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-xs font-black text-slate-700 m-0">{new Date(customer.created_at).toLocaleDateString('vi-VN')}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${customer.is_active ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-tighter italic">{customer.is_active ? 'Hoạt động' : 'Tạm dừng'}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-slate-100 border border-white shadow-sm flex items-center justify-center overflow-hidden text-[10px] font-black text-slate-300">
                           {customer.owner?.full_name?.[0] || 'NV'}
                        </div>
                        <span className="text-xs font-black text-slate-600">{customer.owner?.full_name || 'Chưa gán'}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-[11px] font-black text-slate-400 italic m-0">
                        {new Date(customer.updated_at).toLocaleDateString('vi-VN')}
                      </p>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                         <button className="w-9 h-9 flex items-center justify-center bg-white rounded-xl text-slate-400 hover:text-primary hover:shadow-md transition-all border-none cursor-pointer"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                         <button onClick={(e) => { e.stopPropagation(); setSelectedCustomer(customer); setViewMode('CREATE'); }} className="w-9 h-9 flex items-center justify-center bg-white rounded-xl text-slate-400 hover:text-primary hover:shadow-md transition-all border-none cursor-pointer"><span className="material-symbols-outlined text-[18px]">edit_square</span></button>
                         <button onClick={(e) => { e.stopPropagation(); handleDelete(customer.id); }} className="w-9 h-9 flex items-center justify-center bg-white rounded-xl text-slate-400 hover:text-error hover:shadow-md transition-all border-none cursor-pointer"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                       </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Modern Pagination */}
        <div className="px-8 py-7 bg-slate-50/50 border-t border-slate-100/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest m-0">
            Hiển thị <span className="text-slate-900 border-b-2 border-primary/20 pb-0.5">{(page-1)*limit + 1}-{Math.min(page*limit, total)}</span> trong số <span className="text-slate-900 font-bold">{total}</span> khách hàng
          </p>
          <div className="flex items-center gap-2">
            <button 
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white border border-slate-100 text-slate-300 hover:text-primary transition-all cursor-pointer outline-none border-none shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <div className="flex items-center gap-1.5 px-3">
              {Array.from({ length: Math.ceil(total / limit) }).map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 flex items-center justify-center rounded-2xl font-black text-xs transition-all cursor-pointer outline-none border-none ${page === i + 1 ? 'bg-slate-900 text-white shadow-lg' : 'bg-transparent text-slate-400 hover:bg-white hover:shadow-sm'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              disabled={page >= Math.ceil(total / limit)}
              onClick={() => setPage(page + 1)}
              className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white border border-slate-100 text-slate-300 hover:text-primary transition-all cursor-pointer outline-none border-none shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
