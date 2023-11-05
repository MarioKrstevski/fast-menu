import { configureStore } from "@reduxjs/toolkit";

import globalSettingsReducer from "./globalSettingsSlice";
import shoppingCartReducer from "./shoppingCartSlice";
import menuSlice from "./menuSlice";
export const store = configureStore({
  reducer: {
    globalSettings: globalSettingsReducer,
    shoppingCart: shoppingCartReducer,
    menu: menuSlice,
  },
});
