import { useDispatch, useSelector } from "react-redux";
import { updateSetting } from "../../../../../redux/globalSettingsSlice";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { updateMenuChangesCheck } from "../../../../../redux/menuSlice";
import { api } from "../../../../../api/backend";

import { ConfirmDialog } from "primereact/confirmdialog"; // For <ConfirmDialog /> component
import { confirmDialog } from "primereact/confirmdialog"; // For confirmDialog method
import { Button } from "primereact/button";
import toast from "react-hot-toast";

export default function BasicInfoColors(props) {
  const gs = useSelector((store) => store.globalSettings);
  const { isPro, isOnFreeTrial } = useSelector((store) => store.menu);
  const [canEditSubdomain, setCanEditSubdomain] = useState(false);
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

    api
      .be_checkSubdomainAvailability(gs.subdomain)
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
    const regex = /^[a-z0-9-]+$/;
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

  function handleChangeDialog() {
    const accept = () => {
      setCanEditSubdomain(true);

      toast.success("Subdomain updated");
    };

    confirmDialog({
      message: (
        <div>
          Are you sure you want to change your subdomain?
          <br />
          This will affect existing the QR codes
        </div>
      ),
      header: "Confirmation",
      icon: "fa fa-exclamation-triangle",
      acceptClassName: "m-1 px-2 py-1",
      rejectClassName: "m-1 px-2 py-1 border",
      accept,
    });
  }

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
        </label>
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
        </label>
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
        </label>
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
        <ConfirmDialog />

        <label
          htmlFor="subdomain"
          className="text-slate-900 font-bold mb-2 mt-3 block"
        >
          Subdomain name
        </label>
        <div className="flex flex-col">
          <p className="control">
            <span className="text-normal">
              www.fastmenu.com/menu/
            </span>
          </p>
          <div>
            <input
              disabled={!canEditSubdomain}
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
              className={` inline-block h-6   rounded text-slate-800 border p-2 w-11/12 ${
                subdomainAvailability === "taken" || !isValidSubdomain
                  ? "border-red-300"
                  : subdomainAvailability === "owned" ||
                    subdomainAvailability === "free"
                  ? "border-green-300"
                  : "border-gray-300"
              }
              ${
                !canEditSubdomain
                  ? "bg-gray-200 text-slate-400"
                  : "bg-white"
              }
              `}
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
          <button
            onClick={handleChangeDialog}
            type="button"
            className="mt-2 font-semibold text-xs text-slate-800 bg-red-300 active:bg-blue-600 whitespace-nowrap text-center px-2 py-1 rounded border "
          >
            Change subdomain
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
        </label>
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
          htmlFor="websiteTitle"
          className="text-slate-900 font-bold mb-2 mt-3 block"
        >
          Website Title
        </label>
        <div className="control is-clearfix">
          <input
            disabled={!(isPro || isOnFreeTrial)}
            value={gs.websiteTitle}
            onChange={(e) => {
              dispatch(
                updateSetting({
                  field: "websiteTitle",
                  value: e.target.value,
                })
              );
            }}
            type="text"
            id="websiteTitle"
            autoComplete="on"
            placeholder="Webiste Title"
            className={` border-gray-300 rounded text-slate-800 border w-full p-2 h-8 ${
              !(isPro || isOnFreeTrial) ? "bg-gray-200" : "bg-white"
            } `}
          />
        </div>
      </div>

      <div className="field">
        <label
          htmlFor="faviconURL"
          className="text-slate-900 font-bold mb-2 mt-3 block"
        >
          Favicon URL
        </label>
        <div className="control is-clearfix">
          <input
            value={gs.faviconURL}
            disabled={!(isPro || isOnFreeTrial)}
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
            className={` border-gray-300 rounded text-slate-800 border w-full p-2 h-8 ${
              !(isPro || isOnFreeTrial) ? "bg-gray-200" : "bg-white"
            } `}
          />
        </div>
      </div>

      <div className="flex align-middle items-center gap-2">
        <input
          checked={gs.isNavbarFixed}
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
        </label>
      </div>

      <div className="h-[1px] bg-slate-400 w-full my-4"></div>

      {/* --- */}
      <h2 className="text-lg">Hero/Header Settings</h2>

      <div className="field">
        <div className="text-slate-900 font-bold mb-2 mt-3 block">
          Header Backround Color
        </div>
        <input
          value={gs.theme.headerColor}
          onChange={(e) => {
            dispatch(
              updateSetting({
                field: "theme.headerColor",
                value: e.target.value,
              })
            );
          }}
          type="color"
          id="themeHeaderColor"
          autoComplete="on"
          className="bg-white w-2/12 border-gray-300 rounded text-slate-800 border  h-8"
        />
      </div>

      <div className="flex align-middle items-center gap-2">
        <input
          checked={gs.hero.isShown}
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
        </label>
      </div>
      <div className="field">
        <label
          htmlFor="headerTitle"
          className="text-slate-900 font-bold mb-2 mt-3 block"
        >
          Title
        </label>
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
        </label>
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
        </label>
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
        <div className="text-slate-900 font-bold mb-2 mt-3 block">
          Menu Backround Color
        </div>
        <input
          value={gs.theme.backgroundColor}
          onChange={(e) => {
            dispatch(
              updateSetting({
                field: "theme.backgroundColor",
                value: e.target.value,
              })
            );
          }}
          type="color"
          id="themeBackgroundColor"
          autoComplete="on"
          className="bg-white w-2/12 border-gray-300 rounded text-slate-800 border  h-8"
        />
      </div>
      <div className="field">
        <label
          htmlFor="menuDescription"
          className="text-slate-900 font-bold mb-2 mt-3 block"
        >
          Menu Description
        </label>
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
      {/* --- */}
      <div className="h-[1px] bg-slate-400 w-full my-4"></div>
      {/* --- */}
      <h2 className="text-lg">Footer Settings</h2>

      <div className="flex align-middle items-center gap-2">
        <input
          value={gs.footer.isShown}
          onChange={(e) => {
            dispatch(
              updateSetting({
                field: "footer.isShown",
                value: e.target.checked,
              })
            );
          }}
          type="checkbox"
          id="isFooterShown"
          autoComplete="on"
          placeholder="My brand new website"
          className="bg-white  border-gray-300 rounded text-slate-800 border p-2 h-8"
        />
        <label
          htmlFor="isFooterShown"
          className="text-slate-900 inline-block font-bold mb-2 mt-3 "
        >
          Show Footer
        </label>
      </div>

      <div className="flex align-middle items-center gap-2">
        <input
          checked={gs.footer.isFreeMenuTrademarkShown}
          disabled={!(isPro || isOnFreeTrial)}
          onChange={(e) => {
            dispatch(
              updateSetting({
                field: "footer.isFreeMenuTrademarkShown",
                value: e.target.checked,
              })
            );
          }}
          type="checkbox"
          id="isFastMenuTrademarkShown"
          autoComplete="on"
          placeholder="My brand new website"
          className="bg-white  border-gray-300 rounded text-slate-800 border  p-2 h-8"
        />
        <label
          htmlFor="isFastMenuTrademarkShown"
          className="text-slate-900 inline-block font-bold  my-2 "
        >
          Show FastMenu Trademarks
        </label>
      </div>
      {!(isPro || isOnFreeTrial) && (
        <div className="text-sm font-normal mb-2 text-gray-600">
          (PRO version only)
        </div>
      )}
      {/*  */}

      <div className="field">
        <label
          htmlFor="footerText"
          className="text-slate-900 font-bold mb-2 mt-3 block"
        >
          Footer Text
        </label>
        <div className="control is-clearfix">
          <textarea
            value={gs.footer.text}
            name="footerText"
            className="border w-full border-slate-500 p-2"
            id="footerText"
            cols="28"
            rows="4"
            onChange={(e) => {
              dispatch(
                updateSetting({
                  field: "footer.text",
                  value: e.target.value,
                })
              );
            }}
          ></textarea>
        </div>
      </div>
      {/*  */}

      <div className="field">
        <div className="text-slate-900 font-bold mb-2 mt-3 block">
          Footer Background Color
        </div>
        <input
          value={gs.footer.backgroundColor}
          onChange={(e) => {
            dispatch(
              updateSetting({
                field: "footer.backgroundColor",
                value: e.target.value,
              })
            );
          }}
          type="color"
          id="footerBackgroundColor"
          autoComplete="on"
          className="bg-white w-2/12 border-gray-300 rounded text-slate-800 border  h-8"
        />
      </div>

      <div className="field">
        <div className="text-slate-900 font-bold mb-2 mt-3 block">
          Footer Text Color
        </div>
        <input
          value={gs.footer.textColor}
          onChange={(e) => {
            dispatch(
              updateSetting({
                field: "footer.textColor",
                value: e.target.value,
              })
            );
          }}
          type="color"
          id="footerTextColor"
          autoComplete="on"
          className="bg-white w-2/12 border-gray-300 rounded text-slate-800 border  h-8"
        />
      </div>

      {/*  */}
      {/*  */}

      <div className="flex align-middle items-center gap-2">
        <input
          checked={gs.footer.isFacebookLinkShown}
          onChange={(e) => {
            dispatch(
              updateSetting({
                field: "footer.isFacebookLinkShown",
                value: e.target.checked,
              })
            );
          }}
          type="checkbox"
          id="isFacebookLinkShown"
          autoComplete="on"
          className="bg-white  border-gray-300 rounded text-slate-800 border p-2 h-8"
        />
        <label
          htmlFor="isFacebookLinkShown"
          className="text-slate-900 inline-block font-bold mb-2 mt-3 "
        >
          Show Facebook
        </label>
      </div>
      <div className="flex align-middle items-center gap-2">
        <input
          checked={gs.footer.isInstagramLinkShown}
          onChange={(e) => {
            dispatch(
              updateSetting({
                field: "footer.isInstagramLinkShown",
                value: e.target.checked,
              })
            );
          }}
          type="checkbox"
          id="isInstagramLinkShown"
          autoComplete="on"
          className="bg-white  border-gray-300 rounded text-slate-800 border p-2 h-8"
        />
        <label
          htmlFor="isInstagramLinkShown"
          className="text-slate-900 inline-block font-bold mb-2 mt-3 "
        >
          Show Instagram
        </label>
      </div>

      <div className="flex align-middle items-center gap-2">
        <input
          checked={gs.footer.isTiktokLinkShown}
          onChange={(e) => {
            dispatch(
              updateSetting({
                field: "footer.isTiktokLinkShown",
                value: e.target.checked,
              })
            );
          }}
          type="checkbox"
          id="isTiktokLinkShown"
          autoComplete="on"
          className="bg-white  border-gray-300 rounded text-slate-800 border p-2 h-8"
        />
        <label
          htmlFor="isTiktokLinkShown"
          className="text-slate-900 inline-block font-bold mb-2 mt-3 "
        >
          Show Tiktok
        </label>
      </div>

      <div className="flex align-middle items-center gap-2">
        <input
          checked={gs.footer.isTwitterLinkShown}
          onChange={(e) => {
            dispatch(
              updateSetting({
                field: "footer.isTwitterLinkShown",
                value: e.target.checked,
              })
            );
          }}
          type="checkbox"
          id="isTwitterLinkShown"
          autoComplete="on"
          className="bg-white  border-gray-300 rounded text-slate-800 border p-2 h-8"
        />
        <label
          htmlFor="isTwitterLinkShown"
          className="text-slate-900 inline-block font-bold mb-2 mt-3 "
        >
          Show Twitter
        </label>
      </div>

      <div className="field">
        <label
          htmlFor="facebookURL"
          className="text-slate-900 font-bold mb-2 mt-3 block"
        >
          Link to your Facebook page
        </label>
        <input
          value={gs.footer.facebookURL}
          disabled={!gs.footer.isFacebookLinkShown}
          onChange={(e) => {
            dispatch(
              updateSetting({
                field: "footer.facebookURL",
                value: e.target.value,
              })
            );
          }}
          type="text"
          id="facebookURL"
          placeholder=""
          className={` w-full border-gray-300 rounded text-slate-800 border p-2 h-8
          ${
            !gs.footer.isFacebookLinkShown
              ? "bg-gray-200"
              : "bg-white"
          }
          `}
        />
      </div>

      <div className="field">
        <label
          htmlFor="instagramURL"
          className="text-slate-900 font-bold mb-2 mt-3 block"
        >
          Link to your Instagram page
        </label>
        <input
          value={gs.footer.instagramURL}
          disabled={!gs.footer.isInstagramLinkShown}
          onChange={(e) => {
            dispatch(
              updateSetting({
                field: "footer.instagramURL",
                value: e.target.value,
              })
            );
          }}
          type="text"
          id="instagramURL"
          placeholder=""
          className={` w-full border-gray-300 rounded text-slate-800 border p-2 h-8
          ${
            !gs.footer.isInstagramLinkShown
              ? "bg-gray-200"
              : "bg-white"
          }
          `}
        />
      </div>

      <div className="field">
        <label
          htmlFor="tiktokURL"
          className="text-slate-900 font-bold mb-2 mt-3 block"
        >
          Link to your Tiktok page
        </label>
        <input
          value={gs.footer.tiktokURL}
          disabled={!gs.footer.isTiktokLinkShown}
          onChange={(e) => {
            dispatch(
              updateSetting({
                field: "footer.tiktokURL",
                value: e.target.value,
              })
            );
          }}
          type="text"
          id="tiktokURL"
          placeholder=""
          className={` w-full border-gray-300 rounded text-slate-800 border p-2 h-8
          ${!gs.footer.isTiktokLinkShown ? "bg-gray-200" : "bg-white"}
          `}
        />
      </div>

      <div className="field">
        <label
          htmlFor="twitterURL"
          className="text-slate-900 font-bold mb-2 mt-3 block"
        >
          Link to your Twitter page
        </label>
        <input
          value={gs.footer.twitterURL}
          disabled={!gs.footer.isTwitterLinkShown}
          onChange={(e) => {
            dispatch(
              updateSetting({
                field: "footer.twitterURL",
                value: e.target.value,
              })
            );
          }}
          type="text"
          id="twitterURL"
          placeholder=""
          className={` w-full border-gray-300 rounded text-slate-800 border p-2 h-8
          ${
            !gs.footer.isTwitterLinkShown ? "bg-gray-200" : "bg-white"
          }
          `}
        />
      </div>

      {/* ---- */}
    </div>
  );
}
