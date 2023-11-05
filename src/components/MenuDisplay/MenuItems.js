import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MenuItems(props) {
  const [menu, setMenu] = useState([]);
  const globalSettings = useSelector((store) => store.globalSettings);
  const dispatch = useDispatch();
  const gs = globalSettings;

  useEffect(() => {
    axios
      .get("http://localhost:8000/menu", {
        params: {
          companyName: gs.client,
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
  return (
    <div className="min-h-full max-w-full overflow-hidden">
      <div className="filters"></div>

      <div className="items">{JSON.stringify(menu)}</div>
    </div>
  );
}
