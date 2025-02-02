import { useDispatch, useSelector } from "react-redux";
import TodoCart from "./TodoCart";
import {
  deleteTodo,
  editTodo,
  finishedTodo,
} from "../TodoRedux/Slice/TodoList";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Importing FontAwesome icons

function TodoList() {
  const { todoData } = useSelector((state) => state?.TodoStore);
  const [page, setPage] = useState(1);

  const [todosPerPage, setTodosPerPage] = useState(10);

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

  const startIndex = (page - 1) * todosPerPage;
  const endIndex = startIndex + todosPerPage;
  const currentTodos = todoData.slice(startIndex, endIndex);

  const handleNext = () => {
    if (endIndex < todoData.length) {
      setPage(page + 1);
    }
  };

  // Handle previous page
  const handlePrevious = () => {
    if (startIndex > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      {todoData.length === 0 ? (
        <p className="text-center text-lg font-semibold">No Todo Data</p>
      ) : (
        <div>
          <div className="flex flex-wrap justify-center items-start gap-6 my-6 w-full">
            {currentTodos.map((todo) => (
              <TodoCart
                key={todo.id}
                todo={todo}
                onDelete={OnDelete}
                onUpdate={onUpdate}
                onToggle={finished}
              />
            ))}
          </div>
          {(page > 1 || endIndex < todoData.length) && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={handlePrevious}
                disabled={page === 1}
                className="p-3 bg-blue-500 cursor-pointer text-white rounded-lg disabled:bg-gray-400 hover:bg-blue-600 transition duration-200"
              >
                <FaArrowLeft />
              </button>
              <span className="text-lg font-semibold">{`Page ${page}`}</span>
              <button
                onClick={handleNext}
                disabled={endIndex >= todoData.length}
                className="p-3 bg-blue-500 cursor-pointer text-white rounded-lg disabled:bg-gray-400 hover:bg-blue-600 transition duration-200"
              >
                <FaArrowRight />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TodoList;
