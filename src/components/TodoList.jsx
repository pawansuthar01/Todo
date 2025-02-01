import { useDispatch, useSelector } from "react-redux";
import TodoCart from "./TodoCart";
import { deleteTodo } from "../TodoRedux/Slice/TodoList";

function TodoList() {
  const { todoData } = useSelector((state) => state?.TodoStore);
  const dispatch = useDispatch();
  function OnDelete(todo) {
    if (!todo) return;
    const isConfirm = window.confirm(`you delete this${todo.todoText} Task`);
    if (!isConfirm) return;
    dispatch(deleteTodo({ todo }));
  }
  return (
    <div>
      {todoData.length < 0 ? (
        <p>No Todo Data</p>
      ) : (
        <div className="flex flex-wrap justify-evenly gap-6 my-6 w-full">
          {todoData.map((todo) => {
            return <TodoCart key={todo.id} todo={todo} onDelete={OnDelete} />;
          })}
        </div>
      )}
    </div>
  );
}

export default TodoList;
