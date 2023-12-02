import { useSelector } from "react-redux";
import { useEffect } from "react";
import MenuDisplay from "../../../components/MenuDisplay/MenuDisplay";
import {
  addOrReplaceStyle,
  updateFavicon,
  updateTitle,
} from "../../../helpers/helperFunctions";

export default function WebsitePreview(props) {
  // Example: Update favicon with a new URL
  const gs = useSelector((state) => state.globalSettings);

  updateFavicon(gs.faviconURL);
  updateTitle(gs.websiteTitle);

  console.log("test");
  //add css
  useEffect(() => {
    addOrReplaceStyle(gs.card.appliedCustomCss);
  }, []);

  return (
    <div className="h-full w-full overflow-hidden">
      <MenuDisplay />
    </div>
  );
}
