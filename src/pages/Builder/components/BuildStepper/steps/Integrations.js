import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { updateSetting } from "../../../../../redux/globalSettingsSlice";
import { addOrReplaceStyle } from "../../../../../helpers/helperFunctions";

export default function Integrations(props) {
  const gs = useSelector((store) => store.globalSettings);
  const { isPro, isOnFreeTrial } = useSelector((store) => store.menu);
  const suggestionRef = useRef();
  const customClassesCodeRef = useRef();
  const autocompleteRef = useRef("");
  const dispatch = useDispatch();

  const classes = [
    "fm-title-description-wrapper",
    "fm-title",
    "fm-description",
  ];

  const customizedClasses = classes.map(
    (c) => "." + gs.client + "-" + c
  );
  customizedClasses.sort((a, b) => a.length - b.length);
  // console.log("customizedClasses", customizedClasses);

  function generateWidgetCodeText() {
    let widgetDetails = "";
    widgetDetails += "Copy these parts and put them \n";
    widgetDetails += "in the right places of your website \n";
    widgetDetails += " \n";
    if (isPro || isOnFreeTrial) {
      widgetDetails += "<!-- This goes in the <head> tag --> \n";
      widgetDetails +=
        "  <link rel='stylesheet' href='https://mariokrstevski.github.io/fastmenu-widget/static/css/main.css' /> \n";
      widgetDetails += " \n";
      widgetDetails +=
        "<!-- Use this widget wherever you want the menu items to show up -->  \n";
      widgetDetails +=
        " <fastmenu-widget subdomain='" +
        gs.subdomain +
        "'></fastmenu-widget> \n";
      widgetDetails += " \n";
      widgetDetails +=
        "<!-- This goes at the end before you close the </body> tag  -->  \n";
      widgetDetails +=
        " <script defer='defer' src='https://mariokrstevski.github.io/fastmenu-widget/static/js/main.js'></script>\n";
    }

    return widgetDetails;
  }

  function handleApplyCustomCSS(e) {
    console.log("CSS text", e.target.value);
    dispatch(
      updateSetting({
        field: "card.appliedCustomCss",
        value: gs.card.customCss,
      })
    );

    addOrReplaceStyle(gs.card.customCss);
  }

  function handleTab(e) {
    if (e.code === "Tab") {
      e.preventDefault();
      customClassesCodeRef.current.value =
        customClassesCodeRef.current.value + autocompleteRef.current;

      autocompleteRef.current = "";
    }
    handleCreateSuggestion(e);
  }
  function handleCreateSuggestion(e) {
    // console.log("e", e.target.value);
    suggestionRef.current.innerHTML = "";

    const words = e.target.value.split(/\s+/);
    const lastWord = words.at(-1);

    let regex = new RegExp("^" + lastWord, "i");
    // console.log("regex", regex);
    if (lastWord.startsWith(".")) {
      // console.log("valid");
      for (const clas of customizedClasses) {
        let c = clas;
        // console.log("c", c, lastWord);
        if (c === lastWord) {
          continue;
        }
        // if lastword is included in class
        if (regex.test(c)) {
          const charactersToRemove = lastWord.length;
          const removedCharacters = c.substring(
            0,
            charactersToRemove
          );
          const remainingCharacters = c.substring(charactersToRemove);

          // console.log("removed", removedCharacters);
          // console.log("remain", remainingCharacters);

          autocompleteRef.current = remainingCharacters;
          suggestionRef.current.innerHTML =
            e.target.value + remainingCharacters;
          // console.log("customClassesCodeRef", customizedClasses);
          break;
        }
        autocompleteRef.current = "";
      }
    }
  }

  return (
    <div className="p-2 relative">
      <div className="font-bold mt-2">Embed widget</div>
      {!(isPro || isOnFreeTrial) && (
        <div className="text-sm font-normal text-gray-600">
          (PRO version only)
        </div>
      )}
      <textarea
        className={` rounded p-2 my-2 w-full    
        ${
          false || !(isPro || isOnFreeTrial)
            ? "bg-gray-100 text-gray-300 resize-none overflow-y-hidden select-none hover:cursor-not-allowed"
            : "border border-black bg-white select-all"
        }
        `}
        disabled={!(isPro || isOnFreeTrial)}
        name="widget"
        cols="28"
        rows={!(isPro || isOnFreeTrial) ? "2" : "10"}
        value={generateWidgetCodeText()}
      ></textarea>

      <div className="font-bold mt-2">Custom CSS</div>

      {(isPro || isOnFreeTrial) && (
        <div className="css-edit">
          <div className="textarea-wrapper relative bg-white w-full h-[220px] border border-black rounded">
            <textarea
              value={gs.card.customCss || ""}
              name="menuDescription"
              className={`border-none outline-none bg-transparent absolute p-2 z-30  text-black resize-none  break-all whitespace-pre-line`}
              style={{ width: "inherit", height: "inherit" }}
              id="menuDescription"
              cols="28"
              rows="4"
              ref={customClassesCodeRef}
              onKeyDown={handleTab}
              onChange={(e) => {
                dispatch(
                  updateSetting({
                    field: "card.customCss",
                    value: e.target.value,
                  })
                );
                handleCreateSuggestion(e);
              }}
            ></textarea>
            <div
              id="suggestion"
              ref={suggestionRef}
              className={`border-none border outline-none bg-transparent absolute p-2  z-20 flex text-gray-400  break-all whitespace-pre-line `}
              style={{ width: "inherit", height: "inherit" }}
            ></div>
          </div>
        </div>
      )}
      {!(isPro || isOnFreeTrial) && (
        <div className="text-sm font-normal text-gray-600">
          (PRO version only)
        </div>
      )}
      <button
        disabled={!(isPro || isOnFreeTrial)}
        onClick={(e) => {
          handleApplyCustomCSS(e);
        }}
        className={` text-gray-800 font-semibold py-1 px-2 my-2 border border-gray-400 rounded shadow  ${
          !(isPro || isOnFreeTrial)
            ? "bg-gray-300"
            : " bg-white hover:bg-gray-100"
        } `}
      >
        Apply Custom CSS
      </button>

      {(isPro || isOnFreeTrial) && (
        <div className="border p-1 text-slate-700">
          <div className="mb-2"> Available classes are:</div>
          <ul className="text-sm list-disc pl-4 ">
            {customizedClasses.map((c) => (
              <li className="underline mb-1">{c}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
