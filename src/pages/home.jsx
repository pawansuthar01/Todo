import { useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import TodoForm from "../components/TodoFrom";
import SearchBar from "../components/serachBar";
import Layout from "../layout/Layout";
import TodoList from "../components/TodoList";
import { useEffect, useState } from "react";

export const TodoHome = () => {
  return (
    <Layout>
      <div className="flex flex-wrap justify-evenly gap-6 my-6 w-full">
        <TodoList />
      </div>
    </Layout>
  );
};
