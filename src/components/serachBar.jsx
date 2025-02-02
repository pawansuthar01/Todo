import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ onsearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  function sendSearchQueys() {
    onsearch(searchQuery);
  }
  return (
    <div className="flex items-center justify-between sm:w-[50%] max-sm:w-[80%] p-4 border-2 rounded-2xl shadow-[0_0_2px_0_black]  dark:shadow-[0_0_2px_0_white] bg-white">
      <span>
        <FaSearch className="text-gray-500 text-lg" />
      </span>
      <input
        type="text"
        name="search"
        value={searchQuery}
        onChange={handleSearchChange}
        id="search"
        placeholder="Enter to search..."
        className="border-0 outline-none text-ellipsis font-medium text-lg w-full px-2"
        maxLength={50}
      />
      <div>
        <button
          onClick={() => sendSearchQueys()}
          className="bg-gradient-to-b from-teal-500 to-teal-600 cursor-pointer text-white p-2 rounded-md  transition duration-200"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
