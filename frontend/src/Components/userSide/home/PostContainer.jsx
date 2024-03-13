import { useState } from 'react';
import { SlOptionsVertical } from 'react-icons/sl';

const PostContainer = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
      
        <div className="bg-thirdShade rounded-lg shadow-md p-6 mt-6 flex items-start"> 
          <img src="/images/profile.jpg" alt="" className="rounded-full w-10 h-10 sm:w-12 sm:h-12 object-cover mr-4" /> 
          <div className="flex-grow"> 
            <div className="flex items-center mb-4"> 
              <p className="font-protest text-lg text-gray-800">Irfan Ashraf</p> 
              <div className="ml-auto"> 
                <SlOptionsVertical className="w-6 h-6 text-gray-600 cursor-pointer" onClick={toggleDropdown} />
                {showDropdown && (
                  <div className="absolute  mt-2 w-20 bg-white  rounded-lg shadow-lg z-10">
                    <button className="block w-full text-left px-4 py-2 text-sm font-protest text-gray-800 hover:bg-gray-100 rounded-lg">
                      Report
                    </button>
                  </div>
                )}
              </div>
            </div>
            <img src="/images/profile.jpg" alt="" className="w-40 h-auto object-cover mr-4 mb-4" /> 
            <div className='flex flex-col'> 
              <p className="text-gray-700 mb-2">Try and fail but dont fail to try</p> 
              <div> 
                <span className="ml-2 text-yellow-500">⭐️⭐️⭐️⭐️⭐️</span> 
              </div>
            </div>
          </div>
        </div>
      
    
  );
};

export default PostContainer;
