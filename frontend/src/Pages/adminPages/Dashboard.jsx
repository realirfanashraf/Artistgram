import { useState, useEffect } from "react";
import AdminNavbar from "../../Components/adminSide/AdminNavbar";
import BarChart from "../../Components/adminSide/BarChart";
import { Axios } from "../../axios/adminInstance.js";
import AdminSideBar from "../../Components/adminSide/AdminSideBar.jsx";

const Dashboard = () => {
  const [usersCount, setUsersCount] = useState('')
  const [postsCount, setPostsCount] = useState('')
  const [userData, setUserData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      label: "Users Gained",
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)', // Jan
        'rgba(54, 162, 235, 0.5)', // Feb
        'rgba(255, 206, 86, 0.5)', // Mar
        'rgba(75, 192, 192, 0.5)', // Apr
        'rgba(153, 102, 255, 0.5)', // May
        'rgba(255, 159, 64, 0.5)', // Jun
        'rgba(255, 99, 132, 0.5)', // Jul
        'rgba(54, 162, 235, 0.5)', // Aug
        'rgba(255, 206, 86, 0.5)', // Sep
        'rgba(75, 192, 192, 0.5)', // Oct
        'rgba(153, 102, 255, 0.5)', // Nov
        'rgba(255, 159, 64, 0.5)'  // Dec
      ],
      borderColor: 'rgba(0, 0, 0, 1)', 
      borderWidth: 1 
    }]
  });

  const [postData, setPostData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      label: "Posts Created",
      data: [],
      backgroundColor: [
        'rgba(54, 162, 235, 0.5)',   // Jan (blue)
        'rgba(255, 159, 64, 0.5)',   // Feb (orange)
        'rgba(255, 99, 132, 0.5)',  // Mar (red)
        'rgba(255, 205, 86, 0.5)',   // Apr (yellow)
        'rgba(153, 102, 255, 0.5)',  // May (purple)
        'rgba(75, 192, 192, 0.5)',   // Jun (teal)
        'rgba(255, 99, 132, 0.5)',   // Jul (red)
        'rgba(255, 205, 86, 0.5)',   // Aug (yellow)
        'rgba(54, 162, 235, 0.5)',   // Sep (blue)
        'rgba(153, 102, 255, 0.5)',  // Oct (purple)
        'rgba(255, 159, 64, 0.5)',   // Nov (orange)
        'rgba(0, 128, 0, 0.5)'       // Dec (green)
      ],
      borderColor: 'rgba(0, 0, 0, 1)', 
      borderWidth: 1 
    }]
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await Axios.get('/api/usersData');
        const monthlyUserCounts = response.data.monthlyUserCounts;
        const usersCount = response.data.totalCount
        setUsersCount(usersCount)
        setUserData(prevState => ({
          ...prevState,
          datasets: [{
            ...prevState.datasets[0],
            data: monthlyUserCounts,
          }]
        }));
      } catch (error) {
        console.log(error)
      }
    };

    const fetchPostData = async () => {
      try {
        const response = await Axios.get('/api/postsData');
        const monthlyPostCounts = response.data.monthlyPostCounts;
        const totalCount = response.data.totalCount
        setPostsCount(totalCount)
        setPostData(prevState => ({
          ...prevState,
          datasets: [{
            ...prevState.datasets[0],
            data: monthlyPostCounts,
          }]
        }));
      } catch (error) {
        console.log(error)
      }
    };

    fetchUserData();
    fetchPostData();
  }, []); 

  return (
<>
  <AdminNavbar />

  <div className="flex flex-row">
    <div className="hidden md:block w-1/5">
      <AdminSideBar/>
    </div>
    <div className="w-full lg:w-4/5 px-8 py-8 mt-8 mx-8 mb-8 rounded-lg">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div className="w-full lg:w-1/2 px-4 mb-4 lg:mb-0">
          <div className="bg-thirdShade rounded-lg px-4 py-4">
            <div className="flex justify-center mb-3 font-protest"><p>Users Count</p></div>
            {userData && userData.datasets && <BarChart chartData={userData} />}
            <div className="flex justify-center mt-3">
              <p className="font-protest">Total Users : {usersCount}</p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 px-4">
          <div className="bg-thirdShade rounded-lg px-4 py-4">
            <div className="flex justify-center mb-3 font-protest"><p>Posts Count</p></div>
            {postData && postData.datasets && <BarChart chartData={postData} />}
            <div className="flex justify-center mt-3">
              <p className="font-protest">Total Posts : {postsCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

  );
};

export default Dashboard;
