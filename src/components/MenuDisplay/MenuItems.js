import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { groupBy } from "../../helpers/helperFunctions";
import Card from "./Card";

function Pill({ label, active, updateFilter }) {
  return (
    <button
      onClick={() => {
        updateFilter(label);
      }}
      type="button"
      className={`px-4 whitespace-nowrap py-2 w-auto transition-shadow duration-200 shadow-sm hover:shadow-md inline-flex justify-center items-center rounded-md  text-base sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2 mb-2 
      ${
        active
          ? "bg-gray-900 text-white"
          : "bg-white hover:bg-gray-5 text-gray-600 hover:text-gray-700"
      }
      `}
    >
      {label}
    </button>
  );
}

export default function MenuItems(props) {
  const gs = useSelector((store) => store.globalSettings);
  let { menu } = useSelector((store) => store.menu);

  const [currentFilter, setCurrentFilter] = useState("All");
  function updateFilter(newFilter) {
    setCurrentFilter(newFilter);
  }

  //Reset current filter when changing the filter options

  if (!menu) {
    return <div className="text-center my-8">Loading Menu</div>;
  }

  let groupedByFilter = null;
  let filters = null;

  if (gs.card.filterBy) {
    groupedByFilter = groupBy(menu, gs.card.filterBy);
    filters = Object.keys(groupedByFilter);
  }

  // fix for when we change filter by but already a filter is selected that doesnt exist now
  let cf = currentFilter;
  if (filters && !filters.includes(currentFilter)) {
    cf = "All";
  }

  return (
    <div
      className="min-h-full pt-4 max-w-full overflow-hidden"
      style={{
        backgroundColor: gs.theme.backgroundColor,
      }}
    >
      {menu && menu.length > 0 && (
        <div
          id={gs.client + "-fm-main-items"}
          className={`main ${
            gs.client + "-fm-main"
          } w-[90%] mx-auto sm:w-full `}
        >
          {filters && filters.length > 1 && (
            <div className="filters flex flex-nowrap  overflow-y-auto py-2 px-2  mb-2 sm:flex-wrap ">
              <Pill
                label={"All"}
                active={cf === "All"}
                updateFilter={updateFilter}
              />
              {filters.map((filter) => (
                <Pill
                  updateFilter={updateFilter}
                  key={filter}
                  label={filter}
                  active={cf === filter}
                />
              ))}
            </div>
          )}

          {menu && (
            <div className="items  flex flex-wrap">
              {cf === "All"
                ? menu
                    .slice(0, 5)
                    .map((item) => (
                      <Card key={item._uid} item={item} />
                    ))
                : groupedByFilter[cf].map((item) => (
                    <Card key={item._uid} item={item} />
                  ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
