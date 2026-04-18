import React, { useState, useEffect } from 'react';
import { Users, Activity, AlertCircle, RefreshCw, Briefcase, Building } from 'lucide-react';
import axios from 'axios';

const Dashboard: React.FC = () => {
  // Trạng thái lưu trữ số lượng các loại tài khoản để hiển thị trên thẻ thống kê
  const [totals, setTotals] = useState({
    customers: 0,
    staff: 0,
    locked: 0,
    total: 0
  });
  const [loading, setLoading] = useState(true);

  // Hàm gọi API thực tế tới Backend Spring Boot để lấy số liệu thực tế cập nhật Dashboard
  const fetchStats = async () => {
    try {
      setLoading(true);
      // Gọi hai đầu API Customer và Staff đồng thời
      const [customerRes, staffRes] = await Promise.all([
        axios.get('/api/admin/customers').catch(() => null),
        axios.get('/api/admin/staffs').catch(() => null)
      ]);
      
      const customData = customerRes?.data?.data?.content || customerRes?.data?.data || [];
      const staffData = staffRes?.data?.data?.content || staffRes?.data?.data || [];
      
      const customerCount = Array.isArray(customData) ? customData.length : (customData.totalElements || 0);
      const staffCount = Array.isArray(staffData) ? staffData.length : (staffData.totalElements || 0);
      
      // Cập nhật State số liệu thống kê để render ra giao diện
      setTotals({
        customers: customerCount,
        staff: staffCount,
        locked: 0, 
        total: customerCount + staffCount
      });
    } catch (err: any) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  // Lifecycle hook: Chạy hàm lấy dữ liệu lần đầu khi component được hiển thị
  useEffect(() => {
    fetchStats();
  }, []);

  // Cấu hình các thẻ hiển thị trên Dashboard 
  const stats = [
    { title: 'TỔNG TÀI KHOẢN', value: loading ? '...' : totals.total, icon: <Users size={28} />, color: 'text-[#ef5222]', bgColor: 'bg-[#fff0eb]', border: 'border-[#ffdbcf]' },
    { title: 'KHÁCH HÀNG', value: loading ? '...' : totals.customers, icon: <Activity size={28} />, color: 'text-blue-500', bgColor: 'bg-blue-50', border: 'border-blue-100' },
    { title: 'NHÂN VIÊN', value: loading ? '...' : totals.staff, icon: <Briefcase size={28} />, color: 'text-green-500', bgColor: 'bg-green-50', border: 'border-green-100' },
    { title: 'BỊ KHÓA', value: loading ? '...' : totals.locked, icon: <AlertCircle size={28} />, color: 'text-red-500', bgColor: 'bg-red-50', border: 'border-red-100' },
  ];

  // Render giao diện chính của Component Dashboard 
  return (
    <div className='flex flex-col gap-5 animate-fade-in'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold text-gray-800 flex items-center gap-2.5'>
          <span className="w-1.5 h-6 bg-gradient-to-b from-[#ef5222] to-[#fd7e14] rounded-full inline-block"></span>
          Bảng Điều Khiển
        </h2>
        <button 
          onClick={fetchStats}
          disabled={loading}
          className='flex items-center gap-2 bg-white hover:bg-[#fff0eb] text-[#ef5222] border border-[#ef5222]/30 px-3 py-1.5 rounded-lg transition-colors font-medium text-sm shadow-sm disabled:opacity-50 focus:outline-none'
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> 
          Cập nhật Dữ liệu
        </button>
      </div>
      
      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
        {stats.map((stat, i) => (
          <div key={i} className={`bg-white rounded-xl shadow-sm border ${stat.border} p-5 relative overflow-hidden group hover:shadow-md transition-all duration-300 hover:-translate-y-1`}>
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-40 transition-transform group-hover:scale-110 ${stat.bgColor}`}></div>
            <div className='flex items-center justify-between relative z-10'>
              <div>
                <p className='text-xs font-semibold text-gray-500 tracking-wide mb-1.5'>{stat.title}</p>
                <h3 className='text-3xl font-extrabold text-gray-800 tracking-tight'>{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${stat.bgColor} border ${stat.border} shadow-sm group-hover:rotate-6 transition-transform`}>
                <span className={stat.color}>{React.cloneElement(stat.icon as React.ReactElement, { size: 24 })}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mt-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ef5222] to-[#fd7e14]"></div>
        <div className="flex items-center justify-center py-12 flex-col gap-4">
           <Building className="text-gray-300" size={64} />
           <p className="text-gray-500 font-medium text-lg">Dữ liệu được kết nối trực tiếp với backend Spring Boot của hệ thống BanVeXe</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;