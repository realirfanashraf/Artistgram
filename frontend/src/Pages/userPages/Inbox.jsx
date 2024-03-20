import { useState, useEffect } from 'react';
import Navbar from "../../Components/userSide/NavBar";
import socketIOClient from 'socket.io-client';
import { Axios } from '../../axios/userInstance.js';
import { useSelector } from 'react-redux';

const socket = socketIOClient('http://localhost:3000');

const Inbox = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUserName, setSelectedUserName] = useState("");
    const [selectedUserProfilePicture, setSelectedUserProfilePicture] = useState("");
    const userData = useSelector((state) => state.userInfo.user);
    const userId = userData._id;

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (selectedUser) {
            fetchMessages(selectedUser);
        }
    }, [selectedUser]);

    useEffect(() => {
        socket.on('message', handleMessage);
        return () => {
            socket.off('message', handleMessage);
        };
    }, []);

    const handleMessage = (message) => {
        setMessages(prevMessages => [...prevMessages, message]);
    };

    const fetchUsers = async () => {
        try {
            const response = await Axios.get("/api/following");
            if (Array.isArray(response.data)) {
                setUsers(response.data);
            } else {
                console.error("Invalid response format: Expected an array");
            }
        } catch (error) {
            console.error("Error fetching following:", error);
        }
    };

    const fetchMessages = async (selectedUserId) => {
        try {
            const response = await Axios.get(`/api/messages/${selectedUserId}`)
            setMessages(response.data);
            const selectedUser = users.find(user => user.followingId._id === selectedUserId);
            if (selectedUser) {
                setSelectedUserName(selectedUser.followingId.name);
                setSelectedUserProfilePicture(selectedUser.followingId.ProfilePicture);
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const sendMessage = () => {
        if (!selectedUser || !messageInput.trim()) return;

        const newMessage = {
            sender: userId,
            receiver: selectedUser,
            content: messageInput.trim(),
        };
        socket.emit('message', newMessage);
        setMessageInput("");
    };

    return (
        <>
            <Navbar />
            <div className="flex">
                <div className="w-1/4 bg-thirdShade overflow-y-auto no-scrollbar h-80 mt-4 rounded-lg ml-4">
                    <div className="p-2">
                        <h2 className=" flex justify-center text-xl font-protest mb-4  ">Users</h2>
                        {users.map((user, index) => (
                            <div
                                key={index}
                                className="flex items-center mb-2 cursor-pointer hover:bg-gray-200 rounded-lg  p-2"
                                onClick={() => {
                                    setSelectedUser(user.followingId._id);
                                    fetchMessages(user.followingId._id);
                                }}
                            >
                                <div className="">
                                    <img src={user.followingId.ProfilePicture} alt="" className="w-10 h-10 bg-gray-400 rounded-full" />
                                </div>
                                <span className="ml-2 hidden md:inline-block font-protest">{user.followingId.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex-1">
                    <div className="p-4">
                        <div className="h-screen bg-thirdShade flex flex-col rounded-lg p-4">
                            <div className="flex justify-between items-center mb-4 bg-gray-200 p-2 rounded-lg">
                                {selectedUser && (
                                    <>
                                        <div className="flex items-center ">
                                            <div>
                                                <img src={selectedUserProfilePicture} alt="" className="w-10 h-10 bg-gray-400 rounded-full" />
                                            </div>
                                            <div className="ml-2">
                                                <h2 className="text-lg font-protest mb-2">{selectedUserName}</h2>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="flex-1 overflow-y-auto no-scrollbar">
                                {selectedUser ? (
                                    messages.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={`${msg.sender._id === userId || msg.sender === userId ? "text-right" : "text-left"
                                                }`}
                                        >
                                            <div className={`bg-${msg.sender._id === userId || msg.sender === userId ? "green" : "green"}-500 text-white p-2 rounded-lg inline-block mb-2`}>
                                                {msg.content}
                                            </div>

                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 flex justify-center text-center mt-52 font-protest">
                                        Select a user to start chatting.
                                    </p>

                                )}

                            </div>
                            {selectedUser && (
                                <div className="flex items-center mt-4">
                                    <input
                                        type="text"
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        placeholder="Type a message..."
                                        className="w-full border border-gray-300 rounded-md p-2 mr-2"
                                    />
                                    <button
                                        onClick={sendMessage}
                                        className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-md"
                                    >
                                        Send
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Inbox;
