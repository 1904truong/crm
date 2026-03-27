'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { reportApi } from '@/lib/api';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await reportApi.getStats();
        setStats(res.data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const todayStr = format(new Date(), 'eeee, dd/MM', { locale: vi });

  const handleExport = async () => {
    try {
      const res = await reportApi.exportCustomers();
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'customers_report.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Failed to export report:', error);
      alert('Không thể xuất báo cáo. Vui lòng thử lại sau.');
    }
  };

  return (
    <>
      <div className="flex justify-between items-end mb-10">
        <div>
          <h3 className="text-3xl font-black text-on-surface tracking-tight mb-1 m-0">Tổng quan Bảng điều khiển</h3>
          <p className="text-slate-500 font-medium italic m-0 mt-1">Chào mừng trở lại! Dữ liệu được cập nhật vừa xong.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest text-on-surface-variant font-semibold text-sm rounded-lg hover:bg-surface-container-high transition-colors border-none cursor-pointer">
            <span className="material-symbols-outlined text-sm">calendar_today</span> {todayStr}
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold text-sm rounded-lg hover:shadow-lg transition-all active:scale-95 border-none cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">download</span> Xuất báo cáo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 text-primary rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined">groups</span>
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+0%</span>
          </div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1 m-0">Tổng khách hàng</p>
          <h4 className="text-3xl font-black text-on-surface mb-4 m-0 mt-1">{stats?.totalCustomers?.toLocaleString() || 0}</h4>
          <div className="flex items-center gap-4 text-[11px] font-bold">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="text-on-surface-variant">Hoạt động</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined">forum</span>
            </div>
            <span className="text-xs font-bold text-slate-400">Live</span>
          </div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1 m-0">Tương tác hôm nay</p>
          <h4 className="text-3xl font-black text-on-surface mb-2 m-0 mt-1">{stats?.interactionsToday || 0}</h4>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-6 flex">
            <div className="bg-purple-600 h-full w-[20%]"></div>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 m-0 mt-2">Dữ liệu thực tế từ hệ thống</p>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-red-50 text-error rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined">verified_user</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-error animate-pulse"></div>
          </div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1 m-0">Sắp hết BH (7 ngày)</p>
          <h4 className="text-3xl font-black text-error mb-4 m-0 mt-1">{stats?.warrantiesExpiring || 0}</h4>
          <button className="w-full py-2 border border-error/20 text-error text-xs font-bold rounded-lg hover:bg-error hover:text-white transition-colors cursor-pointer bg-transparent">
            Xem danh sách gia hạn
          </button>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined">chat_bubble</span>
            </div>
            <span className="text-xs font-bold text-on-surface-variant">ZNS API</span>
          </div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1 m-0">ZNS hôm nay</p>
          <div className="flex items-baseline gap-2 mb-2 mt-1">
            <h4 className="text-3xl font-black text-on-surface m-0">{stats?.znsStats?.total || 0}</h4>
            <span className="text-xs font-bold text-slate-400">tin gửi</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="bg-green-50/50 p-2 rounded-lg">
              <p className="text-[9px] uppercase font-bold text-green-600 mb-0.5 m-0">Thành công</p>
              <p className="text-sm font-black text-green-700 m-0">{stats?.znsStats?.sent || 0}</p>
            </div>
            <div className="bg-red-50/50 p-2 rounded-lg">
              <p className="text-[9px] uppercase font-bold text-red-600 mb-0.5 m-0">Thất bại</p>
              <p className="text-sm font-black text-red-700 m-0">{stats?.znsStats?.failed || 0}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 mb-8">
        <div className="col-span-8 bg-surface-container-lowest p-8 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h5 className="text-lg font-bold text-on-surface tracking-tight m-0">Hiệu suất Phễu Bán hàng</h5>
              <p className="text-xs text-slate-500 font-medium m-0 mt-1">Theo dõi tỷ lệ chuyển đổi qua các giai đoạn</p>
            </div>
            <select className="text-xs font-bold border-none bg-surface-container-low rounded-lg focus:ring-0 outline-none p-2">
              <option>7 ngày qua</option>
              <option>30 ngày qua</option>
            </select>
          </div>
          <div className="relative h-[240px] flex items-end justify-between gap-4 px-2">
            {[60, 80, 70, 95, 50, 40, 30].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center group">
                <div className="w-full bg-primary/10 rounded-t-lg relative flex flex-col justify-end" style={{ height: `${h}%` }}>
                  <div className="bg-primary w-full rounded-t-lg" style={{ height: `${h * 0.7}%` }}></div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 mt-3">{['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'][i]}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-slate-50">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-primary"></span>
              <span className="text-xs font-bold text-on-surface">Cơ hội thực tế</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-primary/20"></span>
              <span className="text-xs font-bold text-on-surface">Mục tiêu</span>
            </div>
          </div>
        </div>

        <div className="col-span-4 bg-surface-container-lowest p-8 rounded-xl shadow-sm flex flex-col">
          <h5 className="text-lg font-bold text-on-surface tracking-tight m-0 mb-8">Nguồn khách hàng</h5>
          <div className="flex-1 flex items-center justify-center relative">
            <div className="w-40 h-40 rounded-full border-[16px] border-primary-container relative">
              <div className="absolute inset-0 border-[16px] border-primary border-t-transparent border-r-transparent -rotate-45 rounded-full"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-on-surface">100%</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase">Dữ liệu thật</span>
              </div>
            </div>
          </div>
          <div className="space-y-4 mt-8">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="font-medium">Hệ thống</span>
              </div>
              <span className="font-bold">{stats?.totalCustomers || 0}</span>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden mb-12">
        <div className="flex justify-between items-center p-8 border-b border-outline-variant/10">
          <div>
            <h5 className="text-xl font-bold text-on-surface tracking-tight m-0">Follow-up đến hạn</h5>
            <p className="text-xs text-slate-500 font-medium m-0 mt-1">Danh sách các đầu việc cần xử lý ngay trong ngày</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-slate-400 hover:text-primary transition-colors border-none bg-transparent cursor-pointer flex items-center justify-center">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
            <button className="text-sm font-bold text-primary hover:underline border-none bg-transparent cursor-pointer">Xem tất cả</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50 text-left border-none">
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Khách hàng</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Nội dung công việc</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Thời hạn (Due)</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y-0">
              {stats?.recentFollowups?.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-10 text-center text-slate-400 italic">Không có công việc nào tới hạn.</td>
                </tr>
              )}
              {stats?.recentFollowups?.map((followup: any) => (
                <tr key={followup.id} className="group hover:bg-surface-container-high transition-colors">
                  <td className="px-8 py-5 border-t border-outline-variant/10">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                        {followup.customer.full_name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface m-0">{followup.customer.full_name}</p>
                        <p className="text-[11px] text-slate-400 font-medium m-0 mt-0.5">{followup.customer.phone_primary || 'N/A'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 border-t border-outline-variant/10">
                    <p className="text-sm font-medium text-on-surface-variant max-w-xs truncate m-0">{followup.title}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded">Reminder</span>
                  </td>
                  <td className="px-8 py-5 border-t border-outline-variant/10">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-primary">{format(new Date(followup.follow_up_at), 'HH:mm dd/MM')}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right border-t border-outline-variant/10">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-white text-primary rounded-lg shadow-sm border border-slate-100 cursor-pointer flex items-center justify-center">
                        <span className="material-symbols-outlined text-sm">phone</span>
                      </button>
                      <button className="p-2 bg-white text-green-600 rounded-lg shadow-sm border border-slate-100 cursor-pointer flex items-center justify-center">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                      </button>
                    </div>
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
