import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { QRCode } from "react-qrcode-logo";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function QRCodeInfo(props) {
  const qrRef = useRef();
  const gs = useSelector((store) => store.globalSettings);
  const qrlink = "http://localhost:3000/menu/" + gs.subdomain;
  //   const qrlink = "http://www.fastmenu.com/menu/" + gs.subdomain;
  const navigate = useNavigate();
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
        <div className="w-full">
          <a
            target="_blank"
            href={"http://localhost:3000/menu/" + gs.subdomain}
          >
            <button
              type="button"
              className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-900 active:bg-slate-950 text-white border-transparent flex justify-center gap-2 w-full text-lg"
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
