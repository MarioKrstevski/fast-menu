import {
  faEdit,
  faEllipsisH,
  faExternalLinkAlt,
  faPlus,
  faRefresh,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { updateGlobalSettings } from "../../../redux/globalSettingsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateWithNewMenus } from "../../../redux/authSlice";
import { updateMenuId } from "../../../redux/menuSlice";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFetchingMenus, setIsFetchingMenus] = useState(false);

  const [isCreatingNewMenu, setIsCreatingNewMenu] = useState(false);

  async function be_loadGlobalSettingsForMenu(menuId) {
    return axios.get("http://localhost:8000/globalSettings", {
      params: {
        menuId,
      },
    });
  }

  function loadGlobalSettingsForMenu(menuId) {
    be_loadGlobalSettingsForMenu(menuId)
      .then((res) => {
        dispatch(updateGlobalSettings(res.data.globalSettings));
        dispatch(updateMenuId(menuId));
        navigate("/builder");
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  async function be_generateNewMenu(client) {
    return axios.get("http://localhost:8000/generateNewMenu", {
      params: {
        client,
      },
    });
  }

  async function be_getMenusForClient(client) {
    return axios.get("http://localhost:8000/getMenus", {
      params: {
        client,
      },
    });
  }
  function handleRefreshMenus() {
    setIsFetchingMenus(true);
    setTimeout(() => {
      setIsFetchingMenus(false);
    }, 1000);
    be_getMenusForClient(user.clientName)
      .then((res) => {
        dispatch(updateWithNewMenus(res.data.menus));
      })
      .catch((err) => console.log("error", err))
      .finally(() => {
        setIsCreatingNewMenu(false);
      });
  }

  function createNewMenu() {
    setIsCreatingNewMenu(true);
    be_generateNewMenu(user.clientName)
      .then((res) => {
        console.log("res", res);
        dispatch(updateWithNewMenus(res.data.newMenus));
      })
      .catch((err) => console.log("error", err))
      .finally(() => {
        setIsCreatingNewMenu(false);
      });
  }

  return (
    <div className="container  mx-auto py-4 px-4 sm:px-0">
      {isModalOpen && (
        <div
          onClick={() => {
            setIsModalOpen(false);
          }}
          className={` bg-black opacity-60 global-modal fixed p-4 top-0 left-0 z-20  w-full h-full flex flex-col items-end transition duration-300 ease-in-out `}
        ></div>
      )}

      <div className="refresh-menus">
        <button
          onClick={handleRefreshMenus}
          className="bg-white my-2 hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 mt-2 border border-gray-400 rounded shadow"
        >
          <FontAwesomeIcon
            icon={faRefresh}
            spin={isFetchingMenus}
            className="mx-2"
          />
          Refresh Menus
        </button>
      </div>
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
                    <button
                      onClick={() => {
                        setIsModalOpen(true);
                      }}
                      className="text-gray-600 hover:text-gray-800 font-bold py-2 px-4 text-xs inline-flex items-center bg-gray-100 rounded-full"
                    >
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
                    onClick={() => loadGlobalSettingsForMenu(menu.id)}
                    className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white hover:text-white font-bold p-3 rounded shadow-md"
                  >
                    <FontAwesomeIcon icon={faEdit} className="mr-2" />
                    Edit{" "}
                  </a>
                  {menu.isPublished && (
                    <a className="ml-4 cursor-pointer text-white hover:text-white p-3 bg-gray-800 hover:bg-gray-900 rounded shadow-md font-bold">
                      <FontAwesomeIcon
                        icon={faExternalLinkAlt}
                        className="mr-2"
                      />
                      Visit
                    </a>
                  )}
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
