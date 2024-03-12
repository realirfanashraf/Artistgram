import { useSelector } from "react-redux";
import { followUserRequest} from '../../../API/apiCalls.js'
import { showErrorMessage,showSuccessMessage } from "../../../helper/sweetalert.js";

const SuggestionBox = ({ users, loading, listFinished }) => {

  const userData = useSelector((state) => state.userInfo.user);

  const handleFollow = async (userId) => {
    console.log(`Follow action triggered for user with ID: ${userId}`);
  
    try {
      const response = await followUserRequest({ following: userId, follower: userData._id });
      if (response.status === 200) {
        showSuccessMessage(response.data.message)
      } else {
        console.log("Failed to follow user");
      }
    } catch (error) {
      showErrorMessage(error)
    }
  }
  
  

  return (

   
    <div>
     <div className="flex justify-center items-center ">
    <p className="font-protest mb-3 bg-inherit rounded-lg px-1">Connect with Artists</p>
  </div>

      {users.map((user,index) => (
        <div
          key={index}
          className="suggestion-item flex items-center space-x-2 p-2 mb-2 shadow-2xl rounded-lg bg-inherit"
        >
          <img
            src={user.ProfilePicture}
            alt={user.name}
            className="suggestion-avatar w-10 h-10 rounded-full"
          />
          <div className="suggestion-info">
            <p className="suggestion-name font-protest">{user.name}</p>
            <button
              className="suggestion-follow-button flex justify-center rounded-md bg-primary px-1 text-sm font-protest leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              onClick={() => handleFollow(user._id)}
            >
              Follow
            </button>
          </div>
        </div>
      ))}
      {loading && <p className="loading-message">Loading...</p>}
      {listFinished && <p className="finished-message">List Completed</p>}
    </div>
  );
};

export default SuggestionBox;
