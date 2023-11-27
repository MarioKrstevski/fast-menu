import { useState } from "react";
import MenuDescription from "./MenuDescription";
import MenuHeader from "./MenuHeader";
import MenuHero from "./MenuHero";
import MenuItems from "./MenuItems";
import MenuFooter from "./MenuFooter";
import { useSelector } from "react-redux";
import ShoppingCart from "../../pages/Menu/components/ShoppingCart";
import CheckoutModal from "../../pages/Menu/components/CheckoutModal";

export default function MenuDisplay(props) {
  const [isCheckoutModalVisible, setIsCheckoutModalVisible] =
    useState(false);
  const gs = useSelector((state) => state.globalSettings);
  const isOrderingEnabled =
    gs.card.buttonAction === "cart" && gs.ordersEnabled;
  return (
    <div className="w-full relative bg-slate-200 h-full overflow-auto">
      {isOrderingEnabled && (
        <ShoppingCart
          setIsCheckoutModalVisible={setIsCheckoutModalVisible}
        />
      )}
      {isCheckoutModalVisible && (
        <CheckoutModal
          setIsCheckoutModalVisible={setIsCheckoutModalVisible}
        />
      )}
      <div className="menu-wrapper z-10">
        <MenuHeader />
        <MenuHero />
        <MenuDescription />
        <MenuItems />
        <MenuFooter />
      </div>
    </div>
  );
}
