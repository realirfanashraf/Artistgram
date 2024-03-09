import Navbar from "../../Components/userSide/NavBar";
import SearchBar from "../../Components/userSide/home/SearchBar";
import SuggestionBox from "../../Components/userSide/home/SuggestionBox";
import { useState, useEffect } from 'react';
import { Axios } from '../../axios/userInstance.js';

const Home = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [listFinished, setListFinished] = useState(false)

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
  

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleScroll = event => {
    console.log("scrolling works")
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    const bottomOfBox = scrollTop + clientHeight >= scrollHeight - 10;
  
    if (bottomOfBox && !loading && !listFinished) {
      setPage(prevPage => prevPage + 1);
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center mt-3">
        <SearchBar />
        <div className=" absolute top-40 right-40 w-52 border  h-64 border-gray-300 rounded-md bg-white p-4 overflow-y-auto no-scrollbar" onScroll={handleScroll}>
          <SuggestionBox users={users} loading={loading}  listFinished={listFinished} />
        </div>
      </div>
    </>
  );
};

export default Home;
