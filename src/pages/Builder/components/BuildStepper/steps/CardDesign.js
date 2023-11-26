import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { useDispatch, useSelector } from "react-redux";
import { updateSetting } from "../../../../../redux/globalSettingsSlice";

export default function CardDesign(props) {
  const { menu, isPro } = useSelector((store) => {
    return store.menu;
  });

  const gs = useSelector((store) => {
    return store.globalSettings;
  });

  const dispatch = useDispatch();

  const allFields = menu.length
    ? Object.keys(menu[0]).map((cf) => ({
        name: cf,
      }))
    : [];

  const allFieldThatAreLinks = allFields.filter((field) => {
    if (
      typeof menu[0][field.name] === "string" &&
      (menu[0][field.name].includes("http") ||
        menu[0][field.name].includes("www"))
    ) {
      return true;
    }
  });
  const customFields =
    gs.card.customFields === ""
      ? []
      : gs.card.customFields.split(",").map((cf) => ({
          name: cf,
        }));

  const cardButtonActionOptions = [
    { name: "link" },
    { name: "no action" },
  ];

  console.log("menu", menu);

  if (!isPro) {
    cardButtonActionOptions.push({
      name: "cart (PRO version only)",
      disabled: true,
    });
  }

  if (isPro) {
    cardButtonActionOptions.push({
      name: "cart",
      disabled: !gs.ordersEnabled,
    });
  }

  return (
    <div className="p-2 card-design">
      <div className="my-2 font-bold">Filter by</div>
      <Dropdown
        value={allFields.find(
          (field) => field.name === gs.card.filterBy
        )}
        onChange={(e) => {
          dispatch(
            updateSetting({
              field: "card.filterBy",
              value: e.value.name,
            })
          );
        }}
        options={allFields}
        optionLabel="name"
        placeholder="Select a Filter"
        className="w-full md:w-14rem"
      />
      {/* ---- */}

      <div className="divider h-[1px] bg-slate-400 w-full my-4"></div>

      <div className="my-2 font-bold">Image</div>
      <Dropdown
        value={allFields.find(
          (field) => field.name === gs.card.image
        )}
        onChange={(e) => {
          dispatch(
            updateSetting({
              field: "card.image",
              value: e.value.name,
            })
          );
        }}
        options={allFieldThatAreLinks}
        optionLabel="name"
        placeholder="Select description"
        className="w-full md:w-14rem"
      />
      {/* ---- */}
      <div className="my-2 font-bold">Title</div>
      <Dropdown
        value={allFields.find(
          (field) => field.name === gs.card.title
        )}
        onChange={(e) => {
          dispatch(
            updateSetting({
              field: "card.title",
              value: e.value.name,
            })
          );
        }}
        options={allFields}
        optionLabel="name"
        placeholder="Select title"
        className="w-full md:w-14rem"
      />
      {/* ---- */}

      <div className="my-2 font-bold">Description</div>
      <Dropdown
        value={allFields.find(
          (field) => field.name === gs.card.description
        )}
        onChange={(e) => {
          dispatch(
            updateSetting({
              field: "card.description",
              value: e.value.name,
            })
          );
        }}
        options={allFields}
        optionLabel="name"
        placeholder="Select description"
        className="w-full md:w-14rem"
      />
      {/* ---- */}
      <div className="my-2 font-bold">Caption</div>
      <Dropdown
        showClear
        value={allFields.find(
          (field) => field.name === gs.card.caption
        )}
        onChange={(e) => {
          dispatch(
            updateSetting({
              field: "card.caption",
              value: e.value ? e.value.name : "",
            })
          );
        }}
        options={allFields}
        optionLabel="name"
        placeholder="Select caption"
        className="w-full md:w-14rem"
      />
      {/* ---- */}
      <div className="my-2 font-bold">Custom Fields</div>
      <div className="settings-field flex justify-content-center">
        <MultiSelect
          value={customFields}
          onChange={(e) => {
            // setSelectedCities(e.value);
            dispatch(
              updateSetting({
                field: "card.customFields",
                value: e.value.map((item) => item.name).join(","),
              })
            );
          }}
          options={allFields}
          optionLabel="name"
          display="chip"
          placeholder="Add Custom Fields"
          maxSelectedLabels={allFields.length}
          className="w-full border border-slate-800 p-1"
        />
      </div>
      <div className="divider h-[1px] bg-slate-400 w-full my-4"></div>

      <div className="my-2 font-bold">Button Action</div>

      {isPro && (
        <div className="flex align-middle items-center gap-2">
          <input
            value={gs.ordersEnabled}
            onChange={(e) => {
              dispatch(
                updateSetting({
                  field: "ordersEnabled",
                  value: e.target.checked,
                })
              );
            }}
            type="checkbox"
            id="ordersEnabled"
            autoComplete="on"
            className="bg-white  border-gray-300 rounded text-slate-800 border p-2 h-8"
          />
          <label
            htmlFor="ordersEnabled"
            className="text-slate-900 inline-block font-bold mb-2 mt-3 "
          >
            Enable Orders (shopping cart)
          </label>
        </div>
      )}

      <Dropdown
        value={cardButtonActionOptions.find(
          (field) => field.name === gs.card.buttonAction
        )}
        onChange={(e) => {
          dispatch(
            updateSetting({
              field: "card.buttonAction",
              value: e.value.name,
            })
          );
        }}
        options={cardButtonActionOptions}
        optionLabel="name"
        placeholder="Select action"
        className="w-full md:w-14rem"
      />

      <div className="my-2 font-bold">Button Text</div>

      <div className="flex align-middle gap-1">
        <input
          value={gs.card.buttonText}
          onChange={(e) => {
            dispatch(
              updateSetting({
                field: "card.buttonText",
                value: e.target.value,
              })
            );
          }}
          type="text"
          autoComplete="on"
          placeholder="My brand new website"
          className="bg-white w-8/12 border-gray-300 rounded text-slate-800 border p-2 h-8"
        />
        <input
          value={gs.card.buttonBgColor}
          onChange={(e) => {
            dispatch(
              updateSetting({
                field: "card.buttonBgColor",
                value: e.target.value,
              })
            );
          }}
          type="color"
          autoComplete="on"
          placeholder="My brand new website"
          className="bg-white w-2/12 border-gray-300 rounded text-slate-800 border  h-8"
        />
        <input
          value={gs.card.buttonTextColor}
          onChange={(e) => {
            dispatch(
              updateSetting({
                field: "card.buttonTextColor",
                value: e.target.value,
              })
            );
          }}
          type="color"
          autoComplete="on"
          placeholder="My brand new website"
          className="bg-white w-2/12 border-gray-300 rounded text-slate-800 border  h-8"
        />
      </div>
    </div>
  );
}
