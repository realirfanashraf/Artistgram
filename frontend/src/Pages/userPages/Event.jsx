import { useEffect, useState } from "react";
import Navbar from "../../Components/userSide/NavBar";
import { Axios } from "../../axios/userInstance.js";

const Event = () => {
  const [events, setEvents] = useState([]);

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

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {events.map((event) => (
          <div key={event._id} className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
            {/* Event Image */}
            <img
              className="w-full h-64 object-cover object-center"
              src={event.image}
              alt="Event"
            />
            {/* Event Details */}
            <div className="p-6">
              <h2 className="text-xl font-protest text-gray-800 mb-2">
                {event.title}
              </h2>
              <p className="text-gray-700 mb-4 font-protest">
                Date: <span className="font-semibold">{new Date(event.date).toLocaleDateString()}</span>
              </p>
              <p className="text-gray-700 mb-4 font-protest">
                Location: <span>{event.location}</span>
              </p>
              <p className="text-gray-700 mb-4 font-protest">
                Description: <span>{event.description}</span>
              </p>
              {/* <a
                href="#"
                className="block w-full text-center py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Register for Event
              </a> */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Event;
