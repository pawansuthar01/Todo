import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../TodoRedux/Slice/TodoList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { X } from "lucide-react";

export const TodoForm = ({ show, onclose }) => {
  const [todoText, setTodoText] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [selectTime, setSelectTime] = useState(new Date());
  const dispatch = useDispatch();

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (todoText.length === 0) return;
    const date = new Date();

    if (selectTime <= date) {
      const updatedTime = new Date(selectTime);
      updatedTime.setMinutes(updatedTime.getMinutes() + 10);

      dispatch(
        addTodo({
          todoText,
          selectTime: updatedTime.toISOString(),
          description,
          priority,
        })
      );
    } else {
      dispatch(
        addTodo({
          todoText,
          selectTime: selectTime.toISOString(),
          description,
          priority,
        })
      );
    }
    onclose();
    setTodoText("");
    setDescription("");
    setSelectTime(new Date());
  };

  return (
    <div>
      <div
        className={`fixed bottom-0 w-full bg-[#edf6f9] p-10 rounded-t-2xl transition-all duration-800 transform ${
          show
            ? "translate-y-0 opacity-100 max-h-[85%]"
            : "translate-y-10 opacity-0 max-h-0"
        }`}
      >
        <p>
          <X
            onClick={() => onclose()}
            className=" cursor-pointer hover:text-red-500"
          />
        </p>
        <form className="m-4 w-full flex flex-col" onSubmit={handleAddTodo}>
          <div className="grid gap-4 grid-cols-2">
            <div className="flex flex-col">
              <label
                htmlFor="todoTitle"
                className="block text-lg font-semibold mb-2"
              >
                Task Title:
              </label>
              <input
                id="todoTitle"
                type="text"
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                placeholder="Enter Todo text"
                className="border-2 border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="priority"
                className="block text-lg font-semibold mb-2"
              >
                Priority:
              </label>
              <select
                name="priority"
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="border-2 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 grid-cols-1">
            <div className="flex flex-col">
              <label
                htmlFor="todoDescription"
                className="block text-lg font-semibold mb-2"
              >
                Task Description:
              </label>
              <textarea
                id="todoDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Todo description"
                className="border-2 border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 h-52"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="selectTime"
              className="block text-lg font-semibold mb-2"
            >
              Select Time:
            </label>
            <DatePicker
              selected={selectTime}
              onChange={(date) => setSelectTime(date)}
              showTimeSelect
              dateFormat="Pp"
              popperPlacement="bottom-start"
              className="border-2 border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white p-2 mt-4">
            Add Todo
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
