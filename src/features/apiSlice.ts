import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { DoableUser } from "../types"; 

const initialState = {
  themeMode: true, //lightMode = true, darkMode = false
  currentList: {}, // chosen list of todos to be displayed, get w
  showTaskForm: false, //onClick newTask set true
  selectedTask: {}, // for update task
  toggleLoader: false,
  doUser: {} as DoableUser,
};

export const apiSlice = createSlice({
  name: "API",
  initialState,
  reducers: {
    colorMode: (state, action: PayloadAction<boolean>) => {
      state.themeMode = action.payload;
    },
    showLoader: (state, action: PayloadAction<boolean>) => {
      state.toggleLoader = action.payload;
    },
    currentUser: (state, action: PayloadAction<DoableUser>) => {
      state.doUser = action.payload;
    },
  },
});

export const { colorMode, showLoader, currentUser } = apiSlice.actions;

export default apiSlice.reducer;
