import { configureStore } from "@reduxjs/toolkit";

import globalSettingsReducer from "./globalSettingsSlice";
import shoppingCartReducer from "./shoppingCartSlice";
export const store = configureStore({
  reducer: {
    globalSettings: globalSettingsReducer,
    shoppingCart: shoppingCartReducer,
  },
});
