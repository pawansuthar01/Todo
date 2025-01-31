import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoData:
    localStorage.getItem("todoData") == null
      ? []
      : JSON.parse(localStorage.getItem("todoData")),
  password: localStorage.getItem("password") || false,
  fullName: localStorage.getItem("fullName") || "",
  profile: localStorage.getItem("profile") || null,
};

const StoreTodoRedux = createSlice({
  name: "todoStore",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const { files, todoText, selectTime, description } = action.payload;
      state.todoData.push({
        id: state.todoData.length + 1,
        todoText: todoText || null,
        description: description || null,
        finished: false,
        timestamp: selectTime,
        notified: false,
        files: files || null,
      });
      localStorage.setItem("todoData", JSON.stringify(state.todoData));
    },
    editTodo: (state, action) => {
      const { todo, todoText, files, description } = action.payload;
      const index = state.todoData.findIndex((e) => e.id === todo.id);
      if (index !== -1) {
        if (todoText) {
          state.todoData[index].todoText = todoText;
        }
        if (description) {
          state.todoData[index].description = description;
        }

        if (files) {
          state.todoData[index].files = files;
        }
      }
      localStorage.setItem("todoData", JSON.stringify(state.todoData));
    },
    deleteTodo: (state, action) => {
      const { todo } = action.payload;
      state.todoData = state.todoData.filter((d) => d.id !== todo.id);
      localStorage.setItem("todoData", JSON.stringify(state.todoData));
    },
    finishedTodo: (state, action) => {
      const { todo, isFinished, isNotified } = action.payload;
      const index = state.todoData.findIndex((e) => e.id === todo.id);
      if (index !== -1) {
        state.todoData[index].finished = isFinished;
        state.todoData[index].notified = isNotified;
      }
      localStorage.setItem("todoData", JSON.stringify(state.todoData));
    },
    NotifiedTodo: (state, action) => {
      const { todo, isNotified } = action.payload;
      const index = state.todoData.findIndex((e) => e.id === todo.id);
      if (index !== -1) {
        state.todoData[index].notified = isNotified;
      }
      localStorage.setItem("todoData", JSON.stringify(state.todoData));
    },
  },
});
export const { addTodo, editTodo, finishedTodo, deleteTodo } =
  StoreTodoRedux.actions;
export default StoreTodoRedux.reducer;
