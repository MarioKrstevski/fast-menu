import { useDispatch, useSelector } from "react-redux";
import {
  convertDriveLinkToDirect,
  isALink,
} from "../../helpers/helperFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { addItem } from "../../redux/shoppingCartSlice";
export default function RegularItem({ item }) {
  const gs = useSelector((store) => store.globalSettings);
  const dispatch = useDispatch();

  const imageLink = convertDriveLinkToDirect(item[gs.card.image]);

  function matchesHiddenLogic(value) {
    const valuesThatMakesItHide = [
      Boolean(value),
      "hide",
      "yes",
      "true",
    ];
    return valuesThatMakesItHide.includes(value);
  }

  function matchesUnavailableLogic(value) {
    const valuesThatMakesItHide = [
      // undefined, // usefull because datasheets doesnt return false, 0, etc so it will be undefined on our part
      Boolean(value),
    ];
    return valuesThatMakesItHide.includes(value);
  }

  console.log("item", item[gs.card.unavailable]);
  // matchesUnavailableLogic(item[gs.card.unavailable])
  if (matchesHiddenLogic(item[gs.card.hidden])) {
    return null;
  }
  console.log("item", item);
  return (
    <div className="regular w-full lg:w-1/2 pl-2">
      <div className="item-content p-2 flex  border  rounded border-black bg-white w-[98%] mb-2">
        <div className="image w-24 h-12 mr-2 rounded">
          <img
            className="w-full h-full object-cover rounded"
            src={item[gs.card.image]}
            alt="Food Image"
            loading="lazy"
          />
        </div>
        <div className="info w-full">
          <div className="title-price flex gap-2 justify-start">
            <div className="title text-lg break-all leading-5">
              {" "}
              {item[gs.card.title]}{" "}
            </div>
            <div className="filler-dots flex-1 border-dotted border-t-2 border-t-black mt-3 px-1"></div>
            <div className="price text-lg">
              {item.Price}
              <span className="text-sm">{item.Currency}</span>
            </div>
          </div>
          <div className="desc-price flex text-sm text-slate-700">
            <div className="description flex-1">
              {" "}
              {item[gs.card.description]}
            </div>
            {gs.card.buttonAction === "cart" &&
              !matchesHiddenLogic(item[gs.card.unavailable]) &&
              gs.ordersEnabled && (
                <button
                  onClick={() => {
                    console.log("added Item", item);
                    dispatch(addItem(item));
                  }}
                  className="max-w-24 mt-4 bg-blue-500 hover:bg-blue-700 font-medium py-1 px-2 rounded text-sm text-center hover:shadow-md transition-shadow duration-300 focus:outline-none"
                  // style="background-color: rgb(39, 175, 96); color: rgb(255, 255, 255);"
                  style={{
                    backgroundColor: gs.card.buttonBgColor,
                    color: gs.card.buttonTextColor,
                  }}
                >
                  {gs.card.buttonText}
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
