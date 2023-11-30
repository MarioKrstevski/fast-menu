import axios from "axios";

import { backendBaseUrl } from "../constants/global";

const fastmenu = axios.create({
  baseURL: backendBaseUrl,
  timeout: 4000,
  headers: {},
});

function be_serverCheck() {
  return fastmenu.get("test");
}

function be_getItems(menuId) {
  return fastmenu.get("items", {
    params: {
      menuId,
    },
  });
}

function be_syncExistingSheets(menuId) {
  return fastmenu.post("syncExistingSheets", {
    menuId,
  });
}

function be_syncNewSheets(newSpreadSheetURL, menuId) {
  return fastmenu.post("syncNewSheets", {
    newSpreadSheetURL,
    menuId,
  });
}
function be_checkSubdomainAvailability(subdomain) {
  return fastmenu.get("subdomainAvailability", {
    params: {
      subdomain,
    },
  });
}

function be_saveGlobalSettings(menuId, globalSettings) {
  return fastmenu.post("saveGlobalSettings", {
    menuId,
    globalSettings,
  });
}

function be_publishMenu(menuId) {
  return fastmenu.post("publishMenu", {
    menuId,
  });
}
function be_updateUserInfo(updatedUserInfo, email) {
  return fastmenu.post("updateUserInfo", {
    ...updatedUserInfo,
    email,
  });
}

function be_subscribeMenuToFreeTrial(menuId) {
  return fastmenu.post("enableFreeTrialForMenu", {
    menuId,
  });
}
function be_subscribeMenuToPro(menuId) {
  return fastmenu.post("subscribeMenuToPro", {
    menuId,
  });
}

function be_loadGlobalSettingsForMenu(menuId) {
  return fastmenu.get("globalSettings", {
    params: {
      menuId,
    },
  });
}
function be_generateNewMenu(client) {
  return fastmenu.get("generateNewMenu", {
    params: {
      client,
    },
  });
}

function be_getMenusForClient(client) {
  return fastmenu.get("getMenus", {
    params: {
      client,
    },
  });
}

function be_deleteMenu(menuId) {
  return fastmenu.delete("deleteMenu", {
    params: {
      menuId,
    },
  });
}

function be_loadMenu(subdomain) {
  return fastmenu.get("menu", {
    params: {
      subdomain,
    },
  });
}

function be_uploadFromCSV(formData) {
  return fastmenu.post("upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function be_trylogin(email, password) {
  return fastmenu.post("login", {
    email,
    password,
  });
}

function be_checkClientNameAvailability(clientName) {
  return fastmenu.get("checkClientName", {
    params: { clientName },
  });
}

function be_signup(data) {
  return fastmenu.post("signup", data);
}

function be_placeOrder(message, number) {
  return fastmenu.post("placeOrder", {
    message,
    number,
  });
}

export const api = {
  be_serverCheck,
  be_getItems,
  be_syncExistingSheets,
  be_checkSubdomainAvailability,
  be_syncNewSheets,
  be_saveGlobalSettings,
  be_publishMenu,
  be_updateUserInfo,
  be_subscribeMenuToFreeTrial,
  be_subscribeMenuToPro,
  be_loadGlobalSettingsForMenu,
  be_generateNewMenu,
  be_getMenusForClient,
  be_deleteMenu,
  be_loadMenu,
  be_uploadFromCSV,
  be_trylogin,
  be_checkClientNameAvailability,
  be_signup,
  be_placeOrder,
};
