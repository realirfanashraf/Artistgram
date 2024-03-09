import Navbar from "../../Components/userSide/NavBar";
import SearchBar from "../../Components/userSide/home/SearchBar";
import SuggestionBox from "../../Components/userSide/home/SuggestionBox";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center mt-3">
        <SearchBar />
        <div className="">
        </div>
        <div className="w-48 border h-64 border-gray-300 rounded-md bg-white p-4">
          <SuggestionBox />
        </div>
      </div>
    </>
  );
};

export default Home;
