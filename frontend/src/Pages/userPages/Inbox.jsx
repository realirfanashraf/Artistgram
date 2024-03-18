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
                <div className="w-1/4 bg-gray-200 h-screen mt-4 rounded-lg ml-4">
                    <div className="p-3">
                        <h2 className="text-lg font-protest mb-4">Users</h2>
                        {users.map((user, index) => (
                            <div
                                key={index}
                                className="flex items-center mb-2 cursor-pointer"
                                onClick={() => {
                                    setSelectedUser(user.followingId._id);
                                    fetchMessages(user.followingId._id);
                                }}
                            >
                                <div className="">
                                    <img src={user.followingId.ProfilePicture} alt="" className="w-10 h-10 bg-gray-400 rounded-full" />
                                </div>
                                <span className="ml-2 hidden md:inline-block">{user.followingId.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex-1">
                    <div className="p-4">
                        <div className="h-screen bg-gray-100 flex flex-col rounded-lg">
                            <div className="flex-1 overflow-y-auto">
                                {selectedUser ? (
                                    messages.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={`${msg.sender._id === userId || msg.sender === userId ? "text-right" : "text-left"
                                                }`}
                                        >
                                            <div className={`bg-${msg.sender._id === userId || msg.sender === userId ? "blue" : "green"}-500 text-white p-2 rounded-lg inline-block mb-2`}>
                                                {msg.content}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">
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
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
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
