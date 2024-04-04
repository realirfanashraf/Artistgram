import Navbar from "../../Components/userSide/NavBar";
import SearchBar from "../../Components/userSide/home/SearchBar";
import SuggestionBox from "../../Components/userSide/home/SuggestionBox";
import { useState, useEffect } from 'react';
import { Axios } from '../../axios/userInstance.js';
import PostContainer from "../../Components/userSide/home/PostContainer.jsx";
import { useSelector } from "react-redux";




const Home = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [listFinished, setListFinished] = useState(false)
  const [postPage, setPostPage] = useState(1);
  const [postLoading, setPostLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [postListFinished, setPostListFinished] = useState(false)







  const fetchData = () => {
    setLoading(true);
    Axios.get(`/api/users?page=${page}`)
      .then(response => {
        if (response.data.length === 0) {
          setUsers(prevUsers => [...prevUsers]);
          setLoading(false);
          setListFinished(true);
        } else {
          setUsers(prevUsers => [...prevUsers, ...response.data]);
          setLoading(false);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };


  const fetchPostData = () => {
    setPostLoading(true);
    Axios.get(`/api/posts?postPage=${postPage}`)
      .then(response => {
        if (response.data.length === 0) {
          setPosts(prevPosts => [...prevPosts]);
          setPostLoading(false);
          setPostListFinished(true);
        } else {
          setPosts(prevPosts => [...prevPosts, ...response.data]);
          setPostLoading(false);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setPostLoading(false);
      });
  };


  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    fetchPostData();
  }, [postPage])

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
        <div className=" absolute top-28 right-10 w-60  shadow-xl h-72 rounded-md bg-inherit p-4 overflow-y-auto no-scrollbar" onScroll={handleScroll}>
          <SuggestionBox users={users} loading={loading} listFinished={listFinished} />
        </div>
        <div className="flex flex-col justify-center mt-2" style={{ maxHeight: '30rem' }}>
          <div className="overflow-y-scroll no-scrollbar" onScroll={handleScrollPost}>
            <PostContainer posts={posts} postLoading={postLoading} postListFinished={postListFinished} />
          </div>
        </div>


      </div>

    </>
  );
};

export default Home;
