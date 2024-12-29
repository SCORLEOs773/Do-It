import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  const data = localStorage.getItem("tasks");
  return data ? JSON.parse(data) : [];
};

const saveToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: loadFromLocalStorage(),
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        text: action.payload,
        completed: false,
        important: false,
      };
      state.push(newTask);
      saveToLocalStorage(state);
    },
    deleteTask: (state, action) => {
      const updatedTasks = state.filter((task) => task.id !== action.payload);
      saveToLocalStorage(updatedTasks);
      return updatedTasks;
    },
    editTask: (state, action) => {
      const task = state.find((task) => task.id === action.payload.id);
      if (task) task.text = action.payload.text;
    },
    toggleImportant: (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) task.important = !task.important;
    },
    toggleComplete: (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveToLocalStorage(state);
      }
    },
  },
});

export const {
  addTask,
  deleteTask,
  editTask,
  toggleImportant,
  toggleComplete,
} = tasksSlice.actions;
export default tasksSlice.reducer;
