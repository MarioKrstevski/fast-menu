export default function CheckoutModal({ setIsCheckoutModalVisible }) {
  return (
    <div className="modal overflow-hidden fixed top-0 left-0 right-0 bottom-0 z-30 w-full">
      <div
        onClick={() => {
          setIsCheckoutModalVisible(false);
        }}
        className="modal-backdrop bg-black bg-opacity-50 mx-auto my-0 fixed top-0 left-0 right-0 bottom-0 z-10 "
      ></div>

      <div
        // className="modal-dialog  flex  relative w-full my-14 rounded-lg z-20 "
        className="modal mx-auto dialog relative z-20 flex align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full sm:max-w-lg sm:w-full"
      >
        <div className="modal-body w-full mx-auto rounded-lg">
          <div className="checkout-form bg-white rounded-lg w-full">
            <form>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
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
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="family-name"
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
                        type="text"
                        name="phone"
                        id="phone"
                        autoComplete="phone"
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
                      htmlFor="street_address"
                    >
                      {" "}
                      Street address{" "}
                    </label>
                    <div>
                      <input
                        type="text"
                        name="street_address"
                        id="street_address"
                        autoComplete="street-address"
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
                      <div id="notes" name="notes" rows="3">
                        <textarea className="px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"></textarea>
                        <p
                          className="mt-2 text-sm text-red-400"
                          style={{ display: "none" }}
                        >
                          {" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {" "}
                      How will you pay?{" "}
                    </label>
                    <button
                      type="button"
                      className="px-4 py-2 | w-auto | transition-shadow duration-200 shadow-sm hover:shadow-md | inline-flex justify-center items-center | rounded-md | border | text-base sm:text-sm | font-medium | focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto | mb-3 sm:mb-0 sm:mr-3 bg-gray-900 text-white"
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="money-bill-wave"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                        className="mr-3 svg-inline--fa fa-money-bill-wave fa-w-20"
                      >
                        <path
                          fill="currentColor"
                          d="M621.16 54.46C582.37 38.19 543.55 32 504.75 32c-123.17-.01-246.33 62.34-369.5 62.34-30.89 0-61.76-3.92-92.65-13.72-3.47-1.1-6.95-1.62-10.35-1.62C15.04 79 0 92.32 0 110.81v317.26c0 12.63 7.23 24.6 18.84 29.46C57.63 473.81 96.45 480 135.25 480c123.17 0 246.34-62.35 369.51-62.35 30.89 0 61.76 3.92 92.65 13.72 3.47 1.1 6.95 1.62 10.35 1.62 17.21 0 32.25-13.32 32.25-31.81V83.93c-.01-12.64-7.24-24.6-18.85-29.47zM48 132.22c20.12 5.04 41.12 7.57 62.72 8.93C104.84 170.54 79 192.69 48 192.69v-60.47zm0 285v-47.78c34.37 0 62.18 27.27 63.71 61.4-22.53-1.81-43.59-6.31-63.71-13.62zM320 352c-44.19 0-80-42.99-80-96 0-53.02 35.82-96 80-96s80 42.98 80 96c0 53.03-35.83 96-80 96zm272 27.78c-17.52-4.39-35.71-6.85-54.32-8.44 5.87-26.08 27.5-45.88 54.32-49.28v57.72zm0-236.11c-30.89-3.91-54.86-29.7-55.81-61.55 19.54 2.17 38.09 6.23 55.81 12.66v48.89z"
                          className=""
                        ></path>
                      </svg>
                      <div>Cash</div>
                    </button>

                    <button
                      type="button"
                      className="px-4 py-2 | w-auto | transition-shadow duration-200 shadow-sm hover:shadow-md | inline-flex justify-center items-center | rounded-md | border | text-base sm:text-sm | font-medium | focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto bg-white hover:bg-gray-5 text-gray-600 hover:text-gray-700"
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="credit-card"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                        className="mr-3 svg-inline--fa fa-credit-card fa-w-18"
                      >
                        <path
                          fill="currentColor"
                          d="M0 432c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V256H0v176zm192-68c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H204c-6.6 0-12-5.4-12-12v-40zm-128 0c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM576 80v48H0V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48z"
                          className=""
                        ></path>
                      </svg>
                      <div>Credit card</div>
                    </button>
                  </div>
                  <div className="col-span-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {" "}
                      How would you like to receive your order?{" "}
                    </label>
                    <button
                      type="button"
                      className="px-4 py-2 | w-auto | transition-shadow duration-200 shadow-sm hover:shadow-md | inline-flex justify-center items-center | rounded-md | border | text-base sm:text-sm | font-medium | focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto | sm:mb-0 sm:mr-3 bg-gray-900 text-white"
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="store"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 616 512"
                        className="mr-3 svg-inline--fa fa-store fa-w-20"
                      >
                        <path
                          fill="currentColor"
                          d="M602 118.6L537.1 15C531.3 5.7 521 0 510 0H106C95 0 84.7 5.7 78.9 15L14 118.6c-33.5 53.5-3.8 127.9 58.8 136.4 4.5.6 9.1.9 13.7.9 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18.1 20.1 44.3 33.1 73.8 33.1 4.7 0 9.2-.3 13.7-.9 62.8-8.4 92.6-82.8 59-136.4zM529.5 288c-10 0-19.9-1.5-29.5-3.8V384H116v-99.8c-9.6 2.2-19.5 3.8-29.5 3.8-6 0-12.1-.4-18-1.2-5.6-.8-11.1-2.1-16.4-3.6V480c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32V283.2c-5.4 1.6-10.8 2.9-16.4 3.6-6.1.8-12.1 1.2-18.2 1.2z"
                          className=""
                        ></path>
                      </svg>
                      <div>Pick up at store</div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="px-4 py-4 sm:py-3 bg-gray-200 text-right sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="px-4 py-2 | w-auto | transition-shadow duration-200 shadow-sm hover:shadow-md | inline-flex justify-center items-center | rounded-md | border | text-base sm:text-sm | font-medium | focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto border-green-600 bg-green-500 hover:bg-green-600 | mb-3 sm:mb-0 sm:mt-0 text-white bg-gray-900 text-white"
                >
                  {" "}
                  Send WhatsApp
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="whatsapp"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="ml-2 svg-inline--fa fa-whatsapp fa-w-16 fa-lg"
                  >
                    <path
                      fill="currentColor"
                      d="M19.077,4.928 C16.995,2.845 14.155,1.794 11.173,2.034 C7.164,2.356 3.65,5.144 2.474,8.99 C1.634,11.738 1.987,14.607 3.355,16.977 L2.059,21.28 C1.935,21.693 2.312,22.082 2.729,21.971 L7.233,20.764 C8.692,21.56 10.334,21.979 12.006,21.98 L12.01,21.98 C16.205,21.98 20.081,19.414 21.422,15.439 C22.728,11.563 21.762,7.616 19.077,4.928 Z M16.898,15.554 C16.69,16.137 15.671,16.699 15.213,16.74 C14.755,16.782 14.326,16.947 12.218,16.116 C9.681,15.116 8.079,12.515 7.955,12.349 C7.83,12.182 6.936,10.996 6.936,9.768 C6.936,8.54 7.581,7.936 7.81,7.687 C8.039,7.437 8.309,7.375 8.476,7.375 C8.642,7.375 8.809,7.375 8.954,7.381 C9.132,7.388 9.329,7.397 9.516,7.812 C9.738,8.306 10.223,9.54 10.285,9.665 C10.347,9.79 10.389,9.936 10.306,10.102 C10.223,10.268 10.181,10.372 10.057,10.518 C9.932,10.664 9.795,10.843 9.683,10.955 C9.558,11.079 9.428,11.215 9.573,11.464 C9.719,11.714 10.219,12.531 10.961,13.192 C11.915,14.042 12.718,14.305 12.968,14.431 C13.218,14.556 13.363,14.535 13.509,14.368 C13.655,14.202 14.133,13.64 14.299,13.39 C14.465,13.14 14.632,13.182 14.861,13.265 C15.09,13.348 16.317,13.952 16.566,14.077 C16.816,14.202 16.982,14.264 17.044,14.368 C17.106,14.471 17.106,14.971 16.898,15.554 Z"
                      className=""
                    ></path>
                  </svg>
                </button>
                <button
                  onClick={() => {
                    setIsCheckoutModalVisible(false);
                  }}
                  type="button"
                  className="px-4 py-2 | w-auto | transition-shadow duration-200 shadow-sm hover:shadow-md | inline-flex justify-center items-center | rounded-md | border | text-base sm:text-sm | font-medium | focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto | sm:mr-3 bg-gray-900 text-white"
                >
                  Continue Shopping
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
