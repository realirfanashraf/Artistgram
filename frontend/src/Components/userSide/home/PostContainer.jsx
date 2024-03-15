import React, { useState } from 'react';
import { SlOptionsVertical } from 'react-icons/sl';

const PostContainer = ({ posts, postLoading, postListFinished }) => {
  const [showDropdowns, setShowDropdowns] = useState(Array(posts.length).fill(false));

  const toggleDropdown = (index) => {
    const newDropdowns = [...showDropdowns];
    newDropdowns[index] = !newDropdowns[index];
    setShowDropdowns(newDropdowns);
  };

  return (
    <>
      {posts.map((post, index) => (
        <div key={index}>
          <div className="bg-thirdShade rounded-lg shadow-md p-6 mt-6 relative">
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <img src={post.postedBy.ProfilePicture} alt="" className="rounded-full w-10 h-10 sm:w-12 sm:h-12 object-cover mr-4" />
                <p className="font-protest text-lg text-gray-800">{post.postedBy.name}</p>
              </div>
              <div className="flex items-center">
                <SlOptionsVertical  className="w-6 h-6 text-gray-600 cursor-pointer" onClick={() => toggleDropdown(index)} />
                {showDropdowns[index] && (
                  <div className="absolute right-0 mt-10 w-20 bg-white rounded-lg shadow-lg z-10">
                    <button  className="block w-full text-left px-4 py-2 text-sm font-protest text-gray-800 hover:bg-gray-100 rounded-lg">
                      Report
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className='flex flex-col sm:flex-row mt-5'>
              <img src={post.image} alt="" className="w-40 h-auto object-cover mr-4 mb-4" />
              <div className="flex flex-col justify-between">
                <div className="overflow-y-scroll no-scrollbar w-40 h-24 sm:h-48">
                  {post.description}
                </div>
                <span className="ml-2 text-yellow-500 self-start">⭐️⭐️⭐️⭐️⭐️</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {postLoading && <p className="loading-message">Loading...</p>}
      {postListFinished && <p className="finished-message">List Completed</p>}
    </>
  );
};

export default PostContainer;
