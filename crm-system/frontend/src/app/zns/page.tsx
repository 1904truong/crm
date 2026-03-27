'use client';

import React, { useState, useEffect } from 'react';
import { znsApi, customerApi } from '@/lib/api';

export default function ZnsPage() {
  const [loading, setLoading] = useState(false);
  const [templates, setTemplates] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);

  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [variables, setVariables] = useState<any>({});

  const fetchData = async () => {
    try {
      const [tplRes, custRes] = await Promise.all([
        znsApi.getTemplates().catch(() => ({ data: [] })),
        customerApi.getCustomers().catch(() => ({ data: [] }))
      ]);
      setTemplates(tplRes.data || []);
      setCustomers(custRes.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTemplateChange = (e: any) => {
    const tId = e.target.value;
    const tpl = templates.find((t: any) => t.id === tId);
    setSelectedTemplate(tpl);
    if (tpl) {
      const defaultVars = JSON.parse(tpl.variables || '[]').reduce((acc: any, key: string) => {
        acc[key] = '';
        return acc;
      }, {});
      setVariables(defaultVars);
    }
  };

  const handleSend = async () => {
    if (!phoneNumber || !selectedTemplate) return alert('Vui lòng chọn template và nhập SĐT');
    setLoading(true);
    try {
      await znsApi.sendTestZns({
        template_id: selectedTemplate.id,
        phone: phoneNumber,
        data: variables
      });
      alert('Gửi tin nhắn ZNS thành công');
      fetchData();
    } catch (e) {
      console.error(e);
      alert('Thất bại khi gửi ZNS');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div className="space-y-8">
        {/* Breadcrumb & Title */}
        <div className="space-y-2 mb-8">
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <span>Hệ thống</span>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-primary font-medium">Zalo ZNS</span>
          </nav>
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-on-surface m-0">Zalo ZNS — Gửi thủ công</h2>
              <p className="text-slate-500 text-sm mt-1 m-0">Thiết lập và gửi thông báo Zalo Notification Service trực tiếp đến Khách hàng.</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-surface-container-high rounded-full transition-colors border-none bg-transparent cursor-pointer">
                <span className="material-symbols-outlined">help_outline</span>
                <span>Nạp Tokens ZNS</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column: Form & Config */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            {/* Section: Target & Template */}
            <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-6 bg-primary rounded-full"></div>
                <h3 className="text-lg font-bold text-on-surface m-0">Cấu hình thông báo</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recipient Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-on-surface-variant">Chọn khách hàng</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-surface-container-low border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary appearance-none outline-none"
                      onChange={(e) => {
                        const cust = customers.find((c:any) => c.id === e.target.value);
                        if(cust) setPhoneNumber(cust.contacts?.[0]?.value || '');
                        if(cust) setVariables({...variables, customer_name: cust.full_name});
                      }}
                    >
                      <option value="">Tìm theo tên hệ thống...</option>
                      {customers.map((c:any) => (
                        <option key={c.id} value={c.id}>{c.full_name} - {c.contacts?.[0]?.value}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
                  </div>
                  <p className="text-xs text-slate-500 italic m-0 mt-1">Hoặc nhập trực tiếp SĐT ở phía dưới</p>
                </div>
                {/* Manual Phone Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-on-surface-variant">Số điện thoại nhận</label>
                  <input 
                    className="w-full bg-surface-container-low border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary outline-none" 
                    placeholder="Ví dụ: 090xxxxxxx" 
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                {/* Template Selection */}
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <label className="block text-sm font-semibold text-on-surface-variant">Chọn Template ZNS</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-surface-container-low border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary appearance-none outline-none"
                      onChange={handleTemplateChange}
                      value={selectedTemplate?.id || ""}
                    >
                      <option value="">--- Xin hãy chọn Mẫu ZNS ---</option>
                      {templates.length === 0 && (
                        <>
                          <option value="fake1">Xác nhận đơn hàng thành công (template_id: 12456)</option>
                          <option value="fake2">Thông báo bảo hành sắp hết hạn (template_id: 98721)</option>
                          <option value="fake3">Lời chúc sinh nhật khách hàng (template_id: 34567)</option>
                        </>
                      )}
                      {templates.map((t:any) => (
                        <option key={t.id} value={t.id}>{t.name} (template_id: {t.template_id})</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Dynamic Variables */}
            <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full"></div>
                  <h3 className="text-lg font-bold text-on-surface m-0">Tham số biến (Variables Mapping)</h3>
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded">{Object.keys(variables).length || 3} biến yêu cầu</span>
              </div>
              <div className="overflow-hidden border border-surface-container-high rounded-lg">
                <table className="w-full text-left text-sm border-collapse">
                  <thead className="bg-surface-container-low text-slate-600 font-semibold border-none">
                    <tr>
                      <th className="px-4 py-3">Tên biến (Key)</th>
                      <th className="px-4 py-3">Giá trị truyền vào (Value)</th>
                      <th className="px-4 py-3">Kiểu dữ liệu</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-high">
                    {/* Fallback to standard 3 keys if template defines none (for mockup purposes) */}
                    {['customer_name', 'order_id', 'delivery_date'].map((key) => (
                      <tr key={key} className="hover:bg-surface-container-low transition-colors">
                        <td className="px-4 py-4 font-mono text-xs text-blue-600 border-none">{key}</td>
                        <td className="px-4 py-4 border-none">
                          <input 
                            className="w-full bg-white border border-outline-variant rounded px-3 py-1.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" 
                            type="text" 
                            value={variables[key] || ''}
                            onChange={(e) => setVariables({...variables, [key]: e.target.value})}
                          />
                        </td>
                        <td className="px-4 py-4 text-slate-500 border-none">String</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section: History */}
            <section className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="p-8 pb-0">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-6 bg-primary rounded-full"></div>
                  <h3 className="text-lg font-bold text-on-surface m-0">Lịch sử gửi gần đây</h3>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead className="bg-slate-50 border-y border-slate-100 text-slate-500 font-medium">
                    <tr>
                      <th className="px-8 py-4">Thời gian</th>
                      <th className="px-6 py-4">Khách hàng</th>
                      <th className="px-6 py-4">Template</th>
                      <th className="px-6 py-4">Trạng thái</th>
                      <th className="px-8 py-4 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {logs.length === 0 && (
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td colSpan={5} className="px-8 py-8 text-center text-slate-500 border-none">Chưa có lịch sử gửi ZNS.</td>
                      </tr>
                    )}
                    {logs.map((log:any) => (
                      <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-4 text-slate-600 border-none">{new Date(log.created_at).toLocaleString('vi-VN')}</td>
                        <td className="px-6 py-4 border-none">
                          <div className="font-semibold text-on-surface">{log.customer?.full_name || 'Khách vãng lai'}</div>
                          <div className="text-xs text-slate-400">{log.recipient_phone}</div>
                        </td>
                        <td className="px-6 py-4 text-slate-500 border-none">{log.template?.name || 'Mẫu tin ZNS'}</td>
                        <td className="px-6 py-4 border-none">
                          {log.status === 'SENT' ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Thành công
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Lỗi hệ thống
                            </span>
                          )}
                        </td>
                        <td className="px-8 py-4 text-right border-none">
                          <button className="text-primary hover:underline text-xs font-bold border-none bg-transparent cursor-pointer">Chi tiết</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Right Column: Preview & Actions */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            <div className="sticky top-24 space-y-6">
              {/* Preview Zalo Card */}
              <div className="bg-surface-container-lowest rounded-xl p-8 shadow-lg border border-primary/5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest m-0">Xem trước (Preview)</h3>
                  <div className="w-8 h-8 rounded-full bg-[#0068ff] flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-sm">chat</span>
                  </div>
                </div>
                {/* Zalo Mockup Card */}
                <div className="bg-[#f0f2f5] rounded-xl p-4 max-w-xs mx-auto shadow-inner relative overflow-hidden">
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-100">
                    <div className="bg-primary/5 px-4 py-3 border-b border-slate-50">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                          <span className="material-symbols-outlined text-[14px] text-white">verified</span>
                        </div>
                        <span className="text-[11px] font-bold text-primary">OA QUẢN TRỊ VIÊN</span>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <h4 className="text-sm font-bold text-on-surface m-0 text-balance leading-tight">Xác nhận đơn hàng thành công</h4>
                      <p className="text-xs text-slate-600 leading-relaxed m-0">
                        Chào <span className="font-bold text-on-surface">{variables.customer_name || '[customer_name]'}</span>, đơn hàng <span className="font-bold text-on-surface">{variables.order_id || '[order_id]'}</span> của bạn đã được xác nhận. Dự kiến giao hàng vào <span className="font-bold text-on-surface">{variables.delivery_date || '[delivery_date]'}</span>.
                      </p>
                      <div className="pt-3 border-t border-slate-50 mt-3">
                        <button className="w-full py-2 bg-[#f0f2f5] rounded text-blue-600 text-xs font-bold border-none">Theo dõi đơn hàng</button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <span className="text-[10px] text-slate-400">14:45</span>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <button 
                    disabled={loading}
                    onClick={handleSend}
                    className={`w-full bg-primary hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-md shadow-blue-200 transition-all flex items-center justify-center gap-2 group border-none cursor-pointer ${loading ? 'opacity-70 pointer-events-none' : ''}`}
                  >
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">send</span>
                    {loading ? 'Đang gửi thông báo...' : 'Gửi thông báo ngay'}
                  </button>
                  <button className="w-full bg-white border-2 border-primary text-primary hover:bg-primary/5 font-bold py-3.5 rounded-xl transition-all cursor-pointer">
                    Lưu bản nháp
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-amber-600">
                    <span className="material-symbols-outlined text-lg">info</span>
                    <span className="text-xs font-medium">Chi phí ước tính: 550đ / tin nhắn</span>
                  </div>
                </div>
              </div>

              {/* Additional Info / Quick Actions Card */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-xl relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="font-bold mb-2 m-0">Số dư tài khoản ZNS</h4>
                  <div className="text-3xl font-extrabold mb-4 mt-2">2,450,000đ</div>
                  <div className="flex items-center justify-between text-xs text-blue-100">
                    <span>Hạn mức còn lại: ~4,450 tin</span>
                    <button className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full font-bold transition-colors border-none text-white cursor-pointer hover:shadow-lg">Nạp thêm</button>
                  </div>
                </div>
                <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-500">
                  <span className="material-symbols-outlined" style={{ fontSize: '120px' }}>account_balance_wallet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
