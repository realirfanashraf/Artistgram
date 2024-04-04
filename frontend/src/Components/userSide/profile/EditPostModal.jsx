import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { Axios } from '../../../axios/userInstance.js';

const EditPostModal = ({ isOpen, onClose, postId }) => {
    const [postDetails, setPostDetails] = useState(null);
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const response = await Axios.get(`/api/posts/${postId}`);
                setPostDetails(response.data);
                setDescription(response.data.description);
            } catch (error) {
                console.error('Error fetching post details:', error);
            }
        };

        if (isOpen && postId) {
            fetchPostDetails();
        }
    }, [isOpen, postId]);

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await Axios.put(`/action/posts/${postId}`, { description });
            swal('Post Updated!', 'Your post description has been successfully updated.', 'success');
            onClose();
        } catch (error) {
            console.error('Error updating post description:', error);
            swal('Error', 'Failed to update post description. Please try again later.', 'error');
        }
    };

    return (
        <div className={`modal ${isOpen ? 'is-active' : ''}`}>
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-content bg-thirdShade rounded-lg overflow-hidden p-20 max-w-3xl mx-auto">
                <h2 className="text-2xl font-protest mb-6">Edit Post</h2>
                <section className="modal-body">
                    {postDetails && (
                        <img
                            src={postDetails.image}
                            alt="Post"
                            className="mb-4"
                            style={{ maxWidth: '100%', maxHeight: '150px' }}
                        />
                    )}

                    <div className="field mb-4">
                        <label className="block text-sm font-protest">Description</label>
                        <textarea
                            className="inputfield"
                            placeholder="Enter your description"
                            value={description}
                            onChange={handleDescriptionChange}
                        ></textarea>
                    </div>
                </section>
                <footer className="modal-footer border-t pt-4 mt-4 flex flex-col sm:flex-row sm:justify-between">
                    <button className="button block w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-protest py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2" onClick={onClose}>Cancel</button>
                    <button className="authbtn block w-full font-protest" onClick={handleSubmit}>Save</button>
                </footer>
            </div>
        </div>
    );
};

export default EditPostModal;
