import { useState } from "react";
import { useSelector } from "react-redux";
import FollowerModal from "../../../modal/userModal/FollowerModal";
import FollowingModal from "../../../modal/userModal/FollowingModal";

const ProfileSection = () => {
  const userData = useSelector((state) => state.userInfo.user);
  const [showFollowerModal, setShowFollowerModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false)

  const handleFollowerModal = () => {
    setShowFollowerModal(true);
  };

  const handleCloseFollowerModal = () => {
    setShowFollowerModal(false);
  };

  const handleFollowingModal = () => {
    setShowFollowingModal(true);
  };

  const handleCloseFollowingModal = () => {
    setShowFollowingModal(false);
  };

  return (
    <div>
      <div className="p-4 sm:p-6 rounded-lg">
        <div className="mb-2 sm:mb-4">
          <h2 className="text-xl sm:text-2xl font-protest">{userData?.name}</h2>
          <p className="text-sm sm:text-base text-gray-600 font-protest">{userData?.bio}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between mb-2 sm:mb-4">
          <div className="text-gray-600 font-protest ml-3">
            <button className="mr-2 rounded-lg border bg-primary hover:bg-secondary text-white py-1 px-2" onClick={handleFollowerModal}>Followers</button>
            <button className="ml-2 rounded-lg border bg-primary hover:bg-secondary text-white py-1 px-2" onClick={handleFollowingModal}>Following</button>
          </div>
          <div className="text-gray-600 font-protest">{userData?.location}</div>
        </div>
      </div>
      {showFollowerModal && (
        <div className=" fixed z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="rounded-lg shadow-md">
            <FollowerModal isOpen={showFollowerModal} onClose={handleCloseFollowerModal} />
          </div>
        </div>
      )}
      {showFollowingModal && (
        <div className="fixed z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="rounded-lg shadow-md">
            <FollowingModal isOpen={showFollowingModal} onClose={handleCloseFollowingModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
