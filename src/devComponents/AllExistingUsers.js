import { useEffect, useState } from "react";
import { devonlyApi } from "../api/devonly";

export default function AllExistingUsers(props) {
  const [users, setUsers] = useState([]);
  function loadAllUsers() {
    devonlyApi
      .be_getAllExistingUsers()
      .then((res) => {
        console.log("res", res);
        setUsers(res.data.allUsers);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  useEffect(() => {
    loadAllUsers();
  }, []);
  return (
    <div>
      <h2>All Existing Users</h2>
      <div className="m-4">
        <ul>
          {users.map((user, idx) => {
            return (
              <li key={idx}>
                <div className="flex gap-2">
                  <span>
                    <b>E:</b> {user.email}
                  </span>

                  <span>
                    <b>P:</b> {user.password}
                  </span>

                  <span>
                    <b>CN:</b> {user.contactName}
                  </span>

                  <span>
                    <b>C:</b> {user.clientName}
                  </span>

                  <span>
                    <b>MN:</b> {user.menusIds.length}
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
