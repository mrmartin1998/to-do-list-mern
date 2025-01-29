import { Outlet } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

const DashboardLayout = () => {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <Outlet />
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout; 