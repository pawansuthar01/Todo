import { createSlice } from "@reduxjs/toolkit";

// Initial state setup
const initialState = {
  todoData:
    localStorage.getItem("todoData") == null
      ? []
      : JSON.parse(localStorage.getItem("todoData")),
  password: localStorage.getItem("password") || false,
  fullName: localStorage.getItem("fullName") || "",
  profile: localStorage.getItem("profile") || null,
};

// Redux slice
const StoreTodoRedux = createSlice({
  name: "todoStore",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const { todoText, selectTime, priority, description } = action.payload;

      state.todoData.push({
        id: state.todoData.length + 1,
        todoText: todoText || null,
        description: description || null,
        finished: false,
        priority: priority || null,
        timestamp: selectTime,
        notified: false,
      });

      localStorage.setItem("todoData", JSON.stringify(state.todoData));
    },

    editTodo: (state, action) => {
      const { id, data } = action.payload;

      const index = state.todoData.findIndex((e) => e.id === id);

      if (index !== -1) {
        if (data.todoText) {
          state.todoData[index].todoText = data.todoText;
        }
        if (data.description) {
          state.todoData[index].description = data.description;
        }
      }

      localStorage.setItem("todoData", JSON.stringify(state.todoData));
    },

    deleteTodo: (state, action) => {
      const { todo } = action.payload;
      const index = state.todoData.findIndex((t) => t.id === todo.id);

      if (index !== -1) {
        // Remove the todo
        state.todoData = state.todoData.filter((d) => d.id !== todo.id);
      }

      localStorage.setItem("todoData", JSON.stringify(state.todoData));
    },

    finishedTodo: (state, action) => {
      const { id, isFinished, isNotified } = action.payload;
      const index = state.todoData.findIndex((e) => e.id === id);

      if (index !== -1) {
        state.todoData[index].finished = isFinished;
        state.todoData[index].notified = isNotified;
      }

      localStorage.setItem("todoData", JSON.stringify(state.todoData));
    },

    NotifiedTodo: (state, action) => {
      const { id, isNotified } = action.payload;
      const index = state.todoData.findIndex((e) => e.id === id);

      if (index !== -1) {
        state.todoData[index].notified = isNotified;
      }

      localStorage.setItem("todoData", JSON.stringify(state.todoData));
    },
  },
});

// Export actions and reducer
export const { addTodo, editTodo, finishedTodo, deleteTodo, NotifiedTodo } =
  StoreTodoRedux.actions;
export default StoreTodoRedux.reducer;
