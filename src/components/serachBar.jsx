import { FaSearch } from "react-icons/fa";

function SearchBar() {
  return (
    <div className="flex items-center justify-between sm:w-[50%] max-sm:w-[80%] p-4 border-2 rounded-2xl shadow-[0_0_2px_0_black]  dark:shadow-[0_0_2px_0_white] bg-white">
      <span>
        <FaSearch className="text-gray-500 text-lg" />
      </span>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Enter to search..."
        className="border-0 outline-none text-ellipsis font-medium text-lg w-full px-2"
        maxLength={25}
      />
      <div>
        <button className="bg-blue-500  cursor-pointer text-white p-2 rounded-md hover:bg-blue-600 transition duration-200">
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
