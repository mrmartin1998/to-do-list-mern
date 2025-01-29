import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/contexts/ToastContext';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import RootLayout from '@/layouts/RootLayout';
import AuthLayout from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import HomePage from '@/pages/home/page';
import AboutPage from '@/pages/about/page';
import LoginUser from '@/components/users/LoginUser';
import RegisterUser from '@/components/users/RegisterUser';
import TodoList from '@/components/todos/TodoList';
import NotFoundPage from '@/pages/error/not-found';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route element={<RootLayout />}>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />

              {/* Auth routes */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginUser />} />
                <Route path="/register" element={<RegisterUser />} />
              </Route>

              {/* Protected routes */}
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<TodoList />} />
                <Route path="/todos" element={<TodoList />} />
              </Route>

              {/* 404 route */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
