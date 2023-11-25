import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRef, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function QRCodeInfo(props) {
  const qrRef = useRef();
  const gs = useSelector((store) => store.globalSettings);
  const qrlink = "http://localhost:3000/menu/" + gs.subdomain;
  const [settingsUpdated, setSettingsUpdated] = useState(false);
  //   const qrlink = "http://www.fastmenu.com/menu/" + gs.subdomain;
  const navigate = useNavigate();
  const menuId = useSelector((store) => store.menu.menuId);

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
        <div className="w-full">
          <a
            target="_blank"
            href={"http://localhost:3000/menu/" + gs.subdomain}
          >
            <button
              type="button"
              className="px-4 py-2 mt-2 rounded bg-slate-800 hover:bg-slate-900 active:bg-slate-950 text-white border-transparent flex justify-center gap-2 w-full text-lg"
            >
              <span> Publish </span>{" "}
              <span className="icon is-medium">
                <FontAwesomeIcon icon={faAngleRight} />
              </span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
