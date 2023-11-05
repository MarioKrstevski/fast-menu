import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ordersEnabled: true,
  spreadSheetURL:
    "https://docs.google.com/spreadsheets/d/1i8s74vfPOwOyckvrwzxXBE7j_-0LPJR2rGRgyfwNDWU/edit#gid=0",
  websiteName: "Agora",
  client: "agora",
  subdomain: "agora",
  logoURL: "https://redux-toolkit.js.org/img/redux.svg",
  faviconURL: "",
  isNavbarFixed: false,
  hero: {
    isShown: false,
    title: "Header TItle",
    titleColor: "#FFFFFF",
    subheading: "Header Subheading",
    subheadingColor: "#FFFFFF",
    image:
      "https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg",
  },
  menuDescription: "Menu Description",
  footer: {
    isShown: false,
    text: "",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    isFacebookLinkShown: false,
    isInstagramLinkShown: false,
    isTiktokLinkShown: false,
    isTwitterLinkShown: false,
    facebookURL: "",
    instagramURL: "",
    tiktokURL: "",
    twitterURL: "",
  },
  theme: {
    headerColor: "#DDE6E8",
    backgroundColor: "#BDC3C8",
    font: "",
  },
  card: {
    customFields: "",
  },
};

export const globalSettingsSlice = createSlice({
  name: "globalSettings",
  initialState,
  reducers: {
    toggleOrdersEnabled: (state) => {
      state.ordersEnabled = !state.ordersEnabled;
    },
    updateStep1: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    updateStep2: (state, action) => {
      if (action.payload.field.includes(".")) {
        const [key1, key2] = action.payload.field.split(".");
        state[key1][key2] = action.payload.value;
        state[key1] = {
          ...state[key1],
        };
      } else {
        state[action.payload.field] = action.payload.value;
      }
    },
    updateStep3: (state, action) => {
      if (action.payload.field.includes(".")) {
        const [key1, key2] = action.payload.field.split(".");
        state[key1][key2] = action.payload.value;
        state[key1] = {
          ...state[key1],
        };
      } else {
        state[action.payload.field] = action.payload.value;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  toggleOrdersEnabled,
  updateStep1,
  updateStep2,
  updateStep3,
} = globalSettingsSlice.actions;

export default globalSettingsSlice.reducer;
