import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useSelector } from 'react-redux'
import { Axios } from '../../axios/userInstance.js';

const NewPostModal = ({ isOpen, onClose, updatePosts }) => {
  const PRESET_KEY = import.meta.env.VITE_PRESET_KEY
  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME
  const CLOUD_UPLOAD_URL = import.meta.env.VITE_CLOUD_UPLOAD_URL
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);

  const user = useSelector((state) => state.userInfo.user)

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !caption) {
      return swal('Error', 'Please provide both image and caption.', 'error');
    }

    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', `${PRESET_KEY}`);
      formData.append('cloud_name', `${CLOUD_NAME}`);
      const response = await axios.post(`${CLOUD_UPLOAD_URL}`, formData);

      if (response.status === 200) {

        await Axios.post('/upload/newPost', {
          caption,
          imageUrl: response.data.url,
          id: user?._id
        });
        updatePosts({
          _id: response.data.postId,
          caption,
          image: response.data.url
        });
        swal('Post Created!', 'Your post has been successfully created.', 'success');
        onClose();
      } else {

        console.error('Image upload failed:', response.statusText);
        swal('Error', 'Failed to upload image. Please try again later.', 'error');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      swal('Error', 'Failed to create post. Please try again later.', 'error');
    }
  };

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content bg-thirdShade rounded-lg overflow-hidden p-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-protest mb-6">Create New Post</h2>
        <section className="modal-body">
          <div className="field mb-4">
            <label className="block text-sm font-protest">Caption</label>
            <textarea
              className="inputfield"
              placeholder="Enter your caption"
              value={caption}
              onChange={handleCaptionChange}
            ></textarea>
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
          <button className="authbtn block w-full" onClick={handleSubmit}>Share Post</button>
        </footer>
      </div>
    </div>
  );
};

export default NewPostModal;
