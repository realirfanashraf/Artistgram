import { useContext } from "react";
// import { NotificationContext } from "./context/NotificationContext";
import { SocketContext } from "./context/SocketContext";

// export const useNotification = () => useContext(NotificationContext);
export const useSocket = () => useContext(SocketContext)