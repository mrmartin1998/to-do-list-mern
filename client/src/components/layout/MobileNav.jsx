import { Link } from 'react-router-dom';

const MobileNav = ({ isOpen, onClose, navLinks, user, onLogout }) => {
  return (
    <>
      <div className="lg:hidden">
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => onClose()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      >
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-base-100 transform transition-transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 space-y-4">
            {user && (
              <div className="flex items-center space-x-3 mb-6">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <div className="bg-primary text-primary-content grid place-items-center font-bold text-xl h-full">
                      {user.username[0].toUpperCase()}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="font-bold">{user.username}</div>
                  <div className="text-sm opacity-50">{user.email}</div>
                </div>
              </div>
            )}

            <ul className="menu menu-sm">
              {navLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link to={path} onClick={onClose}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {!user ? (
              <div className="pt-4 space-y-2">
                <Link
                  to="/login"
                  className="btn btn-ghost w-full"
                  onClick={onClose}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary w-full"
                  onClick={onClose}
                >
                  Register
                </Link>
              </div>
            ) : (
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="btn btn-error w-full mt-4"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav; 