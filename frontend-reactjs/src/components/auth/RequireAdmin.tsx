import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getStoredRole, getToken } from '../../auth/storage';

type Props = { children: React.ReactNode };

/**
 * Chỉ QUAN_TRI — dùng cho tuyến, xe, quản lý tài khoản nhân viên nội bộ, v.v.
 */
const RequireAdmin: React.FC<Props> = ({ children }) => {
  const loc = useLocation();
  if (!getToken()) {
    return <Navigate to="/login" state={{ from: loc.pathname }} replace />;
  }
  if (getStoredRole() !== 'QUAN_TRI') {
    return <Navigate to="/admin/accounts" replace />;
  }
  return <>{children}</>;
};

export default RequireAdmin;
