import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decreaseAmount,
  increaseAmount,
} from "../../../redux/shoppingCartSlice";
import axios from "axios";

export default function ShoppingCart(props) {
  const cart = useSelector((state) => state.shoppingCart.cart);
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
  return (
    <div className="border-2 w-64  fixed top-4 right-4 bg-white p-4">
      Your shopping Cart:
      <p>
        {cart.map((entry) => {
          return (
            <div className="border-l-gray-800 border-l-2 pl-2 my-2">
              <div>
                {" "}
                {entry.item.Name +
                  " " +
                  entry.item.Price +
                  "x" +
                  entry.amount +
                  " - " +
                  entry.amount * entry.item.Price +
                  entry.item.Currency}
              </div>

              <div className="flex">
                <button
                  onClick={() => {
                    dispatch(decreaseAmount(entry.item));
                  }}
                  className="border rounded-full cursor-pointer w-8 h-8 flex justify-center  items-center"
                >
                  -
                </button>
                <button
                  onClick={() => {
                    dispatch(increaseAmount(entry.item));
                  }}
                  className="border rounded-full cursor-pointer w-8 h-8 flex justify-center items-center"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </p>
      {cart.length > 0 && (
        <div>
          <button
            className="bg-green-300 p-1 m-2"
            onClick={() => {
              placeOrder();
              //   dispatch(placeOrder());
            }}
          >
            Place Order
          </button>
          <button
            className="bg-red-300 p-1 mt-8"
            onClick={() => {
              dispatch(clearCart());
            }}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}
