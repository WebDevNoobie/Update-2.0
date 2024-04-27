import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    user: null,
    snapURL: "",
    confirmation: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setSnapURL: (state, action) => {
      state.snapURL = action.payload;
    },
    setConfirmation: (state, action) => {
      state.confirmation = action.payload;
    },
  },
});

export const { login, logout, setSnapURL, setConfirmation } = appSlice.actions;

export const selectUser = (state: any) => state.app.user;
export const selectSnapURL = (state: any) => state.app.snapURL;
export const selectConfirmation = (state: any) => state.app.confirmation;

export default appSlice.reducer;
