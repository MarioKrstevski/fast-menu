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
import { updateMenu } from "../../../../redux/menuSlice";
import axios from "axios";

const steps = [
  { component: <DataLoadInput />, title: "Insert Spreadsheet" },
  { component: <BasicInfoColors />, title: "Website Info" },
  { component: <CardDesign />, title: "Items Design" },
  { component: <QRCodeInfo />, title: "QR Code" },
];
export default function BuilderStepper(props) {
  const gs = useSelector((state) => state.globalSettings);
  const dispatch = useDispatch();
  const menuId = useSelector((store) => store.menu.menuId);
  const menu = useSelector((store) => store.menu.menu);

  function be_loadMenuItems(menuId) {
    console.log("trying to load menu item", menuId);
    axios
      .get("http://localhost:8000/menu", {
        params: {
          menuId,
        },
      })
      .then((res) => {
        dispatch(updateMenu(res.data.menuItems));
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  function handleLoadMenu() {
    be_loadMenuItems(menuId);
  }

  //load menu if spreadSheetURL is setup and they haven't been loaded before
  useEffect(() => {
    console.log("menu", menu);
    const menuIsLoaded = menu.length !== 0;
    if (!menuIsLoaded && gs.spreadSheetURL) {
      handleLoadMenu();
    }
  }, []);
  window.ss = function () {
    console.log(gs);
    console.log(menu);
  };
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <div className="w-[400px] overflow-x-hidden border-r-2 h-full border-r-gray-400 flex flex-col">
      <div
        id="build-stepper"
        className="flex  justify-between items-center p-4 border-b h-20"
      >
        <div className="text-lg font-bold w-[120px] ">
          {" "}
          {steps[currentStep - 1].title}
        </div>
        <div className="flex items-center ">
          <span
            data-label="Sync spreadsheet"
            className="is-primary is-left is-medium b-tooltip"
            style={{ transitionDelay: "0ms" }}
          >
            <button
              onClick={handleLoadMenu}
              type="button"
              className="button w-8 is-small mr-2"
            >
              <span title="Sync Spreadsheet">
                <FontAwesomeIcon icon={faSyncAlt} />
              </span>
            </button>
          </span>
          <button
            type="button"
            className="button text-center font-normal text-gray-700 rounded-sm text-xs bg-slate-900 text-white px-2 p-1"
          >
            <span> Upgrade to PRO </span>
          </button>
        </div>
      </div>
      <div className=" global-settings h-full overflow-y-auto   p-2 ">
        {steps[currentStep - 1].component}
      </div>
      <div className=" bg-gray-200 mt-auto">
        <div
          className="text-sm px-4 py-2 text-white font-semibold flex justify-between bg-green-500"
          style={{ display: "none" }}
        >
          <div>Free trial ends in 5 days</div>
          <div>
            <div role="button" className="hover:underline">
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
  );
}
