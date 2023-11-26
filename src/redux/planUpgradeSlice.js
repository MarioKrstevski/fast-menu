import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPlan: "",
  selectedMenuId: "",
};

export const planUpgradeSlice = createSlice({
  name: "planUpgrade",
  initialState,
  reducers: {
    updateSelectedPlan(state, action) {
      state.selectedPlan = action.payload;
    },
    updateSelectedMenuForPlan(state, action) {
      console.log("action", action);
      state.selectedMenuId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateSelectedPlan, updateSelectedMenuForPlan } =
  planUpgradeSlice.actions;

export default planUpgradeSlice.reducer;
