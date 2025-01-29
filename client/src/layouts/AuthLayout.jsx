import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AuthLayout = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Redirect to dashboard if already authenticated
  if (user) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return (
    <div className="max-w-md mx-auto">
      <Outlet />
    </div>
  );
};

export default AuthLayout; 