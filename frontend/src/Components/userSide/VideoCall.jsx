import { useEffect, useRef } from 'react';

const VideoCall = ({ isCalling, callAccepted, acceptVideoCall, endVideoCall, mediaStream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && mediaStream && isCalling) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream, isCalling,acceptVideoCall]);




  return (
    <div className="video-call-interface mt-4 border border-gray-300 rounded p-4">
      {!callAccepted ? (
        <div className="flex justify-center">
          <button onClick={acceptVideoCall} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">Accept Call</button>
          <button onClick={endVideoCall} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Reject Call</button>
        </div>
      ) : (
        <div>
          {mediaStream && (
            <video id="localVideo" autoPlay playsInline muted ref={videoRef}></video>
          )}
          <button onClick={endVideoCall} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2">End Call</button>
        </div>
      )}
    </div>
  );
};

export default VideoCall;
