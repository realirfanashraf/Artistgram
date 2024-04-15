import { useState } from "react";
import { NotificationState } from "../../../context/NotificationContext";

const NotificationModal = ({ onClose }) => {
  const { notification, setNotification } = NotificationState();
  const [viewedMessages, setViewedMessages] = useState([]);

  const markAsViewed = (senderName) => {
    setViewedMessages(prevViewedMessages => [...prevViewedMessages, senderName]);
    setNotification(prevNotifications => prevNotifications.filter(notification => notification.senderName !== senderName));
  };

  return (
    <div>
      {notification.length > 0 ? (
        <div>
          <h2>New Messages</h2>
          <ul>
            {notification.map((message, index) => (
              <li key={index}>
                {message.senderName}: {message.content}
                {!viewedMessages.includes(message.senderName) && (
                  <button onClick={() => markAsViewed(message.senderName)}>Mark as Read</button>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No new messages</p>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default NotificationModal;
