import { IoIosCamera } from "react-icons/io";
import { useRef } from "react";
import axios from "axios";
import { updateProfilePicture } from "../../../redux/slices/userSlices/userInfoSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { showErrorMessage, showSuccessMessage } from "../../../helper/sweetalert.js";
import { changeProfilePicture } from "../../../API/apiCalls.js";




const ProfilePhoto = () => {
  const PRESET_KEY = import.meta.env.VITE_PRESET_KEY
  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME
  const CLOUD_UPLOAD_URL = import.meta.env.VITE_CLOUD_UPLOAD_URL

  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  
  const userData = useSelector((state) => state.userInfo.user);
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('upload_preset', `${PRESET_KEY}`);
    formdata.append('cloud_name', `${CLOUD_NAME}`);

    try {
      const response = await axios.post(`${CLOUD_UPLOAD_URL}`, formdata);

      if (response.status === 200) {
        const imageUrl = response.data.secure_url;
        changeProfilePicture(userData.email, imageUrl)
          .then((response) => {
            dispatch(updateProfilePicture(imageUrl));
            showSuccessMessage(response.data.message)
          }).catch((error) => {
           showErrorMessage(error)
          })
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      showErrorMessage(error.message)
    }
  };

  return (
    <div className="relative inline-block">
      <img
        src={userData?.ProfilePicture}
        alt="Profile"
        className="rounded-full w-32 h-32 object-cover"
      />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileInputChange}
      />
      <button
        className="absolute bottom-0 right-0 p-2 bg-gray-400 rounded-full shadow-md"
        onClick={handleButtonClick}
      >
        <IoIosCamera className="w-6 h-6 text-black" />
      </button>
    </div>
  );
};

export default ProfilePhoto;


