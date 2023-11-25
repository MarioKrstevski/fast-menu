import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    updateWithNewMenus(state, action) {
      console.log("action", action);
      state.user = { ...state.user, menus: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, updateWithNewMenus } =
  authSlice.actions;

export default authSlice.reducer;
