import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AccountManagement from './pages/admin/AccountManagement';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/admin' replace />} />
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='accounts' element={<AccountManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
