import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menu: [],
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    updateMenu(state, action) {
      state.menu = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateMenu } = menuSlice.actions;

export default menuSlice.reducer;
