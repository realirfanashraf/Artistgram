import { useState } from 'react';
import AdminNavbar from '../../../Components/adminSide/AdminNavbar';
import EventManagementTable from '../../../Components/adminSide/EventManagementTable';
import { CiSquarePlus } from "react-icons/ci";
import EventAddModal from '../../../Components/adminSide/EventAddModal';
import AdminSideBar from '../../../Components/adminSide/AdminSideBar'

const EventManagement = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleShowModal = ()=>{
    setShowModal(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
    <AdminNavbar />
    
    <div className="flex flex-row flex-grow">
      <div className="hidden md:block w-1/5">
        <AdminSideBar/>
      </div>
      
      <div className="flex flex-col flex-grow">
        <EventManagementTable />
        
        <div className="fixed bottom-16 right-20">
          <button 
            className="bg-primary text-white rounded-full p-3 shadow-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            onClick={handleClick}
          >
            <CiSquarePlus size={25} />
          </button>
        </div>
        
        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="rounded-lg shadow-md">
              <EventAddModal isOpen={setShowModal} onClose={handleShowModal}/>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  
  );
};

export default EventManagement;
