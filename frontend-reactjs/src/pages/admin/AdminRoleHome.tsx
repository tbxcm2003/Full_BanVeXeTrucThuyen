import { Navigate } from 'react-router-dom';
import { getStoredRole } from '../../auth/storage';

const AdminRoleHome = () => {
  const r = getStoredRole();
  if (r === 'QUAN_TRI') {
    return <Navigate to="/admin/accounts" replace />;
  }
  if (r === 'NHAN_VIEN') {
    return <Navigate to="/admin/customers" replace />;
  }
  return <Navigate to="/login" replace />;
};

export default AdminRoleHome;
