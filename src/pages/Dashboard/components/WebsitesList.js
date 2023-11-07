import {
  faEdit,
  faEllipsisH,
  faExternalLinkAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { updateGlobalSettings } from "../../../redux/globalSettingsSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function WebsitesList(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function loadGlobalSettings(client) {
    console.log("starting");
    axios
      .get("http://localhost:8000/globalSettings", {
        params: {
          client,
        },
      })
      .then((res) => {
        console.log("res", res.data);
        dispatch(updateGlobalSettings(res.data));
        navigate("/builder");
      })
      .catch((err) => console.log("error", err));
  }
  return (
    <div className="container mx-auto py-4 px-4 sm:px-0">
      <div
        className="     grid
gap-4
grid-cols-1
sm:grid-cols-2
md:grid-cols-2
lg:grid-cols-3
xl:grid-cols-3
"
      >
        <div className="transition-shadow duration-300 w-full h-64 text-center rounded shadow-lg hover:shadow-xl bg-white overflow-hidden flex items-center justify-center cursor-pointer">
          <div>
            <FontAwesomeIcon icon={faPlus} />
            <span className="is-block has-text-weight-bold">
              {" "}
              New Website{" "}
            </span>
          </div>
        </div>
        <div className="transition-shadow duration-300 w-full h-64 text-center rounded shadow-lg hover:shadow-xl bg-white overflow-hidden relative flex flex-col justify-between items-stretch">
          <div className="flex justify-between items-center p-3">
            <button className="focus:outline-none text-gray-600 hover:text-gray-800 font-bold py-2 px-4 text-lg inline-flex items-center">
              <FontAwesomeIcon icon={faEllipsisH} />
            </button>
            <div className="d-flex">
              <button className="text-gray-600 hover:text-gray-800 font-bold py-2 px-4 text-xs inline-flex items-center bg-gray-100 rounded-full">
                {" "}
                Upgrade to PRO{" "}
              </button>
              <span
                className="text-white font-bold py-2 px-4 text-xs inline-flex items-center bg-blue-500 rounded-full ml-3"
                style={{ display: "none" }}
              >
                {" "}
                PRO{" "}
              </span>
            </div>
          </div>
          <div className="px-6 py-2 h-full flex flex-col items-center justify-center text-xl">
            <div>
              <span className="is-block has-text-weight-bold">
                {" "}
                My website{" "}
              </span>
              <div>
                <a
                  href="http://localhost:3000/menu/agora"
                  target="_blank"
                  className="text-sm break-all hover:underline mb-0"
                >
                  {" "}
                  http://localhost:3000/menu/agora{" "}
                </a>
              </div>
              <div></div>
            </div>
          </div>
          <div className="p-6 text-left rounded-b-lg flex justify-between">
            <div>
              <a
                onClick={() => {
                  loadGlobalSettings("agora");
                }}
                className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white hover:text-white font-bold p-3 rounded shadow-md"
              >
                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                Edit{" "}
              </a>
              <a className="ml-4 cursor-pointer text-white hover:text-white p-3 bg-gray-800 hover:bg-gray-900 rounded shadow-md font-bold">
                <FontAwesomeIcon
                  icon={faExternalLinkAlt}
                  className="mr-2"
                />
                Visit{" "}
              </a>
            </div>
            <div>
              <span className="ml-4" style={{ display: "none" }}>
                {" "}
                Building website...{" "}
              </span>
            </div>
          </div>
        </div>
        <div className="transition-shadow duration-300 w-full h-64 text-center rounded shadow-lg hover:shadow-xl bg-white overflow-hidden relative flex flex-col justify-between items-stretch">
          <div className="flex justify-between items-center p-3">
            <button className="focus:outline-none text-gray-600 hover:text-gray-800 font-bold py-2 px-4 text-lg inline-flex items-center">
              <FontAwesomeIcon icon={faEllipsisH} />
            </button>
            <div className="d-flex">
              <button className="text-gray-600 hover:text-gray-800 font-bold py-2 px-4 text-xs inline-flex items-center bg-gray-100 rounded-full">
                {" "}
                Upgrade to PRO{" "}
              </button>
              <span
                className="text-white font-bold py-2 px-4 text-xs inline-flex items-center bg-blue-500 rounded-full ml-3"
                style={{ display: "none" }}
              >
                {" "}
                PRO{" "}
              </span>
            </div>
          </div>
          <div className="px-6 py-2 h-full flex flex-col items-center justify-center text-xl">
            <div>
              <span className="is-block has-text-weight-bold">
                {" "}
                My website{" "}
              </span>
              <div>
                <a
                  href="http://localhost:3000/menu/cedevita"
                  target="_blank"
                  className="text-sm break-all hover:underline mb-0"
                >
                  {" "}
                  http://localhost:3000/menu/cedevita{" "}
                </a>
              </div>
              <div></div>
            </div>
          </div>
          <div className="p-6 text-left rounded-b-lg flex justify-between">
            <div>
              <a
                onClick={() => {
                  loadGlobalSettings("cedevita");
                }}
                className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white hover:text-white font-bold p-3 rounded shadow-md"
              >
                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                Edit{" "}
              </a>
              <a className="ml-4 cursor-pointer text-white hover:text-white p-3 bg-gray-800 hover:bg-gray-900 rounded shadow-md font-bold">
                <FontAwesomeIcon
                  icon={faExternalLinkAlt}
                  className="mr-2"
                />
                Visit{" "}
              </a>
            </div>
            <div>
              <span className="ml-4" style={{ display: "none" }}>
                {" "}
                Building website...{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
