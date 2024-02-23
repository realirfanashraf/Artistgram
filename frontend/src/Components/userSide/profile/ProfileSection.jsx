import { TbEdit } from "react-icons/tb";

const ProfileSection = () => {
  return (
    <div className=" p-6 rounded-lg">
      <div className="mb-4">
        <h2 className="text-2xl font-protest">Irfan Ashraf</h2>
        <p className="text-gray-600 font-protest">Exploring the beauty of life through paper and painting</p>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-gray-600 font-protest">
          <span className="mr-2">124</span> Followers
        </div>
        <div className="text-gray-600 font-protest">kerala, india</div>
      </div>
      <button
        className=" font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline float-right"
        
      >
        <TbEdit size={20} /> 
      </button>
    </div>
  );
};

export default ProfileSection;

