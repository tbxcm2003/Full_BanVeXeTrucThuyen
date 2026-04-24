import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import axios from 'axios';
import { setAuth } from '../../auth/storage';
import logoImage from '../../assets/logo.png';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || '/admin/accounts';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const { data } = await axios.post<{
        accessToken: string;
        tokenType: string;
        email: string;
        role: string;
      }>('/api/auth/login', { email, password });
      const role = data.role;
      const token = data.accessToken;
      const mail = data.email;
      if (!token) {
        setErr('Phản hồi đăng nhập không hợp lệ.');
        return;
      }
      setAuth(token, mail || email, role, mail || email);
      if (role === 'QUAN_TRI') {
        navigate(from, { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (e: unknown) {
      const response = (e as { response?: { data?: { message?: string } } })?.response?.data;
      const m = response?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.';
      setErr(m);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff0eb] to-[#f0f4f8] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#ffdbcf] overflow-hidden">
        <div className="bg-gradient-to-r from-[#ef5222] to-[#fd7e14] text-white px-6 py-8 text-center">
          <div className="inline-flex items-center justify-center gap-2 bg-white rounded-full px-4 py-2 mb-3 shadow-sm">
            <img src={logoImage} alt="Vina Go" className="h-10 w-auto object-contain" />
            <span className="font-extrabold text-lg tracking-tight leading-none">
              <span className="text-[#0e5a32]">Vina</span>
              <span className="text-[#e32222]">Go</span>
            </span>
          </div>
        </div>
        <form onSubmit={onSubmit} autoComplete="off" className="p-6 space-y-4">
          {err && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{err}</div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              autoComplete="off"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#ef5222]/30 focus:border-[#ef5222] outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <input
              type="password"
              required
              minLength={6}
              autoComplete="off"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#ef5222]/30 focus:border-[#ef5222] outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div> 
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#ef5222] hover:bg-[#d94219] text-white font-semibold rounded-lg transition disabled:opacity-50"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <LogIn size={18} />
            )}
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
