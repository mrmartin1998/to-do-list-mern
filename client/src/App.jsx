import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import './index.css'
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/home/page';
import AboutPage from '@/pages/about/page';
import LoginUser from '@/components/users/LoginUser';
import RegisterUser from '@/components/users/RegisterUser';
import TodoList from '@/components/todos/TodoList';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <div>Dashboard Page</div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/todos" 
              element={
                <ProtectedRoute>
                  <TodoList />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App;
