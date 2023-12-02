import {
  faAngleLeft,
  faAngleRight,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import DataLoadInput from "./steps/DataLoadInput";
import BasicInfoColors from "./steps/BasicInfoColors";
import CardDesign from "./steps/CardDesign";
import QRCodeInfo from "./steps/QRCodeInfo";
import { useDispatch, useSelector } from "react-redux";
import {
  updateIsOnFreeTrial,
  updateMenu,
  updateMenuProStatus,
} from "../../../../redux/menuSlice";
import UpgradeToProPlanModal from "../../../Dashboard/components/UpgradeToProPlanModal";
import { calculateTimeRemaining } from "../../../../helpers/helperFunctions";
import { Navigate, useNavigate } from "react-router-dom";
import { api } from "../../../../api/backend";
import Integrations from "./steps/Integrations";

const steps = [
  { component: <DataLoadInput />, title: "Insert Spreadsheet" },
  { component: <BasicInfoColors />, title: "Website Info" },
  { component: <CardDesign />, title: "Items Design" },
  { component: <Integrations />, title: "Integrations" },
  { component: <QRCodeInfo />, title: "QR Code" },
  // { component: <CheckoutForm />, title: "Checkout Form" },
];
export default function BuilderStepper(props) {
  const gs = useSelector((state) => state.globalSettings);
  const dispatch = useDispatch();
  const [isSyncingExistingItems, setIsSyncingExistingItems] =
    useState(false);
  const navigate = useNavigate();
  const { menuId, menu, isPro, isOnFreeTrial } = useSelector(
    (store) => store.menu
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Gets items for the menu/page from db that are already loaded from the Sheet
   */

  function handleLoadItems() {
    api
      .be_getItems(menuId)
      .then((res) => {
        console.log("Loaded items", res);
        dispatch(updateMenu(res.data.items));
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  /**
   * Called when we make a change to the spreadsheet and we want to reimport the new items
   * into the db and then get here to display on the UI
   */
  function handleGetUpdatedSheetItems() {
    setIsSyncingExistingItems(true);
    api
      .be_syncExistingSheets(menuId)
      .then((res) => {
        console.log("New updated items", res);
        dispatch(updateMenu(res.data.items));
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setIsSyncingExistingItems(false);
      });
  }

  //load menu if spreadSheetURL is setup and they haven't been loaded before
  useEffect(() => {
    console.log("this executes", menuId);
    const menuIsLoaded = menuId !== "";
    if (menuIsLoaded && gs.spreadSheetURL) {
      handleLoadItems();
    }
  }, []);
  window.ss = function () {
    console.log(gs);
    console.log(menu);
  };
  const [currentStep, setCurrentStep] = useState(1);

  if (!menuId) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <div className="w-[480px] overflow-x-hidden border-r-2  border-r-gray-400 ">
      {isModalOpen && !isPro && (
        <div
          onClick={() => {
            setIsModalOpen(false);
          }}
          className={` bg-black/40 global-modal fixed p-4 top-0 left-0 z-20  w-full h-full flex flex-col items-center transition duration-300 ease-in-out `}
        >
          <UpgradeToProPlanModal
            enablePro={() => {
              setIsModalOpen(false);
              dispatch(updateMenuProStatus(true));
            }}
            enableFreeTrial={() => {
              const timestampForTomorrow =
                new Date().getTime() + 24 * 60 * 60 * 1000;

              console.log(
                " timestampForTomorrow;",
                timestampForTomorrow
              );
              dispatch(
                updateIsOnFreeTrial(timestampForTomorrow.toString())
              );
              setIsModalOpen(false);
            }}
          />
        </div>
      )}
      <div className="flex flex-col h-full">
        <div
          id="build-stepper"
          className="flex  justify-between items-center p-2 md:p-4 border-b h-20"
        >
          <div className="text-lg font-bold w-[120px] ">
            {steps[currentStep - 1].title}
          </div>
          <div className="flex items-center ">
            <span
              data-label="Sync spreadsheet"
              className="is-primary is-left is-medium b-tooltip"
              style={{ transitionDelay: "0ms" }}
            >
              <button
                onClick={handleGetUpdatedSheetItems}
                type="button"
                className="button w-8 is-small mr-2 border rounded "
              >
                <span title="Sync Spreadsheet">
                  <FontAwesomeIcon
                    icon={faSyncAlt}
                    spin={isSyncingExistingItems}
                  />
                </span>
              </button>
            </span>
            {!(isPro || isOnFreeTrial) && (
              <button
                onClick={() => {
                  setIsModalOpen(true);
                }}
                type="button"
                className="button text-center font-normal rounded-sm text-xs bg-slate-900 text-white px-2 p-1"
              >
                <span> Upgrade to PRO </span>
              </button>
            )}
          </div>
        </div>
        <div className=" global-settings h-full overflow-y-auto   p-2 ">
          {steps[currentStep - 1].component}
        </div>
        <div className=" bg-gray-200 mt-auto">
          <div
            className="text-sm px-3 py-2 text-white flex justify-between bg-green-500"
            style={{ display: !isPro && isOnFreeTrial ? "" : "none" }}
          >
            <div>
              Free trial ends in{" "}
              {calculateTimeRemaining(isOnFreeTrial)}
            </div>
            <div>
              <div
                onClick={() => {
                  setIsModalOpen(true);
                }}
                role="button"
                className="hover:underline font-semibold"
              >
                Upgrade Now
              </div>
            </div>
          </div>
          <div className="container flex justify-between items-center p-4">
            <button
              type="button"
              className={`button font-semibold ${
                currentStep === 1 ? "text-gray-500" : ""
              }`}
              disabled={currentStep === 1}
              onClick={() => {
                if (currentStep === 1) {
                  return;
                } else {
                  setCurrentStep(currentStep - 1);
                }
              }}
            >
              <span className="icon is-small">
                <FontAwesomeIcon icon={faAngleLeft} />
              </span>{" "}
              <span> Back </span>{" "}
            </button>
            <div className="font-bold">
              {currentStep} / {steps.length}
            </div>
            <button
              type="button"
              className={`button font-semibold ${
                currentStep === steps.length ? "text-gray-500" : ""
              }`}
              disabled={currentStep === steps.length}
              onClick={() => {
                if (currentStep === steps.length) {
                  return;
                } else {
                  setCurrentStep(currentStep + 1);
                }
              }}
            >
              {" "}
              <span> Next </span>{" "}
              <span className="icon is-small">
                <FontAwesomeIcon icon={faAngleRight} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
