import {
  faCreditCard,
  faMoneyBill1Wave,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../redux/shoppingCartSlice";
import axios from "axios";
import OrderPlacedMessage from "./OrderPlacedModal";
import { useState } from "react";
function generateOrderMessage(formData, cart) {
  //   console.log(formData, cart);

  let items = ``;
  let totalPrice = 0;

  for (const entry of cart) {
    const costPerItem = entry.item.Price * entry.amount;
    totalPrice += costPerItem;
    items += `*${entry.amount}* x *${entry.item.Name}*: ${
      costPerItem * entry.amount
    }${entry.item.Currency} \n`;
  }

  const finalMessage = `New Order! 
  
Order for: *${formData.name}*
  
--- 

${items} 
--- 
*Total:*  _${totalPrice}${cart[0].item.Currency}_
--- 

*Payment method:* ${
    formData.paymentType === "bycash"
      ? "Cash"
      : formData.paymentType === "bycard"
      ? "Card"
      : "undefined"
  } 
*Delivery mode:* ${
    formData.wayToPackage === "pickup" ? "Pick up" : "Send to address"
  }
${
  formData.wayToPackage === "delivery"
    ? `*Address* : ${formData.address}`
    : ""
}
*Contact details* 
---
*Name:* ${formData.name} 
*Phone number:* ${formData.phone} 
*Notes:* ${formData.notes}
---
 
`;

  return finalMessage;
}
export default function CheckoutModal({ setIsCheckoutModalVisible }) {
  const [isOrderSent, setIsOrderSent] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      paymentType: "bycash",
      wayToPackage: "pickup",
    },
    mode: "onChange",
  });
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.shoppingCart.cart);
  function processOrder(message) {
    axios
      .post("http://localhost:8000/placeOrder", {
        message,
      })
      .then((data) => {
        console.log("order placed succesfully", data);
        dispatch(clearCart());
        setIsOrderSent(true);
      })
      .catch((err) => {
        console.log("error placing oreder", err);
      });
  }
  const onSubmit = (data) => {
    const message = generateOrderMessage(data, cart);
    // console.log("message final", message);
    setIsOrderSent(true);
    processOrder(message);
  };
  return (
    <div className="modal overflow-hidden fixed flex flex-col justify-center top-0 left-0 right-0 bottom-0 z-30 w-full">
      <div
        onClick={() => {
          setIsCheckoutModalVisible(false);
        }}
        className="modal-backdrop bg-black bg-opacity-50 mx-auto my-0 fixed top-0 left-0 right-0 bottom-0 z-10 "
      ></div>

      <div className="modal mx-auto dialog relative z-20 flex align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full sm:max-w-lg sm:w-full">
        <div className="modal-body w-full mx-auto rounded-lg">
          <div
            style={{ display: isOrderSent ? "none" : "block" }}
            className="checkout-form bg-white rounded-lg w-full"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                <div className="grid grid-cols-6 gap-4">
                  <div className="col-span-6">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="name"
                    >
                      {" "}
                      Name *{" "}
                    </label>
                    <div>
                      <input
                        {...register("name", { required: true })}
                        className="mt-1 px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                      />
                      <p
                        className="mt-2 text-sm text-red-400"
                        style={{ display: "none" }}
                      >
                        {" "}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="phone"
                    >
                      {" "}
                      Phone number *{" "}
                    </label>
                    <div>
                      <input
                        {...register("phone", { required: true })}
                        className="mt-1 px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                      />
                      <p
                        className="mt-2 text-sm text-red-400"
                        style={{ display: "none" }}
                      >
                        {" "}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-6">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="address"
                    >
                      Street address
                    </label>
                    <div>
                      <input
                        {...register("address")}
                        className="mt-1 px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                      />
                      <p
                        className="mt-2 text-sm text-red-400"
                        style={{ display: "none" }}
                      >
                        {" "}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-6">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="notes"
                    >
                      {" "}
                      Notes{" "}
                    </label>
                    <div className="mt-1">
                      <div>
                        <textarea
                          {...register("notes")}
                          rows="3"
                          className="px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        ></textarea>
                        <p
                          className="mt-2 text-sm text-red-400"
                          style={{ display: "none" }}
                        >
                          {" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    style={{ display: "none" }}
                    value={"bycash"}
                    {...register("paymentType")}
                    id="paybycash"
                  />
                  <input
                    type="radio"
                    style={{ display: "none" }}
                    value={"bycard"}
                    {...register("paymentType")}
                    id="paybycard"
                  />
                  <div className="col-span-6">
                    <div className="block text-sm font-medium text-gray-700 mb-2">
                      {" "}
                      How will you pay?{" "}
                    </div>

                    <label htmlFor="paybycash">
                      <div
                        onClick={() => {}}
                        type="button"
                        className={`px-4 py-2  cursor-pointer   w-auto    transition-shadow duration-200 shadow-sm hover:shadow-md    inline-flex justify-center items-center    rounded-md    border    text-base sm:text-sm    font-medium    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto    mb-3 sm:mb-0 sm:mr-3 
                      ${
                        watch().paymentType === "bycash"
                          ? "bg-gray-900 text-white"
                          : "bg-white hover:bg-gray-5 text-gray-600 hover:text-gray-700"
                      }`}
                      >
                        <FontAwesomeIcon
                          icon={faMoneyBill1Wave}
                          className="mr-2"
                          size="lg"
                        />
                        <div>Cash</div>
                      </div>
                    </label>

                    <label htmlFor="paybycard">
                      <div
                        type="button"
                        className={`px-4 py-2 cursor-pointer    w-auto    transition-shadow duration-200 shadow-sm hover:shadow-md    inline-flex justify-center items-center    rounded-md    border    text-base sm:text-sm    font-medium    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto  ${
                          watch().paymentType === "bycard"
                            ? "bg-gray-900 text-white"
                            : "bg-white hover:bg-gray-5 text-gray-600 hover:text-gray-700"
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={faCreditCard}
                          className="mr-2"
                          size="lg"
                        />

                        <div>Credit card</div>
                      </div>
                    </label>
                  </div>
                  <div className="col-span-6">
                    <input
                      style={{ display: "none" }}
                      type="radio"
                      {...register("wayToPackage")}
                      value={"pickup"}
                    />
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {" "}
                      How would you like to receive your order?{" "}
                    </label>
                    <div
                      type="button"
                      className={`px-4 py-2 cursor-pointer    w-auto    transition-shadow duration-200 shadow-sm hover:shadow-md    inline-flex justify-center items-center    rounded-md    border    text-base sm:text-sm    font-medium    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto    sm:mb-0 sm:mr-3 
                      
                    ${
                      watch().wayToPackage === "pickup"
                        ? "bg-gray-900 text-white"
                        : "bg-white hover:bg-gray-5 text-gray-600 hover:text-gray-700"
                    }
                      `}
                    >
                      <FontAwesomeIcon
                        icon={faStore}
                        className="mr-2"
                        size="lg"
                      />

                      <div>Pick up at store</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-4 sm:py-3 bg-gray-200 text-right sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="px-4 py-2    w-auto    transition-shadow duration-200 shadow-sm hover:shadow-md    inline-flex justify-center items-center    rounded-md    border    text-base sm:text-sm    font-medium    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto border-green-600 bg-green-500 hover:bg-green-600    mb-3 sm:mb-0 sm:mt-0 text-white bg-gray-900 text-white"
                >
                  {" "}
                  Send WhatsApp
                  <FontAwesomeIcon
                    icon={faWhatsapp}
                    className="ml-2"
                    size="lg"
                  />
                </button>
                <button
                  onClick={() => {
                    setIsCheckoutModalVisible(false);
                  }}
                  type="button"
                  className="px-4 py-2    w-auto    transition-shadow duration-200 shadow-sm hover:shadow-md    inline-flex justify-center items-center    rounded-md    border    text-base sm:text-sm    font-medium    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto    sm:mr-3 bg-gray-900 text-white"
                >
                  Continue Shopping
                </button>
              </div>
            </form>
          </div>
          {isOrderSent && (
            <OrderPlacedMessage
              setIsCheckoutModalVisible={setIsCheckoutModalVisible}
            />
          )}
        </div>
      </div>
    </div>
  );
}
