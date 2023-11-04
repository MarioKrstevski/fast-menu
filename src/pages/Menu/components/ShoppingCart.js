import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decreaseAmount,
  increaseAmount,
  clearItem,
} from "../../../redux/shoppingCartSlice";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faShoppingCart,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function ShoppingCart(props) {
  const cart = useSelector((state) => state.shoppingCart.cart);
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false);

  const dispatch = useDispatch();

  function placeOrder() {
    let message = ``;
    message += `Mario has ordered \n`;

    let totalPrice = 0;

    for (const entry of cart) {
      const costPerItem = entry.item.Price * entry.amount;
      totalPrice += costPerItem;
      message += ` *${entry.item.Name}* x ${entry.amount} - ${costPerItem}${entry.item.Currency} \n`;
    }

    message += ` \n`;
    message += ` _Total : ${totalPrice}${cart[0].item.Currency}_`;

    axios
      .post("http://localhost:8000/placeOrder", {
        message,
      })
      .then((data) => {
        console.log("order placed succesfully", data);
        dispatch(clearCart());
        // show that order is placed visually
      })
      .catch((err) => {
        console.log("error placing oreder", err);
        //   state.cart = [];
      });
  }
  let cartTotal = 0;
  for (const entry of cart) {
    cartTotal += entry.item.Price * entry.amount;
  }

  return (
    <div
      className={`shopping-cart p-4 fixed z-20 w-full h-full flex flex-col items-end transition duration-300 ease-in-out ${
        isShoppingCartOpen
          ? "bg-black bg-opacity-30 "
          : "  pointer-events-none"
      }`}
      onClick={() => {
        console.log("test");
        setIsShoppingCartOpen(false);
      }}
    >
      <div className="toggle-cart flex justify-end pointer-events-auto relative">
        <div
          className="notification-dot absolute top-0 right-0"
          style={{
            display:
              !isShoppingCartOpen && cart.length > 0
                ? "block"
                : "none",
          }}
        >
          <span data-v-0cfa37e0="" className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-900 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-800"></span>
          </span>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsShoppingCartOpen(!isShoppingCartOpen);
          }}
          className="icon bg-white h-12 w-12 text-gray-800 rounded-full transition-shadow duration-300 text-center shadow-md hover:shadow-2xl flex justify-center items-center cursor-pointer border border-gray-100 pointer-events-auto outline-none"
        >
          <FontAwesomeIcon
            style={{
              display: isShoppingCartOpen ? "none" : "block",
            }}
            icon={faShoppingCart}
            className="transition duration-300 ease-in-out pointer-events-auto"
          />
          <FontAwesomeIcon
            style={{
              display: !isShoppingCartOpen ? "none" : "block",
            }}
            className="transition duration-300 ease-in-out pointer-events-auto "
            icon={faTimes}
            size="lg"
          />
        </div>
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ display: isShoppingCartOpen ? "block" : "none" }}
        className="shopping-list bg-white shadow-md border border-gray-100 text-gray-800 mt-6 pointer-events-auto rounded-lg overflow-y-auto pt-4 w-full sm:w-96 transition duration-300 ease-in-out"
      >
        <div
          className="px-4 pb-4 text-center"
          style={{ display: cart.length === 0 ? "block" : "none" }}
        >
          <div>Your cart is empty</div>
        </div>
        <div
          style={{ display: cart.length !== 0 ? "block" : "none" }}
        >
          <div className="items border-b overflow-auto">
            {cart.map((entry) => {
              return (
                <div
                  key={entry.item.ID}
                  className="flex justify-between px-2 sm:px-4 pb-4"
                >
                  <div className="flex">
                    <div className="h-16 w-16 min-w-[64px] rounded-lg overflow-hidden bg-gray-100">
                      <img
                        className="object-cover h-full w-full inset-0"
                        src={entry.item.Image}
                        lazy="loaded"
                      />
                    </div>

                    <div className="px-2 sm:px-4 flex flex-col justify-between">
                      <p className="overflow-ellipsis font-semibold overflow-hidden">
                        {entry.item.Name}
                      </p>
                      <div>
                        {entry.item.Price}
                        <span>{entry.item.Currency}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <div
                      onClick={() => {
                        dispatch(clearItem(entry.item));
                      }}
                      role="button"
                      className="px-3"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          dispatch(decreaseAmount(entry.item));
                        }}
                        className="text-center px-2 py-0 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none w-8 h-8"
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <div className="mx-2 text-sm">
                        {entry.amount}
                      </div>
                      <button
                        onClick={() => {
                          dispatch(increaseAmount(entry.item));
                        }}
                        className="text-center px-2 py-0 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none w-8 h-8"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="checkout-section p-4 bg-gray-100">
            <div className="flex justify-between mb-3">
              <div className="font-semibold">Total</div>
              <div>
                {cartTotal}
                {cart.length > 0 && (
                  <span>{cart[0].item.Currency}</span>
                )}
              </div>
            </div>

            <button
              type="button"
              className="checkout px-4 py-2  transition-shadow duration-200 shadow-sm hover:shadow-md inline-flex justify-center items-center rounded-md  border  text-base sm:text-sm  font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full bg-gray-900 text-white border-black"
            >
              {" "}
              Checkout{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
