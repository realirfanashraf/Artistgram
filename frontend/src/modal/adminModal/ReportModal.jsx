import { Axios } from '../../axios/adminInstance.js';
import { showErrorMessage, showSuccessMessage } from '../../helper/sweetalert.js';

const ReportModal = ({ isOpen, onClose, post ,reportId}) => {

  const handleBlockSubmit = async (postId) => {
    try {
      const response = await Axios.post(`/action/blockPost/${postId}`,{reportId});
      if (response.status === 200) {
        showSuccessMessage(response.data.message)
        onClose();
      }
    } catch (error) {
      showErrorMessage(error.data.message)
    }
  };

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="bg-thirdShade rounded-lg overflow-hidden py-8 px-16 max-w-md mx-auto"> 
        <h2 className="text-2xl font-protest mb-3 text-center">Post Details</h2>
        <div className='flex flex-col items-center'>
          <div className="h-56 w-full mb-3">
            <img src={post.image} alt="Post" className="max-w-full max-h-full rounded-lg" />
          </div>
          <div className="field mb-3 text-center">
            <label className="block text-sm font-protest">Description</label>
            <p>{post.description}</p>
          </div>
        </div>
        <footer className="border-t pt-4 mt-2 flex flex-col sm:flex-row sm:justify-between">
          <button className="button block w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2" onClick={onClose}>Cancel</button>
          <button className="button block w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={()=>{handleBlockSubmit(post?._id)}}>Block</button>
        </footer>
      </div>
    </div>

  );
};

export default ReportModal;
