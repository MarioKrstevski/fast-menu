import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menu: null,
  menuId: "",
  isPro: false,
  canPublishOrSaveChanges: true,
  subdomainWhenLoaded: null,
  isPublished: false,
  isOnFreeTrial: "",
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
      state.isOnFreeTrial = "";
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
      // TODO POSSIBLE ERROR, when enabling first time free triald oesnt work
      console.log("payload", action.payload);
      const timestampForEnd = action.payload;
      const timeNow = new Date().getTime();
      console.log("test", Number(timestampForEnd), timeNow);
      console.log("isLessthan", Number(timestampForEnd) < timeNow);

      if (Number(timestampForEnd) < timeNow) {
        state.isOnFreeTrial = timestampForEnd;
      } else {
        console.log("payload set", action.payload);

        state.isOnFreeTrial = action.payload;

        console.log("payload set", state.isOnFreeTrial);
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
