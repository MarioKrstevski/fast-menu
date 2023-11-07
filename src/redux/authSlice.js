import { createSlice } from "@reduxjs/toolkit";

const eventualUser = {
  // clientName,
  menus: [{ id: "", subdomain: "", link: "" }],
  email: "",
  pass: "",
  isPro: false,
  createdAt: "",
  contactName: "",
  contactNumber: "",
};
const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      if (action.payload === "demo") {
        state.user = { ...eventualUser };
      } else {
        state.user = action.payload;
      }
    },
    logout(state) {
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
