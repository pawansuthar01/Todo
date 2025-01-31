function SearchBar() {
  return (
    <div className=" justify-between flex  sm:w-[50%] max-sm:w-[80%]  p-4 border-2 rounded-2xl shadow-[0_0_2px_0px_black]">
      <span>/</span>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Enter to search... "
        className="border-0 outline-0 text-ellipsis  font-medium  text-lg"
        maxLength={25}
      />
      <div>
        <button>*</button>
      </div>
    </div>
  );
}
export default SearchBar;
