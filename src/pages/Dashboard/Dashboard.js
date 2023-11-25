// here we ask for google permissions...
import DashboardMenu from "./components/DashboardMenu";
import WebsitesList from "./components/WebsitesList";
export function Dashboard(props) {
  return (
    <div className="h-[100vh] overflow-y-auto bg-[#f5f5f5]">
      <DashboardMenu />
      <WebsitesList />
    </div>
  );
}
