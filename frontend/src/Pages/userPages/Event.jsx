import { useEffect, useState } from "react";
import Navbar from "../../Components/userSide/NavBar";
import { Axios } from "../../axios/userInstance.js";
import { IoSearch } from "react-icons/io5";
import {useSelector} from 'react-redux'


const Event = () => {
  const userData = useSelector((state)=>state.userInfo.user)
  const [events, setEvents] = useState([]);
  const [registeredEvents,setRegisteredEvents] =useState([])
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const response = await Axios.get('/api/getEvents')
        if (response.status === 200) {
          console.log(response.data)
          const { events, registeredEvents } = response.data;
          setEvents(events);
          if (registeredEvents) {
            setRegisteredEvents(registeredEvents);
          }
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEventsData();
  }, []); 

  
  const handleRegistration =async(eventId)=>{
        console.log(eventId,"event id is here")
      try {
          await Axios.post('/action/payment-session', { userId :userData._id ,eventId})
          .then((response) => {
            console.log(response.data)  
            if (response.data) {
                  window.location.href = response.data.session.url
              }
          }).catch((error) => {
              console.log("error", error)
          })
      } catch (Error) {
          console.log("error", Error)
      }
  
  }

  const isEventRegistered = (eventId)=>{
    return registeredEvents.some(event => event.event === eventId);
  }
  

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
    <div className="h-screen">
      <div className="flex justify-center">
        <div className="flex items-center rounded-md bg-gray-100 mt-3 shadow-sm sm:px-2 sm:py-1" style={{ width: '50%' }}>
          <input
            type="text"
            placeholder="Search..."
            className="flex-grow outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md px-2 py-1"
            onChange={handleSearch} 
          />
          <button type="button" className="ml-1 p-1 rounded-md hover:bg-gray-200 focus:outline-none sm:h-8 sm:w-8" style={{ height: '24px' }}>
            <IoSearch size={16} className="text-gray-500" />
          </button>
        </div>
      </div>
      <div className="container mx-auto mt-8 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {filteredEvents.map((event) => (
          <div key={event._id} className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
            <img
              className="w-80 h-56 object-cover object-center"
              src={event.image}
              alt="Event"
            />
            <div className="p-6">
              <h2 className="text-xl font-protest text-gray-800 mb-2">{event.title}</h2>
              <p className="text-gray-700 mb-2 font-protest">Date: <span>{new Date(event.date).toLocaleDateString()}</span></p>
              <p className="text-gray-700 mb-2 font-protest">Location: <span>{event.location}</span></p>
              <p className="text-gray-700 mb-2 font-protest">Registration Fee: <span>200</span></p>
              <p className="text-gray-700 mb-2 font-protest">Description: <span>{event.description}</span></p>
              {isEventRegistered(event._id) ? (
                  <span className="text-green-500 font-bold">Registered</span>
                ) : (
                  <button className="authbtn" onClick={() => { handleRegistration(event._id) }}>Register</button>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
  );
}

export default Event;
