// here we ask for google permissions...
import { useDispatch } from "react-redux";
import { updateGlobalSettings } from "../../redux/globalSettingsSlice";
import axios from "axios";
import DashboardMenu from "./components/DashboardMenu";
import WebsitesList from "./components/WebsitesList";
export function Dashboard(props) {
  const dispatch = useDispatch((store) => store.globalSettings);
  //get global settings

  return (
    <div className="h-[100vh] overflow-y-auto bg-[#f5f5f5]">
      <DashboardMenu />
      <WebsitesList />
    </div>
  );
}
