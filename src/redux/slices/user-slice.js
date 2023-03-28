import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  userState: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Acciones para establecer el estado de user
    setUserState(state, action) {
      state.userState = action.payload;
    },
    // Reducer especial para hidratar el estado. Caso especial para next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.user,
        };
      },
    },
  },
});

export const { setUserState } = userSlice.actions;

export const selectUserState = (state) => state.user.userState;

export default userSlice.reducer;
