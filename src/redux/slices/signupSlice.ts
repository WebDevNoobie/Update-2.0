import { createSlice } from "@reduxjs/toolkit";

export const signUpSlice = createSlice({
  name: "signUp",
  initialState: {
    fullName: null,
    dob: null,
    mobile: null,
    userName: null,
    password: null,
    uid: null,
  },
  reducers: {
    setName: (state, action) => {
      state.fullName = action.payload;
    },
    setDob: (state, action) => {
      state.dob = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setMobile: (state, action) => {
      state.mobile = action.payload;
    },
    setUid: (state, action) => {
      state.uid = action.payload;
    },
  },
});

export const { setName, setDob, setUserName, setPassword, setMobile, setUid } =
  signUpSlice.actions;

export const selectName = (state: any) => state.signUp.fullName;
export const selectDob = (state: any) => state.signUp.dob;
export const selectUserName = (state: any) => state.signUp.userName;
export const selectPassword = (state: any) => state.signUp.password;
export const selectMobile = (state: any) => state.signUp.mobile;
export const selectUid = (state: any) => state.signUp.uid;

export default signUpSlice.reducer;
