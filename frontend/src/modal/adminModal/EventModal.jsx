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

  const handleActionEvent = async (actionType) => {
    try {
      let response;
      if (actionType === 'block') {
        response = await Axios.post(`/action/blockEvent/${editedEvent._id}`);
      } else if (actionType === 'unblock') {
        response = await Axios.post(`/action/unblockEvent/${editedEvent._id}`);
      }
      
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
    <div className={`modal ${isOpen ? 'is-active' : ''} `}>
    <div className="bg-thirdShade rounded-lg overflow-hidden py-8 px-16 max-w-md mx-auto">
      <h2 className="text-2xl font-protest mb-6 text-center">Event Details</h2>
      <div className="flex flex-col items-center space-y-4">
        <div className="w-full aspect-w-16 aspect-h-9 mb-6">
          <img src={editedEvent.image} alt="Event" className="object-cover rounded-lg" />
        </div>
        <div className="w-full">
          <div className="field mb-4">
            <label className="block text-sm font-protest mb-1">Description</label>
            <input
              type="text"
              name="description"
              value={editedEvent.description}
              onChange={handleInputChange}
              className="input"
            />
          </div>
          <div className="field mb-4">
            <label className="block text-sm font-protest mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={editedEvent.location}
              onChange={handleInputChange}
              className="input"
            />
          </div>
          <div className="field mb-4">
            <label className="block text-sm font-protest mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={editedEvent.date ? editedEvent.date.substring(0, 10) : ''}
              onChange={handleInputChange}
              className="input"
            />
          </div>
          {editedEvent.isBlocked && (
            <p className="text-red-500 text-center ">This event is blocked</p>
          )}
        </div>
      </div>
      <footer className="border-t pt-4 flex flex-col sm:flex-row sm:justify-between">
        <button className="button w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2" onClick={onClose}>Cancel</button>
        {editedEvent.isBlocked ? (
            <button className="button w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2" onClick={() => handleActionEvent('unblock')}>Unblock</button>
          ) : (
            <button className="button w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2" onClick={() => handleActionEvent('block')}>Block</button>
          )}
        <button className="button w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleEditEvent}>Save</button>
      </footer>
    </div>
  </div>
  
  );
};

export default EventModal;
