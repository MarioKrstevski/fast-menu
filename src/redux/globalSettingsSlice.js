import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ordersEnabled: true,
  whatsappNumberConnected: "38977766669",
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
    customFields: "Price",
    filterBy: "Section",
    image: "Image",
    title: "Name",
    description: "Description",
    caption: "Caption",
    buttonAction: "cart",
    buttonText: "Add to Cart",
    buttonBgColor: "#731574",
    buttonTextColor: "#ffffff",
  },
};

export const globalSettingsSlice = createSlice({
  name: "globalSettings",
  initialState,
  reducers: {
    updateGlobalSettings(state, action) {
      return action.payload;
    },
    updateSetting: (state, action) => {
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
  updateSetting,
  updateGlobalSettings,
} = globalSettingsSlice.actions;

export default globalSettingsSlice.reducer;
