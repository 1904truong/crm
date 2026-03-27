'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';

// --- Sub-Components ---

const PurchaseForm = ({ onSave, onCancel }: { onSave: (data: any) => void, onCancel: () => void }) => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    customer_id: '',
    purchase_at: new Date().toISOString().slice(0, 10),
    source: 'Website',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/customers').then(res => setCustomers(res.data)).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 pt-10 px-4">
      <div className="space-y-1">
        <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <span>Quản lý đơn hàng</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary">Tạo mới</span>
        </nav>
        <h2 className="text-4xl font-black text-slate-900 m-0 mt-2">Tạo sự kiện mua hàng mới</h2>
        <p className="text-slate-500 italic text-sm m-0 mt-1">"Chi tiết hóa mọi hành vi khách hàng là bước đầu của sự thấu hiểu."</p>
      </div>

      <div className="bg-white p-12 rounded-[40px] shadow-sm border border-outline-variant/5">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <div className="md:col-span-2 space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Khách hàng *</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">person_search</span>
                <select 
                  required
                  value={formData.customer_id}
                  onChange={(e) => setFormData({...formData, customer_id: e.target.value})}
                  className="w-full pl-14 pr-12 py-5 bg-slate-50 border-none rounded-2xl text-sm appearance-none outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900 cursor-pointer"
                >
                  <option value="">Tìm kiếm hoặc chọn khách hàng...</option>
                  {customers.map(c => <option key={c.id} value={c.id}>{c.full_name} ({c.code})</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">unfold_more</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Ngày mua hàng</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">calendar_today</span>
                <input 
                  type="date"
                  value={formData.purchase_at}
                  onChange={(e) => setFormData({...formData, purchase_at: e.target.value})}
                  className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900" 
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Nguồn mua</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">hub</span>
                <select 
                  value={formData.source}
                  onChange={(e) => setFormData({...formData, source: e.target.value})}
                  className="w-full pl-14 pr-12 py-5 bg-slate-50 border-none rounded-2xl text-sm appearance-none outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900 cursor-pointer"
                >
                  <option>Website</option>
                  <option>Facebook</option>
                  <option>Zalo</option>
                  <option>Trực tiếp tại cửa hàng</option>
                  <option>Giới thiệu</option>
                </select>
                <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
              </div>
            </div>

            <div className="md:col-span-2 space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Ghi chú đơn hàng</label>
              <textarea 
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="w-full bg-slate-50 border-none rounded-3xl p-6 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all min-h-[160px] resize-none font-medium text-slate-900" 
                placeholder="Nhập ghi chú hoặc các yêu cầu đặc biệt của khách hàng..."
              ></textarea>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 pt-6">
            <button 
              type="submit"
              disabled={loading}
              className="w-full md:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-2xl shadow-blue-600/30 hover:scale-[1.02] active:scale-95 transition-all outline-none border-none cursor-pointer disabled:opacity-50"
            >
              <span className="material-symbols-outlined">save</span>
              {loading ? 'Đang lưu...' : 'Lưu thông tin'}
            </button>
            <button type="button" onClick={onCancel} className="mt-4 md:mt-0 md:ml-auto text-slate-400 font-bold hover:text-slate-900 transition-colors border-none bg-transparent cursor-pointer">Hủy bỏ</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EditProductForm = ({ onSave, onCancel, initialData }: { onSave: (data: any) => void, onCancel: () => void, initialData?: any }) => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    customer_id: initialData?.customer_id || '',
    purchase_id: initialData?.purchase_id || '',
    product_model: initialData?.product_model || '',
    product_serial: initialData?.product_serial || '',
    purchase_date: initialData?.purchase_date?.slice(0, 10) || new Date().toISOString().slice(0, 10),
    warranty_months: initialData?.warranty_months || 24,
    notes: initialData?.notes || '',
    source: initialData?.source || 'Website'
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/customers').then(res => setCustomers(res.data)).catch(console.error);
  }, []);

  useEffect(() => {
    if (formData.customer_id) {
      api.get(`/purchases/customers/${formData.customer_id}`)
        .then(res => setEvents(res.data))
        .catch(console.error);
    }
  }, [formData.customer_id]);

  const warrantyEndDate = new Date(formData.purchase_date);
  warrantyEndDate.setMonth(warrantyEndDate.getMonth() + Number(formData.warranty_months));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-20 pt-8 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <nav className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
          <span>Sản phẩm đã mua</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary">Thêm mới</span>
        </nav>
        <h2 className="text-3xl font-black text-slate-900 m-0">Thêm Sản phẩm Khách hàng mới</h2>
        <p className="text-slate-500 text-sm m-0 mt-2">Vui lòng điền đầy đủ thông tin để theo dõi lịch sử bảo hành sản phẩm.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[32px] shadow-sm border border-outline-variant/10 space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary">person</span>
            <h4 className="text-lg font-black text-slate-900 m-0">Thông tin khách hàng</h4>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase text-slate-500 ml-1">Chọn Khách hàng *</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <select 
                  required
                  value={formData.customer_id}
                  onChange={(e) => setFormData({...formData, customer_id: e.target.value})}
                  className="w-full pl-12 pr-10 py-4 bg-slate-50 border-2 border-transparent focus:border-primary/20 rounded-2xl text-sm appearance-none outline-none transition-all font-medium text-slate-900 cursor-pointer"
                >
                  <option value="">Tìm kiếm theo tên hoặc mã khách hàng...</option>
                  {customers.map(c => <option key={c.id} value={c.id}>{c.full_name} ({c.code})</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase text-slate-500 ml-1">Sự kiện mua hàng (Không bắt buộc)</label>
              <div className="relative">
                <select 
                  value={formData.purchase_id}
                  onChange={(e) => setFormData({...formData, purchase_id: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-primary/20 rounded-2xl text-sm appearance-none outline-none transition-all font-medium text-slate-900 cursor-pointer"
                >
                  <option value="">-- Tạo mua hàng mới cùng lúc --</option>
                  {events.map(ev => <option key={ev.id} value={ev.id}>{new Date(ev.purchase_date).toLocaleDateString()} - {ev.source}</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase text-slate-500 ml-1">Ghi chú chi tiết</label>
              <textarea 
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="w-full bg-slate-50 border-2 border-transparent focus:border-primary/20 rounded-2xl p-5 text-sm outline-none transition-all min-h-[140px] resize-none font-medium text-slate-900" 
                placeholder="Nhập ghi chú hoặc yêu cầu của khách hàng cho sản phẩm này..."
              ></textarea>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[32px] shadow-sm border border-outline-variant/10 space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary">inventory_2</span>
            <h4 className="text-lg font-black text-slate-900 m-0">Chi tiết sản phẩm & Bảo hành</h4>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase text-slate-500 ml-1">Model sản phẩm *</label>
              <input 
                required
                placeholder="VD: ASUS ROG Zephyrus G14"
                value={formData.product_model}
                onChange={(e) => setFormData({...formData, product_model: e.target.value})}
                className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-primary/20 rounded-2xl text-sm outline-none transition-all font-medium text-slate-900" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase text-slate-500 ml-1">Số Serial *</label>
                <input 
                  required
                  placeholder="SN-ASUS-992102"
                  value={formData.product_serial}
                  onChange={(e) => setFormData({...formData, product_serial: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-primary/20 rounded-2xl text-sm outline-none transition-all font-medium text-slate-900" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase text-slate-500 ml-1">Ngày mua</label>
                <input 
                  type="date"
                  value={formData.purchase_date}
                  onChange={(e) => setFormData({...formData, purchase_date: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-primary/20 rounded-2xl text-sm outline-none transition-all font-medium text-slate-900" 
                />
              </div>
            </div>

            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-slate-700">Chu kỳ bảo hành</span>
                <div className="flex items-center gap-2">
                  <input 
                    type="number"
                    value={formData.warranty_months}
                    onChange={(e) => setFormData({...formData, warranty_months: Number(e.target.value)})}
                    className="w-16 px-2 py-1 bg-white border border-blue-200 rounded text-center text-sm font-bold text-primary outline-none"
                  />
                  <span className="text-xs font-medium text-slate-500">tháng</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Ngày bắt đầu</p>
                  <p className="text-sm font-black text-slate-700">{new Date(formData.purchase_date).toLocaleDateString('vi-VN')}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase font-bold text-primary mb-1">Ngày kết thúc (Dự kiến)</p>
                  <p className="text-sm font-black text-primary underline underline-offset-4">{warrantyEndDate.toLocaleDateString('vi-VN')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex items-center justify-between bg-white/80 backdrop-blur-md p-6 border-t border-slate-100 sticky bottom-0 z-10 -mx-6 md:mx-0 md:rounded-b-[32px]">
          <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase">
            <span className="material-symbols-outlined text-sm">info</span>
            Vui lòng kiểm tra kỹ số Serial trước khi lưu
          </div>
          <div className="flex items-center gap-6">
            <button type="button" onClick={onCancel} className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors border-none bg-transparent cursor-pointer">Hủy</button>
            <button 
              type="submit" 
              disabled={loading}
              className="px-10 py-4 bg-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all outline-none border-none cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Đang lưu...' : 'Lưu sản phẩm'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const ProductDetailView = ({ productId, onBack }: { productId: string, onBack: () => void }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/purchases/products/${productId}`)
      .then(res => setData(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) return <div className="p-20 text-center font-bold text-slate-400">Đang tải chi tiết sản phẩm...</div>;
  if (!data) return <div className="p-20 text-center font-bold text-red-400">Không tìm thấy sản phẩm.</div>;

  const customerName = data.customer?.full_name || 'Khách lẻ';
  const warrantyDaysLeft = data.warranty_days_left;

  return (
    <div className="max-w-7xl mx-auto pb-20 pt-8 px-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 text-left">
        <div>
          <nav className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
            <span>Sản phẩm</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary">Chi tiết sản phẩm</span>
          </nav>
          <div className="flex items-center gap-4">
            <h2 className="text-4xl font-black text-slate-900 m-0">{data.product_model}</h2>
            <span className={`px-3 py-1 text-[11px] font-black rounded-full uppercase border ${
              data.warranty_status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
              data.warranty_status === 'EXPIRING_SOON' ? 'bg-amber-50 text-amber-700 border-amber-100' :
              'bg-red-50 text-red-700 border-red-100'
            }`}>
              {data.warranty_status === 'ACTIVE' ? 'Còn hạn' : data.warranty_status === 'EXPIRING_SOON' ? 'Sắp hết' : 'Hết hạn'}
            </span>
            <span className="text-slate-400 font-mono text-sm">#{data.product_serial}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="flex items-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:scale-105 active:scale-95 transition-all border-none cursor-pointer shadow-lg outline-none">
            <span className="material-symbols-outlined">arrow_back</span>
            Quay lại
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-outline-variant/10 relative overflow-hidden text-left">
            <div className="absolute top-8 right-8 text-slate-100">
              <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </div>
            
            <h4 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
              Thông tin bảo hành
              <span className="material-symbols-outlined text-slate-300 text-lg">check_circle</span>
            </h4>

            <div className="grid grid-cols-2 gap-x-12 gap-y-10 relative">
              <div>
                <p className="text-[11px] uppercase font-bold text-slate-400 mb-1">Chủ sở hữu</p>
                <p className="text-lg font-black text-slate-900 m-0">{customerName}</p>
                <p className="text-xs text-slate-400 mt-1">{data.customer?.contacts?.[0]?.value}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] uppercase font-bold text-slate-400 mb-1">Ngày mua hàng</p>
                <p className="text-lg font-black text-slate-900 m-0">{new Date(data.purchase_date).toLocaleDateString('vi-VN')}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase font-bold text-slate-400 mb-1">Thời hạn bảo hành</p>
                <p className="text-lg font-black text-slate-900 m-0">{data.warranty_months} tháng</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] uppercase font-bold text-slate-400 mb-1">Tình trạng</p>
                <p className={`text-4xl font-black m-0 ${warrantyDaysLeft > 0 ? 'text-primary' : 'text-red-500'}`}>
                  {warrantyDaysLeft > 0 ? warrantyDaysLeft : 0} 
                  <span className="text-xs font-bold text-slate-400 ml-1">ngày còn lại</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-outline-variant/10 text-left">
            <h4 className="text-xl font-black text-slate-900 mb-8">Chi Tiết Đơn Hàng</h4>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-slate-50">
                <span className="text-sm text-slate-500">Mã đơn hàng</span>
                <span className="text-sm font-bold">#{data.purchase?.id?.slice(-8).toUpperCase()}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-slate-50">
                <span className="text-sm text-slate-500">Nguồn mua</span>
                <span className="text-sm font-bold">{data.purchase?.source}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-sm text-slate-500">Ghi chú đơn</span>
                <span className="text-sm font-medium text-slate-600 max-w-[60%] text-right">{data.purchase?.notes || 'Không có ghi chú'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8 text-left">
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-outline-variant/10">
            <h4 className="text-lg font-black text-slate-900 mb-10">Lịch sử Bảo Hành</h4>
            <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
               {data.warranty_cases?.length > 0 ? data.warranty_cases.map((wc: any, i:number) => (
                  <div key={wc.id} className="relative pl-10">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white ring-4 ring-white">
                      <span className="material-symbols-outlined text-[14px]">build</span>
                    </div>
                    <h5 className="text-sm font-black text-slate-900 m-0">{wc.status}</h5>
                    <p className="text-[11px] text-slate-400 mt-1 uppercase font-bold">{new Date(wc.opened_at).toLocaleDateString()}</p>
                    <p className="text-xs text-slate-500 mt-2 italic">"{wc.issue_description}"</p>
                  </div>
               )) : (
                 <div className="pl-10 text-slate-300 italic text-sm">Chưa có lịch sử bảo hành cho sản phẩm này.</div>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProductsPage() {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'LIST' | 'CREATE_EVENT' | 'EDIT_PRODUCT' | 'DETAILS'>('LIST');
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/purchases/products');
      setData(res.data);
      setFilteredData(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = data;
    if (searchQuery) {
      result = result.filter(item => 
        item.product_model?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.product_serial?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.customer?.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (statusFilter !== 'ALL') {
      result = result.filter(item => item.warranty_status === statusFilter);
    }
    setFilteredData(result);
  }, [searchQuery, statusFilter, data]);

  const handleCreateEvent = async (formData: any) => {
    try {
      await api.post(`/purchases/customers/${formData.customer_id}`, {
        purchase_date: formData.purchase_at,
        source: formData.source,
        notes: formData.notes
      });
      setViewMode('LIST');
      fetchProducts();
    } catch (e) {
      alert('Lỗi khi lưu sự kiện mua hàng');
    }
  };

  const handleSaveProduct = async (formData: any) => {
    try {
      if (formData.purchase_id) {
        // Link to existing purchase
        await api.post(`/purchases/${formData.purchase_id}/products`, {
          customer_id: formData.customer_id,
          product_model: formData.product_model,
          product_serial: formData.product_serial,
          purchase_date: formData.purchase_date,
          warranty_months: formData.warranty_months
        });
      } else {
        // Create new purchase + product
        await api.post(`/purchases/customers/${formData.customer_id}/products`, {
          product_model: formData.product_model,
          product_serial: formData.product_serial,
          purchase_date: formData.purchase_date,
          warranty_months: formData.warranty_months,
          source: formData.source,
          notes: formData.notes
        });
      }
      setViewMode('LIST');
      fetchProducts();
    } catch (e) {
      alert('Lỗi khi lưu thông tin sản phẩm');
    }
  };

  if (viewMode === 'CREATE_EVENT') return <PurchaseForm onSave={handleCreateEvent} onCancel={() => setViewMode('LIST')} />;
  if (viewMode === 'EDIT_PRODUCT') return <EditProductForm onSave={handleSaveProduct} onCancel={() => setViewMode('LIST')} />;
  if (viewMode === 'DETAILS') return <ProductDetailView productId={selectedProductId} onBack={() => setViewMode('LIST')} />;

  const stats = {
    active: data.filter(i => i.warranty_status === 'ACTIVE').length,
    expiring: data.filter(i => i.warranty_status === 'EXPIRING_SOON').length,
    expired: data.filter(i => i.warranty_status === 'EXPIRED').length
  };

  return (
    <div className="pb-12 text-center">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 animate-in fade-in duration-500">
        <div className="text-left">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <span>Hệ thống</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-primary font-medium">Sản phẩm đã mua</span>
          </nav>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 m-0">Quản lý Sản phẩm đã mua</h3>
          <p className="text-sm text-slate-500 mt-1 m-0">Theo dõi bảo hành và lịch sử mua sắm của khách hàng</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setViewMode('CREATE_EVENT')}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all text-sm font-bold border-none cursor-pointer outline-none"
          >
            <span className="material-symbols-outlined text-lg">add_circle</span>
            Tạo sự kiện
          </button>
          <button 
            onClick={() => setViewMode('EDIT_PRODUCT')}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-600/20 transition-all text-sm font-bold border-none cursor-pointer outline-none"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Thêm sản phẩm mới
          </button>
        </div>
      </div>

      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mb-8 animate-in fade-in duration-700 text-left">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Tìm kiếm nhanh</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-blue-500/20 transition-all outline-none" 
                placeholder="Tên khách / Serial / Model..." type="text"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Trạng thái bảo hành</label>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none cursor-pointer"
            >
              <option value="ALL">Tất cả trạng thái</option>
              <option value="ACTIVE">Còn hạn</option>
              <option value="EXPIRING_SOON">Sắp hết hạn</option>
              <option value="EXPIRED">Đã hết hạn</option>
            </select>
          </div>
          <div className="flex items-end pb-0.5">
             <button onClick={() => {setSearchQuery(''); setStatusFilter('ALL');}} className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors bg-transparent border-none cursor-pointer underline underline-offset-4">Đặt lại bộ lọc</button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200 mb-8 animate-in fade-in duration-1000">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Khách hàng</th>
                <th className="px-6 py-4">Sản phẩm</th>
                <th className="px-6 py-4">Serial / SKU</th>
                <th className="px-6 py-4">Ngày mua</th>
                <th className="px-6 py-4">Trạng thái BH</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && <tr><td colSpan={6} className="p-12 text-center text-slate-400 font-medium">Đang tải dữ liệu...</td></tr>}
              {!loading && filteredData.length === 0 && <tr><td colSpan={6} className="p-12 text-center text-slate-400 font-medium italic">Không tìm thấy sản phẩm phù hợp.</td></tr>}

              {!loading && filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-black text-[11px] uppercase border border-blue-200">
                        {item.customer?.full_name?.slice(0, 2) || 'KH'}
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-sm text-slate-900 m-0">{item.customer?.full_name || 'Khách lẻ'}</p>
                        <p className="text-[11px] text-slate-400 m-0 font-medium">{item.customer?.contacts?.[0]?.value || 'N/A'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="font-bold text-sm text-slate-900 m-0">{item.product_model}</p>
                    <p className="text-[11px] text-slate-400 m-0 font-medium">Bảo hành {item.warranty_months} tháng</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="font-mono text-[12px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {item.product_serial}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-slate-600">
                    {new Date(item.purchase_date).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-5">
                     <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase border ${
                        item.warranty_status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        item.warranty_status === 'EXPIRING_SOON' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                        'bg-red-50 text-red-700 border-red-100'
                     }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          item.warranty_status === 'ACTIVE' ? 'bg-emerald-500' :
                          item.warranty_status === 'EXPIRING_SOON' ? 'bg-amber-500 animate-pulse' :
                          'bg-red-500'
                        }`}></span>
                        {item.warranty_status === 'ACTIVE' ? 'Còn hạn' : item.warranty_status === 'EXPIRING_SOON' ? 'Sắp hết' : 'Hết hạn'}
                     </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button 
                      onClick={() => { setSelectedProductId(String(item.id)); setViewMode('DETAILS'); }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-primary hover:border-primary transition-all cursor-pointer outline-none shadow-sm"
                    >
                      <span className="material-symbols-outlined text-sm">visibility</span>
                      <span className="text-[10px] font-bold uppercase">Chi tiết</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-1000">
        <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100/50 flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <span className="material-symbols-outlined">verified</span>
          </div>
          <div>
            <p className="text-xs font-bold text-emerald-800/60 uppercase tracking-wider m-0">Đang bảo hành</p>
            <h4 className="text-2xl font-black text-emerald-900 m-0 mt-1">{stats.active} <span className="text-sm font-medium opacity-60 uppercase">SP</span></h4>
          </div>
        </div>
        <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100/50 flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
            <span className="material-symbols-outlined">hourglass_top</span>
          </div>
          <div>
            <p className="text-xs font-bold text-amber-800/60 uppercase tracking-wider m-0">Sắp hết hạn</p>
            <h4 className="text-2xl font-black text-amber-900 m-0 mt-1">{stats.expiring} <span className="text-sm font-medium opacity-60 uppercase">SP</span></h4>
          </div>
        </div>
        <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100/50 flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-500/20">
            <span className="material-symbols-outlined">gpp_maybe</span>
          </div>
          <div>
            <p className="text-xs font-bold text-red-800/60 uppercase tracking-wider m-0">Đã hết hạn</p>
            <h4 className="text-2xl font-black text-red-900 m-0 mt-1">{stats.expired} <span className="text-sm font-medium opacity-60 uppercase">SP</span></h4>
          </div>
        </div>
      </div>
    </div>
  );
}
