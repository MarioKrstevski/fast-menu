import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { useDispatch, useSelector } from "react-redux";
import { updateSetting } from "../../../../../redux/globalSettingsSlice";
import { isALink } from "../../../../../helpers/helperFunctions";

export default function CardDesign(props) {
  const { menu, isPro, isOnFreeTrial } = useSelector((store) => {
    return store.menu;
  });

  const gs = useSelector((store) => {
    return store.globalSettings;
  });

  const dispatch = useDispatch();

  const allHeaders = menu.reduce((acc, item) => {
    Object.keys(item).forEach((key) => {
      if (!acc.includes(key)) {
        acc.push(key);
      }
    });
    return acc;
  }, []);
  const allFields = menu.length
    ? allHeaders
        .filter((f) => !f.startsWith("_"))
        .map((cf) => ({
          name: cf,
        }))
    : [];

  console.log("prv item", menu[0]);
  console.log("allFields", allFields);

  const allFieldThatAreLinks = allFields.filter((field) => {
    if (isALink(menu[0][field.name])) {
      return true;
    }
  });
  const cardShapeOptions = [{ name: "card" }, { name: "regular" }];
  const customFields =
    gs.card.customFields === ""
      ? []
      : gs.card.customFields
          .split(",")
          .map((cf) => ({
            name: cf,
          }))
          .filter((cf) => {
            // we remove the option if it doesnt exist in all the options,
            // this happenes when we change menus, old fields selected show up here,
            // because it is a custom field (more tolerable to mistakes)
            // after something is selected everything updates as it should
            const found = allFields.find((f) => f.name === cf.name);
            if (!found) {
              return false;
            } else {
              return true;
            }
          });

  const cardButtonActionOptions = [
    { name: "link" },
    { name: "no action" },
  ];

  console.log("menu", menu);

  if (!(isPro || isOnFreeTrial)) {
    cardButtonActionOptions.push({
      name: "cart (PRO version only)",
      disabled: true,
    });
  }

  if (isPro || isOnFreeTrial) {
    cardButtonActionOptions.push({
      name: "cart",
      disabled: !gs.ordersEnabled,
    });
  }

  return (
    <div className="p-2 card-design">
      <div className="my-2 font-bold">Filter by</div>
      <Dropdown
        showClear
        value={allFields.find(
          (field) => field.name === gs.card.filterBy
        )}
        onChange={(e) => {
          dispatch(
            updateSetting({
              field: "card.filterBy",
              value: e.value ? e.value.name : "",
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
      <div className="my-2 font-bold">Items Design</div>
      <Dropdown
        showClear
        value={cardShapeOptions.find(
          (field) => field.name === gs.card.shape
        )}
        onChange={(e) => {
          dispatch(
            updateSetting({
              field: "card.shape",
              value: e.value ? e.value.name : "",
            })
          );
        }}
        options={cardShapeOptions}
        optionLabel="name"
        placeholder="Select shape"
        className="w-full md:w-14rem"
      />
      {/* ---- */}

      <div className="my-2 font-bold">Image</div>
      <Dropdown
        showClear
        value={allFields.find(
          (field) => field.name === gs.card.image
        )}
        onChange={(e) => {
          dispatch(
            updateSetting({
              field: "card.image",
              value: e.value ? e.value.name : "",
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
        showClear
        value={allFields.find(
          (field) => field.name === gs.card.title
        )}
        onChange={(e) => {
          dispatch(
            updateSetting({
              field: "card.title",
              value: e.value ? e.value.name : "",
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
        showClear
        value={allFields.find(
          (field) => field.name === gs.card.description
        )}
        onChange={(e) => {
          dispatch(
            updateSetting({
              field: "card.description",
              value: e.value ? e.value.name : "",
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
      {/* ---- */}
      <div className="divider h-[1px] bg-slate-400 w-full my-4"></div>

      {/* --- */}
      <div className=" font-bold mt-2">Unavailable</div>
      <div className="text-xs mb-2 text-slate-600">
        (use a column that has TRUE for those that should be
        unavailable)
      </div>
      <Dropdown
        showClear
        value={allFields.find(
          (field) => field.name === gs.card.unavailable
        )}
        onChange={(e) => {
          dispatch(
            updateSetting({
              field: "card.unavailable",
              value: e.value ? e.value.name : "",
            })
          );
        }}
        options={allFields}
        optionLabel="name"
        placeholder="Select unavailable decider"
        className="w-full md:w-14rem"
      />
      {/* ---- */}
      <div className=" font-bold mt-2">Hidden</div>
      <div className="text-xs mb-2 text-slate-600">
        (use a column that has TRUE for those that should be hidden)
      </div>
      <Dropdown
        showClear
        value={allFields.find(
          (field) => field.name === gs.card.hidden
        )}
        onChange={(e) => {
          dispatch(
            updateSetting({
              field: "card.hidden",
              value: e.value ? e.value.name : "",
            })
          );
        }}
        options={allFields}
        optionLabel="name"
        placeholder="Select hidden decider"
        className="w-full md:w-14rem"
      />
      {/* --- */}
      <div className="divider h-[1px] bg-slate-400 w-full my-4"></div>
      {/* --- */}

      <div className="flex align-middle items-center gap-2">
        <input
          checked={gs.ordersEnabled}
          disabled={!(isPro || isOnFreeTrial)}
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
          className={` border-gray-300 rounded text-slate-800 border  p-2 h-8
         
          `}
        />
        <label
          htmlFor="ordersEnabled"
          className={`inline-block font-bold  my-1
          ${
            !(isPro || isOnFreeTrial)
              ? "text-gray-500"
              : "text-slate-900 "
          }
          `}
        >
          Enable Orders (shopping cart)
        </label>
      </div>
      {!(isPro || isOnFreeTrial) && (
        <div className="text-sm font-normal mb-3 text-gray-600">
          (PRO version only)
        </div>
      )}
      <div className="my-2 font-bold">Button Action</div>
      <Dropdown
        showClear
        value={cardButtonActionOptions.find(
          (field) => field.name === gs.card.buttonAction
        )}
        onChange={(e) => {
          dispatch(
            updateSetting({
              field: "card.buttonAction",
              value: e.value ? e.value.name : "",
            })
          );
        }}
        options={cardButtonActionOptions}
        optionLabel="name"
        placeholder="Select action"
        className="w-full md:w-14rem"
      />

      {gs.card.buttonAction === "link" && (
        <>
          <div className="my-2 font-bold">Button Link</div>

          <Dropdown
            showClear
            value={allFields.find(
              (field) => field.name === gs.card.buttonLink
            )}
            onChange={(e) => {
              dispatch(
                updateSetting({
                  field: "card.buttonLink",
                  value: e.value ? e.value.name : "",
                })
              );
            }}
            options={allFieldThatAreLinks}
            optionLabel="name"
            placeholder="Select link field"
            className="w-full md:w-14rem"
          />
        </>
      )}

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
