import React, { useState } from 'react';
import { SlOptionsVertical } from 'react-icons/sl';

const PostContainer = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="w-full max-w-lg"> {/* Set maximum width for post */}
        <div className="bg-thirdShade rounded-lg shadow-md p-6 flex items-start"> {/* Post container with padding */}
          <img src="/images/profile.jpg" alt="" className="rounded-full w-10 h-10 sm:w-12 sm:h-12 object-cover mr-4" /> {/* Author profile image */}
          <div className="flex-grow "> {/* Right-side content */}
            <div className="flex items-center mb-4"> {/* Author name and dropdown */}
              <p className="font-semibold text-lg text-gray-800">Irfan Ashraf</p> {/* Author name */}
              <div className="ml-auto"> {/* Dropdown menu */}
                <SlOptionsVertical className="w-6 h-6 text-gray-600 cursor-pointer" onClick={toggleDropdown} />
                {showDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                      Report
                    </button>
                  </div>
                )}
              </div>
            </div>
            <img src="/images/profile.jpg" alt="" className="w-40 h-auto object-cover mr-4 mb-4" /> {/* Post image */}
            <div> {/* Description and star rating */}
              <p className="text-gray-700 mb-2">Description of the post goes here.</p> {/* Post description */}
              <div className="flex items-center"> {/* Star rating */}
                <span className="text-gray-600">Star Rating:</span>
                <span className="ml-2 text-yellow-500">⭐️⭐️⭐️⭐️⭐️</span> {/* Replace with actual star rating component */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostContainer;
