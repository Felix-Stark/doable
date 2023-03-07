import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

const initialState = {
  themeMode: true, //lightMode = true, darkMode = false
  currentTask: {}, // onClick saveTask -> setCurrent task until task is written to database
  showTaskForm: false, //onClick newTask set true
  selectedTask: {}, // for update task
  toggleLoader: true,
  user: ({} as User) || undefined,
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
    currentUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { colorMode, showLoader, currentUser } = apiSlice.actions;

export default apiSlice.reducer;
