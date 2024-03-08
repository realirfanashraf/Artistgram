import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Axios } from '../../axios/userInstance.js';
import swal from 'sweetalert';
import { updateUserProfileFields } from '../../redux/slices/userSlices/userInfoSlice.js';


const EditProfileModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const dispatch = useDispatch()


  const userData = useSelector((state) => state.userInfo.user);

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setBio(userData.bio);
      setLocation(userData.location);
    }
  }, [userData]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('/upload/editProfile', { email: userData.email, name, bio, location });
      if (response.status === 200) {
        const updatedProfile = {
          ...userData,
          name: name,
          bio: bio,
          location: location
        };
        dispatch(updateUserProfileFields(updatedProfile));
        swal('Profile Updated!', 'Your profile has been successfully updated.', 'success');
        onClose();
      }
    } catch (error) {
      swal('Error', 'Failed to update profile. Please try again later.', 'error');
    }
  };

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content bg-thirdShade rounded-lg overflow-hidden p-20 max-w-3xl mx-auto">

        <h2 className="text-2xl font-protest mb-6">Edit Profile</h2>

        <section className="modal-body">
          <div className="field mb-4">
            <label className="block text-sm font-protest">Name</label>
            <input
              className="inputfield"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="field mb-4">
            <label className="block text-sm font-protest">Bio</label>
            <textarea
              className="inputfield"
              placeholder="Enter your bio"
              value={bio}
              onChange={handleBioChange}
            ></textarea>
          </div>
          <div className="field mb-4">
            <label className="block text-sm font-protest">Location</label>
            <input
              className="inputfield"
              type="text"
              placeholder="Enter your location"
              value={location}
              onChange={handleLocationChange}
            />
          </div>
        </section>
        <footer className="modal-footer border-t pt-4 mt-4 flex flex-col sm:flex-row sm:justify-between">
          <button className="button block w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2" onClick={onClose}>Cancel</button>
          <button className="authbtn block w-full" onClick={handleSubmit}>Submit</button>
        </footer>
      </div>
    </div>
  );
};

export default EditProfileModal;
