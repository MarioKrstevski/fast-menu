import { useSelector } from "react-redux";
import MenuDisplay from "../../../components/MenuDisplay/MenuDisplay";
import { updateFavicon } from "../../../helpers/helperFunctions";

export default function WebsitePreview(props) {
  // Example: Update favicon with a new URL
  const gs = useSelector((state) => state.globalSettings);
  console.log("");
  updateFavicon(gs.faviconURL);
  return (
    <div className="h-full w-full overflow-hidden">
      <MenuDisplay />
    </div>
  );
}
