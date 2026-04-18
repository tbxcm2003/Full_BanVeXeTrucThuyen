import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut, Menu, User, Bell, Bus } from 'lucide-react';

// Component Layout bao quanh các trang quản trị chung (Header, Sidebar, Nội dung Outlet)
const AdminLayout: React.FC = () => {
  const location = useLocation();
  // State quản lý trạng thái đang mở/đóng của thanh điều hướng (Sidebar)
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mảng chứa thông tin các menu mục bên Sidebar trái
  const navItems = [
    { name: 'Bảng Điều Khiển', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Quản Lý Tài Khoản', path: '/admin/accounts', icon: <Users size={20} /> },
  ];

  // Render ra kết cấu layout chính của giao diện Admin
  return (
    <div className='flex h-screen bg-[#f8f9fa] flex-col'>
      {/* Phần Header Cố định nằm ở trên cùng */}
      <header className='bg-gradient-to-r from-[#ef5222] to-[#fd7e14] text-white shadow-md z-20 h-16 flex items-center justify-between px-4'>
        <div className='flex items-center gap-3 w-60'>
          <button 
            type='button'
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className='p-1.5 rounded-md hover:bg-white/20 transition-colors focus:outline-none'
          >
            <Menu size={24} />
          </button>
          <div className='flex items-center gap-2 font-bold text-xl tracking-wide bg-white text-[#ef5222] px-4 py-1 rounded-full shadow-sm'>
            <Bus size={20} />
            <span>FUTA Admin</span>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <button className='p-2 hover:bg-white/20 rounded-full transition-colors relative'>
            <Bell size={20} />
            <span className='absolute top-1 right-1 w-2.5 h-2.5 bg-yellow-400 border-2 border-orange-500 rounded-full' />
          </button>
          <div className='flex items-center gap-3 px-3 py-1.5 hover:bg-white/20 rounded-lg cursor-pointer transition-colors border border-white/20'>
            <div className='w-8 h-8 bg-white text-[#ef5222] font-bold rounded-full flex items-center justify-center shadow-inner text-sm'>
              X
            </div>
            <div className='hidden md:block text-sm'>
              <p className='font-semibold leading-none'>Trần Bảo Xuyên</p>
              <p className='text-xs text-white/80 lowercase mt-1'>admin.baoxuyen@gmail.com</p>
            </div>
          </div>
        </div>
      </header>

      <div className='flex flex-1 overflow-hidden'>
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-[#ef5222]/20 flex flex-col transition-all duration-300 z-10 shadow-sm`}>
          <nav className='flex-1 overflow-y-auto py-6 px-3 space-y-2'>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (location.pathname.startsWith('/admin') && item.path === '/admin' && location.pathname === '/admin');
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3.5 rounded-xl transition-all duration-200 border border-transparent ${
                    isActive
                      ? 'bg-[#fff0eb] text-[#ef5222] border-[#ffdbcf] shadow-sm font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-[#ef5222] hover:border-gray-100 font-medium'
                  }`}
                  title={sidebarOpen ? '' : item.name}
                >
                  <span className={`flex-shrink-0 ${isActive ? 'text-[#ef5222]' : 'text-gray-400'}`}>{item.icon}</span>
                  {sidebarOpen && <span className='ml-3'>{item.name}</span>}
                </Link>
              );
            })}
          </nav>

          <div className='p-4 border-t border-gray-100'>
            <button className='flex items-center justify-center w-full px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-500 rounded-xl transition-colors font-medium'>
              <LogOut size={20} />
              {sidebarOpen && <span className='ml-3'>Đăng xuất</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className='flex-1 overflow-y-auto p-6 md:p-8 relative'>
          {/* Decorative background circle similar to FUTA branding */}
          <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#fff0eb] to-transparent opacity-60 z-0 pointer-events-none"></div>
          
          <div className="relative z-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;