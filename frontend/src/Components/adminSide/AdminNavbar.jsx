import { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-primary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img src="/images/ArtistgramLogo.png" alt="Admin Logo" className="h-17 w-auto" />
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={toggleNavbar} className="text-gray-300 hover:text-white focus:outline-none focus:text-white px-4 py-2">
              {isOpen ? (
                <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M3.293 4.293a1 1 0 0 1 1.414-1.414L12 10.586l7.293-7.293a1 1 0 0 1 1.414 1.414L13.414 12l7.293 7.293a1 1 0 1 1-1.414 1.414L12 13.414l-7.293 7.293a1 1 0 1 1-1.414-1.414L10.586 12 3.293 4.707a1 1 0 0 1 0-1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to='/admin/dashboard' className='navLinks block'>Dashboard</Link>
            <Link to='/admin/userManagement' className='navLinks block'>User Management</Link>
            <Link to='/admin/postManagement' className='navLinks block'>Post Management</Link>
            <Link to='/admin/eventManagement' className='navLinks block'>Event Management</Link>
            <Link to='/admin/adminProfile' className='navLinks block'>Profile</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
