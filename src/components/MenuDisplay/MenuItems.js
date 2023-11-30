import { useDispatch, useSelector } from "react-redux";
import lodash from "lodash";
import { useState } from "react";
import { addItem } from "../../redux/shoppingCartSlice";
import {
  convertDriveLinkToDirect,
  isALink,
} from "../../helpers/helperFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLink,
  faLink,
} from "@fortawesome/free-solid-svg-icons";

function Card({ item }) {
  const gs = useSelector((store) => store.globalSettings);
  const dispatch = useDispatch();

  const imageLink = convertDriveLinkToDirect(item[gs.card.image]);

  return (
    <div className="w-full  sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-2 mb-8 md:mb-4">
      <div className="content-card overflow-hidden bg-white rounded shadow flex flex-grow flex-col text-gray-800 text-left h-full">
        {imageLink && (
          <div className="relative w-full pb-[100%] bg-gray-300">
            <img
              alt="Item Image"
              className="object-cover absolute h-full w-full inset-0"
              src={imageLink}
              lazy="loaded"
            />
          </div>
        )}
        <div className="h-full p-4 flex flex-col justify-between">
          <div>
            {item[gs.card.title] && (
              <p className="title font-semibold text-2xl">
                {item[gs.card.title]}
              </p>
            )}
            {item[gs.card.description] && (
              <p className="description text-base text-gray-700">
                {item[gs.card.description]}
              </p>
            )}
          </div>
          <div className="caption-and-custom-fields">
            {gs.card.caption && (
              <p
                className={`caption  text-gray-600 text-sm ${
                  item[gs.card.title] || item[gs.card.description]
                    ? "mt-4"
                    : ""
                }`}
              >
                {item[gs.card.caption]}
              </p>
            )}
            {gs.card.customFields.length > 0 &&
              gs.card.customFields.split(",").length > 0 && (
                <ul
                  className={`
                ${
                  item[gs.card.title] ||
                  item[gs.card.description] ||
                  item[gs.card.caption]
                    ? "mt-4"
                    : ""
                }
                `}
                >
                  {gs.card.customFields.split(",").map((cf) => {
                    if (!item[cf]) {
                      return null;
                    }

                    return (
                      <li
                        key={cf}
                        className={
                          `${cf} custom-field ` +
                          "flex justify-between "
                        }
                      >
                        <span className="font-bold">{cf}</span>
                        <span className="text-right">
                          {isALink(item[cf]) ? (
                            <a href={item[cf]}>
                              <FontAwesomeIcon
                                className="text-blue-500"
                                icon={faExternalLink}
                              />
                            </a>
                          ) : (
                            item[cf]
                          )}
                          {cf === "Price" && item.Currency}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            {gs.card.buttonAction === "no action" && null}
            {gs.card.buttonAction === "cart" && gs.ordersEnabled && (
              <button
                onClick={() => {
                  console.log("added Item", item);
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
                href={item[gs.card.buttonLink]}
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
  const { menu } = useSelector((store) => store.menu);
  const dispatch = useDispatch();

  const [currentFilter, setCurrentFilter] = useState("All");

  let groupedByFilter = null;
  let filters = null;

  if (gs.card.filterBy) {
    groupedByFilter = lodash.groupBy(menu, gs.card.filterBy);
    filters = Object.keys(groupedByFilter);
  }

  console.log("filters", filters);

  function updateFilter(newFilter) {
    setCurrentFilter(newFilter);
  }
  console.log("menu", menu);

  return (
    <div
      className="min-h-full pt-4 max-w-full overflow-hidden"
      style={{
        backgroundColor: gs.theme.backgroundColor,
      }}
    >
      {!menu && <div className="text-center my-8">Loading Menu</div>}

      {menu && menu.length > 0 && (
        <div className="main w-[90%] mx-auto sm:w-full ">
          {filters && filters.length > 1 && (
            <div className="filters flex flex-nowrap  overflow-y-auto py-2 px-2  mb-2 sm:flex-wrap ">
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
          )}

          <div className="items  flex flex-wrap">
            {currentFilter === "All"
              ? menu.map((item) => (
                  <Card key={item._uid} item={item} />
                ))
              : groupedByFilter[currentFilter].map((item) => (
                  <Card key={item._uid} item={item} />
                ))}
          </div>
        </div>
      )}
    </div>
  );
}
