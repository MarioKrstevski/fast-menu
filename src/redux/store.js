import { configureStore } from "@reduxjs/toolkit";

import globalSettingsReducer from "./globalSettingsSlice";
import shoppingCartReducer from "./shoppingCartSlice";
import menuSlice from "./menuSlice";
import authSlice from "./authSlice";
import planUpgradeSlice from "./planUpgradeSlice";

export const store = configureStore({
  reducer: {
    globalSettings: globalSettingsReducer,
    shoppingCart: shoppingCartReducer,
    menu: menuSlice,
    auth: authSlice,
    planUpgrade: planUpgradeSlice,
  },
});
