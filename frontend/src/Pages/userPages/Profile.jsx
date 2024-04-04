import { useEffect, useState } from 'react';
import NavBar from '../../Components/userSide/NavBar.jsx'
import ProfilePhoto from "../../Components/userSide/profile/ProfilePhoto.jsx"
import ProfileSection from "../../Components/userSide/profile/ProfileSection.jsx"
import { SlOptionsVertical } from "react-icons/sl";
import { showErrorMessage, showSuccessMessage } from '../../helper/sweetalert.js';
import { setAuthenticated } from '../../redux/slices/userSlices/authSlice.js'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../redux/slices/userSlices/userInfoSlice.js';
import ChangePasswordModal from '../../modal/userModal/ChangePasswordModal.jsx';
import EditProfileModal from '../../modal/userModal/EditProfileModal.jsx';
import NewPostModal from '../../modal/userModal/NewPostModal.jsx';
import { getPosts, logout } from '../../API/apiCalls.js';
import EditPostModal from '../../Components/userSide/profile/EditPostModal.jsx';


const Profile = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false)
  const [showNewPostModal, setShowNewPostModal] = useState(false)
  const [showEditPostModal, setShowEditPostModal] = useState(false)
  const [posts, setPosts] = useState([]);
  const [selectedPost,setSelectedPost] = useState(null)
  const userData = useSelector((state) => state.userInfo.user);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const userId = userData._id
    getPosts(userId)
      .then(response => {
        console.log(response);
        setPosts(response.data.posts);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);


  const handleNewPostModal = () => {
    setShowNewPostModal(false)
  }
  const handleEditPostModal = ()=>{
    setShowEditPostModal(false)
  }

  const handleCloseChangePasswordModal = () => {
    setShowChangePasswordModal(false);
  };

  const handleCloseEditProfileModal = () => {
    setShowEditProfileModal(false)
  }

  const handleNewPost = () => {
    setShowNewPostModal(true)
    setShowDropdown(false)
  };

  const handleLogout = () => {
    logout()
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
    setShowDropdown(false)
    setShowEditProfileModal(true);

  }

  const handleChangePassword = () => {
    setShowDropdown(false)
    setShowChangePasswordModal(true);
  }

  const updatePosts = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const handleUpdatePost = (postId) => {
    setSelectedPost(postId)
    setShowEditPostModal(true)
  }
  const handleDeletePost = () => {

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
          {posts?.length > 0 ? (
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {posts?.map((post) => (
                <div key={post?._id} className="relative">
                  <div className="bg-thirdShade rounded-lg shadow-md overflow-hidden" style={{ width: '250px', height: '200px' }}> {/* Set fixed dimensions */}
                    <img src={post?.image} alt="" className="w-full h-full object-cover" /> {/* Maintain aspect ratio */}
                    <div className="absolute top-0 right-0">
                      <button
                        onClick={() => handleUpdatePost(post._id)}
                        className="text-xs text-white bg-blue-500 py-1 px-2 rounded-tl-lg rounded-br-lg"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeletePost(post._id)}
                        className="text-xs text-white bg-red-500 py-1 px-2 rounded-tr-lg rounded-bl-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No posts</p>
          )}




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
          <NewPostModal isOpen={showNewPostModal} onClose={handleNewPostModal} updatePosts={updatePosts} />
        </div>
      </div>}
      {showEditPostModal && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className=" rounded-lg shadow-md">
          <EditPostModal isOpen={showEditPostModal} onClose={handleEditPostModal} postId={selectedPost} />
        </div>
      </div>}
    </>
  )
}

export default Profile;
