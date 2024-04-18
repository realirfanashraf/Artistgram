import  { createContext, useRef, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = useRef(null);

  useEffect(() => {
    const socketServerUrl = 'https://artistgram.online';
    socket.current = socketIOClient(socketServerUrl);

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};