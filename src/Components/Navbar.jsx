import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import { AuthContext } from './Contexts/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { user, signOutUser } = useContext(AuthContext);

  const isAuthenticated = !!user;

  function handleBrowseClick() {
    // Navigate to home page and pass state to trigger scroll
    navigate('/', { state: { scrollToFeatured: true } });
  }

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out from your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, logout!',
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser()
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Logged out successfully',
              timer: 1500,
              showConfirmButton: false,
            });
            navigate('/login');
          })
          .catch(() => {
            Swal.fire({
              icon: 'error',
              title: 'Logout Failed',
              text: 'An error occurred during logout.',
            });
          });
      }
    });
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          TaskManager
        </Link>

        {/* Nav Links */}
        <div className="space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-blue-500 font-semibold' : 'text-gray-700 hover:text-blue-500'
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/formpost"
            className={({ isActive }) =>
              isActive ? 'text-blue-500 font-semibold' : 'text-gray-700 hover:text-blue-500'
            }
          >
            Add Task
          </NavLink>

          {/* Browse Tasks triggers scroll on home */}
          <button
            onClick={handleBrowseClick}
            className="btn btn-primary"
          >
            Browse Tasks
          </button>

          <NavLink
            to="/myposts"
            className={({ isActive }) =>
              isActive ? 'text-blue-500 font-semibold' : 'text-gray-700 hover:text-blue-500'
            }
          >
            My Posted Tasks
          </NavLink>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-500">
                Login
              </Link>
              <Link to="/register" className="text-gray-700 hover:text-blue-500">
                Signup
              </Link>
            </>
          ) : (
            <>
              {/* Profile image with tooltip */}
              <div className="relative group">
                <img
                  src={user.photoURL || 'https://placeimg.com/192/192/people'}
                  alt={user.displayName || 'User'}
                  className="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
                />
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                  {user.displayName || 'User'}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-500"
              >
                Log out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
