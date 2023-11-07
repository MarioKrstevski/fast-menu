import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateGlobalSettings } from "../../redux/globalSettingsSlice";
import WebsitePreview from "../Builder/components/WebsitePreview";
import { updateMenu } from "../../redux/menuSlice";

export default function Menu(props) {
  const { companyName } = useParams();
  const gs = useSelector((store) => store.globalSettings);
  const dispatch = useDispatch();
  function loadMenuAtStart() {
    axios
      .get("http://localhost:8000/menu", {
        params: {
          // companyName: gs.subdomain,
          companyName,
        },
      })
      .then((res) => {
        console.log("data", res);
        dispatch(updateMenu(res.data.menu));
        dispatch(updateGlobalSettings(res.data.globalSettings));
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  //Load Menu
  useEffect(() => {
    loadMenuAtStart();
  }, []);
  return (
    <div>
      <WebsitePreview />
    </div>
  );
}
