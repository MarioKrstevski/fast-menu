import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateGlobalSettings } from "../../redux/globalSettingsSlice";
import WebsitePreview from "../Builder/components/WebsitePreview";
import { updateMenu } from "../../redux/menuSlice";
import { api } from "../../api/backend";

function MenuDoesntExist() {
  return <div>menu doesnt exist</div>;
}
function MenuIsNotPublished() {
  return <div>menu is not published yet</div>;
}
export default function Menu(props) {
  const { subdomain } = useParams();
  const dispatch = useDispatch();
  const [menuErrorCode, setMenuErrorCode] = useState(null);
  const [isMenuLoading, setisMenuLoading] = useState(true);

  function loadMenuAtStart() {
    api
      .be_loadMenu(subdomain)
      .then((res) => {
        console.log("res", res);
        dispatch(updateMenu(res.data.menuItems));
        dispatch(updateGlobalSettings(res.data.globalSettings));
      })
      .catch((err) => {
        console.log("err", err);
        setMenuErrorCode(err.response.status);
      })
      .finally(() => {
        setisMenuLoading(false);
      });
  }
  //Load Menu
  useEffect(() => {
    loadMenuAtStart();
  }, []);

  if (isMenuLoading) {
    return null;
  }
  return (
    <div>
      {!menuErrorCode && <WebsitePreview />}
      {menuErrorCode === 404 && <MenuDoesntExist />}
      {menuErrorCode === 403 && <MenuIsNotPublished />}
    </div>
  );
}
