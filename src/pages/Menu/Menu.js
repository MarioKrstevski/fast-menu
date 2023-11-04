import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ClientInfo from "./components/ClientInfo";
import SimpleMenu from "./components/SimpleMenu";
import NormalMenu from "./components/NormalMenu";
import { useSelector, useDispatch } from "react-redux";
import { toggleOrdersEnabled } from "../../redux/globalSettingsSlice";
import ShoppingCart from "./components/ShoppingCart";
import CheckoutModal from "./components/CheckoutModal";

export default function Menu(props) {
  const { companyName } = useParams();
  const [menu, setMenu] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [menuType, setMenuType] = useState("normal");
  const [isCheckoutModalVisible, setIsCheckoutModalVisible] =
    useState(true);

  const isOrderingEnabled = useSelector(
    (state) => state.globalSettings.ordersEnabled
  );
  const dispatch = useDispatch();

  function updateSelectedFilter(newFilter) {
    setSelectedFilter(newFilter);
  }

  function updateMenuType(newType) {
    setMenuType(newType);
  }

  //fetch the menu for company
  useEffect(() => {
    axios
      .get("http://localhost:8000/menu", {
        params: {
          companyName,
        },
      })
      .then((data) => {
        console.log("data", data);
        setMenu(data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const subMenus = menu.reduce((result, item) => {
    if (!result[item.SubMenu]) {
      result[item.SubMenu] = [];
    }
    result[item.SubMenu].push(item);
    return result;
  }, {});

  const allSubMenus = Object.keys(subMenus);
  console.log("allSubMenus", allSubMenus);

  const itemsList =
    selectedFilter === "All" ? menu : subMenus[selectedFilter];

  return (
    <div>
      <ClientInfo />
      {companyName}
      is it? {isOrderingEnabled ? "yes" : "no"}
      <button
        className="border bg-purple-500 p-4"
        onClick={() => dispatch(toggleOrdersEnabled())}
      >
        Toggle Ordering
      </button>
      {/*  <CardList2 /> */}
      {/* <CardList /> */}
      <div className="flex">
        <span className="mr-2"> Select Menu Type:</span>{" "}
        <div>
          <button
            className={`${
              menuType === "normal" ? "bg-blue-300" : "bg-white"
            }`}
            onClick={() => updateMenuType("normal")}
          >
            Normal
          </button>
          <button
            className={`${
              menuType === "simple" ? "bg-blue-300" : "bg-white"
            }`}
            onClick={() => updateMenuType("simple")}
          >
            Simple
          </button>
        </div>
      </div>
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
      {menuType === "normal" && (
        <NormalMenu
          itemsList={itemsList}
          allSubMenus={allSubMenus}
          menu={menu}
          updateSelectedFilter={updateSelectedFilter}
          selectedFilter={selectedFilter}
        />
      )}
      {menuType === "simple" && (
        <SimpleMenu
          itemsList={itemsList}
          allSubMenus={allSubMenus}
          menu={menu}
          updateSelectedFilter={updateSelectedFilter}
          selectedFilter={selectedFilter}
        />
      )}
    </div>
  );
}
