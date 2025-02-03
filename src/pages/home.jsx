import Layout from "../layout/Layout";
import TodoList from "../components/TodoList";

export const TodoHome = () => {
  return (
    <Layout>
      <div className="flex flex-wrap justify-evenly gap-6 my-6 w-full">
        <TodoList />
      </div>
    </Layout>
  );
};
