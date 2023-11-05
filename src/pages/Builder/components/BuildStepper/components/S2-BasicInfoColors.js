import { useDispatch, useSelector } from "react-redux";
import { updateStep2 } from "../../../../../redux/globalSettingsSlice";

export default function S2BasicInfoColors(props) {
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
        <div className="control is-clearfix">
          <input
            value={gs.websiteName}
            onChange={(e) => {
              dispatch(
                updateStep2({
                  field: "websiteName",
                  value: e.target.value,
                })
              );
            }}
            type="text"
            id="websiteName"
            autocomplete="on"
            placeholder="My brand new website"
            className="bg-white w-full border-gray-300 rounded text-slate-800 border p-2 h-8"
          />
        </div>
      </div>

      {/* ---- */}

      <div className="field">
        <label
          htmlFor="subdomain"
          className="text-slate-900 font-bold mb-2 mt-3 block"
        >
          Subdomain name
        </label>{" "}
        <div data-v-449b025c="" className="flex">
          <p data-v-449b025c="" className="control">
            <span data-v-449b025c="" className="text-normal">
              fastmenu.com/
            </span>
          </p>
          <div>
            <input
              value={gs.subdomain}
              onChange={(e) => {
                dispatch(
                  updateStep2({
                    field: "subdomain",
                    value: e.target.value,
                  })
                );
              }}
              type="text"
              autocomplete="on"
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
                updateStep2({
                  field: "logoURL",
                  value: e.target.value,
                })
              );
            }}
            type="text"
            id="logoURL"
            autocomplete="on"
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
                updateStep2({
                  field: "faviconURL",
                  value: e.target.value,
                })
              );
            }}
            type="text"
            id="faviconURL"
            autocomplete="on"
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
              updateStep2({
                field: "isNavbarFixed",
                value: e.target.checked,
              })
            );
          }}
          type="checkbox"
          id="isNavbarFixed"
          autocomplete="on"
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
              updateStep2({
                field: "hero.isShown",
                value: e.target.checked,
              })
            );
          }}
          type="checkbox"
          id="isHeaderShown"
          autocomplete="on"
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
                updateStep2({
                  field: "hero.title",
                  value: e.target.value,
                })
              );
            }}
            type="text"
            id="headerTitle"
            autocomplete="on"
            placeholder="My brand new website"
            className="bg-white w-10/12 border-gray-300 rounded text-slate-800 border p-2 h-8"
          />
          <input
            value={gs.hero.titleColor}
            onChange={(e) => {
              dispatch(
                updateStep2({
                  field: "hero.titleColor",
                  value: e.target.value,
                })
              );
            }}
            type="color"
            id="headerTitleColor"
            autocomplete="on"
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
                updateStep2({
                  field: "hero.subheading",
                  value: e.target.value,
                })
              );
            }}
            type="text"
            id="headerSubheading"
            autocomplete="on"
            placeholder="My brand new website"
            className="bg-white w-10/12 border-gray-300 rounded text-slate-800 border p-2 h-8"
          />
          <input
            value={gs.hero.subheadingColor}
            onChange={(e) => {
              dispatch(
                updateStep2({
                  field: "hero.subheadingColor",
                  value: e.target.value,
                })
              );
            }}
            type="color"
            id="subheadingColorColor"
            autocomplete="on"
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
                updateStep2({
                  field: "hero.image",
                  value: e.target.value,
                })
              );
            }}
            type="text"
            id="heroImage"
            autocomplete="on"
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
              console.log("textarea", e.target.value);
              console.log("test", e.target.value.includes("\n"));
              dispatch(
                updateStep2({
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