import { useState } from 'react';
import { SlOptionsVertical } from 'react-icons/sl';
import ReportModal from './ReportModal';
import Rating from './Rating';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { FaStar } from "react-icons/fa";


const PostContainer = ({ posts, postLoading, postListFinished }) => {
  const [showDropdowns, setShowDropdowns] = useState(Array(posts.length).fill(false));
  const [showReportModal, setShowReportModal] = useState(false)
  const [reportedPostId, setReportedPostId] = useState('')
  const [postedById, setPostedById] = useState('')

  const toggleDropdown = (index) => {
    const newDropdowns = [...showDropdowns];
    newDropdowns[index] = !newDropdowns[index];
    setShowDropdowns(newDropdowns);
  };
  const handleClick = (postId, userId) => {
    setShowReportModal(true)
    setReportedPostId(postId)
    setPostedById(userId)
  }

  const handleReportModal = (e) => {
    setShowReportModal(false)
  }

  return (
    <>
      {posts.map((post, index) => (
        <Card key={post._id} className="w-full max-w-[36rem] shadow-lg mb-6">
          <div className="flex items-center justify-between py-3 px-3">
            <div className="flex items-center">
              <img
                src={post.postedBy.ProfilePicture}
                alt=""
                className="rounded-full w-10 h-10 sm:w-12 sm:h-12 object-cover mr-4"
              />
              <p className="font-protest text-lg text-gray-800">{post.postedBy.name}</p>
            </div>
            <div className="flex items-center">
              <SlOptionsVertical
                className="w-6 h-6 text-gray-600 cursor-pointer"
                onClick={() => toggleDropdown(index)}
              />
              {showDropdowns[index] && (
                <div className="absolute right-0 mt-10 w-20 bg-white rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => handleClick(post._id, post.postedBy._id)}
                    className="block w-full text-left px-4 py-2 text-sm font-protest text-gray-800 hover:bg-gray-100 rounded-lg"
                  >
                    Report
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className='px-3 py-3'>
            <CardHeader floated={false} color="blue-gray" >
              <img src={post.image} />

            </CardHeader>
          </div>
          <CardBody>
            <div className="mb-3 ">
              <Rating postId={post._id} />
            </div>
            <Typography color="gray">{post.description}</Typography>
          </CardBody>
        </Card>
      ))}
      {postLoading ? (
    <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="wheel-and-hamster">
        <div className="wheel"></div>
        <div className="hamster">
            <div className="hamster__body">
                <div className="hamster__head">
                    <div className="hamster__ear"></div>
                    <div className="hamster__eye"></div>
                    <div className="hamster__nose"></div>
                </div>
                <div className="hamster__limb hamster__limb--fr"></div>
                <div className="hamster__limb hamster__limb--fl"></div>
                <div className="hamster__limb hamster__limb--br"></div>
                <div className="hamster__limb hamster__limb--bl"></div>
                <div className="hamster__tail"></div>
            </div>
        </div>
        <div className="spoke"></div>
    </div>
) : null}

      {postListFinished && <p className="finished-message">List Completed</p>}
      {showReportModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className=" rounded-lg shadow-md">
            <ReportModal isOpen={showReportModal} onClose={handleReportModal} postId={reportedPostId} userId={postedById} />
          </div>
        </div>
      )}
    </>

  );
};

export default PostContainer;
