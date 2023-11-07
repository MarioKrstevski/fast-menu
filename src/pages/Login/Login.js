import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the login logic here
    dispatch(login("demo"));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
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
              Password
            </label>
            <input
              type="password"
              id="password"
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
        </form>
      </div>
    </div>
  );
}
