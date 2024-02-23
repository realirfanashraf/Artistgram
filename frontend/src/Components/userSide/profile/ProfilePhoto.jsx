import { IoIosCamera } from "react-icons/io";

const ProfilePhoto = () => {
  const handleUploadPhoto = () => {

    console.log('Upload new photo clicked');
  };

  return (
    <div className="relative inline-block">
      <img
        src="/images/profile.jpg" 
        alt="Profile"
        className="rounded-full w-32 h-32 object-cover"
      />
      <button
        onClick={handleUploadPhoto}
        className="absolute bottom-0 right-0 p-2 bg-gray-400 rounded-full shadow-md"
      >
        <IoIosCamera
          className="w-6 h-6 text-black"
        />
      </button>
    </div>
  );
};

export default ProfilePhoto;
