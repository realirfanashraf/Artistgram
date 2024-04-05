import React, { useState } from 'react';
import { Axios } from '../../axios/adminInstance.js';
import { showErrorMessage, showSuccessMessage } from '../../helper/sweetalert.js';

const EventModal = ({ isOpen, onClose, event, fetchEvents }) => {
  const [editedEvent, setEditedEvent] = useState({ ...event });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };

  const handleEditEvent = async () => {
    try {
      const response = await Axios.post(`/action/editEvent/${editedEvent._id}`, editedEvent);
      if (response.status === 200) {
        showSuccessMessage(response.data.message);
        fetchEvents();
        onClose();
      }
    } catch (error) {
      showErrorMessage(error.data.message);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      const response = await Axios.post(`/action/deleteEvent/${editedEvent._id}`);
      if (response.status === 200) {
        showSuccessMessage(response.data.message);
        fetchEvents();
        onClose();
      }
    } catch (error) {
      showErrorMessage(error.data.message);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="bg-thirdShade rounded-lg overflow-hidden py-8 px-16 max-w-md mx-auto">
        <h2 className="text-2xl font-protest mb-3 text-center">Event Details</h2>
        <div className='flex flex-col items-center'>
          {/* Assuming event.image is the image URL */}
          <div className="h-56 w-full mb-3">
            <img src={editedEvent.image} alt="Event" className="max-w-full max-h-full rounded-lg" />
          </div>
          <div className="field mb-3 text-center">
            <label className="block text-sm font-protest">Description</label>
            <input
              type="text"
              name="description"
              value={editedEvent.description}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="field mb-3 text-center">
            <label className="block text-sm font-protest">Location</label>
            <input
              type="text"
              name="location"
              value={editedEvent.location}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="field mb-3 text-center">
            <label className="block text-sm font-protest">Date</label>
            <input
              type="date"
              name="date"
              value={editedEvent.date ? editedEvent.date.substring(0, 10) : ''}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <footer className="border-t pt-4 mt-2 flex flex-col sm:flex-row sm:justify-between">
          <button className="button block w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2" onClick={onClose}>Cancel</button>
          <button className="button block w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2" onClick={handleDeleteEvent}>Delete</button>
          <button className="button block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleEditEvent}>Save</button>
        </footer>
      </div>
    </div>
  );
};

export default EventModal;
