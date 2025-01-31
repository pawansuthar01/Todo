import { useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import TodoForm from "../components/TodoFrom";
import SearchBar from "../components/serachBar";
import Layout from "../layout/Layout";
import TodoList from "../components/TodoList";

export const TodoHome = () => {
  return (
    <Layout>
      <div className="w-full    flex justify-center">
        <SearchBar />
      </div>
      <hr className="h-1 w-full mt-5 bg-green-400 text-green-400 shadow-[0_0_1px_0_black] " />
      <div className="flex flex-wrap justify-evenly gap-6 my-6 w-full">
        <TodoList />
      </div>
      <div className="">
        <TodoForm />
      </div>
    </Layout>
  );
};
