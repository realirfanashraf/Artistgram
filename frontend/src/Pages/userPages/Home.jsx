import Navbar from "../../Components/userSide/NavBar";
import SearchBar from "../../Components/userSide/home/SearchBar";
import SuggestionBox from "../../Components/userSide/home/SuggestionBox";
import { useState, useEffect } from 'react';
import { Axios } from '../../axios/userInstance.js';
import PostContainer from "../../Components/userSide/home/PostContainer.jsx";
import { useSelector } from "react-redux";
import { CiSquarePlus } from "react-icons/ci";
import {useNavigate} from 'react-router-dom'
import NewPostModal from '../../modal/userModal/NewPostModal.jsx';
import { useSocket } from '../../customHooks.jsx'

const Home = () => {
  const navigate = useNavigate()
  const socket = useSocket()
  const [hovered, setHovered] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [listFinished, setListFinished] = useState(false)
  const [postPage, setPostPage] = useState(1);
  const [postLoading, setPostLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [postListFinished, setPostListFinished] = useState(false)
  const [showNewPostModal, setShowNewPostModal] = useState(false)
  const [initialLoadDone, setInitialLoadDone] = useState(false); 
  const userData = useSelector(state=>state.userInfo.user)
  console.log(userData,"userData is here")
  

  const fetchData = () => {
    setLoading(true);
    Axios.get(`/api/users?page=${page}`)
      .then(response => {
        if (response.data.length === 0) {
          setListFinished(true);
        } else {
          setUsers(prevUsers => [...prevUsers, ...response.data]);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
        setInitialLoadDone(true); 
      });
  };

  useEffect(() => {
    socket.current.on("myID", (id) => {
        console.log(id, "my socket id");
    });
    socket.current.emit('newUser', userData._id);
}, []);

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleNewPost = () => {
    setShowNewPostModal(true)
    
  };
  const handleNewPostModal = () => {
    setShowNewPostModal(false)
  }

  const fetchPostData = () => {
    setPostLoading(true);
    Axios.get(`/api/posts?postPage=${postPage}`)
      .then(response => {
        console.log(response.data,"posts")
        if (response.data.length === 0) {
          setPostListFinished(true);
        } else {
          setPosts(prevPosts => [...prevPosts, ...response.data]);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        
      })
      .finally(() => {
        setPostLoading(false);
      });
  };

  useEffect(() => {
    if (initialLoadDone) { // Only fetch post data after initial load is done
      fetchPostData();
    }
  }, [postPage, initialLoadDone]);

  const handleScroll = event => {
    console.log("scrolling works")
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    const bottomOfBox = scrollTop + clientHeight >= scrollHeight - 10;

    if (bottomOfBox && !loading && !listFinished) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleScrollPost = event => {
    console.log("scrolling works for posts")
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    const bottomOfBox = scrollTop + clientHeight >= scrollHeight - 10;

    if (bottomOfBox && !postLoading && !postListFinished) {
      setPostPage(prevPage => prevPage + 1);
    }
  };


  return (
    <>
  <Navbar />
  <div className="flex flex-col items-center mt-3 w-full sm:w-auto shadow-2xl">
    {/* <SearchBar /> */}
    <div className="absolute top-28 right-10 w-60 shadow-xl h-72 rounded-md bg-inherit p-4 overflow-y-auto no-scrollbar" onScroll={handleScroll}>
      <SuggestionBox users={users} loading={loading} listFinished={listFinished} />
    </div>
    <div className="flex flex-col justify-center mt-2" style={{ maxHeight: '30rem' }}>
      <div className="overflow-y-scroll no-scrollbar" onScroll={handleScrollPost}>
        <PostContainer posts={posts} postLoading={postLoading} postListFinished={postListFinished} />
      </div>
    </div>
    <button 
  className="flex items-center bg-primary hover:bg-secondary text-white font-bold py-2 px-2 rounded  fixed bottom-10 right-80 "
  onClick={handleNewPost}
>
  <CiSquarePlus size={26}  />
</button>
  </div>
  {showNewPostModal && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className=" rounded-lg shadow-md">
          <NewPostModal isOpen={showNewPostModal} onClose={handleNewPostModal}  />
        </div>
      </div>}
</>

  );
};

export default Home;
