import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSetting } from "../../../../../redux/globalSettingsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "primereact/dropdown";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { updateMenu } from "../../../../../redux/menuSlice";
import { api } from "../../../../../api/backend";
import { checkForValidSpreadsheetLink } from "../../../../../helpers/helperFunctions";
import { sheetOptions } from "../../../../../constants/options";

export default function DataLoadInput(props) {
  const [isSuccesfullyConnected, setIsSuccesfullyConnected] =
    useState(false);
  const [csvFile, setCSVFile] = useState(null);
  const [isFileSubmitted, setIsFileSubmitted] = useState(false);
  const [isValidSheetsLink, setIsValidSheetsLink] = useState(true);
  const [selectedSheet, setSelectedSheet] = useState(null);

  const [newSheetConnected, setNewSheetConnected] = useState(false);
  const gs = useSelector((store) => store.globalSettings);
  const menuId = useSelector((store) => store.menu.menuId);
  const dispatch = useDispatch();

  function validateSheetURL(e) {
    setSelectedSheet(null);
    setIsValidSheetsLink(true);

    dispatch(
      updateSetting({
        field: "spreadSheetURL",
        value: e.target.value,
      })
    );

    const isValidLink = checkForValidSpreadsheetLink(e.target.value);
    if (!isValidLink) {
      setIsValidSheetsLink(false);
    }
  }
  /**
   * Used when we enter new spreadsheetURL and we call this function,
   * to update the spreadsheetURL with the new one, and we also load
   * the items from the sheet and put them in our db and get the items
   */
  function handleConnectNewSheetForMenu() {
    api
      .be_syncNewSheets(gs.spreadSheetURL, menuId)
      .then((res) => {
        console.log("New sheet items ", res);
        setNewSheetConnected(true);
        setTimeout(() => {
          setNewSheetConnected(false);
        }, 850);
        dispatch(updateMenu(res.data.items));
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  const handleLoadItemsFromCSV = () => {
    const formData = new FormData();
    formData.append("csvFile", csvFile);
    formData.append("menuId", menuId);

    api
      .be_uploadFromCSV(formData)
      .then((res) => {
        console.log("Loaded items from CSV ", res);
        dispatch(updateMenu(res.data.items));

        setIsFileSubmitted("success");
        setTimeout(() => {
          setIsFileSubmitted(false);
        }, 850);
      })
      .catch((err) => {
        setIsFileSubmitted("error");
      });
  };
  const handleFileChange = (e) => {
    setCSVFile(e.target.files[0]);
  };

  return (
    <div className="p-2">
      <div className="mb-4 break-words">
        <label htmlFor="spreadsheet" className="my-2">
          Spreadsheet URL
        </label>
        <input
          id="spreadsheet"
          type="text"
          value={gs.spreadSheetURL}
          autoComplete="on"
          onChange={validateSheetURL}
          placeholder="Insert your spreadsheet url or id"
          autoFocus={"autofocus"}
          className={`input is-success is-large w-[94%] placeholder-gray-500 border rounded p-2  ${
            isSuccesfullyConnected
              ? "border-green-400"
              : "border-black "
          }`}
        />
        {!isValidSheetsLink && (
          <div className="text-red-500 text-sm">
            The link is invalid, correct it
          </div>
        )}
      </div>
      <div className="text-sm">
        Click to load items from spreadsheet{" "}
      </div>
      <div>
        <button
          disabled={!isValidSheetsLink}
          className={` text-gray-800 font-semibold py-1 px-2 my-2 border border-gray-400 rounded shadow
          ${
            !isValidSheetsLink
              ? "bg-gray-300 "
              : "bg-white hover:bg-gray-100 "
          }
          `}
          onClick={handleConnectNewSheetForMenu}
        >
          Load
        </button>
        {newSheetConnected && (
          <FontAwesomeIcon
            icon={faCheckCircle}
            fade
            className="text-green-500 ml-1"
            size="lg"
          />
        )}
      </div>
      <div className="my-4 break-words">
        <label htmlFor="spreadsheetupload" className="my-1 block">
          Upload csv file from device
        </label>
        <input
          className="w-full"
          id="spreadsheetupload"
          type="file"
          name="csvFile"
          accept=".csv"
          onChange={handleFileChange}
        />
        <div className="text-sm mt-3">
          Click to load items from csv
        </div>
        <div>
          <button
            disabled={!csvFile}
            className={` text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow
          ${!csvFile ? "bg-gray-300 " : "bg-white hover:bg-gray-100 "}
          `}
            onClick={handleLoadItemsFromCSV}
          >
            Load csv
          </button>
          {isFileSubmitted && (
            <FontAwesomeIcon
              icon={faCheckCircle}
              fade
              className="text-green-500 ml-1"
              size="lg"
            />
          )}
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        The ID is the value between the "/d/" and the "/edit" in the
        URL of your spreadsheet.{" "}
      </p>
      <div className="mt-4 p-3 text-sm bg-gray-100 break-words text-gray-600 rounded-lg">
        https://docs.google.com/spreadsheets/d/
        <span className="text-green-800 font-bold">
          spreadsheetId
        </span>
        /edit#gid=0
      </div>

      <Dropdown
        value={selectedSheet}
        onChange={(e) => {
          console.log("e");
          setSelectedSheet(e.value);
          dispatch(
            updateSetting({
              field: "spreadSheetURL",
              value: e.value.spreadSheetURL,
            })
          );
        }}
        options={sheetOptions}
        optionLabel="name"
        placeholder="Select Menu"
        className="w-full mt-4 border md:w-14rem"
      />
    </div>
  );
}
