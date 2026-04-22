import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getToken } from '../../auth/storage';

type Props = { children: React.ReactNode };

const RequireAuth: React.FC<Props> = ({ children }) => {
  const loc = useLocation();
  if (!getToken()) {
    return <Navigate to="/admin/login" state={{ from: loc.pathname }} replace />;
  }
  return <>{children}</>;
};

export default RequireAuth;
