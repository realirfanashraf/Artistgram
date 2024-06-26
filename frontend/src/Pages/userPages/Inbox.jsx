import { useState, useEffect, useRef } from 'react';
import Navbar from "../../Components/userSide/NavBar";
import { Axios } from '../../axios/userInstance.js';
import { useSelector } from 'react-redux';
import VideoCall from '../../Components/userSide/VideoCall.jsx';
import { CiVideoOn } from "react-icons/ci";
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {  useSocket } from '../../customHooks.jsx'
import { NotificationState } from '../../context/NotificationContext.jsx';



const Inbox = () => {
    const location = useLocation();
    const socket = useSocket()
    const [selectedUser, setSelectedUser] = useState(null);
    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUserName, setSelectedUserName] = useState("");
    const [selectedUserProfilePicture, setSelectedUserProfilePicture] = useState("");
    const userData = useSelector((state) => state.userInfo.user);
    
    const [videoCall, setVideoCall] = useState(false)
    const [caller, setCaller] = useState("")
    const [callerSignal, setCallerSignal] = useState()
    const [isIncomingCall, setIsIncomingCall] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isTyping, setIsTyping] = useState(false);
    const [messageReciever, setMessageReciever] = useState(null)
    const { data } = location.state || {};
    const messageContainerRef = useRef(null)

    useEffect(() => {
        if (data && data._id) {
            console.log(data, "inside the useEffect");
            setUsers([data])
            setSelectedUser(data._id);
            fetchMessages(data._id);
            location.state = null;
        }
    }, []);



    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);


    useEffect(() => {
        if (selectedUser) {
            fetchMessages(selectedUser);
        }
    }, [selectedUser]);

    useEffect(() => {
        socket.current.on('message', handleMessage);
        console.log("useeffect isnide the inbox event message")
        return () => {
            socket.current.off('message', handleMessage);
        };
    }, [selectedUser]);

   

    


    const startTyping = () => {
        if (!isTyping) {

            socket.current.emit('typing', { receiver: selectedUser, isTyping: true });
        }
    };

    const stopTyping = () => {
        socket.current.emit('typing', { receiver: selectedUser, isTyping: false });
    };

    useEffect(() => {
        if (socket.current) {

            socket.current.on('typing', ({ isTyping, receiver }) => {
                scrollToBottom();
                console.log(receiver, "message to")
                setMessageReciever(receiver)
                setIsTyping(isTyping);
            });
        }
    }, [socket.current]);


    const sendMessage = () => {
        if (!selectedUser || !messageInput.trim()) return;

        const newMessage = {
            sender: userData._id,
            senderName: userData.name,
            senderImage:userData.ProfilePicture,
            receiver: selectedUser,
            content: messageInput.trim(),
            timestamp: new Date()
        };
        socket.current.emit('message', newMessage);
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setMessageInput("");
        fetchUsers()
    };


    const handleMessage = (message) => {
        if (selectedUser == message.sender) {
          setMessages(prevMessages => [...prevMessages, message]);
        }
      }
      

    const fetchUsers = async () => {
        try {
            const response = await Axios.get("/api/usersToChat");
            console.log(response.data, "fetching users....")
            const data = response.data
            const filtered = data.filter(d => d.userId._id != userData._id)
            console.log(filtered, "filtered")
            const usergetting = filtered.map(item => {
                return {
                    ...item.userId,
                    lastMessage: item.latestMessage.content
                };
            });
            setUsers(usergetting)

        } catch (error) {
            console.error("Error fetching following:", error);
        }
    };

    const fetchMessages = async (selectedUserId) => {
        try {
            const response = await Axios.get(`/api/messages/${selectedUserId}`)
            setMessages(response.data);
            const selectedUser = users.find(user => user?._id === selectedUserId);
            if (selectedUser) {
                setSelectedUserName(selectedUser?.name);
                setSelectedUserProfilePicture(selectedUser?.ProfilePicture);
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on("callUser", (data) => {
                console.log("inside the incoming call", data);
                if (!isIncomingCall) {
                    setIsModalOpen(true);
                    setVideoCall(true);
                    setIsIncomingCall(true);
                    setCaller(data.from);
                    setCallerSignal(data.signal);
                }
            });
        }
    }, [socket.current]);

    const handleVideoCallClick = (selectedUser) => {
        setIsModalOpen(true);
        setSelectedUser(selectedUser)
        setVideoCall(true);
        console.log(VideoCall, "video call");
    };


    return (
        <>
            <Navbar />
            {isModalOpen && (
                <VideoCall
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    isIncomingCall={isIncomingCall}
                    caller={caller}
                    myID={userData._id}
                    socket={socket}
                    receiverId={selectedUser}
                    name={selectedUserName}
                    callerSignal={callerSignal}
                />

            )} :
            {!isModalOpen && (
                <div className="flex">
                    <div className="w-1/4 bg-thirdShade overflow-y-auto no-scrollbar h-80 mt-4 rounded-lg ml-4">
                        <div className="p-2">
                            <h2 className=" flex justify-center text-xl font-protest mb-4  ">Users</h2>
                            {users.map((user, index) => (
                                <div
                                    key={index}
                                    className="flex items-center mb-2 cursor-pointer hover:bg-gray-200 rounded-lg  p-2"
                                    onClick={() => {
                                        setSelectedUser(user._id);
                                        fetchMessages(user._id);
                                    }}
                                >
                                    <div className="">
                                        <img src={user.ProfilePicture} alt="" className="w-10 h-10 bg-gray-400 rounded-full" />
                                    </div>
                                    <div className='flex flex-col  items-start '>
                                        <span className="ml-2 mb-2 md:mb-0 md:mr-2 font-protest">{user.name}</span>
                                        <p className="ml-2">{user.lastMessage}</p>
                                    </div>


                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="p-4">
                            <div className="h-screen bg-thirdShade flex flex-col rounded-lg p-4">
                                <div className="flex justify-between items-center mb-4 bg-gray-200 p-2 rounded-lg">
                                    {selectedUser && (
                                        <div className="w-full flex justify-between items-center">
                                            <div className="flex items-center">
                                                <div>
                                                    <img src={selectedUserProfilePicture} alt="" className="w-10 h-10 bg-gray-400 rounded-full" />
                                                </div>
                                                <div className="ml-2">
                                                    <h2 className="text-lg font-protest mb-2">{selectedUserName}</h2>
                                                </div>
                                            </div>
                                            {selectedUser && (
                                                <div className='flex justify-end'>
                                                    {!isModalOpen && (
                                                        <button onClick={() => handleVideoCallClick(selectedUser)} className='mr-3' >
                                                            <CiVideoOn size={30} />
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 overflow-y-auto no-scrollbar" ref={messageContainerRef}>
                                    {selectedUser ? (
                                        <>
                                            {messages.map((msg, index) => {
                                                // Check if the date has changed since the previous message
                                                const showDate = index === 0 || new Date(messages[index - 1].timestamp).toDateString() !== new Date(msg.timestamp).toDateString();

                                                return (
                                                    <div key={index}>
                                                        {showDate && (
                                                            <p className="text-center text-gray-500 font-protest my-2">
                                                                {new Date(msg.timestamp).toDateString()}
                                                            </p>
                                                        )}
                                                        <div className={`${msg.sender._id === userData._id || msg.sender === userData._id ? "text-right" : "text-left"
                                                            }`}
                                                        >
                                                            <div className={`bg-${msg.sender._id === userData._id || msg.sender === userData._id ? "green" : "green"}-500 text-white p-2 rounded-lg inline-block mb-2`}>
                                                                <p>{msg.content}</p>
                                                                <p className="text-xs text-gray-300">{new Date(msg.timestamp).toLocaleTimeString()}</p> {/* Show time */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                            {isTyping && (
                                                <p className="text-gray-500 flex justify-start pl-4 font-protest">
                                                    {selectedUserName} is typing...
                                                </p>
                                            )}
                                        </>
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
                                            onFocus={startTyping}
                                            onBlur={stopTyping}
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
            )}

        </>

    );
};

export default Inbox;
