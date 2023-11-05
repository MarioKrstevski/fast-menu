import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { useDispatch, useSelector } from "react-redux";
import { updateStep3 } from "../../../../../redux/globalSettingsSlice";

export default function S3CardDesign(props) {
  const menu = useSelector((store) => {
    return store.menu.menu;
  });

  const gs = useSelector((store) => {
    return store.globalSettings;
  });

  const dispatch = useDispatch();

  const allFields = Object.keys(menu[0]).map((cf) => ({
    name: cf,
  }));

  const allFieldThatAreLinks = allFields.filter((field) => {
    console.log("test", menu[0], field.name);
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

  console.log("customFields", customFields);

  return (
    <div className="p-2 card-design">
      <div className="my-2 font-bold">Filter by</div>
      <Dropdown
        value={allFields.find(
          (field) => field.name === gs.card.filterBy
        )}
        onChange={(e) => {
          console.log("e", e.value);
          dispatch(
            updateStep3({
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
            updateStep3({
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
            updateStep3({
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
            updateStep3({
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
        value={allFields.find(
          (field) => field.name === gs.card.caption
        )}
        onChange={(e) => {
          dispatch(
            updateStep3({
              field: "card.caption",
              value: e.value.name,
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
            console.log("selcities", e.value);
            dispatch(
              updateStep3({
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

      <div className="my-2 font-bold">Button Text</div>
    </div>
  );
}
