import  { useState } from 'react';
import NavBar from "../NavBar"
import ProfilePhoto from "./ProfilePhoto"
import ProfileSection from "./ProfileSection"
import { SlOptionsVertical } from "react-icons/sl";
import {Axios} from '../../../axios/userInstance.js'
import { showErrorMessage,showSuccessMessage } from '../../../helper/sweetalert.js';
import { setAuthenticated } from '../../../redux/slices/userSlices/authSlice.js'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../../redux/slices/userSlices/userInfoSlice.js';
import ChangePasswordModal from '../../../modal/userModal/ChangePasswordModal.jsx';
import EditProfileModal from '../../../modal/userModal/EditProfileModal.jsx';
import NewPostModal from '../../../modal/userModal/NewPostModal.jsx';


const Profile = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false)
  const [showNewPostModal, setShowNewPostModal] = useState(false)
  
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };


const handleNewPostModal=()=>{
  setShowNewPostModal(false)
}

  const handleCloseChangePasswordModal = () => {
    setShowChangePasswordModal(false); 
  };

  const handleCloseEditProfileModal = ()=>{
    setShowEditProfileModal(false)
  }
  const handleNewPost = () => {

    setShowNewPostModal(true)
    setShowDropdown(false)
  };

  const handleLogout = () => {
    Axios.get('/logout', { withCredentials: true })
    .then((response) => {
        if (response.status === 200) {
          dispatch(setAuthenticated(false))
          dispatch(userLogout())

            navigate('/signin')
            showSuccessMessage(response.data.message); 
        }
    }).catch((error) => {
        showErrorMessage(error);
    });
};


  const handleEditProfile = () => {
    console.log("Edit profile clicked")
    setShowDropdown(false)
    setShowEditProfileModal(true);
    
  }

  const handleChangePassword = ()=>{
    console.log("Change password clicked")
    setShowDropdown(false)
    setShowChangePasswordModal(true);
  }


  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center my-8 sm:mx-28 mx-4">
        <div className="bg-thirdShade rounded-lg shadow-md p-6 relative"> 
          <div className="absolute top-0 right-0 mt-4 mr-4"> 
            <div className="relative">
              <SlOptionsVertical className="w-4 h-8 text-gray-600 cursor-pointer" onClick={toggleDropdown} />
              {showDropdown && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button onClick={handleNewPost} className="block w-full text-left px-4 py-2 font-protest text-gray-800 hover:bg-gray-100">
                    New Post
                  </button>
                  <button onClick={handleEditProfile} className="block w-full text-left px-4 py-2 font-protest text-gray-800 hover:bg-gray-100">
                    Edit Profile
                  </button>
                  <button onClick={handleChangePassword} className="block w-full text-left px-4 py-2 font-protest text-gray-800 hover:bg-gray-100">
                    Change Password
                  </button>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 font-protest text-gray-800 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              )}
              
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-shrink-0 mb-4 md:mb-0">
              <ProfilePhoto className="" /> 
            </div>
            <div className="flex-grow">
              <ProfileSection className="md:text-lg text-base" />
            </div>
          </div>
          <div className="bg-primary w-full h-8 block">
            <p className="text-center font-protest text-white p-1">Gallery</p>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-4">
            <div className="bg-thirdShade rounded-lg shadow-lg p-2">
              <img src="/images/profile.jpg" alt="" />
            </div>
            <div className="bg-thirdShade rounded-lg shadow-md p-2">
              <img src="/images/profile.jpg" alt="" />
            </div>
            <div className="bg-thirdShade rounded-lg shadow-md p-2">
              <img src="/images/profile.jpg" alt=""  />
            </div>
          </div>
        </div>
      </div>
      {showChangePasswordModal && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className=" rounded-lg shadow-md">
          <ChangePasswordModal isOpen={showChangePasswordModal} onClose={handleCloseChangePasswordModal} />
        </div>
      </div>}
      {showEditProfileModal && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className=" rounded-lg shadow-md">
          <EditProfileModal isOpen={showEditProfileModal} onClose={handleCloseEditProfileModal} />
        </div>
        </div>}
        {showNewPostModal && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className=" rounded-lg shadow-md">
          <NewPostModal isOpen={showNewPostModal} onClose={handleNewPostModal} />
        </div>
        </div>}
    </>
  )
}

export default Profile;
