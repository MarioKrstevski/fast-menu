import { useEffect, useState } from "react";
import { devonlyApi } from "../api/devonly";
import { frontendBaseUrl } from "../constants/global";

export default function AllExistingMenus(props) {
  const [menus, setMenus] = useState([]);
  function loadAllMenus() {
    devonlyApi
      .be_getAllExistingMenus()
      .then((res) => {
        console.log("res", res);
        setMenus(res.data.allMenus);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  useEffect(() => {
    loadAllMenus();
  }, []);
  return (
    <div>
      <h2>All Existing Menus</h2>
      <div className="m-4">
        <ul>
          {menus.map((menu, idx) => {
            return (
              <li key={idx}>
                <div className="flex gap-2">
                  <span>
                    <b>P:</b> {menu.isPublished.toString()}
                  </span>

                  <span>
                    <b>C: </b> {menu.globalSettings.client}
                  </span>

                  <span>
                    <b>W: </b> {menu.globalSettings.websiteName}
                  </span>

                  <span>
                    <b>SD:</b> {menu.globalSettings.subdomain}
                  </span>
                  <span>
                    <a
                      target="_blank"
                      href={
                        frontendBaseUrl +
                        "menu/" +
                        menu.globalSettings.subdomain
                      }
                    >
                      <b>
                        <u> LINK</u>
                      </b>
                    </a>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
