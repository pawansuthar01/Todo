import { useSelector } from "react-redux";
import TodoCart from "./TodoCart";

function TodoList() {
  const { todoData } = useSelector((state) => state?.TodoStore);
  return (
    <div>
      {todoData.length < 0 ? (
        <p>No Todo Data</p>
      ) : (
        <div className="flex flex-wrap justify-evenly gap-6 my-6 w-full">
          {todoData.map((todo) => {
            return <TodoCart key={todo.id} todo={todo} />;
          })}
        </div>
      )}
    </div>
  );
}

export default TodoList;
