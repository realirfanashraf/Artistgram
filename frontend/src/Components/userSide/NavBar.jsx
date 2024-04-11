import { useState } from 'react';
import { Link } from 'react-router-dom'
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import NotificationModal from './home/NotificationModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false)

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const handleNotificationModal = ()=> {
    setNotificationModal(true)
  }

  return (
    <>
    <nav className="bg-primary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <img src="/images/ArtistgramLogo.png" alt="Logo" className="h-17 w-auto flex-shrink-0" />
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to='/home' className='text-gray-300 hover:bg-secondary hover:text-white px-2 py-2 rounded-md font-protest'>Home</Link>
            <Link to='/event' className='text-gray-300 hover:bg-secondary hover:text-white px-2 py-2 rounded-md font-protest'>Event</Link>
            <Link to='/inbox' className='text-gray-300 hover:bg-secondary hover:text-white px-2 py-2 rounded-md font-protest'>Inbox</Link>
            <button className="text-gray-300 hover:bg-secondary hover:text-white px-2 py-2 rounded-md font-protest" onClick={handleNotificationModal}>
              <IoIosNotifications size={22} />
            </button>

            <Link to='/profile' className='text-gray-300 hover:bg-secondary hover:text-white px-2 py-2 rounded-md font-protest'><CgProfile size={22} /></Link>
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
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to='/home' className='navLinks block'>Home</Link>
              <Link to='/event' className='navLinks block'>Event</Link>
              <Link to='/inbox' className='navLinks block'>Inbox</Link>
              <Link to='/profile' className='navLinks block'>Profile</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
    {notificationModal && (
  <div className="fixed top-0 right-0 mt-12 mr-6">
    <div className="bg-white border border-gray-300 rounded-lg shadow-md" style={{ maxHeight: "80vh", overflowY: "auto" }}>
      <div className="p-4">
        <NotificationModal isOpen={notificationModal} />
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default Navbar;
