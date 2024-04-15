import  { createContext, useContext, useState } from "react";
const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState([]);
  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const NotificationState = () => {
  return useContext(NotificationContext)
}

export default NotificationProvider
