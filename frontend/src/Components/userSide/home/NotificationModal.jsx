import { IoIosCloseCircleOutline } from "react-icons/io";
import { NotificationState } from "../../../context/NotificationContext";
import { AiTwotoneClockCircle } from "react-icons/ai";
import { useEffect, useState } from "react";

const NotificationModal = ({ onClose }) => {
  const { notification } = NotificationState();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const timeAgo = (timestamp) => {
    const seconds = Math.floor((currentTime - new Date(timestamp)) / 1000);

    let interval = Math.floor(seconds / 31536000);
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `${interval} days ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval} hours ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval} minutes ago`;
    }
    return `${Math.floor(seconds)} seconds ago`;
  };
  return (
    <div className="fixed top-20 right-12 w-300px z-9999">
      {notification.length > 0 ? (
        <div className="bg-white border rounded-md border-blue-gray-50 shadow-lg shadow-blue-gray-500/10 p-3 font-sans text-sm text-blue-gray-500 overflow-auto min-w-200px">
          <h2 className="text-base font-protest mb-2">New Notifications</h2>
          <button className="absolute top-3 right-2" onClick={onClose}>
            <IoIosCloseCircleOutline size={20} />
          </button>
          <ul
            className="flex flex-col gap-2"
            role="menu"
            data-popover="notifications-menu"
            data-popover-placement="bottom"
          >
            {notification.map((notif, index) => (
              <li
                key={index}
                className="flex items-center gap-4 px-3 py-2 pl-2 pr-8 leading-tight transition-all rounded-md outline-none cursor-pointer select-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                role="menuitem"
              >
                <img
                  alt={notif.senderName}
                  src={notif.senderImage}
                  className="h-12 w-12 rounded-full object-cover object-center"
                />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-gray-700">
                    {notif.senderName} {notif.content}
                  </p>

                  <p className="flex items-center gap-1 text-blue-gray-500">
                    <AiTwotoneClockCircle />
                    {timeAgo(notif.timestamp)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-white border rounded-md border-blue-gray-50 shadow-lg shadow-blue-gray-500/10 p-3 font-sans text-sm text-blue-gray-500 w-72">
          <p className="text-base font-protest mb-2">No New Notfication</p>
          <button className="absolute top-3 right-2" onClick={onClose}>
            <IoIosCloseCircleOutline size={20} />
          </button>
        </div>

      )}
    </div>
  );
};

export default NotificationModal;
