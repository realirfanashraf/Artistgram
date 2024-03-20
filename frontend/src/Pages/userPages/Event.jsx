import Navbar from "../../Components/userSide/NavBar";

const Event = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
          {/* Event Image */}
          <img
            className="w-full h-64 object-cover object-center"
            src="https://via.placeholder.com/600x400"
            alt="Event"
          />
          {/* Event Details */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Event Title
            </h2>
            <p className="text-gray-700 mb-4">
              Date: <span className="font-semibold">Event Date</span>
            </p>
            <p className="text-gray-700 mb-4">
              Location: <span className="font-semibold">Event Location</span>
            </p>
            <p className="text-gray-700 mb-4">
              Description: <span className="font-semibold">Event Description</span>
            </p>
            {/* <a
              href="#"
              className="block w-full text-center py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Register for Event
            </a> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Event;
