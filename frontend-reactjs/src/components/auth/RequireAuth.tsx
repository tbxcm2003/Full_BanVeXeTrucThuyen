import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getStoredRole, getToken } from '../../auth/storage';

type Props = { children: React.ReactNode };

const STAFF_ROLES = new Set(['QUAN_TRI', 'NHAN_VIEN']);

const RequireAuth: React.FC<Props> = ({ children }) => {
  const loc = useLocation();
  const token = getToken();
  const role = getStoredRole();
  if (!token || !role || !STAFF_ROLES.has(role)) {
    return <Navigate to="/login" state={{ from: loc.pathname }} replace />;
  }
  return <>{children}</>;
};

export default RequireAuth;
