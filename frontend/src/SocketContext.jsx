import  { createContext, useContext, useRef, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const socket = useRef(null);

  useEffect(() => {
    const socketServerUrl = import.meta.env.VITE_SERVER_URL;
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