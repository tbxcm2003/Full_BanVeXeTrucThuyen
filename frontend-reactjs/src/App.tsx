import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';
import RequireAuth from './components/auth/RequireAuth';
import LoginPage from './pages/admin/LoginPage';
import AccountManagement from './pages/admin/AccountManagement';
import RouteManagement from './pages/admin/RouteManagement';
import TripManagement from './pages/admin/TripManagement';
import TicketManagement from './pages/admin/TicketManagement';
import VehicleManagement from './pages/admin/VehicleManagement';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/admin/accounts' replace />} />
        <Route path='/admin/login' element={<LoginPage />} />
        <Route
          path='/admin'
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Navigate to='/admin/accounts' replace />} />
          <Route path='accounts' element={<AccountManagement />} />
          <Route path='routes' element={<RouteManagement />} />
          <Route path='trips' element={<TripManagement />} />
          <Route path='tickets' element={<TicketManagement />} />
          <Route path='vehicles' element={<VehicleManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
