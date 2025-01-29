import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserMenu = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="dropdown dropdown-end" ref={menuRef}>
      <button
        className="btn btn-ghost btn-circle avatar"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-10 rounded-full">
          <div className="bg-primary text-primary-content grid place-items-center font-bold text-xl h-full">
            {user.username[0].toUpperCase()}
          </div>
        </div>
      </button>

      {isOpen && (
        <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
          <li className="menu-title">
            <span>{user.username}</span>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <div className="divider my-0"></div>
          <li>
            <button onClick={onLogout} className="text-error">
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserMenu; 