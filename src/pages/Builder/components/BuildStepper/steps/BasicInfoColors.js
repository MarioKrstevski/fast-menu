import { useDispatch, useSelector } from "react-redux";
import { updateSetting } from "../../../../../redux/globalSettingsSlice";

export default function BasicInfoColors(props) {
  const gs = useSelector((store) => store.globalSettings);
  const dispatch = useDispatch();

  return (
    <div className="p-2">
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
          Phone Number
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
          placeholder="My brand new website"
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
              onChange={(e) => {
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
              className="bg-white inline-block h-6 ml-1 border-gray-300 rounded text-slate-800 border p-2 w-11/12"
            />{" "}
          </div>
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
      <h2>Hero Settings</h2>

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
          Show
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
          Hero Image
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
