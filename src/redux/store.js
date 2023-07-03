import { createWrapper } from "next-redux-wrapper";

const { configureStore } = require("@reduxjs/toolkit");
const { userSlice } = require("./slices/user-slice");

const makeStore = () =>
  configureStore({
    reducer: {
      [userSlice.name]: userSlice.reducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
