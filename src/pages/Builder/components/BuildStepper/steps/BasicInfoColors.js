import { useDispatch, useSelector } from "react-redux";
import { updateSetting } from "../../../../../redux/globalSettingsSlice";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { updateMenuChangesCheck } from "../../../../../redux/menuSlice";

export default function BasicInfoColors(props) {
  const gs = useSelector((store) => store.globalSettings);
  const dispatch = useDispatch();

  const [subdomainAvailability, setSubdomainAvailability] =
    useState("");

  const { subdomainWhenLoaded } = useSelector((state) => state.menu);
  console.log("domrref", subdomainWhenLoaded);

  const [isValidSubdomain, setIsValidSubdomain] = useState(true);

  const [
    isSubdomainAvailabilityLoading,
    setIsSubdomainAvailabilityLoading,
  ] = useState(false);

  function be_checkSubdomainAvailability(subdomain) {
    console.log("here");
    return axios.get("http://localhost:8000/subdomainAvailability", {
      params: {
        subdomain,
      },
    });
  }
  function handleCheckSubdomainAvailability() {
    if (!isValidSubdomain) {
      return;
    }
    setIsSubdomainAvailabilityLoading(true);

    if (subdomainWhenLoaded === gs.subdomain) {
      setSubdomainAvailability("owned");
      dispatch(updateMenuChangesCheck(true));

      setTimeout(() => {
        setIsSubdomainAvailabilityLoading(false);
      }, 300);
      return;
    }

    be_checkSubdomainAvailability(gs.subdomain)
      .then((res) => {
        console.log("res", res);
        setSubdomainAvailability(res.data);
        if (res.data === "taken") {
          dispatch(updateMenuChangesCheck(false));
        }

        if (res.data === "free") {
          dispatch(updateMenuChangesCheck(true));
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setIsSubdomainAvailabilityLoading(false);
      });
  }

  function isValidSubdomainCheck(value) {
    // Use a regular expression to check if the value contains only small letters and dashes
    const regex = /^[a-z-]+$/;
    return regex.test(value);
  }
  function checkSubdomainStructure() {
    if (isValidSubdomainCheck(gs.subdomain)) {
      setIsValidSubdomain(true);
      dispatch(updateMenuChangesCheck(true));
    } else {
      setIsValidSubdomain(false);
      dispatch(updateMenuChangesCheck(false));
    }
  }

  //check for domain availability, useful for when they navigate further in stepper with wrong link
  // and when they come back they need the info still
  useEffect(() => {
    checkSubdomainStructure();
  }, []);

  return (
    <div className="p-2">
      <div className="field">
        <label
          htmlFor="websiteName"
          className="text-slate-900 font-bold mb-2 mt-3 block"
        >
          Menu Name
          <br />
          <span className="text-sm font-normal">
            (only visible in dashboard)
          </span>
        </label>{" "}
        <input
          value={gs.menuName}
          onChange={(e) => {
            dispatch(
              updateSetting({
                field: "menuName",
                value: e.target.value,
              })
            );
          }}
          type="text"
          id="menuName"
          placeholder="Website Name (for Dashboard)"
          className="bg-white w-full border-gray-300 rounded text-slate-800 border p-2 h-8"
        />
      </div>
      <div className="field">
        <label
          htmlFor="websiteName"
          className="text-slate-900 font-bold mb-2 mt-3 block"
        >
          Website name
        </label>{" "}
        <input
          value={gs.websiteName}
          onChange={(e) => {
            dispatch(
              updateSetting({
                field: "websiteName",
                value: e.target.value,
              })
            );
          }}
          type="text"
          id="websiteName"
          autoComplete="on"
          placeholder="My brand new website"
          className="bg-white w-full border-gray-300 rounded text-slate-800 border p-2 h-8"
        />
      </div>

      {/* ---- */}

      <div className="field">
        <label
          htmlFor="whatsappNumberConnected"
          className="text-slate-900 font-bold mb-2 mt-3 block"
        >
          Phone Number <br />
          <span className="text-sm font-normal">
            (used for whatsapp and calls)
          </span>
        </label>{" "}
        <input
          value={gs.whatsappNumberConnected}
          onChange={(e) => {
            dispatch(
              updateSetting({
                field: "whatsappNumberConnected",
                value: e.target.value,
              })
            );
          }}
          type="text"
          id="whatsappNumberConnected"
          autoComplete="on"
          placeholder="Phone number for Whatsapp"
          className="bg-white w-full border-gray-300 rounded text-slate-800 border p-2 h-8"
        />
      </div>

      {/* --- */}

      <div className="field">
        <label
          htmlFor="subdomain"
          className="text-slate-900 font-bold mb-2 mt-3 block"
        >
          Subdomain name
        </label>{" "}
        <div className="flex">
          <p className="control">
            <span className="text-normal">fastmenu.com/</span>
          </p>
          <div>
            <input
              value={gs.subdomain}
              onBlur={checkSubdomainStructure}
              onChange={(e) => {
                setSubdomainAvailability("");
                setIsValidSubdomain(true);
                dispatch(
                  updateSetting({
                    field: "subdomain",
                    value: e.target.value,
                  })
                );
              }}
              type="text"
              autoComplete="on"
              placeholder="mywebsite"
              className={`bg-white inline-block h-6 ml-1  rounded text-slate-800 border p-2 w-11/12 ${
                subdomainAvailability === "taken" || !isValidSubdomain
                  ? "border-red-300"
                  : subdomainAvailability === "owned" ||
                    subdomainAvailability === "free"
                  ? "border-green-300"
                  : "border-gray-300"
              }`}
            />
          </div>
        </div>
        <div>
          {!isValidSubdomain && (
            <span className="text-sm text-red-600">
              Subdomain can only contain small letters and dashes
            </span>
          )}

          {subdomainAvailability === "taken" && (
            <span className="text-sm text-red-600">
              This domain is not available
            </span>
          )}

          {subdomainAvailability === "owned" && (
            <span className="text-sm text-green-600">
              You already own this subdomain
            </span>
          )}

          {subdomainAvailability === "free" && (
            <span className="text-sm text-green-600">
              This domain is available
            </span>
          )}
        </div>
        <div>
          <button
            onClick={handleCheckSubdomainAvailability}
            type="button"
            className="mt-2 font-semibold text-sm text-white bg-blue-500 active:bg-blue-600 whitespace-nowrap text-center px-2 py-1 rounded border "
          >
            <span> Check availability </span>
            {isSubdomainAvailabilityLoading && (
              <span>
                <FontAwesomeIcon icon={faSpinner} />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ---- */}

      <div className="h-[1px] bg-slate-400 w-full my-4"></div>

      <div className="field">
        <label
          htmlFor="logoURL"
          className="text-slate-900 font-bold mb-2 mt-3 block"
        >
          Logo URL
        </label>{" "}
        <div className="control is-clearfix">
          <input
            value={gs.logoURL}
            onChange={(e) => {
              dispatch(
                updateSetting({
                  field: "logoURL",
                  value: e.target.value,
                })
              );
            }}
            type="text"
            id="logoURL"
            autoComplete="on"
            placeholder="My brand new website"
            className="bg-white border-gray-300 rounded text-slate-800 border w-full p-2 h-8"
          />
        </div>
      </div>

      <div className="field">
        <label
          htmlFor="faviconURL"
          className="text-slate-900 font-bold mb-2 mt-3 block"
        >
          Favicon URL
        </label>{" "}
        <div className="control is-clearfix">
          <input
            value={gs.faviconURL}
            onChange={(e) => {
              dispatch(
                updateSetting({
                  field: "faviconURL",
                  value: e.target.value,
                })
              );
            }}
            type="text"
            id="faviconURL"
            autoComplete="on"
            placeholder="My brand new website"
            className="bg-white w-full border-gray-300 rounded text-slate-800 border p-2 h-8"
          />
        </div>
      </div>

      <div className="flex align-middle items-center gap-2">
        <input
          value={gs.isNavbarFixed}
          onChange={(e) => {
            dispatch(
              updateSetting({
                field: "isNavbarFixed",
                value: e.target.checked,
              })
            );
          }}
          type="checkbox"
          id="isNavbarFixed"
          autoComplete="on"
          placeholder="My brand new website"
          className="bg-white  border-gray-300 rounded text-slate-800 border p-2 h-8"
        />
        <label
          htmlFor="isNavbarFixed"
          className="text-slate-900 inline-block font-bold mb-2 mt-3 "
        >
          Fixed Navbar
        </label>{" "}
      </div>

      <div className="h-[1px] bg-slate-400 w-full my-4"></div>

      {/* --- */}
      <h2 className="text-lg">Hero/Header Settings</h2>

      <div className="flex align-middle items-center gap-2">
        <input
          value={gs.hero.isShown}
          onChange={(e) => {
            dispatch(
              updateSetting({
                field: "hero.isShown",
                value: e.target.checked,
              })
            );
          }}
          type="checkbox"
          id="isHeaderShown"
          autoComplete="on"
          placeholder="My brand new website"
          className="bg-white  border-gray-300 rounded text-slate-800 border p-2 h-8"
        />
        <label
          htmlFor="isHeaderShown"
          className="text-slate-900 inline-block font-bold mb-2 mt-3 "
        >
          Show Hero
        </label>{" "}
      </div>
      <div className="field">
        <label
          htmlFor="headerTitle"
          className="text-slate-900 font-bold mb-2 mt-3 block"
        >
          Title
        </label>{" "}
        <div className="flex align-middle gap-1">
          <input
            value={gs.hero.title}
            onChange={(e) => {
              dispatch(
                updateSetting({
                  field: "hero.title",
                  value: e.target.value,
                })
              );
            }}
            type="text"
            id="headerTitle"
            autoComplete="on"
            placeholder="My brand new website"
            className="bg-white w-10/12 border-gray-300 rounded text-slate-800 border p-2 h-8"
          />
          <input
            value={gs.hero.titleColor}
            onChange={(e) => {
              dispatch(
                updateSetting({
                  field: "hero.titleColor",
                  value: e.target.value,
                })
              );
            }}
            type="color"
            id="headerTitleColor"
            autoComplete="on"
            placeholder="My brand new website"
            className="bg-white w-2/12 border-gray-300 rounded text-slate-800 border  h-8"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="headersubheading"
          className="text-slate-900 font-bold mb-2 mt-3 block"
        >
          Subheading
        </label>{" "}
        <div className="flex align-middle gap-1">
          <input
            value={gs.hero.subheading}
            onChange={(e) => {
              dispatch(
                updateSetting({
                  field: "hero.subheading",
                  value: e.target.value,
                })
              );
            }}
            type="text"
            id="headerSubheading"
            autoComplete="on"
            placeholder="My brand new website"
            className="bg-white w-10/12 border-gray-300 rounded text-slate-800 border p-2 h-8"
          />
          <input
            value={gs.hero.subheadingColor}
            onChange={(e) => {
              dispatch(
                updateSetting({
                  field: "hero.subheadingColor",
                  value: e.target.value,
                })
              );
            }}
            type="color"
            id="subheadingColorColor"
            autoComplete="on"
            placeholder="My brand new website"
            className="bg-white w-2/12 border-gray-300 rounded text-slate-800 border  h-8"
          />
        </div>
      </div>
      <div className="field">
        <label
          htmlFor="heroImage"
          className="text-slate-900 font-bold mb-2 mt-3 block"
        >
          Hero Background Image
        </label>{" "}
        <div className="control is-clearfix">
          <input
            value={gs.hero.image}
            onChange={(e) => {
              dispatch(
                updateSetting({
                  field: "hero.image",
                  value: e.target.value,
                })
              );
            }}
            type="text"
            id="heroImage"
            autoComplete="on"
            placeholder="My brand new website"
            className="bg-white w-full border-gray-300 rounded text-slate-800 border p-2 h-8"
          />
        </div>
      </div>
      {/* --- */}

      <div className="h-[1px] bg-slate-400 w-full my-4"></div>
      {/* --- */}

      <div className="field">
        <label
          htmlFor="menuDescription"
          className="text-slate-900 font-bold mb-2 mt-3 block"
        >
          Menu Description
        </label>{" "}
        <div className="control is-clearfix">
          <textarea
            value={gs.menuDescription}
            name="menuDescription"
            className="border w-full border-slate-500 p-2"
            id="menuDescription"
            cols="28"
            rows="4"
            onChange={(e) => {
              dispatch(
                updateSetting({
                  field: "menuDescription",
                  value: e.target.value,
                })
              );
            }}
          ></textarea>
        </div>
      </div>
    </div>
  );
}
