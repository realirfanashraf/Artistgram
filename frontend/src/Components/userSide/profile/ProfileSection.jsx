
const ProfileSection = () => {
  return (
    <div className="p-4 sm:p-6 rounded-lg">
      <div className="mb-2 sm:mb-4"> 
        <h2 className="text-xl sm:text-2xl font-protest">Irfan Ashraf</h2> 
        <p className="text-sm sm:text-base text-gray-600 font-protest">Exploring the beauty of life through paper and painting</p> 
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between mb-2 sm:mb-4">
        <div className="text-gray-600 font-protest">
          <span className="mr-2">124</span> Followers
        </div>
        <div className="text-gray-600 font-protest">kerala, india</div>
      </div>
      
    </div>
  );
};

export default ProfileSection;
