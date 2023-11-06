import { useDispatch, useSelector } from "react-redux";
import lodash from "lodash";
import { useState } from "react";
import { addItem } from "../../redux/shoppingCartSlice";

function Card({ item }) {
  // console.log("item", item);
  const gs = useSelector((store) => store.globalSettings);
  const dispatch = useDispatch();

  return (
    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-2 mb-4">
      <div className="content-card overflow-hidden bg-white rounded shadow flex flex-grow flex-col text-gray-800 text-left h-full">
        <div className="relative w-full pb-[100%] bg-gray-300">
          <img
            alt="Item Image"
            className="object-cover absolute h-full w-full inset-0"
            src={item[gs.card.image]}
            lazy="loaded"
          />
        </div>
        <div className="h-full p-6 flex flex-col justify-between">
          <div>
            <p className="font-semibold text-2xl">
              {item[gs.card.title]}
            </p>
            <p className="text-base text-gray-700">
              {item[gs.card.description]}
            </p>
          </div>
          <div>
            <p className="mt-4 text-gray-600 text-sm">
              {item[gs.card.caption]}
            </p>
            <ul className="mt-4">
              {gs.card.customFields.split(",").map((cf) => (
                <li className="flex justify-between">
                  <span className="font-bold">{cf}</span>
                  <span className="text-right">
                    {item[cf]}
                    {cf === "Price" && item.Currency}
                  </span>
                </li>
              ))}
            </ul>

            {gs.card.buttonAction === "no action" && null}
            {gs.card.buttonAction === "cart" && (
              <button
                onClick={() => {
                  dispatch(addItem(item));
                }}
                className="w-full mt-4 bg-blue-500 hover:bg-blue-700 font-medium py-2 px-4 rounded text-center hover:shadow-md transition-shadow duration-300 focus:outline-none"
                // style="background-color: rgb(39, 175, 96); color: rgb(255, 255, 255);"
                style={{
                  backgroundColor: gs.card.buttonBgColor,
                  color: gs.card.buttonTextColor,
                }}
              >
                {gs.card.buttonText}
              </button>
            )}

            {gs.card.buttonAction === "link" && (
              <a
                target="_blank"
                href={item.OutsideLink}
                className="w-full mt-4 block cursor-pointer bg-blue-500 hover:bg-blue-700 font-medium py-2 px-4 rounded text-center hover:shadow-md transition-shadow duration-300 focus:outline-none"
                // style="background-color: rgb(39, 175, 96); color: rgb(255, 255, 255);"
                style={{
                  backgroundColor: gs.card.buttonBgColor,
                  color: gs.card.buttonTextColor,
                }}
              >
                {gs.card.buttonText}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Pill({ label, active, updateFilter }) {
  return (
    <button
      onClick={() => {
        updateFilter(label);
      }}
      type="button"
      class={`px-4 py-2 w-auto transition-shadow duration-200 shadow-sm hover:shadow-md inline-flex justify-center items-center rounded-md border text-base sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2 mb-2 
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
  const menu = useSelector((store) => store.menu.menu);
  const dispatch = useDispatch();

  const [currentFilter, setCurrentFilter] = useState("All");

  const groupedByFilter = lodash.groupBy(menu, gs.card.filterBy);
  const filters = Object.keys(groupedByFilter);
  console.log("filters", filters);

  function updateFilter(newFilter) {
    setCurrentFilter(newFilter);
  }

  return (
    <div className="min-h-full max-w-full overflow-hidden">
      {menu.length === 0 && <div>Loading Item</div>}

      {menu.length > 0 && (
        <div className="main">
          <div className="filters flex flex-wrap px-2 mt-4">
            <Pill
              label={"All"}
              active={currentFilter === "All"}
              updateFilter={updateFilter}
            />
            {filters.map((filter) => (
              <Pill
                updateFilter={updateFilter}
                key={filter}
                label={filter}
                active={currentFilter === filter}
              />
            ))}
          </div>

          <div className="items  flex flex-wrap">
            {currentFilter === "All"
              ? menu.map((item) => <Card item={item} />)
              : groupedByFilter[currentFilter].map((item) => (
                  <Card item={item} />
                ))}
          </div>
        </div>
      )}
    </div>
  );
}
