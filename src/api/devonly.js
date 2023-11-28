import axios from "axios";

import { backendBaseUrl } from "../constants/global";

const fastmenu = axios.create({
  baseURL: backendBaseUrl,
  timeout: 5000,
  headers: {},
});

function be_getAllExistingMenus() {
  return fastmenu.get("getAllExistingMenus");
}

function be_getAllExistingUsers(message, number) {
  return fastmenu.get("getAllExistingUsers");
}

export const devonlyApi = {
  be_getAllExistingMenus,
  be_getAllExistingUsers,
};
