import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ordersEnabled: true,
};

export const globalSettingsSlice = createSlice({
  name: "globalSettings",
  initialState,
  reducers: {
    toggleOrdersEnabled: (state) => {
      state.ordersEnabled = !state.ordersEnabled;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleOrdersEnabled } = globalSettingsSlice.actions;

export default globalSettingsSlice.reducer;
