import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateGlobalSettings,
  updateSetting,
} from "../../../../../redux/globalSettingsSlice";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { updateMenu } from "../../../../../redux/menuSlice";

export default function DataLoadInput(props) {
  const [isSuccesfullyConnected, setIsSuccesfullyConnected] =
    useState(false);
  const [csvFile, setCSVFile] = useState(null);
  const [isFileSubmitted, setIsFileSubmitted] = useState(false);
  const [isValidSheetsLink, setIsValidSheetsLink] = useState(true);
  const gs = useSelector((store) => store.globalSettings);
  const menuId = useSelector((store) => store.menu.menuId);
  const dispatch = useDispatch();

  function be_loadMenuItems() {
    axios
      .get("http://localhost:8000/menuItems", {
        params: {
          newLink: gs.spreadSheetURL,
        },
      })
      .then((res) => {
        dispatch(updateMenu(res.data.menuItems));
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  function checkForValidSpreadsheetLink(link) {
    // Regular expression to match the correct link structure
    const regex =
      /https:\/\/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9_-]+)\/edit/;

    // Use the regular expression to check if the link matches
    return regex.test(link);
  }
  function reloadMenuFromNewSheetURL(e) {
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
  function handleLoadMenuFromSheets() {
    be_loadMenuItems();
  }
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("csvFile", csvFile);

    const url = "http://localhost:8000/upload";
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => {
        setIsFileSubmitted(true);
      })
      .catch((err) => {});
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
          onChange={reloadMenuFromNewSheetURL}
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
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 my-2 border border-gray-400 rounded shadow"
          onClick={handleLoadMenuFromSheets}
        >
          Sync Menu
        </button>
      </div>
      <div className="my-4 break-words">
        <label htmlFor="spreadsheetupload">
          Select file from device
        </label>
        <input
          className="w-full"
          id="spreadsheetupload"
          type="file"
          name="csvFile"
          accept=".csv"
          onChange={handleFileChange}
        />
        <button
          disabled={!csvFile}
          className={`my-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${
            !csvFile ? "bg-gray-400" : ""
          }`}
          onClick={handleSubmit}
        >
          Submit
        </button>
        {isFileSubmitted && (
          <>
            <FontAwesomeIcon
              icon={faCheck}
              className="mx-2 text-green-800"
            />
            <span className="text-sm text-green-800">Done</span>
          </>
        )}
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
    </div>
  );
}
