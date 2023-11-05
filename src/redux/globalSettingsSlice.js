import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ordersEnabled: true,
  spreadSheetURL:
    "https://docs.google.com/spreadsheets/d/1i8s74vfPOwOyckvrwzxXBE7j_-0LPJR2rGRgyfwNDWU/edit#gid=0",
  websiteName: "Agora",
  client: "agora",
  subdomain: "agora",
  logoURL: "https://redux-toolkit.js.org/img/redux.svg",
  favicon: "",
  isNavbarFixed: false,
  header: {
    isShown: false,
    title: "",
    subheading: "",
    image: "",
  },
  menuDescription: "",
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
