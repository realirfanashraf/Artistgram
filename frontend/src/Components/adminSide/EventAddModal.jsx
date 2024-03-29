import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Axios } from '../../axios/adminInstance.js';

const EventAddModal = ({ isOpen, onClose, updateEvents }) => {
    const PRESET_KEY = import.meta.env.VITE_PRESET_KEY
    const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME
    const CLOUD_UPLOAD_URL = import.meta.env.VITE_CLOUD_UPLOAD_URL
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);
  const [location, setLocation] =useState('')

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleLocationChange = (e)=>{
    setLocation(e.target.value);
  }

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !title || !description || !date) {
      return swal('Error', 'Please provide all details.', 'error');
    }

    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', `${PRESET_KEY}`);
      formData.append('cloud_name', `${CLOUD_NAME}`);
      const response = await axios.post(`${CLOUD_UPLOAD_URL}`, formData);
        console.log(response)

      if (response.status === 200) {
        await Axios.post('/action/addEvent', {
          title,
          location,
          description,
          date,
          imageUrl: response.data.url,
        });
        // updateEvents();
        swal('Event Added!', 'Your event has been successfully added.', 'success');
        onClose();
      } else {
        swal('Error', 'Failed to upload image. Please try again later.', 'error');
      }
    } catch (error) {
      console.error('Error adding event:', error);
      swal('Error', 'Failed to add event. Please try again later.', 'error');
    }
  };

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content bg-thirdShade rounded-lg overflow-hidden p-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-protest mb-6">Add New Event</h2>
        <section className="modal-body">
          <div className="field mb-4">
            <label className="block text-sm font-protest">Title</label>
            <input
              type="text"
              className="inputfield"
              placeholder="Enter event title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="field mb-4">
            <label className="block text-sm font-protest">Location</label>
            <input
              type="text"
              className="inputfield"
              placeholder="Enter event Location"
              value={location}
              onChange={handleLocationChange}
            />
          </div>
          <div className="field mb-4">
            <label className="block text-sm font-protest">Description</label>
            <textarea
              className="inputfield"
              placeholder="Enter event description"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
          </div>
          <div className="field mb-4">
            <label className="block text-sm font-protest">Date</label>
            <input
              type="date"
              className="inputfield"
              value={date}
              onChange={handleDateChange}
            />
          </div>
          <div className="field mb-4">
            <label className="block text-sm font-protest">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </section>
        <footer className="modal-footer border-t pt-4 mt-4 flex flex-col sm:flex-row sm:justify-between">
          <button className="button block w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2" onClick={onClose}>Cancel</button>
          <button className="authbtn block w-full" onClick={handleSubmit}>Add Event</button>
        </footer>
      </div>
    </div>
  );
};

export default EventAddModal;
