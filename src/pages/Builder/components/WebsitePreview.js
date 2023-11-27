import { useSelector } from "react-redux";
import MenuDisplay from "../../../components/MenuDisplay/MenuDisplay";
import {
  updateFavicon,
  updateTitle,
} from "../../../helpers/helperFunctions";

export default function WebsitePreview(props) {
  // Example: Update favicon with a new URL
  const gs = useSelector((state) => state.globalSettings);

  updateFavicon(gs.faviconURL);
  updateTitle(gs.websiteTitle);

  return (
    <div className="h-full w-full overflow-hidden">
      <MenuDisplay />
    </div>
  );
}
