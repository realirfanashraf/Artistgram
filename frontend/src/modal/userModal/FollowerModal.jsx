import { useEffect, useState } from "react";
import { Axios } from "../../axios/userInstance.js";
import { showErrorMessage, showSuccessMessage } from '../../helper/sweetalert.js'

const FollowerModal = ({ isOpen, onClose }) => {
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])

    useEffect(() => {
        if (isOpen) {
            fetchFollowersData();
        }
    }, [isOpen]);

    const fetchFollowersData = async () => {
        try {
            const response = await Axios.get("/api/followers");
            if (response.data && response.data.followers && response.data.following) {
                setFollowers(response.data.followers);
                setFollowing(response.data.following);
            } else {
                console.error("Invalid response format: Expected followers and following arrays");
            }
        } catch (error) {
            console.error("Error fetching followers:", error);
        }
    };


    const handleFollow = async (followerId) => {
        try {
            const isFollowing = following.some(follow => {
                return follow.followingId._id === followerId;
            });

            if (isFollowing) {
                const response = await Axios.post(`/api/unfollow/${followerId}`);
                if (response.status === 200) {
                    showSuccessMessage(response.data.message)
                    fetchFollowersData()
                }
            } else {
                const response = await Axios.post(`/api/follow/${followerId}`);
                if (response.status === 200) {
                    showSuccessMessage(response.data.message);
                    fetchFollowersData()
                }
            }
        } catch (error) {
            console.error("Error following/unfollowing user:", error);
            showErrorMessage(error);
        }
    };


    return (
        <div className={isOpen ? "block" : "hidden"}>
            <div className="bg-white w-96 p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Followers</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        Close
                    </button>
                </div>
                <div>
                    {followers.map((follower) => (
                        <div key={follower._id} className="flex justify-between items-center mb-2 hover:bg-gray-200 rounded-lg">
                            <div className="flex items-center">
                                <img src={follower.followerId.ProfilePicture} alt={follower.followerId.name} className="w-8 h-8 rounded-full mr-2" />
                                <span className="text-sm">{follower.followerId.name}</span>
                            </div>
                            <button onClick={() => handleFollow(follower.followerId._id)} className="text-sm text-blue-500 hover:text-blue-700">
                                {following.some(follow => follow.followingId._id === follower.followerId._id) ? "Unfollow" : "Follow"}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FollowerModal;
