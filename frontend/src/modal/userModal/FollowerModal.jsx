import React, { useEffect, useState } from "react";
import { Axios } from "../../axios/userInstance.js";

const FollowerModal = ({ isOpen, onClose }) => {
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        if (isOpen) {

            fetchFollowersData();
        }
    }, [isOpen]);

    const fetchFollowersData = async () => {
        try {
            const response = await Axios.get("/api/followers");
            if (Array.isArray(response.data)) {
                setFollowers(response.data);
            } else {
                console.error("Invalid response format: Expected an array");
            }
        } catch (error) {
            console.error("Error fetching followers:", error);
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
                        <div key={follower._id} className="flex items-center mb-2 hover:bg-gray-200 rounded-lg">
                            <img src={follower.followerId.ProfilePicture} alt={follower.followerId.name} className="w-8 h-8 rounded-full mr-2" />
                            <span className="text-sm">{follower.followerId.name}</span>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default FollowerModal;
