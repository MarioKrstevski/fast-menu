import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../../redux/shoppingCartSlice";

export default function Card({ item }) {
  const isOrderingEnabled = useSelector(
    (state) => state.globalSettings.ordersEnabled
  );

  const shoppingCart = useSelector(
    (state) => state.shoppingCart.cart
  );
  const dispatch = useDispatch();
  return (
    <div className=" m-2 justify-center items-start rounded shadow bg-white flex w-[372px] flex-col">
      <div className="justify-center items-center bg-gray-300 self-stretch flex w-full flex-col">
        <img
          loading="lazy"
          srcSet={item.Image}
          className="aspect-square object-contain object-center w-full overflow-hidden self-stretch grow"
        />
      </div>
      <div className="self-stretch flex flex-col w-full mt-8 mb-6 px-6 max-md:px-5">
        <div className="justify-center text-gray-800 text-2xl font-semibold leading-8 self-stretch whitespace-nowrap">
          {item.Name}
        </div>
        <div className="justify-center text-gray-700 text-base leading-6 self-stretch whitespace-nowrap">
          {item.Description}
        </div>

        <div className="justify-center text-gray-600 text-sm leading-5 self-stretch whitespace-nowrap mt-10">
          {item.Section}
        </div>
        <div className="self-stretch flex w-full items-start justify-between gap-5 mt-4">
          <div className="justify-center text-gray-800 text-base font-bold leading-6 self-start">
            Цена
          </div>
          <div className="justify-center text-gray-800 text-right text-base leading-6 whitespace-nowrap self-start">
            {item.Price + item.Currency}
          </div>
        </div>
        {isOrderingEnabled && (
          <div
            onClick={() => {
              dispatch(addItem(item));
            }}
            className="justify-center items-center rounded bg-green-500 self-stretch flex w-full grow flex-col mt-3.5 px-20 py-3.5 max-md:px-5"
          >
            <div className="justify-center text-white text-center text-base font-medium leading-6 self-center whitespace-nowrap">
              Додај во Кошничка
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
