import  { useEffect, useRef, useState } from 'react';
import { IoMdCall } from "react-icons/io";
import { MdCallEnd } from "react-icons/md";
import { CiMicrophoneOn } from "react-icons/ci";
import { CiMicrophoneOff } from "react-icons/ci";

const VideoCall = ({
  isOpen,
  onClose,
  isIncomingCall,
  caller,
  myID,
  socket,
  receiverId,
  name,
  callerSignal,
}) => {

  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const myVideo = useRef(null);
  const [video, setVideo] = useState(null);
  const userVideo = useRef(null);
  const peerConnectionRef = useRef(null);
  const [isAudioMuted, setIsAudioMuted] = useState(true);


  useEffect(() => {
    const initializeVideoCall = async (retryCount = 0) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        setStream(stream);
        myVideo.current.srcObject = stream;
        console.log(myVideo.current.srcObject, "streaming");
      } catch (error) {
        console.error("Error getting user media:", error);
        if (retryCount < 3) {
          return initializeVideoCall(retryCount + 1);
        }
      }
    };
    
    initializeVideoCall();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);


  const answerCall = async (callerId, signalData) => {
    console.log("callerId:", callerId);
    console.log("signalData:", signalData);
    console.log("stream", stream);

    const peerConnection = new RTCPeerConnection();

    if (stream) {
      stream.getTracks().forEach((track) => {
        console.log("trackData", track);
        peerConnection.addTrack(track, stream);
      });
    }

    peerConnection.setRemoteDescription(new RTCSessionDescription(signalData));

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("Sending ICE candidate:", event.candidate);
        socket.current.emit("ice-candidate", {
          target: callerId,
          candidate: event.candidate,
        });
      }
    };

    peerConnection
      .createAnswer()
      .then((answer) => {
        return peerConnection.setLocalDescription(answer);
      })
      .then(() => {
        socket.current.emit("answerCall", {
          signal: peerConnection.localDescription,
          to: callerId,
        });
      });

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.current.emit("ice-candidate", {
          target: callerId,
          candidate: event.candidate,
        });
      }
    };

    peerConnection.ontrack = async (event) => {
      console.log("inside event track of anserCall");

      if (event.streams && event.streams[0]) {
        console.log(event.streams[0].getTracks(), "mediaStream");

        userVideo.current.srcObject = await event.streams[0];
        setVideo(event.streams[0]);

        if (userVideo.current.srcObject) {
          console.log("userVideo checking :", userVideo.current.srcObject);
        }
      }
    };

    socket.current.on("ice-candidate", (data) => {
      const { candidate } = data;

      peerConnection
        .addIceCandidate(new RTCIceCandidate(candidate))
        .catch((error) => {
          console.error("Error adding ICE candidate:", error);
        });
    });

    setCallAccepted(true);

    peerConnectionRef.current = peerConnection;
  };


  useEffect(() => {
    const callUser = async () => {
      const peerConnection = new RTCPeerConnection({
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302",
          },
        ],
      });

      console.log("stream", stream);
      if (myVideo.current) {
        console.log(myVideo.current.srcObject, "my stream");
      }
      if (myVideo.current?.srcObject) {
        myVideo.current.srcObject.getTracks().forEach((track) => {
          console.log("inside track", track);

          peerConnection.addTrack(track, myVideo.current.srcObject);
        });
      }
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.current.emit("ice-candidate", {
            target: receiverId,
            candidate: event.candidate,
          });
        }
      };

      try {
        const offer = await peerConnection.createOffer();
        console.log("Offer created:", offer);
        await peerConnection.setLocalDescription(offer);
        console.log("Local description set:", peerConnection.localDescription);

        socket.current.emit("callUser", {
          userToCall: receiverId,
          signalData: peerConnection.localDescription,
          from: myID,
          name: name,
        });
      } catch (error) {
        console.error(
          "Error creating offer or setting local description:",
          error
        );
      }

      socket.current.on("callAccepted", (signal) => {
        console.log("call accepted");
        setCallAccepted(true);
        peerConnection.setRemoteDescription(new RTCSessionDescription(signal));
      });

      socket.current.on("ice-candidate", (data) => {
        const { candidate } = data;

        peerConnection
          .addIceCandidate(new RTCIceCandidate(candidate))
          .catch((error) => {
            console.error("Error adding ICE candidate:", error);
          });
      });

      peerConnection.ontrack = (event) => {
        console.log("inside event track of callUser");

        if (event.streams && event.streams[0]) {
          userVideo.current.srcObject = event.streams[0];
        }
      };
      peerConnectionRef.current = peerConnection;
    };

    if (!isIncomingCall) {
      callUser();
    }
  }, [isIncomingCall, myID, name, receiverId, socket, stream]);

  useEffect(() => {
    socket.current.on("callEnded", () => {
      console.log("Call ended event received");
      setCallEnded(true);
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }

      if (myVideo.current) {
        myVideo.current.srcObject = null;
      }

      if (userVideo.current) {
        userVideo.current.srcObject = null;
      }

      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
        peerConnectionRef.current = null;
      }
      onClose();
    });
  }, [socket.current, stream]);

  const handleCallEnd = () => {
    console.log("inside cal end");
    onClose();

    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    }

    if (myVideo.current) {
      myVideo.current.srcObject = null;
    }

    if (userVideo.current) {
      userVideo.current.srcObject = null;
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    setCallEnded(true);

    socket.current.emit("callEnded", { userId: receiverId });
  };

  const toggleAudioMute = async () => {
    const tracks = await myVideo.current.srcObject.getAudioTracks();
    tracks.forEach((track) => {
      console.log(track);

      track.enabled = !isAudioMuted;
      console.log(track);
    });
    console.log(tracks);

    setIsAudioMuted(!isAudioMuted);
  };


  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
  <div id="video-call-modal">
    {isIncomingCall ? "Incoming Video Call" : "Ongoing Video Call"}
  </div>

  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    {stream && (
      <>
        <video
          playsInline
          ref={myVideo}
          autoPlay
          style={{
            width: callAccepted ? "150px" : "100%", // Adjusted width for responsiveness
            maxWidth: "800px", // Max width for larger screens
            marginBottom: "1rem",
            position: callAccepted && !callEnded ? "absolute" : "static",
            top: callAccepted && !callEnded ? "140px" : "auto", // Adjusted top position
            right: callAccepted && !callEnded ? "130px" : "auto", // Adjusted right position
            zIndex: callAccepted && !callEnded ? 1 : "auto",
            border: callAccepted && !callEnded ? "1px solid red" : "none",
            borderRadius: callAccepted && !callEnded ? "8px" : "0",
            boxShadow: callAccepted && !callEnded ? "5px" : "none",
          }}
        />
        {!isIncomingCall && !callAccepted && <h4>Calling....</h4>}
      </>
    )}
    {isIncomingCall && !callAccepted && (
      <div>
        <h1>{name} is calling...</h1>
      </div>
    )}
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <button
        color={isAudioMuted ? "primary" : "secondary"}
        onClick={toggleAudioMute}
      >
        {isAudioMuted ? <CiMicrophoneOn size={30} /> : <CiMicrophoneOff size={30}/>}
      </button>
      {isIncomingCall && !callAccepted && (
        <button
          color="primary"
          onClick={() => answerCall(caller, callerSignal)}
        >
          <IoMdCall size={27}/>
        </button>
      )}
      <button
        color="secondary"
        onClick={handleCallEnd}
      >
        <MdCallEnd size={27}/>
      </button>
    </div>
  </div>

  <div style={{ display: callAccepted && !callEnded ? "block" : "none", width: "100%", maxWidth: "400px" }}>
    <video
      style={{
        width: "100%",
        height: "300px",
        border: "1px solid red",
        borderRadius: "8px",
      }}
      playsInline
      ref={userVideo}
      autoPlay
      muted
    />
  </div>
</div>



  );
};

export default VideoCall;
