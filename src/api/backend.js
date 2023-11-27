import axios from "axios";

const localUrl = "http://localhost:8000/";
const publishedUrl = "https://api-omjz.onrender.com/";

const localFrontendURL = "http://localhost:3000";
const publishedFrontendUrl =
  "https://main--neon-faun-85f35c.netlify.app/";

export const frontendBaseUrl = publishedFrontendUrl;
export const backendBaseUrl = publishedUrl;

const fastmenu = axios.create({
  baseURL: backendBaseUrl,
  timeout: 2000,
  headers: {},
});

function be_loadMenuItemsByMenuId(menuId) {
  return fastmenu.get("menu", {
    params: {
      menuId,
    },
  });
}
function be_loadMenuItems(newSpreadSheetURL) {
  return fastmenu.get("menuItems", {
    params: {
      newSpreadSheetURL,
    },
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

function be_loadCsvFIle(formData) {
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
  be_loadMenuItemsByMenuId,
  be_checkSubdomainAvailability,
  be_loadMenuItems,
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
  be_loadCsvFIle,
  be_trylogin,
  be_checkClientNameAvailability,
  be_signup,
  be_placeOrder,
};
