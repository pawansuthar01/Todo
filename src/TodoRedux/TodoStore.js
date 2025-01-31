import { configureStore } from "@reduxjs/toolkit";
import StoreTodoRedux from "./Slice/TodoList";

const Store = configureStore({
  reducer: {
    TodoStore: StoreTodoRedux,
  },
  devTools: true,
});
export default Store;
