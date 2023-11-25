// here we ask for google permissions...
import { useDispatch } from "react-redux";
import DashboardMenu from "./components/DashboardMenu";
import WebsitesList from "./components/WebsitesList";
import { useEffect } from "react";
export function Dashboard(props) {
  const dispatch = useDispatch((store) => store.globalSettings);
  //get global settings

  function loadClientData() {}
  //Load client data
  useEffect(() => {
    loadClientData();
  }, []);

  return (
    <div className="h-[100vh] overflow-y-auto bg-[#f5f5f5]">
      <DashboardMenu />
      <WebsitesList />
    </div>
  );
}
