import {
  faAlignLeft,
  faAngleRight,
  faArrowLeft,
  faExternalLinkAlt,
  faLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRef, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { updateIsPublished } from "../../../../../redux/menuSlice";
export default function QRCodeInfo(props) {
  const qrRef = useRef();
  const gs = useSelector((store) => store.globalSettings);
  const qrlink = "http://localhost:3000/menu/" + gs.subdomain;
  const [settingsUpdated, setSettingsUpdated] = useState(false);
  //   const qrlink = "http://www.fastmenu.com/menu/" + gs.subdomain;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { menuId, canPublishOrSaveChanges, isPublished } =
    useSelector((state) => state.menu);

  function be_saveGlobalSettings(menuId, globalSettings) {
    axios
      .post("http://localhost:8000/saveGlobalSettings", {
        menuId,
        globalSettings,
      })
      .then((res) => {
        setSettingsUpdated(true);
        setTimeout(() => {
          setSettingsUpdated(false);
        }, 2000);
      })
      .catch((err) => {});
  }
  function handleSaveGlobalSettings() {
    be_saveGlobalSettings(menuId, gs);
  }

  function be_publishMenu(menuId) {
    axios
      .post("http://localhost:8000/publishMenu", {
        menuId,
      })
      .then((res) => {
        console.log("res", res);
        dispatch(updateIsPublished(true));
      })
      .catch((err) => {});
  }
  function handlePublishMenu() {
    be_publishMenu(menuId);
  }

  return (
    <div>
      <div className="h-full flex flex-col items-center">
        <div className="flex flex-col mb-4 text-center">
          <div className="border-2 border-slate-400 rounded-lg w-[185px] mx-auto flex justify-center">
            <QRCode ref={qrRef} value={qrlink} size={150} />
          </div>
          <div className="text-center mt-2">
            <p>Scan to visit your website</p>

            <button
              className="text-blue-500 hover:text-blue-600"
              onClick={() => {
                const canvas = qrRef.current.canvas.current;
                const url = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.download = gs.subdomain + "-qrcode.png";
                link.href = url;
                link.click();
              }}
            >
              Download QR Code
            </button>
          </div>
        </div>
        <div>
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 mt-2 border border-gray-400 rounded shadow"
            onClick={handleSaveGlobalSettings}
          >
            Save Settings
          </button>
          {settingsUpdated && (
            <div className="text-green-700 my-2 text-sm ">
              Settings Updated!
            </div>
          )}
        </div>

        {!isPublished && (
          <div className="w-full">
            <a
              target="_blank"
              href={"http://localhost:3000/menu/" + gs.subdomain}
            >
              <button
                disabled={!canPublishOrSaveChanges}
                type="button"
                onClick={handlePublishMenu}
                className={`px-4 py-2 mt-2 rounded  text-white border-transparent flex justify-center gap-2 w-full text-lg ${
                  canPublishOrSaveChanges
                    ? "bg-slate-800 hover:bg-slate-900 active:bg-slate-950 cursor-pointer"
                    : "bg-gray-500"
                }`}
              >
                <span> Publish </span>
                <span className="icon is-medium">
                  <FontAwesomeIcon icon={faAngleRight} />
                </span>
              </button>
            </a>
          </div>
        )}

        {isPublished && (
          <div className="w-full">
            <a
              target="_blank"
              href={"http://localhost:3000/menu/" + gs.subdomain}
            >
              <button
                type="button"
                className={`px-4 py-2 mt-2 rounded   border border-black flex justify-center gap-2 w-full  `}
              >
                <span>
                  <FontAwesomeIcon
                    icon={faExternalLinkAlt}
                    className="mr-2"
                  />
                </span>
                <span> Visit </span>
              </button>
            </a>
          </div>
        )}

        <div>
          <button
            onClick={() => {
              navigate("/dashboard");
            }}
            className="my-2 mt-16  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
