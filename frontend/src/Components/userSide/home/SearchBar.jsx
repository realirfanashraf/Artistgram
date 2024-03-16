import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
  return (
    <div className="flex items-center rounded-md bg-gray-100 shadow-sm sm:px-2 sm:py-1" style={{ width: '50%' }}>
      <input
        type="text"
        placeholder="Search..."
        className="flex-grow outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md px-2 py-1"
      />
      <button type="button"  className="ml-1 p-1 rounded-md hover:bg-gray-200 focus:outline-none sm:h-8 sm:w-8" style={{ height: '24px' }}>
        <IoSearch size={16} className="text-gray-500" />
      </button>
    </div>
  );
};

export default SearchBar;
