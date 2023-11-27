import {
  faEdit,
  faEllipsisH,
  faExternalLinkAlt,
  faPlus,
  faRefresh,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateGlobalSettings } from "../../../redux/globalSettingsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  clearMenuInfo,
  updateIsOnFreeTrial,
  updateIsPublished,
  updateMenuId,
  updateMenuProStatus,
  updateSubdomainWhenLoaded,
} from "../../../redux/menuSlice";
import { updateSelectedMenuForPlan } from "../../../redux/planUpgradeSlice";
import UpgradeToProPlanModal from "./UpgradeToProPlanModal";
import { OverlayPanel } from "primereact/overlaypanel";
import { useAuthUser, useSignIn } from "react-auth-kit";
import { api, baseUrl } from "../../../api/backend";

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
  const opRef = useRef();
  const deleteMenuRef = useRef();
  const navigate = useNavigate();
  // const user = useSelector((state) => state.auth.user);
  const auth = useAuthUser();
  const user = auth();
  const signIn = useSignIn();

  const menu = useSelector((state) => state.menu);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFetchingMenus, setIsFetchingMenus] = useState(false);
  const [isCreatingNewMenu, setIsCreatingNewMenu] = useState(false);
  const menuLimit = 6;

  function loadNeededMenuInformation(
    menuId,
    isPro,
    isPublished,
    isOnFreeTrial
  ) {
    api
      .be_loadGlobalSettingsForMenu(menuId)
      .then((res) => {
        dispatch(updateGlobalSettings(res.data.globalSettings));
        dispatch(updateMenuId(menuId));
        dispatch(updateMenuProStatus(isPro));
        dispatch(updateSelectedMenuForPlan(menuId));
        dispatch(
          updateSubdomainWhenLoaded(res.data.globalSettings.subdomain)
        );
        dispatch(updateIsPublished(isPublished));
        dispatch(updateIsOnFreeTrial(isOnFreeTrial));
        navigate("/builder");
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  function handleDeleteMenu(menuId) {
    api
      .be_deleteMenu(menuId)
      .then((res) => {
        console.log("res", res);
        handleRefreshMenus();
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  function handleRefreshMenus() {
    console.log("menus refreshed");
    setIsFetchingMenus(true);
    setTimeout(() => {
      setIsFetchingMenus(false);
    }, 1000);
    api
      .be_getMenusForClient(user.clientName)
      .then((res) => {
        console.log("newMenus", res.data.menus);
        // dispatch(updateWithNewMenus(res.data.menus));
        signIn({
          token: localStorage.getItem("_auth"),
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: {
            ...user,
            menus: res.data.menus,
          },
        });
        // signIn({
        //   ...user,
        //   menus: res.data.menus,
        // });
      })
      .catch((err) => console.log("error", err))
      .finally(() => {
        setIsCreatingNewMenu(false);
      });
  }

  function createNewMenu() {
    setIsCreatingNewMenu(true);
    api
      .be_generateNewMenu(user.clientName)
      .then((res) => {
        console.log("res", res);
        // dispatch(updateWithNewMenus(res.data.newMenus));
        signIn({
          token: localStorage.getItem("_auth"),
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: {
            ...user,
            menus: res.data.newMenus,
          },
        });
      })
      .catch((err) => console.log("error", err))
      .finally(() => {
        setIsCreatingNewMenu(false);
      });
  }

  //refresh menu on load

  useEffect(() => {
    handleRefreshMenus();
    dispatch(clearMenuInfo());
  }, []);

  return (
    <div className="container  mx-auto py-4 px-4 sm:px-0">
      {isModalOpen && (
        <div
          onClick={() => {
            setIsModalOpen(false);
          }}
          className={` bg-black/40 overflow-y-auto  global-modal fixed p-4 top-0 left-0 z-20  w-full h-full flex flex-col items-center transition duration-300 ease-in-out `}
        >
          <UpgradeToProPlanModal
            enablePro={() => {
              setIsModalOpen(false);
              handleRefreshMenus();
            }}
            enableFreeTrial={() => {
              setIsModalOpen(false);
              handleRefreshMenus();
            }}
          />
        </div>
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
        {menuLimit > user.menus.length && (
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
        )}
        {user.menus.map((menu) => {
          return (
            <div
              key={menu.id}
              className="transition-shadow duration-300 w-full h-64 text-center rounded shadow-lg hover:shadow-xl bg-white overflow-hidden relative flex flex-col justify-between items-stretch"
            >
              <div className="flex justify-between items-center p-3">
                <button
                  onClick={(e) => {
                    opRef.current.toggle(e);
                    deleteMenuRef.current = menu.id;
                  }}
                  className="focus:outline-none text-gray-600 hover:text-gray-800 font-bold py-2 px-4 text-lg inline-flex items-center"
                >
                  <FontAwesomeIcon icon={faEllipsisH} />
                </button>
                <OverlayPanel ref={opRef}>
                  <button
                    onClick={() => {
                      handleDeleteMenu(deleteMenuRef.current);
                    }}
                  >
                    {" "}
                    Delete Menu{" "}
                  </button>
                </OverlayPanel>

                <div className="d-flex">
                  {!menu.isPro && (
                    <button
                      onClick={() => {
                        console.log("menu", menu.id);
                        dispatch(updateSelectedMenuForPlan(menu.id));
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
                  {!menu.isPro && menu.isOnFreeTrial && (
                    <span className="text-green-950 font-semibold py-2 px-4 text-xs inline-flex items-center bg-green-500 rounded-full ml-3">
                      Free Trial
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
                      href={baseUrl + menu.subdomain}
                      target="_blank"
                      className="text-sm break-all hover:underline mb-0"
                    >
                      {baseUrl + menu.subdomain}
                    </a>
                  </div>
                  <div></div>
                </div>
              </div>
              <div className="p-6 text-left rounded-b-lg flex justify-between">
                <div>
                  <a
                    onClick={() =>
                      loadNeededMenuInformation(
                        menu.id,
                        menu.isPro,
                        menu.isPublished,
                        menu.isOnFreeTrial
                      )
                    }
                    className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white hover:text-white font-semibold px-3 py-2 rounded shadow-md"
                  >
                    <FontAwesomeIcon icon={faEdit} className="mr-2" />
                    Edit{" "}
                  </a>
                  {menu.isPublished && (
                    <a
                      target="_blank"
                      href={baseUrl + menu.subdomain}
                      className="ml-4 cursor-pointer text-white hover:text-white font-semibold px-3 py-2 bg-gray-800 hover:bg-gray-900 rounded shadow-md "
                    >
                      <FontAwesomeIcon
                        icon={faExternalLinkAlt}
                        className="mr-2"
                      />
                      Visit
                    </a>
                  )}
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
