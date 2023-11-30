import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menu: null,
  menuId: "",
  isPro: false,
  canPublishOrSaveChanges: true,
  subdomainWhenLoaded: null,
  isPublished: false,
  isOnFreeTrial: false,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    clearMenuInfo(state) {
      // used when loading dashboard, to guarantee clean setup for next menu
      state.menu = [];
      state.menuId = "";
      state.isPro = false;
      state.canPublishOrSaveChanges = true;
      state.subdomainWhenLoaded = null;
      state.isPublished = false;
      state.isOnFreeTrial = false;
    },
    updateMenu(state, action) {
      state.menu = action.payload;
    },
    updateMenuId(state, action) {
      state.menuId = action.payload;
    },
    updateMenuProStatus(state, action) {
      state.isPro = action.payload;
    },
    updateMenuChangesCheck(state, action) {
      state.canPublishOrSaveChanges = action.payload;
    },
    updateSubdomainWhenLoaded(state, action) {
      state.subdomainWhenLoaded = action.payload;
    },
    updateIsPublished(state, action) {
      state.isPublished = action.payload;
    },
    updateIsOnFreeTrial(state, action) {
      const timestampForEnd = action.payload;
      if (Number(timestampForEnd) < new Date().getTime()) {
        state.isOnFreeTrial = "";
      } else {
        state.isOnFreeTrial = action.payload;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  clearMenuInfo,
  updateMenu,
  updateMenuId,
  updateMenuProStatus,
  updateMenuChangesCheck,
  updateSubdomainWhenLoaded,
  updateIsPublished,
  updateIsOnFreeTrial,
} = menuSlice.actions;

export default menuSlice.reducer;
