import { useEffect, useState } from "react";
import { Axios } from '../../axios/adminInstance.js'
import { IoSearch } from "react-icons/io5";
import EventModal from "../../modal/adminModal/EventModal.jsx";

const EventManagementTable = () => {
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [view, setView] = useState('');
    const [showEventModal, setShowEventModal] = useState(false);

    const handleViewEvent = async (eventId) => {
        try {
            const response = await Axios.get(`/api/getEventId/${eventId}`);
            setView(response.data);
            setShowEventModal(true);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCloseEventModal = (e) => {
        setShowEventModal(false)
    }

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        Axios.get('/api/getEvents')
            .then((response) => {
                const allEvents = response.data;
                if (value.trim() === "") {
                    setEvents(allEvents);
                } else {
                    const filteredEvents = allEvents.filter(event =>
                        event?.title.toLowerCase().includes(value.toLowerCase())
                    );
                    setEvents(filteredEvents);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        Axios.get('/api/getEvents')
            .then((response) => {
                setEvents(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="bg-gray-300 p-4 rounded-md mx-10 my-10">
            <div className='flex justify-center mb-4'>
                <div className="flex items-center rounded-md bg-gray-100 shadow-sm sm:px-2 sm:py-1" style={{ width: '50%' }}>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="flex-grow outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md px-2 py-1"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <div className="ml-1 p-1 rounded-md hover:bg-gray-200 focus:outline-none sm:h-8 sm:w-8" style={{ height: '24px' }}>
                        <IoSearch size={16} className="text-gray-500" />
                    </div>
                </div>
            </div>
            <table className="min-w-full divide-y divide-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="tableHeading">Event Title</th>
                        <th className="tableHeading">Event Date</th>
                        <th className="tableHeading">Event Location</th>
                        <th className="tableHeading">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {events.map((event, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                <div className="text-sm font-protest text-gray-900">{event.title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                <div className="text-sm text-gray-900 font-protest">{new Date(event.date).toLocaleDateString()}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                <div className="text-sm text-gray-900 font-protest">{event.location}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                <button
                                    onClick={() => handleViewEvent(event._id)}
                                    className="px-2 py-1 bg-primary hover:bg-secondary text-white text-sm font-protest rounded-md focus:outline-none"
                                >
                                    View
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
            {showEventModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className=" rounded-lg shadow-md">
                        <EventModal isOpen={showEventModal} event={view} onClose={handleCloseEventModal} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventManagementTable;
