import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCircleXmark,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { api } from "../../api/backend";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clientName, setClientName] = useState("");
  const clientNameRef = useRef();
  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [signUpError, setsignUpError] = useState("");
  const [signUpSuccess, setsignUpSuccess] = useState("");
  const [testedName, setTestedName] = useState("");
  const [serverStatusCheck, setServerStatusCheck] = useState(null);
  const [isLoadingServerStatus, setIsLoadingServerStatus] =
    useState(false);

  const [
    isCheckingAvailableClientName,
    setIsCheckingAvailableClientName,
  ] = useState(false);

  const [isClientNameAvailable, setIsClientNameAvailable] =
    useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleContactNameChange = (e) => {
    setContactName(e.target.value);
  };

  const handleContactNumberChange = (e) => {
    setContactNumber(e.target.value);
  };

  const handleClientNameChange = async (e) => {
    setClientName(e.target.value);
    if (e.target.value === "") {
      setTestedName("");
    }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  function handleCheckNameAvailability(e) {
    console.log("e.", e.target.pattern);
    console.log("e.", e.target.value);
    console.log(
      "test",
      new RegExp(e.target.pattern).test(e.target.value)
    );

    if (!new RegExp(e.target.pattern).test(e.target.value)) {
      return;
    }
    if (e.target.value === "") {
      return;
    }
    setIsCheckingAvailableClientName(true);

    api
      .be_checkClientNameAvailability(e.target.value)
      .then((res) => {
        setIsClientNameAvailable(true);
      })
      .catch((err) => {
        setIsClientNameAvailable(false);
      })
      .finally(() => {
        setTestedName(e.target.value);
        setIsCheckingAvailableClientName(false);
      });
  }

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the signup logic here

    // validation logic

    // if (clientNameRef.current.validity.patternMismatch) {
    //   alert("wrong");
    //   return;
    // }
    // if (clientNameRef.current.pattern.test(clientName)) {
    //   alert("client name wrong");

    //   return;
    // }

    setsignUpError("");
    setsignUpSuccess("");

    const signUpData = {
      email,
      password,
      clientName,
      contactName,
      contactNumber,
    };
    api
      .be_signup(signUpData)
      .then((res) => {
        setsignUpSuccess(res.data);
      })
      .catch((err) => {
        setsignUpError(err.response.data);
      });
  };

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
          Sign Up {checkConnection}{" "}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="clientName"
              className="block font-medium text-gray-700"
            >
              Client Name *
              <small>(all lower case, dashes as space)</small>
            </label>
            <input
              type="text"
              id="clientName"
              ref={clientNameRef}
              required
              pattern="^[a-z][a-z0-9]*(-[a-z0-9]+)*$"
              className={`w-full  p-2  border rounded border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200
              `}
              value={clientName}
              placeholder="ex: dominos"
              onFocus={(e) => {
                e.target.dataset.touched = "touched";
              }}
              onChange={handleClientNameChange}
              onBlur={handleCheckNameAvailability}
            />

            {clientName !== "" &&
              !isCheckingAvailableClientName &&
              testedName && (
                <div>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className={`mx-2 ${
                      isClientNameAvailable
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  />
                  <span>
                    {isClientNameAvailable ? (
                      <span>
                        <i className="mr-2">
                          <b>{testedName}</b>
                        </i>
                        is good to go
                      </span>
                    ) : (
                      "That name is already taken"
                    )}
                  </span>
                </div>
              )}
            {isCheckingAvailableClientName && (
              <FontAwesomeIcon icon={faSpinner} spin />
            )}
          </div>
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
              value={contactName}
              onChange={handleContactNameChange}
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
              id="contactNumber"
              className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="077444222"
              value={contactNumber}
              onChange={handleContactNumberChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-medium text-gray-700"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full p-2 border  rounded border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Email"
              autoComplete="username"
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
              id="password"
              autoComplete="current-password"
              required
              className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <button
            disabled={!isClientNameAvailable}
            type="submit"
            className={`w-full   text-white font-semibold py-2 rounded  focus:outline-none focus:ring focus:ring-indigo-200 ${
              isClientNameAvailable
                ? "bg-indigo-500 hover:bg-indigo-600"
                : "bg-gray-500"
            }`}
          >
            Sign Up
          </button>

          <div className="status-message  mt-2">
            {signUpSuccess && (
              <>
                <div className="text-green-600">{signUpSuccess}</div>
                <div>
                  Proceed to
                  <Link className="text-blue-500 ml-2" to={"/login"}>
                    Login
                  </Link>
                </div>
              </>
            )}
            {signUpError && (
              <div className="text-red-600">{signUpError}</div>
            )}
          </div>
        </form>

        {!signUpSuccess && (
          <div className="mt-2">
            You already have an account?
            <Link to={"/login"} className="text-blue-400 ml-1">
              Log in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
