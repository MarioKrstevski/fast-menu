import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menu: [],
  menuId: "",
  isPro: false,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    updateMenu(state, action) {
      state.menu = action.payload;
    },
    updateMenuId(state, action) {
      state.menuId = action.payload;
    },
    updateMenuProStatus(state, action) {
      state.isPro = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateMenu, updateMenuId, updateMenuProStatus } =
  menuSlice.actions;

export default menuSlice.reducer;
