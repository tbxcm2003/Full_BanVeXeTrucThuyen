import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getStoredRole, getToken } from '../../auth/storage';

type Props = { children: React.ReactNode };

const RequireAuth: React.FC<Props> = ({ children }) => {
  const loc = useLocation();
  if (!getToken() || getStoredRole() !== 'QUAN_TRI') {
    return <Navigate to="/login" state={{ from: loc.pathname }} replace />;
  }
  return <>{children}</>;
};

export default RequireAuth;
