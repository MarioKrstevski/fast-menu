import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../../redux/authSlice";
import { Dialog } from "primereact/dialog";
import { useAuthUser, useSignIn, useSignOut } from "react-auth-kit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DashboardMenu(props) {
  const [isMenuInfoOpen, setIsMenuInfoOpen] = useState(false);
  // const user = useSelector((state) => state.auth.user);
  const auth = useAuthUser();
  const user = auth();

  const signIn = useSignIn();
  const navigate = useNavigate();
  const signOut = useSignOut();
  const dispatch = useDispatch();
  console.log("user", user);
  const [userInfo, setUserInfo] = useState({
    contactName: user.contactName,
    contactNumber: user.contactNumber,
  });

  function handleUserInfo(key, value) {
    setUserInfo((pv) => ({
      ...pv,
      [key]: value,
    }));
  }

  async function be_updateUserInfo(updatedUserInfo, email) {
    return axios.post("http://localhost:8000/updateUserInfo", {
      ...updatedUserInfo,
      email,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("e", e);

    be_updateUserInfo(userInfo, user.email)
      .then((res) => {
        console.log("res", res);
        // dispatch(login(res.data.user));
        signIn({
          token: res.data.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: {
            ...user,
            contactName: res.data.user.contactName,
            contactNumber: res.data.user.contactNumber,
          },
        });
        setIsMenuInfoOpen(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  return (
    <div className="bg-slate-950 text-white flex justify-center">
      <div className="container ">
        <nav className="h-12 w-full  flex justify-between px-8 items-center">
          <div className="logo flex gap-1">
            <img src="" alt="logo" />
            <span>Fast Menu</span>
          </div>
          <div className="relative flex items-center mr-4">
            <span className="px-2">Hello {user.contactName}</span>
            <img
              onClick={() => {
                setIsMenuInfoOpen(true);
              }}
              src="https://lh3.googleusercontent.com/a/ACg8ocLwfGcFWLIHtTdPW7xP5n6ylyRDXrgonZo8lNKgQ7L3=s96-c"
              alt="Profile image"
              className="h-8 w-8 rounded-full border-2 border-white cursor-pointer"
            />

            <Dialog
              header="Update Info"
              visible={isMenuInfoOpen}
              style={{ width: "50vw" }}
              onHide={() => setIsMenuInfoOpen(false)}
            >
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="contactName"
                    className="block font-medium text-gray-700"
                  >
                    Contact Name
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200"
                    placeholder="John Petterson"
                    value={userInfo.contactName}
                    onChange={(e) => {
                      handleUserInfo("contactName", e.target.value);
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="contactNumber"
                    className="block font-medium text-gray-700"
                  >
                    Contact Number
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200"
                    placeholder="077444222"
                    value={userInfo.contactNumber}
                    onChange={(e) => {
                      handleUserInfo("contactNumber", e.target.value);
                    }}
                  />
                </div>

                <button
                  disabled={
                    !userInfo.contactName || !userInfo.contactNumber
                  }
                  type="submit"
                  className={`w-full   text-white font-semibold py-2 rounded  focus:outline-none focus:ring focus:ring-indigo-200 ${
                    userInfo.contactName && userInfo.contactNumber
                      ? "bg-indigo-500 hover:bg-indigo-600"
                      : "bg-gray-500"
                  }`}
                >
                  Update
                </button>
              </form>
            </Dialog>

            <button
              onClick={() => {
                // dispatch(logout());
                navigate("/login");
                signOut();
              }}
              className="button is-white has-text-weight-bold p-6"
            >
              Log out
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
