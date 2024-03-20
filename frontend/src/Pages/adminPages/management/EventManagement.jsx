import { useState } from 'react';
import AdminNavbar from '../../../Components/adminSide/AdminNavbar';
import axios from 'axios'
import { Axios } from '../../../axios/userInstance.js';
import swal from 'sweetalert';

const EventManagement = () => {
    const [formData, setFormData] = useState({
      image: null,
      title: '',
      date: '',
      location: '',
      description: ''
    });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (!formData.image || !formData.title || !formData.date || !formData.location || !formData.description) {
          return alert('Please fill in all fields.'); // You can use your preferred notification library here
        }
  
        const formDataCloudinary = new FormData();
        formDataCloudinary.append('file', formData.image);
        formDataCloudinary.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        formDataCloudinary.append('cloud_name', import.meta.env.VITE_CLOUD_NAME);
  
        const response = await axios.post(import.meta.env.VITE_CLOUDINARY_UPLOAD_URL, formDataCloudinary);
  
        if (response.status === 200) {
          const imageUrl = response.data.url;
          formData.image = imageUrl
            await Axios.post('/action/newEvent',{formData})
            .then((response)=>{
                if(response == 200){
                    swal("sucess")
                }
            })

          setFormData({
            image: null,
            title: '',
            date: '',
            location: '',
            description: ''
          });
  
          alert('Event created successfully!'); // You can use your preferred notification library here
        } else {
          console.error('Image upload failed:', response.statusText);
          alert('Failed to upload image. Please try again later.'); // You can use your preferred notification library here
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to create event. Please try again later.'); // You can use your preferred notification library here
      }
    };
  return (
    <div className="flex flex-col h-screen">
      <AdminNavbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="file"
              onChange={handleImageChange}
              name="image"
              className="inputfield"
              placeholder="Choose Image"
            />
            <input
              type="text"
              onChange={handleChange}
              name="title"
              value={formData.title}
              className="inputfield"
              placeholder="Event Title"
            />
            <input
              type="text"
              onChange={handleChange}
              name="date"
              value={formData.date}
              className="inputfield"
              placeholder="Event Date"
            />
            <input
              type="text"
              onChange={handleChange}
              name="location"
              value={formData.location}
              className="inputfield"
              placeholder="Event Location"
            />
            <textarea
              onChange={handleChange}
              name="description"
              value={formData.description}
              className="inputfield resize-none h-24"
              placeholder="Event Description"
            />
            <div className="flex justify-between items-center">
              <button type="submit" className="authbtn">
                Submit
              </button>
             
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventManagement;
