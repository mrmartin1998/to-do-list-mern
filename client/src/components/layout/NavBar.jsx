import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import UserMenu from './UserMenu';
import MobileNav from './MobileNav';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    ...(user ? [
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/todos', label: 'Todos' },
    ] : []),
    { path: '/about', label: 'About' }
  ];

  return (
    <div className="sticky top-0 z-50">
      <div className="navbar bg-base-200">
        <div className="navbar-start">
          <MobileNav 
            isOpen={isMenuOpen} 
            onClose={() => setIsMenuOpen(false)}
            navLinks={navLinks}
            user={user}
            onLogout={handleLogout}
          />
          
          <Link to="/" className="btn btn-ghost text-xl">
            Todo-MERN
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navLinks.map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`${isActiveRoute(path) ? 'active' : ''}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end gap-2">
          <ThemeSwitcher />
          {user ? (
            <UserMenu user={user} onLogout={handleLogout} />
          ) : (
            <div className="hidden lg:flex gap-2">
              <Link to="/login" className="btn btn-ghost">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
