import { useState } from 'react';
import swal from 'sweetalert';
import { Axios } from '../../../axios/userInstance.js';

const ReportModal = ({ isOpen, onClose, postId, userId }) => {
    const [message, setMessage] = useState('');

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await Axios.post('/api/reportPost', { postId,userId, message });
            if (response.status === 200) {
                swal('Report Submitted!', 'Thank you for reporting this post.', 'success');
                onClose();
            }
        } catch (error) {
            swal('Error', 'Failed to submit report. Please try again later.', 'error');
        }
    }; 

    return (
        <div className={`modal ${isOpen ? 'is-active' : ''}`}>
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-content bg-thirdShade rounded-lg overflow-hidden p-20 max-w-3xl mx-auto">
                <h2 className="text-2xl font-protest mb-6">Report Post</h2>
                <section className="modal-body">
                    <div className="field mb-4">
                        <label className="block text-sm font-protest">Message</label>
                        <textarea
                            className="inputfield"
                            placeholder="Enter your message"
                            value={message}
                            onChange={handleMessageChange}
                        ></textarea>
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

export default ReportModal;
