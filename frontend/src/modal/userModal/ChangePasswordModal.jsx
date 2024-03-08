import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Axios } from '../../axios/userInstance.js';
import swal from 'sweetalert';

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const userData = useSelector((state) => state.userInfo.user);

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('/changePassword', { email: userData.email, currentPassword, newPassword });
      if (response.status === 200) {
        swal('Password Changed!', 'Your password has been successfully changed.', 'success');
        onClose();
      }
    } catch (error) {
      console.error('Error:', error.response.data.message);
      swal('Error', 'Failed to change password. Please try again later.', 'error');
    }
  };

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content bg-thirdShade rounded-lg overflow-hidden p-20 max-w-3xl mx-auto"> {/* Adjusted max-w-3xl */}

        <h2 className="text-2xl font-protest mb-6">Change Password</h2>

        <section className="modal-body">
          <div className="field mb-4">
            <label className="block text-sm font-protest">Current Password</label>
            <input
              className="inputfield"
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
            />
          </div>
          <div className="field mb-4">
            <label className="block text-sm font-protest">New Password</label>
            <input
              className="inputfield"
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={handleChange}
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

export default ChangePasswordModal;
