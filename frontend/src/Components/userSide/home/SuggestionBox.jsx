import { useEffect, useState } from "react";
import { Axios } from "../../../axios/userInstance.js";
import { showErrorMessage, showSuccessMessage } from "../../../helper/sweetalert.js";

const SuggestionBox = ({ users, loading, listFinished }) => {
  const [followingUsers, setFollowingUsers] = useState([]);

  useEffect(() => {
    fetchFollowingData();
  }, []);

  const fetchFollowingData = async () => {
    try {
      const response = await Axios.get("/api/followers");
      if (response.data && response.data.following) {
        const followingIds = response.data.following.map(follow => follow.followingId._id);
        setFollowingUsers(followingIds);
      } else {
        console.error("Invalid response format: Expected following array");
      }
    } catch (error) {
      console.error("Error fetching following users:", error);
    }
  };

  const handleFollow = async (userId) => {
    console.log(`Follow action triggered for user with ID: ${userId}`);
  
    try {
      const isFollowing = followingUsers.includes(userId);
      const response = isFollowing
        ? await Axios.post(`/api/unfollow/${userId}`)
        : await Axios.post(`/upload/followUser`, { followingId: userId });

      if (response.status === 200) {
        showSuccessMessage(response.data.message);
        fetchFollowingData(); // Refresh following data after action
      } else {
        console.log("Failed to follow/unfollow user");
      }
    } catch (error) {
      showErrorMessage(error);
    }
  };
  
  return (
    <div>
      <div className="flex justify-center items-center">
        <p className="font-protest mb-3 bg-inherit rounded-lg px-1">Connect with Artists</p>
      </div>
      {users.map((user, index) => (
        <div
          key={index}
          className="suggestion-item flex items-center space-x-2 p-2 mb-2 shadow-2xl rounded-lg bg-inherit"
        >
          <img
            src={user.ProfilePicture}
            alt={user.name}
            className="suggestion-avatar w-10 h-10 rounded-full"
          />
          <div className="suggestion-info">
            <p className="suggestion-name font-protest">{user.name}</p>
            <button
              className="suggestion-follow-button flex justify-center rounded-md bg-primary px-1 text-sm font-protest leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              onClick={() => handleFollow(user._id)}
            >
              {followingUsers.includes(user._id) ? "Unfollow" : "Follow"}
            </button>
          </div>
        </div>
      ))}
      {loading && <p className="loading-message">Loading...</p>}
      {listFinished && <p className="finished-message">List Completed</p>}
    </div>
  );
};

export default SuggestionBox;
