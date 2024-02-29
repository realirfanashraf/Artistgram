import { IoIosCamera } from "react-icons/io";
import { useRef, useState } from "react";
import axios from "axios";
import { Axios } from "../../../axios/userInstance.js";
import { selectUserEmail } from "../../../redux/slices/userSlices/userInfoSlice.js";
import { useSelector } from "react-redux";
import swal from 'sweetalert'



const ProfilePhoto = () => {
  const PRESET_KEY= import.meta.env.VITE_PRESET_KEY
  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME
  const CLOUD_UPLOAD_URL = import.meta.env.VITE_CLOUD_UPLOAD_URL
  const email = useSelector(selectUserEmail)
  const fileInputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('upload_preset',`${PRESET_KEY}`);
    formdata.append('cloud_name', `${CLOUD_NAME}`);

    try {
      const response = await axios.post(`${CLOUD_UPLOAD_URL}`, formdata);
      
      if (response.status === 200) {
        const imageUrl = response.data.secure_url;
        setImageUrl(imageUrl)
        Axios.post('/upload/changeProfilePicture',{email,imageUrl})
        .then((response)=>{
          swal(response.data.message)
        }).catch((error)=>{
          console.log(error)
        })
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    }
  };

  return (
    <div className="relative inline-block">
      <img
         src={imageUrl || "/images/profile.jpg"}
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


