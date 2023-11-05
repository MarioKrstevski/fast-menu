import { Chips } from "primereact/chips";
import { MultiSelect } from "primereact/multiselect";
import { useState } from "react";
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

  const allCustomFields = Object.keys(menu[0]).map((cf) => ({
    name: cf,
  }));
  const customFields =
    gs.card.customFields === ""
      ? []
      : gs.card.customFields.split(",").map((cf) => ({
          name: cf,
        }));

  console.log("customFields", customFields);

  return (
    <div className="p-2">
      <div className="divider h-[1px] bg-slate-400 w-full my-4"></div>
      <div className="divider h-[1px] bg-slate-400 w-full my-4"></div>
      <div className="my-2">Custom Fields</div>
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
          options={allCustomFields}
          optionLabel="name"
          display="chip"
          placeholder="Add Custom Fields"
          maxSelectedLabels={allCustomFields.length}
          className="w-full border border-slate-800 p-1"
        />
      </div>
      <div className="divider h-[1px] bg-slate-400 w-full my-4"></div>
    </div>
  );
}
