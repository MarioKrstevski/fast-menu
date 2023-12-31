import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import { api } from "../../api/backend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
export default function Login() {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const [serverStatusCheck, setServerStatusCheck] = useState(null);
  const [isLoadingServerStatus, setIsLoadingServerStatus] =
    useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setloginError] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .be_trylogin(email, password)
      .then((res) => {
        console.log("res", res);

        signIn({
          token: res.data.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: res.data.user,
        });

        navigate("/dashboard");
      })
      .catch((err) => {
        console.log("err", err);
        setloginError(err.response.data.message);
      });
    // Handle the login logic here
  };
  function handleCheckServer() {
    setIsLoadingServerStatus(true);
    api
      .be_serverCheck()
      .then((res) => {
        setServerStatusCheck("success");
      })
      .catch((err) => {
        setServerStatusCheck("error");
      })
      .finally(() => {
        setIsLoadingServerStatus(false);
      });
    setIsLoadingServerStatus(false);
  }
  const checkConnection = (
    <button
      disabled={isLoadingServerStatus}
      className="text-sm rounded border px-1 py-0.5"
      onClick={handleCheckServer}
    >
      check server{" "}
      {serverStatusCheck === "success" && (
        <FontAwesomeIcon
          className="text-green-500"
          icon={faCheckCircle}
        />
      )}
      {serverStatusCheck === "error" && (
        <FontAwesomeIcon
          className="text-red-500"
          icon={faCircleXmark}
        />
      )}
    </button>
  );
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">
          Login {checkConnection}{" "}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-medium text-gray-700"
            >
              Email *
            </label>
            <input
              type="email"
              autoComplete="email"
              id="email"
              required
              className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block font-medium text-gray-700"
            >
              Password *
            </label>
            <input
              type="password"
              autoComplete="current-password"
              id="password"
              required
              className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-semibold py-2 rounded hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Log In
          </button>
          <div className="status-message  mt-2">
            {loginError && (
              <div className="text-red-600">{loginError}</div>
            )}
          </div>
        </form>

        <div className="mt-2">
          You don't have an account?{" "}
          <Link to={"/signup"} className="text-blue-400">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
