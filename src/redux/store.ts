import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./slices/signupSlice";
import cameraReducer from "./slices/cameraSlice";
import appReducer from "./slices/appSlice";

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    camera: cameraReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
