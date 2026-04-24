import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';
import PublicLayout from './components/layout/PublicLayout';
import RequireAuth from './components/auth/RequireAuth';
import LoginPage from './pages/admin/LoginPage';
import AccountManagement from './pages/admin/AccountManagement';
import RouteManagement from './pages/admin/RouteManagement';
import TripManagement from './pages/admin/TripManagement';
import TicketManagement from './pages/admin/TicketManagement';
import VehicleManagement from './pages/admin/VehicleManagement';

// Public Pages
import HomePage from './pages/public/HomePage';
import SchedulePage from './pages/public/SchedulePage';
import TicketSearchPage from './pages/public/TicketSearchPage';
import InvoicePage from './pages/public/InvoicePage';
import ContactPage from './pages/public/ContactPage';

import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path='lich-trinh' element={<SchedulePage />} />
          <Route path='tra-cuu-ve' element={<TicketSearchPage />} />
          <Route path='hoa-don' element={<InvoicePage />} />
          <Route path='lien-he' element={<ContactPage />} />
        </Route>

        <Route path='/login' element={<LoginPage />} />
        <Route path='/admin/login' element={<Navigate to='/login' replace />} />

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
