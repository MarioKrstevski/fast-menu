import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function UpgradeToProPlanModal({ closeModal }) {
  const [ccState, setCcState] = useState({
    creaditCardNumber: "4242 4242 4242 4242",
    expirationDate: "01/25",
    cvv: "424",
  });

  const [selectedPlan, setSelectedPlan] = useState("basic");

  const menuId = useSelector(
    (state) => state.planUpgrade.selectedMenuId
  );

  const menus = useSelector((state) => state.auth.user.menus);

  const menu = menus.find((menu) => menu.id === menuId);
  const { subdomain, menuName } = menu;

  async function be_subscribeMenuToPro() {
    return axios.post("http://localhost:8000/subscribeMenuToPro", {
      menuId,
    });
  }
  function handleSubscription() {
    be_subscribeMenuToPro()
      .then((res) => {
        console.log("sub to pro done", res);

        closeModal();
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  function handleCCUpdate(key, value) {
    setCcState((pV) => ({
      ...pV,
      [key]: value,
    }));
  }
  const submitIsDisabled =
    !ccState.creaditCardNumber ||
    !ccState.cvv ||
    !ccState.expirationDate;
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="flex items-center justify-center  w-full m-2 sm:w-2/3 md:w-2/3 lg:w-1/2 lg:min-w-[450px] "
    >
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md  w-full">
        <div className="mb-4 text-center">
          <div className="font-bold text-xl">Upgrade to PRO</div>
          <div>
            for <span className="font-semibold">{menuName}</span>
          </div>
          <div>
            subdomain{" "}
            <span className="font-semibold">{subdomain}</span>
          </div>
        </div>
        <div className="flex justify-between mb-6">
          <div
            className="overflow-hidden border rounded-md p-2 hover:shadow-lg transition-shadow duration-500 ease-in-out w-1/2 mr-4 md:mr-4 shadow-lg"
            id="monthly-plan"
            billed="monthly"
          >
            <div className="px-2 py-2">
              <div className="flex flex-col items-start ">
                <div className="text-gray-500 text-xl font-medium">
                  Monthly
                </div>
                <div className="leading-none text-gray-500 text-sm font-medium ml-1 mb-1">
                  /per menu
                </div>
              </div>
              <p className="text-pasha  text-xl font-extrabold mt-12">
                $8.00 usd
              </p>
              <div className="flex-wrap"></div>
              <div className="flex justify-center mt-6">
                {selectedPlan === "pro" ? (
                  <div
                    onClick={() => {
                      setSelectedPlan("basic");
                    }}
                    role="button"
                    className="bg-gray-900 hover:bg-white outline-none hover:text-black border hover:border-black text-white focus:bg-white focus:text-black py-2 px-4 rounded-md shadow"
                  >
                    <div className="w-auto -mx-2 md:mx-0">Select</div>
                  </div>
                ) : (
                  <div
                    role="button"
                    className="bg-white outline-none text-black border border-black focus:bg-white focus:text-black py-2 px-4 rounded-md shadow"
                  >
                    <div className="w-auto -mx-2 md:mx-0">
                      Selected
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className="overflow-hidden border rounded-md p-2 hover:shadow-lg transition-shadow duration-500 ease-in-out w-1/2"
            id="yearly_plan"
            billed="yearly"
          >
            <div className="px-2 py-2">
              <div className="flex flex-col items-start">
                <div className="text-gray-500 text-xl font-medium">
                  Yearly
                </div>
                <div className="leading-none text-gray-500 text-sm font-medium ml-1 mb-1">
                  /per menu
                </div>
              </div>
              <p className="line-through my-2 text-red-300">
                $96.00 usd
              </p>
              <p className="text-pasha text-xl font-extrabold">
                $72.00 usd
              </p>
              <div className="flex-wrap"></div>
              <div className="flex justify-center mt-6">
                {selectedPlan === "basic" ? (
                  <div
                    onClick={() => {
                      setSelectedPlan("pro");
                    }}
                    role="button"
                    className="bg-gray-900 hover:bg-white outline-none hover:text-black border hover:border-black text-white focus:bg-white focus:text-black py-2 px-4 rounded-md shadow"
                  >
                    <div className="w-auto -mx-2 md:mx-0">Select</div>
                  </div>
                ) : (
                  <div
                    role="button"
                    className="bg-white outline-none text-black border border-black focus:bg-white focus:text-black py-2 px-4 rounded-md shadow"
                  >
                    <div className="w-auto -mx-2 md:mx-0">
                      Selected
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="cardNumber"
          >
            Card Number:
          </label>
          <input
            className="mt-1 p-2 w-full border rounded"
            type="text"
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={ccState.creaditCardNumber}
            onChange={(e) => {
              handleCCUpdate("creaditCardNumber", e.target.value);
            }}
          />

          <label
            className="block text-sm font-medium text-gray-600 mt-2"
            htmlFor="expirationDate"
          >
            Expiration Date:
          </label>
          <input
            className="mt-1 p-2 w-full border rounded"
            type="text"
            id="expirationDate"
            placeholder="MM/YY"
            value={ccState.expirationDate}
            onChange={(e) => {
              handleCCUpdate("expirationDate", e.target.value);
            }}
          />

          <label
            className="block text-sm font-medium text-gray-600 mt-2"
            htmlFor="cvv"
          >
            CVV:
          </label>
          <input
            className="mt-1 p-2 w-full border rounded"
            type="text"
            id="cvv"
            placeholder="123"
            value={ccState.cvv}
            onChange={(e) => {
              handleCCUpdate("cvv", e.target.value);
            }}
          />
        </div>

        <button
          disabled={submitIsDisabled}
          onClick={handleSubscription}
          id="submit-premium"
          type="submit"
          className={` 
          w-full text-white py-3 px-4 mt-4 rounded-md shadow
         
           ${
             submitIsDisabled
               ? "bg-gray-500"
               : `bg-gray-900 hover:bg-white hover:shadow-outline hover:text-black border hover:border-black 
           focus:shadow-outline  focus:bg-white focus:text-black `
           }
          
          `}
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}
