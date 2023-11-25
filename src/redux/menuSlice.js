import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menu: [],
  menuId: "",
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
  },
});

// Action creators are generated for each case reducer function
export const { updateMenu, updateMenuId } = menuSlice.actions;

export default menuSlice.reducer;
