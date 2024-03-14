import React, { useEffect, useState } from "react";
import { Axios } from "../../axios/userInstance.js";

const FollowingModal = ({ isOpen, onClose }) => {
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        if (isOpen) {
            fetchFollowingData();
        }
    }, [isOpen]);

    const fetchFollowingData = async () => {
        try {
            const response = await Axios.get("/api/following");
            if (Array.isArray(response.data)) {
                setFollowing(response.data);
            } else {
                console.error("Invalid response format: Expected an array");
            }
        } catch (error) {
            console.error("Error fetching following:", error);
        }
    };

    return (
        <div className={isOpen ? "block" : "hidden"}>
            <div className="bg-white w-96 p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Following</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        Close
                    </button>
                </div>
                <div>
                    {following.map((follow) => (
                        <div key={follow._id} className="flex items-center mb-2">
                            <img src={follow.followingId.ProfilePicture} alt={follow.followingId.name} className="w-8 h-8 rounded-full mr-2" />
                            <span className="text-sm">{follow.followingId.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FollowingModal;
