import { useState, useEffect } from "react";
import AdminNavbar from "../../Components/adminSide/AdminNavbar";
import BarChart from "../../Components/adminSide/BarChart";
import { Axios } from "../../axios/adminInstance.js";

const Dashboard = () => {
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
      borderColor: 'rgba(0, 0, 0, 1)', // Black border for all bars
      borderWidth: 1 // Adjust border width as needed
    }]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get('/api/usersData');
        const monthlyUserCounts = response.data.monthlyUserCounts;
        setUserData(prevState => ({
          ...prevState,
          datasets: [{
            ...prevState.datasets[0],
            data: monthlyUserCounts,
          }]
        }));
      } catch (error) {
        // Handle error appropriately
      }
    };

    fetchData();
  }, []); // Empty dependency array to run effect only once on component mount

  console.log(userData, "userdata is here")
  return (
    <>
      <AdminNavbar />
      <div className="bg-thirdShade px-8 py-8 mt-8 mx-8 mb-8 rounded-lg h-screen">
        {userData && userData.datasets && <BarChart chartData={userData} />}
      </div>
    </>
  );
};

export default Dashboard;
