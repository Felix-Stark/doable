import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { DoableUser, Todo } from "../types"; 

const initialState = {
  themeMode: true, //lightMode = true, darkMode = false
  currentList: '', // chosen list of todos to be displayed,
  showTaskmanager: true, //onClick newTask set true
  showChat: false,
  toggleView: true,
  selectedTask: {}, // for update task
  toggleLoader: false,
  doUser: {} as DoableUser,
  currentTodos: [] as Todo[],
  addedTodo: '',
};

export const apiSlice = createSlice({
  name: "API",
  initialState,
  reducers: {
    colorMode: (state, action: PayloadAction<boolean>) => {
      state.themeMode = action.payload;
    },
    toggleTaskmanager: (state, action: PayloadAction<boolean>) => {
      state.showTaskmanager = action.payload;
    },
    toggleChat: (state, action: PayloadAction<boolean>) => {
      state.showChat = action.payload;
    },
    switchView: (state, action: PayloadAction<boolean>) => {
      state.toggleView = action.payload;
    },
    showLoader: (state, action: PayloadAction<boolean>) => {
      state.toggleLoader = action.payload;
    },
    currentUser: (state, action: PayloadAction<DoableUser>) => {
      state.doUser = action.payload;
    },
    selectedList: (state, action) => {
      state.currentList = action.payload;
    },
    todos: (state, action: PayloadAction<Todo[]>) => {
      state.currentTodos = action.payload;
    },
    addTodo: (state, action: PayloadAction<string>) => {
      state.addedTodo = action.payload;
    }
  },
});

export const { colorMode, showLoader, currentUser, selectedList, todos, toggleTaskmanager, toggleChat, switchView, addTodo } = apiSlice.actions;

export default apiSlice.reducer;
