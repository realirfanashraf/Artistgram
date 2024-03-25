import { useState, useEffect } from 'react';
import Navbar from "../../Components/userSide/NavBar";
import socketIOClient from 'socket.io-client';
import { Axios } from '../../axios/userInstance.js';
import { useSelector } from 'react-redux';
import VideoCall from '../../Components/userSide/VideoCall.jsx';

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
    const [myID, setMyID] = useState('')


    const [isCalling, setIsCalling] = useState(false);
    const [callRecipient, setCallRecipient] = useState(null);
    const [callAccepted, setCallAccepted] = useState(false);
    const [mediaStream, setMediaStream] = useState(null)
    const [peerConnection, setPeerConnection] = useState(null);
    const [partnerStream, setPartnerStream] = useState(null)



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

    useEffect(() => {
        socket.on("myID", (id) => {
            console.log(id, "my socket id");
            setMyID(id);
        });
        socket.emit('authenticate', userId)
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



const initiateVideoCall = (recipient) => {
    try {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                console.log('Got MediaStream:', stream);
                setCallRecipient(recipient);
                setIsCalling(true);
                setMediaStream(stream);

                const pc = new RTCPeerConnection({ 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] });
                console.log(pc,"offer is here ")
                stream.getTracks().forEach(track => pc.addTrack(track, stream));
                setPeerConnection(pc);

                pc.onicecandidate = event => {
                    if (event.candidate) {
                        const signalData = JSON.stringify({
                            type: 'candidate',
                            candidate: event.candidate
                        });
                        console.log(signalData,"icecandidate data is here")
                        socket.emit('iceCandidate', { recipient: recipient, signalData: signalData });
                    }
                };
                //debugged

                const handleIncomingStream = event => {
                    
                    event.streams.forEach(stream => {
                        setPartnerStream(stream);
                        console.log(stream,"stream is here for the patner")
                    });
                };
                pc.ontrack = handleIncomingStream;

                pc.createOffer()
                    .then(offer => pc.setLocalDescription(offer))
                    .then(() => {
                        const signalData = JSON.stringify(pc.localDescription);
                        console.log("creating offer is done as expected ")
                        socket.emit('offerSignal', { recipient: recipient,signalData: signalData });
                    })
                    .catch(error => console.error("Error creating offer:", error));

                socket.on("incomingSignal", signal => {
                    console.log("incoming signal is here")
                    const remoteDescription = new RTCSessionDescription(JSON.parse(signal));
                    if (remoteDescription.type === 'offer') {
                        pc.setRemoteDescription(remoteDescription)
                            .then(() => {
                                pc.createAnswer()
                                    .then(answer => {
                                        pc.setLocalDescription(answer)
                                            .then(() => {
                                                const signalData = JSON.stringify(pc.localDescription);
                                                socket.emit('answerSignal', { signalData: signalData });
                                            })
                                            .catch(error => console.error("Error setting local description:", error));
                                    })
                                    .catch(error => console.error("Error creating answer:", error));
                            })
                            .catch(error => console.error("Error setting remote description:", error));
                    } else if (remoteDescription.type === 'answer') {
                        pc.setRemoteDescription(remoteDescription)
                            .catch(error => console.error("Error setting remote description:", error));
                    } else if (remoteDescription.type === 'candidate') {
                        pc.addIceCandidate(remoteDescription.candidate)
                            .catch(error => console.error("Error adding ICE candidate:", error));
                    }
                });
            })
            .catch(error => {
                console.error('Error accessing media devices:', error);
            });
    } catch (error) {
        console.error('Error accessing media devices:', error);
    }
};

// Function to accept a video call
const acceptVideoCall = () => {
    console.log("accept called")
    socket.emit('acceptCall', { recipient: callRecipient });
    const pc = new RTCPeerConnection();
    pc.ontrack = (event) => {
        console.log('Incoming track received:', event.streams[0]);
        setPartnerStream(event.streams)
    };

    pc.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit('iceCandidate', { candidate: event.candidate, recipient: callRecipient });
        }
    };
    pc.addStream(mediaStream);
    setPeerConnection(pc);
    setCallAccepted(true);
};

// Function to end a video call
const endVideoCall = () => {
    socket.emit('endCall', { recipient: callRecipient });
    if (peerConnection) {
        peerConnection.close();
    }
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => {
            track.stop();
        });
    }
    setIsCalling(false);
    setCallRecipient(null);
    setCallAccepted(false);
    setMediaStream(null);
    setPeerConnection(null);
};




    return (
        <>
            <div className='h-screen'>

                <Navbar />
                {isCalling ? (
                    <VideoCall
                        isCalling={isCalling}
                        callAccepted={callAccepted}
                        acceptVideoCall={acceptVideoCall}
                        endVideoCall={endVideoCall}
                        mediaStream={mediaStream}
                        partnerStream={partnerStream}
                    />
                ) : (
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
                                                        {!isCalling && !callAccepted && (
                                                            <button onClick={() => initiateVideoCall(selectedUser)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start Video Call</button>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
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
                )}
            </div>
        </>

    );
};

export default Inbox;
