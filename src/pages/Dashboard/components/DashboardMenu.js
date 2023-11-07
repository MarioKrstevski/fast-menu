import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/authSlice";

export default function DashboardMenu(props) {
  const [toggleLogout, setToggleLogout] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="bg-slate-950 text-white">
      <div className="container">
        <nav className="h-12 w-full  flex justify-between px-8 items-center">
          <div className="logo flex gap-1">
            <img src="" alt="logo" />
            <span>Fast Menu</span>
          </div>
          <div className="relative flex items-center mr-4">
            <img
              onClick={() => {
                setToggleLogout(!toggleLogout);
              }}
              src="https://lh3.googleusercontent.com/a/ACg8ocLwfGcFWLIHtTdPW7xP5n6ylyRDXrgonZo8lNKgQ7L3=s96-c"
              alt="Profile image"
              className="h-8 w-8 rounded-full border-2 border-white cursor-pointer"
            />

            <button
              onClick={() => {
                dispatch(logout());
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
