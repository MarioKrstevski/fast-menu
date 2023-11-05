import { useState } from "react";
import { useForm } from "react-hook-form";

export default function S1DataLoadInput(props) {
  const [isSuccesfullyConnected, setIsSuccesfullyConnected] =
    useState(false);

  function tryConnectToSpreadsheet(e) {
    setTimeout(() => {
      setIsSuccesfullyConnected(true);
      e.target.blur();
    }, 500);
  }

  return (
    <div className="p-2">
      <input
        type="text"
        autocomplete="on"
        onChange={tryConnectToSpreadsheet}
        placeholder="Insert your spreadsheet url or id"
        autofocus="autofocus"
        class={`input is-success is-large w-[94%] placeholder-gray-500 border rounded p-2  ${
          isSuccesfullyConnected
            ? "border-green-400"
            : "border-black "
        }`}
      />
      <p class="mt-4 text-sm text-gray-600">
        The ID is the value between the "/d/" and the "/edit" in the
        URL of your spreadsheet.{" "}
      </p>
      <div class="mt-4 p-3 text-sm bg-gray-100 break-words text-gray-600 rounded-lg">
        https://docs.google.com/spreadsheets/d/
        <span class="text-green-800 font-bold">spreadsheetId</span>
        /edit#gid=0
      </div>
    </div>
  );
}
