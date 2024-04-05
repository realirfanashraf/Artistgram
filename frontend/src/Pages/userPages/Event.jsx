import React, { useEffect, useState } from "react";
import Navbar from "../../Components/userSide/NavBar";
import { Axios } from "../../axios/userInstance.js";
import { IoSearch } from "react-icons/io5";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const response = await Axios.get('/api/getEvents');
        if (response.status === 200) {
          setEvents(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchEventsData();

  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
  <Navbar />
  <div className="flex justify-center">
    <div className="flex items-center rounded-md bg-gray-100 mt-3 shadow-sm sm:px-2 sm:py-1" style={{ width: '50%' }}>
      <input
        type="text"
        placeholder="Search..."
        className="flex-grow outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md px-2 py-1"
        onChange={handleSearch} // Added onChange event to trigger search
      />
      <button type="button" className="ml-1 p-1 rounded-md hover:bg-gray-200 focus:outline-none sm:h-8 sm:w-8" style={{ height: '24px' }}>
        <IoSearch size={16} className="text-gray-500" />
      </button>
    </div>
  </div>
  <div className="container mx-auto mt-8 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
    {filteredEvents.map((event) => (
      <div key={event._id} className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
        <img
          className="w-full h-64 object-cover object-center"
          src={event.image}
          alt="Event"
        />
        <div className="p-6">
          <h2 className="text-xl font-protest text-gray-800 mb-2">{event.title}</h2>
          <p className="text-gray-700 mb-4 font-protest">Date: <span className="font-semibold">{new Date(event.date).toLocaleDateString()}</span></p>
          <p className="text-gray-700 mb-4 font-protest">Location: <span>{event.location}</span></p>
          <p className="text-gray-700 mb-4 font-protest">Description: <span>{event.description}</span></p>
        </div>
      </div>
    ))}
  </div>
</>

  );
}

export default Event;
