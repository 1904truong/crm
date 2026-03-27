'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';

function WarrantyDetailView({ id, onBack }: { id: string | null, onBack: () => void }) {
  const [formData, setFormData] = useState<any>({
    customer_product_id: '',
    received_at: new Date().toISOString().split('T')[0],
    content: '',
    result: '',
    status: 'IN_PROGRESS',
    handled_by: ''
  });
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [prodRes, staffRes] = await Promise.all([
          api.get('/purchases/products'),
          api.get('/users')
        ]);
        setProducts(prodRes.data);
        setStaff(staffRes.data);

        if (id) {
          const res = await api.get(`/warranties/${id}`);
          setFormData({
            customer_product_id: res.data.customer_product_id,
            received_at: new Date(res.data.received_at).toISOString().split('T')[0],
            content: res.data.content,
            result: res.data.result || '',
            status: res.data.status,
            handled_by: res.data.handled_by || ''
          });
          setSelectedProduct(res.data.customer_product);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSave = async () => {
    try {
      if (id) {
        await api.patch(`/warranties/${id}`, formData);
      } else {
        await api.post('/warranties', formData);
      }
      onBack();
    } catch (e) {
      console.error(e);
    }
  };

  const isExpired = selectedProduct && new Date(selectedProduct.warranty_end_at) < new Date();

  return (
    <div className="pb-20 max-w-[1440px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 sticky top-0 bg-slate-50/80 backdrop-blur-md py-4 z-20">
        <div>
          <nav className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
            <button onClick={onBack} className="hover:text-primary transition-colors bg-transparent border-none cursor-pointer p-0 font-inherit uppercase">Bảo hành</button>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-primary">{id ? 'Chi tiết Case' : 'Tạo Case mới'}</span>
          </nav>
          <h2 className="text-3xl font-black text-slate-900 m-0 tracking-tight">Chi tiết Case Bảo hành</h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 bg-white text-slate-600 font-bold text-sm rounded-xl border border-slate-200 hover:shadow-md transition-all cursor-pointer outline-none">Sao chép Case</button>
          <button className="px-6 py-2.5 bg-blue-600 text-white font-black text-sm rounded-xl shadow-lg shadow-blue-600/20 hover:scale-[1.02] transition-all border-none cursor-pointer outline-none">Xuất biên bản</button>
        </div>
      </div>

      {/* Expired Warning Banner */}
      {isExpired && (
        <div className="mb-8 p-5 bg-red-50 border border-red-100 rounded-[24px] flex items-center justify-between animate-in zoom-in-95 duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-500/20">
              <span className="material-symbols-outlined">warning</span>
            </div>
            <div>
              <p className="text-xs font-black text-red-800 uppercase tracking-widest m-0">CẢNH BÁO: SẢN PHẨM HẾT HẠN BẢO HÀNH</p>
              <p className="text-sm text-red-700/80 font-bold m-0 mt-1">Sản phẩm này đã vượt <span className="text-red-900 underline underline-offset-4 font-black">quá</span> thời hạn bảo hành tiêu chuẩn (Hết hạn ngày {new Date(selectedProduct.warranty_end_at).toLocaleDateString('vi-VN')}). Vui lòng kiểm tra chính sách gia hạn.</p>
            </div>
          </div>
          <button className="text-sm font-black text-red-900 hover:underline underline-offset-4 bg-transparent border-none cursor-pointer outline-none uppercase">Xem chính sách</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Info Card */}
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
              <span className="material-symbols-outlined text-blue-600">info</span>
              <h3 className="text-lg font-black text-slate-900 m-0">Thông tin sự vụ</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-2 text-left">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Sản phẩm khách hàng <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select 
                    value={formData.customer_product_id}
                    onChange={(e) => {
                      const id = e.target.value;
                      setFormData({...formData, customer_product_id: id});
                      setSelectedProduct(products.find(p => p.id === id));
                    }}
                    className="w-full h-14 px-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-400/10 transition-all outline-none appearance-none cursor-pointer"
                  >
                    <option value="">Chọn sản phẩm (SN: ...)</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.product?.name} (SN: {p.serial_number})</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">search</span>
                </div>
              </div>

              <div className="space-y-2 text-left">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Ngày nhận máy <span className="text-red-500">*</span></label>
                <input 
                  type="date" 
                  value={formData.received_at}
                  onChange={(e) => setFormData({...formData, received_at: e.target.value})}
                  className="w-full h-14 px-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-400/10 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2 text-left mb-8">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Mô tả nội dung lỗi <span className="text-red-500">*</span></label>
              <textarea 
                rows={4}
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="Nhập chi tiết tình trạng máy khi nhận..."
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-[20px] text-sm font-bold text-slate-700 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-400/10 transition-all outline-none resize-none"
              />
            </div>

            <div className="space-y-2 text-left">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Kết quả xử lý</label>
              <textarea 
                rows={4}
                value={formData.result}
                onChange={(e) => setFormData({...formData, result: e.target.value})}
                placeholder="Ghi nhận phương án và kết quả sửa chữa..."
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-[20px] text-sm font-bold text-slate-700 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-400/10 transition-all outline-none resize-none"
              />
            </div>
          </div>

          {/* Attachments Card */}
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
              <span className="material-symbols-outlined text-blue-600">collections</span>
              <h3 className="text-lg font-black text-slate-900 m-0">Hình ảnh / Tài liệu đính kèm</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <button className="aspect-square rounded-[20px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 hover:border-blue-400 hover:bg-blue-50 transition-all group p-4 bg-transparent cursor-pointer outline-none">
                <span className="material-symbols-outlined text-3xl text-slate-300 group-hover:text-blue-500 group-hover:scale-110 transition-all">add_a_photo</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-blue-600">Thêm ảnh</span>
              </button>
              <div className="aspect-square rounded-[20px] bg-slate-100 border border-slate-200 overflow-hidden relative group cursor-pointer shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=2670&auto=format&fit=crop" alt="Attach" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 opacity-60" />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <span className="material-symbols-outlined text-white cursor-pointer hover:scale-125 transition-all">zoom_in</span>
                  <span className="material-symbols-outlined text-white cursor-pointer hover:scale-125 transition-all hover:text-red-400">delete</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 text-center">XEM TRƯỚC CÁC TRẠNG THÁI KHÁC</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-[32px] p-12 border border-slate-100 flex flex-col items-center justify-center text-center space-y-6 min-h-[300px]">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-blue-500 animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-blue-50"></div>
                  </div>
                </div>
                <div>
                  <h5 className="text-lg font-black text-slate-900 m-0">Đang tải dữ liệu...</h5>
                  <p className="text-sm text-slate-400 font-bold m-0 mt-2 max-w-[200px]">Chúng tôi đang lấy thông tin từ máy chủ, vui lòng đợi.</p>
                </div>
              </div>

              <div className="bg-white rounded-[32px] p-12 border border-slate-100 flex flex-col items-center justify-center text-center space-y-6 min-h-[300px]">
                <div className="w-16 h-16 rounded-[20px] bg-slate-50 flex items-center justify-center text-slate-200">
                  <span className="material-symbols-outlined text-4xl">inventory_2</span>
                </div>
                <div>
                  <h5 className="text-lg font-black text-slate-900 m-0">Không có lịch sử sửa chữa</h5>
                  <p className="text-sm text-slate-400 font-bold m-0 mt-2 max-w-[200px]">Sản phẩm này chưa từng có yêu cầu hỗ trợ trước đây.</p>
                </div>
              </div>

              <div className="bg-red-50/50 rounded-[32px] p-12 border border-red-100/50 flex items-center gap-6 md:col-span-2">
                <div className="w-16 h-16 rounded-2xl bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-500/20">
                  <span className="material-symbols-outlined text-3xl">cloud_off</span>
                </div>
                <div className="text-left">
                  <h5 className="text-lg font-black text-red-900 m-0">Lỗi kết nối máy chủ</h5>
                  <p className="text-sm text-red-700/80 font-bold m-0 mt-2">Không thể tải thông tin. Vui lòng kiểm tra lại đường truyền internet hoặc liện hệ quản trị viên.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Classification Card */}
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-8 text-left">
              <span className="material-symbols-outlined text-blue-600">checklist</span>
              <h3 className="text-lg font-black text-slate-900 m-0">Phân loại & Trạng thái</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-3 text-left">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Trạng thái xử lý</label>
                <div className="flex flex-wrap gap-2">
                  {['OPEN', 'IN_PROGRESS', 'CLOSED'].map((s) => (
                      <button 
                        key={s}
                        onClick={() => setFormData({...formData, status: s})}
                        className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase transition-all border-none cursor-pointer outline-none ${
                          formData.status === s 
                            ? 'bg-amber-400 text-white shadow-lg shadow-amber-400/20 scale-105' 
                            : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                        }`}
                      >
                        {s === 'OPEN' ? 'Mới' : s === 'IN_PROGRESS' ? 'Đang xử lý' : 'Hoàn thành'}
                      </button>
                    ))}
                </div>
              </div>

              <div className="space-y-3 text-left">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Người chịu trách nhiệm</label>
                <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between group hover:bg-white hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-blue-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center font-black text-slate-500">
                      {staff.find(s => s.id === formData.handled_by)?.name?.[0]?.toUpperCase() || 'S'}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 m-0">{staff.find(s => s.id === formData.handled_by)?.name || 'Chưa phân công'}</p>
                      <p className="text-[10px] text-slate-400 font-bold m-0 uppercase tracking-widest">Nhân viên kỹ thuật</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-blue-500 transition-all">swap_horiz</span>
                </div>
              </div>

              <div className="space-y-3 text-left">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Ngày đóng Case</label>
                <div className="relative">
                  <input 
                    type="date" 
                    className="w-full h-14 px-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:bg-white hover:shadow-sm transition-all"
                  />
                  <p className="text-[10px] text-slate-400 italic mt-2 pl-1">* Để trống nếu chưa hoàn tất</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Card */}
          <div className="bg-blue-600 rounded-[32px] p-8 shadow-xl shadow-blue-600/20 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-1000"></div>
            
            <div className="flex items-center gap-4 relative z-10 text-left">
              <div className="w-16 h-16 rounded-[24px] bg-white flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-3xl text-blue-600">person</span>
              </div>
              <div>
                <h4 className="text-xl font-black text-white m-0 tracking-tight">{selectedProduct?.customer?.full_name || 'Khách hàng'}</h4>
                <div className="inline-flex items-center gap-2 px-2 py-0.5 bg-blue-400/30 rounded-lg mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-100"></span>
                  <p className="text-[10px] font-black text-blue-100 uppercase tracking-[0.1em] m-0">Hạng {selectedProduct?.customer?.customer_type || 'NORMAL'}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4 relative z-10">
              <div className="flex items-center justify-between text-left">
                <p className="text-[11px] font-black text-blue-200/60 uppercase tracking-widest m-0">Số điện thoại</p>
                <p className="text-sm font-black text-white m-0 tracking-tighter">{selectedProduct?.customer?.contacts?.[0]?.value || 'Chưa cập nhật'}</p>
              </div>
              <div className="flex items-center justify-between text-left">
                <p className="text-[11px] font-black text-blue-200/60 uppercase tracking-widest m-0">Lần bảo hành thứ</p>
                <p className="text-sm font-black text-white m-0"><span className="text-amber-300">02</span> <span className="text-[10px] font-bold opacity-60 uppercase">(Cảnh báo)</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl px-8 py-4 rounded-[28px] shadow-2xl shadow-slate-900/10 border border-slate-100 flex items-center gap-12 z-30 w-full max-w-[1200px] justify-between animate-in fade-in slide-in-from-bottom-10 duration-700">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <p className="text-xs font-bold text-slate-500 italic m-0">Auto-save: Vừa xong</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="px-8 py-3 bg-slate-50 text-slate-600 font-bold text-sm rounded-[18px] hover:bg-slate-100 transition-all cursor-pointer border-none outline-none">Đóng case</button>
          <button 
            onClick={handleSave}
            disabled={loading}
            className="px-10 py-3 bg-blue-600 text-white font-black text-sm rounded-[18px] shadow-lg shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all cursor-pointer border-none outline-none disabled:opacity-50"
          >
            Lưu thông tin
          </button>
        </div>
      </div>
    </div>
  );
}

export default function WarrantiesPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'LIST' | 'DETAILS'>('LIST');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchWarranties = async () => {
    setLoading(true);
    try {
      const res = await api.get('/warranties');
      setData(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWarranties();
  }, []);

  if (viewMode === 'DETAILS') {
    return (
      <WarrantyDetailView 
        id={selectedId} 
        onBack={() => { setViewMode('LIST'); setSelectedId(null); fetchWarranties(); }} 
      />
    );
  }

  const getStatusDisplay = (status: string) => {
    switch(status) {
      case 'OPEN':
        return { label: 'Mới nhận', bg: 'bg-slate-100', text: 'text-slate-700', dot: 'bg-slate-500' };
      case 'IN_PROGRESS':
        return { label: 'Đang xử lý', bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-600' };
      case 'CLOSED':
      case 'RESOLVED':
        return { label: 'Hoàn thành', bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-600' };
      default:
        return { label: 'Khác', bg: 'bg-slate-100', text: 'text-slate-700', dot: 'bg-slate-500' };
    }
  };

  return (
    <div className="pb-12 px-4 shadow-none">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">
            <span>Bảo hành</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-black">Danh sách Case</span>
          </nav>
          <h2 className="text-3xl font-black text-slate-900 m-0">Quản lý Bảo hành</h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-600 font-bold text-sm rounded-xl hover:bg-slate-200 transition-all border-none cursor-pointer outline-none">
            <span className="material-symbols-outlined text-lg">download</span> Xuất báo cáo
          </button>
          <button 
            onClick={() => { setViewMode('DETAILS'); setSelectedId(null); }}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-black text-sm rounded-xl shadow-lg shadow-blue-600/20 hover:scale-[1.02] active:scale-95 transition-all border-none cursor-pointer outline-none"
          >
            <span className="material-symbols-outlined text-lg">add</span> Tạo phiếu mới
          </button>
        </div>
      </div>

      {/* Bento Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl shadow-sm space-y-2 border border-slate-100">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Trạng thái</label>
          <div className="relative">
            <select className="w-full bg-transparent border-none p-0 text-sm font-bold text-slate-900 focus:ring-0 appearance-none cursor-pointer outline-none">
              <option>Tất cả trạng thái</option>
              <option>Mới nhận</option>
              <option>Đang xử lý</option>
              <option>Hoàn thành</option>
            </select>
            <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm space-y-2 border border-slate-100">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Khoảng ngày</label>
          <div className="relative">
            <input className="w-full bg-transparent border-none p-0 text-sm font-bold text-slate-900 focus:ring-0 cursor-pointer outline-none" type="date"/>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm space-y-2 border border-slate-100">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Người xử lý</label>
          <div className="relative">
            <select className="w-full bg-transparent border-none p-0 text-sm font-bold text-slate-900 focus:ring-0 appearance-none cursor-pointer outline-none">
              <option>Tất cả nhân viên</option>
              <option>Trần Văn Kỹ thuật</option>
              <option>Lê Thị Tư vấn</option>
            </select>
            <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
          </div>
        </div>
        <button className="bg-blue-50 p-2 rounded-2xl shadow-none flex items-center justify-center border border-blue-100 text-blue-600 hover:bg-blue-100 cursor-pointer transition-colors font-black text-sm border-none outline-none">
          <span className="material-symbols-outlined mr-2">filter_list</span> Áp dụng lọc
        </button>
      </div>

      {/* Main Data Table Container */}
      <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50/50 text-left border-none">
                <th className="px-8 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest">Case ID</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest">Khách hàng</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest">Sản phẩm & Serial</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest">Ngày nhận</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest">Trạng thái</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest">Người xử lý</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading && <tr><td colSpan={7} className="p-12 text-center text-slate-400 font-bold border-none italic">Đang tải dữ liệu...</td></tr>}
              {!loading && data.length === 0 && <tr><td colSpan={7} className="p-12 text-center text-slate-400 font-bold border-none italic">Chưa có phiếu bảo hành nào.</td></tr>}

              {!loading && data.map((item: any) => {
                const s = getStatusDisplay(item.status);
                const customer = item.customer_product?.customer;
                const product = item.customer_product?.product;

                return (
                  <tr key={item.id} className="group hover:bg-blue-50/30 transition-colors">
                    <td className="px-8 py-6 border-none">
                      <span className="font-mono text-xs font-black text-blue-600 bg-blue-50 px-2 py-1 rounded">#{item.id.slice(-6).toUpperCase()}</span>
                    </td>
                    <td className="px-8 py-6 border-none">
                      <div>
                        <p className="text-sm font-black text-slate-900 m-0">{customer?.full_name || 'Khách vãng lai'}</p>
                        <p className="text-xs text-slate-400 font-bold m-0 mt-1">{customer?.contacts?.[0]?.value || 'N/A'}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6 border-none">
                      <div>
                        <p className="text-sm font-bold text-slate-700 m-0">{product?.name || item.customer_product?.product_name_snapshot || 'Sản phẩm'}</p>
                        <p className="text-[10px] text-slate-400 font-mono font-black m-0 mt-1 uppercase tracking-tighter">SN: {item.customer_product?.serial_number || 'N/A'}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-slate-600 font-bold border-none">{new Date(item.received_at).toLocaleDateString('vi-VN')}</td>
                    <td className="px-8 py-6 border-none">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-[10px] font-black uppercase border ${s.bg} ${s.text} border-transparent shadow-sm`}>
                        <span className={`w-2 h-2 rounded-full mr-2 ${s.dot}`}></span>{s.label}
                      </span>
                    </td>
                    <td className="px-8 py-6 border-none">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-black text-slate-600 border border-white">
                          {item.handler?.name?.[0]?.toUpperCase() || 'S'}
                        </div>
                        <span className="text-xs font-bold text-slate-600">{item.handler?.name || 'Chưa phân công'}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right border-none">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => { setSelectedId(item.id); setViewMode('DETAILS'); }}
                          className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md rounded-xl transition-all border-none bg-transparent cursor-pointer outline-none"
                        >
                          <span className="material-symbols-outlined text-xl">visibility</span>
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md rounded-xl transition-all border-none bg-transparent cursor-pointer outline-none">
                          <span className="material-symbols-outlined text-xl">edit</span>
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
        <div className="p-6 bg-slate-50/50 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-100">
          <p className="text-xs text-slate-500 font-bold m-0">Hiển thị <span className="text-slate-900 font-black">{data.length}</span> trong tổng số <span className="text-slate-900 font-black">{data.length}</span> bản ghi</p>
          <div className="flex items-center gap-1">
            <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-300 transition-all bg-transparent outline-none">
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-600 text-white text-xs font-black shadow-lg shadow-blue-600/20 transition-all border-none outline-none">1</button>
            <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-white hover:shadow-sm transition-all bg-transparent cursor-pointer outline-none">
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
