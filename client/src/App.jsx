import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/contexts/ToastContext';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import RootLayout from '@/layouts/RootLayout';
import AuthLayout from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import HomePage from '@/pages/home/page';
import AboutPage from '@/pages/about/page';
import TodoList from '@/components/todos/TodoList';
import NotFoundPage from '@/pages/error/not-found';
import LoginPage from '@/pages/auth/login';
import RegisterPage from '@/pages/auth/register';
import DashboardPage from '@/pages/dashboard';

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
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Route>

              {/* Protected routes */}
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
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
