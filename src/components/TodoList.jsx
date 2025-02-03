import { useDispatch, useSelector } from "react-redux";
import TodoCart from "./TodoCart";
import {
  deleteTodo,
  editTodo,
  finishedTodo,
  NotifiedTodo,
} from "../TodoRedux/Slice/TodoList";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaArrowsAlt,
  FaExchangeAlt,
  FaPlus,
  FaSearch,
} from "react-icons/fa"; // Importing FontAwesome icons
import DatePicker from "react-datepicker";
import TodoForm from "./TodoFrom";
import SearchBar from "./serachBar";

function TodoList() {
  const { todoData } = useSelector((state) => state?.TodoStore);
  const [ShowFrom, setShowFrom] = useState(false);
  const [page, setPage] = useState(1);
  const [filteredTodos, setFilteredTodos] = useState(todoData);
  const [type, setType] = useState("all");

  const [todosPerPage, setTodosPerPage] = useState(
    window.innerWidth <= 700 ? 10 : 25
  );
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const startIndex = (page - 1) * todosPerPage;
  const endIndex = startIndex + todosPerPage;
  const currentTodos = filteredTodos.slice(startIndex, endIndex);
  useEffect(() => {
    const updatedTime = new Date(toDate);
    updatedTime.setMinutes(updatedTime.getMinutes() + 10);
    setToDate(updatedTime);
  }, []);
  useEffect(() => {
    setFilteredTodos(todoData);
  }, [todoData]);

  const handleToDateChange = (data) => {
    setToDate(data);
  };
  const handleFilter = (type) => {
    setType(type);
    if (type == "finished") {
      setFilteredTodos(todoData.filter((todo) => todo.finished === true));
    } else if (type == "notFinished") {
      setFilteredTodos(todoData.filter((todo) => todo.finished === false));
    } else if (type == "Low") {
      setFilteredTodos(todoData.filter((todo) => todo.priority === "Low"));
    } else if (type == "medium") {
      setFilteredTodos(todoData.filter((todo) => todo.priority === "medium"));
    } else if (type == "high") {
      setFilteredTodos(todoData.filter((todo) => todo.priority === "high"));
    } else {
      setFilteredTodos(todoData);
    }
  };

  const handleSearch = () => {
    if (!fromDate || !toDate) {
      return;
    }
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);

    const filtered = todoData.filter((todo) => {
      const todoDate = new Date(todo.timestamp);
      return todoDate >= startDate && todoDate <= endDate;
    });

    setFilteredTodos(filtered);
  };
  const dispatch = useDispatch();

  function OnDelete(todo) {
    if (!todo) return;
    const isConfirm = window.confirm(`you delete this ${todo.todoText} Task`);
    if (!isConfirm) return;
    dispatch(deleteTodo({ todo }));
  }
  function onUpdate(id, data) {
    if (!id || !data) return;

    dispatch(editTodo({ id, data }));
  }
  function finished(id, isFinished, isNotified) {
    dispatch(finishedTodo({ id, isFinished, isNotified }));
  }
  function Notified(id, isNotified) {
    dispatch(NotifiedTodo({ id, isNotified }));
  }

  const handleNext = () => {
    if (endIndex < todoData.length) {
      setPage(page + 1);
    }
  };

  const handlePrevious = () => {
    if (startIndex > 0) {
      setPage(page - 1);
    }
  };

  const handelShow = () => {
    setShowFrom(true);
  };

  const handleHide = () => {
    setShowFrom(false);
  };

  const handleSearchByTitle = (searchQuery) => {
    const filtered = todoData.filter((todo) =>
      todo.todoText.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTodos(filtered);
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-center">
        <SearchBar onsearch={handleSearchByTitle} />
      </div>

      <div className=" min-[950px]:hidden flex  justify-between mr-2 ml-2 mb-2 mt-5">
        <select
          value={type}
          onChange={(e) => handleFilter(e.target.value)}
          className=" cursor-pointer border rounded px-5"
        >
          <option value="all">All</option>
          <option value="finished">Finished</option>
          <option value="notFinished">Not Finished</option>
          <option value="Low">Low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        <div>
          <button
            onClick={handelShow}
            className="flex items-center gap-2 p-2 cursor-pointer bg-gradient-to-b from-teal-500 to-teal-600 text-white rounded-lg  shadow-lg"
          >
            <FaPlus />
            Add new Todo
          </button>
        </div>
      </div>
      <hr className="h-1 w-full mt-5 bg-green-400 text-green-400 shadow-[0_0_1px_0_black] mb-2 " />
      <div className="flex flex-wrap  gap-2 justify-evenly sm:pl-10 sm:pr-10 max-[950px]:justify-center items-center ">
        <select
          value={type}
          onChange={(e) => handleFilter(e.target.value)}
          className=" cursor-pointer border rounded px-5 min-[950px]:flex  hidden"
        >
          <option value="all" className="  cursor-pointer">
            All
          </option>
          <option value="finished" className="cursor-pointer">
            Finished
          </option>
          <option value="notFinished" className="cursor-pointer">
            Not Finished
          </option>
          <option value="Low" className="cursor-pointer">
            Low
          </option>
          <option value="medium" className="cursor-pointer">
            medium
          </option>
          <option value="high" className="cursor-pointer">
            high
          </option>
        </select>
        <div className="m-1 flex items-center justify-evenly gap-1  ">
          <div className="flex items-center justify-evenly md:justify-center space-x-1">
            <div className="w-full sm:w-[180px] max-[400px]:w-[170px]">
              <DatePicker
                type="date"
                id="toDate"
                selected={toDate}
                onChange={(date) => handleToDateChange(date)}
                showTimeSelect
                dateFormat="Pp"
                popperPlacement="bottom-start"
                className="p-1 w-full border text-sm text-center rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <p>
            <FaExchangeAlt className="text-sm" />
          </p>
          <div className="flex items-center space-x-2">
            <DatePicker
              type="date"
              id="toDate"
              selected={toDate}
              onChange={(date) => handleToDateChange(date)}
              dateFormat="Pp"
              popperPlacement="bottom-start"
              className="p-1 w-full sm:w-[180px] max-[400px]:w-[170px] border text-sm text-center rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleSearch}
              className="hidden sm:flex items-center gap-2 font-semibold cursor-pointer rounded bg-gradient-to-b from-teal-500 to-teal-600 text-white px-6 py-2 transition-all duration-200 shadow-md"
              aria-label="Search by time"
            >
              <FaSearch size={16} className="text-white" />
              Search by Time
            </button>
          </div>
        </div>
        <div>
          <button
            onClick={handelShow}
            className="min-[950px]:flex hidden items-center gap-2 p-2 cursor-pointer bg-gradient-to-b from-teal-500 to-teal-600 text-white rounded-lg  transition duration-300 shadow-lg"
          >
            <FaPlus /> {/* Plus icon */}
            Add new Todo
          </button>
        </div>
        <div className=" sm:hidden w-full flex justify-center">
          <button
            onClick={handleSearch}
            className="flex  items-center gap-2 font-semibold cursor-pointer rounded  text-white px-6 py-2 transition-all duration-200 bg-gradient-to-b from-teal-500 to-teal-600 shadow-md"
          >
            <FaSearch size={16} className="text-white" />
            Search by Time
          </button>
        </div>
      </div>
      <hr className="mt-2" />
      {currentTodos.length === 0 ? (
        <p className="text-center text-lg font-semibold">No Todo Data</p>
      ) : (
        <div>
          <div className="flex flex-wrap justify-center items-start gap-10 my-6 w-full">
            {currentTodos.map((todo, ind) => (
              <TodoCart
                key={ind}
                todo={todo}
                onDelete={OnDelete}
                onUpdate={onUpdate}
                onToggle={finished}
                Notified={Notified}
              />
            ))}
          </div>
          {(page > 1 || endIndex < todoData.length) && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={handlePrevious}
                disabled={page === 1}
                className="p-3 bg-gradient-to-b from-teal-500 to-teal-600 cursor-pointer text-white rounded-lg disabled:bg-gray-400 transition duration-200"
              >
                <FaArrowLeft />
              </button>
              <span className="text-lg font-semibold">{`Page ${page}`}</span>
              <button
                onClick={handleNext}
                disabled={endIndex >= todoData.length}
                className="p-3 bg-gradient-to-b from-teal-500 to-teal-600 cursor-pointer text-white rounded-lg disabled:bg-gray-400  transition duration-200"
              >
                <FaArrowRight />
              </button>
            </div>
          )}
        </div>
      )}
      {<TodoForm show={ShowFrom} onclose={handleHide} />}
    </div>
  );
}

export default TodoList;
