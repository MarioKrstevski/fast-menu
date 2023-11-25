import {
  faEdit,
  faEllipsisH,
  faExternalLinkAlt,
  faPlus,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { updateGlobalSettings } from "../../../redux/globalSettingsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function NewMenuCreationIndicator() {
  return (
    <div className="transition-shadow duration-300 w-full h-64 text-center rounded shadow-lg hover:shadow-xl bg-white overflow-hidden relative flex flex-col justify-between items-stretch">
      <div className="p-6 text-left rounded-b-lg flex justify-center items-center h-full">
        <div className="">
          <span className="mx-4 w-full h-full">Building menu</span>
          <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      </div>
    </div>
  );
}

export default function WebsitesList(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const gs = useSelector((state) => state.globalSettings);

  const [isCreatingNewMenu, setIsCreatingNewMenu] = useState(false);

  async function generateNewMenu() {
    return axios.get("http://localhost:8000/generateNewMenu", {
      params: {
        client: user.clientName,
      },
    });
  }
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

  function createNewMenu() {
    setIsCreatingNewMenu(true);

    setTimeout(() => {
      setIsCreatingNewMenu(false);
    }, 1000);

    generateNewMenu()
      .then((res) => {
        console.log("res", res.data);
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
        <div
          onClick={createNewMenu}
          className="new-menu transition-shadow duration-300 w-full h-64 text-center rounded shadow-lg hover:shadow-xl bg-white overflow-hidden flex items-center justify-center cursor-pointer"
        >
          <div className="">
            <FontAwesomeIcon icon={faPlus} className="mx-2" />
            <span className="is-block has-text-weight-bold">
              New Menu
            </span>
          </div>
        </div>
        {user.menus.map((menu) => {
          return (
            <div
              key={menu.id}
              className="transition-shadow duration-300 w-full h-64 text-center rounded shadow-lg hover:shadow-xl bg-white overflow-hidden relative flex flex-col justify-between items-stretch"
            >
              <div className="flex justify-between items-center p-3">
                <button className="focus:outline-none text-gray-600 hover:text-gray-800 font-bold py-2 px-4 text-lg inline-flex items-center">
                  <FontAwesomeIcon icon={faEllipsisH} />
                </button>
                <div className="d-flex">
                  {!menu.isPro && (
                    <button className="text-gray-600 hover:text-gray-800 font-bold py-2 px-4 text-xs inline-flex items-center bg-gray-100 rounded-full">
                      Upgrade to PRO
                    </button>
                  )}
                  {menu.isPro && (
                    <span className="text-white font-bold py-2 px-4 text-xs inline-flex items-center bg-blue-500 rounded-full ml-3">
                      PRO Activated
                    </span>
                  )}
                </div>
              </div>
              <div className="px-6 py-2 h-full flex flex-col items-center justify-center text-xl">
                <div>
                  <span className="is-block has-text-weight-bold capitalize">
                    {menu.menuName}
                  </span>
                  <div>
                    <a
                      href={
                        "http://localhost:3000/menu/" + menu.subdomain
                      }
                      target="_blank"
                      className="text-sm break-all hover:underline mb-0"
                    >
                      {"http://localhost:3000/menu/" + menu.subdomain}
                    </a>
                  </div>
                  <div></div>
                </div>
              </div>
              <div className="p-6 text-left rounded-b-lg flex justify-between">
                <div>
                  <a
                    onClick={() => {
                      loadGlobalSettings(menu.subdomain);
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
                    Visit
                  </a>
                </div>
                <div>
                  <span className="ml-4" style={{ display: "none" }}>
                    Building menu...
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {isCreatingNewMenu && <NewMenuCreationIndicator />}
      </div>
    </div>
  );
}
