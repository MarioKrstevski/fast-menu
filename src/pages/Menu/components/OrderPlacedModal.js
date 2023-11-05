export default function OrderPlacedMessage({
  setIsCheckoutModalVisible,
}) {
  return (
    <div>
      <div className="p-6 text-center">
        <div className="font-black text-lg mb-4">Thank you!</div>
        <div className="mb-4">Your order has been sent!</div>
        <div className="mt-2 text-4xl">🎉</div>
        <button
          onClick={() => {
            setIsCheckoutModalVisible(false);
          }}
          type="button"
          className="mt-4 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          {" "}
          Close{" "}
        </button>
      </div>
    </div>
  );
}
